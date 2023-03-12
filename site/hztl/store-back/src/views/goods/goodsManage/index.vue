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
import Parts from "./parts/index.vue";
import Project from "./project/index.vue";
import Package from "./package/index.vue";
import { TabChangeMixin } from "@/mixins/tabChangeMixin.js";

export default {
	mixins: [TabChangeMixin],
	components: {
		Parts,
		Project,
		Package
	},
	data() {
		return {
			activeTab: "Parts",
			defaultTab: "Parts",
			tabs: [
				{ id: "Parts", name: "零配件" },
				{ id: "Project", name: "服务项目" },
				{ id: "Package", name: "套餐" }
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
