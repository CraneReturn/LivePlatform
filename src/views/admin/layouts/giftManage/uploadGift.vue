<template lang="">
  <!-- 上传图片 -->
  <div class="upload">
    <input type="file" class="uploadFile" @change="changeSvg" />
    <img v-if="imgUrl" :src="imgUrl" class="preview" />
    <i v-else class="iconfont icon-tianjiatupianlimianjiahao"></i>
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
import { ref } from "vue";
const emit = defineEmits(["changeSvg"]);
let imgUrl = ref("");
const formData = new FormData();
function changeSvg(event) {
  imgUrl.value = URL.createObjectURL(event.target.files[0]);
  formData.append("file", event.target.files[0]);
  emit("changeSvg", formData);
}
</script>
<style lang="scss" scoped>
@import "http://at.alicdn.com/t/c/font_4515498_19b21c3puta.css";
.upload {
  width: 100%;
  height: 100%;
  transition-duration: 0.5s;
  position: relative;
  background-color: var(--el-color-white);
  border: 1.5px dashed;
  border-color: var(--el-color-info);
  border-radius: var(--el-border-radius-base);
  .uploadFile {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    background-color: var(--el-color-white);
  }
  .iconfont {
    color: var(--el-color-info);
    position: absolute;
    z-index: 1;
    font-size: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .preview {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
  }
}
.upload:hover {
  border-color: var(--el-color-primary-light-5);
  .iconfont {
    color: var(--el-color-primary-light-5);
  }
}
</style>
