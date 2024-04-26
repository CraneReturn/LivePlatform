import { Player } from "../models/Player";
import { Streamer } from "../models/Streamer";

export enum StreamerEventType {
    SegmentUpdate = "segmentUpdate"
}

export function initStreamerEvents(this: Streamer): void {

    Streamer.on(StreamerEventType.SegmentUpdate, async (event: any) => {
        
        await this.loadSegment(this._videoSourceBuffer, this.currentSegment);

    });

}
