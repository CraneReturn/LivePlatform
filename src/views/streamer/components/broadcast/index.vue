<template>
  <div class="index">
    <div class="left">
      <describe @title="getTitle" @describe="getDescribe" />
      <drainage />
      <cover @cover="getCover" />
    </div>
    <div class="right">
      <preview :cover="coverImg" :title="title" :describe="describeIt" />
      <labelIt />
    </div>
  </div>
</template>
<script setup lang="ts">
import describe from "./describe.vue";
import drainage from "./drainage.vue";
import cover from "./coverSetting.vue";
import preview from "./preview.vue";
import labelIt from "./label.vue";
import { ref } from "vue";
let coverImg = ref("");
let title = ref("");
let describeIt = ref("");
function getCover(value: string) {
  coverImg.value = value;
}
function getTitle(value: string) {
  title.value = value;
}
function getDescribe(value: string) {
  describeIt.value = value;
}
</script>
<style lang="scss">
h2 {
  font-size: 16px;
  font-weight: 600;
}
.index {
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: 2fr 1fr;
}
.right {
  position: sticky;
  top: 70px;
}
</style>
