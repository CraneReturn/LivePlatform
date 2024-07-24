<template>
	<div class="video-max">
		<div class="video-home">
			<div class="video-top">
				<Slideshow />
				<video-list />
			</div>
			<video-classify />
			<video-Main />
		</div>
	</div>
</template>

<script lang="ts" setup>
import Slideshow from './layouts/video/Slideshow.vue'
import videoList from './layouts/video/videoList.vue'
import videoClassify from './layouts/video/videoClassify.vue'
import videoMain from './layouts/video/videoMain.vue'
</script>

<style lang="scss" scoped>
.video-max {
	background-color: #f4f5f8;
	width: 100%;
	padding: 20px 0;
	.video-home {
		width: 1200px;
		margin: 0 auto;
		.video-top {
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>