<template>
  <div class="concern">
    <div class="concernUser" v-for="index in 10">
      <div class="head">
        <img
          src="https://q8.itc.cn/q_70/images03/20240613/7b9636910f6b48a5a109a5614597699f.jpeg"
          alt=""
        />
      </div>
      <div class="userInfo">
        <p class="username">待见</p>
        <p class="info">11111111111111</p>
      </div>
      <div class="userOprate">
        <button>已关注</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.concernUser {
  transition-duration: 0.5s;
  padding: 10px 20px;
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: 1fr 7fr 1fr;
  border-bottom: 1.5px solid #f5f5f5;
  cursor: pointer;
  .head {
    height: 55px;
    width: 55px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .userInfo {
    .username {
      font-size: 18px;
      font-weight: 600;
    }
    .info {
      font-size: 13px;
      color: #ccc;
      margin-top: 5px;
    }
  }
  .userOprate {
    button {
      background-color: var(--el-color-success-light-3);
      height: 30px;
      width: 80px;
      border: none;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
.concernUser:hover {
  background-color: var(--el-color-success-light-9);
}
</style>
