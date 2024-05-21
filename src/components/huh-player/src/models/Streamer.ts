import {
    StreamerEventType,
    initStreamerEvents,
} from "../streamer/streamer-events";
import { MediaPreloader } from "../streamer/streamer-loader";
import { EventEmitter } from "./EventEmitter";
import { Player } from "./Player";

export interface MediaSegment {
    duration: number;
    uri: string;
}

export class Streamer {
    public mediaSegments: MediaSegment[] = []; // 媒体分片的数组
    public mediaSourceObject: MediaSource = new MediaSource(); // MediaSource 对象
    public videoSourceBuffer!: SourceBuffer;
    public loadedBuffer: Set<number> = new Set();
    private _baseURL: string;
    private _currentTime: number = 0;
    private _currentSegment: number = 0; // 当前播放的 segment 的索引
    public mediaPreLoader!: MediaPreloader;
    private static _eventEmitter: EventEmitter = new EventEmitter();

    public get currentTime() {
        return Player.mediaElement.currentTime;
    }
    public set currentTime(currentTime: number) {

        this._currentTime = currentTime;

        // 计算新的 segment 索引
        const newCurrentSegment = Math.floor(this.currentTime / 10);
        const currentSegment = this.currentSegment;

        // 如果索引不同，则更新 currentSegment
        if (newCurrentSegment !== currentSegment) {
            this.currentSegment = newCurrentSegment;
        }
    }

    get currentSegment(): number {
        return this._currentSegment;
    }

    set currentSegment(value: number) {
        this._currentSegment = value;
        Streamer.emit(StreamerEventType.SegmentUpdate);
    }

    constructor(
        baseURL: string = ""
    ) {
        // 获取ts文件的基网址
        this._baseURL = baseURL;

        // 监听 sourceopen 事件
        this.mediaSourceObject.addEventListener(
            "sourceopen",
            this.onSourceOpen.bind(this)
        );

        // 初始化监听事件
        initStreamerEvents.call(this);
    }

    async initVideoBuffer(sourceBuffer: SourceBuffer, targetSegment?: number) {

        let LoadingSegment = 0;

        // 如果指定了加载片段就加载定义的
        // 如果未指定，就计算应加载的
        if (targetSegment) {
            LoadingSegment = targetSegment;
        } else if (this.loadedBuffer.size !== 0) {
            LoadingSegment = this._currentSegment + 1;
        }

        if (LoadingSegment >= this.mediaSegments.length - 1) return; // 如果已经加载完所有 segment 就返回
        
        const segment = this.mediaSegments[LoadingSegment]; // 获取要加载的 segment

        const segmentData = this.mediaPreLoader.getBuffer(segment.uri);

        if (segmentData) {
            sourceBuffer.appendBuffer(segmentData);
        } else {
            const data = await this.mediaPreLoader.loadSegment(segment.uri);
            data && sourceBuffer.appendBuffer(data);
        }
    }

    private async onSourceOpen() {
        if (!this.mediaSourceObject || this.videoSourceBuffer) return;

        // 添加视频流
        const videoSourceBuffer = this.mediaSourceObject.addSourceBuffer(
            'video/mp2t; codecs="avc1.42E01E"'
        );
        videoSourceBuffer.timestampOffset = -10;
        // 将视频流赋值给类属性
        this.videoSourceBuffer = videoSourceBuffer;
        videoSourceBuffer.addEventListener(
            "updateend",
            this.onBufferUpdateEnd.bind(this)
        );

        this.mediaPreLoader = new MediaPreloader(videoSourceBuffer, 2, 'https://playertest.longtailvideo.com/adaptive/bipbop/gear4/');

        await this.initVideoBuffer(videoSourceBuffer);
    }

    private onBufferUpdateEnd(event: Event) {
        Streamer.emit(StreamerEventType.BufferUpdateEnd);
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
