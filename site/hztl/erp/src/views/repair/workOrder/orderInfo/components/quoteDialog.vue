<template>
  <ht-dialog v-bind="$attrs" title="报价确认" width="600px" v-on="$listeners">
    <p>确定客户已经签字确认报价单？</p>
    <p v-if="url">
      如果还没签字，可打印报价单并签字或者让用户扫描下方二维码进行电子签名。
    </p>
    <div class="barcode-wrap" v-if="url">
      <CustomQrcode
        :value="url"
        :configure="{
          width: 300,
          height: 300
        }"
      />
      <p v-if="url">手机扫码签字</p>
    </div>
    <div
      class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin"
    >
      <el-button size="small" type="primary" @click="submit"
        >确定 (F3)</el-button
      >
      <el-button size="small" @click="$emit('close')">取消 (ESC)</el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { offersCommit } from "@/api/repairs/bills";
import { getPlatformUrl } from "@/api/platform/index";
import CustomQrcode from "@/components/CustomQrcode/index";

export default {
  name: "quote-dialog",
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      url: ""
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.getQrCode();
        }
      },
      immediate: true
    }
  },
  components: {
    CustomQrcode
  },
  methods: {
    getQrCode() {
      const { hasCustomerOffer } = this.orderInfo;
      console.log("是否有报价确认单", hasCustomerOffer);
      if (!hasCustomerOffer) {
        this.url = "";
        return;
      }
      getPlatformUrl({
        type: "repairBillCustomerOffer",
        id: this.orderInfo.id
      }).then(res => {
        const { zysc } = res;
        this.url = zysc;
      });
    },
    submit() {
      offersCommit({ id: this.orderInfo.id }).then(() => {
        this.$message.success("确认报价成功！");
        this.$emit("updateOrder");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.barcode-wrap {
  width: 100%;
  text-align: center;
}
.barcode {
  display: inline-block;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: solid 1px #eee;
}
</style>
