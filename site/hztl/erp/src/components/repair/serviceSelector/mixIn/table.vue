<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
export default {
  name: "tableMixIn",
  data() {
    return {
      basePriceData: [],
      basePriceColumns: [
        {
          prop: "code",
          label: "项目编码",
          width: CELL_WIDTH.index,
          formatter: (_, row) => {
            const { item } = row;
            if (!item) return "";
            return item.code;
          }
        },
        {
          prop: "name",
          label: "项目名称",
          width: CELL_WIDTH.multiple,
          formatter: (_, row) => {
            const { item } = row;
            if (!item) return "";
            return item.name;
          }
        },
        {
          prop: "categoryName",
          label: "项目类型",
          width: CELL_WIDTH.multiple,
          formatter: (_, row) => {
            const { item } = row;
            if (!item) return "";
            return item.categoryName;
          }
        },
        {
          prop: "chargeManHour",
          label: "收费工时",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "manHourPrice",
          label: "工时单价",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "total",
          label: "工时费用",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { chargeManHour, manHourPrice } = row;
            const price = Number(chargeManHour * manHourPrice).toFixed(2);
            return <span>{price}</span>;
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.multiple
        }
      ],
      partData: [],
      partColumns: [
        {
          prop: "code",
          label: "配件编码",
          width: CELL_WIDTH.index
        },
        {
          prop: "name",
          label: "配件名称",
          width: CELL_WIDTH.multiple
        },

        {
          prop: "price",
          label: "单价",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "qty",
          label: "数量",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "total",
          label: "总价",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { price, qty } = row;
            const total = Number(price * qty).toFixed(2);
            return <span>{total}</span>;
          }
        },
        {
          label: "标签",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            if (!row.part) return "";
            const { isAccessories } = row.part;
            return isAccessories ? <span class="tag">辅</span> : "";
          }
        }
      ],
      statusOptions: [
        {
          name: "不限",
          value: ""
        },
        {
          name: "启用",
          value: "enable"
        },
        {
          name: "停用",
          value: "disable"
        }
      ],
      discountOptions: [
        {
          name: "不限",
          value: null
        },
        {
          name: "允许",
          value: true
        },
        {
          name: "不允许",
          value: false
        }
      ],
      usualOptions: [
        {
          name: "不限",
          value: null
        },
        {
          name: "是",
          value: true
        },
        {
          name: "否",
          value: false
        }
      ]
    };
  },
  methods: {
    getServiceSummaries(param) {
      const { columns, data } = param;
      let totalChargeManHour = 0;
      let totalCheckManHour = 0;
      let totalManHourPrice = 0;
      let total = 0;
      data.forEach(item => {
        totalChargeManHour += +item.chargeManHour;
        totalCheckManHour += +item.checkManHour;
        totalManHourPrice += +item.manHourPrice;
      });
      total = totalChargeManHour * totalManHourPrice;
      this.totalServicePrice = total;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "chargeManHour":
            sums[index] = totalChargeManHour;
            break;
          case "checkManHour":
            sums[index] = totalCheckManHour;
            break;
          case "manHourPrice":
            sums[index] = totalManHourPrice;
            break;
          case "total":
            sums[index] = total;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    getPartSummaries(param) {
      const { columns, data } = param;
      let total = 0;
      let qty = 0;
      data.forEach(item => {
        qty += +item.qty;
        total += (+item.qty).toFixed(2) * (+item.price).toFixed(2);
      });
      this.totalPartPrice = total;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "qty":
            sums[index] = qty;
            break;
          case "total":
            sums[index] = total;
            break;
          default:
            break;
        }
      });
      return sums;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-wrap {
  ::v-deep {
    .el-row {
      margin: 10px 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .el-table__footer-wrapper {
      .is-leaf {
        .cell {
          text-align: left;
        }
      }
      .is-center {
        .cell {
          text-align: center;
        }
      }
    }
  }
}
.content-wrap {
  display: flex;
  justify-content: space-between;
  .left {
    width: 580px;
    border: solid 1px #eee;
    border-radius: 5px;
  }
  .right {
    width: 580px;
    border: solid 1px #eee;
    border-radius: 5px;
  }
}
.el-icon-plus {
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
}
.tag {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  background: #409eff;
  border-radius: 10px;
}
</style>
