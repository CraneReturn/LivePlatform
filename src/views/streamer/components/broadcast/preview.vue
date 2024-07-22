<template>
  <div class="preview">
    <!-- 预览效果 -->
    <h2>预览效果</h2>
    <p style="font-size: 13px; color: #ccc">
      预览效果可以展示你的直播在页面中的效果
    </p>
    <div class="prev">
      <div class="coverIt">
        <img
          class="cover"
          :src="
            props.cover ||
            'https://img1.baidu.com/it/u=4081011998,564762961&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500'
          "
          alt="封面"
        />
        <div class="shade"></div>
        <div class="userMessage">
          <div class="userHead">
            <img :src="avatar" alt="用户头像" />
          </div>
          <p class="userName">{{ userName }}</p>
          <div class="hot">
            <i class="iconfont icon-daochu1024-07"></i>
            <p class="hotNumber">0</p>
          </div>
        </div>
      </div>
      <div class="liveInfo">
        <!-- 标题 -->
        <p class="title">{{ props.title || "标题" }}</p>
      </div>
      <div class="label">
        <!-- 话题 -->
        <button>直播</button>
        <button>直播</button>
        <button>直播</button>
        <button>直播</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { userStore } from "@/store/user";
import { storeToRefs } from "pinia";
const store = userStore();
const { userName, avatar } = storeToRefs(store);
const props = defineProps(["cover", "title", "label"]);
 
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4515498_kgflfyz9p7.css");
.preview {
  padding: 20px;
  .prev {
    display: flex;
    flex-direction: column;
    .coverIt {
      position: relative;
      width: 100%;
      border-radius: 4px;
      overflow: hidden;
      .userMessage {
        padding: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr 10fr;
        align-items: center;
        text-align: center;
        font-size: 14px;
        position: absolute;
        bottom: 0;
        color: #fff;
      }
      .userHead {
        width: 35px;
        height: 35px;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .hot {
        display: flex;
        justify-content: right;
        gap: 5px;
      }
    }
    .cover {
      width: 100%;
      height: 250px;
    }
    .shade {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(transparent 0%, transparent 80%, black 100%);
    }
    .liveInfo {
      padding: 5px 10px;
      .title {
        font-size: 15px;
        font-weight: 600;
      }
    }
    .label {
      padding: 0 10px;
      display: flex;
      gap: 10px;
      button {
        border: none;
        border-radius: 3px;
      }
    }
  }
}
</style>
