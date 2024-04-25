import { ref } from "vue";
import { Player } from "../models/Player";
import { fa } from "element-plus/es/locales.mjs";

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
    Player.on(PlayerEventType.TimeUpdate, async (event: PlayerEvent, resolve: any) => {
        // 进度条得值跟随 video 标签得进度条更改
        if (Player.dragging === false) {
            sliderValue.value = event.value;
        }
        
        // 如果更改了时间，则更新当前播放的 segment 的索引
        const newCurrentSegment = Math.floor(event.value / 10);
        const currentSegment = this._streamer.currentSegment;

        
        if (newCurrentSegment !== currentSegment) {
            this._streamer.currentSegment = newCurrentSegment;   
        }

        await this._streamer.loadSegment(this._streamer._videoSourceBuffer);

        resolve();

    });

    // 开始拖拽
    Player.on(PlayerEventType.Seek, () => {
        if (Player.dragging) return;
    });

    // 拖拽结束
    Player.on(PlayerEventType.Seeked, async () => {  
        
        await Player.emit(PlayerEventType.TimeUpdate, {
            type: PlayerEventType.Seeked,
            target: this,
            value: sliderValue.value
        })

        Player.currentTime = sliderValue.value;

        console.log(this._streamer._videoSourceBuffer);
        
    });
}
