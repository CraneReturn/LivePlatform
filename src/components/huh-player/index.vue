<template>
    <section class="huh-player" ref="huhPlayer"></section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initPlayer } from "./src/player";

const huhPlayer = ref<HTMLElement | null>(null);

onMounted(() => {
    
    huhPlayer.value && initPlayer(huhPlayer.value);

});
</script>
