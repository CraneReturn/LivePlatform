// 此处是用于进行拉流的主要代码（webcodecs）
//  初始化直播信息attachMediaElemeninit
import flvjs from "flv.js";
import { ref, onUnmounted } from "vue";
import { createVideo } from "./createVideo";
const videoElement = createVideo({});
let flvPlayer: Ref<flvjs.Player | null> = ref();
export function init(source: string) {
  if (flvjs.isSupported()) {
    // 判断浏览器是否支持
    flvPlayer = flvjs.createPlayer({
      type: "mp4",
      isLive: true,
      url: source,
    });
    flvPlayer.attachMediaElement(videoElement);
    // 获取当前创建视频的视频流文件
    let stream = (videoElement as any).captureStream();
    return stream;
  }
}
// 封装一个usePull的函数（用于用户拉流）
export function usePull(roomid: string) {
  onUnmounted(() => {
    // 取消挂载
    // 即用户不再使用播放器
    handleStopDrawing();
  });
}
function handleStopDrawing() {}
