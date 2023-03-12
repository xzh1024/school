<template>
  <van-popup v-model="visible">
    <div class="box-container">
      <div class="title">挂账信息</div>
      <div class="content">
        <div>
          预收款余额：<span v-if="formData.preReceCur" class="text-font-danger">¥{{ formData.preReceCur }}</span>
        </div>
        <div>
          预付款余额：<span v-if="formData.prePayCur" class="text-font-danger">¥{{ formData.prePayCur }}</span>
        </div>

        <div class="margin-top">
          应收账款：<span v-if="formData.receVirArrear" class="text-font-danger">¥{{ formData.receVirArrear }}</span>
        </div>
        <div>
          应付账款：<span v-if="formData.payCur" class="text-font-danger">¥{{ formData.payCur }}</span>
        </div>

        <div class="margin-top">
          合计应收：<span v-if="formData.receCur" class="text-font-danger">¥{{ formData.receCur }}</span>
        </div>
        <div>
          信用余额：<span v-if="formData.ye" class="text-font-danger">¥{{ formData.ye }}</span>
        </div>

        <div class="margin-top">
          距结账天数：<span class="text-font-danger">{{ formData.day }}</span>
        </div>
        <div>
          信用额度：<span v-if="formData.credit" class="text-font-danger">¥{{ formData.credit }}</span>
        </div>

        <div class="margin-top">
          账期：<span class="text-font-danger">{{ formData.zq }}</span>
        </div>
        <div>
          对账日：<span class="text-font-danger">{{ formData.startZq }}</span>
        </div>
        <div>
          现有积分：<span class="text-font-danger">{{ formData.integral }}</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import Vue from "vue";
import { Popup } from "vant";
import request from "@/request";

Vue.use(Popup);

const defaultFormData = {
  preReceCur: "",
  prePayCur: "",
  receVirArrear: "",
  payCur: "",
  receCur: "",
  ye: "",
  day: "",
  credit: "",
  zq: "",
  startZq: "",
  integral: ""
}

export default {
  name: "ChargeInfoPopup",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      formData: { ...defaultFormData }
    };
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      }
    } 
  },
  watch: {
    value(val) {
      if (val) {
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      request({
        url: "/receive-pay/list/ontick-info"
      })
        .then(res => {
          this.formData = res || { ...defaultFormData }
        });
    }
  }
}
</script>

<style lang="less" scoped>
.box-container {
  width: 80vw;
  font-size: 16px;
}
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  background: #1989fa;
  font-weight: 500;
}
.content {
  margin: 20px;
  text-align: left;
  line-height: 22px;
}
.margin-top {
  margin-top: 15px;
}
.text-font-danger {
	color: #ee0a24;
}
</style>