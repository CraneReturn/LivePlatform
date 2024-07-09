<template>
  <div>
    <!-- 暂停和开始 -->
    <!-- 声音和 -->
    
    <canvas ref="videoCanvas" width="1280" height="720"></canvas>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
let videoCanvas = ref(null);
let videoTrack, processor, reader, context, videoFrame;

const videoPlayer = async () => {
  context = videoCanvas.value.getContext("2d");
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    videoTrack = mediaStream.getVideoTracks()[0];
    processor = new MediaStreamTrackProcessor(videoTrack);
    reader = processor.readable.getReader();
    // 音视频的采集与编码
    // 视频渲染
    while (true) {
      let videoFrame = await reader.read();
      const state = videoFrame.done;
      const video = videoFrame.value;
      if (state) break;
      if (videoFrame !== null && !state) {
        context.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
        // 绘制
        context.drawImage(video, 0, 0, 1280, 720);
        video.close();
      }
    }
  } catch (err) {
    console.error("getUserMedia error:", err);
  }
};
</script>
