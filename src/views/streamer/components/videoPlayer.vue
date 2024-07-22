<template>
  <div
    v-bind:class="videoClass ? 'videoPlayer' : 'videoFullScreen'"
    ref="videoPlayer"
  >
    <div class="top">
      <!-- 主播信息 -->
      <div class="anchorInfo">
        <div class="anchorHead">
          <img
            src="https://img0.baidu.com/it/u=4004819410,1131625318&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt="主播头像"
          />
        </div>
        <div class="stream">
          <p class="streamName">超级无敌霸王龙战士</p>
          <p class="likeNum">1.5万本场点赞</p>
        </div>
        <button class="follow">关注</button>
        <button class="share"><i class="iconfont icon-zhuanfa"></i></button>
      </div>
    </div>
    <div class="showTable">
      <canvas class="barrage" ref="barrage">
        <!-- 弹幕 -->
      </canvas>
      <video
        autoplay
        ref="canvasVideo"
        class="canvasVideo"
        width="920"
        height="1280"
      ></video>
      <canvas class="AnimationEffect" ref="showArea"></canvas>
    </div>
    <div class="footer">
      <div class="left">
        <button class="pause" @click="pause">
          <i v-if="play" class="iconfont icon-weibiaoti519"></i>
          <i v-else class="iconfont icon-kaishi1"></i>
        </button>
        <button class="refresh" @click="refresh">
          <i class="iconfont icon-shuaxin"></i>
        </button>
        <div class="sendMessage">
          <input
            placeholder="发射弹幕~~"
            class="message"
            v-model="message"
            maxlength="50"
          />
          <button class="textSet">
            <i class="iconfont icon-fuwenbenbianjiqi_zitiyanse"></i>
          </button>
          <button class="send">发送</button>
        </div>
      </div>

      <div class="right">
        <div class="definition">
          <!-- 当前清晰度 -->
          <p class="correct">标清</p>
        </div>

        <button class="barrage">
          <i class="iconfont icon-danmushezhi"></i>
        </button>

        <button class="barrage">
          <contenShowdesigned />
        </button>
        <button class="gift">
          <i class="iconfont icon-liwu"></i>
        </button>
        <div class="volumeControls">
          <div class="contain">
            <el-slider v-model="volume" vertical height="150px" />
          </div>

          <button class="volume" @click="muted">
            <i v-if="mute && !volume" class="iconfont icon-jingyin"></i>
            <i v-else class="iconfont icon-shengyin"></i>
          </button>
        </div>

        <button class="fullScreen" @click="fullScreen">
          <i
            class="iconfont"
            v-bind:class="videoClass ? 'icon-quanping' : 'icon-huanyuan'"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import contenShowdesigned from "./barrage/contenShowdesigned.vue";
