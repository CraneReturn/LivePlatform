import { Player } from "../models/Player";
import { Streamer } from "../models/Streamer";

export enum StreamerEventType {
    SegmentUpdate = "segmentUpdate",
    SourceOpen = "sourceOpen",
    BufferUpdateEnd = "bufferUpdateEnd",

}

export function initStreamerEvents(this: Streamer): void {

    Streamer.on(StreamerEventType.SegmentUpdate, async (event: any) => {

        await this.loadSegment(this.videoSourceBuffer, this.currentSegment);

    });

    // Streamer.on(StreamerEventType.BufferUpdateEnd, () => {
    //     if (this.mediaSourceObject.readyState == "open") {
    //         this.mediaSourceObject.endOfStream();
    //     }
        
    //     this.currentTime = sliderValue.value
    // })

}
