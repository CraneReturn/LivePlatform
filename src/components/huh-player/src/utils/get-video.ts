import type { Mp4Demuxer } from "../models/Mp4Demuxer";

export async function getMP4(
    this: Mp4Demuxer,
    filePath: string = "https://w3c.github.io/webcodecs/samples/data/bbb_video_avc_frag.mp4"
) {
    const res = await fetch(
        "https://w3c.github.io/webcodecs/samples/data/bbb_video_avc_frag.mp4"
    );
    const videoStream = res.body;

    if (videoStream) {
        const reader = videoStream?.getReader();

        let offset = 0;

        while (true) {
            const { done, value } = await reader.read();
            

            if (done) {
                this.mp4BoxFile.flush();
                return true;
            }

            const buffer = value.buffer;
            buffer.fileStart = offset; // 一定要先设置fileStart
            offset += buffer.byteLength;
            

            this.mp4BoxFile.appendBuffer(buffer);
        }
            
    }
}
