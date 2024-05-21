import { Queue } from "../models/Queue";

export class MediaPreloader {
    private readonly cache: Map<string, BufferSource>; // 简化的本地缓存示例
    private readonly _queue: Queue<() => Promise<void>>; // 异步预加载队列
    private readonly _baseURL: string;
    private readonly _maxPreLoadSize: number;
    private readonly _videoSourceBuffer: SourceBuffer;
    private _isRunning: boolean;
    constructor(
        videoSourceBuffer: SourceBuffer,
        maxPreLoadSize: number = 2,
        baseURL: string
    ) {
        this._maxPreLoadSize = maxPreLoadSize;
        this._videoSourceBuffer = videoSourceBuffer;
        this._queue = new Queue(maxPreLoadSize);
        this.cache = new Map();
        this._baseURL = baseURL;
        this._isRunning = false;
    }

    public async loadSegment(segmentURL: string) {
        if (this.cache.has(segmentURL)) return;

        const segmentData = await fetch(`${this._baseURL}${segmentURL}`).then(
            res => res.arrayBuffer()
        );

        segmentData && this.setBuffer(segmentURL, segmentData);
        return segmentData;
    }


    public getBuffer(key: string) {
        return this.cache.get(key);
    }

    public setBuffer(key: string, buffer: BufferSource): void {
        this.cache.set(key, buffer);
    }
}
