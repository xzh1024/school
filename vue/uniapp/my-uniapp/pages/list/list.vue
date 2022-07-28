<template>
	<view>
		<text>通讯录</text>
		<view>{{userName}}</view>
		<view>
			<button type="default" @click="login('蜡笔小新')">登录</button>
			<button type="default" @click="logout">退出</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['userName']),
		},
		methods: {
			...mapActions(['login', 'logout'])
		}
	}
</script>

<style>

</style>
