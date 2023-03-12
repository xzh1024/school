<template>
	<div class="list-container">
		<van-list
			v-model="loading"
			:finished="finished"
			:error.sync="error"
			finished-text="没有更多了"
			error-text="请求失败，点击重新加载"
			@load="loadData"
		>
			<van-cell-group
				v-for="(item, index) in list"
				:key="index"
				style="margin-top: 10px; padding: 9.6px 0;line-height: 23px; font-size: 14px; border-radius: 4px;"
			>
				<div class="bill-no text-font-default" style="text-align: left;">
					结算单号：{{ item.settlePurchaseNo }}
				</div>
				<div
					class="text-font-default"
					style="display: flex;padding-left: 9.6px; text-align: left;"
				>
					<div>
						业务单号：
					</div>
					<div>
						{{ item.remoteOrderNo ? `(${item.remoteOrderNo})` : "" }}<br v-if="item.remoteOrderNo" />{{ item.billPurchaseNo }}
					</div>
				</div>
				<div style="display: flex; justify-content: space-between; padding: 0 9.6px;">
					<div>
						<span v-show="item.settleCurr" class="text-font-default-light">支付金额：</span>
						<span class="text-font-default">{{ item.settleCurr }}</span>
					</div>
					<div class="text-font-default" style="text-align: right;">
						{{ dateYmd(item.settleDate) }}
					</div>
				</div>
			</van-cell-group>
		</van-list>
	</div>
</template>

<script>
import Vue from "vue";
import { Toast, List, CellGroup } from "vant";
import request from "@/request";
import dateFormat from "@/utils/date";

Vue.use(List).use(CellGroup);

const PAGE_SIZE = 20;

export default {
	name: "BillList",
	props: {
		searchData: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			page: 0,
			sumReceCurr: "",
			sumPayCurr: "",
			list: [],
			loading: false,
			finished: true,
			error: false
		};
	},
	watch: {
		searchData: {
			handler(value) {
				if (value) {
					this.list = [];
					this.page = 1;
					this.finished = false;
					this.loadData();
				}
			},
			deep: true
		}
	},
	methods: {
		loadData() {
			if (!this.page || this.finished) {
				return;
			}
			this.loading = true;
			request({
				url: "/receive-pay/list/settle",
				params: { ...this.searchData, page: this.page, pageSize: PAGE_SIZE }
			})
				.then(res => {
					this.sumReceCurr = res.sumReceCurr;
					this.sumPayCurr = res.sumPayCurr;
					this.list = res.rows && res.rows.length ? [...this.list, ...res.rows] : [];
					if (this.list.length >= res.totalSize) {
						this.finished = true;
					}
					this.loading = false;
					this.error = false;
					this.page++;
				})
				.catch(err => {
					this.loading = false;
					this.error = true;
					if(err && err.message) {
						Toast.fail(err.message);
					}
				})
		},
		dateYmd(date) {
			return dateFormat.dateYmd(date);
		}
	}
}
</script>

<style lang="less" scoped>
.list-container {
	height: calc(100vh - 110px);
	margin: 0 15.3px;
	text-align: center;
	overflow-y: auto;
}
.bill-no {
	position: relative;
	padding-left: 19.6px;
	font-weight: 500;
	&::before {
		content: '';
		position: absolute;
		display: inline-block;
		left: 9.6px;
		bottom: 7px;
		height: 10px;
		width: 4px;
		background: #1989fa;
	}
}
.total-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	margin: 10px;
	font-size: 14px;
}
.text-font-info {
	color: #1989fa;
}
.text-font-danger {
	color: #ee0a24;
}
.text-font-default {
	color: #323233;
}
.text-font-default-light {
	color: #969799;
}
</style>