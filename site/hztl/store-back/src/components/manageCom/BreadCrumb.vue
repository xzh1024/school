<template>
	<div class="breadcrumb">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<template v-for="v in $route.matched">
				<el-breadcrumb-item :to="v.path" :key="v.path">{{
					v.name
				}}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: "BreadCrumb",
	data() {
		return {
			lists: []
		}
	},
	created() {
		this.initData();
	},
	// watch:{
	//     '$route'(){
	//         this.initData();
	//     }
	// },
	methods: {
		initData() {
			let route = this.$route;
			if (route.name == '查件设置') {
				this.lists = [
					{ name: '客户', isClick: false, path: '/customer' },
					{ name: '客户查询', isClick: true, path: '/customerQuery' },
					{ name: '查件设置', isClick: false, path: '/pollablePartsSetting' }
				]
			} else if (route.name == '客户资料') {
				this.lists = [
					{ name: '客户', isClick: false, path: '/customer' },
					{ name: '客户查询', isClick: true, path: '/customerQuery' },
					{ name: '客户资料', isClick: false, path: '/customerInfo' }
				]
			} else if (route.name == '商品编辑') {
				this.lists = [
					{ name: '商品', isClick: false, path: '/goods' },
					{ name: '商品管理', isClick: true, path: '/goodsManage' },
					{ name: '商品编辑', isClick: false, path: '/goodsEdit' }
				]
			} else if (route.name == '初始化指引') {
				this.lists = [
					{ name: '初始化指引', isClick: false, path: '/initGuide' }
				]
			} else if (route.name == '新建会员卡') {
				this.lists = [
					{ name: '客户', isClick: false, path: '/customer' },
					{ name: '会员卡', isClick: true, path: '/vipCard?tabName=VipCardType' },
					{ name: '新建会员卡', isClick: false, path: '/vipCard/add' }
				]
			} else if (route.name == '编辑会员卡') {
				this.lists = [
					{ name: '客户', isClick: false, path: '/customer' },
					{ name: '会员卡', isClick: true, path: '/vipCard?tabName=VipCardType' },
					{ name: '编辑会员卡', isClick: false, path: '/vipCard/edit' }
				]
			} else {
				this.lists = this.$route.matched;
			}
		}
	}
}
</script>

<style lang="less" scoped>
.breadcrumb {
	padding: 10px;
	/deep/.el-breadcrumb__inner.is-link {
		color: @text-color-hint;
	}
	/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
		color: @text-color-base;
	}
}
</style>
