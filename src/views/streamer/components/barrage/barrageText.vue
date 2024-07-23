<template>
  <div id="container">
    <!-- <video
          ref="video"
          id="video"
          controls
          autoplay
          src="@/assets/viedo/test.mp4"
        /> -->
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
          发送 {{ barrageText != "" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BarrageRenderer from "@/assets/lib/index";
import { useSendBarrage } from "@/assets/barrage/sendBarrage";
import { onMounted, ref } from "vue";
const barrageRenderer = ref<BarrageRenderer>();
const video = ref();
const {
  barrageText,
  fontSizes,
  currentFontsize,
  barrageModes,
  currentBarrageMode,
  barrageColors,
  currentBarrageColor,
  sendbarrageMethods,
} = useSendBarrage(barrageRenderer, video);
const rows = (event: any) => {
  event.target.style.height = "auto";
  event.target.style.height = event.target.scrollHeight + "px";
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
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
.sendBarragrBtnstyle {
  background-color: var(--el-color-opcatiy) !important;
}
.chatInput {
  height: 100%;
  border-radius: var(--el-border-radius-base);
  display: flex;
  align-items: flex-end;
  gap: 10px;
  position: relative;
  width: 100%;
  background-color: var(--el-color-info-light-9);
  .chatArea {
    height: 100%;
    outline: 1.5px solid transparent;
    border: 1px solid transparent;
    width: 100%;
    resize: none;
    line-height: 22px;
    padding: 11px 100px 11px 35px;
    overflow: hidden;
    background-color: transparent;
    transition-duration: 0.25s;
    border-radius: var(--el-border-radius-base);
    font-family: inherit;
  }
  .chatArea:focus {
    border: 1px solid var(--el-color-success-light-3);
    outline: 1.5px solid var(--el-color-success-light-5);
  }
  .emoji {
    position: absolute;
    bottom: 5px;
    right: 70px;
    .icon-Emoji {
      font-size: 25px;
      line-height: 35px;
      cursor: pointer;
    }
  }
  .textSet {
    position: absolute;
    top: 0;
    left: 8px;
    cursor: pointer;
    .iconfont {
      font-size: 23px;
      line-height: 42px;
      color: var(--vt-c-divider-dark-2);
    }
  }
  .sendMessage {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 60px;
    height: 35px;
    .send {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border: none;
      background-color: var(--el-color-success-light-5);
      color: #fff;
      border-radius: var(--el-border-radius-base);
    }
  }
}
.hiddenSettingText {
  position: relative;
  left: -10px;
  opacity: 0 !important;
}
</style>
