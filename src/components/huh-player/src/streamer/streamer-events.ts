import { Player } from "../models/Player";
import { Streamer } from "../models/Streamer";
import { sliderValue } from "../player/player-event";

export enum StreamerEventType {
    SegmentUpdate = "segmentUpdate",
    SourceOpen = "sourceOpen",
    BufferUpdateEnd = "bufferUpdateEnd",

}

export function initStreamerEvents(this: Streamer): void {

    Streamer.on(StreamerEventType.SegmentUpdate, async (event: any) => {

        // await this.loadSegment(this.videoSourceBuffer, this.currentSegment);

    });

    Streamer.on(StreamerEventType.BufferUpdateEnd, () => {
        Player.mediaElement.currentTime = sliderValue.value;
        console.log('updateend');
        
    })

}
