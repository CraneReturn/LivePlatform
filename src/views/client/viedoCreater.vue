<template>
    <div class="viedoCreaterMain">
      <div class="viedoCreaterMainCenter">
        <keep-alive>
            <uploadNailVue/>
        </keep-alive>
        <RouterView />
      </div>
    </div>


</template>
<script setup lang="ts">
import uploadNailVue from './layouts/viedoUpload/uploadNail.vue'
</script>
<style>
@import "@/views/client/styles/viedoUpload/viedoCreate.scss";
@import "@/styles/component/component.scss";
</style>