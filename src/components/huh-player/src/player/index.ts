/**
 * @param rootEle - 要将 canvas 添加到的父元素
 * @returns 创建的canvas元素
 */
export function initFrame(rootEle: HTMLElement): HTMLVideoElement {

    // 创建canvas元素
    const canvasEle = document.createElement('canvas');
    const videoEle = document.createElement('video');
    const ctx = canvasEle.getContext('2d');

    const drawFrame = () => {

        if (videoEle.paused || videoEle.ended) return;

        ctx?.drawImage(videoEle, 0, 0, canvasEle.width, canvasEle.height);
        requestAnimationFrame(drawFrame);
    }

    // 将canvas元素插入到指定父元素中
    rootEle.append(canvasEle, videoEle);

    return videoEle;
}