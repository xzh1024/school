<template>
  <ht-table
    :key-scope="keyScope"
    :loading="loading"
    :selected-rows.sync="selectedRows"
    :data="tableData"
    :columns="columns"
    :total="total"
    :current-page="currentPage"
    :summary-method="getSummaries"
    :row-class-name="rowClassName"
    class="settle-list"
    pagination
    show-summary
    v-on="$listeners"
    @pageChange="handlePageChange"
  >
    <el-table-column label="操作" min-width="100px">
      <template slot-scope="props">
        <el-button
          :disabled="!canBacksettle(props.row)"
          type="primary"
          size="mini"
          @click="handleBackSettleClick(props.row)"
        >
          反结算
        </el-button>
      </template>
    </el-table-column>
  </ht-table>
</template>
<script>
import { baseDataMixin, precisionsFixed, searchMixin } from "@/mixins";
import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import { mapState } from "vuex";
import { backSettle, loadSettledList } from "@/api/finance/billSettle";
import { dateFormat, dateFormatFull } from "@/utils/date";
import { showBillDetail } from "@/components/table";
import { isBusinessBillType } from "@/utils/businessBillType";

export const paymentTypes = ["收", "付", "收付抵消"];

export default {
  name: "SettleListTable",
  mixins: [searchMixin, baseDataMixin, precisionsFixed],
  props: {
    keyScope: {
      type: Symbol,
      default: Symbol("SettleListTable")
    },
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      summaries: {
        amountIn: 0,
        discountAmountIn: 0,
        amountOut: 0,
        discountAmountOut: 0
      },
      selectedRows: [],
      loading: false,
      currentPage: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          prop: "billNo",
          label: "结算单号",
          width: CELL_WIDTH.no
        },
        {
          prop: "paymentDate",
          label: "结算日期",
          width: CELL_WIDTH.date
        },
        {
          prop: "cooperatorName",
          label: "结算单位",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "tradingManName",
          label: "交易对象",
          width: CELL_WIDTH.personName
        },
        {
          prop: "paymentType",
          label: "收付类型",
          width: 80,
          formatter: value => paymentTypes[value]
        },
        {
          prop: "buy",
          label: "收",
          align: "center",
          children: [
            {
              prop: "settleAmount",
              key: "settleAmount1",
              label: "收款金额",
              width: CELL_WIDTH.money,
              formatter: (value, row) => (row.paymentType === 0 ? value : "--"),
              classNames: "number-font"
            },
            {
              prop: "discountAmount",
              key: "discountAmount1",
              label: "收款优惠",
              width: CELL_WIDTH.money,
              formatter: (value, row) => (row.paymentType === 0 ? value : "--"),
              classNames: "number-font"
            },
            {
              prop: "prepayAmount",
              key: "prepayAmount1",
              label: "预收结算",
              width: CELL_WIDTH.money,
              formatter: (value, row) => (row.paymentType === 0 ? value : "--"),
              classNames: "number-font"
            }
          ]
        },
        {
          prop: "payment",
          label: "付",
          align: "center",
          children: [
            {
              prop: "settleAmount",
              key: "settleAmount2",
              label: "付款金额",
              width: CELL_WIDTH.money,
              formatter: (value, row) => (row.paymentType === 1 ? value : "--"),
              classNames: "number-font"
            },
            {
              prop: "discountAmount",
              key: "discountAmount2",
              label: "付款优惠",
              width: CELL_WIDTH.money,
              formatter: (value, row) => (row.paymentType === 1 ? value : "--"),
              classNames: "number-font"
            },
            {
              prop: "prepayAmount",
              key: "prepayAmount2",
              label: "预付结算",
              width: CELL_WIDTH.money,
              formatter: (value, row) => (row.paymentType === 1 ? value : "--"),
              classNames: "number-font"
            }
          ]
        },
        {
          prop: "enhancedSettlementType",
          label: "支付方式",
          width: CELL_WIDTH.type,
          formatter: value =>
            value && value.toLocaleString && value.toLocaleString()
        },
        {
          prop: "createdByName",
          label: "结算人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "remark",
          label: "结算备注",
          width: CELL_WIDTH.remark
        },
        {
          prop: "companyName",
          label: "结算公司",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "sourceBillType",
          label: "来源类型",
          width: CELL_WIDTH.type,
          formatter: value => BILL_TYPE[value]
        },
        {
          prop: "sourceBillNo",
          label: "来源单号",
          width: CELL_WIDTH.fundAccountName,
          render: (value, row) => (
            <a
              class={isBusinessBillType(row.sourceBillType) ? "link" : ""}
              on-click={e =>
                showBillDetail(row.sourceBillType, row.sourceBillId, e)
              }
            >
              {value}
            </a>
          )
        },
        {
          prop: "billDate",
          label: "对账/业务日期",
          width: CELL_WIDTH.date,
          formatter: value => dateFormat(value)
        },
        {
          prop: "createdAt",
          label: "制单时间",
          width: CELL_WIDTH.time,
          formatter: value => dateFormatFull(value)
        }
      ]
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  watch: {
    queryParams() {
      this.currentPage = 1;
      this.loadData();
    },
    selectedRows(value) {
      if (!value.length) return;
      this.$emit("row-change", { ...value[0] });
    }
  },
  methods: {
    canBacksettle(row) {
      return (
        this.hasBelongsPerm("reversedSettlement", row.belongs) &&
        row.unsettleStatus === 0 &&
        !["YJ", "YJXS", "YJXT", "FEE", "XC", "WX", "FX"].includes(
          row.sourceBillType
        )
      );
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = ["合计"];
      columns.forEach((item, index) => {
        switch (item.label) {
          case "收款金额":
            sums[index] = this.summaries.amountIn;
            break;
          case "收款优惠":
            sums[index] = this.summaries.discountAmountIn;
            break;
          case "付款金额":
            sums[index] = this.summaries.amountOut;
            break;
          case "付款优惠":
            sums[index] = this.summaries.discountAmountOut;
            break;

          default:
            break;
        }
      });

      return sums;
    },
    rowClassName({ row }) {
      let className = "";
      if (row.unsettleStatus === 1) {
        className += "has-back-settle";
      } else if (row.unsettleStatus === 2) {
        className += "back-settle";
      }
      return className;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    loadData() {
      if (this.loading) return;
      this.loading = true;
      loadSettledList({
        ...this.queryParams,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          this.loading = false;

          this.summaries = {
            amountIn: res.sumAmountIn,
            discountAmountIn: res.sumDiscountAmountIn,
            amountOut: res.sumAmountOut,
            discountAmountOut: res.sumDiscountAmountOut
          };
          this.tableData =
            res.rows.map(item => {
              let settleAmount = Number(item.settleAmount);
              let discountAmount = Number(item.discountAmount);
              let prepayAmount = Number(item.prepayAmount);
              let paymentType = item.paymentType;
              if (item.unsettleStatus === 2) {
                settleAmount = -settleAmount;
                discountAmount = -discountAmount;
                prepayAmount = -prepayAmount;
                paymentType = paymentType === 0 ? 1 : 0;
              }
              return {
                ...item,
                paymentType,
                settleAmount,
                discountAmount,
                prepayAmount,
                settlementType: "现付"
              };
            }) || [];
          this.total = res.totalSize;
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          this.$emit("totalNumberChange", {
            nowpayInNum: res.nowpayInNum,
            nowpayOutNum: res.nowpayOutNum,
            ontickPurcNum: res.ontickPurcNum,
            ontickSaleNum: res.ontickSaleNum
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleBackSettleClick(row) {
      this.backSettlePromise(row).catch(() => {});
    },
    async backSettlePromise(row) {
      if (row.status === 1) {
        await this.$confirm("该单据已经复核，是否反结算？", "提示"),
          { type: "warning" };
      } else {
        await this.$confirm("确认反结算？", "提示", { type: "warning" });
      }
      await backSettle({
        logId: row.id
      });
      this.$message.success("反结算成功！");
      this.loadData();
    }
  }
};
</script>
<style lang="scss" scoped>
.settle-list {
  ::v-deep .table {
    .back-settle {
      color: #d9001b !important;
    }

    .has-back-settle {
      color: #307cff !important;
    }
  }
}
</style>
