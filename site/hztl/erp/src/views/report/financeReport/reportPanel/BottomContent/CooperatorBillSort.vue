<template>
  <div>
    <h4 class="right_table_title">
      <span class="border"></span>
      <span>往来账排行榜</span>
      <el-select
        v-model="type"
        style="float: right; margin-top: -5px; width: 224px;"
        size="small"
        @change="getCooperatorBillSortList"
      >
        <el-option :value="0" label="所有应收付账"></el-option>
        <el-option :value="1" label="往来账"></el-option>
        <el-option :value="2" label="代收账"></el-option>
      </el-select>
    </h4>

    <el-table
      :data="tableData"
      style="width: 100%;"
      :height="368"
      @sort-change="sortChange"
      :default-sort="{ prop: 'debtAmount', order: 'descending' }"
    >
      <el-table-column
        type="index"
        prop="index"
        width="50"
        label="序号"
        align="center"
      >
        <template slot-scope="scope">
          <span
            class="icon-order"
            :class="{
              'order-one': scope.$index == 0,
              'order-two': scope.$index == 1,
              'order-three': scope.$index == 2
            }"
            >{{
              scope.$index != 0 && scope.$index != 1 && scope.$index != 2
                ? scope.$index + 1
                : ""
            }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="cooperatorName"
        label="往来单位"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="debtAmount"
        label="欠款"
        sortable="custom"
        show-overflow-tooltip
      >
        <template slot-scope="props">
          {{ toFixed2(props.row.debtAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="receiveAmount"
        label="应收"
        sortable="custom"
        show-overflow-tooltip
      >
        <template slot-scope="props">
          {{ toFixed2(props.row.receiveAmount) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="payAmount"
        label="应付"
        sortable="custom"
        show-overflow-tooltip
      >
        <template slot-scope="props">
          {{ toFixed2(props.row.payAmount) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { loadCooperatorBillSort } from "@/api/financeReport";
import { toFixed2 } from "@/views/report/common/common";

export default {
  name: "CooperatorBillSort",
  props: {
    companyIds: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      type: 0,
      sortParam: {
        column: "debtAmount",
        mode: "DESC"
      },
      tableData: []
    };
  },
  methods: {
    toFixed2: toFixed2,
    sortChange(sortParams) {
      this.sortParam = {
        column: sortParams.prop
      };
      if (sortParams.order === "ascending") {
        this.sortParam.mode = "ASC";
      } else if (sortParams.order === "descending") {
        this.sortParam.mode = "DESC";
      } else {
        this.sortParam.mode = null;
      }
      this.getCooperatorBillSortList();
    },
    getCooperatorBillSortList() {
      loadCooperatorBillSort({
        companyIds: this.companyIds,
        type: this.type,
        order: this.sortParam
      }).then(res => {
        this.tableData = res || [];
      });
    },
    toStockSearch() {}
  }
};
</script>

<style lang="scss" scoped>
.right_table_title {
  font-family: PingFangSC-Medium;
  margin: 0 0 16px;
  font-size: 16px;
  color: #171f24;
  .border {
    display: inline-block;
    margin-right: 5px;
    width: 4px;
    height: 14px;
    border-radius: 6px;
    background: #3aa7ff;
  }
}
.icon-order {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  &.order-one {
    background-image: url("~@/assets/css/icons/radnking_1.png");
  }
  &.order-two {
    background-image: url("~@/assets/css/icons/radnking_2.png");
  }
  &.order-three {
    background-image: url("~@/assets/css/icons/radnking_3.png");
  }
}
</style>
