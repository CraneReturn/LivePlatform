<template>
  <div class="leftCommentList">
    <p class="titelCommnt">推荐</p>
    <div class="leftCommentMain">
      <div
        class="leftLeftMain"
        @mouseenter="hoverCommentFlag = true"
        @mouseleave="hoverCommentFlag = false"
      >
        <div class="leftTitleCommentMain">
          <p>
            <span class="titleMain"> 今日推荐直播 </span>
          </p>
          <p>
            <span class="authMain"> 主播：{{ commentUp }} </span>
          </p>
        </div>
        <video
          src="@/assets/viedo/test.mp4"
          autoplay
          muted
          :class="{ hoverComment: !hoverCommentFlag }"
        ></video>
        <img
          src="https://img2.baidu.com/it/u=3242159937,4024588862&fm=253&fmt=auto&app=138&f=JPEG?w=940&h=800"
          :class="{ hoverComment: hoverCommentFlag }"
          alt=""
          srcset=""
        />
      </div>
      <div class="leftrightCommenMain">
        <div class="leftrightCommenMainList">
          <ul>
            <li
              @mouseenter="onceHoverCommentFlag = true"
              @mouseleave="onceHoverCommentFlag = false"
              v-for="(item, index) in arrComment"
              :key="index"
            >
              <p class="titieOnceComment">
                主播：{{ item.name ? "111" : "乐乐学妹" }}
              </p>
              <video
                :key="item"
                src="@/assets/viedo/test.mp4"
                autoplay
                muted
                :class="{ hoverComment: !onceHoverCommentFlag }"
              ></video>
              <img
                :key="index"
                src="https://img2.baidu.com/it/u=3242159937,4024588862&fm=253&fmt=auto&app=138&f=JPEG?w=940&h=800"
                :class="{ hoverComment: onceHoverCommentFlag }"
                alt=""
                srcset=""
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {};
</script>
  <script setup lang="ts">
import { reactive, ref } from "vue";
const commentUp = ref<String>("鹤归江野");
const hoverCommentFlag = ref<boolean>(false);
const onceHoverCommentFlag = ref<boolean>(false);
const arrComment = reactive([{}, {}, {}, {}, {}]);
</script>
  <style lang="scss">
@import "@/views/client/styles/homePage/homePageTop.scss";
@import "@/views/client/styles/homePage/centerViedo.scss";
@import "@/styles/component/component.scss";
@import "@/views/client/styles/homePage/cilentComment.scss";
</style>
  