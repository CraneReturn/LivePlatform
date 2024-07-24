<template>
	<div class="search-main">
		<div class="search-up">
			<div class="list-header">
				<span>相关用户</span>
                <router-link to="user" class="hd-right">
					 查看全部
					<svg t="1721719565329" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4287" width="200" height="200"><path d="M660.21 512c0 10.34-3.95 20.68-11.84 28.58L432.79 756.16c-15.78 15.79-41.38 15.79-57.16 0-15.79-15.79-15.79-41.37 0-57.16l187-187-187-187c-15.79-15.79-15.79-41.37 0-57.16 15.78-15.79 41.38-15.79 57.16 0l215.58 215.58A40.323 40.323 0 0 1 660.21 512z" p-id="4288"></path></svg>
				</router-link>
			</div>
			<div class="up-list">
				<div class="up-item" v-for="(video, index) in 5" :key="index">
					<div class="up-avatar">
						<img src="@/assets/images/userPhoto/userphotojpg.jpg" alt="" />
					</div>
					<div class="up-name">111111</div>
					<div class="up-fans">1234粉丝</div>
				</div>
			</div>
		</div>
		<div class="search-live">
			<div class="list-header">
				<span>相关直播</span>
				<router-link to="live" class="hd-right">
					 查看全部
					<svg t="1721719565329" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4287" width="200" height="200"><path d="M660.21 512c0 10.34-3.95 20.68-11.84 28.58L432.79 756.16c-15.78 15.79-41.38 15.79-57.16 0-15.79-15.79-15.79-41.37 0-57.16l187-187-187-187c-15.79-15.79-15.79-41.37 0-57.16 15.78-15.79 41.38-15.79 57.16 0l215.58 215.58A40.323 40.323 0 0 1 660.21 512z" p-id="4288"></path></svg>
				</router-link>
			</div>
		</div>
		<div class="search-video">
			<div class="list-header">
				<span>相关视频</span>
				<router-link to="video" class="hd-right">
					 查看全部
					<svg t="1721719565329" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4287" width="200" height="200"><path d="M660.21 512c0 10.34-3.95 20.68-11.84 28.58L432.79 756.16c-15.78 15.79-41.38 15.79-57.16 0-15.79-15.79-15.79-41.37 0-57.16l187-187-187-187c-15.79-15.79-15.79-41.37 0-57.16 15.78-15.79 41.38-15.79 57.16 0l215.58 215.58A40.323 40.323 0 0 1 660.21 512z" p-id="4288"></path></svg>
				</router-link>
			</div>
			<div class="video-list">
				<li class="video-item" v-for="(video, index) in videos" :key="index">
					<div class="video-detail">
						<img class="video-img" :src="video.img" alt="" />
						<div class="video-infor">
							<div class="view-counts">
								<svg t="1720860806083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5386" width="200" height="200"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM456.704 305.92C432.704 289.152 405.333333 303.082667 405.333333 331.797333v360.533334c0 28.586667 27.541333 42.538667 51.370667 25.856l252.352-176.768c21.76-15.253333 21.632-43.541333 0-58.709334l-252.373333-176.768z m-8.597333 366.72V351.466667l229.269333 160.597333-229.269333 160.597333z" fill="#ffffff" p-id="5387"></path></svg>    
								2.1万
							</div>
							<span class="video-time"> 11:12 </span>
						</div>
						<div class="video-cover">
							<img src="@/assets/images/video/播放.png" alt="" />
						</div>
					</div>
					<div class="video-title">
						断魂针，绝情剑!《剑侠世界：起源》新门派古墓技能首曝
					</div>
					<div class="video-author">
						<svg t="1720860479192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4275" width="200" height="200"><path d="M510.548 105.582c-129.797 0-235.386 105.593-235.386 235.39 0 93.999 55.509 175.067 135.354 212.767-147.613 43.35-255.793 179.825-255.793 341.273 0 10.275 8.327 18.594 18.594 18.594 10.267 0 18.594-8.319 18.594-18.594 0-175.702 142.956-318.65 318.636-318.65 129.797 0 235.395-105.593 235.395-235.39s-105.598-235.39-235.395-235.39z m0 433.591c-109.294 0-198.197-88.917-198.197-198.202 0-109.29 88.903-198.202 198.197-198.202 109.298 0 198.206 88.912 198.206 198.202 0 109.29-88.903 198.202-198.206 198.202z m0 0z m215.838 72.907c-8.175-6.229-19.83-4.686-26.057 3.487-6.245 8.17-4.686 19.826 3.484 26.074 79.681 60.886 125.367 153.241 125.367 253.366 0 10.279 8.332 18.598 18.595 18.598 10.275 0 18.594-8.319 18.594-18.598 0-111.818-51.024-214.941-139.984-282.927z m0 0z" p-id="4276"></path></svg>    
						<span>剑侠世界起源</span>
					</div>
				</li>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {}
</script>
<script setup lang="ts">
import { ref,defineEmits} from 'vue';
const emit = defineEmits(['update']);
const count = ref(3000);
const sendDataToParent = () => {
    emit('update', 1 , count.value );
}
sendDataToParent()
const videos = ref([
	{
		img: 'https://img1.baidu.com/it/u=3303672271,880595832&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713632400&t=9668270f3ad056bb44d577e0d1d78a00',
	},
	{
		img: 'https://img2.baidu.com/it/u=4067814844,4223671934&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500',
	},
	{
		img: '	https://img2.baidu.com/it/u=1892451883,89205910&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=300',
	},
	{
		img: 'https://img2.baidu.com/it/u=1892451883,89205910&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=300',
	},
	{
		img: 'https://img2.baidu.com/it/u=4042138618,4130225644&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
	},
	{
		img: 'https://img1.baidu.com/it/u=3303672271,880595832&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713632400&t=9668270f3ad056bb44d577e0d1d78a00',
	},
	{
		img: 'https://img2.baidu.com/it/u=4067814844,4223671934&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500',
	},
	{
		img: '	https://img2.baidu.com/it/u=1892451883,89205910&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=300',
	},
])
</script>

<style lang="scss" scoped>
@import '@/views/client/styles/search/integrated.scss';
</style>