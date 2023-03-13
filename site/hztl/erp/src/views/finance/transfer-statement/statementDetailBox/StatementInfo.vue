<template>
  <ht-setting-table
    v-bind="$attrs"
    :data="tabledata"
    :columns="tableColumns"
    :table-name="tableName"
    :show-header="false"
    :index-column="false"
    :selection-type="null"
    :enable-table-setting="false"
    :cell-class-name="cellClassName"
    disabled-hotkeys
    v-on="$listeners"
  />
</template>

<script>
import { dateFormatFull } from "@/utils/date";

export default {
  name: "TransferInfo",
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
        3: "部分结算",
        5: "待审核",
        6: "审核驳回",
        7: "待付款",
        8: "待收款",
        9: "收款驳回",
        10: "待付款方付款",
        11: "待收款方确认",
        4: "完成"
      },
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        {
          prop: "content",
          label: "",
          width: "180",
          classNames: "text-font-primary"
        }
      ],
      tableName: "financeTransferStatementStatementDetailBoxStatementInfo"
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
        { name: "制单分公司", content: this.infoData.createCompanyName },
        { name: "往来分公司", content: this.infoData.relatedCompanyName },
        { name: "业务期间", content: this.infoData.timRange },
        { name: "上期对账未结", content: this.infoData.lastWaitSettledAmount },
        { name: "本期应结", content: this.infoData.amount },
        { name: "本期已结", content: this.infoData.settledAmount },
        { name: "本期未结", content: this.infoData.unSettledAmount },
        { name: "合计已对未结", content: this.infoData.sumUnSettledAmount },
        { name: "制单人", content: this.infoData.createdByName },
        { name: "制单时间", content: dateFormatFull(this.infoData.createdAt) },
        { name: "最后结算人", content: this.infoData.createLastSettleByName },
        {
          name: "最后结算时间",
          content: dateFormatFull(this.infoData.createLastSettleAt)
        },
        {
          name: "最后结算确认人",
          content: this.infoData.relatedLastSettleByName
        },
        {
          name: "最后结算确认时间",
          content: dateFormatFull(this.infoData.relatedLastSettleAt)
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
