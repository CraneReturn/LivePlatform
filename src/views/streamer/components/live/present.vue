<!-- 用户赠送 -->
<template>
  <div class="present">
    <p>礼物赠送</p>
    <div class="main">
      <el-scrollbar height="200px">
        <p v-for="index in 78">张阿森纳送来🚀*1111</p>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.present {
  .main {
    padding: 10px;
    background: linear-gradient(
      transparent 50%,
      var(--el-color-success-light-7)
    );
  }
  p {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
