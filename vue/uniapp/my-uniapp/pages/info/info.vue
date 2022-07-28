<template>
	<view>
		<text>详情</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			console.log(option);
			console.log(decodeURI(option.msg));
		},
		methods: {

		}
	}
</script>

<style>

</style>
