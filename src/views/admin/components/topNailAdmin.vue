<template>
  <div class="topNailAdmnin">
    <div class="adminChangeWithBtn" :class="{paddingCollapse:!props.collapse}">
        <svg t="1714637569165" @click="sendEmitFlag" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13842" width="25" height="25"><path d="M960 938.666667H64a21.333333 21.333333 0 0 1 0-42.666667h896a21.333333 21.333333 0 0 1 0 42.666667z m0-256H64a21.333333 21.333333 0 0 1 0-42.666667h896a21.333333 21.333333 0 0 1 0 42.666667zM64 512a21.266667 21.266667 0 0 0 15.086667-6.246667l85.333333-85.333333a21.333333 21.333333 0 0 0 0-30.173333l-85.333333-85.333334a21.333333 21.333333 0 0 0-30.173334 30.173334L119.166667 405.333333 48.913333 475.58A21.333333 21.333333 0 0 0 64 512z m896-85.333333H362.666667a21.333333 21.333333 0 0 1 0-42.666667h597.333333a21.333333 21.333333 0 0 1 0 42.666667z m0-256H64a21.333333 21.333333 0 0 1 0-42.666667h896a21.333333 21.333333 0 0 1 0 42.666667z" fill="#424345" p-id="13843"></path></svg>
    </div>
    <div class="topNailadminPhoto">
        <div class="topNailadminPhotouser">
            <img src="@/assets/images/userPhoto/userphotojpg.jpg" alt="" srcset="">
        </div>
        <div class="adminUse">
            <div class="adminUseCenter">
                <p>
                    退出登录
                </p>
            </div>
                <div class="adminUseCenter">
                <p>
                    家乐直播
                </p>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps,defineEmits } from "vue";
const props = defineProps({
    collapse: Boolean,
});
const emits = defineEmits(["update:collapse"]);
const sendEmitFlag=()=>{
    console.log('666');
    
    const newval=!props.collapse
    emits("update:collapse", newval);
}
</script>

<style>
@import "@/styles/component/component.scss";
@import "@/views/admin/styles/sidebar/index.scss";
</style>