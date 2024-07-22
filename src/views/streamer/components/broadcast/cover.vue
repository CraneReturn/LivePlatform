<template>
  <!-- 选中该封面 -->
  <label :for="props.id" class="coverIt">
    <input
      type="radio"
      :id="props.id"
      :value="props.id"
      name="options"
      @change="handleChange($event)"
      checked
    />
    <img :src="props.cover" alt="封面" />
    <el-button :icon="Delete" @click="del(props.id)" circle />
    <div class="shadow"></div>
  </label>
</template>
<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import { defineProps, defineEmits } from "vue";
const props = defineProps(["id", "cover"]);
const emit = defineEmits(["index", "changeIndex"]);
const del = (index: number) => {
  emit("index", index);
};
const handleChange = (event: Event) => {
  // Ensure the event target is an HTMLInputElement
  const target = event.target as HTMLInputElement;
  console.log(target);

  if (target.checked) {
    console.log(props.id, target.checked, 111111);
    emit("changeIndex", props.id);
  }
};
</script>
<style lang="scss" scoped>
.coverIt {
  width: 180px;
  height: 120px;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }
  input[type="radio"] {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;
  }
  button {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}
.shadow {
  position: absolute;
  z-index: 0;
  width: 100%;
  opacity: 0;
  top: 0;
  left: 0;
  border-radius: 5px;
  height: 100%;
  display: block;
  background-color: var(--jjext-color-mask);
  transition-duration: 0.05s;
}
.coverIt:hover {
  .shadow {
    opacity: 1;
  }
  button {
    display: block;
  }
}
</style>
