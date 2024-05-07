<template>
    <section class="huh-player">
        <canvas class="canvas" ref="huhPlayer" width="640" height="360"></canvas>
        <ToggleButton></ToggleButton>
        <ProgressSlider></ProgressSlider>
    </section>
    
    <video class="local" controls></video>
    <video class="remote controls"></video>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initPlayer } from "./src/player";
import ToggleButton from "./src/components/toggle-button.vue";
import { Player } from "./src/models/Player";
import ProgressSlider from "./src/components/progress-slider.vue";
import { initLiveStreamer } from "../live-streamer/index";

const huhPlayer = ref<HTMLCanvasElement | null>(null);
const section = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
    
    const canvas = huhPlayer.value;

    if (canvas) {
        const player = await initPlayer(canvas);
        Player.play();
    }
    
    initLiveStreamer();

});
</script>

<style lang="scss">
@import url('./src/styles/index.scss');
</style>