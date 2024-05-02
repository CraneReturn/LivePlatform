<template>
  <div>
    <div class="table">
      <div class="top">
        <!-- 增加礼物 -->
        <button>添加</button>
        <button>批量删除</button>
      </div>
    </div>
    <div class="uplod">
      <uplodGift></uplodGift>
    </div>
  </div>
</template>
<script setup lang="ts">
import uplodGift from "./uploadGift.vue";
import gift from "./gift.vue";
</script>
<style lang="scss">
.uplod {
  width: 200px;
  height: 200px;
}
.table {
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    gap: 20px;
  }
}
</style>
