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
		onLoad() {
			// 判断平台
			// #ifdef H5
			alert('只有h5平台才有alert方法');
			// #endif
			console.log("非h5");
			
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					console.log('运行Android上');
					break;
				case 'ios':
					console.log('运行iOS上');
					break;
				default:
					console.log('运行在开发者工具上');
					break;
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
