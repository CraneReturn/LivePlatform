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
    <canvas ref="canvasVideo" class="canvasVideo" style="width: 100%!important;height:100%!important"></canvas>
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
import { ref, watch } from "vue";
import { useFlvPlay } from "@/assets/pull";
const { setMuted, setVolume, setPlay, init, destroyFlv } = useFlvPlay();
const canvasVideo = ref<HTMLCanvasElement>(null);
let prevVolume = 50;
const play = ref(true);
const mute = ref(true);
const volume = ref(0);
const url =
  "https://112-46-0-94.bytefcdnrd.com/stage/stream-115102073443058346_or4.flv?302_type=cold_aggr&_session_id=037-20240508161115D40D1E084F247614C1FC.1715155890388.06732&abr_pts=-800&align_backward=true&align_delay=-35&cb_retry=0&domain=pull-hs-f5.flive.douyincdn.com&expire=1715760675&fp_user_url=https%3A%2F%2Fpull-hs-f5.flive.douyincdn.com%2Fstage%2Fstream-115102073443058346_or4.flv%3Fexpire%3D1715760675%26sign%3Dc920c60d986d73eb2edf26081da3c524%26volcSecret%3Dc920c60d986d73eb2edf26081da3c524%26volcTime%3D1715760675%26abr_pts%3D-800%26_session_id%3D037-20240508161115D40D1E084F247614C1FC.1715155890388.06732&manage_ip=&mir=true&node_id=&pro_type=http2&redirect_from=pod.cn-zpqe1u.oby5.nss&sign=c920c60d986d73eb2edf26081da3c524&vhost=push-rtmp-hs-f5.douyincdn.com&volcSecret=c920c60d986d73eb2edf26081da3c524&volcTime=1715760675";
const steamer = init(url, canvasVideo);
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
  .canvasVideo {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .top {
    min-height: 75px;
    position: absolute;
    align-items: center;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    top: -75px;
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
  /* overflow: hidden; */
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
