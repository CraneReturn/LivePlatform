<template>
  <div class="main">
    <div class="video">
      <videoPlayer></videoPlayer>
      <giveGift></giveGift>
    </div>
    <div class="chatPart">
      <chat></chat>
    </div>
  </div>
</template>
<script setup lang="ts">
import giveGift from "./components/giveGift.vue";
import chat from "./components/chat.vue";
import videoPlayer from "./components/videoPlayer.vue";
</script>
<style lang="scss">
.video {
  width: 740px;
  height: 436px;
  border-radius: 10px;
  border: 1px solid black;
}
.main {
  display: flex;
  background-color: var(--el-color-success-light-9);
  .chatPart {
    min-width: 320px;
    padding: 10px;
  }
}
</style>
