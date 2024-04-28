import { ref } from "vue";
import { Player } from "../models/Player";

export enum PlayerEventType {
    PlayStart = "playStart",
    Pause = "pause",
    Resume = "resume",
    Stop = "stop",
    Seeking = "seeking",
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
    Player.on(PlayerEventType.TimeUpdate, () => {

        // 进度条得值跟随 video 标签得进度条更改
        if (Player.dragging === false) {

            const newCurrentTime = Player.mediaElement.currentTime;

            sliderValue.value = newCurrentTime;
            this.streamer.currentTime = newCurrentTime;
        }

        const buffered = this.streamer.videoSourceBuffer.buffered;
        const lastIndex = buffered.length - 1;

        if (Player.mediaElement.currentTime >= buffered.end(lastIndex) - 5) {
            this.streamer.mediaPreLoader.startPreloading([this.streamer.mediaSegments[this.streamer.currentSegment + 1].uri]);
        }
        
    });

    Player.on(PlayerEventType.Seeking, () => {
        // 拖拽开始
        if (!Player.dragging) {
            Player.dragging = true;
        }
    })

    // 拖拽结束
    Player.on(PlayerEventType.Seeked, async () => {

        Player.dragging = false;

        this.streamer.videoSourceBuffer.abort();

        const targetIndex = sliderValue.value;

        const newCurrentSegment = Math.floor(targetIndex / 10);

        const buffer = this.streamer.mediaPreLoader.getBuffer(this.streamer.mediaSegments[newCurrentSegment].uri);
        
        if (!buffer) {
            this.streamer.mediaPreLoader.enqueueLoadTask(this.streamer.mediaSegments[newCurrentSegment].uri);
        } else {
            Player.mediaElement.currentTime = sliderValue.value;
        }
    });

}
