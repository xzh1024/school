<template>
  <ht-table
    v-bind="$attrs"
    :loading="suppliersLoading"
    :data="suppliersTableData"
    :if-pagination="false"
  >
    <template v-for="(column, index) in suppliersColumns">
      <el-table-column v-if="!column.isHide" :key="index" v-bind="column">
        <template slot-scope="scope">
          <template>{{ scope.row[column.prop] }}</template>
        </template>
      </el-table-column>
    </template>
  </ht-table>
</template>
<script>
import { reqPurchasePartsSuppliers } from "@/api/purchase/partsSuppliers";
export default {
  name: "PartsSuppliers",
  props: {
    partId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      suppliersLoading: false,
      suppliersColumns: [
        { prop: "cooperatorName", label: "供应商", width: "120" },
        { prop: "avgPurchasePrice", label: "平均进价", width: "120" },
        {
          prop: "latestPurchasePrice",
          label: "最近进价",
          width: "120"
        },
        { prop: "latestPurchaseDate", label: "进货时间", width: "120" }
      ],
      suppliersTableData: []
    };
  },
  watch: {
    partId() {
      this.getSuppliers();
    }
  },
  methods: {
    getSuppliers() {
      if (!this.partId) {
        this.suppliersTableData = [];
        return;
      }
      this.suppliersLoading = true;
      reqPurchasePartsSuppliers(this.partId)
        .then(data => {
          this.suppliersLoading = false;
          this.suppliersTableData = data.rows;
        })
        .catch(() => {
          this.suppliersLoading = false;
        });
    }
  }
};
</script>
