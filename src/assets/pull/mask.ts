// web 端实现实时防挡脸弹幕 test
import type { Ref } from "vue";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
let Time: number | undefined;
const segmenterConfig: bodySegmentation.MediaPipeSelfieSegmentationMediaPipeModelConfig =
  {
    runtime: "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
    modelType: "general",
  };
const segmenter = await bodySegmentation.createSegmenter(
  model,
  segmenterConfig
);

const worker = new Worker("/src/assets/pull/worker.ts");
export async function detect(
  videoEl: HTMLVideoElement,
  container: HTMLCanvasElement
): Promise<void> {
  clearTimeout(Time);
  // 只在offscreen为undefined时创建新的OffscreenCanvas
  let offscreen = new OffscreenCanvas(container.width, container.height);
  const segmentation = await segmenter.segmentPeople(videoEl);
  const mask = await segmentation[0].mask.toCanvasImageSource();
  worker.postMessage({ canvas: offscreen, mask: mask }, [offscreen]);
  worker.onmessage = function (event) {
    if (event.data.msgType === "mask") {
      let img = new Image(); // 创建一个新的图像对象
      img.src = event.data.val; // 设置图像的源为 imgStr
      img.onload = function () {
        container.style.maskImage = `url(${img.src})`; // 设置遮罩图像
      };
    }
  };
  Time = window.setTimeout(() => detect(videoEl, container), 33);
}
