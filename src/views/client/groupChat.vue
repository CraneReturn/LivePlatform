<template>
  <div class="group">
    <userList />
    <inforMain />
  </div>
</template>
<script lang="ts" setup>
import userList from "./layouts/groupChat/userList.vue";
import inforMain from "./layouts/groupChat/inforMain.vue";
</script>

<style>
.group{
    display: flex;
}
</style>