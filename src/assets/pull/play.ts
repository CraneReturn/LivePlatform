import { ref, onUnmounted, type Ref, watch } from "vue";
import Hls from "hls.js";
import { useStreamerStore } from "@/store/streamer/play";
import { detect } from "./mask";

export function useHlsPlay() {
  let animationFrameId: number | null = null; // 用于存储 requestAnimationFrame 返回的 ID，这样我们就可以取消它
  const hls = new Hls();
  const videoStates = useStreamerStore();
  const HlsPlayer = ref<Hls | null>(null);
  const retryTimer = ref<number | null>(null); // 定时器
  const virtualVideo = ref<HTMLVideoElement | null>(null);

  onUnmounted(() => {
    destroyHls();
  });

  function destroyHls() {
    if (HlsPlayer.value) {
      HlsPlayer.value.destroy();
      HlsPlayer.value = null;
    }
    if (virtualVideo.value) {
      virtualVideo.value.remove();
      virtualVideo.value = null;
    }
    if (retryTimer.value !== null) {
      clearInterval(retryTimer.value);
      retryTimer.value = null;
    }
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function setMuted(val: boolean) {
    if (virtualVideo.value) {
      virtualVideo.value.muted = val;
    }
  }

  function setVolume(val: number) {
    if (virtualVideo.value) {
      virtualVideo.value.volume = val / 100;
    }
  }

  function setPlay(val: boolean) {
    if (val) {
      try {
        virtualVideo.value?.play();
      } catch (error) {
        console.error("Hls播放失败", error);
      }
    } else {
      try {
        virtualVideo.value?.pause();
      } catch (error) {
        console.error("Hls暂停失败", error);
      }
    }
  }

  watch(
    () => videoStates.muted,
    (newVal) => {
      setMuted(newVal);
    }
  );

  watch(
    () => videoStates.volume,
    (newVal) => {
      setVolume(newVal);
    }
  );

  watch(
    () => videoStates.playing,
    (newVal) => {
      if (newVal) {
        setPlay(newVal);
      }
    }
  );

  async function init(
    source: string,
    video: HTMLVideoElement,
    container: HTMLCanvasElement
  ): Promise<Hls | null> {
    if (Hls.isSupported()) {
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error) => console.error("视频播放失败", error));
      });

      video.addEventListener("canplay", () => {
        detect(video, container);
        setMuted(videoStates.muted);
        setVolume(videoStates.volume);
      });

      setPlay(true);
      HlsPlayer.value = hls;
      return hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((error) => console.error("视频播放失败", error));
      });
    }
    return null;
  }

  return { setPlay, setVolume, setMuted, init, destroyHls };
}
