<template>
    <div class="leftNailPersonset">
        <ul>
            <li :class="{personNailClicked:clickedNailnumber==1}"
            @click="personSetting">
                <el-icon><HomeFilled /></el-icon>
                <span>个人资料</span>
            </li>
            <li :class="{personNailClicked:clickedNailnumber==2}"
            @click="passwordSetting">
            <el-icon><MagicStick /></el-icon>
                <span>账号设置</span>
            </li>
            <li :class="{personNailClicked:clickedNailnumber==3}"
            @click="messageSetting"
            >
            <el-icon><ChatDotRound /></el-icon>
                <span>消息设置</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const clickedNailnumber=ref(1);
const messageSetting=()=>{
    clickedNailnumber.value=3
}
const personSetting=()=>{
    clickedNailnumber.value=1
    router.push('/personmessage/changemessage');
}
const passwordSetting=()=>{
    clickedNailnumber.value=2
    router.push('/personmessage/passwordset')
}

</script>

<style>

</style>