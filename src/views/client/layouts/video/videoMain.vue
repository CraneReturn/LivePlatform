<template>
  <div class="video-main">
    <main-list/>
    <leader-board/>
  </div>
</template>

<script lang="ts">
export default {}
</script>
<script setup lang="ts">
import mainList from "./mainList.vue";
import leaderBoard from "./leaderBoard.vue";
</script>

<style lang="scss" scoped>
.video-main{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 4px;
    padding: 10px 20px;
}
</style>