<template lang="">
  <!-- 登录注册 -->
  <div class="login">
    <div class="loginTop">
      <p class="title">登录XX畅享更多权益</p>
      <button class="cancelLogin"><i class="iconfont icon-cuohao"></i></button>
    </div>
    <div class="loginTable">
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69">
          <path
            d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z"
            fill="#41b883"
          />
          <path
            d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z"
            fill="#34495e"
          />
        </svg>
      </div>
      <div class="loginMain">
        <Password @code="changeCodeLogin" v-if="passwordLogin" @forget="forgetPassword"></Password>
        <Code @password="changePasswordLogin" v-if="codeLogin"></Code>
      </div>
    </div>
    <div class="loginFoot">
      <p>注册登录即表示同意 <span>用户协议</span> 和 <span>隐私政策</span></p>
    </div>
  </div>
  <div class="shadow"></div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Code from "./layouts/login/code.vue";
import Password from "./layouts/login/password.vue";
let passwordLogin = ref(true);
let codeLogin = ref(false);
function changeCodeLogin(value) {
  passwordLogin.value = value;
  codeLogin.value = !value;
}
function changePasswordLogin(value) {
  codeLogin.value = value;
  passwordLogin.value = !value;
}
</script>
<style lang="scss" scoped>
@import "http://at.alicdn.com/t/c/font_4515498_og2qxp99w8d.css";

.login {
  min-width: 645px;
  padding: 0 20px;
  border-radius: 5px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .loginTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid rgba(228, 230, 235, 0.7);
    .title {
      font-size: var(--el-font-size-large);
      letter-spacing: 0.5px;
    }
    .cancelLogin {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
  .loginTable {
    padding: 20px 0;
    display: grid;
    grid-template-columns: 7fr 10fr;
    .loginMain {
      padding: 0 30px;
    }
  }
  .logo {
    border-right: 1px solid rgba(228, 230, 235, 0.7);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 150px;
    }
  }
  .loginFoot {
    padding: 20px;
    padding-top: 0;

    p {
      text-align: center;
      color: var(--el-text-color-placeholder);
      font-size: var(--el-font-size-base);
      span {
        color: var(--el-color-success-light-5);
        cursor: pointer;
      }
    }
  }
}
.shadow {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.5);
}
</style>
