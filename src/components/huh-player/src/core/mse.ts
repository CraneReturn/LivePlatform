const mediaSource: MediaSource = new MediaSource();

const videoEle: HTMLVideoElement = initFrame(rootEle);

videoEle.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener("sourceopen", () => {
    const sourceBuffer = mediaSource.addSourceBuffer(
        'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
    );
});
