<template>
  <div class="kanban-box">
    <div
      class="kanban-top"
      v-if="hasBelongsPermWithoutRoute('read', 'workbench.retainVehicle')"
      :style="
        hasBelongsPermWithoutRoute('read', 'workbench.repairStatistic')
          ? 'height: calc(100% - 205px)'
          : 'height: 100%'
      "
    >
      <ht-card title="在厂车辆">
        <ht-tabs
          v-model="activeTab2"
          :tabs="tabList"
          class="ht-tabs tabs-regular"
          @change="changeTabs"
        />
        <ht-setting-table
          v-loading="loadings"
          :data="tableData"
          :columns="tableColumns"
          tableName="kanban-car"
          style="height: calc(100% - 35px);"
        />
      </ht-card>
    </div>
    <ht-card
      title="今日维修概况"
      class="kanban-bottom"
      v-if="hasBelongsPermWithoutRoute('read', 'workbench.repairStatistic')"
      :style="
        hasBelongsPermWithoutRoute('read', 'workbench.retainVehicle')
          ? 'height: 200px'
          : 'height: 100%;margin-top: 5px;'
      "
    >
      <ul class="kanban-ul">
        <li>
          <i></i>
          今日离厂
          <b style="font-size: 20px;padding: 0 5px">
            {{ statisticsData.leaveCount }}
          </b>
          台次
        </li>
        <li>
          <i></i>
          今日接待
          <b style="font-size: 20px;padding: 0 5px">
            {{ statisticsData.receptedCount }}
          </b>
          台次
        </li>
        <li>
          <i></i>
          在厂车辆
          <b style="font-size: 20px;padding: 0 5px">
            {{ statisticsData.retainCount }}
          </b>
          台次
        </li>
        <li style="width:45%">
          <i></i>
          今日收款
          <b style="font-size: 20px;padding: 0 5px">
            {{ Number(statisticsData.settleAmount).toFixed(2) }}
          </b>
          元
        </li>
        <li style="width:55%">
          <i></i>
          今日毛利
          <b style="font-size: 20px;padding: 0 5px">
            {{ Number(statisticsData.grossProfitAmount).toFixed(2) }}
          </b>
          元
        </li>
      </ul>
      <div class="btns">
        <el-button type="primary" plain @click="kanban('customer')">
          <i class="el-icon-data-board"></i>
          客户看板
        </el-button>
        <el-button type="primary" plain @click="kanban('workshop')">
          <i class="el-icon-data-board"></i>
          车间看板
        </el-button>
      </div>
    </ht-card>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants";
import { tabChangeMixin } from "@/mixins";
// import { ORDER_STATUS } from "@/views/repair/workOrder/const/columns";
import { openNewWindow } from "@/utils/tool";
import { userInfoMsg } from "@/utils/store";

import {
  repairsBoardsBillsList,
  repairsBoardsBillsCount,
  repairsBoardsBillStatistics
} from "@/api/workbench";

