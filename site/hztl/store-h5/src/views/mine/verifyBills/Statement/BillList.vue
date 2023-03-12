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
					@click="() => toStatementDetail(item)"
				>
					<div style="display: flex; justify-content: space-between; padding: 0 9.6px;">
						<div class="bill-no text-font-default">{{ item.purchaseNo }}</div>
						<div
							:class="item.statementStatus === '结算完成' ? 'text-font-info' : 'text-font-danger'"
						>
							<i v-show="item.statementStatus" class="cricle-dot" />
							{{ item.statementStatus }}
						</div>
					</div>
					<div style="text-align: left; padding: 0 9.6px;">
						<span class="text-font-default-light">入账周期：</span>
						<span class="text-font-default">{{ item.statementPeriod }}</span>
					</div>
					<div style="display: flex; justify-content: space-between; padding: 0 9.6px;">
						<div>
							<span class="text-font-default-light">应结：</span>
							<span class="text-font-default">{{ item.arrear }}</span>
						</div>
						<div>
							<span class="text-font-default-light">已结：</span>
							<span class="text-font-default">{{ item.settleCurr }}</span>
						</div>
						<div>
							<span class="text-font-default-light">未结：</span>
							<span class="text-font-default">{{ item.noSettleCurr }}</span>
						</div>
					</div>
					<div class="text-font-default" style="text-align: right; padding: 0 9.6px;">
						{{ dateFull(item.createDate) }}
					</div>
				</van-cell-group>
			</van-list>
		</div>
		<div class="total-container">
			<div>合计</div>
			<div v-show="sumNoSettleCurr" class="text-font-default-light" style="margin-left: 10px;">
				对账待结：
			</div>
			<div v-show="sumNoSettleCurr" class="text-font-danger">
				{{ sumNoSettleCurr }}
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
			sumNoSettleCurr: "",
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
				url: "/receive-pay/list/statement",
				params: { ...this.searchData, page: this.page, pageSize: PAGE_SIZE }
			})
				.then(data => {
					this.sumNoSettleCurr = data.sumNoSettleCurr;
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
		dateFull(date) {
			return dateFormat.dateFull(date);
		},
		toStatementDetail(row) {
			this.$router.push({
				path: "/StatementDetail",
				query: { purchaseID: row.purchaseID } 
			});
		},
		resetHandle() {
			// 父组件调用
			this.page = 0;
			this.sumNoSettleCurr = "";
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