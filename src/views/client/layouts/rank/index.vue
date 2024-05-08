<template>
  <div class="rankTable">
    <div class="rankLeft">
      <!-- 完整榜单 -->
      <!-- 游戏榜单 -->
    </div>
    <div class="rank">
      <userIndex
        v-for="index in 100"
        :ranking="index"
        :name="'挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦挖苦'"
      >
        <template v-slot:popularity>
          <p class="popNum"><i class="iconfont icon-hot"></i>{{ 111 }}</p>
        </template>
      </userIndex>
    </div>
    <div class="rankRight">
      <div class="interested">
        <div class="interestedTop">
          <p>你可能感兴趣的人</p>
          <button><i class="iconfont icon-yulanxuanzhuan"></i>换一换</button>
        </div>
        <div class="main">
          <div class="recommend" v-for="index in 3">
            <div class="userHead">
              <img
                src="https://img0.baidu.com/it/u=3059338894,2334870186&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"
                alt=""
              />
            </div>
            <div class="info">
              <p>张三张安张阿布珊萨干啥</p>
              <p class="intro">啦啦啦啦啦啦啦啦啦啦啦啦啊啦啦啦啦</p>
            </div>
            <button>关注</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import userIndex from "@/views/streamer/components/userIndex.vue";
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4515498_7hzpu4sfpru.css");
.icon-hot {
  color: red;
}
.rankTable {
  background-color: #f2f2f5;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
  .rank {
    width: 100%;
    .userInfo {
      justify-content: space-between;
      background-color: var(--el-bg-color);
      margin-bottom: 10px;
      padding: 10px 20px;
    }
    .userInfo:hover {
      color: var(--el-color-success-light-3);
    }
  }
  .popNum {
    color: black;
  }
}
.rankLeft {
  position: sticky;
  top: 10px;
  height: 300px;
  min-width: 200px;
  background-color: var(--el-bg-color);
  border-radius: 4px;
}
.rankRight {
  max-width: 200px;
  background-color: #fff;
  .recommend {
    display: flex;
    justify-content: space-between;
    .userHead {
      width: 45px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      width: 40%;
      p {
        width: 100%;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
