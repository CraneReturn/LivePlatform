<template>
  <!-- 登录注册 -->
  <div class="login" v-if="!forget">
    <div class="loginTop">
      <p class="title">登录XX畅享更多权益</p>
      <button class="cancelLogin" @click="cancelLogin">
        <i class="iconfont icon-cuohao"></i>
      </button>
    </div>
    <div class="loginTable">
      <div class="logo">
        <div></div>
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
        <div class="loginOther">
          <p class="loginTitle">其他方式登录</p>
          <div class="loginPick">
            <el-popover
              ref="popover"
              placement="top"
              :width="225"
              trigger="focus"
            >
              <div class="content">
                <p class="title">使用微信扫码登录</p>
                <div class="canvasCode">
                  <canvas
                    ref="wechat"
                    @click="getWechatCode"
                    width="200px"
                    height="200px"
                  ></canvas>
                </div>
              </div>

              <template #reference>
                <button class="wechatLogin">
                  <i class="iconfont icon-weixin"></i>
                  <p>微信登录</p>
                </button>
              </template>
            </el-popover>

            <el-popover
              ref="popover"
              placement="right"
              :width="200"
              trigger="focus"
            >
              <p>使用微信扫码登录</p>
              <template #reference>
                <button class="wechatLogin">
                  <i class="iconfont icon-zhifubao"></i>
                  <p>支付宝登录</p>
                </button>
              </template>
            </el-popover>
          </div>
        </div>
      </div>

      <div class="loginMain">
        <Password
          @code="changeCodeLogin"
          v-if="passwordLogin"
          @forget="forgetPassword"
        ></Password>
        <Code @password="changePasswordLogin" v-if="codeLogin"></Code>
      </div>
    </div>
    <div class="loginFoot">
      <p>注册登录即表示同意 <span>用户协议</span> 和 <span>隐私政策</span></p>
    </div>
  </div>
  <forgetIt v-if="forget" @forget="forgetPassword"></forgetIt>
  <div class="shadow"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as QRCode from "qrcode";
import Code from "./layouts/login/code.vue";
import Password from "./layouts/login/password.vue";
import forgetIt from "./layouts/login/forget.vue";
import { wechatCode, getToken } from "@/views/client/api/login/login";
import { defineEmits } from "vue";
const emit = defineEmits(["loginShow"]);
let passwordLogin = ref(true);
let codeLogin = ref(false);
let forget = ref(false);
let url = ref("");
let key = ref(null);

let wechat = ref(<HTMLCanvasElement | null>null);
async function getWechatCode() {
  let response = await wechatCode();
  url.value = response.data.url;
  key.value = response.data.key;
  QRCode.toCanvas(wechat.value, url.value, function (error: any) {
    if (error) console.error(error);
    if (key.value) getUserToken(key.value);
  });
}
function cancelLogin() {
  emit("loginShow", false);
}
// 长轮询当前用户是否扫码
function getUserToken(key: string) {
  if (!key) return;
  getToken(key)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
function changeCodeLogin(value: boolean) {
  passwordLogin.value = value;
  codeLogin.value = !value;
}
function forgetPassword(value: boolean) {
  forget.value = value;
}
function changePasswordLogin(value: boolean) {
  codeLogin.value = value;
  passwordLogin.value = !value;
}

onMounted(() => {
  getWechatCode();
});
</script>
<style lang="scss" scoped>
@import "http://at.alicdn.com/t/c/font_4515498_ytesvywtn9.css";

.canvasCode {
  width: 200px;
  height: 200px;
  canvas {
    width: 200px !important;
    height: 200px !important;
    aspect-ratio: 200/200;
  }
}
.login {
  min-width: 550px;
  height: 395px;
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
    min-height: 300px;
    padding-top: 20px;
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
    padding: 8px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    svg {
      width: 150px;
    }
    .loginOther {
      .loginTitle {
        text-align: center;
        color: #aeaeae;
        font-size: 14px;
      }
      .loginPick {
        display: flex;
        justify-content: space-around;
        margin-top: 5px;

        .wechatLogin {
          border: none;
          display: flex;
          background-color: white;
          transition-duration: 0.25s;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          border-radius: 3px;
          padding: 5px 10px;
          p {
            font-size: 13px;
            color: #aeaeae;
          }
          .title {
            text-align: center;
          }
        }
        .wechatLogin:hover {
          background-color: rgba(124, 168, 109, 0.2);
        }
        .icon-weixin {
          color: #28c445;
          font-size: 25px;
        }
        .icon-zhifubao {
          color: #00a0ea;
          font-size: 25px;
        }
      }
    }
  }
  .loginFoot {
    padding: 6px;

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
