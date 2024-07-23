<template>
  <div class="userLive">
    <!-- 左边栏 -->
    <div class="left">
      <danation />
      <material />
    </div>
    <div class="main">
      <videoPlayer />
      <footerIt />
    </div>

    <!-- 主播 -->
    <div class="right">
      <present />
      <chatContent />
      <barrageText />
    </div>
    <!-- 右边栏 -->
  </div>
</template>
<script setup lang="ts">
import videoPlayer from "./components/videoPlayer.vue";
import danation from "./components/live/danation.vue";
import material from "./components/live/material.vue";
import present from "./components/live/present.vue";
import chatContent from "./components/chatContent.vue";
import footerIt from "./components/live/footer.vue";
import barrageText from "./components/barrage/barrageText.vue";
</script>
<style lang="scss" scoped>
.userLive {
  display: flex;
  max-height: 90vh;
}
.right {
  min-width: 300px;
  display: flex;
  flex-direction: column;
}
.main,
.left {
  display: flex;
  flex-direction: column;
}
.videoPlayer {
  height: fit-content;
}
</style>
