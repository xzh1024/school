<template>
  <div class="box-container">
    <div class="page-title-container">
			<img src="../../../assets/back-icon.png" class="back-icon" @click="back">
			<div class="page-title">对账单详情</div>
		</div>

    <van-divider style="margin: 0;" />
    <div class="page-body-container">
      <div class="item-container">
        <div class="margin-bottom" style="display: flex; justify-content: space-between; align-items: center;">
          <div class="text-font-info item-title">
            账单基本信息
          </div>
          <div :class="formData.statementStatus === '完成' ? 'text-font-info' : 'text-font-danger'">
            <i v-show="formData.statementStatus" class="cricle-dot" />
            {{ formData.statementStatus }}
          </div>
        </div>
        <div>{{ formData.purchaseNo }}</div>
        <div>
          {{ formData.vendorName }}<span v-if="formData.tel">（{{ formData.tel }}）</span>
        </div>
        <div>
          入账周期：<span>{{ formData.statementPeriod }}</span>
        </div>
        <div>
          账单备注：<span>{{ formData.remarks }}</span>
        </div>
        <div>
          创建时间：<span>{{ dateYmd(formData.createDate) }}</span>
        </div>
      </div>

      <div
        class="item-container"
      >
        <div class="text-font-info item-title margin-bottom">
          账单结算信息
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div>
            应结：<span>{{ formData.arrearReal }}</span>
          </div>
          <div>
            已结：<span>{{ formData.settleCurr }}</span>
          </div>
          <div>
            未结：<span>{{ formData.noSettleCurr }}</span>
          </div>
        </div>
      </div>

      <div class="item-container">
        <div class="text-font-info item-title margin-bottom">
          订单信息
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadData"
        >
          <div v-for="(item, index) in list" :key="index">
            <div style="display: flex; justify-content: space-between;">
              <div style="text-align: left;">
                <div v-if="item.remoteOrderNo">
                  ({{ item.remoteOrderNo }})
                </div>
                <div>
                  {{ item.billPurchaseNo }}
                </div>
              </div>

              <div class="text-font-default-light">
                {{ dateYmd(item.createDate) }}
              </div>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <div>
                订单金额：<span>{{ item.orderingCurr }}</span>
              </div>
              <div>
                优惠：<span>{{ item.zCurr }}</span>
              </div>
              <div style="width: 50px;" />
            </div>
            <van-divider v-if="index !== list.length - 1" style="margin: 10px 0;" />
          </div>
        </van-list>
      </div>
    </div>

    <van-divider v-if="Number(formData.noSettleCurr) > 0" style="margin: 0;" />
    <div v-if="Number(formData.noSettleCurr) > 0" class="total-container">
			<div class="text-font-default-light">
        支付金额：<span class="text-font-danger">{{ formData.noSettleCurr }}</span>
      </div>
      <van-button
        round
        type="info"
        size="small"
        style="margin-top: -6px; margin-right: 20px;"
        @click="toPay"
      >支付账单</van-button>
		</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Divider, Button, List } from "vant";
import request from "@/request";
import dateFormat from "@/utils/date";

Vue.use(Icon).use(Divider).use(Button).use(List);

const defaultFormData = {
  purchaseNo: "",
  statementStatus: "",
  vendorName: "",
  tel: "",
  statementPeriod: "",
  remarks: "",
  createDate: "",
  arrearReal: "",
  settleCurr: "",
  noSettleCurr: ""
}

export default {
  name: "StatementDetail",
  data() {
    return {
      loading: false,
      finished: true,
      formData: { ...defaultFormData },
      list: []
    };
  },
  computed: {
    purchaseID() {
      return Number(this.$route.query.purchaseID || 0) || undefined;
    }
  },
  watch: {
    purchaseID: {
      handler(val) {
        if (val) {
          this.loadData();
        }
      },
      immediate: true
    }
  },
  methods: {
		back() {
			this.$router.push("/VerifyBills");
    },
    loadData() {
      request({
        url: "/receive-pay/list/statement-sub",
        params: { purchaseID: this.purchaseID }
      })
        .then(res => {
          this.formData = res || { ...defaultFormData };
          this.list = res.data || [];
        }).finally(() => {
          this.loading = false;
					this.finished = true;
        })
    },
    toPay() {
      if (Number(this.formData.noSettleCurr <= 0)) {
        return;
      }
      this.$router.push({
        path: "/PayBills",
        query: {
          billData: {
            purchaseNo: this.formData.purchaseNo,
            purchaseID: this.purchaseID,
            amount: this.formData.noSettleCurr
          }
        }
      });
    },
    dateYmd(date) {
			return dateFormat.dateYmd(date);
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
.page-body-container {
  height: calc(100vh - 80px);
  overflow-y: auto;
  background: #F8F8F8;
  font-size: 14px;
  line-height: 23px;
}
.item-container {
  margin: 10px;
  padding: 10px;
  overflow: auto;
  background: #ffffff;
  border-radius: 4px;
  text-align: left;
}
.item-title {
  position: relative;
  padding-left: 10px;
  font-size: 18px;
	font-weight: 500;
	&::before {
		content: '';
		position: absolute;
		display: inline-block;
		left: 0;
		bottom: 2px;
		height: 18px;
		width: 4px;
		background: #1989fa;
	}
}
.margin-bottom {
  margin-bottom: 10px;
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
  justify-content: space-between;
	padding: 10px;
  font-size: 14px;
  background: #ffffff;
}
.text-font-danger {
  color: #ee0a24;
  
  .cricle-dot {
		background-color: #ee0a24;
	}
}
.text-font-info {
  color: #1989fa;
  
  .cricle-dot {
		background-color: #1989fa;
	}
}
.text-font-default-light {
	color: #969799;
}
</style>