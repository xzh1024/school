<template>
  <div>
    <ht-card title="配件列表" style="marginBottom:10px;">
      <ht-setting-table
        :data="tableData"
        setting-all-column
        show-table-setting
        @row-dblclick="handlePartSelect"
        :selected-rows.sync="selectedRows"
        :columns="tableColumns"
        style="height:250px;"
        table-name="work-orders-part-table"
      />
    </ht-card>
    <ht-card title="领/退料记录">
      <ht-setting-table
        :data="detailData"
        setting-all-column
        show-table-setting
        :columns="detailColumns"
        style="height:150px;"
        table-name="work-orders-part-table-detail"
      />
    </ht-card>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import {
  FEE_PROPERTY,
  PART_DETAIL_COLUMNS
} from "@/constants/repair/partColumns";
import { picksDetailsForBills } from "@/api/repairs/picks";
import { getBillsParts } from "@/api/repairs/bills";
export default {
  props: {
    billId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    billId: {
      handler(value) {
        if (value) {
          this.list();
        }
      },
      deep: true
    }
  },
  data() {
    return {
      billPartId: null,
      selectedRows: [],
      tableData: [],
      detailData: [],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },

        {
          prop: "partCode",
          label: "配件编码",
          width: CELL_WIDTH.date
        },
        {
          prop: "partName",
          label: "配件名称",
          width: CELL_WIDTH.date,
          formatter: (value, row) => {
            const { setId, setName } = row;
            return setId > 0 ? `${value}(${setName})` : `${value}`;
          }
        },
        {
          label: "标签",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { part } = row;
            if (!part) {
              return <span></span>;
            }
            const { isAccessories } = part.flags;
            return isAccessories ? <span class="tag">辅</span> : "";
          }
        },
        {
          prop: "feeProperty",
          label: "费用性质",
          width: CELL_WIDTH.date,
          render: value => {
            return <span>{FEE_PROPERTY[value]}</span>;
          }
        },
        {
          prop: "price",
          label: "单价",
          width: CELL_WIDTH.fundCategoryName
        },
        {
          prop: "qty",
          label: "需求数量",
          width: CELL_WIDTH.fundCategoryName
        },
        {
          prop: "discountLabel",
          label: "折扣",
          width: CELL_WIDTH.fundCategoryName
        },
        {
          prop: "amount",
          label: "总价",
          width: CELL_WIDTH.date
        },
        {
          prop: "pickedQty",
          label: "领料数量",
          width: CELL_WIDTH.date
        },
        {
          prop: "urgentQty",
          label: "转急采数量",
          width: CELL_WIDTH.date
        },
        {
          prop: "brand",
          label: "品牌",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.brand ? part.brand : "";
          }
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.productionPlace ? part.productionPlace : "";
          }
        },
        {
          prop: "unit",
          label: "单位",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.unit ? part.unit : "";
          }
        },
        {
          prop: "partType",
          label: "零件类别",
          width: CELL_WIDTH.address,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.partType ? part.partType : "";
          }
        },
        {
          prop: "avaVehModel",
          label: "适用车型",
          width: CELL_WIDTH.address,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.avaVehModel ? part.avaVehModel : "";
          }
        },
        {
          prop: "model",
          label: "规格",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.model ? part.model : "";
          }
        },
        {
          prop: "chargeManName",
          label: "返修责任人",
          width: CELL_WIDTH.companySortName
        },
        {
          prop: "remark",
          label: "配件备注",
          width: CELL_WIDTH.date
        }
      ],
      detailColumns: PART_DETAIL_COLUMNS
    };
  },
  mounted() {
    if (this.billId) {
      this.list();
    }
  },
  methods: {
    list() {
      const { billId } = this;
      getBillsParts({ billId, queryChannel: "repair" }).then(res => {
        if (!res) {
          this.tableData = [];
          return;
        }
        res.forEach(item => {
          item.discountLabel = item.discountRate
            ? Number(item.discountRate * 10).toFixed(2)
            : item.discountRate;
        });
        this.tableData = res || [];
        if (res && res.length) {
          this.selectedRows = [res[0]];
          this.getPicksList(res[0]);
        }
      });
    },
    handlePartSelect(e) {
      const { partId } = e;
      this.billPartId = partId;
      this.getPicksList();
    },
    getPicksList() {
      const { billId } = this;
      const { billPartId } = this;
      picksDetailsForBills({ billId, billPartId }).then(res => {
        this.detailData = res || [];
      });
    }
  }
};
</script>

<style></style>
