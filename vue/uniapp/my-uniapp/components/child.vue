<template>
	<view @click="handleClick">
		<text class="red">我是组件</text>
		<view>{{msg}}</view>
	</view>
</template>

<script>
	export default {
		name: "child",
		props: {
			msg: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleClick() {
				this.$emit("childEvent", "蜡笔小新")
				uni.$emit("getInfo", '樱桃小丸子');
			}
		}
	}
</script>

<style scoped>
	.red {
		color: red;
	}
</style>
