<template>
	<div class="vip-card">
		<el-tabs type="card" v-model="activeTab" @tab-click="changeTab">
			<el-tab-pane
				v-for="(tab, index) in tabs"
				:key="index"
				:label="tab.name"
				:name="tab.id"
			>
				<components
					v-if="activeTab === tab.id"
					:is="tab.id"
					@tabChange="handlerTabChange"
				/>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import VipCardManage from "./manage/index.vue";
import VipCardLog from "./log/index.vue";
import VipCardType from "./type/index.vue";
import { TabChangeMixin } from "@/mixins/tabChangeMixin.js";

export default {
	mixins: [TabChangeMixin],
	name: "VipCard",
	components: {
		VipCardManage,
		VipCardLog,
		VipCardType
	},
	data() {
		return {
			activeTab: "VipCardManage",
			defaultTab: "VipCardManage",
			tabs: [
				{ id: "VipCardManage", name: "会员卡管理" },
				{ id: "VipCardLog", name: "会员卡日志" },
				{ id: "VipCardType", name: "会员卡种" }
			]
		};
	},
	methods: {
		handlerTabChange(tabName) {
			this.activeTab = tabName;
		}
	}
};
</script>

<style lang="less" scoped>
.vip-card {
	height: 100%;
	.el-tabs {
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		/deep/ .el-tabs__header {
			margin: 0;
		}
		/deep/ .el-tabs__content {
			flex: 1;
			padding: @padding-size-main;
			.el-tab-pane {
				height: 100%;
			}
		}
	}
}
</style>
