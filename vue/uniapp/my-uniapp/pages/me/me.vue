<template>
	<view>
		<text>我</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.$on('getInfo', (value) => {
				console.log('Me 页面中的全局事件被触发了');
				console.log(value);
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
