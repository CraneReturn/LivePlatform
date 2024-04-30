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
        :ranking="index"
        :name="'挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦'"
      ></userIndex>
    </div>
    <div class="chatWith">
      <!--两个部分 聊天框+输入框  -->
      <div class="chatFrame"></div>
      <div class="inputFrame">
        <div class="chatInput">
          <textarea
            rows="1"
            @input="rows($event)"
            class="chatArea"
            maxlength="50"
            placeholder="善言结善语，恶语伤人心~~"
          ></textarea>
          <div class="emoji"><i class="iconfont icon-Emoji"></i></div>
          <div class="sendMessage"><button class="send">发送</button></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import userIndex from "./userIndex.vue";
function rows(event) {
  event.target.style.height = "auto";
  event.target.style.height = event.target.scrollHeight + "px";
}
</script>
<style lang="scss" scoped>
@import "http://at.alicdn.com/t/c/font_4515498_29jo7wuow4.css";
.icon-xitong_zaixianyonghu {
  color: var(--el-color-success-light-3);
  font-size: 25px;
}
.chat {
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
.chatWith {
  height: 350px;
}
.chatFrame {
  height: 280px;
  width: 100%;
  background-color: lawngreen;
}
.inputFrame {
  padding: 10px;
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
    padding: 11px 100px 11px 8px;
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
</style>
