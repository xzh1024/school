<template>
  <div>
    <van-dialog
      v-model="clientNotVisible"
      theme="round-button"
      class="ex_confirm"
      show-cancel-button
      confirm-button-text="发起申请"
      cancel-button-text="暂不"
      @confirm="submitApply"
    >
      <div style="margin: 30px 20px 10px 20px;">
        <div style="text-align: left;">
          您还不是当前商家的客户，或商家拒绝了您的客户申请，是否现在发起客户申请？
        </div>
        <div style="margin-top: 10px; color: red;">
          商家电话：{{ storeTel }}
        </div>
      </div>
    </van-dialog>
    <van-dialog v-model="clientPendingVisible">
      <div style="margin: 30px 20px 10px 20px;">
        <div style="text-align: left;">
          商家还没有通过您的客户申请，请耐心等待商家审核。
        </div>
        <div style="margin-top: 10px; color: red;">
          商家电话：{{ storeTel }}
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { post } from "@/request/http";
import { Dialog, Toast } from "vant";
Vue.use(Dialog).use(Toast);

export default {
  name: "ClientApplyDialog",
  computed: {
    ...mapState({
      storeTel: state => state.storeTel,
      isCurCustomer: state => state.isCurCustomer,
      theExCompany: state => state.mallUser.theExCompany
    })
  },
  data() {
    return {
      clientNotVisible: false,
      clientPendingVisible: false
    };
  },
  methods: {
    async checkState(cb) {
      if (this.isCurCustomer || this.theExCompany) {
        cb && cb();
      } else {
        // 个体店铺检查客户与店铺主体公司是否已经存在客户供应商关系
        const res = await this.$store.dispatch("checkIsCurCustomer");
        switch (res.data.code) {
          case "ok":
            cb && cb();
            break;
          case "not-agree":
            // 商家还没有通过您的客户申请，请耐心等待商家审核！
            this.clientPendingVisible = true;
            break;
          case "not-exists":
            // 您还不是当前商家的客户或商家拒绝了您的客户申请，是否现在发起客户申请？
            this.clientNotVisible = true;
            break;
          case "token-err":
            this.$router.push({ path: "/passwordLogin" });
            break;
          default:
            break;
        }
      }
    },
    submitApply() {
      post("/customers/store-apply").then(() => {
        Dialog.alert({
          message: "您已发起客户申请，请耐心等待商家审核。"
        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
.ex_confirm {
  /deep/.van-dialog__confirm {
    color: #fff !important;
  }
}
</style>
