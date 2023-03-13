<template>
  <el-row :gutter="16" style="margin:10px 0;">
    <el-col
      class="content_height"
      style="background:#ffffff;padding:16px;height:960px;"
      :span="12"
    >
      <h4 class="right_table_title">
        <span class="border"></span>
        当前配件库存排行
        <el-select
          v-model="stockType"
          style="width:224px;float:right"
          size="small"
          @change="changeConditions"
        >
          <el-option :value="0" label="看实际库存"></el-option>
          <el-option :value="1" label="看动态库存"></el-option>
          <el-option :value="2" label="看锁定库存"></el-option>
        </el-select>
      </h4>

      <div @click="toStockSearch">
        <el-table
          :data="tableData"
          border
          style="width: 100%; cursor:pointer;"
          @sort-change="sortChange"
          :default-sort="{ prop: 'amount', order: 'descending' }"
        >
          <el-table-column
            type="index"
            prop="index"
            width="50"
            label="序号"
            style="cursor:pointer"
            align="center"
          >
            <template slot-scope="scope">
              <span
                class="icon-order"
                :class="{
                  'order-one': scope.$index == 0,
                  'order-two': scope.$index == 1,
                  'order-three': scope.$index == 2
                }"
                >{{
                  scope.$index != 0 && scope.$index != 1 && scope.$index != 2
                    ? scope.$index + 1
                    : ""
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="partName" label="配件名称"></el-table-column>
          <el-table-column prop="partCode" label="配件编码"></el-table-column>
          <el-table-column
            prop="qty"
            label="库存数量"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="库存金额"
            sortable="custom"
          ></el-table-column>
          <el-table-column label="占库存金额比例" sortable="custom">
            <template slot-scope="props">
              {{ (Number(props.row.amountRatio) * 100).toFixed(2) }}%
            </template>
          </el-table-column>
          <el-table-column label="月库存周转率" sortable="custom"
            ><template slot-scope="props">
              {{
                Number(props.row.monthInventoryTurnOver || 0)
                  ? Number(props.row.monthInventoryTurnOver).toFixed(2)
                  : 0
              }}
            </template></el-table-column
          >
          <el-table-column label="年库存周转率" sortable="custom"
            ><template slot-scope="props">
              {{
                Number(props.row.yearInventoryTurnOver || 0)
                  ? Number(props.row.yearInventoryTurnOver).toFixed(2)
                  : 0
              }}
            </template></el-table-column
          >
        </el-table>
      </div>
    </el-col>
    <el-col class="content_height" :span="12" style="padding-right:0">
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          采/销待仓库审核
          <p class="detail_info">
            未完成
            <span
              >单据数
              <span class="num">{{
                purchaseOrSale && purchaseOrSale.unfinish
                  ? purchaseOrSale.unfinish.billCount
                  : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    purchaseOrSale && purchaseOrSale.unfinish
                      ? purchaseOrSale.unfinish.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_purple">
            <h4 class="status">
              <span class="status_icon "></span>
              采购到货
            </h4>
            <span
              >单据数
              <span class="num">{{
                purchaseOrSale && purchaseOrSale.purchaseArrival
                  ? purchaseOrSale.purchaseArrival.billCount
                  : 0
              }}</span></span
            >
            <br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    purchaseOrSale && purchaseOrSale.purchaseArrival
                      ? purchaseOrSale.purchaseArrival.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_blue">
            <h4 class="status">
              <span class="status_icon "></span>
              急件到货
            </h4>
            <span
              >单据数
              <span class="num">{{
                purchaseOrSale && purchaseOrSale.urgentArrival
                  ? purchaseOrSale.urgentArrival.billCount
                  : 0
              }}</span></span
            ><br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    purchaseOrSale && purchaseOrSale.urgentArrival
                      ? purchaseOrSale.urgentArrival.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green">
            <h4 class="status">
              <span class="status_icon "></span>
              采购退货
            </h4>
            <span
              >单据数
              <span class="num">{{
                purchaseOrSale && purchaseOrSale.purchaseReturn
                  ? purchaseOrSale.purchaseReturn.billCount
                  : 0
              }}</span></span
            ><br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    purchaseOrSale && purchaseOrSale.purchaseReturn
                      ? purchaseOrSale.purchaseReturn.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_orange">
            <h4 class="status">
              <span class="status_icon "></span>
              销售出库
            </h4>
            <span
              >单据数
              <span class="num">{{
                purchaseOrSale && purchaseOrSale.saleStockOut
                  ? purchaseOrSale.saleStockOut.billCount
                  : 0
              }}</span></span
            ><br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    purchaseOrSale && purchaseOrSale.saleStockOut
                      ? purchaseOrSale.saleStockOut.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_grey">
            <h4 class="status">
              <span class="status_icon "></span>
              销售退货
            </h4>
            <span
              >单据数
              <span class="num">{{
                purchaseOrSale && purchaseOrSale.saleReturn
                  ? purchaseOrSale.saleReturn.billCount
                  : 0
              }}</span></span
            ><br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    purchaseOrSale && purchaseOrSale.saleReturn
                      ? purchaseOrSale.saleReturn.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
        </div>
      </div>
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          盘点
          <p class="detail_info">
            未完成
            <span
              >单据数
              <span class="num">{{
                stockTaking && stockTaking.unfinish
                  ? stockTaking.unfinish.billCount
                  : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    stockTaking && stockTaking.unfinish
                      ? stockTaking.unfinish.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange">
            <h4 class="status">
              <span class="status_icon "></span>
              待提交
            </h4>
            <span
              >单据数
              <span class="num">{{
                stockTaking && stockTaking.toSubmit
                  ? stockTaking.toSubmit.billCount
                  : 0
              }}</span></span
            ><br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    stockTaking && stockTaking.toSubmit
                      ? stockTaking.toSubmit.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_blue">
            <h4 class="status">
              <span class="status_icon "></span>
              待财务审核
            </h4>
            <span
              >单据数
              <span class="num">{{
                stockTaking && stockTaking.toFinancial
                  ? stockTaking.toFinancial.billCount
                  : 0
              }}</span></span
            ><br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    stockTaking && stockTaking.toFinancial
                      ? stockTaking.toFinancial.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green">
            <h4 class="status">
              <span class="status_icon "></span>
              待仓库审核
            </h4>
            <span
              >单据数
              <span class="num">{{
                stockTaking && stockTaking.toStock
                  ? stockTaking.toStock.billCount
                  : 0
              }}</span></span
            ><br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    stockTaking && stockTaking.toStock
                      ? stockTaking.toStock.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div style="opacity:0" class="status_each status_green"></div>
          <div style="opacity:0" class="status_each status_green"></div>
        </div>
      </div>
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          移仓
          <p class="detail_info">
            未完成
            <span
              >单据数
              <span class="num">{{
                stockMoving && stockMoving.unfinish
                  ? stockMoving.unfinish.billCount
                  : 0
              }}</span></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange">
            <h4 class="status">
              <span class="status_icon "></span>
              移除待提交
            </h4>
            <span
              >单据数
              <span class="num">{{
                stockMoving && stockMoving.outToSubmit
                  ? stockMoving.outToSubmit.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div class="status_each status_purple">
            <h4 class="status">
              <span class="status_icon "></span>
              移入待确认
            </h4>
            <span
              >单据数
              <span class="num">{{
                stockMoving && stockMoving.inToAudit
                  ? stockMoving.inToAudit.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div style="opacity:0" class="status_each status_green"></div>
          <div style="opacity:0" class="status_each status_green"></div>
          <div style="opacity:0" class="status_each status_green"></div>
        </div>
      </div>
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          收货处理
          <p class="detail_info">
            未完成
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterReceive && LogisticRegisterReceive.unfinish
                  ? LogisticRegisterReceive.unfinish.billCount
                  : 0
              }}</span></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange">
            <h4 class="status">
              <span class="status_icon "></span>
              待登记
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterReceive && LogisticRegisterReceive.toRegister
                  ? LogisticRegisterReceive.toRegister.billCount
                  : 0
              }}</span></span
            >
            <br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    LogisticRegisterReceive &&
                      LogisticRegisterReceive.toRegister
                      ? LogisticRegisterReceive.toRegister.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_purple">
            <h4 class="status">
              <span class="status_icon "></span>
              待确认
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterReceive && LogisticRegisterReceive.toConfirm
                  ? LogisticRegisterReceive.toConfirm.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div class="status_each status_blue">
            <h4 class="status">
              <span class="status_icon "></span>
              待结算
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterReceive && LogisticRegisterReceive.toSettle
                  ? LogisticRegisterReceive.toSettle.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div class="status_each status_green">
            <h4 class="status">
              <span class="status_icon "></span>
              待签收
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterReceive && LogisticRegisterReceive.toReceive
                  ? LogisticRegisterReceive.toReceive.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div style="opacity:0" class="status_each status_green"></div>
        </div>
      </div>
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          发货处理
          <p class="detail_info">
            未完成
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterDeliver && LogisticRegisterDeliver.unfinish
                  ? LogisticRegisterDeliver.unfinish.billCount
                  : 0
              }}</span></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange">
            <h4 class="status">
              <span class="status_icon "></span>
              待登记
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterDeliver && LogisticRegisterDeliver.toRegister
                  ? LogisticRegisterDeliver.toRegister.billCount
                  : 0
              }}</span></span
            >
            <br />
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    LogisticRegisterDeliver &&
                      LogisticRegisterDeliver.toRegister
                      ? LogisticRegisterDeliver.toRegister.amount
                      : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_purple">
            <h4 class="status">
              <span class="status_icon "></span>
              待确认
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterDeliver && LogisticRegisterDeliver.toConfirm
                  ? LogisticRegisterDeliver.toConfirm.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div class="status_each status_blue">
            <h4 class="status">
              <span class="status_icon "></span>
              待结算
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterDeliver && LogisticRegisterDeliver.toSettle
                  ? LogisticRegisterDeliver.toSettle.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div class="status_each status_green">
            <h4 class="status">
              <span class="status_icon "></span>
              待签收
            </h4>
            <span
              >单据数
              <span class="num">{{
                LogisticRegisterDeliver && LogisticRegisterDeliver.toReceive
                  ? LogisticRegisterDeliver.toReceive.billCount
                  : 0
              }}</span></span
            >
          </div>
          <div style="opacity:0" class="status_each status_green"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { loadReportOrderList } from "@/api/storeReport";
import { unitConvert } from "../../../common/common";
export default {
  name: "BottomContent",
  data() {
    return {
      purchaseOrSale: null,
      stockTaking: null,
      stockMoving: null,
      LogisticRegisterReceive: null,
      LogisticRegisterDeliver: null,
      dash: {},
      tableData: [],
      sortType: null,
      sortStytle: null,
      stockType: 0,
      sortParam: {
        column: "amount",
        mode: "DESC"
      } //默认按库存金额排序
    };
  },
  props: {
    panelData: Object,
    searachParams: Object
  },
  watch: {
    panelData: {
      deep: true, // 深度监听
      handler(newVal) {
        if (newVal) {
          this.getPanelList();
          this.purchaseOrSale = newVal.todo.purchaseOrSale; //采/销待仓库审核
          this.stockTaking = newVal.todo.stockTaking; //盘点
          this.stockMoving = newVal.todo.stockMoving; //移仓
          this.LogisticRegisterReceive = newVal.todo.LogisticRegisterReceive; //收货登记
          this.LogisticRegisterDeliver = newVal.todo.LogisticRegisterDeliver; //发货登记
        }
      }
    },
    searachParams: {
      deep: true,
      handler(newVal) {
        this.companyIds = newVal.companyIds;
        this.warehouseIds = newVal.warehouseIds;
      }
    }
  },
  methods: {
    unitConvert: unitConvert,
    sortChange(sortParams) {
      this.sortParam = {
        column: sortParams.prop
      };
      if (sortParams.order === "ascending") {
        this.sortParam.mode = "ASC";
      } else if (sortParams.order === "descending") {
        this.sortParam.mode = "DESC";
      } else {
        this.sortParam.mode = null;
      }
      this.getPanelList();
    },
    changeConditions() {
      this.getPanelList();
    },
    getPanelList() {
      const params = {
        companyIds: this.companyIds,
        warehouseIds: this.warehouseIds,
        order: this.sortParam,
        stockType: this.stockType
      };
      return loadReportOrderList(params)
        .then(res => {
          this.tableData = res;
        })
        .catch(() => {});
    },
    toStockSearch() {
      const reportSearch = {
        qtyLimitType: 0,
        qty: 0,
        summaryType: "all",
        summaryTypesData: {
          flagPart: true,
          flagProperty: false,
          flagWarehouseId: true,
          flagPositionId: false,
          flagBatchNo: false,
          flagOwnerCompanyId: true,
          flagSupplierId: false
        }
      };
      this.$router.push({
        name: "StocksSearch",
        query: { reportSearch }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content_height {
  height: 802px;
  border-radius: 6px;
  .main_div {
    height: 148px;
    display: flex;
    justify-content: space-between;
    .eachPanel {
      background: #ffffff;
      height: 148px;
      border-radius: 6px;
      margin-right: 10px;
      padding: 15px;
      flex: 1;
      &:nth-last-child(1) {
        margin: 0;
      }
      h4 {
        font-size: 16px;
        font-weight: 600;
        .icon {
          width: 22px;
          height: 22px;
          display: inline-block;
          background-size: 100% 100%;
          position: relative;
          bottom: 2px;
          &.icon-zaitu {
            background-image: url("~@/assets/images/icon-zaitu.png");
          }
          &.icon-zaiding {
            background-image: url("~@/assets/images/icon-zaiding.png");
          }
          &.icon-xuqiu {
            background-image: url("~@/assets/images/icon-xuqiu.png");
          }
          &.icon-chaochu {
            background-image: url("~@/assets/images/icon-chaochu.png");
          }
          &.icon-quehuo {
            background-image: url("~@/assets/images/icon-quehuo.png");
          }
        }
      }
      span {
        font-weight: 400;
        min-width: 120px;
        width: 50%;
        font-size: 14px;
        display: inline-block;
        color: #666666;
      }
    }
  }
  .main_div_each {
    margin-bottom: 10px;
    width: 100%;
    height: 184px;
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    .border {
      top: 1px;
    }
    .title {
      margin: 16px 22.2px 0 16px;
      font-size: 16px;
      color: #171f24;
      padding-left: 8px;
      font-weight: 600;
      .detail_info {
        float: right;
        margin: 0;
        white-space: nowrap;
        span {
          font-weight: 400;
          margin: 0 5px;
          font-size: 14px;
          color: #151515;
          line-height: 22px;
          .num {
            padding: 0 0 0 10px;
            color: #3aa7ff;
          }
          .price {
            padding: 0 0 0 10px;
            color: #ee6723;
          }
        }
      }
    }
    .status_div {
      margin: 10px 16px 0;
      width: 100%;
      height: 138px;
      display: flex;
      .status_each {
        flex: 1;
        margin: 0 10px 0 0;
        height: 114px;
        background: #fafafa;
        border-radius: 6px;
        padding: 16px;
        .num {
          padding: 0 0 0 10px;
        }
        .price {
          padding: 0 0 0 10px;
        }
        .status {
          font-size: 16px;
          margin: 0 0 16px;
          .status_icon {
            margin-right: 5px;
            width: 12px;
            height: 12px;
            background: #ffffff;
            display: inline-block;
            border: 3px solid #3aa7ff;
            border-radius: 50%;
          }
        }
        &.status_orange {
          .status_icon {
            border-color: #f5a623;
          }
          &:hover {
            border-bottom: 7px solid #f5a623;
            background: #ffffff;
            box-shadow: 0 2px 6px 0 rgba(245, 166, 35, 0.4);
          }
        }
        &.status_blue {
          .status_icon {
            border-color: #3aa7ff;
          }
          &:hover {
            border-bottom: 7px solid #3aa7ff;
            background: #ffffff;
            box-shadow: 0 2px 6px 0 rgba(58, 167, 255, 0.39);
          }
        }
        &.status_green {
          .status_icon {
            border-color: #7ed321;
          }
          &:hover {
            border-bottom: 7px solid #7ed321;
            background: #ffffff;
            box-shadow: 0 2px 6px 0 rgba(126, 211, 33, 0.39);
          }
        }
        &.status_grey {
          .status_icon {
            border-color: #9b9b9b;
          }
          &:hover {
            border-bottom: 7px solid #9b9b9b;
            background: #ffffff;
            box-shadow: 0 2px 6px 0 rgba(155, 155, 155, 0.4);
          }
        }
        &.status_purple {
          .status_icon {
            border-color: #c166ff;
          }
          &:hover {
            border-bottom: 7px solid #c166ff;
            background: #ffffff;
            box-shadow: 0 2px 6px 0 rgba(193, 102, 255, 0.39);
          }
        }
        p {
          margin: 0 0 4px 16px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          span {
            font-weight: 600;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .right_table_title {
    font-family: PingFangSC-Medium;
    margin: 0 0 16px;
    font-size: 16px;
    color: #171f24;
    .border {
      top: 2px;
    }
  }
}

.border {
  margin-right: 4px;
  width: 4px;
  height: 14px;
  background: #3aa7ff;
  display: inline-block;
  position: relative;
  border-radius: 6px;
}
.icon-order {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  &.order-one {
    background-image: url("~@/assets/css/icons/radnking_1.png");
  }
  &.order-two {
    background-image: url("~@/assets/css/icons/radnking_2.png");
  }
  &.order-three {
    background-image: url("~@/assets/css/icons/radnking_3.png");
  }
}
.icon-question {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-ques.png");
  background-size: 100% 100%;
}
</style>
