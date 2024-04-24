<template>
  <div class="loginCode">
    <p class="title">验证码登录 / 注册</p>
    <div class="inputCode">
      <div class="count">
        <input type="text" class="countNumber" placeholder="请输入账号" />
      </div>
      <div class="code">
        <input type="text" class="authCode" placeholder="请输入验证码" />
        <button class="getCode">获取验证码</button>
      </div>
    </div>
    <div>
      <button class="countLogin">登录 / 注册</button>
      <span class="changeLogin" @click="passwordLogin()">密码登录</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["password"]);
function passwordLogin() {
  emit("password", false);
}
</script>
<style lang="scss" scoped>
.loginCode {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title {
    font-size: 16px;
    letter-spacing: 0.5px;
  }
  .inputCode {
    input {
      outline: none;
      background-color: #f2f3f5;
      border: none;
      height: 40px;
      border-radius: 4px;
      width: 100%;
      text-indent: 1em;
      transition-duration: 0.2s;
    }
    input:focus {
      background-color: var(--el-color-white);
      outline: 1px solid var(--el-color-success);
    }
    .count {
      margin-bottom: 15px;
    }
    .code {
      display: flex;
      align-items: center;
      position: relative;
      .getCode {
        position: absolute;
        height: 100%;
        right: 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 12.5px;
        color: var(--el-color-success-light-5);
        transition-duration: 0.2s;
      }
    }
  }
  .countLogin {
    height: 35px;
    width: 100%;
    font-size: var(--el-font-size-base);
    border-radius: var(--el-border-radius-base);
    color: var(--el-color-white);
    background-color: var(--el-color-success-light-5);
    cursor: pointer;
    border: none;
  }
  .changeLogin {
    margin-top: 5px;
    font-size: var(--el-font-size-small);
    float: right;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
