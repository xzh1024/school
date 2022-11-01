<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		props: {
			url: String
		},
		data() {
			return {
				// url: ''
			}
		},
		onLoad(options) {
			console.log(this.url);
			console.log(options);
			// this.url = decodeURI(options.url);
		},
		methods: {

		}
	}
</script>

<style>

</style>
