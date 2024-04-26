import { StreamerEventType, initStreamerEvents } from "../streamer/streamer-events";
import { EventEmitter } from "./EventEmitter";
import { Player } from "./Player";

export interface MediaSegment {
    duration: number;
    uri: string;
}

export class Streamer {
    public mediaSegments: MediaSegment[] = [];
    public mediaSourceObject: MediaSource;
    public _videoSourceBuffer: any;
    public loadedBuffer: Array<ArrayBuffer> = [];
    private _baseURL: string;
    // 当前播放的 segment 的索引
    private _currentSegment: number = 0;
    private audioSourceBuffer: any;
    private static _eventEmitter: EventEmitter;


    get currentSegment(): number {
        return this._currentSegment;
    }

    set currentSegment(value: number) {
        this._currentSegment = value;
        Streamer.emit(StreamerEventType.SegmentUpdate)
    }

    get mediaSourceReadyState(): string {
        return this.mediaSourceObject.readyState;
    }

    get mediaSourceBuffered(): SourceBufferList {
        return this.mediaSourceObject.sourceBuffers;
    }

    constructor() {
        // 创建mse对象
        this.mediaSourceObject = new MediaSource();
        // 获取ts文件的基网址
        this._baseURL =
            "https://playertest.longtailvideo.com/adaptive/bipbop/gear4/";

        this.mediaSourceObject.addEventListener(
            "sourceopen",
            this.onSourceOpen.bind(this)
        );

        Streamer._eventEmitter = new EventEmitter();

        initStreamerEvents.call(this);
    }

    async loadSegment(sourceBuffer: SourceBuffer, targetSegment?: number) {
        let LoadingSegment = 0;

        // 如果指定了加载片段就加载定义的
        // 如果未指定，就计算应加载的
        if (targetSegment) {
            LoadingSegment = targetSegment;
        } else if (this.loadedBuffer.length !== 0) {
            LoadingSegment = this._currentSegment + 1;
        }

        console.log(targetSegment);
        
        
        if (LoadingSegment >= this.mediaSegments.length - 1) return; // 如果已经加载完所有 segment 就返回

        const segment = this.mediaSegments[LoadingSegment]; // 获取要加载的 segment

        // 获取 segment 数据
        const segmentData = await fetch(`${this._baseURL}${segment.uri}`).then(
            res => res.arrayBuffer()
        );

        if (this.loadedBuffer.includes(segmentData)) return; // 如果已经加载过就返回

        console.log(this.mediaSourceObject);
        

        sourceBuffer.appendBuffer(segmentData); // 加载 segment

        this.loadedBuffer[LoadingSegment] = segmentData; // 将加载的 segment 加入已加载的集合
    }

    private async onSourceOpen() {
        if (!this.mediaSourceObject || this._videoSourceBuffer) return;

        // 添加视频流
        const videoSourceBuffer = this.mediaSourceObject.addSourceBuffer(
            'video/mp2t; codecs="avc1.42E01E", mp4a.40.2"'
        );
        videoSourceBuffer.timestampOffset = -10;
        await this.loadSegment(videoSourceBuffer);
        videoSourceBuffer.addEventListener(
            "updateend",
            this.onBufferUpdateEnd.bind(this)
        );

        // 将视频流赋值给类属性
        this._videoSourceBuffer = videoSourceBuffer;
    }

    private onBufferUpdateEnd() {

        if (
            this._videoSourceBuffer.updating == false &&
            this.mediaSourceObject.readyState == "open"
        ) {
            this.mediaSourceObject.endOfStream();
        }
    }

    public appendSegments(segments: MediaSegment[]) {
        this.mediaSegments = segments;
    }

    static on(eventName: string, listener: Function) {
        Streamer._eventEmitter.on(eventName, listener);
    }

    static emit(eventName: string, ...args: any[]) {
        Streamer._eventEmitter.emit(eventName, ...args);
    }
}
