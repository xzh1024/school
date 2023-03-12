<template>
	<div>
		<van-search
			v-model="purchaseNo"
			show-action
			shape="round"
			left-icon=""
			placeholder="请输入业务单号"
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
				<div class="item-title">结算类型</div>
				<tag-select v-model="formData.settleType" :options="SETTLE_TYPES" />

				<div class="item-title" style="margin-top: 30px;">
					结算状态
				</div>
				<tag-select v-model="formData.settleStatus" :options="SETTLE_STATUSES" />

				<div class="item-title" style="margin-top: 30px;">
					日期选择
				</div>
				<div class="date-container">
					<van-search
						:value="date"
						:clearable="false"
						shape="round"
						left-icon=""
						placeholder="请选择日期"
						style="margin-top: 6px; padding: 0;"
						@click="showDataPicker = true"
					>
						<van-dropdown-menu slot="label">
							<van-dropdown-item v-model="formData.dateType" :options="DATE_TYPS" />
						</van-dropdown-menu>
					</van-search>
					<i v-show="date" class="date-clear" @click="clearDate">x</i>
				</div>
				<van-calendar
					v-model="showDataPicker"
					type="range"
					allow-same-day
					:min-date="MIN_DATE"
					@confirm="onDateConfirm"
				/>
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
import {
	Search,
	Popup,
	DropdownMenu,
	DropdownItem,
	Calendar,
	Button
} from "vant";
import dateFormat from "@/utils/date";
import TagSelect from "@/components/common/TagSelect";

Vue.use(Search)
	.use(Popup)
	.use(DropdownMenu)
	.use(DropdownItem)
	.use(Calendar)
	.use(Button);

const SETTLE_TYPES = [
	{ text: "全部", value: 0 },
	{ text: "应收", value: 1 },
	{ text: "应付", value: 2 }
]
const SETTLE_STATUSES = [
	{ text: "全部", value: 0 },
	{ text: "已结", value: 1 },
	{ text: "对账待结", value: 2 },
	{ text: "未结", value: 3 }
]
const DATE_TYPS = [
	{ text: "下单日期", value: 0 },
	{ text: "结算日期", value: 1 }
]
const defaultFormData = {
	settleType: 0,
	settleStatus: 0,
	dateType: 0,
	startDate: "",
	endDate: ""
}

export default {
	name: "SearchForm",
	components: { TagSelect },
  data() {
	  return {
			SETTLE_TYPES,
			SETTLE_STATUSES,
			DATE_TYPS,
			searchData: { ...defaultFormData },
			purchaseNo: "",
			showFilters: false,
			formData: { ...defaultFormData },
			showDataPicker: false,
			date: "",
			MIN_DATE: new Date(1970, 1, 1)
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
		onDateConfirm(date) {
			const [start, end] = date;
			this.showDataPicker = false;
			this.date = `${dateFormat.dateYmd(start)} - ${dateFormat.dateYmd(end)}`;
			this.formData.startDate = dateFormat.dateYmd(start);
			this.formData.endDate = dateFormat.dateYmd(end);
		},
		clearDate() {
			this.date = "";
			this.formData.startDate = "";
			this.formData.endDate = "";
		}
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
.date-container {
	position: relative;
	
	/deep/ .van-dropdown-menu__bar {
		margin-top: 10px;
		margin-left: -15px;
		height: 1em;
		background: inherit;
		box-shadow: none;
	}
	/deep/ .van-dropdown-item__option {
		padding-left: 20px;
		padding-right: 20px;
	}

	.date-clear {
		position: absolute;
		top: 10px;
		right: 6px;
		display: block;
		padding-right: 1px;
		padding-bottom: 1px;
		width: 12px;
		height: 12px;
		line-height: 12px;
		text-align: center;
		font-size: 12px;
		border-radius: 100%;
		color: #ffffff;
		background: #00a8ea;
		cursor: pointer;
	}
}
.btn-container {
	text-align: center;

	.btn-item {
		padding: 0 40px;
	}
}
</style>