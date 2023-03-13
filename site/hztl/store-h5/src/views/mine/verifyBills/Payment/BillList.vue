<template>
	<div>
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
					<div style="display: flex; justify-content: space-between; padding: 0 9.6px;">
						<div>
							<div v-if="item.remoteOrderNo" class="bill-no text-font-default">
								({{ item.remoteOrderNo }})
							</div>
							<div
								:class="item.remoteOrderNo ? 'text-font-default' : 'bill-no text-font-default'"
								style="padding-left: 9.6px; text-align: left"
							>
								{{ item.billPurchaseNo }}
							</div>
						</div>
						
						<div :class="item.settleStatus === '已结' ? 'text-font-info' : 'text-font-danger'">
							<i v-show="item.settleStatus" class="cricle-dot" />
							{{ item.settleStatus }}
						</div>
					</div>
					<div style="display: flex; justify-content: space-between; padding: 0 9.6px;">
						<div style="display: flex;">
							<div>
								<span class="text-font-default-light">{{ item.settleType }}：</span>
								<span class="text-font-default">{{ item.arrear }}</span>
							</div>
							<div>
								<span class="text-font-default-light" style="margin-left: 20px;">未结：</span>
								<span class="text-font-default">{{ item.noSettleCurr }}</span>
							</div>
						</div>
						<div class="text-font-default" style="text-align: right;">
							{{ dateYmd(item.createDate) }}
						</div>
					</div>
				</van-cell-group>
			</van-list>
		</div>
		<div class="total-container">
			<div>合计</div>
			<div v-show="sumReceCurr" class="text-font-default-light" style="margin-left: 10px;">
				应收未结：
			</div>
			<div v-show="sumReceCurr" class="text-font-danger">
				{{ sumReceCurr }}
			</div>
			<div v-show="sumPayCurr" class="text-font-default-light" style="margin-left: 10px;">
				应付未结：
			</div>
			<div v-show="sumPayCurr" class="text-font-danger">
				{{ sumPayCurr }}
			</div>
		</div>
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
		searchData: null
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
					this.page = 1;
					this.list = [];
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
				url: "/receive-pay/list",
				params: { ...this.searchData, page: this.page, pageSize: PAGE_SIZE }
			})
				.then(data => {
					this.sumReceCurr = data.sumReceCurr;
					this.sumPayCurr = data.sumPayCurr;
					this.list = data.rows && data.rows.length ? [...this.list, ...data.rows] : [];
					if (this.list.length >= data.totalSize) {
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
		},
		resetHandle() {
			// 父组件调用
			this.page = 0;
			this.sumReceCurr = "";
			this.sumPayCurr = "";
			this.list = [];
			this.loading = false;
			this.finished = true;
			this.error = false;
		}
	}
}
</script>

<style lang="less" scoped>
.list-container {
	height: calc(100vh - 190px);
	margin: 0 15.3px;
	text-align: center;
	overflow-y: auto;
	background: #F8F8F8;
}
.bill-no {
	position: relative;
	padding-left: 10px;
	font-weight: 500;
	text-align: left;
	&::before {
		content: '';
		position: absolute;
		display: inline-block;
		left: 0;
		bottom: 7px;
		height: 10px;
		width: 4px;
		background: #1989fa;
	}
}
.cricle-dot {
	display: inline-block;
	height: 4px;
	width: 4px;
	vertical-align: middle;
	border-radius: 100%;
}
.total-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	padding: 10px;
	font-size: 14px;
	background: #fff;
}
.text-font-info {
	color: #1989fa;

	.cricle-dot {
		background-color: #1989fa;
	}
}
.text-font-danger {
	color: #ee0a24;

	.cricle-dot {
		background-color: #ee0a24;
	}
}
.text-font-default {
	color: #323233;
}
.text-font-default-light {
	color: #969799;
}
</style>