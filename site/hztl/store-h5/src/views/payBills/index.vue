<template>
  <div class="box-container">
    <div class="page-title-container">
      <img src="@/assets/back-icon.png" class="back-icon" @click="back">
      <div class="page-title">支付账单</div>
    </div>
		<van-divider style="margin: 0;" />

		<div class="amount-container text-font-danger">
			<span style="font-size: 22px;">¥</span>
			<span style="font-size: 36px;">{{ billData.amount }}</span>
		</div>

		<van-radio-group v-model="payType" style="margin-top: 50px;">
			<van-cell-group>
				<van-cell
					v-for="(item, index) in PAY_TYPES"
					:key="index"
					:title="item.title"
					:icon="item.icon"
					clickable
					@click="payType = item.name"
					style="text-align: left; font-size: 16px;"
				>
					<template #right-icon>
						<van-radio :name="item.name" />
					</template>
				</van-cell>
			</van-cell-group>
		</van-radio-group>

		<van-button
			round
			block
			type="danger"
			class="btn-content"
			@click="payHandle"
		>
			{{ payTypeTitle }}¥{{ billData.amount }}
		</van-button>
		<pay-offline-popup v-model="showPayOffline" :billData="{ ...billData, payType: payType }" />
  </div>
</template>

<script>
import Vue from "vue";
import { Divider, Cell, CellGroup, Radio, RadioGroup, Button } from "vant";
import { post } from "@/request/http";
import PayOfflinePopup from "./PayOfflinePopup";

Vue.use(Divider).use(Cell).use(CellGroup).use(Radio).use(RadioGroup).use(Button);

const PAY_TYPES = [
	// { name: "weixin-jsapi", title: "微信支付", icon: require("@/assets/pay-weixin.png") },
	// { name: "weixin-union", title: "银联支付", icon: require("@/assets/pay-union.png") },
	{ name: "financial", title: "线下支付", icon: require("@/assets/pay-offline.png") }
];
const defaultBillData = {
	amount: "37.5"
};

export default {
	name: "PayBills",
	components: {
		PayOfflinePopup
	},
	data() {
		return {
			PAY_TYPES,
			payType: "financial",
			showPayOffline: false
		};
	},
	computed: {
		billData() {
			return this.$route.query.billData ? this.$route.query.billData : { ...defaultBillData };
		},
		payTypeTitle() {
			let title = "";
			if (this.payType) {
				title = (PAY_TYPES.find(item => item.name === this.payType) || {}).title
			}
			return title;
		}
	},
  methods: {
    back() {
			this.$router.push({
				path: "/StatementDetail",
				query: { purchaseID: this.billData.purchaseID }
			});
		},
		payHandle() {
			if (this.payType === "financial") {
				this.showPayOffline = true;
			}
			// else {
			// 	post(
			// 		"/receive-pay/pay",
			// 		{
			// 			purchaseNo: this.billData.purchaseNo,
			// 			purchaseID: this.billData.purchaseID,
			// 			amount: this.billData.amount,
			// 			payType: this.payType,
			// 		}
			// 	);
			// }
		}
  }
}
</script>

<style lang="less" scoped>
.box-container {
	height: 100vh;
	overflow: hidden;
}
.page-title-container {
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	img {
		padding-left: 16px;
		cursor: pointer;
	}
}
.page-title {
	margin-left: 30%;
	font-size: 18px;
	font-weight: 500;
}
.amount-container {
	margin-top: 20px;
	font-weight: 500;
}
.btn-content {
	position: fixed;
	bottom: 5px;
	left: 5px;
	width: calc(100vw - 10px);
	font-weight: 500;
}
.text-font-danger {
	color: #ee0a24;
}
</style>