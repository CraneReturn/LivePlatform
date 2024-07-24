<template>
	<div class="up-list">
		<div class="up-item" v-for="(video, index) in 13" :key="index">
			<div class="up-avatar">
				<img src="@/assets/images/userPhoto/userphotojpg.jpg" alt="" />
			</div>
			<div class="up-name">111111</div>
			<div class="up-fans">1234粉丝</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {}
</script>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['update'])
const count = ref(1000)
const sendDataToParent = () => {
	emit('update', 4, count.value)
}
sendDataToParent()
</script>

<style lang="scss" scoped>
@import '@/views/client/styles/search/user.scss';
</style>