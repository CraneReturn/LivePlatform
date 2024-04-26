<template>
  <div class="forget">
    <div class="top">
      <p>登录XX畅享更多权益</p>
      <button class="cancel"><i class="iconfont icon-cuohao"></i></button>
    </div>
    <div class="forgetTable">
      <div class="title">重置密码</div>
      <div class="forgetInput">
        <div class="count">
          <input type="text" placeholder="请输入账号" />
        </div>
        <div class="newPassword">
          <input type="password" placeholder="请输入新密码" />
        </div>
        <div class="code">
          <input type="text" placeholder="请输入验证码" />
          <button class="getCode">获取验证码</button>
        </div>
      </div>
      <div class="update">
        <button class="changePassword">修改</button>
        <span class="backLogin">返回登录</span>
      </div>
    </div>
  </div>
  <div class="shadow"></div>
</template>
<script></script>
<style lang="scss">
@import "http://at.alicdn.com/t/c/font_4515498_og2qxp99w8d.css";
.forget {
  width: 380px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #fff;
  padding: 0 20px;
  border-radius: var(--el-border-radius-base);
  input {
    height: 40px;
    width: 100%;
    text-indent: 1em;
    outline: none;
    border: none;
    background-color: #f2f3f5;
    transition-duration: 0.2s;
    border-radius: var(--el-border-radius-base);
  }
  input:focus {
    outline: 1px solid var(--el-color-success);
    background-color: var(--el-color-white);
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(228, 230, 235, 0.7);
    p {
      font-size: var(--el-font-size-large);
      letter-spacing: 0.5px;
    }
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
  .forgetTable {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .title {
      letter-spacing: 0.5px;
      font-size: var(--el-font-size-medium);
    }
    .forgetInput {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .code {
      position: relative;
      .getCode {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: var(--el-font-size-small);
        color: var(--el-color-success-light-5);
      }
    }
    .update {
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .changePassword {
      width: 100%;
      height: 40px;
      font-size: var(--el-font-size-base);
      background-color: var(--el-color-success-light-7);
      border: none;
      border-radius: var(--el-border-radius-base);
      color: var(--el-color-white);
      cursor: pointer;
    }
    .backLogin {
      margin-top: 5px;
      font-size: var(--el-font-size-small);
      cursor: pointer;
    }
  }
}
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: rgba(#000, 0.5);
}
</style>
