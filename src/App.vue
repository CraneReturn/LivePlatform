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
<<<<<<< HEAD
<style scoped>

</style>
=======
>>>>>>> bc1029e9136e94f553e3fec7d21a4556ecca5087
