import { Streamer, type MediaSegment } from "./Streamer";

interface MediaEventMap {
    play: Event;
    pause: Event;
    ended: Event;
    timeupdate: Event
}

export class Player extends EventTarget {
    // video元素
    public _mediaElement: HTMLMediaElement;
    private _streamer: Streamer;
    public canvasElement: HTMLCanvasElement;

    constructor(canvasElement: HTMLCanvasElement) {
        super();

        this.canvasElement = canvasElement;
        // 绑定媒体元素的原生事件到Player类的相应事件
        this._mediaElement = document.createElement('video');
        // 创建 Streamer 类
        this._streamer = new Streamer();

        this._mediaElement.addEventListener('play', this.onPlayer.bind(this));

        this._mediaElement.controls = true;

        this._bindMediaEvents();
    }

    // 绑定媒体元素的原生事件到Player类的相应事件
    private _bindMediaEvents() {
        const eventsToBind: Array<keyof MediaEventMap> = [
            "play",
            "pause",
            "ended",
            "timeupdate",
        ];
        eventsToBind.forEach(event => {
            console.log(this._mediaElement);
            
            this._mediaElement.addEventListener(event, () => {
                this.dispatchEvent(new Event(event));
            });
        });
    }

    private onPlayer() {
        const ctx = this.canvasElement.getContext('2d');
        
        const draw = () => {
            ctx?.drawImage(this._mediaElement as CanvasImageSource, 0, 0, this.canvasElement.width, this.canvasElement.height);

            requestAnimationFrame(draw);
        };

        requestAnimationFrame(draw);
    }

    initMediaElement() {
        this._mediaElement.src = URL.createObjectURL(this._streamer.mediaSourceObject);
        this._mediaElement.autoplay = true;
        this._mediaElement.controls = true;
        this._mediaElement.muted = true;
    }

    public appendSegments(segments: MediaSegment[]) {
        this._streamer.appendSegments(segments);
        this.initMediaElement();
    }

}
