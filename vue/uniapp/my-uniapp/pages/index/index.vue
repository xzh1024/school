<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<navigator url="/pages/404/404">404页面</navigator> -->

		<text>首页</text>
		<view>
			<navigator :url="'/pages/info/info?msg='+encodeURI('首页跳转')">详情</navigator>
			<!-- <navigator url="{{'/pages/info/info?msg='+encodeURI('首页跳转')}}">详情</navigator> -->
			<button @click="goInfo()">详情</button>
		</view>
		<navigator url="/subpages/news/news">新闻</navigator>
		<view>
			<navigator url="/subpages/chat/chat">前往聊天</navigator>
		</view>
		<child :msg="msg" @childEvent="sayHello"></Child>
	</view>
	</view>
</template>

<script>
	import Child from "@/components/child.vue"
	export default {
		components: {
			Child
		},
		data() {
			return {
				title: 'Hello',
				msg: '父组件传递的数据'
			}
		},
		onShow() {
			console.log('Index page show');
		},
		onLoad() {
			console.log(getCurrentPages())
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新了')
		},
		methods: {
			goInfo() {
				uni.navigateTo({
					url: "/pages/info/info?msg=" + encodeURI("首页跳转"),
				})
			},
			sayHello(msg) {
				this.msg = msg;
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
