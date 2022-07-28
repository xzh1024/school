<template>
	<view>
		<h1>当前页面不存在!</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			setTimeout(() => {
				// uni.navigateTo({
				// 	url: "/pages/index/index"
				// })
				// tabBar
				uni.switchTab({
					url: "/pages/index/index"
				})
			}, 3000)
		},
		methods: {

		}
	}
</script>

<style>

</style>
