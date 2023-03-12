<template>
  <div style="height: 100%">
    <ht-table
      :key-scope="keyScope"
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
import * as _ from "lodash";
import { EditColumns } from "@/components/table";
import { FINANCE_SETTLE_CENTER_DETAIL } from "@/constants";
import { loadBillSettleDetail } from "@/api/finance/billSettle";

export default {
  name: "BillSettleDetail",
  components: {
    EditColumns
  },
  props: {
    keyScope: {
      type: Symbol,
      default: Symbol("BillSettleDetail")
    },
    params: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      editColumnsVisible: false,
      tableName: FINANCE_SETTLE_CENTER_DETAIL.name,
      baseTableColumns: FINANCE_SETTLE_CENTER_DETAIL.columns,
      tableColumns: []
    };
  },
  watch: {
    params: {
      handler(params) {
        this.loadData(params);
      },
      immediate: true
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
    loadData(params) {
      if (this.loading) return;
      if (!params) {
        this.tableData = [];
        return;
      }
      this.loading = true;
      loadBillSettleDetail({
        ..._.pick(params, ["billType", "billId"])
      })
        .then(data => {
          this.loading = false;
          this.tableData = (data && data.details) || [];
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
