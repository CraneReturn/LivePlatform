<script setup lang="ts">
import NailTop from "./components/layout/Nail/nailTop.vue";

</script>

<template>
    <router-view></router-view>
    <nail-top></nail-top>
</template>

<script lang="ts">
export default {
    name: "App",
};
</script>