import { ErrorsEnum } from "../enums/Errors";
import { PlayerError } from "./PlayerError";
import { HuhStreamer } from "./newStreamer";

export class HuhPlayer {
    videoElement: HTMLVideoElement = document.createElement('video');
    canvasElement!: HTMLCanvasElement;
    streamer: HuhStreamer = new HuhStreamer();
    constructor(canvasSelector: string) {
        this.initPlayer(canvasSelector);
        this.streamer.initializeStream();
    }

    initCanvas(canvasSelector: string) {

        const canvas = document.querySelector(canvasSelector);
        
        if (canvas && canvas instanceof HTMLCanvasElement) {
            this.canvasElement = canvas;
        } else if (canvas && !(canvas instanceof HTMLCanvasElement)) {
            throw new PlayerError(ErrorsEnum.InitPlayerError, '初始化播放器异常', '传入的选择器参数不是一个有效的 canvas 元素');
        } else {
            throw new PlayerError(ErrorsEnum.InitPlayerError, '初始化播放器异常', '请检查传入的选择器参数是否正确');
        }

        if (this.canvasElement) {

            const ratio = devicePixelRatio;
            this.canvasElement.width = this.canvasElement.clientWidth * ratio;
            this.canvasElement.height = this.canvasElement.clientHeight * ratio;
            
            const ctx = this.canvasElement.getContext('2d');
            if (ctx) {
                ctx.scale(ratio, ratio);

                const draw = () => {
                    ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);

                    requestAnimationFrame(draw);
                }

                requestAnimationFrame(draw);
            }
        }

    }

    initVideo() {
        this.videoElement.autoplay = true;
        this.videoElement.muted = true;
        this.videoElement.src = 'https://v.cic.tsinghua.edu.cn/vod/video/0/a/508393.mp4';
        document.body.append(this.videoElement);
    }

    initPlayer(canvasSelector: string) {
        this.initCanvas(canvasSelector);
        this.initVideo();
    }
}