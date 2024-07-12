<template>
  <div class="video-home">
    <div class="video-top">
        <Slideshow/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Slideshow from "./layouts/video/Slideshow.vue";
</script>

<style lang="scss" scoped>
.video-home{
    width:1200px;
    margin: 0 auto;
}
</style>