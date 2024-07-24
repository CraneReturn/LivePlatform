<template>
	<div class="search-max">
		<div class="search">
			<ul class="search-nav">
                <router-link to="integrated">
					<li :class="{ iselect: iselect == 1 }">综合</li>
				</router-link>
                <router-link to="video">
					<li :class="{ iselect: iselect == 2 }">视频</li>
				</router-link>
                <router-link to="live">
					<li :class="{ iselect: iselect == 3 }">直播</li>
				</router-link>
				<router-link to="user">
					<li :class="{ iselect: iselect == 4 }">用户</li>
				</router-link>
			</ul>
			<div class="result-num">共找到相关内容<span>{{count}}</span>个</div>
			 <router-view @update="handleUpdate"></router-view>
		</div>
	</div>
</template>

<script lang="ts">
export default {}
</script>
<script setup lang="ts">
import {ref} from 'vue'
const iselect = ref(1);
const count = ref(3000);
const handleUpdate = (data: number,ll: number) => {
  iselect.value = data;
  count.value = ll;
}
</script>

<style lang="scss" scoped>
@import '@/views/client/styles/search/search.scss';
</style>