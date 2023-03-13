<template>
  <div class="kpi-wrap">
    <ht-setting-table
      :data="tableData"
      :enable-table-setting="false"
      :columns="tableColumns"
      table-name="kpi-info"
      height="470px"
    />
    <div class="tips">
      <p>提示：</p>
      <p>组内提成占比是根据技师级别权重自动计算：</p>
      <p>组内提成占比 = 组员级别提成权重 ÷ 本组所有组员级别权重之和</p>
    </div>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
export default {
  props: {
    commissions: {
      type: Array,
      default: () => []
    },
    totalWeight: {
      type: String,
      default: "1"
    }
  },
  watch: {
    commissions: {
      handler(newVal) {
        // console.log("绩效数据更新", newVal);
        this.tableData = newVal;
      },
      deep: true
    },
    totalWeight: {
      handler(newVal) {
        this.totalWeightValue = newVal;
      }
    }
  },
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          label: "组员名称",
          width: CELL_WIDTH.index,
          formatter(_, row) {
            const { staffName, isLeader } = row;
            return staffName + (isLeader ? "(组长)" : "");
          }
        },
        {
          prop: "weight",
          label: "级别提成权重",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "weight2",
          label: "组内提成占比",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { weightRate } = row;
            return weightRate ? Number(weightRate * 100).toFixed(2) + "%" : 0;
          }
        }
      ],
      totalWeightValue: "1"
    };
  }
};
</script>

<style lang="scss" scoped>
.kpi-wrap {
  // height: 100vh;
  // display: flex;
  // align-items: stretch;
}
.tips {
  position: absolute;
  bottom: 0;
  color: #409eff;
  p {
    margin: 5px;
  }
}
</style>
