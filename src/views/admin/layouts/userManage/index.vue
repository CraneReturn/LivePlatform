<!-- 使用adminIndex组件写用户管理 -->
<template>
  <div class="userManage">
    <adminIndex
      :editDialog.sync="editDialog"
      :addDialog.sync="addDialog"
      @add="add"
      @edit="edit"
      :title="'用户'"
      :position="'left'"
      :search="search"
      :searchIt="searchIt"
      :pageSize="[10, 15, 20]"
    >
    <template #table="{data,deleteIt}">
      <div>
        
      </div>
    </template>
      <template #add>
        <div></div>
      </template>
    </adminIndex>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import adminIndex from "../../components/adminIndex.vue";
const search = [{ description: "用户名", param: "userName" }];
const searchIt = function () {
  console.log(1111);
};
const editDialog = ref(false);
const addDialog = ref(false);
function add() {

}
function edit() {

}
</script>
<style lang="scss" scoped></style>
