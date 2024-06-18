<!-- 在线观众+聊天 -->
<template>
  <div class="chat">
    <div class="top">
      <i class="iconfont icon-xitong_zaixianyonghu"></i>
      <div class="audienceNumber">
        <p class="online">在线观众</p>
        <i>·</i>
        <p>10万+</p>
      </div>
    </div>
    <div class="ranking">
      <!-- 排名 头像 名称 -->
      <userIndex
        v-for="index in 5"
        :key="index"
        :ranking="index"
        :name="'挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦'"
      ></userIndex>
    </div>
    <div class="chatFrame"></div>
    <div class="chatWith">
      <!--两个部分 聊天框+输入框  -->
      <barrageText/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import barrageText from "./barrage/barrageText.vue";
import userIndex from "./userIndex.vue";
</script>
<style lang="scss">
@import "http://at.alicdn.com/t/c/font_4515498_x1t0sazzfdj.css";
.icon-xitong_zaixianyonghu {
  color: var(--el-color-success-light-3);
  font-size: 25px;
}
.chat {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top {
  display: flex;
  align-items: center;
  gap: 15px;
  height: 45px;
  line-height: 45px;
  .audienceNumber {
    display: flex;
    gap: 5px;
  }
  p {
    font-size: var(--el-font-size-base);
  }
}
.chatFrame {
  height: 100%;
  width: 100%;
  background-color: lawngreen;
}
.inputFrame {
  padding: 10px;
}
.ranking {
  max-height: 270px;
}
.chatInput {
  height: 100%;
  border-radius: var(--el-border-radius-base);
  display: flex;
  align-items: flex-end;
  gap: 10px;
  position: relative;
  width: 100%;
  background-color: var(--el-color-info-light-9);
  .chatArea {
    height: 100%;
    outline: 1.5px solid transparent;
    border: 1px solid transparent;
    width: 100%;
    resize: none;
    line-height: 22px;
    padding: 11px 100px 11px 35px;
    overflow: hidden;
    background-color: transparent;
    transition-duration: 0.25s;
    border-radius: var(--el-border-radius-base);
    font-family: inherit;
  }
  .chatArea:focus {
    border: 1px solid var(--el-color-success-light-3);
    outline: 1.5px solid var(--el-color-success-light-5);
  }
  .emoji {
    position: absolute;
    bottom: 5px;
    right: 70px;
    .icon-Emoji {
      font-size: 25px;
      line-height: 35px;
      cursor: pointer;
    }
  }
  .textSet {
    position: absolute;
    top: 0;
    left: 8px;
    cursor: pointer;
    .iconfont {
      font-size: 23px;
      line-height: 42px;
      color: var(--vt-c-divider-dark-2);
    }
  }
  .sendMessage {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 60px;
    height: 35px;
    .send {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border: none;
      background-color: var(--el-color-success-light-5);
      color: #fff;
      border-radius: var(--el-border-radius-base);
    }
  }
}
.hiddenSettingText {
  position: relative;
  left: -10px;
  opacity: 0 !important;
}
</style>
