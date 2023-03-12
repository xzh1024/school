<template>
  <ht-setting-table
    :data="tabledata"
    :columns="tableColumns"
    :table-name="tableName"
    :show-header="false"
    :index-column="false"
    :selection-type="null"
    :enable-table-setting="false"
    :cell-class-name="cellClassName"
    disabled-hotkeys
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import { dateFormatFull } from "@/utils/date";

export default {
  name: "StatementInfo",
  props: {
    infoData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      localBillStatus: {
        0: "待提交",
        1: "待确认",
        2: "待结算",
        3: "部分结算",
        4: "完成"
      },
      tableName: "financeCollectionStatementStatementDetailBoxStatementInfo",
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        { prop: "content", label: "", width: "180" }
      ]
    };
  },
  computed: {
    tabledata() {
      return [
        { name: "对账单号", content: this.infoData.billNo },
        {
          name: "状态",
          content: this.localBillStatus[this.infoData.status] || ""
        },
        { name: "对账公司", content: this.infoData.companyName },
        { name: "往来单位", content: this.infoData.cooperatorName },
        { name: "业务期间", content: this.infoData.timRange },
        { name: "其他对账未结", content: this.infoData.lastWaitSettledAmount },
        { name: "本期应结", content: this.infoData.amount },
        { name: "本期已结", content: this.infoData.settledAmount },
        { name: "本期未结", content: this.infoData.unSettledAmount },
        { name: "合计已对未结", content: this.infoData.sumUnSettledAmount },
        { name: "制单人", content: this.infoData.createdByName },
        { name: "制单时间", content: dateFormatFull(this.infoData.createdAt) },
        { name: "确认人", content: this.infoData.confirmedByName },
        {
          name: "确认时间",
          content: dateFormatFull(this.infoData.confirmedAt)
        },
        { name: "最后结算人", content: this.infoData.updatedByName },
        {
          name: "最后结算时间",
          content: dateFormatFull(this.infoData.updatedAt)
        }
      ];
    }
  },
  methods: {
    cellClassName({ columnIndex }) {
      if (columnIndex === 1) {
        return "text-font-primary";
      }
    }
  }
};
</script>
