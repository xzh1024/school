<template>
  <div>
    <ht-setting-table
      :data="tableData"
      setting-all-column
      selection-type="multiple"
      show-table-setting
      :columns="tableColumns"
      style="height:550px;"
      table-name="work-orders-service-table"
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { ITEM_STATUS, FEE_PROPERTY } from "@/constants/repair/partColumns";
import { getBillsItems } from "@/api/repairs/bills";
import { dateFormatFull } from "@/utils/date";
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
      tableData: [],
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
          prop: "itemCode",
          label: "项目编码",
          width: CELL_WIDTH.date
        },
        {
          prop: "itemName",
          label: "项目名称",
          width: CELL_WIDTH.date,
          formatter: (value, row) => {
            let setName = "";
            if (row.setId > 0) {
              setName = row.setName;
            }
            return setName ? `${value}(${setName})` : value;
          }
        },
        {
          prop: "status",
          label: "状态",
          width: CELL_WIDTH.date,
          formatter: value => {
            return ITEM_STATUS[value] || "";
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
          prop: "chargeManHour",
          label: "收费工时",
          width: CELL_WIDTH.fundCategoryName,
          render: value => {
            return (
              <span style="display:inline-block;width:100%;text-align:center;">
                {value}
              </span>
            );
          }
        },
        {
          prop: "checkManHour",
          label: "考核工时",
          width: CELL_WIDTH.date
        },
        {
          prop: "manHourPrice",
          label: "工时单价",
          width: CELL_WIDTH.fundCategoryName,
          render: value => {
            return (
              <span style="display:inline-block;width:100%;text-align:center;">
                {value}
              </span>
            );
          }
        },
        {
          prop: "discountLabel",
          label: "折扣",
          width: CELL_WIDTH.fundCategoryName,
          render: value => {
            return (
              <span style="display:inline-block;width:100%;text-align:center;">
                {value ? value : "-"}
              </span>
            );
          }
        },
        {
          prop: "amount",
          label: "工时费用",
          width: CELL_WIDTH.date
        },
        {
          prop: "itemCategory",
          label: "维修类型",
          width: CELL_WIDTH.date
        },
        {
          prop: "technicianGroupName",
          label: "维修班组",
          width: CELL_WIDTH.date
        },
        {
          prop: "stationName",
          label: "工位",
          width: CELL_WIDTH.date
        },
        {
          label: "维修技师",
          width: CELL_WIDTH.companyNo,
          formatter: (_, row) => {
            const { technician } = row;
            const technicians = (technician && technician.technicians) || [];
            const techs = [];
            let totalWeight = 0;
            technicians.forEach(item => {
              totalWeight += Number(Number(item.weight).toFixed(2));
            });
            // totalWeight = totalWeight || 1;
            technicians.forEach(item => {
              techs.push(
                `${item.technicianName}(${(
                  Number(totalWeight ? item.weight / totalWeight : 0) * 100
                ).toFixed(2) + "%"})`
              );
            });
            return techs.join(",");
          }
        },
        {
          label: "主修人",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { technician } = row;
            return technician && technician.majorTechnicianName;
          }
        },
        {
          label: "派工人",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { log } = row;
            return log && log.dispatchManName;
          }
        },
        {
          prop: "dispatchTime",
          label: "派工时间",
          width: CELL_WIDTH.time,
          formatter: (_, row) => {
            const { log } = row;
            return log ? dateFormatFull(log.dispatchTime) : "";
          }
        },
        {
          prop: "startTime",
          label: "开工时间",
          width: CELL_WIDTH.time,
          formatter: (_, row) => {
            const { log } = row;
            return log ? dateFormatFull(log.startTime) : "";
          }
        },
        {
          prop: "completeTime",
          label: "完工时间",
          width: CELL_WIDTH.time,
          formatter: (_, row) => {
            const { log } = row;
            return log ? dateFormatFull(log.completeTime) : "";
          }
        },
        {
          prop: "chargeManName",
          label: "原主修人/返修责任人",
          width: CELL_WIDTH.companySortName
        },
        {
          prop: "remark",
          label: "项目备注",
          width: CELL_WIDTH.date
        }
      ]
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
      getBillsItems({ billId }).then(res => {
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
      });
    }
  }
};
</script>

<style></style>
