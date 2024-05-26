<template>
    <section class="huh-player" ref="huhPlayer">
        <canvas class="canvas" width="1280" height="720"></canvas>
    </section>


</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { HuhDecoder } from "./src/models/HuhDecoder";
const huhPlayer = ref<HTMLCanvasElement | null>(null);
const section = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
    
    const decoder = new HuhDecoder();
    
});
</script>

<style lang="scss">
@import url('./src/styles/index.scss');
</style>