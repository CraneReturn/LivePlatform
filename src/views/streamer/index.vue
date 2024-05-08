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
import { ref } from "vue";
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  display: flex;
  background-color: var(--el-color-success-light-9);
  .chatPart {
    min-width: 300px;
    padding: 5px;
  }
}
.videoTable {
  display: flex;
  justify-content: center;
}
</style>
