<template>
  <div class="programeLikes">
    <arrangeMentVue />
    <gucessLikesVue />
  </div>
</template>

<script setup lang="ts">
import arrangeMentVue from "./programLike/arrangeMent.vue";
import gucessLikesVue from "./programLike/gucessLikes.vue";
</script>

<style lang="scss" scoped>
@import "@/views/client/styles/homePage/programeLike.scss";
@import "@/styles/component/component.scss";
</style>