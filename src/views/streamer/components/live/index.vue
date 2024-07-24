<template>
  <div style="position: relative" class="videoPlayer" ref="videoPlayer">
    <!-- v-bind:class="videoClass ? 'videoPlayer' : 'videoFullScreen'" -->
    <div class="showTable">
      <canvas class="barrage" ref="barrage">
        <!-- 弹幕 -->
      </canvas>
      <video
        autoplay
        id="canvasVideo"
        ref="canvasVideo"
        class="canvasVideo"
        width="920"
        height="1280"
      ></video>
      <canvas class="AnimationEffect" ref="showArea"></canvas>
    </div>
    <div class="footer">
      <div class="left">
        <!-- <button class="pause" @click="pause">
          <i v-if="play" class="iconfont icon-weibiaoti519"></i>
          <i v-else class="iconfont icon-kaishi1"></i>
        </button>
        <button class="refresh" @click="refresh">
          <i class="iconfont icon-shuaxin"></i>
        </button> -->
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
        <!-- <button class="beauty" @click="dialogVisible = true">
          <i class="iconfont icon-kaiqimeiyan"></i>
        </button> -->

        <button class="barrage">
          <contenShowdesigned />
        </button>
        <button class="gift">
          <i class="iconfont icon-liwu"></i>
        </button>
        <!-- <div class="volumeControls">
          <div class="contain">
            <el-slider v-model="volume" vertical height="150px" />
          </div>

          <button class="volume" @click="muted">
            <i v-if="mute && !volume" class="iconfont icon-jingyin"></i>
            <i v-else class="iconfont icon-shengyin"></i>
          </button>
        </div> -->
      </div>
    </div>
    <div class="mask">
      <div class="mic" @click="getAudio">
        <el-icon><Mic /></el-icon>
        <p>麦克风</p>
      </div>
      <div class="camera" @click="getCamera">
        <el-icon><CameraFilled /></el-icon>
        <p>摄像头</p>
      </div>
      <div class="plat" @click="getCapture">
        <el-icon><Platform /></el-icon>
        <p>分享屏幕</p>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogMicVisible" title="选择音频设备" width="300">
    <div class="chooseMics">
      <el-button
        class="micAudio"
        v-for="(item, index) in mic"
        key="item.deviceId"
        @click="setAudio(item.deviceId)"
        >{{ item.deviceName }}</el-button
      >
    </div>
  </el-dialog>
  <el-dialog v-model="dialogCameraVisible" title="选择摄像头设备" width="300">
    <div class="chooseMics">
      <el-button
        class="micAudio"
        v-for="(item, index) in camera"
        key="item.deviceId"
        @click="setCamera(item.deviceId)"
        >{{ item.deviceName }}</el-button
      >
    </div>
  </el-dialog>
  <!-- <el-dialog
    v-model="dialogVisible"
    title="美颜设置"
    width="350"
    :modal="false"
    draggable
  >
    <div class="slider-demo-block">
      <span class="demonstration">美白</span>
      <el-slider v-model="value1" size="small" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">磨皮</span>
      <el-slider v-model="value2" size="small" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">瘦脸</span>
      <el-slider v-model="value3" size="small" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">削脸</span>
      <el-slider
        v-model="value4"
        :format-tooltip="formatTooltip"
        size="small"
      />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">大眼</span>
      <el-slider v-model="value5" size="small" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">下巴</span>
      <el-slider v-model="value6" size="small" />
    </div>
  </el-dialog> -->
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, reactive } from "vue";
import pusher from "@/assets/pull/push";
import contenShowdesigned from "../barrage/contenShowdesigned.vue";
interface Device {
  deviceName: string;
  deviceId: string;
}
// 获取音频设备
const dialogMicVisible = ref(false);
const dialogCameraVisible = ref(false);
let mic = reactive<Device[]>([]);
let camera = reactive<Device[]>([]);
const message = ref("");
let livePusher: any;
let push: pusher;
onBeforeMount(() => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://video.sdk.qcloudecdn.com/web/TXLivePusher-2.1.1.min.js"; // Adjusted path to the uploaded file
  document.head.appendChild(script);
  script.onload = () => {
    livePusher = new TXLivePusher();
    console.log(livePusher, 1111111111111);
    // Initialize the pusher object with the livePusher instance
    push = new pusher(livePusher);
    // Assign event handlers
  };
});
// 获取当前设备信息
const getAudio = async () => {
  mic = [...(await push.getAudio())];
  dialogMicVisible.value = true;
};
const getCamera = async () => {
  camera = [...(await push.getVideo())];
  dialogCameraVisible.value = true;
};
const getCapture = () => push.useCapture();
// 选择设备
const setAudio = (deviceId: any) => {
  push.useAudio(deviceId);
  dialogMicVisible.value = false;
};
const setCamera = (deviceId: any) => {
  push.useVideo(deviceId);
  // 渲染到当前视频流中
  push.renderView("canvasVideo");
  dialogCameraVisible.value = false;
};
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4515498_ah40370m3rw.css");
.el-drawer {
  background-color: rgba(0, 0, 0, 0) !important;
}
:deep(.el-slider__button) {
  width: 10px;
  height: 10px;
}
:deep(.el-slider__bar) {
  height: 5px;
}
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
.mask {
  background-color: #1b1b1b;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  div {
    cursor: pointer;
    background-color: #0d0d0d;
    border-radius: 5px;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 40px;
  }
  .el-icon {
    color: #fff;
    font-size: 20px;
  }
  p {
    font-size: 14px;
  }
}
.chooseMics {
  display: flex;
  flex-direction: column;

  .micAudio {
    width: 100%;
    margin-left: 0;
  }
}
</style>
