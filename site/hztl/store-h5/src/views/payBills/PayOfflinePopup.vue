<template>
  <van-popup
    v-model="visible"
    :style="{ height: '430px' }"
    round
    position="bottom"
  >
    <div class="box-container">
      <div class="title">线下支付</div>

      <van-divider style="margin: 0;" />

      <van-image
        :src="imgUrl"
        class="img-content"
        lazy-load
        @click="showImagePreview = true"
      />
      <van-image-preview
        v-model="showImagePreview"
        :images="[imgUrl]"
        :show-index="false"
      />

      <div class="tips text-font-danger">
        友情提示：线下转账前请与商家核对身份及账单信息，转账时请谨慎操作！
      </div>
      <van-cell-group>
        <van-field
          v-model="remarks"
          label="备注"
          label-width="2em"
          maxlength="50"
          placeholder="请输入..."
          show-word-limit
        />
      </van-cell-group>

      <van-button
        round
        block
        type="danger"
        class="btn-content"
        @click="onSure"
      >
        确认已支付
      </van-button>
    </div>
  </van-popup>
</template>

<script>
import Vue from "vue";
import request from "@/request";
import { Popup, Divider, CellGroup, Field, Button, Lazyload, ImagePreview, Image as VanImage, Toast } from "vant";
Vue.use(Popup).use(Divider).use(CellGroup).use(Field).use(Button).use(Lazyload).use(ImagePreview).use(VanImage);

export default {
  name: "PayOfflinePopup",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Boolean
    },
    billData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgUrl: "",
      remarks: "",
      showImagePreview: false
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
        url: "/open/stores/info"
      })
        .then(res => {
          this.imgUrl = res.paymentCode || "";
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        })
    },
    onSure() {
      request({
        method: "post",
        url: "/receive-pay/pay",
        data: { ...this.billData, remarks: this.remarks }
      })
        .then(res => {
          this.payHandle(res);
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        })
    },
    payHandle(data) {
      request({
        method: "post",
        url: data.url,
        data: data.dataString
      })
      .then(() => {
        Toast.success("确认已支付成功！");
      })
      .catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.box-container {
  margin: 0 10px;
  width: calc(100% - 20px);
}
.title {
  margin: 10px 0;
  font-size: 16px;
}
.img-content {
  margin: 10px 25%;
  display: block;
  height: 160px;
  width: 160px;
}
.tips {
  margin: 10px 0;
  font-size: 12px;
  text-align: left;
}
.btn-content {
  margin-top: 10px;
  font-weight: 500;
}
.text-font-danger {
	color: #ee0a24;
}
</style>