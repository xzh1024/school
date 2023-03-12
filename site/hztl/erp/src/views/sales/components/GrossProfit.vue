<template>
  <ht-dialog :visible.sync="isShow" title="毛利情况" width="40%">
    <ht-setting-table
      tableName="grossProfit"
      :columns="columns"
      :data="tableData"
    />
  </ht-dialog>
</template>
<script>
export default {
  name: "GrossProfit",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      isShow: this.visible,
      columns: [
        {
          prop: "taxedGrossProfit",
          label: "含税毛利",
          type: "number",
          width: ""
        },
        {
          prop: "untaxedGrossProfit",
          label: "除税毛利",
          type: "number",
          width: ""
        },
        {
          prop: "grossProfitRate",
          label: "毛利率",
          type: "percent",
          width: ""
        }
      ]
    };
  },
  computed: {
    tableData() {
      return [
        {
          taxedGrossProfit: this.info.taxedGrossProfit || 0,
          untaxedGrossProfit: this.info.untaxedGrossProfit || 0,
          grossProfitRate: this.info.grossProfitRate || 0
        }
      ];
    }
  },
  watch: {
    visible(now) {
      this.isShow = now;
    },
    isShow(now) {
      if (!now) {
        this.$emit("update:visible", now);
      }
    }
  }
};
</script>
