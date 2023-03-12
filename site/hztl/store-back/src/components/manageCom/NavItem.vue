<template>
	<div class="aside-menu" v-if="!itemObj.isHide">
		<el-menu-item
			:index="itemObj.path"
			v-if="
				!itemObj.children ||
				(itemObj.children && itemObj.children.length === 1) ||
				(itemObj.meta && itemObj.meta.level)
			"
			:class="isActive(item.path, item.redirect) ? 'is-active' : ''"
		>
			<i
				v-if="itemObj.iCons"
				:class="itemObj.iCons"
				style="margin-right: 8px"
			></i>
			<span slot="title">{{ itemObj.name }}</span>
		</el-menu-item>
		<el-submenu :index="itemObj.path" v-else>
			<template slot="title">
				<i
					v-if="itemObj.iCons"
					:class="itemObj.iCons"
					style="margin-right: 8px"
				></i>
				<span>{{ itemObj.name }}</span>
			</template>
			<NavItem
				v-for="child in itemObj.children"
				:key="child.path"
				:item="child"
			/>
		</el-submenu>
	</div>
</template>

<script>
export default {
	name: 'NavItem',
	data() {
		return {

		}
	},
	props: ['item'],
	computed: {
		itemObj() {
			if (this.item.name == '库存分组') {//非M8账号不显示库存分组
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.item.isHide = this.$store.state.base.erp.hasM8 ? false : true;
			}
			return this.item;
		}
	},
	methods: {
		isActive(path, redirect) {
			return this.$route.path === path || this.$route.path === redirect;
		}
	},
}
</script>

<style lang="less" scoped>
.aside-menu {
	/deep/.el-submenu__icon-arrow {
		font-size: 12px;
	}
	/deep/.el-submenu .el-menu-item {
		min-width: 140px;
		max-width: 140px;
		padding: 0 24px !important;
	}
}
</style>
