<template>
  <div class="userLive">
    <!-- 左边栏 -->
    <div class="left">
      <danation />
    </div>
    <videoPlayer />
    <!-- 主播 -->
    <div class="right"></div>
    <!-- 右边栏 -->
  </div>
</template>
<script setup lang="ts">
import videoPlayer from "./components/videoPlayer.vue";
import danation from "./components/live/danation.vue";
</script>
<style lang="scss">
.userLive {
  display: flex;
}
</style>
