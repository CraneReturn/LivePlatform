<template>
  <div class="main">
    <div class="video">
      <div class="videoTable">
        <videoPlayer></videoPlayer>
      </div>
      <div class="gifts">
        <giveGift></giveGift>
      </div>
    </div>
    <div class="chatPart">
      <chat></chat>
    </div>
  </div>
</template>
<script setup lang="ts">
import recharge from "./components/recharge.vue";
import giveGift from "./components/giveGift.vue";
import chat from "./components/chat.vue";
import videoPlayer from "./components/videoPlayer.vue";
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.video {
  width: 100%;
  height: 100%;
}

.main {
  display: flex;
  justify-content: space-between;
  background-color: var(--el-color-success-light-9);
  .chatPart {
    min-width: 350px;
  }
}
</style>
