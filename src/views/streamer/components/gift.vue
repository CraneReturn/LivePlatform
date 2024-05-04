<template>
  <el-popover ref="popover" placement="top" width="300" trigger="hover">
    <!-- 描述内容 -->
    <div class="giftInfo">
      <div class="imgInfo">
        <img
          src="https://www.svgrepo.com/show/521340/clown-face.svg"
          alt="svg"
        />
      </div>
      <div class="right">
        <p class="name">
          <strong class="giftName">Joker</strong>
        </p>
        <div class="descr">
          <p class="description">而你,我的朋友,才是歌坛最大的Joker</p>
        </div>
      </div>
      <div class="foot">
        <div class="oprateUser">
          <p class="cost">200joker</p>
          <div class="donate"><button>赠送</button></div>
        </div>
      </div>
    </div>
    <template v-slot:reference>
      <div class="gift">
        <div class="svg">
          <img
            src="https://www.svgrepo.com/show/521340/clown-face.svg"
            alt="svg"
          />
        </div>
      </div>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import { ref } from "vue";
let radio4 = ref("1");
</script>
<style lang="scss" scoped>
.giftInfo {
  display: grid;
  align-items: center;
  grid-template-areas:
    "img img right right right"
    "foot foot foot foot foot";
  gap: 10px;
  .imgInfo {
    grid-area: img;
    height: 100%;
    img {
      width: 60px;
    }
  }
  .right {
    grid-area: right;
  }
  .name {
    display: flex;
    gap: 8px;
    .giftName {
      font-weight: 700;
      color: #464646;
      font-size: var(--el-font-size-medium);
    }
  }
  .descr {
    display: flex;
    gap: 6px;
    .title {
      font-weight: 700;
      white-space: nowrap;
      color: #464646;
      font-size: var(--el-font-size-base);
    }
    .description {
      font-size: var(--el-font-size-small);
    }
  }
  .foot {
    grid-area: foot;
  }

  .info {
    display: flex;
    flex-direction: column;
  }
}
.gift {
  display: flex;
  flex-direction: column;
  transform: scale(0.9);
  transition-duration: 0.25s;
  width: 65px;
  height: 65px;
  padding: 10px;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  border-radius: var(--el-border-radius-base);
  .svg {
    width: 100%;
    display: flex;
    align-items: center;
    justify-self: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.gift:hover {
  transform: scale(1);
}

.oprateUser {
  display: flex;
  align-items: end;
  justify-content: space-between;
  .cost {
    font-size: 12px;
    font-family: cursive;
    color: gold;
  }
  button {
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    border: none;
    width: 50px;
    border-radius: 2px;
    color: #fff;
    background-color: var(--el-color-success-light-3);
  }
}
</style>
