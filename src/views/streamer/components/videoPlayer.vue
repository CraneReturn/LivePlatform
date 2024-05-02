<template>
  <div class="videoPlayer">
    <!-- 主播信息 -->
    <div class="anchorInfo"></div>
    <div class="hoverVideo"></div>
    <div class="pause"></div>
    <div class="footer"></div>
    <div class="smallWindow"></div>
    <video autoplay src="@/assets/viedo/test.mp4"></video>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.videoPlayer {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
