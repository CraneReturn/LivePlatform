<template>
  <div class="reward">
    <div class="giftList">
      <Gift v-for="index in 7"></Gift>
      <!-- 更多 -->
    </div>
    <div class="rechange">
      <el-popover placement="left" :width="450" trigger="click">
        <recharge></recharge>
        <template #reference>
          <button class="pay">充值</button>
        </template>
      </el-popover>
      <button class="morePresent">更多</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Gift from "./gift.vue";
import recharge from "./recharge.vue";
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
  padding: 0 5px;
  background-color: var(--vt-c-divider-light-2);
  border-radius: var(--el-border-radius-base);
}
</style>
