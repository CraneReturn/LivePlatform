import { sliderValue } from "../player/player-event";
import {
    StreamerEventType,
    initStreamerEvents,
} from "../streamer/streamer-events";
import { EventEmitter } from "./EventEmitter";
import { Player } from "./Player";
import { Queue } from "./Queue";

export interface MediaSegment {
    duration: number;
    uri: string;
}

export class Streamer {
    public mediaSegments: MediaSegment[] = []; // 媒体分片的数组
    public mediaSourceObject: MediaSource = new MediaSource(); // MediaSource 对象
    public videoSourceBuffer!: SourceBuffer;
    public loadedBuffer: Array<ArrayBuffer> = [];
    public updatingQueue: Queue<Function> = new Queue();
    private _baseURL: string;
    private _currentSegment: number = 0; // 当前播放的 segment 的索引
    private static _eventEmitter: EventEmitter = new EventEmitter();

    get currentSegment(): number {
        return this._currentSegment;
    }

    set currentSegment(value: number) {
        this._currentSegment = value;
        Streamer.emit(StreamerEventType.SegmentUpdate);
    }

    constructor(
        baseURL: string = "https://playertest.longtailvideo.com/adaptive/bipbop/gear4/"
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

    async loadSegment(sourceBuffer: SourceBuffer, targetSegment?: number) {

        console.log('加载片段');
        

        let LoadingSegment = 0;

        // 如果指定了加载片段就加载定义的
        // 如果未指定，就计算应加载的
        if (targetSegment) {
            LoadingSegment = targetSegment;
        } else if (this.loadedBuffer.length !== 0) {
            LoadingSegment = this._currentSegment + 1;
        }

        if (LoadingSegment >= this.mediaSegments.length - 1) return; // 如果已经加载完所有 segment 就返回

        if (this.loadedBuffer[LoadingSegment]) {
            this.updatingQueue.enqueue(() => {
                Player.mediaElement.currentTime = sliderValue.value; // 修改进度变量，触发相应事件
            })

            return;
        }; // 如果已经加载过就返回

        const segment = this.mediaSegments[LoadingSegment]; // 获取要加载的 segment
        // 获取 segment 数据
        const segmentData = await fetch(`${this._baseURL}${segment.uri}`).then(
            res => res.arrayBuffer()
        );

        this.updatingQueue.enqueue(() => {
            sourceBuffer.appendBuffer(segmentData);
        })

        this.updatingQueue.enqueue(() => {
            Player.mediaElement.currentTime = sliderValue.value; // 修改进度变量，触发相应事件
        })

        this.loadedBuffer[LoadingSegment] = segmentData; // 将加载的 segment 加入已加载的集合
    }

    private async onSourceOpen() {
        if (!this.mediaSourceObject || this.videoSourceBuffer) return;

        // 添加视频流
        const videoSourceBuffer = this.mediaSourceObject.addSourceBuffer(
            'video/mp2t; codecs="avc1.42E01E", mp4a.40.2"'
        );
        videoSourceBuffer.timestampOffset = -10;
        // 将视频流赋值给类属性
        this.videoSourceBuffer = videoSourceBuffer;
        videoSourceBuffer.addEventListener(
            "updateend",
            this.onBufferUpdateEnd.bind(this)
        );
 
        await this.loadSegment(videoSourceBuffer);
    }

    private onBufferUpdateEnd(event: Event) {
        Player.emit(StreamerEventType.BufferUpdateEnd);
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
