<template>
    
    <router-view></router-view>
    <router-link to="/" v-if="isUser"></router-link>
    <router-link to="/admin" v-if="isAdmin"></router-link>
</template>


<script setup lang="ts">
import { ref } from 'vue';

    const isUser = ref(false);
    const isAdmin = ref(true);

</script>
<style scoped>

</style>