const ORDER_STATUS = {
  recepting: "接待中",
  repairing: "施工中",
  toFinancialConfirm: "待结算确认",
  toFinancial: "待收款交车",
  completed: "已完成"
};
export default {
  name: "repaire-kanban",
  mixins: [tabChangeMixin],
  data() {
    return {
      loadings: false,
      activeTab2: "",
      defaultTab: "total",
      tabsCount: {},
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
        { prop: "cooperatorName", label: "客户名称", width: CELL_WIDTH.date },
        { prop: "plateNumber", label: "车牌号", width: CELL_WIDTH.date },
        { prop: "vehicleGroup", label: "车型", width: CELL_WIDTH.name },
        {
          prop: "status",
          label: "当前状态",
          width: CELL_WIDTH.date,
          formatter: value => {
            return ORDER_STATUS[value];
          }
        }
      ],
      statisticsData: {
        settleAmount: "0.00",
        grossProfitAmount: "0.00",
        leaveCount: 0,
        receptedCount: 0,
        retainCount: 0
      },
      ORDER_STATUS: ORDER_STATUS
    };
  },
  computed: {
    tabList() {
      return [
        {
          id: "total",
          name: "全部",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.total}
                max={99}
                hidden={!this.tabsCount.total}
              />
            </span>
          )
        },
        {
          id: "recepting",
          name: "接待中",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.recepting}
                max={99}
                hidden={!this.tabsCount.recepting}
              />
            </span>
          )
        },
        {
          id: "repairing",
          name: "施工中",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.repairing}
                max={99}
                hidden={!this.tabsCount.repairing}
              />
            </span>
          )
        },
        {
          id: "toFinancialConfirm",
          name: "待结算确认",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.toFinancialConfirm}
                max={99}
                hidden={!this.tabsCount.toFinancialConfirm}
              />
            </span>
          )
        },
        {
          id: "toFinancial",
          name: "待收款交车",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.toFinancial}
                max={99}
                hidden={!this.tabsCount.toFinancial}
              />
            </span>
          )
        }
      ];
    }
  },
  created() {
    this.refreshHandle();
  },
  methods: {
    changeTabs() {
      this.refreshHandle();
    },
    refreshHandle() {
      if (this.hasBelongsPermWithoutRoute("read", "workbench.retainVehicle")) {
        this.loadTabsCount();
        this.loadList();
      }
      if (
        this.hasBelongsPermWithoutRoute("read", "workbench.repairStatistic")
      ) {
        this.loadStatistics();
      }
    },
    loadTabsCount() {
      this.loadings = true;
      repairsBoardsBillsCount()
        .then(res => {
          this.tabsCount = {
            total: res.totalCount,
            recepting: res.receptingCount,
            repairing: res.repairingCount,
            toFinancialConfirm: res.toFinancialConfirmCount,
            toFinancial: res.toFinancialCount
          };
          this.loadings = false;
        })
        .catch(() => {
          this.loadings = false;
        });
    },
    loadList() {
      this.loadings = true;
      repairsBoardsBillsList({
        status: this.activeTab2 != "total" ? this.activeTab2 : ""
      })
        .then(res => {
          this.tableData = res || [];
          this.loadings = false;
        })
        .catch(() => {
          this.loadingss = false;
        });
    },
    loadStatistics() {
      repairsBoardsBillStatistics()
        .then(res => {
          // settleAmount: "0.00",
          // grossProfitAmount: "0.00",
          // leaveCount: 0,
          // receptedCount: 0,
          // retainCount: 0
          this.statisticsData.settleAmount =
            Number(res.bill.settleAmount) +
            Number(res.insurance.settleAmount) +
            Number(res.washing.settleAmount);
          this.statisticsData.grossProfitAmount =
            Number(res.bill.grossProfitAmount) +
            Number(res.insurance.grossProfitAmount) +
            Number(res.washing.grossProfitAmount);
          this.statisticsData.leaveCount =
            Number(res.bill.leaveCount) +
            Number(res.insurance.leaveCount) +
            Number(res.washing.leaveCount);
          this.statisticsData.receptedCount =
            Number(res.bill.receptedCount) +
            Number(res.insurance.receptedCount) +
            Number(res.washing.receptedCount);
          this.statisticsData.retainCount =
            Number(res.bill.retainCount) +
            Number(res.insurance.retainCount) +
            Number(res.washing.retainCount);
          this.loadings = false;
        })
        .catch(() => {
          this.loadings = false;
        });
    },
    kanban(type) {
      openNewWindow(
        this.$router.resolve({
          // eslint-disable-next-line prettier/prettier
          path: `/Workbench/index?type=${type}&companyName=${userInfoMsg().companyName}`
        }).href,
        "workbench"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.kanban-box {
  height: 100%;
  ::v-deep {
    .kanban-top {
      margin: 5px 0;
      .box-card {
        height: 100%;
        .el-card__body {
          height: calc(100% - 37px);
        }
      }
    }
    .kanban-bottom {
      height: 200px;
      .kanban-ul {
        overflow: hidden;
        margin: 0 10px 15px;
        padding: 0;
        li {
          float: left;
          width: 33%;
          padding: 10px 0 5px;
          i {
            position: relative;
            top: 2px;
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 5px;
            border-radius: 50%;
            background: $color-primary;
            @include background_color("color-primary");
          }
        }
      }
    }
    .btns .el-button {
      float: left;
      width: calc(50% - 5px);
    }
    .el-table--border {
      border-right: 1px solid #e8eaef;
      border-bottom: 1px solid #e8eaef;
    }
  }
}
</style>
