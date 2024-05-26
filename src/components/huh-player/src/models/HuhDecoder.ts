import { DemuxerEventEnum } from "../enums/DemuxerEventEnum";
import type { EventDispatcher } from "./EventDispatcher";
import { Mp4Demuxer } from "./Mp4Demuxer";

export class HuhDecoder {
    public videoDecoder: VideoDecoder | null = null;
    public demuxer: Mp4Demuxer = new Mp4Demuxer();
    private dispatcher: EventDispatcher;

    constructor(videoURL: string) {
        this.dispatcher = this.demuxer.dispatcher;

        this.init();
        this.demuxer.loadVideo();

    }

    async init() {
        this.initEvents();
        this.initVideoDecoder();
    }

    async initVideoDecoder() {
        this.videoDecoder = new VideoDecoder({
            output: frame => {
                console.log('🚀 ~ HuhDecoder ~ initVideoDecoder ~ frame:', frame);
                const canvas: HTMLCanvasElement | null =
                    document.querySelector(".canvas");
                const ctx = canvas?.getContext("2d");
                const testDraw = () => {
                    ctx?.drawImage(frame, 0, 0, 1280, 720);
                    frame.close();
                };

                requestAnimationFrame(testDraw);
                
            },
            error: e => {
                console.log(e);
            },
        });
    }

    initEvents() {
        this.dispatcher.on(DemuxerEventEnum.Ready, (config: any) => {
            this.videoDecoder?.configure(config);
        })

        this.dispatcher.on(DemuxerEventEnum.SampleReady, (chunk: any) => {
            this.videoDecoder?.decode(chunk);
        })
    }

}


