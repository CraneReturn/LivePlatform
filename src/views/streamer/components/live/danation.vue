<!-- 用户贡献 -->
<template>
  <div class="danation">
    <p class="title">本场贡献</p>
    <div class="search">
      <el-input
        v-model="input2"
        placeholder="用户名搜索"
        clearable="true"
        :prefix-icon="Search"
      />
    </div>
    <div class="list">
      <div class="userIt">
        <p>排名</p>
        <p>用户信息</p>
        <p>贡献值</p>
        <p>更多</p>
      </div>
      <userindex v-for="index in 7" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import userindex from "./userIndex.vue";
const input2 = ref("");
</script>
<style lang="scss" scoped>
.danation {
  padding: 10px;
  padding-top: 0;
  height: 100%;
  background-color: rgba(#fff, 0.7);
  .title {
    padding: 5px 10px;
    font-size: 14px;
  }

  .userIt {
    padding: 5px 0;
    display: grid;
    grid-template-columns: 2fr 9.5fr 3fr 2fr;
    align-items: center;
    text-align: left;
    gap: 5px;
    p {
      font-size: 13px;
    }
  }
}
</style>
