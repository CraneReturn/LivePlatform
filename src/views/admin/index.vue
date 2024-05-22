<template>
  <aside class="aside adminMain">
    <topNailAdmin :collapse="isCollapse" @update:collapse="collapseUpdate" />
    <div class="adminMagerHome" :class="{ paddingAdminHome: !isCollapse }">
      <router-view> </router-view>
    </div>
    <topAdminLive :class="{ iscollapse: isCollapse }" />
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import adminHome from "./layouts/adminHome/adminHome.vue";
import topAdminLive from "./components/topAdminLive.vue";
import topNailAdmin from "./components/topNailAdmin.vue";
const isCollapse = ref<Boolean>(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const collapseUpdate = (value: Boolean) => {
  isCollapse.value = value;
};
</script>

<style>
.aside {
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  height: 100vh;
}
.iscollapse {
  width: calc(
    var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2
  );
}
.adminMagerHome {
  padding-left: calc(
    var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2
  );
  padding-top: 60px;
  width: 100%;
  position: absolute;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
