<template>
  <div class="picking-part-wrap">
    <div class="header">
      <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-primary" />
    </div>
    <div class="info-group" v-if="currentOrderInfo">
      <span class="item">
        <span class="item-label">车牌号:</span>
        <span class="item-value">{{ currentOrderInfo.plateNumber }}</span>
      </span>
      <span class="item">
        <span class="item-label">工单号:</span>
        <span class="item-value">{{ currentOrderInfo.billNo }}</span>
      </span>
      <span class="item">
        <span class="item-label">业务类型:</span>
        <span class="item-value">{{
          currentOrderInfo.businessCategoryName
        }}</span>
      </span>
      <span class="item">
        <span class="item-label">接待顾问:</span>
        <span class="item-value">{{ currentOrderInfo.receptionManName }}</span>
      </span>
      <span class="item">
        <span class="item-label">状态:</span>
        <span class="item-value">{{
          ORDER_STATUS[currentOrderInfo.status]
        }}</span>
      </span>
      <div class="info">
        <div class="log" v-if="activeTab === 'Picking'">
          <el-button type="primary" size="mini" @click="showHistory = true"
            >维修履历</el-button
          >
        </div>
        <div class="info-pop">
          <el-popover
            placement="bottom-start"
            title=""
            width="400"
            trigger="click"
          >
            <ht-setting-table
              tableName="car-info"
              :columns="tableColumns"
              :data="tableData"
              :show-header="false"
              :index-column="false"
              :selection-type="null"
              :cell-class-name="cellClassName"
              disabled-hotkeys
            />
            <span slot="reference"
              >车辆信息<i class="el-icon-caret-bottom"></i
            ></span>
          </el-popover>
        </div>
      </div>
    </div>
    <component
      :is="activeTab"
      :orderInfo="currentOrderInfo"
      @showPick="showPick"
    />
    <!-- 维修履历 -->
    <RepaireHistory
      :visible="showHistory"
      :orderInfo="billInfo"
      @close="showHistory = false"
    />
  </div>
</template>

<script>
import RepaireHistory from "@/components/repair/repairHistory/repairHistory";
import Picking from "./pick/Picking";
import Log from "./log/Log";
import { getBillsDetail } from "@/api/repairs/bills";
import { ORDER_STATUS } from "../../workOrder/const/columns";
import { dateFormatFull } from "@/utils/date";
export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          console.log(this.currentOrderInfo);
          this.currentOrderInfo = { ...value };
          this.getBillsDetail(this.currentOrderInfo.id);
        }
      },
      deep: true
    }
  },
  data() {
    return {
      tabs: [
        { name: "领料", id: "Picking" },
        { name: "退料/领退记录", id: "Log" }
      ],
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        { prop: "content", label: "", width: "120" }
      ],
      activeTab: "Picking",
      showHistory: false, // 维修履历
      currentOrderInfo: null,
      billInfo: {},
      carInfo: {},
      ORDER_STATUS
    };
  },
  components: {
    RepaireHistory,
    Picking,
    Log
  },
  computed: {
    tableData() {
      return [
        { name: "车型", content: this.carInfo.vehicleGroup },
        { name: "送修人", content: this.carInfo.contactsName },
        {
          name: "接待时间",
          content: dateFormatFull(this.carInfo.receptionTime)
        },
        { name: "进厂里程", content: `${this.carInfo.mileage}km` },
        { name: "存油量", content: this.carInfo.oilDegree },
        { name: "客户描述", content: this.carInfo.contactsRemark },
        { name: "接待描述", content: this.carInfo.receptionRemark },
        {
          name: "首次来厂日期",
          content: this.carInfo?.statistic?.firstComeDate
        },
        {
          name: "首次来厂里程",
          content: `${this.carInfo?.statistic?.firstComeMileage}km`
        },
        {
          name: "最后离厂日期",
          content: this.carInfo?.statistic?.lastLeaveDate
        },
        {
          name: "最后离厂里程",
          content: `${this.carInfo?.statistic?.lastLeaveMileage}km`
        },
        {
          name: "平均来厂里程",
          content: `${
            this.carInfo?.statistic?.mileageAvg
              ? this.carInfo?.statistic?.mileageAvg + "km/次"
              : ""
          }`
        },
        {
          name: "平均来厂频率",
          content: `${
            this.carInfo?.statistic?.monthAvg
              ? this.carInfo?.statistic?.monthAvg + "次 / 月"
              : ""
          }`
        },
        { name: "已维修次数", content: `${this.carInfo?.statistic?.count}次` }
      ];
    }
  },
  mounted() {
    this.currentOrderInfo = { ...this.orderInfo };
    this.getBillsDetail(this.currentOrderInfo.id);
  },
  methods: {
    getBillsDetail(id) {
      getBillsDetail(id).then(res => {
        const {
          vehicle,
          mileage,
          oilDegree,
          receptionTime,
          contactsName,
          contactsRemark,
          receptionRemark
        } = res;
        this.billInfo = { ...res };
        this.carInfo = {
          ...vehicle,
          mileage,
          oilDegree,
          receptionTime,
          contactsName,
          contactsRemark,
          receptionRemark
        };
      });
    },
    cellClassName({ columnIndex }) {
      if (columnIndex % 2 === 1) {
        return "text-font-primary";
      }
    },
    showPick() {
      console.log(123);
      this.activeTab = "Picking";
    }
  }
};
</script>

<style lang="scss" scoped>
.picking-part-wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // height: 100%;
}
.info-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: solid 1px #fff;
  background: #fff;
  border-radius: 5px;
  margin: 5px 0;
  .item {
    margin-right: 15px;
    .item-label {
      margin-right: 5px;
    }
    .item-value {
      color: #409eff;
    }
  }
  .info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    flex: 1;
    text-align: right;
    .log {
      width: 100px;
    }
    .info-pop {
      width: 100px;
    }
  }
}
</style>
