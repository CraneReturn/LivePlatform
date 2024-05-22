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
      <div class="setting-type">字号</div>
      <el-radio-group v-model="currentFontsize" size="small" class="mg-10">
        <el-radio-button v-for="item in fontSizes" 
        :label="item.value"
        :key="item.value"
        >
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
      <div class="setting-type">模式</div>
      <el-radio-group v-model="currentBarrageMode" size="small" class="mg-10">
        <el-radio-button v-for="item in barrageModes" 
        :label="item.value"
        :key="item.value">
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
</template>

<script lang="ts" setup>
import { useSendBarrage } from "@/assets/barrage/sendBarrage.ts";
import { ref } from "vue";
const barrageRenderer = ref();
const video = ref();
const {
  barrageText,
  fontSizes,
  currentFontsize,
  barrageModes,
  currentBarrageMode,
  barrageColors,
  currentBarrageColor
  
} = useSendBarrage(barrageRenderer, video);
</script>
<style lang="scss" scoped>
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