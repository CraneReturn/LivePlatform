<template>
  <div class="loginCode">
    <p class="title">验证码注册</p>
    <div class="inputCode">
      <div class="count">
        <input
          type="text"
          class="countNumber"
          v-model="count"
          placeholder="请输入用户邮箱"
        />
      </div>
      <div class="code">
        <label for="authCode">
          <button class="getCode" @click="getCodeIt">获取验证码</button></label
        >
        <input
          type="text"
          class="authCode"
          id="authCode"
          placeholder="请输入验证码"
          v-model="code"
        />
      </div>
      <div class="password">
        <input
          type="password"
          class="password"
          v-model="password"
          placeholder="请输入用户密码"
        />
      </div>
    </div>
    <div>
      <button class="countLogin" @click="registerIt">注 册</button>
      <span class="changeLogin" @click="passwordLogin()">密码登录</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { ElMessage } from "element-plus";
import { getCode } from "@/views/client/api/login/login";
import { userStore } from "@/store/user";
const store = userStore();
const emit = defineEmits(["password"]);
function passwordLogin() {
  emit("password", false);
}
const count = ref("");
const code = ref("");
const password = ref("");
// 邮箱注册
const testEmail = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
const testPassword = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$/;
// 获取验证码
const getCodeIt = function () {
  if (!testEmail.test(count.value)) {
    ElMessage({
      message: "邮箱格式不合法",
      type: "warning",
    });
  } else {
    let obj = { email: count.value };
    getCode(obj).then((response) => {
      if (response.data) {
        ElMessage({
          message: "验证码发送成功",
          type: "success",
        });
      }
    });
  }
};
const registerIt = function () {
  // 判断邮箱格式是否合法
  if (!testEmail.test(count.value)) {
    ElMessage({
      message: "邮箱格式不合法",
      type: "warning",
    });
  } else if (!testPassword.test(password.value)) {
    ElMessage({
      message: "密码格式不合法",
      type: "warning",
    });
  } else {
    let obj = {
      email: count.value,
      password: password.value,
      code: code.value,
    };
    store.Register(obj).then((response) => {
      store.userInfo().catch(Error);
    });
  }
};
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
    display: flex;
    flex-direction: column;
    gap: 15px;
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
    .code {
      display: flex;
      align-items: center;
      position: relative;
      label {
        position: absolute;
        right: 0;
        padding: 0 15px;
        height: 40px;
      }
      .getCode {
        height: 100%;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 12.5px;
        color: var(--el-color-success-light-5);
        transition-duration: 0.2s;
      }
      label:focus-within + .authCode {
        background-color: var(--el-color-white);
        outline: 1px solid var(--el-color-success);
      }
    }
  }
  .countLogin {
    height: 35px;
    text-align: center;
    transition-duration: 0.25s;
    width: 100%;
    font-size: var(--el-font-size-base);
    border-radius: var(--el-border-radius-base);
    color: var(--el-color-white);
    background-color: var(--el-color-success-light-5);
    cursor: pointer;
    border: none;
  }
  .countLogin:hover {
    background-color: var(--el-color-success-light-3);
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
