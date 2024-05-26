import MP4Box, { type MP4ArrayBuffer, type MP4File } from "@webav/mp4box.js";
import { getMP4 } from "../utils/get-video";
import { EventDispatcher } from "./EventDispatcher";
import { DemuxerEventEnum } from "../enums/DemuxerEventEnum";

export class Mp4Demuxer {
    public mp4BoxFile: MP4File = MP4Box.createFile();
    public dispatcher: EventDispatcher = new EventDispatcher();
    constructor() {
        this.initEvents();
    }

    initEvents() {
        this.mp4BoxFile.onReady = this.onReady.bind(this); // 监听onReady事件
        this.mp4BoxFile.onSamples = this.onSample.bind(this);
        this.mp4BoxFile.onError = this.onError.bind(this); // 监听onError事件
        this.mp4BoxFile.onMoovStart = this.onMoovStart.bind(this);
        
    }

    async loadVideo() {
        const isLoaded = await getMP4.apply(this);
        this.mp4BoxFile.start();
        if (isLoaded) {
        }
    }

    onReady(info: any) {
        const videoTrack = this.mp4BoxFile.getTrackById(1);
        for (const entry of videoTrack.mdia.minf.stbl.stsd.entries) {
            const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
            if (box) {
                const stream = new MP4Box.DataStream(
                    undefined,
                    0,
                    MP4Box.DataStream.BIG_ENDIAN
                );
                box.write(stream);
                const description = new Uint8Array(stream.buffer, 8);

                const config = {
                    codec: "avc1.42c01e",
                    codedWidth: 1280,
                    codedHeight: 720,
                    description,
                };

                this.dispatcher.emit(DemuxerEventEnum.Ready, config);
            }
        }

        this.mp4BoxFile.setExtractionOptions(1, null, {
            nbSamples: 100
        });
        
        
    }


    onMoovStart() {
        console.log("Starting to receive File Information");
    }

    onError(error: any) {
        console.log("error");
    }

    onSample(id: number, user: object, samples: Array<any>) {
        console.log(66)
        for (const sample of samples) {
            const chunk = new EncodedVideoChunk({
                type: sample.is_sync ? "key" : "delta",
                timestamp: sample.cts,
                duration: sample.duration,
                data: sample.data,
            });

            this.dispatcher.emit(DemuxerEventEnum.SampleReady, chunk);
        }
    }
    
}