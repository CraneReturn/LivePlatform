<template>
    <div class="personMessage">
        <div class="topReturnMessage">
            <p class="returntextMessage">
                <el-icon><ArrowLeft /></el-icon>
                返回个人主页
            </p>
        </div>
        <div class="personMessageConten">
            <div class="leftNailPerson">
                <leftNailVue/>
            </div>
            <div class="aboutConten">
                <RouterView />
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import leftNailVue from "@/views/client/layouts/person/changeMessage/leftNail.vue"

</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import '@/views/client/styles/personHome/messagePerson.scss'
</style>