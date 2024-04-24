<template>
    <section class="huh-player" ref="section">
        <canvas class="canvas" ref="huhPlayer" width="640" height="360">

        </canvas>
    </section>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { initPlayer } from "./src/player";
import { getSegments } from "./src/service/get-segments";

const huhPlayer = ref<HTMLCanvasElement | null>(null);
const section = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
    
    const canvas = huhPlayer.value;

    if (canvas) {
        const player = await initPlayer(canvas);
        section.value?.append(player);
    }


});
</script>
