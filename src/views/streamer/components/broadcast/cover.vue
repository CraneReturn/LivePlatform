<template>
  <div class="coverIt">
    <!-- 选中该封面 -->
    <label for="1">
      <input type="radio" id="1" />
      <img
        src="https://img0.baidu.com/it/u=3354087818,251408951&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1721235600&t=fa73e9d171d8a8211be0899b31ed84b4"
        alt="封面"
      />
      <el-button :icon="Delete" circle />
      <div class="shadow"></div>
    </label>
  </div>
</template>
<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
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
