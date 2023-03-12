<template>
  <ht-dialog
    v-bind="$attrs"
    title="已存在预约单提醒"
    width="1200px"
    v-on="$listeners"
  >
    <div>
      <p>系统检测到{{ plateNumber }}已存在预约单，请从下方选择处理方式</p>
      <p>
        <el-radio v-model="transferId" :label="null"
          >为该车辆创建新的工单</el-radio
        >
      </p>
      <ht-card>
        <p>选择已存在的预约单，将该车辆已存在的预约单转为工单</p>
        <ht-setting-table
          :data="tableData"
          show-table-setting
          :columns="tableColumns"
          table-name="booking-list"
          style="height:300px;"
        />
      </ht-card>
    </div>
    <div
      class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin"
    >
      <el-button size="small" type="primary" @click="confirm">确定</el-button>
      <el-button size="small" @click="cancelHandle">取消</el-button>
    </div>
  </ht-dialog>
</template>
<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { USER_LIST_KEY_VALUE } from "@/views/repair/customersBooking/const/columns";

export default {
  name: "dialog-name",
  props: {
    plateNumber: {
      type: String,
      default: ""
    },
    bookingDataList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.tableData = this.bookingDataList;
        }
      },
      immediate: true
    },
    bookingDataList: {
      handler(value) {
        this.tableData = value;
      }
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
          prop: "id",
          label: "操作",
          render: value => (
            <el-radio v-model={this.transferId} label={value}>
              <span> </span>
            </el-radio>
          )
        },
        {
          prop: "arrivalDate",
          label: "预约到店时间",
          width: CELL_WIDTH.abstract,
          formatter: (_, row) => {
            const { arrivalDate, startTime, endTime } = row;
            return `${arrivalDate}: ${startTime} - ${endTime}`;
          }
        },
        {
          prop: "billNo",
          label: "预约单号",
          width: CELL_WIDTH.no
        },
        {
          prop: "status",
          label: "预约状态",
          width: CELL_WIDTH.status,
          cantExport: true,
          render: value => {
            if (value == "超时未到") {
              return <span style="color: #F56C6C">{value}</span>;
            }
            if (value == "未到店") {
              return <span style="color:#E6A23C">{value}</span>;
            }
            if (value == "已转单") {
              return <span style="color:#409EFF">{value}</span>;
            }
            if (value == "已取消") {
              return <span style="color:#909399">{value}</span>;
            }
          }
        },
        {
          prop: "plateNumber",
          label: "车牌号",
          width: CELL_WIDTH.date
        },
        {
          prop: "customerName",
          label: "客户姓名",
          width: CELL_WIDTH.date
        },
        {
          prop: "contactsPhone",
          label: "预约电话",
          width: CELL_WIDTH.phone
        },
        {
          prop: "vehBrand",
          label: "车辆品牌",
          width: CELL_WIDTH.brand
        },
        {
          prop: "facBrand",
          label: "车辆厂牌",
          width: CELL_WIDTH.partType
        },
        {
          prop: "vehicleGroup",
          label: "车型组",
          width: CELL_WIDTH.type
        },
        {
          prop: "typeName",
          label: "预约业务类型",
          width: CELL_WIDTH.partType
        },
        {
          prop: "createdAt",
          label: "预约时间",
          width: CELL_WIDTH.type,
          type: "time"
        },
        {
          prop: "remark",
          label: "预约备注",
          width: CELL_WIDTH.remark
        },
        {
          prop: "receptionistId",
          label: "接待员",
          width: CELL_WIDTH.date,
          formatter(value) {
            return USER_LIST_KEY_VALUE[value] || "-";
          }
        },
        {
          prop: "newCustomer",
          label: "是否新客户",
          width: CELL_WIDTH.date,
          formatter(value) {
            return value == true ? "是" : "否";
          }
        }
      ],
      transferId: null
    };
  },
  methods: {
    cancelHandle() {
      this.$emit("close");
    },
    confirm() {
      if (!this.transferId) {
        this.$emit("createNew");
      } else {
        const order = this.tableData.find(item => item.id === this.transferId);
        this.$emit("transfer", order);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
