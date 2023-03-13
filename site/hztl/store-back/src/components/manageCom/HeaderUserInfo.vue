<template>
	<div class="userinfo_box">
		<!-- <div class="menu_index" @click="toPathHome">首页</div> -->
		<!-- <i class="el-icon-chat-dot-round user_bell" ></i> -->
		<!-- <el-badge is-dot class="item user_bell"><i class="el-icon-bell"></i></el-badge> -->
		<el-avatar
			:src="userInfo.img"
			v-if="userInfo.img"
			:size="32"
		></el-avatar>
		<el-avatar icon="icon-User" v-else :size="32"></el-avatar>

		<el-dropdown
			trigger="click"
			@command="handleCommand"
			style="margin-left: 10px; cursor: pointer"
		>
			<span class="el-dropdown-link">
				{{ userInfo.name
				}}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item icon="icon-Setting" command="versionSet"
					>版本设置</el-dropdown-item
				>
				<!-- <el-dropdown-item icon="el-icon-setting"  command="setting">账号设置</el-dropdown-item> -->
				<el-dropdown-item icon="el-icon-guide" command="initGuide"
					>初始化指引</el-dropdown-item
				>
				<!-- <el-dropdown-item icon="el-icon-switch-button logo_out"  command="out">退出</el-dropdown-item> -->
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
import { loginOut } from "@/api/login"
export default {
	name: "headerUserinfo",
	computed: {
		userInfo() {
			return this.$store.state.base;
		}
	},
	methods: {
		toPathHome() {
			this.$router.push('/home');
		},
		loginOut() {
			loginOut().then(() => {
				sessionStorage.removeItem('customerQueryObj');
				sessionStorage.removeItem('userInfo');
				sessionStorage.removeItem('erpType');
				sessionStorage.removeItem("Token");
				// this.$router.push('/login');
			});

		},
		handleCommand(command) {
			if (command == "versionSet") {
				this.$emit('onVersionSet', true);
			}
			if (command == "initGuide") {
				this.$router.push('/workbench/initGuide');
			}
			if (command == "out") {
				this.loginOut();
			}
			if (command == "setting") {
				// this.loginOut();
			}
		}
	}
}
</script>

<style lang="less" scoped>
.userinfo_box {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 10px;

	.menu_index {
		margin-right: 20px;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #333333;
		line-height: 24px;
		font-weight: 400;
	}
	.menu_index:hover {
		cursor: pointer;
		color: #6589f8;
	}
	.user_bell {
		margin-right: 24px;
		font-size: 24px;
		cursor: pointer;
	}
	.el-dropdown {
		color: #333333;
		font-size: 16px;
	}
	/deep/.el-avatar--icon {
		i {
			font-size: 24px;
		}
	}
	.el-dropdown-menu__item i {
		font-size: 16px;
	}
}
</style>
