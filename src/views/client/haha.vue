<template>
  <div class="main">
    <div class="player"> <div id="container">
      <!-- <video
          ref="video"
          id="video"
          controls
          src="@/assets/viedo/demo1.mp4"
          autoplay
          @play="videoPlay"
          @pause="videoPause"
        /> -->
        <videoPlayer @video-play="handleVideoPlay" 
        @video-pause="handleVideoPause" />
      </div>
   </div>
   </div>
<div class="centerBarrageShow">
  <div class="centerBarrageShowswitch">
    <span>
      弹幕
    </span>
    <el-switch v-model="barrageOpen" 
    class="openBarrageBtn"
     @change="barrageOpenChange" />
    <span>
      设置
    </span>
    <div class="designBarrage">
    <el-popover
      placement="top"
      :width="320"
      :show-arrow="false"
      :offset="10"
      popper-class="barrage-setting"
      trigger="hover"
    >
      <div class="barrage-setting-inner">
        <div class="setting-type">按类型屏蔽</div>
        <div class="barrage-render-list">
          <el-checkbox
            v-for="item in barrageRenderList"
            v-model="item.value"
            :label="item.label"
            :key="item.key"
            size="9"
          />
        </div>
        <div class="setting-type" style="margin-top: 10px">不透明度</div>
        <el-slider v-model="opacity" :min="0" :max="100" size="small" />
        <div class="setting-type">显示区域</div>
        <el-radio-group
          v-model="currentRenderRegions"
          size="small"
          style="margin-top: 10px"
          @change="isRenderRegionChange"
        >
          <el-radio-button
            v-for="item in regionsShow"
            :label="item.value"
            :key="item.label"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
        <div class="setting-type" style="margin-top: 10px">
          弹幕速度（像素/每秒）
        </div>
        <el-radio-group
          v-model="currentSpeed"
          size="small"
          style="margin-top: 10px"
          @change="speendChange"
        >
          <el-radio-button
            v-for="item in userSpeedlist"
            :label="item.value"
            :key="item.label"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
        <div class="setting-type" style="margin-top: 10px">弹幕禁止重叠</div>
        <el-switch
          v-model="avoidFlag"
          class="barrage-switch"
          @change="changeAvoidOver"
        />
      </div>
      <template #reference>
        <el-icon
        class="designIconBarrage"
          :size="25"
          style="cursor: pointer; font-size: 19px"
        >
          <Setting />
        </el-icon>
      </template>
    </el-popover>
  </div>
  </div>
  <div class="inputFrame">
    <div class="chatInput">
      <textarea
        rows="1"
        @input="rows($event)"
        class="chatArea"
        maxlength="50"
        placeholder="善言结善语，恶语伤人心"
        v-model="barrageText"
      ></textarea>
      <div class="textSet">
        <el-popover
          placement="top"
          :width="320"
          :show-arrow="false"
          :offset="10"
          popper-class="barrage-setting"
          trigger="hover"
        >
          <div class="barrage-setting-inner">
            <div class="setting-type">字号</div>
            <el-radio-group
              v-model="currentFontsize"
              size="small"
              class="mg-10"
            >
              <el-radio-button
                v-for="item in fontSizes"
                :label="item.value"
                :key="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
            <div class="setting-type">模式</div>
            <el-radio-group
              v-model="currentBarrageMode"
              size="small"
              class="mg-10"
            >
              <el-radio-button
                v-for="item in barrageModes"
                :label="item.value"
                :key="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
            <div class="setting-type">颜色</div>
            <div class="colors mg-10">
              <div
                v-for="color in barrageColors"
                :key="color"
                :class="[
                  'color-item',
                  { 'color-active': color === currentBarrageColor },
                ]"
                :style="`background:${color}`"
                @click="currentBarrageColor = color"
              ></div>
            </div>
          </div>
          <template #reference>
            <i class="iconfont icon-fuwenbenbianjiqi_zitiyanse"> </i>
          </template>
        </el-popover>
      </div>
      <div class="emoji"><i class="iconfont icon-Emoji"></i></div>
      <div class="sendMessage">
        <button
          class="send"
          :class="{ sendBarragrBtnstyle: barrageText != '' }"
          @click="sendbarrageMethods"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</div>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
import BarrageRenderer from "@/assets/lib/index";
import { useSendBarrage } from "@/assets/barrage/sendBarrage.ts";
import { inject, onMounted, ref } from "vue";
import { useDisable } from "@/assets/barrage/disable";
import { useOpacity } from "@/assets/barrage/opacity";
import { useRenderRegion } from "@/assets/barrage/renderRegion.ts";
import { userSpeed } from "@/assets/barrage/speed.ts";
import { avoidOverlap } from "@/assets/barrage/aviodOver.ts";
import type BaseBarrage from "@/assets/lib/baseBarrage/barrageClass";
import { generateBarrageData } from "@/assets/data/index";
import useResize from "@/assets/barrage/resize";
import { useBarrageOpen } from "@/assets/barrage/open";
import videoPlayer from './videoPlayer.vue'
//弹幕------
let viedoplayerdom=ref<HTMLVideoElement>()
const barrageRenderer = ref<BarrageRenderer>();
const { barrageRenderList, shieldGrade, isOpenDrawer,disableJudges } = useDisable();
//透明度
const { opacity } = useOpacity(barrageRenderer);
//显示区域
const { regionsShow, currentRenderRegions, isRenderRegionChange } =
  useRenderRegion(barrageRenderer);
