// 在本ts中主要用于创建一个虚拟的video（不用于vue渲染中）
export const createVideo = ({
    muted = true,
    autoPlay = true,
    controls = false,
}) => {
    const video = document.createElement('video');
    video.muted = muted;
    video.autoplay = autoPlay;
    video.controls = controls;
    return video;
};