import { useFlvPlay } from "@/assets/pull/index";
import emitter from "@/utils/event-bus";
import AnimationEffect from "@/assets/effects";
const { setMuted, setVolume, setPlay, init, destroyFlv } = useFlvPlay();
const canvasVideo = ref<HTMLVideoElement | null>(null);
const barrage = ref<HTMLCanvasElement | null>(null);
const videoPlayer = ref<HTMLDivElement | null>(null);
const showArea = ref<HTMLCanvasElement | null>();
let svgaPlayer: AnimationEffect;
let elm: HTMLDivElement | null;

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  document.addEventListener("fullscreenchange", updateFullscreenStatus);
  updateFullscreenStatus(); // 初始检查
  const canvas = canvasVideo.value;
  const contaniner = barrage.value;
  elm = videoPlayer.value;
  if (canvas && contaniner) {
    init(url, canvas, contaniner);
  }
  if (showArea.value) {
    svgaPlayer = new AnimationEffect(showArea.value);
  }
  emitter.on("svga", (data: any) => {
    showAnimation(data);
  });
});
function showAnimation(svga: string) {
  svgaPlayer.init(svga).then(() => {
    svgaPlayer.start();
    svgaPlayer.clearIt();
  });
}
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("fullscreenchange", updateFullscreenStatus);
});
const isFullscreen = ref(false);
const updateFullscreenStatus = () => {
  isFullscreen.value = document.fullscreenElement !== null;
};
const videoClass = ref(true);
const message = ref("");
let prevVolume = 50;
const play = ref(true);
const mute = ref(true);
const volume = ref(0);
const url = "http://118.31.245.3/live?port=1935&app=live&stream=test";
function pause() {
  setPlay(!play.value);
  play.value = !play.value;
}
setVolume(volume.value);
watch(volume, (newValue) => {
  if (volume.value > 0) {
    mute.value = false;
    setMuted(mute.value);
  }
  setVolume(newValue);
});
watch(isFullscreen, (newValue) => {
  if (isFullscreen.value) {
    videoClass.value = false;
  } else {
    videoClass.value = true;
  }
});
function muted() {
  console.log(mute.value);
  if (mute.value) {
    // 如果目前不是静音
    volume.value = prevVolume; // 恢复前一个音量值
  } else {
    // 如果目前是静音
    prevVolume = volume.value; // 保存当前的音量值
    volume.value = 0; // 把音量设置为0
  }
  setMuted(!mute.value);
  mute.value = !mute.value;
}
function refresh() {
  destroyFlv();
  const canvas = canvasVideo.value;
  const contaniner = barrage.value;
  if (canvas && contaniner) {
    init(url, canvas, contaniner);
  }
}
// 全屏显示
let full = false;
function fullScreen(event: any) {
  if (elm) {
    if (!full) {
      if (elm.requestFullscreen) {
        elm.requestFullscreen();
        videoClass.value = false;
      }
      full = true;
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
        videoClass.value = true;
      }
      full = false;
    }
  }
}
const handleKeyDown = (event: {
  keyCode: number;
  preventDefault: () => void;
}) => {
  if (event.keyCode === 122) {
    event.preventDefault();
  }
};
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4515498_yzard7rdqhs.css");
.el-popover {
  max-width: 100px;
}
// 全屏下的样式
.videoFullScreen {
  @extend .videoPlayer;
  .showTable {
    height: 100% !important;
  }
  .sendMessage {
    display: block !important;
    input {
      min-width: 470px !important;
    }
  }
}
.AnimationEffect {
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
  min-width: 300px;
  height: 100%;
}
.videoPlayer {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, white, 90%, #191f1c);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .showTable {
    height: 79vh;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    mask-size: cover;
    .barrage {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  .canvasVideo {
    height: 100%;
    margin: 0 auto;
    width: 100%;
    /* object-fit: cover; */
  }
  .top {
    min-height: 75px;
    position: absolute;
    align-items: center;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    top: -75px;
    z-index: 100;
    line-height: unset;
    transition-duration: 0.5s;
  }
  .anchorInfo {
    display: flex;
    align-items: center;
    padding: 5px;
    width: auto;
    height: 45px;
    background-color: rgba(73, 73, 73, 0.5);
    border-radius: 20px;
    gap: 5px;
    .anchorHead {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .stream {
      font-size: 12px;
      color: #fff;
      .likeNum {
        font-size: 10px;
        color: #ccc;
      }
    }
    .follow {
      background-color: #fe2c55;
      height: 30px;
      width: 40px;
      border-radius: 15px;
      border: none;
      cursor: pointer;
      color: #fff;
      font-size: 12px;
      font-weight: 400;
    }
    .share {
      background-color: #343434aa;
      height: 30px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      i {
        font-size: 18px;
        color: #8e8e8e;
      }
    }
  }
  .footer {
    position: absolute;
    transition-duration: 0.5s;
    bottom: -50px;
    height: 50px;
    padding: 0 15px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    display: flex;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    .iconfont {
      font-size: 17px;
      color: #fff;
      pointer-events: none;
    }
    .right,
    .left {
      display: flex;
      gap: 20px;
    }
    .sendMessage {
      position: relative;
      display: none;
      input {
        padding: 2px 30px;
        padding-right: 55px;
        height: 30px;
        border-radius: 10px;
        outline: none;
        border: none;
        background-color: #f0f8ffc4;
      }
      button {
        position: absolute;
      }
      .textSet {
        left: 0;
        top: 4px;
        .iconfont {
          color: #191f1c74;
        }
      }
      .send {
        background-color: #fe2c55;
        right: 0;
        height: 100%;
        border: none;
        font-size: 13px;
        width: 50px;
        border-radius: 2px;
        color: #fff;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    .correct {
      font-size: 12px;
      width: 32px;
      color: #fff;
      font-weight: 400;
      cursor: pointer;
    }
  }
}
.volumeControls {
  position: relative;
}
.volumeControls:hover {
  .contain {
    display: block;
  }
}
.contain {
  height: 170px;
  padding: 20px 5px;
  background-color: #33343f;
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translate(-55%, 0);
  display: none;
}
.videoPlayer:hover {
  .footer {
    bottom: 0;
  }
  .top {
    top: 0;
  }
}
@media screen and (max-width: 1200px) {
  .videoPlayer {
    .footer {
      .sendMessage {
        display: inline-block;
      }
      .left,
      .right {
        gap: 15px;
      }
    }
  }
}
</style>
