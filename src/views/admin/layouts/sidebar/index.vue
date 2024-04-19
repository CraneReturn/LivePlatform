<template>
    <aside class="aside">
        <menu-item></menu-item>
    </aside>
</template>

<script lang="ts">
import MenuItem from "../../layouts/sidebar/components/menu-item.vue";
export default {
    name: 'AdminSidebar',
    components: {
        MenuItem
    }
}
</script>

<style lang="scss">
@import url('../../styles/sidebar/index.scss');
</style>