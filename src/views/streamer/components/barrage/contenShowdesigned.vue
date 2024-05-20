<template>
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
      <div class="setting-type">智能云屏蔽</div>
      <el-slider
        v-model="shieldGrade"
        :step="1"
        :min="1"
        :max="10"
        show-stops
        show-input
        size="small"
      />
      <el-button
        type="primary"
        size="small"
        style="margin-top: 10px"
        @click="isOpenDrawer = true"
        >添加屏蔽词
      </el-button>
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
        <el-radio-button v-for="item in userSpeedlist" :label="item.value" :key="item.label">
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
        :size="25"
        style="cursor: pointer; color: white; font-size: 19px"
      >
        <Setting />
      </el-icon>
    </template>
  </el-popover>
</template>
  <script setup lang="ts">
import { ref, watch, onMounted } from "vue";
//弹幕导入 这一部分是设置里面的
import { useDisable } from "@/assets/barrage/disable";
import { useOpacity } from "@/assets/barrage/opacity";
import { useRenderRegion } from "@/assets/barrage/renderRegion.ts";
import {userSpeed} from '@/assets/barrage/speed.ts'
import {avoidOverlap} from '@/assets/barrage/aviodOver.ts'
//弹幕------
const { barrageRenderList, shieldGrade, isOpenDrawer } = useDisable();
const barrageRenderer = ref();
//透明度
const { opacity } = useOpacity(barrageRenderer);
//显示区域
const { regionsShow, currentRenderRegions, isRenderRegionChange } =
  useRenderRegion(barrageRenderer);
// 弹幕速度
const { userSpeedlist, speendChange, currentSpeed } = userSpeed(barrageRenderer);
//重复
const{avoidFlag,changeAvoidOver}=avoidOverlap(barrageRenderer)
</script>
  <style lang="scss" scoped>
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
  