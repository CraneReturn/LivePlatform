<template>
  <el-popover ref="popover" placement="right" width="300" trigger="hover">
    <!-- 描述内容 -->
    <div class="giftInfo">
      <div class="imgInfo">
        <img
          src="https://www.svgrepo.com/show/521340/clown-face.svg"
          alt="svg"
        />
      </div>

      <p class="name">
        <strong class="giftName">Joker</strong>
        <span class="giftCost">9999 joker币</span>
      </p>
      <div class="foot">
        <div class="descr">
          <p class="title">描述:</p>
          <p class="description">
            而你,我的朋友,才是歌坛最大的Joker,而你,我的朋友,才是歌坛最大的Joker,而你,我的朋友,才是歌坛最大的Joker,而你,我的朋友,才是歌坛最大的Joker
          </p>
        </div>
        <div class="oprateUser">
          <el-button type="text" class="edit">编辑</el-button>
          <el-button type="text" class="del">删除</el-button>
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
<script setup lang="ts"></script>
<style lang="scss">
.giftInfo {
  display: grid;
  align-items: center;
  grid-template-areas:
    "img name name name name name"
    "foot foot foot foot foot foot";
  gap: 10px;
  .imgInfo {
    grid-area: img;
    height: 100%;
    img {
      width: 55px;
    }
  }
  .name {
    grid-area: name;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .giftName {
      font-weight: 700;
      color: #464646;
      font-size: var(--el-font-size-medium);
    }
    .giftCost {
      color: #eb6100;
      font-size: var(--el-font-size-small);
    }
  }
  .foot {
    grid-area: foot;
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
  }

  .info {
    display: flex;
    flex-direction: column;
  }
}
.gift {
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 120px;
  padding: 10px;
  align-items: center;
  background-color: var(--el-color-success-light-5);
  cursor: pointer;
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow);
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
.edit {
  color: var(--el-color-warning);
}
.del {
  color: var(--el-color-danger);
}
</style>
