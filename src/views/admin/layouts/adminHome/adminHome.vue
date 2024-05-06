<template>
    <div class="adminMagerHomeMain">
      <div class="adminMagerHomeLeft">
        <div class="leftTopAdminMessage">
          <div class="leftTopAdminMessageCenter">
            <div class="leftTopAdminMessagetitle">上次登录时间</div>
            <div class="leftTopAdminMessageTime">2024.1.9</div>
          </div>
          <div class="leftTopAdminMessageCenter">
            <div class="leftTopAdminMessagetitle">上次登录时间</div>
            <div class="leftTopAdminMessageTime">2024.1.9</div>
          </div>
        </div>

      </div>
      <div class="adminMagerHomeRight">
        <div class="rightMainaHomeAdmin"> 
            <video src="@/assets/viedo/test.mp4" controls>
            </video>
        </div>
        <div class="userEcharsAdmin">
            <userEchars/>
        </div>
      </div>
    </div>
 

</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import userEchars from './userEchars.vue'
const props = defineProps({
  collapse: Boolean,
});
</script>

<style>
@import "@/views/admin/styles/adminHome/adminhome.scss";
</style>