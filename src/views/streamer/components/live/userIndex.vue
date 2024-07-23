<template>
  <div class="user">
    <div class="userRank"><p>1</p></div>
    <div class="userIt">
      <div class="userImage">
        <img
          src="https://n.sinaimg.cn/sinakd20116/96/w2048h2048/20240323/24a7-52a54c327350fe430e27f8b5847a0bf5.jpg"
          alt=""
        />
      </div>
      <!-- 是否为粉丝 -->
      <div class="userInfo">
        <span class="isFan">粉丝</span>
        <p class="userName">Dream朵拉</p>
      </div>
    </div>

    <div class="danationNumber">
      <p class="number">107389</p>
    </div>
    <div class="moreOprate">
      <button @click="more"><i class="iconfont icon-gengduo"></i></button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4515498_d82mbko186p.css");
.user {
  padding: 5px 0;
  display: grid;
  grid-template-columns: 2fr 9.5fr 3fr 2fr;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  min-width: 250px;
  .userIt {
    display: flex;
    align-items: center;
    gap: 2px;
    .userInfo {
      display: flex;
      align-items: center;
      font-size: 12px;
      gap: 2px;
      span {
        font-size: 10px;
        background-color: var(--jjext-color-font-brand-4);
        padding: 0 2px;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .userImage {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .number {
    font-size: 12px;
  }
  .moreOprate {
    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      transition-duration: 0.25s;
      border-radius: 5px;
    }
    button:hover {
      background-color: var(--jjext-color-layer-4-plugin);
    }
  }
}
.userRank {
  p {
    text-align: center;
  }
}
</style>
