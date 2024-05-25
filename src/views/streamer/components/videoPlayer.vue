<template>
  <div class="videoPlayer">
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
      <div class="barrage" ref="barrage">
        <!-- 弹幕 -->
      </div>
      <canvas
        ref="canvasVideo"
        class="canvasVideo"
        width="920"
        height="1280"
      ></canvas>
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
          <contenShowdesigned/>
          
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

        <button class="fullScreen">
          <i class="iconfont icon-quanping"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import contenShowdesigned from './barrage/contenShowdesigned.vue'
import { useFlvPlay } from "@/assets/pull";
const { setMuted, setVolume, setPlay, init, destroyFlv } = useFlvPlay();
const canvasVideo = ref<HTMLCanvasElement>(null);
const barrage = ref<HTMLDivElement>(null);
onMounted(() => {
  init(url, canvasVideo, barrage);
});
let prevVolume = 50;
const play = ref(true);
const mute = ref(true);
const volume = ref(0);
const url =
  "https://pull-flv-spe-l11.douyincdn.com/fantasy/stream-403377428305019574_sd.flv?_neptune_token=MIGlBAzTANLPp53OECCsUh4EgYKiJ1Smfns8MPipNGbyX1zge9X75Z3DYhnS_u338pyZMGWPBHbZyNb1GkUuQ8JowwnnFyCbZYx-knnCx7Deizgtvg0z3jeLOjugOOvBIS0t_a4mgyxUq6YFEArLrDvTaQxnSiN4OoiaZbAIFZCNRFxwkazBVnua-z0c-vcDObXDirsbBBDSHZboQqkHXZHcDDcQ35la&expire=1716023199&sign=40a09c36feb7624b93dd4f5ae3e52a99&abr_pts=-800&_session_id=037-20240517170638717712A412934402BCFC.1715936813106.56363";
function pause() {
  setPlay(!play.value);
  play.value = !play.value;
}
setVolume(volume.value);
watch(volume, (newValue) => {
  if (volume > 0) {
    mute.value = false;
    setMuted(mute.value);
  }
  setVolume(newValue);
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
  steamer = init(url, canvasVideo);
}
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4515498_7hzpu4sfpru.css");
.el-popover {
  max-width: 100px;
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
    height: 80vh;
    max-width: 90%;
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
    }
    .right,
    .left {
      display: flex;
      gap: 20px;
    }
    .correct {
      font-size: 12px;
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
</style>
