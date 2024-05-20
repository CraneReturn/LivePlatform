import { ref, onUnmounted, type Ref, watch } from "vue";
import flvjs from "flv.js";
import { createVideo } from "./play";
import { useStreamerStore } from "@/store/streamer/play";
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";

// 使用flv进行视频拉流
export function useFlvPlay() {
    let animationFrameId: any; // 用于存储 requestAnimationFrame 返回的 ID，这样我们就可以取消它
    const videoStates = useStreamerStore();
    const flvPlayer = ref<flvjs.Player>();
    const retryTimer = ref(); //定时器
    const virtualVideo = ref<HTMLVideoElement>();
    const retry = ref(false); //是否需要重新加载
    const flvIsPlaying = ref(false); // flv当前状态
    //   取消挂载时（用户关闭直播/浏览器）
    onUnmounted(() => {
        // 销毁flv
        destroyFlv();
    });
    function destroyFlv() {
        if (flvPlayer.value) {
            flvPlayer.value.destroy();
            flvPlayer.value = undefined;
        }
        virtualVideo.value?.remove();
        virtualVideo.value = undefined;
        //  清除定时
        clearInterval(retryTimer.value);
        cancelAnimationFrame(animationFrameId);
    }
    // 对视频文件设置静音
    function setMuted(val: boolean) {
        if (virtualVideo.value) {
            virtualVideo.value.muted = val;
        }
        if (flvPlayer.value) {
            flvPlayer.value.muted = val;
        }
    }
    function setVolume(val: number) {
        if (virtualVideo.value) {
            virtualVideo.value.volume = val / 100;
        }
        if (flvPlayer.value) {
            flvPlayer.value.volume = val / 100;
        }
    }
    function setPlay(val: boolean) {
        if (val) {
            try {
                virtualVideo.value?.play();
                flvPlayer.value?.play();
            } catch (error) {
                console.error("flv播放失败");
                console.log(error);
            }
        } else {
            try {
                virtualVideo.value?.pause();
                flvPlayer.value?.pause();
            } catch (error) {
                console.error("flv暂停失败");
                console.log(error);
            }
        }
    }
    watch(
        () => videoStates.muted,
        newVal => {
            setMuted(newVal);
        }
    );

    watch(
        () => videoStates.volume,
        newVal => {
            setVolume(newVal);
        }
    );

    watch(
        () => videoStates.playing,
        newVal => {
            if (newVal) {
                console.log(newVal);

                setPlay(newVal);
            }
        }
    );
    function init(source: string, canvas: Ref<HTMLCanvasElement>) {
        return new Promise(resolve => {
            async function main() {
                // 加载抠图模型
                const net = await bodyPix.load();
                const ctx = canvas.value?.getContext("2d");

                if (flvjs.isSupported()) {
                    flvPlayer.value = flvjs.createPlayer(
                        {
                            type: "flv",
                            isLive: true,
                            url: source,
                        },
                        {
                            enableStashBuffer: true,
                            stashInitialSize: 384 * 1024, // 修改缓冲区大小为 384KB
                        }
                    );
                    const videoElement = createVideo({});
                    flvPlayer.value.attachMediaElement(videoElement);
                    flvPlayer.value.load();
                    virtualVideo.value = videoElement;

                    async function drawVideoFrame() {
                        if (!ctx) {
                            // 如果 ctx 是 undefined，我们停止画图并返回
                            cancelAnimationFrame(animationFrameId);
                            return;
                        }
                        // 进行人体分割
                        // const segmentation =
                        //     await net.segmentPerson(videoElement);

                        // // 生成遮罩，将人物与背景分开
                        // const mask = bodyPix.toMask(
                        //     segmentation,
                        //     { r: 0, g: 0, b: 0, a: 0 },
                        //     { r: 0, g: 0, b: 0, a: 0 }
                        // );

                        // 应用遮罩到视频帧，得到只有人物的图像
                        // bodyPix.drawMask(canvas.value, videoElement, mask);
						ctx.drawImage(videoElement, 0, 0, 1280, 720);
                        // 计划下一帧的更新
                        animationFrameId =
                            requestAnimationFrame(drawVideoFrame);
                    }

                    videoElement.addEventListener("canplay", () => {
                        drawVideoFrame();
                        flvIsPlaying.value = true;
                        setMuted(videoStates.muted);
                        setVolume(videoStates.volume);
                        resolve(flvPlayer);
                    });
                    setPlay(true);
                }
            }
            main();
        });
    }
    return { setPlay, setVolume, setMuted, init, destroyFlv };
}
