<template>
  
</template>

<script lang="ts">
export default {}
</script>
<script setup lang="ts">
import { ref,defineEmits} from 'vue';
const emit = defineEmits(['update']);
const sendDataToParent = () => {
    emit('update', 2 );
}
sendDataToParent()
</script>

<style lang="scss" scoped>

</style>