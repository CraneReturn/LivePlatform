export interface MediaSegment {
    duration: number,
    uri: string;
}

export class Streamer {

    private baseURL: string;
    private mediaSegments: MediaSegment[];
    mediaElement: HTMLMediaElement;
    private mediaSourceURL: string;
    private mediaSourceObject: MediaSource;
    private _currentSegment: number;
    private videoSourceBuffer: any;
    private audioSourceBuffer: any;
    get currentSegment(): number {
        return this._currentSegment;
    }

    set currentSegment(value: number) {
        this._currentSegment = value;
    }

    get currentTime(): number {
        return this.mediaElement.currentTime;
    }

    get mediaSourceReadyState(): string {
        return this.mediaSourceObject.readyState;
    }

    get mediaSourceBuffered(): SourceBufferList {
        return this.mediaSourceObject.sourceBuffers;
    }

    get mediaSourceBufferedLength(): number {
        return this.mediaSourceObject.sourceBuffers.length;
    }


    constructor(mediaSegments: MediaSegment[]) {
        // video标签
        this.mediaElement = document.createElement('video');
        this.mediaElement.controls = true;
        this.mediaElement.autoplay = true;
        this.mediaElement.muted = true;
        // 创建mse对象
        this.mediaSourceObject = new MediaSource();
        // segments数组
        this.mediaSegments = mediaSegments;
        // 当前播放的 segment 的索引
        this._currentSegment = 0;
        // mse 链接
        this.mediaSourceURL = URL.createObjectURL(this.mediaSourceObject);
        // 获取ts文件的基网址
        this.baseURL = 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/';

        this.mediaSourceObject.addEventListener('sourceopen', this.onSourceOpen.bind(this));

        this.mediaElement.src = this.mediaSourceURL;
        
    }

    private onBufferUpdateEnd() {

        this.loadSegment(this.videoSourceBuffer);
        
        if (this.videoSourceBuffer.updating == false && this.mediaSourceObject.readyState == 'open') {
            this.mediaSourceObject.endOfStream();
        }
    }

    private async loadSegment(sourceBuffer: SourceBuffer) {

        if (this.currentSegment >= this.mediaSegments.length - 1) return;

        const segment = this.mediaSegments[this.currentSegment];
        const segmentData = await fetch(`${this.baseURL}${segment.uri}`).then(res => res.arrayBuffer());
        sourceBuffer.appendBuffer(segmentData);
        this.currentSegment++;
    }

    private async onSourceOpen() {
        
        if (!this.mediaSourceObject || this.videoSourceBuffer) return;

        // 添加视频流
        const videoSourceBuffer = this.mediaSourceObject.addSourceBuffer('video/mp2t; codecs="avc1.42E01E"');
        videoSourceBuffer.timestampOffset = -10;
        await this.loadSegment(videoSourceBuffer);
        videoSourceBuffer.addEventListener('updateend', this.onBufferUpdateEnd.bind(this));
        this.videoSourceBuffer = videoSourceBuffer;


    }

}
