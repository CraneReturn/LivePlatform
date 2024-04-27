import { ref } from "vue";
import { Player } from "../models/Player";
import { StreamerEventType } from "../streamer/streamer-events";

export enum PlayerEventType {
    PlayStart = "playStart",
    Pause = "pause",
    Resume = "resume",
    Stop = "stop",
    Seek = "seek",
    Seeked = "seeked",
    VolumeChange = "volumeChange",
    Mute = "mute",
    Unmute = "unmute",
    FullscreenEnter = "fullscreenEnter",
    FullscreenExit = "fullscreenExit",
    Error = "error",
    TimeUpdate = "timeupdate",
    DurationChange = "durationChange",
}

export interface PlayerEvent {
    readonly type: PlayerEventType;
    readonly target: Player; // 事件目标为Player类型
    readonly value?: any;
}

export const sliderValue = ref(0);

export let removeFlag = false;

export function initPlayerEvents(this: Player): void {
    Player.on(PlayerEventType.PlayStart, () => {
        Player.mediaElement.play();

        const ctx = Player.canvasElement.getContext("2d");
        const draw = () => {
            ctx?.drawImage(
                Player.mediaElement as CanvasImageSource,
                0,
                0,
                Player.canvasElement.width,
                Player.canvasElement.height
            );

            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    });

    // 暂停事件
    Player.on(PlayerEventType.Pause, () => {
        Player.mediaElement.pause();
    });

    // 时间更新事件
    Player.on(PlayerEventType.TimeUpdate, async (event: PlayerEvent) => {
        this.currentTime = Player.mediaElement.currentTime;

        // 进度条得值跟随 video 标签得进度条更改
        if (Player.dragging === false) {
            sliderValue.value = this.currentTime;
        }

    });

    // 开始拖拽
    Player.on(PlayerEventType.Seek, () => {
        if (Player.dragging) return;
    });

    // 拖拽结束
    Player.on(PlayerEventType.Seeked, () => {

        this.streamer.videoSourceBuffer.abort();

        this.currentTime = sliderValue.value;
    });

    // video 标签duration属性更改事件
    Player.on(StreamerEventType.BufferUpdateEnd, () => {
        Player.mediaElement.currentTime = sliderValue.value;
    });
}
