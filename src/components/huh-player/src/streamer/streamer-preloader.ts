import { Player } from "../models/Player";
import { Queue } from "../models/Queue";
import { Streamer } from "../models/Streamer";

export class MediaPreloader {
    private readonly cache: Map<string, ArrayBuffer>; // 简化的本地缓存示例
    private readonly _queue: Queue<() => Promise<void>>; // 异步预加载队列
    private readonly _baseURL: string;
    private readonly _maxPreLoadSize: number;
    private readonly _videoSourceBuffer: SourceBuffer;
    private _isRunning: boolean;
    constructor(videoSourceBuffer: SourceBuffer, maxPreLoadSize: number = 2, baseURL: string) {
        this._maxPreLoadSize = maxPreLoadSize;
        this._videoSourceBuffer = videoSourceBuffer;
        this._queue = new Queue(maxPreLoadSize);
        this.cache = new Map();
        this._baseURL = baseURL;
        this._isRunning = false;
    }

    public enqueueLoadTask(segmentURL: string): void {
        if (this.cache.has(segmentURL)) return; // 如果视频已加载，则直接返回
        this._queue.enqueue(async () => {
            const data = await this.loadSegment(segmentURL);
            this._videoSourceBuffer.appendBuffer(data);
        });

        this._start();
    }

    private dequeueLoadTask(): () => Promise<void> {
        return this._queue.dequeue();
    }

    private async _executeTask(): Promise<void | ArrayBuffer> {
        while (!this._queue.isEmpty()) {
            const task = this.dequeueLoadTask();
            if (task) {
                await task();
            }
        }
    }

    public startPreloading(segmentURLs: string[]): void {
        
        segmentURLs.forEach(url => {
            this.enqueueLoadTask(url, async () => await this.loadSegment(url));
        });
        this._start();
    }

    public async loadSegment(segmentURL: string): Promise<void | ArrayBuffer> {
        if (this.cache.has(segmentURL)) return;

        const segmentData = await fetch(`${this._baseURL}${segmentURL}`).then(
            res => res.arrayBuffer()
        );

        segmentData && this.setBuffer(segmentURL, segmentData);
        return segmentData;
    }

    public getBuffer(key: string): ArrayBuffer | undefined {
        return this.cache.get(key);
    }

    public setBuffer(key: string, buffer: ArrayBuffer): void {
        this.cache.set(key, buffer);
    }

    private _start(): void {

        if (this._isRunning) return;

        this._isRunning = true;
        this._executeTask().then(() => {
            if (!this._queue.isEmpty()) {
                this._start();
            } else {
                this._isRunning = false;
            }
        })
    }
}
