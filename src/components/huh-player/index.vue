<template>
    <section class="huh-player" ref="huhPlayer">

    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initFrame } from './src/player';

const huhPlayer = ref(null);


onMounted(() => {

    initFrame(huhPlayer.value);
    
})
</script>