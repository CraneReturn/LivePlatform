<!-- 添加素材 -->
<template>
  <div class="add">
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="#"
      :on-change="handleChange"
      auto-upload="false"
    >
      <el-button type="primary" small class="upload">添加素材</el-button>
      <template #tip>
        <div class="el-upload__tip"></div>
      </template>
    </el-upload>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import type { UploadProps, UploadUserFile } from "element-plus";
const fileList = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food2.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-3);
};
</script>
<style lang="scss" scoped>
.add {
  padding: 10px;
  border: 1px silver solid;
  margin: 10px;
  border-radius: 5px;
  background-color: #fff;
}
.el-upload__tip {
  border-top: 1px solid var(--jjext-color-nav-title);
}
.upload {
  height: 25px;
}
:deep(.el-upload-list) {
  min-height: 110px;
  max-height: 110px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
