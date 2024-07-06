<template>
        <video
          ref="video"
          id="video"
          controls
          src="@/assets/viedo/demo1.mp4"
          autoplay
          @play="videoPlay"
          @pause="videoPause"
        />
</template>

<script lang="ts" setup>
import { provide, ref,defineEmits } from "vue";
const emits = defineEmits(
  ["video-play","video-pause"]
  );
const viedo=ref()
provide('viedeElemt',viedo.value)
const videoPlay = () => {
  emits('video-play'); // 触发自定义事件 'video-play'
};
const videoPause = () => {
  emits('video-pause'); // 触发自定义事件 'video-pause'
};
</script>

<style>

</style>