<template>
	<div v-if="load" class="box-container">
		<div class="page-title-container">
			<img src="../../../assets/back-icon.png" class="back-icon" @click="back">
			<div class="page-title">对账</div>
			<div class="page-title-right" @click="toSettleList">结算历史>></div>
		</div>
		<van-tabs
			v-model="activeTab"
			line-width='16px'
			color='#00a8ea'
			title-active-color='#1A2231'
			title-inactive-color='#777B87'
		>
			<van-tab title="应收付">
				<payment ref="payment" />
			</van-tab>
			<van-tab title="对账单">
				<statement ref="statement" />
			</van-tab>
		</van-tabs>
		
		<van-button
			round
			type="info"
			size="small"
			class="charge-btn"
			style="padding-right: 25px;"
			@click="showCharge = true"
		>挂账信息</van-button>
		<charge-info-popup v-model="showCharge" />
	</div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, Button } from "vant";
import Payment from "./Payment/index";
import Statement from "./Statement/index";
import ChargeInfoPopup from "../components/ChargeInfoPopup";

Vue.use(Tab).use(Tabs).use(Button);
let resetBeforeEach;

export default {
	name: "VerifyBills",
	components: {
		Payment,
		Statement,
		ChargeInfoPopup
	},
	data() {
		return {
			load: true,
			activeTab: 0,
			showCharge: false
		};
	},
	beforeMount() {
		resetBeforeEach = this.$router.beforeEach((to, from, next) => {
			if (from.path === "/mine") {
				this.load = false;
				this.resetHandle();
			}
			next();
		})
	},
	destroyed() {
		resetBeforeEach && resetBeforeEach();
	},
	methods: {
		back() {
			this.$router.push("mine");
		},
		toSettleList() {
			this.$router.push("/SettleList");
		},
		resetHandle() {
			this.activeTab = 0;
			this.$refs.payment && this.$refs.payment.resetHandle();
			this.$refs.statement && this.$refs.statement.resetHandle();
			this.$nextTick(() => {
				this.load = true;
			})
		}
	}
}
</script>

<style lang="less" scoped>
.box-container {
	height: 100vh;
	overflow: hidden;
	background: #F8F8F8;
}
.page-title-container {
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	img {
		padding-left: 16px;
		cursor: pointer;
	}
}
.page-title {
	font-size: 18px;
	font-weight: 500;
}
.page-title-right {
	margin-right: 16px;
	font-size: 14px;
	cursor: pointer;
}
.charge-btn {
	position: fixed;
	bottom: 40%;
	right: -20px;
	font-weight: 500;
}
</style>