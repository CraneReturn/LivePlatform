import { PlayerEventType, initPlayerEvents } from "../player/player-event";
import { EventEmitter } from "./EventEmitter";
import { Streamer, type MediaSegment } from "./Streamer";

export class Player extends EventTarget {
    public _streamer: Streamer;
    public duration: number = 0;
    private fragDuration: number = 0;
    public static canvasElement: HTMLCanvasElement;
    public static mediaElement: HTMLMediaElement;
    private static _dragging: boolean = false;
    private static _eventEmitter: EventEmitter;
    public static get currentTime() {
        return Player.mediaElement.currentTime;
    }
    public static set currentTime(currentTime: number) {
        Player.mediaElement.currentTime = currentTime;
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
        super();

        Player.canvasElement = canvasElement;
        // 绑定媒体元素的原生事件到Player类的相应事件
        Player.mediaElement = document.createElement("video");

        Player.mediaElement.addEventListener(
            "timeupdate",
            this.onTimeUpdate.bind(this)
        );
        // 创建 Streamer 类
        this._streamer = new Streamer();

        Player._eventEmitter = new EventEmitter();

        this._initPlayerEvents();
    }

    private _initPlayerEvents() {
        initPlayerEvents.call(this);
    }

    private _initMediaElement() {
        Player.mediaElement.src = URL.createObjectURL(
            this._streamer.mediaSourceObject
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
            value: Player.currentTime, // 将时间更新事件传递给播放器
        });
    }

    public appendSegments(segments: MediaSegment[]) {
        this._streamer.appendSegments(segments);
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
        return new Promise((resolve, reject) => {
            this._eventEmitter.emit(eventName, ...args, resolve);
        })
    }
}
