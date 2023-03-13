<template>
  <el-dialog
    title="会员卡详情"
    v-loading="loading || load"
    :visible.sync="visible"
    :close-on-click-modal="false"
    append-to-body
    width="1180px"
    @closed="closed"
  >
    <div class="input-item">
      <div class="input-label">选择客户</div>
      <div class="input-content">
        <el-select
          class="width-300"
          size="small"
          value-key="id"
          v-model="checkedCustomer"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="queryCustomers"
          :loading="selectLoading"
          @change="changeCheckedCustomer"
        >
          <template v-for="item in customerOptions">
            <el-option
              v-if="item.cardServiceCount"
              :key="item.id"
              :label="
                item.customerType === 1
                  ? `${item.name}-${item.contacts}-${item.phone}`
                  : `${item.contacts}-${item.phone}`
              "
              :value="item"
            >
            </el-option>
          </template>
        </el-select>
      </div>
      <div class="user-info">
        <template v-if="checkedCustomer.customerType === 0">
          <div class="m-r-16">客户名称：{{ checkedCustomer.contacts }}</div>
          <div class="m-r-16">客户电话：{{ checkedCustomer.phone }}</div>
          <div class="m-r-16">
            已有会员卡：{{ checkedCustomer.cardServiceCount }}
          </div>
        </template>
        <template v-if="checkedCustomer.customerType === 1">
          <div class="m-r-16">公司名称：{{ checkedCustomer.name }}</div>
          <div class="m-r-16">主联系人姓名：{{ checkedCustomer.contacts }}</div>
          <div class="m-r-16">主联系人电话：{{ checkedCustomer.phone }}</div>
          <div class="m-r-16">
            已有会员卡：{{ checkedCustomer.cardServiceCount }}
          </div>
        </template>
      </div>
    </div>
    <div v-show="checkedCustomer && checkedCustomer.id">
      <!-- 会员卡列表 -->
      <div class="card-list">
        <CardItem
          buttonText="详情"
          v-for="(item, index) in cardServices"
          :key="index"
          :item="item"
          :class="{ 'is-active': item.active }"
          :style="{
            boxShadow: item.active ? `0 4px 17px -5px ${item.color}` : 'none'
          }"
          @handleClick="handleCard"
        ></CardItem>
      </div>
      <!-- 卡信息 -->
      <div class="card-container" v-if="cardServiceInfo.id">
        <!-- <div class="card-title-wrap"> -->
        <div class="card-title">
          卡信息<el-tooltip
            v-if="cardServiceInfo.descreption"
            effect="dark"
            :content="cardServiceInfo.descreption"
            placement="bottom"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <el-row :gutter="16">
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">卡种：</div>
              <div class="panel-content" :title="cardServiceInfo.name">
                {{ cardServiceInfo.name }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">卡号：</div>
              <div class="panel-content" :title="cardServiceInfo.cardNo">
                {{ cardServiceInfo.cardNo }}
              </div>
            </div>
          </el-col>
          <el-col :span="4" v-if="isGarage">
            <div class="panel-item">
              <div class="panel-label">可用车辆：</div>
              <div
                class="panel-content"
                v-if="
                  cardServiceInfo.useLimit && cardServiceInfo.useLimit.vehicle
                "
                :title="
                  cardServiceInfo.useLimit.vehicle.limit
                    ? cardServiceInfo.useLimit.vehicle.rows
                        .map(item => item.name)
                        .join('、')
                    : '不限车辆'
                "
              >
                {{
                  cardServiceInfo.useLimit.vehicle.limit
                    ? cardServiceInfo.useLimit.vehicle.rows
                        .map(item => item.name)
                        .join("、")
                    : "不限车辆"
                }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">卡状态：</div>
              <div class="panel-content" :title="cardServiceInfo.statusName">
                {{ cardServiceInfo.statusName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label color-secondary">开卡价格：</div>
              <div
                class="panel-content"
                :title="
                  cardServiceInfo.free ? '开卡免费' : cardServiceInfo.price
                "
              >
                {{ cardServiceInfo.free ? "开卡免费" : cardServiceInfo.price }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">开卡人：</div>
              <div class="panel-content" :title="cardServiceInfo.openerName">
                {{ cardServiceInfo.openerName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">开卡人电话：</div>
              <div class="panel-content" :title="cardServiceInfo.openerPhone">
                {{ cardServiceInfo.openerPhone }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">开卡日期：</div>
              <div class="panel-content" :title="cardServiceInfo.createdAt">
                {{ cardServiceInfo.createdAt }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">操作人：</div>
              <div class="panel-content" :title="cardServiceInfo.createdBy">
                {{ cardServiceInfo.createdBy }}
              </div>
            </div>
          </el-col>
          <el-col :span="12" v-if="!isRejected">
            <div class="panel-item">
              <div class="panel-label">卡折扣：</div>
              <div
                class="panel-content color-warning"
                v-if="
                  cardServiceInfo.discount && cardServiceInfo.discount.detail
                "
              >
                <span
                  class="m-r-16"
                  v-if="isGarage && cardServiceInfo.discount.detail.projectChecked"
                >
                  项目折扣{{ cardServiceInfo.discount.detail.project }}折
                </span>
                <span
                  class="m-r-16"
                  v-if="cardServiceInfo.discount.detail.partChecked"
                >
                  配件折扣{{ cardServiceInfo.discount.detail.part }}折
                </span>
                <span v-if="isGarage && cardServiceInfo.discount.detail.packageChecked">
                  套餐折扣{{ cardServiceInfo.discount.detail.package }}折
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="panel-item" v-if="!isRejected">
          <div class="panel-label">折扣有效期：</div>
          <div class="panel-content" v-html="cardServiceDiscountIndate"></div>
        </div>
        <div class="panel-item">
          <div class="panel-label">开卡备注：</div>
          <div class="panel-content" :title="cardServiceInfo.remarks">
            {{ cardServiceInfo.remarks }}
          </div>
        </div>
      </div>
      <!-- 卡余额 -->
      <div
        class="card-container"
        v-if="cardServiceInfo.cardBalance && !isRejected"
      >
        <div class="card-title">卡余额</div>
        <div class="panel-item">
          <div class="strong">现金储值余额：</div>
          <div class="color-warning">
            ￥{{ cardServiceInfo.cardBalance.cash }}
          </div>
        </div>
        <template v-if="isGarage">
          <div class="panel-item">
            <div class="strong">项目剩余：</div>
            <div class="color-warning">
              共剩余可使用项目{{ projectData.number }}个 剩余可使用数量{{
                projectData.total
              }}
            </div>
          </div>
          <el-table
            class="table-base m-b-16"
            size="small"
            :data="cardServiceInfo.cardBalance.projects"
            stripe
            border
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="goodsCode"
              label="项目编码"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="goodsName"
              label="项目名称"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="qty"
              label="总数量"
              show-overflow-tooltip
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="类型"
              show-overflow-tooltip
              min-width="60"
            ></el-table-column>
            <el-table-column
              prop="usedQty"
              label="已使用数量"
              show-overflow-tooltip
              min-width="82"
            ></el-table-column>
            <el-table-column
              prop="remainQty"
              label="剩余数量"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="createdAt"
              label="充值时间"
              show-overflow-tooltip
              min-width="142"
            ></el-table-column>
            <el-table-column label="有效期" show-overflow-tooltip width="260">
              <template slot-scope="scope">
                <span v-if="scope.row.endDate === null">
                  永久有效
                </span>
                <span v-else-if="scope.row.loseEfficacy">
                  {{ `${scope.row.endDate} 已失效` }}
                </span>
                <span v-else-if="scope.row.endDaysStr" class="color-error">
                  {{
                    `${scope.row.endDate} 距过期还有${scope.row.endDaysStr}天！`
                  }}
                </span>
                <span v-else>
                  {{ scope.row.endDate }}
                </span>
              </template>
            </el-table-column>
          </el-table>

          <div class="panel-item">
            <div class="strong">套餐剩余：</div>
            <div class="color-warning">
              共剩余可使用套餐{{ packageData.number }}个 剩余可使用数量{{
                packageData.total
              }}
            </div>
          </div>
          <el-table
            class="table-base m-b-8"
            size="small"
            :data="cardServiceInfo.cardBalance.packages"
            stripe
            border
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="goodsCode"
              label="套餐编码"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="goodsName"
              label="套餐名称"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="qty"
              label="总数量"
              show-overflow-tooltip
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="类型"
              show-overflow-tooltip
              min-width="60"
            ></el-table-column>
            <el-table-column
              prop="usedQty"
              label="已使用数量"
              show-overflow-tooltip
              min-width="82"
            ></el-table-column>
            <el-table-column
              prop="remainQty"
              label="剩余数量"
              show-overflow-tooltip
              width="144"
            ></el-table-column>
            <el-table-column
              prop="createdAt"
              label="充值时间"
              show-overflow-tooltip
              min-width="142"
            ></el-table-column>
            <el-table-column label="有效期" show-overflow-tooltip width="260">
              <template slot-scope="scope">
                <span v-if="scope.row.endDate === null">
                  永久有效
                </span>
                <span v-else-if="scope.row.loseEfficacy">
                  {{ `${scope.row.endDate} 已失效` }}
                </span>
                <span v-else-if="scope.row.endDaysStr" class="color-error">
                  {{
                    `${scope.row.endDate} 距过期还有${scope.row.endDaysStr}天！`
                  }}
                </span>
                <span v-else>
                  {{ scope.row.endDate }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>

    <div slot="footer" style="text-align: center;">
      <el-button size="small" @click="hide">取消</el-button>
      <el-button size="small" type="primary" @click="hide">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getCustomers,
  getMemberCardServices,
  getMemberCardServiceInfo
} from "../../services";
import CardItem from "./cardItem.vue";

export default {
  name: "CardServiceInfoDialog",
  components: {
    CardItem
  },
  props: {
    isGarage: Boolean,
    now: Object
  },
  computed: {
    // 已退卡
    isRejected() {
      let state = false;
      const cardServiceInfo = this.cardServiceInfo;
      if (cardServiceInfo.status && cardServiceInfo.status === 3) {
        state = true;
      }
      return state;
    },
    // 卡服务折扣有效期
    cardServiceDiscountIndate() {
      let str = "";
      const discount = this.cardServiceInfo.discount;
      if (discount && discount.indate) {
        if (discount.indate.limit === false) {
          str = "永久有效";
        } else if (discount.indate.date) {
          if (discount.indate.str) {
            str = discount.indate.date + " " + discount.indate.str;
            str = `${discount.indate.date} <span class="${
              discount.indate.str === "已失效" ? "color-hint" : "color-error"
            }">${discount.indate.str}</span>`;
          } else {
            str = discount.indate.date;
          }
        }
      }
      return str;
    },
    projectData() {
      const data = {
        total: 0,
        number: 0
      };
      const list =
        (this.cardServiceInfo.cardBalance &&
          this.cardServiceInfo.cardBalance.projects) ||
        [];
      const validityList = [];
      if (list.length) {
        data.total = list.reduce((total, item) => {
          let sum = total;
          if (!item.loseEfficacy) {
            sum += Number(item.remainQty);
            validityList.push(item.swGoodsId);
          }
          return sum;
        }, 0);
        data.number = [...new Set(validityList)].length;
      }
      return data;
    },
    packageData() {
      const data = {
        total: 0,
        number: 0
      };
      const list =
        (this.cardServiceInfo.cardBalance &&
          this.cardServiceInfo.cardBalance.packages) ||
        [];
      const validityList = [];
      if (list.length) {
        data.total = list.reduce((total, item) => {
          let sum = total;
          if (!item.loseEfficacy) {
            sum += Number(item.remainQty);
            validityList.push(item.swGoodsId);
          }
          return sum;
        }, 0);
        data.number = [...new Set(validityList)].length;
      }
      return data;
    }
  },
  data() {
    return {
      visible: true,
      loading: false,
      load: false,
      selectLoading: false,
      customerOptions: [],
      checkedCustomer: {},
      cardServices: [], // 会员卡服务列表
      cardServiceInfo: {}, // 会员卡服务详情
      // 卡余额
      cardBalance: {
        cash: "", // 现金余额
        // 服务项目
        projects: [],
        // 套餐
        packages: []
      }
    };
  },
  methods: {
    hide() {
      this.visible = false;
    },
    closed() {
      this.$emit("hide");
    },
    // 获取客户列表
    queryCustomers(keyword, isOnce) {
      this.selectLoading = true;
      getCustomers({
        keyword
      })
        .then(res => {
          this.customerOptions = res || [];
          if (isOnce === true) {
            const findData = this.customerOptions.find(
              item => item.id === this.now.customerId
            );
            if (findData) {
              this.checkedCustomer = findData;
              this.queryMemberCardServices();
            }
          }
          this.selectLoading = false;
        })
        .catch(() => {
          this.customerOptions = [];
          this.selectLoading = false;
        });
    },
    // 选择客户
    changeCheckedCustomer() {
      // 会员卡服务列表
      this.queryMemberCardServices();
    },
    // 获取会员卡服务列表
    queryMemberCardServices() {
      if (!this.checkedCustomer.id) return;
      const params = {
        customerId: this.checkedCustomer.id,
        page: 1,
        pageSize: 1000
      };
      getMemberCardServices(params)
        .then(res => {
          this.cardServices = res.rows || [];
          const findData = this.cardServices.find(
            item => item.id === this.now.id
          );
          if (findData) {
            this.handleCard(findData);
          } else {
            this.cardServiceInfo = {};
          }
          this.loading = false;
        })
        .catch(() => {
          this.cardServices = [];
          this.cardServiceInfo = {};
          this.loading = false;
        });
    },
    // 点击详情
    handleCard(data) {
      if (data.id === this.cardServiceInfo.id) return;
      this.cardServices.forEach(item => {
        if (item.id === data.id) {
          if (!item.active) {
            item.active = true;
          }
        } else {
          item.active = false;
        }
      });
      this.getMemberCardServiceInfo(data.id);
    },
    // 会员卡服务详情
    getMemberCardServiceInfo(id) {
      this.load = true;
      this.cardServiceInfo = {};
      getMemberCardServiceInfo(id)
        .then(res => {
          this.cardServiceInfo = res || {};
          this.load = false;
        })
        .catch(() => {
          this.cardServiceInfo = {};
          this.load = false;
        });
    },
    tableRowClassName({ row }) {
      if (row.loseEfficacy) {
        return "cell-disabled";
      }
      return "";
    }
  },
  created() {
    let keyword = "";
    if (this.now) {
      keyword = this.now.customerContacts;
    }
    this.queryCustomers(keyword, true);
  }
};
</script>

<style lang="less" scoped>
/deep/ .table-base {
  .el-table__body {
    .cell-disabled {
      .cell {
        color: @text-color-hint;
      }
    }
  }
}
/deep/ .el-dialog {
  .el-dialog__body {
    max-height: 600px;
    // padding-bottom: 0;
    overflow-y: auto;
    background-color: #ffffff;
    .width-105 {
      width: 105px;
    }
    .width-112 {
      width: 112px;
    }
    .width-130 {
      width: 130px;
    }
    .width-166 {
      width: 166px;
    }
    .width-224 {
      width: 224px;
    }
    .width-300 {
      width: 300px;
    }
    .width-776 {
      width: 776px;
    }
    .input-item {
      display: flex;
      align-items: center;
      margin-bottom: @margin-size-secondary;
      line-height: 22px;
      &.flex-top {
        align-items: flex-start;
      }
      .input-label {
        margin-right: @margin-size-secondary;
      }
      .user-info {
        flex: 1;
        overflow: hidden;
        margin-left: 24px;
        color: @color-warning;
        display: flex;
        flex-wrap: wrap;
        .user-info-item {
          .cmargin-right {
            margin-right: @margin-size-main;
          }
        }
      }
    }
    .panel-item {
      display: flex;
      line-height: 22px;
      margin-bottom: @margin-size-secondary;
      .panel-label {
        color: #666666;
      }
      .panel-content {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .card-list-wrap {
      margin-top: @margin-size-secondary;
      height: 126px;
      overflow-x: auto;
      overflow-y: hide;
    }
    .card-list {
      padding: @padding-size-secondary 0;
      overflow-x: auto;
      overflow-y: hide;
      white-space: nowrap;
      .card-add {
        float: left;
        box-sizing: border-box;
        width: 117px;
        height: 126px;
        margin: 0;
        padding: 0;
        border: 1px solid @border-color-base;
        border-radius: 2px;
        color: @text-color-secondary;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        .el-icon-plus {
          margin-bottom: @margin-size-main;
          font-size: 24px;
          color: @text-color-secondary;
        }
      }
    }
    .card-container {
      margin-top: @margin-size-secondary;
      padding: @padding-size-secondary @padding-size-secondary 0;
      overflow: hidden; // BFC
      background: @bg-color-base;
      border-radius: 2px;
      .card-title {
        font-weight: @strong;
        line-height: 24px;
        font-size: 16px;
        margin-bottom: @margin-size-secondary;
      }
      .el-icon-question {
        margin-left: @margin-size-secondary;
        font-size: 16px;
        line-height: 24px;
        color: @color-warning;
        cursor: pointer;
      }
    }
    .radio-list {
      display: flex;
      align-items: center;
      .radio-item {
        display: inline-block;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 14px;
        margin-right: @margin-size-secondary;
        padding: @padding-size-secondary @padding-size-main;
        border: 1px solid @border-color-base;
        border-radius: 2px;
        color: @text-color-secondary;
        cursor: pointer;
        position: relative;
        .ico-checked {
          position: absolute;
          right: 0;
          bottom: 0;
          display: none;
        }
        &.is-checked {
          color: @color-link;
          border-color: @color-link;
          .ico-checked {
            display: block;
          }
        }
      }
    }
  }
  .el-dialog__footer {
    border-top: 1px solid @border-color-base;
    padding: 12px 0;
  }
}
</style>
