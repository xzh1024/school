<template>
  <ht-dialog
    :title="failedTitle"
    v-bind="$attrs"
    width="1000px"
    append-to-body
    v-on="$listeners"
  >
    <div>{{ failedTips }}</div>
    <ht-table :columns="failedColumns" :data="failedList" class="faild-table" />
  </ht-dialog>
</template>
<script>
import { CELL_WIDTH } from "@/constants";

const defaultColumns = [
  {
    label: "配件编码",
    prop: "partCode",
    width: CELL_WIDTH.code
  },
  {
    label: "配件名称",
    prop: "partName",
    width: CELL_WIDTH.name
  },
  {
    label: "配件品牌",
    prop: "brand",
    width: CELL_WIDTH.brand
  },
  {
    label: "产地",
    prop: "productionPlace",
    width: CELL_WIDTH.productionPlace
  }
];

export default {
  name: "OrderError",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      failedTitle: "",
      failedTips: "",
      failedColumns: [],
      failedCode: "",
      failedList: []
    };
  },
  watch: {
    data(data) {
      if (data.code !== "OK") {
        this.failedCode = data.code;
        this.failedList = data.data;
      }
    },
    failedCode(value) {
      switch (value) {
        case "price-change":
          this.failedTitle = "商品价格变动";
          this.failedTips = "您采购的配件订货价有变化：";
          this.failedColumns = [
            ...defaultColumns,
            {
              label: "原订货价",
              prop: "oldPrice",
              width: CELL_WIDTH.money,
              classNames: "number-font"
            },
            {
              label: "最新订货价",
              prop: "newPrice",
              width: CELL_WIDTH.money,
              classNames: "number-font dangerous"
            }
          ];
          break;
        case "stocks-lack":
          this.failedTitle = "库存不足";
          this.failedTips = "您采购的配件库存不足：";
          this.failedColumns = [
            ...defaultColumns,
            {
              label: "原订货数量",
              prop: "bookQty",
              width: CELL_WIDTH.bookQty,
              classNames: "number-font"
            },
            {
              label: "实时库存",
              prop: "stockQty",
              width: CELL_WIDTH.stockQty,
              classNames: "number-font dangerous"
            }
          ];
          break;
        case "sku-out":
          this.failedTitle = "已下架";
          this.failedTips = "您采购的配件已下架：";
          this.failedColumns = [
            ...defaultColumns,
            {
              label: "状态",
              width: CELL_WIDTH.type,
              formatter: () => "已下架",
              classNames: "dangerous"
            }
          ];
          break;
        case "not-enough":
          this.failedTitle = "不足起订量";
          this.failedTips = "您采购的配件不满足供应商设定的起订量：";
          this.failedColumns = [
            ...defaultColumns,
            {
              label: "采购数量",
              prop: "bookQty",
              width: CELL_WIDTH.qty,
              classNames: "number-font"
            },
            {
              label: "起订量",
              prop: "minBuyQty",
              width: CELL_WIDTH.qty,
              classNames: "number-font dangerous"
            }
          ];
          break;
        default:
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.faild-table {
  ::v-deep .dangerous {
    color: #d9001b;
  }
}
</style>
