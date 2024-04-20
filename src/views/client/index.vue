<template>
    <NailTop />
    <CenterVideo />
    <RouterView />
</template>

<script lang="ts">

export default {
    components: {
        NailTop,
        CenterVideo
    },
};
</script>
<script lang="ts" setup>
import NailTop from './layouts/Nail/nailTop.vue';
import CenterVideo from './layouts/homePage/centerVideo.vue';
</script>
<style></style>
