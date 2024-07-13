<template>
	<div class="video-classify">
		<div class="category-item" v-for="(cat, index) in category" :key="index" :class="{ subNohead: index != 0 }">
			<div class="category-name">
				<svg t="1720872373629" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6500" width="200" height="200"><path d="M842.439 924.929H179.883c-42.117 0-76.381-34.265-76.381-76.382V185.991c0-42.117 34.265-76.381 76.381-76.381h662.556c42.118 0 76.382 34.265 76.382 76.381v662.556c0 42.117-34.263 76.382-76.382 76.382zM179.883 151.946c-18.772 0-34.045 15.273-34.045 34.045v662.556c0 18.772 15.273 34.045 34.045 34.045h662.556c18.772 0 34.045-15.272 34.045-34.045V185.991c0-18.772-15.272-34.045-34.045-34.045H179.883z" fill="#808080" p-id="6501"></path><path d="M893.868 364.504H734.864c-11.691 0-21.169-9.477-21.169-21.168 0-11.691 9.478-21.168 21.169-21.168h159.004c11.69 0 21.168 9.478 21.168 21.168 0 11.691-9.477 21.168-21.168 21.168zM893.868 482.291H734.864c-11.691 0-21.169-9.477-21.169-21.168 0-11.691 9.478-21.168 21.169-21.168h159.004c11.69 0 21.168 9.477 21.168 21.168 0 11.691-9.477 21.168-21.168 21.168zM893.868 600.079H734.864c-11.691 0-21.169-9.478-21.169-21.168 0-11.691 9.478-21.169 21.169-21.169h159.004c11.69 0 21.168 9.478 21.168 21.169s-9.477 21.168-21.168 21.168zM893.868 717.866H734.864c-11.691 0-21.169-9.478-21.169-21.169 0-11.69 9.478-21.168 21.169-21.168h159.004c11.69 0 21.168 9.478 21.168 21.168 0 11.692-9.477 21.169-21.168 21.169z" fill="#808080" p-id="6502"></path><path d="M364.536 775.863a21.172 21.172 0 0 1-21.168-21.169V405.528c0-7.671 4.15-14.743 10.849-18.482a21.165 21.165 0 0 1 21.426 0.462l283.261 174.583a21.169 21.169 0 0 1-0.001 36.042l-283.26 174.583a21.156 21.156 0 0 1-11.107 3.147z m21.169-332.422v273.34l221.747-136.669-221.747-136.671z" fill="#33DEB4" opacity=".4" p-id="6503"></path><path d="M298.28 715.128a21.17 21.17 0 0 1-21.168-21.168V344.794a21.168 21.168 0 1 1 32.275-18.02l283.26 174.583a21.168 21.168 0 0 1-0.001 36.042L309.387 711.98a21.148 21.148 0 0 1-11.107 3.148z m21.169-332.421v273.34l221.746-136.67-221.746-136.67z" fill="#33DEB4" p-id="6504"></path></svg>
				<div class="cat-tit">{{ cat.name }}</div>
			</div>
			<div class="sub-list">
				<div class="sub-item" v-for="(sub, index) in cat.subs" :key="index">
					{{ sub }}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
const category = ref([
	{
		name: '影视',
		subs: ['影视解说', '预告咨询', '影视剪辑', '纪录片', '短片', '短剧'],
	},
	{ name: '美食', subs: ['厨艺教程', '田园美食', '吃播', '探店', '测评'] },
	{
		name: '搞笑',
		subs: [
			'相声小品',
			'恶搞',
			'鬼畜',
			'吐槽',
			'逗比',
			'挑战',
			'奇葩',
			'表演',
		],
	},
	{
		name: '音乐',
		subs: ['原创音乐', '演奏', '音乐现场', '翻唱', 'mv', '说唱'],
	},
])
</script>

<style lang="scss" scoped>
.video-classify {
	margin: 20px 0;
	border-radius: 4px;
	background-color: #fff;
	padding: 20px 20px 10px 20px;
	display: flex;
	.category-item {
		.category-name {
			display: flex;
			align-items: center;
			text-align: center;
			margin-bottom: 10px;
			svg {
				height: 20px;
				width: 20px;
				margin-right: 5px;
			}
            .cat-tit{
                cursor: pointer;
            }
		}
		.sub-list {
			display: flex;
			flex-wrap: wrap;
			width: 280px;
			.sub-item {
				margin-right: 30px;
                cursor: pointer;
				margin-bottom: 5px;
			}
		}
        .cat-tit:hover,.sub-item:hover{
            color: rgb(70, 206, 145);
        }
	}
    .subNohead {
		border-left: 1px solid #e9e9e9;
		padding-left: 20px;
	}
}
</style>