<template>
  <div class="video-home">
    <div class="video-top">
        <Slideshow/>
        <video-list/>
    </div>
    <video-classify/>
  </div>
</template>

<script lang="ts" setup>
import Slideshow from "./layouts/video/Slideshow.vue";
import videoList from "./layouts/video/videoList.vue";
import videoClassify from "./layouts/video/videoClassify.vue"
</script>

<style lang="scss" scoped>
.video-home{
    width:1200px;
    margin: 0 auto;
    .video-top{
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
}
</style>