<template>
  <div class="sidebar">
    <div class="table">
      <div class="concern">
        <p>我的关注</p>
      </div>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
      <labels></labels>
    </div>
    <div class="sidebar-hide">
      <i class="iconfont icon-arrow_left-copy"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import labels from "./sidebar/index.vue";
</script>
<style lang="scss">
@import "http://at.alicdn.com/t/c/font_4515498_b0xls9sxrxp.css";

.sidebar {
  height: 100%;
  background-color: #2f3035;
  display: grid;
  gap: 10px;
  position: relative;
  .table {
    padding: 10px;
    height: 90vh;
    overflow: hidden;
    overflow-y: auto;
  }
  .sidebar-hide {
    cursor: pointer;
    width: 100px;
    height: 0;
    border-bottom: 15px solid #2f3035;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    text-align: center;
    top: 50%;
    right: -50px;
    transform: rotate(90deg) translateY(-50%);
    .iconfont {
      color: aliceblue;
      display: inline-block;
      transform: rotate(270deg) translateX(3px);
    }
  }
}
/* 配置滚动条样式 */
.table::-webkit-scrollbar {
  width: 7px;
  height: 10px;
}
.table::-webkit-scrollbar-thumb {
  background-color: #434450;
  border-radius: 10px;
}
</style>
