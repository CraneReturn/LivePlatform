<template>
    <el-container class="layout-container-demo" style="height: 500px">
        <el-aside width="200px">
            <SidebarMenu></SidebarMenu>
        </el-aside>
        <ElContainer>
            <ElHeader></ElHeader>
            <ElMain>
                dssd
            </ElMain>
        </ElContainer>
    </el-container>
    <slot></slot>
</template>

<script setup>
import SidebarMenu from '@/components/admin/SidebarMenu.vue';
import { ElContainer, ElHeader, ElMain } from 'element-plus';

</script>

<style lang="scss">

</style>
