<template>
  <div class="box-container">
    <div class="page-title-container">
      <img src="../../../assets/back-icon.png" class="back-icon" @click="back">
      <div class="page-title">结算历史</div>
    </div>
		<search-form @search="onSearch" />
		<van-divider style="margin: 0;" />
		<bill-list :searchData="searchData" />

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
import { Divider, Button } from "vant";
import SearchForm from "./SearchForm";
import BillList from "./BillList";
import ChargeInfoPopup from "../components/ChargeInfoPopup";

Vue.use(Divider).use(Button);

export default {
	name: "SettleList",
	components: {
		SearchForm,
		BillList,
		ChargeInfoPopup
	},
	data() {
		return {
			searchData: null,
			showCharge: false
		}
	},
  methods: {
    back() {
			this.$router.push("/VerifyBills");
		},
		onSearch(search) {
			this.searchData = { ...search };
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
.charge-btn {
	position: fixed;
	bottom: 40%;
	right: -20px;
	font-weight: 500;
}
</style>