<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-primary tabs-large ignore-hotkeys"
      style="margin-top: 5px;"
      @change="changeTab"
    />
    <Unsettle
      v-show="activeTab === 'Unsettle'"
      ref="unsettle"
      class="auto-card"
      @statement-number-change="handleStatementChange"
    />
    <Statement
      v-show="activeTab === 'Statement'"
      ref="statement"
      class="auto-card"
      @statement-number-change="handleUnsettleChange"
    />
  </div>
</template>
<script>
import { getPaymentStatementNumber } from "@/api/finance/payment";
import Unsettle from "./unsettleTab";
import Statement from "./statementTab";
import { hotkeyMixin } from "@/mixins";
import { tabChangeMixin } from "@/mixins";

export default {
  name: "PaymentStatement",
  components: {
    Unsettle,
    Statement
  },
  mixins: [hotkeyMixin, tabChangeMixin],
  data() {
    return {
      statementNumber: 0,
      tabs: [
        { name: "未结往来账", id: "Unsettle" },
        {
          name: "对账单",
          id: "Statement",
          render: name => (
            <span>
              {name}
              {this.statementNumber ? (
                <span class="danger-text">({this.statementNumber})</span>
              ) : null}
            </span>
          )
        }
      ],
      defaultTab: "Unsettle"
    };
  },
  mounted() {
    this.updateStatementNumber();
  },
  methods: {
    updateStatementNumber() {
      getPaymentStatementNumber({ settlementType: 0 }, "rb").then(res => {
        this.statementNumber = res.num;
      });
    },
    handleStatementChange() {
      this.updateStatementNumber();
      this.$refs.statement.handleStatementChange();
    },
    handleUnsettleChange() {
      this.updateStatementNumber();
      this.$refs.unsettle.handleUnsettleChange();
    }
  }
};
</script>
