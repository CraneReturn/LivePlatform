<template>
  <div class="viedoUploadNail">
    <span
      class="viedoTitleNail"
      :class="{ nailTitleviedo: route.path == '/video-createBefore/homePage' }"
    >
      视频分析
    </span>
    <span class="viedoTitleNail"> 视频展示 </span>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style>
</style>