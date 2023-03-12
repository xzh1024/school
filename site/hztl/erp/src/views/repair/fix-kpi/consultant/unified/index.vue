<template>
  <ht-card class="auto-card">
    <div class="btn-line">
      <el-button type="primary" size="small">保存（F3）</el-button>
      <el-checkbox v-model="checked">启用</el-checkbox>
    </div>
    <ht-card no-padding class="table-wrap" title="业务提成比例设置">
      <ht-setting-table
        :data="tableData"
        :enable-table-setting="false"
        :columns="tableColumns"
        table-name="kpi"
        height="115px"
      />
    </ht-card>
    <el-row>
      <el-checkbox v-model="checked">统一设置提成比例</el-checkbox>
    </el-row>
    <el-row>
      <el-checkbox v-model="checked">统一设置提成基数</el-checkbox>
    </el-row>
  </ht-card>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
export default {
  data() {
    return {
      checked: false,
      tableData: [
        {
          billType: "维修工单",
          jishu: 1,
          value: 80
        },
        {
          billType: "保险理赔申请单",
          jishu: 1,
          value: 80
        },
        // {
        //   billType: "保修单据",
        //   jishu: 1,
        //   value: 80
        // },
        {
          billType: "洗车单",
          jishu: 1,
          value: 80
        }
      ],
      tableColumns: [
        {
          prop: "billType",
          label: "业务单据",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "jishu",
          label: "提成基数",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "value",
          label: "提成比例（%）",
          width: CELL_WIDTH.multiple
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.btn-line {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.table-wrap {
  width: 510px;
}
</style>
