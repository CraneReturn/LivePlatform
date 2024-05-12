// web 端实现实时防挡脸弹幕 test
import type { Ref } from "vue";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
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
  canvas: Ref<HTMLCanvasElement>
): Promise<void> {
  // 只在offscreen为undefined时创建新的OffscreenCanvas
  let offscreen = new OffscreenCanvas(canvas.value.width, canvas.value.height);
  const segmentation = await segmenter.segmentPeople(videoEl);
  const mask = await segmentation[0].mask.toCanvasImageSource();
  worker.postMessage({ canvas: offscreen, mask: mask }, [offscreen]);
  worker.onmessage = function (event) {
    if (event.data.msgType === "mask") {
      const img = new Image();
      img.src = event.data.val;
      img.onload = function () {
        canvas.value.style.maskImage = `url(${event.data.val})`;
      };
    }
  };
  window.setTimeout(() => detect(videoEl, canvas), 66);
}
