<template>
  <div style="height: 100%">
    <ht-setting-table
      v-bind="$attrs"
      :data="tableData"
      :columns="tableColumns"
      :table-name="tableName"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import { FINANCE_PAYMENT_SETTLE_DETAIL } from "@/constants";

export default {
  name: "SettleDetail",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      editColumnsVisible: false,
      tableName: FINANCE_PAYMENT_SETTLE_DETAIL.name,
      tableColumns: FINANCE_PAYMENT_SETTLE_DETAIL.columns
    };
  }
};
</script>
