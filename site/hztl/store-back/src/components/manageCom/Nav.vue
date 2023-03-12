<template>
	<div class="main_nav_menu" style="width: 100%">
		<div class="menu_top_box">
			<div class="menu_title" v-if="!isCollapse">我的店铺</div>
			<div
				class="is_collapse"
				v-if="isCollapse"
				@click="isCollapseChange"
			>
				<i class="icon-outdent2"></i>
			</div>
			<div class="is_collapse" v-else @click="isCollapseChange">
				<i class="icon-outdent"></i>
			</div>
		</div>
		<el-menu
			unique-opened
			router
			@select="seclectFn"
			:collapse="isCollapse"
			style="height: calc(100vh - 60px); overflow: auto"
			:default-active="$route.path.replace(/(.*\/.*)\/.*/, '$1')"
		>
			<NavItem v-for="item in navList" :key="item.path" :item="item" />
		</el-menu>
	</div>
</template>

<script>
import NavItem from './NavItem'
import routers from '@/router/routers'
import basicRouter from '@/router/basicRouter'
export default {
	name: 'Nav',
	components: {
		NavItem
	},
	data() {
		return {
			isCollapse: false,
			// navList:[...routers]
		}
	},
	computed: {
		navList() {
			let version = this.$store.state.version;
			return version == '标准版' ? [...basicRouter] : [...routers];
		}
	},
	methods: {
		initData() {
			let navList = this.$router.options.routes;
			for (let k of navList) {
				if (k.path == '/manageCenter') {
					this.navList = k.children;
				}
			}
		},
		seclectFn(val) {
			sessionStorage.setItem('oldPath', val);
		},
		isCollapseChange() {
			this.isCollapse = !this.isCollapse;
		}
	}
}
</script>

<style lang="less" >
.main_nav_menu {
	.menu_top_box {
		background: #262626;
		color: #fff;
		display: flex;
		height: 59px;
		justify-content: space-between;
		align-items: center;
		// padding: 15px 24px;
		border-bottom: 1px solid #262626;
		border-right: 1px solid #e6e6e6;
		box-sizing: border-box;
		.menu_title {
			text-align: left;
			font-size: 18px;
			padding-left: 7px;
			// width: 164px;
		}
		.is_collapse {
			padding: 10px 20px;
			cursor: pointer;
			i {
				font-size: 20px;
				color: #fff;
			}
		}
	}

	.el-submenu .el-menu-item {
		background-color: #141414;
		padding: 0 20px 0 40px;
		color: #e0e0e0;
		font-size: 14px;
		i {
			color: #e0e0e0;
		}
	}

	.el-menu {
		background: #262626;
		li {
			text-align: left;
		}
	}
	.el-submenu__title,
	.el-menu-item {
		color: #e0e0e0;
		height: 48px;
		line-height: 48px;
		i {
			font-size: 20px;
			color: #e0e0e0;
		}
	}

	.el-submenu__title:hover,
	.el-menu-item:hover,
	.el-menu-item.is-active:hover {
		background-color: #6589f8;
		color: #ffffff;
		i {
			color: #ffffff;
		}
	}
	.el-menu-item.is-active {
		color: #6589f8;
		i {
			color: #6589f8;
		}
	}
	.el-menu--collapse .el-menu-item .el-submenu__icon-arrow,
	.el-menu--collapse .el-submenu .el-submenu__title .el-submenu__icon-arrow {
		display: none !important;
	}
	.el-menu--collapse .el-menu-item span,
	.el-menu--collapse .el-submenu .el-submenu__title span {
		height: 0;
		width: 0;
		overflow: hidden;
		visibility: hidden;
		display: inline-block;
	}
}
</style>
