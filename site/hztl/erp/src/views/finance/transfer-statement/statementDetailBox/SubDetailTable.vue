<template>
  <ht-table
    v-loading="loading"
    :single-selection="false"
    :data="detailTable"
    :selected-rows.sync="detailSelectedRows"
    :height="detailTable.length * 33 + 28 + 'px'"
    selection-type="multiple"
    style="max-width: 1600px"
    @selectChange="detailTableSelectionChange"
  >
    <el-table-column
      :min-width="CELL_WIDTH.code"
      label="配件编码"
      prop="code"
      show-overflow-tooltip
    />
    <el-table-column
      :min-width="CELL_WIDTH.name"
      label="配件名称"
      prop="name"
      show-overflow-tooltip
    />
    <el-table-column
      :min-width="CELL_WIDTH.brand"
      label="配件品牌"
      prop="brand"
      show-overflow-tooltip
    />
    <el-table-column
      :min-width="CELL_WIDTH.productionPlace"
      label="产地"
      prop="productionPlace"
      show-overflow-tooltip
    />
    <el-table-column
      :min-width="CELL_WIDTH.property"
      label="配件性质"
      prop="property"
      show-overflow-tooltip
    />
    <el-table-column
      :min-width="CELL_WIDTH.money"
      label="开单价"
      prop="price"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <span class="number-font">{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column
      :min-width="CELL_WIDTH.qty"
      label="应对数量"
      prop="sumNum"
      show-overflow-tooltip
    />
    <el-table-column
      :min-width="CELL_WIDTH.qty"
      label="本次对账数量"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <HtFormatNumber
          v-model="scope.row.checkNum"
          :disabled="!canEdit"
          :min="0"
          :title="scope.row.checkNum"
          :precision-number="6"
          size="mini"
          @blur="() => delayChangeCheckNum(scope.row.checkNum, scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      :min-width="CELL_WIDTH.money"
      label="本次对账金额"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <HtFormatNumber
          v-model="scope.row.checkAmount"
          :disabled="!canEdit"
          :title="scope.row.checkAmount"
          size="mini"
          precision-type="money"
          @blur="() => changeCheckAmount(scope.row.checkAmount, scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      :min-width="CELL_WIDTH.money"
      label="应结款"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <span class="number-font">{{ scope.row.sumAmount }}</span>
      </template>
    </el-table-column>
  </ht-table>
</template>

<script>
import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import {
  loadSubPaymentDetail,
  resetSubPaymentCheckNum,
  updateSubPayment
} from "@/api/finance/payment";
import { baseDataMixin, precisionsFixed } from "@/mixins";
import * as _ from "lodash";
let timer;

export default {
  name: "SubDetailTable",
  mixins: [baseDataMixin, precisionsFixed],
  props: {
    canEdit: Boolean,
    statementDetailId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      detailTable: [],
      detailSelectedRows: [],
      columns: [
        {
          prop: "sourceBillType",
          label: "业务类型",
          width: CELL_WIDTH.type,
          formatter: value => BILL_TYPE[value]
        },
        {
          prop: "sumAmount",
          label: "应对金额",
          width: CELL_WIDTH.money,
          classNames: "number-font"
        },
        {
          prop: "checkAmount",
          label: "本次对账金额",
          width: CELL_WIDTH.money,
          classNames: "number-font"
        },
        {
          prop: "sumNum",
          label: "应对数量",
          width: CELL_WIDTH.qty,
          classNames: "number-font"
        },
        {
          prop: "checkNum",
          label: "本次对账数",
          width: CELL_WIDTH.qty,
          classNames: "number-font"
        },
        {
          prop: "companyId",
          label: "业务公司",
          width: CELL_WIDTH.companyName,
          formater: value => this.getCompanyName(value)
        },
        {
          prop: "businessManId",
          label: "业务员",
          width: CELL_WIDTH.personName,
          formater: value => this.getStaffName(value)
        },
        {
          prop: "businessRemark",
          label: "业务备注",
          width: CELL_WIDTH.remark
        },
        {
          prop: "businessDate",
          label: "业务日期",
          width: CELL_WIDTH.date
        },
        {
          prop: "createdBy",
          label: "制单人",
          width: CELL_WIDTH.type,
          formater: value => this.getStaffName(value)
        },
        {
          prop: "createdAt",
          label: "制单时间",
          width: CELL_WIDTH.time
        },
        {
          prop: "lastSettleDate",
          label: "结算时间",
          width: CELL_WIDTH.time
        }
      ]
    };
  },
  watch: {
    statementDetailId: {
      handler() {
        this.loadSubPaymentDetail();
      },
      immediate: true
    }
  },
  methods: {
    loadSubPaymentDetail() {
      this.loading = true;
      return loadSubPaymentDetail(
        {
          statementId: Number(this.$route.params.id),
          statementDetailId: this.statementDetailId
        },
        "db"
      )
        .then(({ subs }) => {
          this.loading = false;
          subs = subs.map(item => {
            return {
              ...item,
              sumNum: Number(item.sumNum),
              checkNum: Number(item.checkNum)
            };
          });
          this.detailTable = subs;
          this.detailSelectedRows = this.detailTable.filter(
            row => !!Number(row.checkNum)
          );
        })
        .catch(() => {
          this.loading = false;
        });
    },
    detailTableSelectionChange(selectedRows, curRow) {
      if (!this.canEdit) {
        this.$message.error("当前状态禁止修改!");
        return;
      }

      const isCheck = curRow
        ? selectedRows.includes(curRow)
        : !!selectedRows.length;
      const statementSubId = curRow && curRow.id;

      resetSubPaymentCheckNum(
        {
          isCheck,
          statementId: Number(this.$route.params.id),
          statementDetailId: this.statementDetailId,
          statementSubId
        },
        "db"
      ).then(() => {
        if (curRow) {
          curRow.checkNum = isCheck ? curRow.sumNum : 0;
          curRow.checkAmount = this.precisionFormat(
            curRow.price * curRow.checkNum,
            "money"
          );
        } else {
          this.detailTable.forEach(row => {
            row.checkNum = selectedRows.includes(row) ? row.sumNum : 0;
            row.checkAmount = this.precisionFormat(
              row.price * row.checkNum,
              "money"
            );
          });
        }
        this.updateCheckNumData();
        this.$message({
          message: "更新成功!",
          type: "success"
        });
      });
    },
    delayChangeCheckNum(...params) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.changeCheckNum(...params);
      }, 100);
    },
    changeCheckAmount(value, row) {
      updateSubPayment(
        {
          statementId: Number(this.$route.params.id),
          statementDetailId: this.statementDetailId,
          statementSubId: row.id,
          checkAmount: value
        },
        "db"
      ).then(() => {
        row.checkAmount = value;
        row.checkNum =
          value === row.sumAmount
            ? row.sumNum
            : this.precisionByNumber(row.checkAmount / row.price, 6);
        this.updateCheckNumData();
        this.$message({
          message: "更新成功!",
          type: "success"
        });
      });
    },
    changeCheckNum(value, row) {
      updateSubPayment(
        {
          statementId: Number(this.$route.params.id),
          statementDetailId: this.statementDetailId,
          statementSubId: row.id,
          checkNum: value
        },
        "db"
      ).then(() => {
        row.checkNum = value;
        row.checkAmount =
          value === row.sumNum
            ? row.sumAmount
            : this.precisionFormat(row.price * row.checkNum, "money");
        this.updateCheckNumData();
        this.$message({
          message: "更新成功!",
          type: "success"
        });
      });
    },
    updateCheckNumData() {
      this.detailSelectedRows = this.detailTable.filter(
        row => !!Number(row.checkNum)
      );
      const checkNum = this.precisionByNumber(
        _.sumBy(this.detailTable, "checkNum"),
        6
      );
      const checkAmount = this.precisionFormat(
        _.sumBy(
          this.detailTable,
          item => parseFloat(item.price) * Number(item.checkNum)
        ),
        "money"
      );
      this.$emit("tableDataChange", {
        checkNum,
        checkAmount,
        id: this.statementDetailId
      });
      this.$emit("tableDataChange", {
        checkNum,
        checkAmount,
        id: this.statementDetailId
      });
    }
  }
};
</script>
