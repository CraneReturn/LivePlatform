<template>
  <div class="reward">
    <div class="giftList">
      <Gift v-for="index in 7"></Gift>
      <!-- 更多 -->
    </div>
    <div class="rechange">
      <button class="pay">充值</button>
      <button class="morePresent">更多</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Gift from "./gift.vue";
</script>
<style lang="scss" scoped>
.reward {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rechange {
    width: 80px;
    button {
      width: 100%;
      height: 30px;
      cursor: pointer;
      border: none;
      border-radius: var(--el-border-radius-base);
    }
    .pay {
      background-color: #d21b46;
      color: #fff;
    }
    .morePresent {
      margin-top: 3px;
      background-color: #ff9b00;
      color: #fff;
    }
  }
}
.giftList {
  display: flex;
  width: 100%;
}
</style>
