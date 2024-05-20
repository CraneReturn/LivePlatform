<template>
  <div class="userInfo">
    <div class="Info">
      <div class="user">
        <p class="ranking" v-bind:class="rankColor()">{{ ranking }}</p>
        <div class="mainInfo">
          <div class="head">
            <img
              src="https://q1.itc.cn/q_70/images03/20240329/23a82de4541a454f85d81e71074a7141.jpeg"
              alt="用户头像"
            />
          </div>
          <p class="name">{{ name }}</p>
        </div>
      </div>
      <slot name="popularity"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import defineProps from "vue";
const props = defineProps({ ranking: Number, head: String, name: String });
// 排名信息 index
// 头像信息 head
// 名称 name
// 其他内容
function rankColor() {
  switch (props.ranking) {
    case 1:
      return "first";
      break;
    case 2:
      return "second";
      break;
    case 3:
      return "third";
      break;
    default:
      return "default";
      break;
  }
}
</script>
<style lang="scss" scoped>
.first {
  color: #ff2935;
}
.second {
  color: #ea4235;
}
.third {
  color: #f4b81f;
}
.default {
  color: rgb(47 48 53 / 40%);
}
.userInfo {
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  gap: 20px;
  transition-duration: 0.25s;
  .user {
    display: flex;
    gap: 10px;
    align-items: center;
    transition-duration: 0.25s;
  }
  .mainInfo {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .ranking {
    font-weight: 700;
    width: 20px;
    text-align: center;
    font-size: var(--el-font-size-base);
    font-style: oblique;
  }
  .head {
    width: 32px;
    height: 32px;
    border-radius: var(--el-border-radius-circle);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-size: var(--el-font-size-base);
    font-weight: 400;
    width: 40%;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
}
.userInfo:hover {
  background-color: var(--vt-c-divider-light-2);
}
</style>