// 弹幕速度
const { userSpeedlist, speendChange, currentSpeed } =
  userSpeed(barrageRenderer);
//重复
const { avoidFlag, changeAvoidOver } = avoidOverlap(barrageRenderer);
const {
  barrageText,
  fontSizes,
  currentFontsize,
  barrageModes,
  currentBarrageMode,
  barrageColors,
  currentBarrageColor,
  sendbarrageMethods,
} = useSendBarrage(barrageRenderer, viedoplayerdom);

const { barrageOpen, barrageOpenChange } = useBarrageOpen(barrageRenderer)
const rows = (event: any) => {
  event.target.style.height = "auto";
  event.target.style.height = event.target.scrollHeight + "px";
};
onMounted(() => {
  viedoplayerdom.value=document.getElementById('video')
  barrageRenderer.value = new BarrageRenderer({
    container: "container",
    video: viedoplayerdom.value,
    renderConfig: {
      heightReduce: 60,
      speed: currentSpeed.value,
      renderRegion: currentRenderRegions.value,
      fontWeight: "bold",
      opacity: opacity.value / 100,
      avoidOverlap: avoidFlag.value,
      barrageFilter: (barrage: BaseBarrage) => {
        // 弹幕类型的过滤
        if (disableJudges.value.some((disableJudge) => disableJudge(barrage)))
          return false;
        // 弹幕等级过滤
        if (barrage.addition?.grade < shieldGrade.value) return false;
        // 其他情况，不过滤
        return true;
      },
      priorBorderCustomRender: ({ ctx, barrage }) => {
        ctx.save();
        // 设定矩形左上角的偏移量
        const leftOffset = 6;
        const topOffset = 2;
        const { left, top, width, height } = barrage;
        // 设置圆角矩形路径
        ctx.roundRect(
          left - leftOffset,
          top - topOffset,
          width + 2 * leftOffset,
          height + 2 * topOffset,
          10
        );
        // 绘制边框
        ctx.strokeStyle = "#89D5FF";
        ctx.lineWidth = 2;
        ctx.stroke();
        // 绘制背景色
        ctx.fillStyle = "rgba(137, 213, 255, 0.3)";
        ctx.fill();

        ctx.restore();
      },
    },
    devConfig: {
      isRenderFPS: false,
      isRenderBarrageBorder: false,
      isLogKeyData: true,
    },
  });
  generateBarrageDataSet();
});
const generateBarrageDataSet = () => {
  // 获取弹幕数据
  const barrages = generateBarrageData(1, {
    isFixed: true,
    isScroll: true,
    isSenior: true,
    isSpecial: true,

    fixedNum: 100,
    scrollNum: 300,
    seniorNum: 0,
    specialNum: 200,
  });
  
  barrageRenderer.value?.setBarrage(barrages);
  barrageRenderer.value?.renderFrame();
};
useResize(barrageRenderer);
const renderFrame = () => {
  barrageRenderer.value?.renderFrame();
};
const handleVideoPlay = () => {
  // console.log('app play');
  barrageRenderer.value?.play();
};
const handleVideoPause = () => {
  // console.log('app pause');
  barrageRenderer.value?.pause();
};
</script>
<style lang="scss" scoped>
@import "http://at.alicdn.com/t/c/font_4515498_x1t0sazzfdj.css";
@import "@/styles/variables.scss";
@import "@/views/client/styles/clientPull/barrage/index.scss";
.colors {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 7px;

  .color-item {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .color-active {
    border: 1px solid white;
    box-sizing: border-box;
  }
}
.main {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #374b6a;

  .player {
    width: calc(100vw - 60px);
    height: calc(100vh - 60px);

    display: flex;
    flex-direction: column;

    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    #container {
      flex: 1;
      max-height: calc(100vh - 60px - 46px);
      overflow: hidden;
      position: relative;
      #video {
        width: 100%;
        height: 100%;
        background-color: #000;
      }
    }

    .barrage-container {
      height: 46px;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: white;

      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      .controls {
        height: 32px;

        display: flex;
        justify-content: center;
        align-items: center;

        .barrage-switch {
          margin-right: 10px;
        }
      }
    }
  }
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
.colors {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 7px;

  .color-item {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .color-active {
    border: 1px solid white;
    box-sizing: border-box;
  }
}
</style>