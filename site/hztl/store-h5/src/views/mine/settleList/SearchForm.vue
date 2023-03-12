<template>
	<div>
		<van-search
			v-model="settlePurchaseNo"
			show-action
			shape="round"
			left-icon=""
			placeholder="请输入结算单号"
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
				<div class="item-title">业务单号</div>
				<van-search
					v-model="formData.statementPurchaseNo"
					clearable
					shape="round"
					left-icon=""
					style="margin-top: 10px; padding: 0;"
					placeholder="请输入业务单号"
				/>

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
						style="padding: 0;"
						@click="showDataPicker = true"
					/>
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
import { Search, Popup, Calendar, Button } from "vant";
import dateFormat from "@/utils/date";

Vue.use(Search).use(Popup).use(Calendar).use(Button);

const defaultFormData = {
	statementPurchaseNo: "",
	startDate: "",
	endDate: ""
}

export default {
  name: "SearchForm",
  data() {
	  return {
			searchData: { ...defaultFormData },
			settlePurchaseNo: "",
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
			this.$emit("search", { ...this.searchData, settlePurchaseNo: this.settlePurchaseNo });
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
	background-image: url('../../../assets/icon-serch.png');
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
	margin-top: 10px;
	position: relative;

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