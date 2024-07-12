<template>
	<div class="slides-show" @mouseenter="pauseSlideshow" @mouseleave="startSlideshow">
		<div class="prev-btn chable-btn" @click="prevSlide()" v-show="ishover">
			<svg
              t="1713511459069"
              class="icon arrowIcon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1000"
              width="60"
              height="60"
            >
              <path
                d="M262.144 405.504l255.68-170.432a128 128 0 0 1 198.976 106.496v340.864a128 128 0 0 1-199.008 106.496l-255.648-170.432a128 128 0 0 1 0-212.992z"
                p-id="1001"
                fill="#ffffff"
              ></path>
            </svg>
		</div>
		<div class="next-btn chable-btn" @click="nextSlider()" v-show="ishover">
			<svg
              t="1713512108616"
              class="icon arrowIcon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1039"
              width="60"
              height="60"
            >
              <path
                d="M761.856 405.504l-255.68-170.432A128 128 0 0 0 307.2 341.568v340.864a128 128 0 0 0 199.008 106.496l255.648-170.432a128 128 0 0 0 0-212.992z"
                p-id="1040"
                fill="#ffffff"
              ></path>
            </svg>
		</div>
		<ul>
			<transition name="fade" mode="out-in">
				<img :src="slides[index].img" :key="slides[index].img" alt="carousel image" />
			</transition>
		</ul>
	</div>
</template>

<script lang="ts">
export default {}
</script>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
let setTime = ref<any>(null)
let index = ref(0)
let ishover=ref<boolean>(false);
const slides = ref([
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
])
const nextSlider = () => {
	index.value = (index.value + 1) % 5
}
const prevSlide = () => {
	if ((index.value = 0)) {
		index.value = 4
	} else {
		index.value = (index.value - 1) % 5
	}
}

const startSlideshow = () => {
	ishover.value=false;
	if (!setTime.value) {
		setTime.value = setInterval(nextSlider, 3000)
	}
}
const pauseSlideshow = () => {
	ishover.value=true;
	clearInterval(setTime.value)
	setTime.value = null
}

onMounted(() => {
	startSlideshow()
})
onBeforeUnmount(() => {
	pauseSlideshow()
})
</script>

<style lang="scss" scoped>
.slides-show {
	width: 420px;
	height: 280px;
	overflow: hidden;
	border-radius: 3px;
	cursor: pointer;
	position: relative;
	ul {
		padding: 0;
		height: 100%;
		display: flex;
	}
	transition {
		padding: 0;
		min-width: 420px;
		height: 100%;
		display: block;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			position: absolute;
			border-radius: 3px;
			top: 0;
			left: 0;
		}
	}
	.chable-btn{
		width: 50px;
		height: 50px;
		position: absolute;
		top: 50%;
		margin-top: -25px;
		opacity: 0.9;
		svg{
			width: 100%;
			height: 100%;
		}
	}
	.prev-btn{
		left: 3px;
	}
	.next-btn{
		right: 3px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	opacity: 0;
}
</style>