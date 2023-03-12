<template>
	<div>
		<van-search
			v-model="purchaseNo"
			show-action
			shape="round"
			left-icon=""
			placeholder="请输入对账单号"
			@search="searchHandle"
		>
			<div slot="action" @click="onFilter">筛选</div>
			<div slot="right-icon" class="right-icon" @click="searchHandle" />
		</van-search>

		<van-popup
			v-model="showFilters"
			position="right"
			:style="{ height: '100%', width: 'calc(100% - 50px)' }"
		>
			<div class="item-container">
				<div class="item-title">对账状态</div>
				<tag-select v-model="formData.statementStatus" :options="STATUSES" />
			</div>

			<div class="btn-container">
				<van-button
					round
					plain
					type="info"
					class="btn-item"
					@click="resetHandle"
				>重置</van-button>
				<van-button
					round
					type="info"
					class="btn-item"
					style="margin-left: 10px;"
					@click="sureHandle"
				>确定</van-button>
			</div>
		</van-popup>
	</div>
</template>

<script>
import Vue from "vue";
import { Search, Popup, Button } from "vant";
import dateFormat from "@/utils/date";
import TagSelect from "@/components/common/TagSelect";

Vue.use(Search).use(Popup).use(Button);

const STATUSES = [
	{ text: "全部", value: 0 },
	{ text: "待确认", value: 1 },
	{ text: "待结算", value: 2 },
	{ text: "部分结算", value: 3 },
	{ text: "结算完成", value: 4 }
]
const defaultFormData = {
	statementStatus: 0
}
export default {
	name: "SearchForm",
	components: { TagSelect },
	data() {
		return {
			STATUSES,
			searchData: { ...defaultFormData },
			purchaseNo: "",
			showFilters: false,
			formData: { ...defaultFormData }
		};
	},
	mounted() {
		this.searchHandle();
	},
	methods: {
		onFilter() {
			this.formData = { ...this.searchData };
			this.showFilters = true;
		},
		sureHandle() {
			this.showFilters = false;
			this.searchData = { ...this.formData };
			this.searchHandle();
		},
		resetHandle() {
			this.formData = { ...defaultFormData };
			this.date = "";
		},
		searchHandle() {
			this.$emit("search", { ...this.searchData, purchaseNo: this.purchaseNo });
		},
	}
}
</script>

<style lang="less" scoped>
.right-icon {
	width: 17px;
	height: 17px;
	background-image: url('../../../../assets/icon-serch.png');
	background-repeat: no-repeat;
	background-size: 17px;
}
.item-container {
	padding: 10px 10px 0 10px;
	width: calc(100% - 20px);
	height: calc(100% - 80px);
	overflow: auto;
	text-align: left;

	.item-title {
		font-size: 18px;
	}
}
.btn-container {
	text-align: center;

	.btn-item {
		padding: 0 40px;
	}
}
</style>