<template>
  <ht-setting-table
    :data="tableData"
    :columns="tableColumns"
    :table-name="tableName"
    v-bind="$attrs"
    v-on="$listeners"
  />
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
      tableName: FINANCE_PAYMENT_SETTLE_DETAIL.name,
      tableColumns: FINANCE_PAYMENT_SETTLE_DETAIL.columns
    };
  }
};
</script>
