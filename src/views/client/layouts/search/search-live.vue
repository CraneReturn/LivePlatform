<template>
	<div class="live-list">
		<li class="live-item" v-for="(live, index) in lives" :key="index">
			<div class="live-detail">
				<img class="live-img" :src="live.img" alt="" />
				<div class="live-cover">
					<img src="@/assets/images/video/播放.png" alt="" />
				</div>
			</div>
			<div class="live-title">
				断魂针，绝情剑!《剑侠世界：起源》新门派古墓技能首曝
			</div>
            <div class="live-bottom">
                <div class="live-author">
				    <svg t="1720860479192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4275" width="200" height="200"><path d="M510.548 105.582c-129.797 0-235.386 105.593-235.386 235.39 0 93.999 55.509 175.067 135.354 212.767-147.613 43.35-255.793 179.825-255.793 341.273 0 10.275 8.327 18.594 18.594 18.594 10.267 0 18.594-8.319 18.594-18.594 0-175.702 142.956-318.65 318.636-318.65 129.797 0 235.395-105.593 235.395-235.39s-105.598-235.39-235.395-235.39z m0 433.591c-109.294 0-198.197-88.917-198.197-198.202 0-109.29 88.903-198.202 198.197-198.202 109.298 0 198.206 88.912 198.206 198.202 0 109.29-88.903 198.202-198.206 198.202z m0 0z m215.838 72.907c-8.175-6.229-19.83-4.686-26.057 3.487-6.245 8.17-4.686 19.826 3.484 26.074 79.681 60.886 125.367 153.241 125.367 253.366 0 10.279 8.332 18.598 18.595 18.598 10.275 0 18.594-8.319 18.594-18.598 0-111.818-51.024-214.941-139.984-282.927z m0 0z" p-id="4276"></path></svg>    
				    <span>剑侠世界起源</span>
			    </div>
                <div class="live-hot">
				    <svg t="1720860479192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4275" width="200" height="200"><path d="M510.548 105.582c-129.797 0-235.386 105.593-235.386 235.39 0 93.999 55.509 175.067 135.354 212.767-147.613 43.35-255.793 179.825-255.793 341.273 0 10.275 8.327 18.594 18.594 18.594 10.267 0 18.594-8.319 18.594-18.594 0-175.702 142.956-318.65 318.636-318.65 129.797 0 235.395-105.593 235.395-235.39s-105.598-235.39-235.395-235.39z m0 433.591c-109.294 0-198.197-88.917-198.197-198.202 0-109.29 88.903-198.202 198.197-198.202 109.298 0 198.206 88.912 198.206 198.202 0 109.29-88.903 198.202-198.206 198.202z m0 0z m215.838 72.907c-8.175-6.229-19.83-4.686-26.057 3.487-6.245 8.17-4.686 19.826 3.484 26.074 79.681 60.886 125.367 153.241 125.367 253.366 0 10.279 8.332 18.598 18.595 18.598 10.275 0 18.594-8.319 18.594-18.598 0-111.818-51.024-214.941-139.984-282.927z m0 0z" p-id="4276"></path></svg>    
				    <span>2.3万</span>
			    </div>
            </div>
		</li>
	</div>
</template>

<script lang="ts">
export default {}
</script>
<script setup lang="ts">
import { ref,defineEmits} from 'vue';
const emit = defineEmits(['update']);
const count = ref(800);
const sendDataToParent = () => {
    emit('update', 3 , count.value );
}
sendDataToParent()

const lives = ref([
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
@import '@/views/client/styles/search/live.scss';
</style>