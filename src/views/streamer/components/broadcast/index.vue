<template>
  <div>
    <describe />
    <drainage />
    <cover />
  </div>
</template>
<script setup lang="ts">
import describe from "./describe.vue";
import drainage from "./drainage.vue";
import cover from "./cover.vue";
</script>
<style lang="scss">
h2 {
  font-size: 16px;
  font-weight: 600;
}
</style>
