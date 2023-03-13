<template>
  <div style="height: 100%">
    <ht-table
      :key-scope="keyScope"
      :loading="loading"
      :data="tableData"
      :columns="tableColumns"
      setting-all-column
      show-table-setting
      v-bind="$attrs"
      v-on="$listeners"
      @table-setting="handleTableSetting"
    />
    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
    />
  </div>
</template>
<script>
import { loadSettledDetail } from "@/api/finance/billSettle";
import { EditColumns } from "@/components/table";
import { CELL_WIDTH } from "@/constants";

export default {
  name: "SettleListDetail",
  components: {
    EditColumns
  },
  props: {
    keyScope: {
      type: Symbol,
      default: Symbol("SettleListDetail")
    },
    bill: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      editColumnsVisible: false,
      tableName: "SettleCenterListDetailList",
      tableColumns: [],
      baseTableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "createdAt",
          label: "结算时间",
          width: CELL_WIDTH.time,
          type: "time"
        },
        {
          prop: "fundAccountName",
          label: "账户",
          width: CELL_WIDTH.no
        },
        {
          prop: "enhancedSettlementType",
          label: "支付方式",
          width: CELL_WIDTH.type,
          formatter: () => {
            return this.bill.enhancedSettlementType;
          }
        },
        {
          prop: "paymentType",
          label: "收付类型",
          width: CELL_WIDTH.type,
          render: (_value, row) => {
            const h = this.$createElement;
            const text = row.amount > 0 ? "收" : "付";
            return h("div", undefined, text);
          }
        },
        {
          prop: "amount",
          label: "结算金额",
          width: CELL_WIDTH.money,
          type: "number"
        },
        {
          prop: "checkNumber",
          label: "支票号",
          width: CELL_WIDTH.no
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.remark
        }
      ]
    };
  },
  watch: {
    "bill.id"(value) {
      if (!value) return;
      this.loadData();
    }
  },
  methods: {
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    loadData() {
      if (this.loading) return;
      this.loading = true;
      loadSettledDetail({
        settlLogId: this.bill.id
      })
        .then(res => {
          this.loading = false;
          this.tableData = res.rows;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
