<template>
  <div class="loginPassword">
    <p class="title">密码登录</p>
    <div class="inputPassword">
      <div class="count">
        <input
          type="text"
          class="countNumber"
          v-model="count"
          placeholder="请输入账号"
        />
      </div>
      <div class="password">
        <input
          type="password"
          class="authPassword"
          v-model="password"
          placeholder="请输入密码"
        />
        <button class="forget" @click="forgetPassword()">忘记密码</button>
      </div>
    </div>
    <div>
      <div class="loginBtn">
        <button class="signIn">注册</button>
        <button class="loginIt" @click="loginIt">登录</button>
      </div>
      <span class="changeLogin" @click="codeLogin()">验证码注册</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { ElMessage } from "element-plus";
import { login } from "@/views/client/api/login/login";
const password = ref("");
const count = ref("");
const emit = defineEmits(["code", "forget"]);
function codeLogin() {
  emit("code", false);
}
function forgetPassword() {
  emit("forget", false);
}
// 用户账号登录
const testEmail = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
const testPassword = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$/;
const testPhone = /^1[345789]\d{9}$/;
// 判断用户是使用邮箱还是手机号登录
const loginIt = () => {
  if (!testEmail.test(count.value) && testPhone.test(count.value)) {
    ElMessage({
      message: "账号格式不正确",
      type: "warning",
    });
  } else if (!testPassword.test(password.value)) {
    ElMessage({
      message: "密码格式不正确",
      type: "warning",
    });
  } else if (testEmail.test(count.value)) {
    let obj = { email: count.value, password: password.value };
    login(obj).then((response) => {
      console.log(response);
    });
  } else if (testPhone.test(count.value)) {
    let obj = { phone: count.value, password: password.value };
    login(obj).then((response) => {
      console.log(response);
    });
  }
};
</script>
<style lang="scss" scoped>
.loginPassword {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  .title {
    font-size: 16px;
    letter-spacing: 0.5px;
  }
  .inputPassword {
    display: flex;
    flex-direction: column;
    gap: 25px;
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
    .password {
      display: flex;
      align-items: center;
      position: relative;
      .forget {
        position: absolute;
        height: 100%;
        padding: 0 10px;
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
