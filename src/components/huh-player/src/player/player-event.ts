import { ref } from "vue";
import { Player } from "../models/Player";
import { Streamer } from "../models/Streamer";
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
    DurationChange = "durationChange"
}

export interface PlayerEvent {
    readonly type: PlayerEventType;
    readonly target: Player; // 事件目标为Player类型
    readonly value?: any;
}

export const sliderValue = ref(0);

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
        // 进度条得值跟随 video 标签得进度条更改
        if (Player.dragging === false) {
            sliderValue.value = Player.currentTime; // 大坑！！ 就不该用event.value 逆天
        }

        // 计算新的 segment 索引
        const newCurrentSegment = Math.floor(Player.currentTime / 10);
        const currentSegment = this._streamer.currentSegment;

        // 如果索引不同，则更新 currentSegment
        if (newCurrentSegment !== currentSegment) {
            this._streamer.currentSegment = newCurrentSegment;
        }
    });

    // 开始拖拽
    Player.on(PlayerEventType.Seek, () => {
        if (Player.dragging) return;
    });

    // 拖拽结束
    Player.on(PlayerEventType.Seeked, async () => {

        Player.emit(PlayerEventType.TimeUpdate, {
            type: PlayerEventType.Seeked,
            target: this,
            value: sliderValue.value,
        });

        // 计算新的 segment 索引
        const newCurrentSegment = Math.floor(Player.currentTime / 10);
        const currentSegment = this._streamer.currentSegment;

        // 如果索引不同，则更新 currentSegment
        if (newCurrentSegment !== currentSegment) {
            this._streamer.currentSegment = newCurrentSegment;
        }

        Player.currentTime = sliderValue.value; // 修改进度变量，触发相应事件
    });

    // video 标签duration属性更改事件
    Player.on(PlayerEventType.DurationChange, () => {
        Player.mediaElement.currentTime = Player.currentTime; // 修改进度变量，触发相应事件
    })
}
