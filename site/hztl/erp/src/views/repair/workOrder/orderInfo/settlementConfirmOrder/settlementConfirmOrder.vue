<template>
  <div class="container-box" style="background:#fff;">
    <div style="height: 100%;">
      <div class="flex-container column-flex">
        <div
          class="auto-block flex-block-bg flex-block-margin table-box"
          style="overflow-y: scroll;"
        >
          <ConfirmOrder
            :confirmInfo="confirmInfo"
            :isQuote="false"
            :enableEdit="enableEdit && hasEditPerm"
            :showCheck="orderInfo.hasCustomerSettle"
            @updateTable="updateTable"
            @saveTable="saveTable"
            @pushTable="pushTable"
            @check="getCheckInfo"
          />
        </div>
      </div>
    </div>
    <ht-dialog
      title="已提交至客户的报价单"
      width="1200px"
      :visible.sync="showCheck"
      @close="showCheck = false"
    >
      <ConfirmOrder
        v-if="showCheck"
        :confirmInfo="confirmCheckInfo"
        :isQuote="false"
        :showCheck="showCheck"
        :hideBtn="true"
        :enableEdit="false"
        @check="showCheck = true"
      />
      <div
        class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin"
      >
        <el-button size="small" type="primary" @click="close"
          >确定（F3）</el-button
        >
        <el-button size="small" @click="close">取消（ESC）</el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import ConfirmOrder from "@/components/repair/confirmOrder/confirmOrder";
import {
  settlesView,
  settlesCheckView,
  settlesSave,
  settlesPush
} from "@/api/repairs/bills";
export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    editAble: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          const { status } = value;
          this.enableEdit = status == "toFinancialConfirm";
          this.form = { ...value };
          const { id } = this.orderInfo;
          this.getConfirmInfo({ id, useBillToParam: true });
        }
      },
      deep: true
    }
  },
  components: {
    ConfirmOrder
  },
  data() {
    return {
      enableEdit: false,
      showCheck: false,
      confirmInfo: {},
      form: {}
    };
  },
  computed: {
    hasEditPerm() {
      return this.hasBelongsPerm("update", ["self", "others"]);
    }
  },
  mounted() {
    if (this.orderInfo) {
      this.form = { ...this.orderInfo };
      const { status } = this.orderInfo;
      this.enableEdit = status == "toFinancialConfirm";
      const { id } = this.orderInfo;
      this.getConfirmInfo({ id, useBillToParam: true });
    }
  },
  methods: {
    close() {
      this.showCheck = false;
    },
    getConfirmInfo(data) {
      settlesView(data).then(res => {
        this.confirmInfo = res;
      });
    },
    getCheckInfo() {
      const { id } = this.orderInfo;
      settlesCheckView({ id, useBillToParam: true }).then(res => {
        this.confirmCheckInfo = res;
        this.showCheck = true;
      });
    },
    updateTable(e) {
      this.getConfirmInfo(e);
    },
    saveTable(e) {
      settlesSave(e).then(() => {
        this.$message.success("保存成功！");
        this.$emit("updateOrder");
      });
    },
    pushTable(e) {
      settlesPush(e).then(() => {
        this.$message.success("提交成功！");
        this.$emit("updateOrder");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px 0;
  padding: 5px;
  border-radius: 2px;
  border-bottom: solid 1px #eee;
}
</style>
