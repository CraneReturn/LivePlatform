import { Streamer } from "../models/Streamer";

export enum StreamerEventType {
    SegmentChange = "segmentChange"
}

export function initStreamerEvents(this: Streamer): void {
    Streamer.on(StreamerEventType.SegmentChange, () => {
        
        console.log(this.loadedBuffer);
        
        
    });

}
