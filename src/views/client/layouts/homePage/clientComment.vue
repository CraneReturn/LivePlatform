<template>
  <div class="commetListshow">
    <leftRecommed />
    <systemRecommed />
  </div>
</template>
<script lang="ts">
export default {};
</script>
<script setup lang="ts">
import leftRecommed from "./clientComment/leftRecommed.vue";
import systemRecommed from "./clientComment/systemRecommed.vue";
</script>
<style lang="scss">
@import "@/views/client/styles/homePage/homePageTop.scss";
@import "@/views/client/styles/homePage/centerViedo.scss";
@import "@/styles/component/component.scss";
@import "@/views/client/styles/homePage/cilentComment.scss";
</style>
