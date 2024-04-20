<template>
  <div class="loginPassword">
    <p class="title">密码登录</p>
    <div class="inputPassword">
      <div class="count">
        <input type="text" class="countNumber" placeholder="请输入账号" />
      </div>
      <div class="password">
        <input type="text" class="authPassword" placeholder="请输入密码" />
        <button class="forget">忘记密码</button>
      </div>
    </div>
    <div>
      <div class="loginBtn">
        <button class="signIn">注册</button>
        <button class="loginIt">登录</button>
      </div>
      <span class="changeLogin" @click="codeLogin()">验证码登录</span>
    </div>
  </div>
</template>
<script setup lang="ts">
function codeLogin() {
  context.emit("code", false);
}
</script>
<style lang="scss" scoped>
.loginPassword {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title {
    font-size: 16px;
    letter-spacing: 0.5px;
  }
  .inputPassword {
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
    .password {
      display: flex;
      align-items: center;
      position: relative;
      .forget {
        position: absolute;
        height: 100%;
        right: 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 12.5px;
        color: rgba(var(--el-color-primary));
        transition-duration: 0.2s;
      }
      .forget:hover {
        color: var(--el-color-success-light-5);
      }
    }
  }
  .loginBtn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    button {
      height: 35px;
      width: 48%;
      font-size: var(--el-font-size-base);
      border-radius: var(--el-border-radius-base);
      color: var(--el-color-white);
      background-color: var(--el-color-success-light-5);
      cursor: pointer;
      border: none;
    }
    .signIn {
      border: 1px solid var(--el-color-success-light-3);
      background-color: var(--el-color-white);
      color: var(--el-color-success-light-3);
    }
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
