<template lang="">
  <nailTop></nailTop>
  <div class="main">
    <!-- 侧边栏 -->
    <sidebar></sidebar>
    <div class="content">
      <!-- 搜索分类 -->
      <search></search>
      <!-- 分类总信息 -->
      <div class="category">
        <signle v-for="(item, index) in 35" :key="index"></signle>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import signle from "./components/signle.vue";
import nailTop from "../Nail/nailTop.vue";
import sidebar from "./components/sidebar.vue";
import search from "./components/search.vue";
</script>
<style lang="scss">
.main {
  background-color: #f2f5f6;
  .sidebar {
    position: fixed;
    width: 240px;
    top: 60px;
  }
}
.content {
  margin-left: 260px;
  min-height: 550px;
  overflow: hidden;
  overflow-y: auto;
  height: 100%;
}
.category {
  display: grid;
  align-content: baseline;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  padding: 20px 30px;
  width: 100%;
  background-color: #f2f5f6;
}
</style>
