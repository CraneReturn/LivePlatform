<template>
  <div class="background">
    <img src="@/assets/images/background.jpeg" alt="" />
  </div>
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
import videoPlayer from "./components/live/index.vue";
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
  height: 90vh;
  gap: 5px;
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
.background {
  img {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: -1;
    top: 0;
  }
}
</style>
