import { StreamerEventType, initStreamerEvents } from "../streamer/streamer-events";
import { EventEmitter } from "./EventEmitter";
import { Player } from "./Player";

export interface MediaSegment {
    duration: number;
    uri: string;
}

export class Streamer {
    public mediaSegments: MediaSegment[];
    public mediaSourceObject: MediaSource;
    public _videoSourceBuffer: any;
    public loadedBuffer: Set<MediaSegment>;
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
        Streamer.emit(StreamerEventType.SegmentChange, () => {
            console.log(666);
        })
    }

    get mediaSourceReadyState(): string {
        return this.mediaSourceObject.readyState;
    }

    get mediaSourceBuffered(): SourceBufferList {
        return this.mediaSourceObject.sourceBuffers;
    }

    get mediaSourceBufferedLength(): number {
        return this.mediaSourceObject.sourceBuffers.length;
    }

    constructor() {
        // 创建mse对象
        this.mediaSourceObject = new MediaSource();
        // 当前播放的 segment 的索引
        this._currentSegment = 0;
        // 获取ts文件的基网址
        this._baseURL =
            "https://playertest.longtailvideo.com/adaptive/bipbop/gear4/";

        this.mediaSourceObject.addEventListener(
            "sourceopen",
            this.onSourceOpen.bind(this)
        );
        this.mediaSegments = [];

        this.loadedBuffer = new Set();

        Streamer._eventEmitter = new EventEmitter();

        initStreamerEvents.call(this);
    }

    async loadSegment(sourceBuffer: SourceBuffer, targetSegment?: number) {
        let LoadingSegment = 0;

        if (targetSegment) {
            LoadingSegment = targetSegment;
        } else if (this.loadedBuffer.size !== 0) {
            if (!this.loadedBuffer.has(this.mediaSegments[this.currentSegment])) {
                await this.loadSegment(sourceBuffer, this.currentSegment);
            }
            LoadingSegment = this._currentSegment + 1;
        }

        if (LoadingSegment >= this.mediaSegments.length - 1) return;
        const segment = this.mediaSegments[LoadingSegment];
        if (this.loadedBuffer.has(segment)) return;

        const segmentData = await fetch(`${this._baseURL}${segment.uri}`).then(
            res => res.arrayBuffer()
        );

        if (!sourceBuffer.updating) {
            sourceBuffer.appendBuffer(segmentData);
        }

        // 将加载的 segment 加入已加载的集合
        this.loadedBuffer.add(segment);
    }

    private async onSourceOpen() {
        if (!this.mediaSourceObject || this._videoSourceBuffer) return;

        // 添加视频流
        const videoSourceBuffer = this.mediaSourceObject.addSourceBuffer(
            'video/mp2t; codecs="avc1.42E01E"'
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
