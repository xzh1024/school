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
      @statement-number-change="handleStatementChange"
    />
    <Statement
      v-show="activeTab === 'Statement'"
      ref="statement"
      @statement-number-change="handleUnsettleChange"
    />
  </div>
</template>

<script>
import Unsettle from "./unsettleTab";
import Statement from "./statementTab";
import { hotkeyMixin, tabChangeMixin } from "@/mixins";
import { getPaymentStatementNumber } from "@/api/finance/payment";

export default {
  name: "CollectionStatement",
  components: {
    Unsettle,
    Statement
  },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      statementNumber: 0,
      defaultTab: "Unsettle",
      tabs: [
        { name: "未结代收账", id: "Unsettle" },
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
      ]
    };
  },
  mounted() {
    this.updateStatementNumber();
  },
  methods: {
    updateStatementNumber() {
      getPaymentStatementNumber({ settlementType: 1 }, "lg").then(res => {
        this.statementNumber = res.num;
      });
    },
    handleStatementChange() {
      this.updateStatementNumber();
      this.$refs.statement.handleStatementChange();
    },
    handleUnsettleChange() {
      this.updateStatementNumber();
      this.$refs.unsettle.loadData();
    }
  }
};
</script>
