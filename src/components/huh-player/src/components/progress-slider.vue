<template>
    <div class="slider-demo-block">
        <span class="demonstration">Default value</span>
        <el-slider
            v-model="sliderValue"
            :max="90"
            @input="handleSliderInput"
            @change="handleSliderChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { Player } from "../models/Player";
import { PlayerEventType, sliderValue } from "../player/player-event";

sliderValue.value = 0;

const handleSliderInput = () => {
    if (Player.dragging) return;
    Player.dragging = true;
};

// // TODO 在视频加载完成后执行
const handleSliderChange = () => {

    Player.emit(PlayerEventType.Seeked, {
        type: PlayerEventType.Seeked,
        target: null,
        value: sliderValue.value
    })
};
</script>

<style scoped>
.slider-demo-block {
    max-width: 600px;
    display: flex;
    align-items: center;
}
.slider-demo-block .el-slider {
    position: absolute;
    bottom: 32px;
    left: 0;
    width: 100%;
}
.slider-demo-block .demonstration {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
    flex: 0 0 70%;
}
</style>
