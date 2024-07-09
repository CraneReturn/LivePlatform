<template>
  <div class="sendNotice" v-if="issend">
    <div class="topTitle">
        <span>发布新公告</span>
    </div>
    <textarea placeholder="填写公告,1-600字"></textarea>
    <div class="bottombt">
      <div class="bottom-left">
        <span>置顶公告</span>
      </div>
      <div class="bottom-right">
        <button class="sendbtn">发布</button>
        <button class="canclebtn" @click="closeSend()">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props:['issend'],
  methods: {
    closeSend(){
      this.$emit('colse-send');
    }
  },
}
</script>
<script lang="ts" setup></script>

<style lang="scss" scope>
@import "@/views/client/styles/groupChat/sendNotice.scss";
</style>