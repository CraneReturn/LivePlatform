import { PlayerEventType, initPlayerEvents } from "../player/player-event";
import { EventEmitter } from "./EventEmitter";
import { Streamer, type MediaSegment } from "./Streamer";

export class Player {
    public streamer: Streamer = new Streamer();
    public duration: number = 0;
    private fragDuration: number = 0;
    private _currentTime: number = 0;
    public static canvasElement: HTMLCanvasElement;
    public static mediaElement: HTMLMediaElement =
        document.createElement("video");
    private static _dragging: boolean = false;
    private static _eventEmitter: EventEmitter = new EventEmitter();
    public get currentTime() {
        return this._currentTime;
    }
    public set currentTime(currentTime: number) {
        this._currentTime = currentTime;

        // 计算新的 segment 索引
        const newCurrentSegment = Math.floor(this.currentTime / 10);
        const currentSegment = this.streamer.currentSegment;

        // 如果索引不同，则更新 currentSegment
        if (newCurrentSegment !== currentSegment) {
            this.streamer.currentSegment = newCurrentSegment;
        }

    }
    public static get dragging() {
        return Player._dragging;
    }
    public static set dragging(value: boolean) {
        Player._dragging = value;
        if (value) {
            Player.emit(PlayerEventType.Seek);
        } else {
            Player.emit(PlayerEventType.Seeked);
        }
    }

    constructor(canvasElement: HTMLCanvasElement) {
        Player.canvasElement = canvasElement;
        // 绑定媒体元素的原生事件到Player类的相应事件

        // Player.mediaElement.addEventListener(
        //     "timeupdate",
        //     this.onTimeUpdate.bind(this)
        // );

        Player.mediaElement.addEventListener(
            "durationchange",
            this.onDurationChange.bind(this)
        );

        // 初始化监听事件
        this._initPlayerEvents();
    }

    private _initPlayerEvents() {
        initPlayerEvents.call(this);
    }

    private _initMediaElement() {
        Player.mediaElement.src = URL.createObjectURL(
            this.streamer.mediaSourceObject
        );
        Player.mediaElement.autoplay = true;
        Player.mediaElement.controls = true;
        Player.mediaElement.muted = true;
    }

    // video 标签的时间更新事件
    private onTimeUpdate() {
        Player.emit(PlayerEventType.TimeUpdate, {
            type: PlayerEventType.TimeUpdate,
            target: this,
            value: this.currentTime, // 将时间更新事件传递给播放器
        });
    }

    private onDurationChange() {
        Player.emit(PlayerEventType.DurationChange, {
            type: PlayerEventType.DurationChange,
            target: this,
            value: this.duration, // 将时间更新事件传递给播放器
        });
    }

    public appendSegments(segments: MediaSegment[]) {
        this.streamer.appendSegments(segments);
        this._initMediaElement();
        this.duration = segments[0].duration * segments.length;
        this.fragDuration = segments[0].duration;
    }

    static play() {
        Player.emit(PlayerEventType.PlayStart);
    }

    static pause() {
        Player.emit(PlayerEventType.Pause);
    }

    static on(eventName: string, listener: Function) {
        this._eventEmitter.on(eventName, listener);
    }

    static emit(eventName: string, ...args: any[]) {
        this._eventEmitter.emit(eventName, ...args);
    }
}
