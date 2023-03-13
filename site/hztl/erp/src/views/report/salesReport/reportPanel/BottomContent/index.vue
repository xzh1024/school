<template>
  <el-row :gutter="10">
    <el-col :span="13" class="content_height" style="height:346px">
      <div class="total_div">
        <div class="left_Info">
          <h4 class="totalTitle">
            <span class="border"></span>【今日/月累计】销售金额概览
          </h4>
          <div style="clear:both"></div>
          <div class="bottom_div">
            <div
              class="eachInfo"
              v-for="item in leftInfoEach"
              :key="item.name"
              @click="toListPanel(item.name)"
            >
              <p class="title" style="position:relative;">
                {{ item.name }}
                <el-popover
                  placement="right"
                  width="300"
                  trigger="hover"
                  :content="item.content"
                >
                  <i
                    class="icon-question"
                    style="position:absolute;top:2px;left:59px;"
                    slot="reference"
                  ></i>
                </el-popover>
              </p>
              <h4>
                <span>￥</span>{{ unitConvert(item.day.amount) }}/<span>￥</span
                >{{ unitConvert(item.month.amount) }}
              </h4>
              <p>
                单据数
                <span>{{ item.day.billCount }}/{{ item.month.billCount }}</span>
              </p>
              <p v-if="item.name !== '销售金额'">
                {{ item.name !== "销售金额" ? "配件种类" : "" }}
                <span>{{ item.day.partCount }}/{{ item.month.partCount }}</span>
              </p>
              <p>
                配件数量
                <span>{{ item.day.partQty }}/{{ item.month.partQty }}</span>
              </p>
              <p class="line"></p>
              <p>
                月至今环比
                <span v-if="item.momRatio"
                  ><i
                    class="icon"
                    :class="item.momRatio > 0 ? 'iconUp' : 'iconDown'"
                  ></i>
                  {{
                    item.momRatio != 0
                      ? (Math.abs(item.momRatio) * 100).toFixed(2) + "%"
                      : "-"
                  }}
                </span>
                <span v-if="!item.momRatio">-</span>
              </p>
              <p v-if="item.name == '销售金额'">
                毛利
                <span
                  >{{ unitConvert(item.day.taxedGrossProfit) }}/{{
                    unitConvert(item.month.taxedGrossProfit)
                  }}</span
                >
              </p>
              <p v-if="item.name == '销售金额'">
                成本
                <span
                  >{{ unitConvert(item.day.taxedPurchaseAmount) }}/{{
                    unitConvert(item.month.taxedPurchaseAmount)
                  }}</span
                >
              </p>
              <p v-if="item.name == '销售金额'">
                优惠金额
                <span
                  >{{ unitConvert(item.day.benefitAmount) }}/{{
                    unitConvert(item.month.benefitAmount)
                  }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-col>

    <el-col class="content_height" :span="11">
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          客户订单
          <p class="detail_info" @click="toCustomer(0)">
            未完成
            <span
              >单据数
              <span class="num">{{
                customer.unfinish ? customer.unfinish.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(customer.unfinish ? customer.unfinish.amount : 0)
                }}</span
              ></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange" @click="toCustomer(1)">
            <h4 class="status">
              <span class="status_icon "></span>
              待提交
            </h4>
            <span
              >单据数
              <span class="num">{{
                customer.toSubmit ? customer.toSubmit.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(customer.toSubmit ? customer.toSubmit.amount : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_purple" @click="toCustomer(2)">
            <h4 class="status">
              <span class="status_icon "></span>
              待审核
            </h4>
            <span
              >单据数
              <span class="num">{{
                customer.toAudit ? customer.toAudit.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(customer.toAudit ? customer.toAudit.amount : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_blue" @click="toCustomer(3)">
            <h4 class="status">
              <span class="status_icon "></span>
              待转销售单
            </h4>
            <span
              >单据数
              <span class="num">{{
                customer.toTransSale ? customer.toTransSale.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    customer.toTransSale ? customer.toTransSale.amount : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green" @click="toCustomer(4)">
            <h4 class="status">
              <span class="status_icon "></span>
              待销售出库
            </h4>
            <span
              >单据数
              <span class="num">{{
                customer.toSale ? customer.toSale.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(customer.toSale ? customer.toSale.amount : 0)
                }}</span
              ></span
            >
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="content_height" :span="11">
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          销售单
          <p class="detail_info" @click="toSale(0)">
            未完成
            <span
              >单据数
              <span class="num">{{
                sale.unfinish ? sale.unfinish.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(sale.unfinish ? sale.unfinish.amount : 0)
                }}</span
              ></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange" @click="toSale(1)">
            <h4 class="status">
              <span class="status_icon "></span>
              待提交
            </h4>
            <span
              >单据数
              <span class="num">{{
                sale.toSubmit ? sale.toSubmit.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(sale.toSubmit ? sale.toSubmit.amount : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_blue" @click="toSale(2)">
            <h4 class="status">
              <span class="status_icon "></span>
              待财务处理
            </h4>
            <span
              >单据数
              <span class="num">{{
                sale.toAudit ? sale.toAudit.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(sale.toAudit ? sale.toAudit.amount : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green" @click="toSale(3)">
            <h4 class="status">
              <span class="status_icon "></span>
              待仓库处理
            </h4>
            <span
              >单据数
              <span class="num">{{
                sale.toTransSale ? sale.toTransSale.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(sale.toTransSale ? sale.toTransSale.amount : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each" style="opacity:0"></div>
        </div>
      </div>
    </el-col>

    <el-col
      class="content_height"
      :span="13"
      style="height:216px;position:relative;top:-31px"
    >
      <div class="main_div">
        <h4 class="title" style="margin:0 0 16px">
          <span class="border"></span>
          当前销售状况预览
        </h4>
        <div class="infoPanel">
          <div class="eachPanel">
            <h4>
              <i class="icon icon-zaitu"></i>销售在订
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content='当前客户订单订单状态在”转销售出库"之前的数量（不含待转销售 出库状态，含待提交） +  非来源于客户订单的销售单未库房审核前（当前为结算即出库前，含待提交）的单据金额之和、单据之和、配件种类之和、配件数量之和，注意：这里的统计数据是减掉了当日销当日退的配件'
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:86px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span class="info info-one"
              >单据数：{{
                special && special.onOrder ? special.onOrder.billCount : 0
              }}</span
            >
            <span class="info info-one"
              >配件种类：<i style="color:#3aa7ff">{{
                special && special.onOrder ? special.onOrder.partCount : 0
              }}</i></span
            >
            <span class="info" style="width:auto"
              >金额：￥{{
                unitConvert(
                  special && special.onOrder ? special.onOrder.amount : 0
                )
              }}</span
            >
            <br />
            <span class="info"
              >配件数量：<i style="color:#f5a622">{{
                special && special.onOrder ? special.onOrder.partQty : 0
              }}</i></span
            >
          </div>
          <div class="eachPanel">
            <h4>
              <i class="icon icon-zaiding"></i>销售待交货
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content="当前有客户订单的销售单非“已完成”状态 + 客户订单待转销售出库状态的单据金额之和、单据之和、配件种类之和、配件数量之和"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:103px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span class="info info-one"
              >单据数：{{
                special && special.toDeliver ? special.toDeliver.billCount : 0
              }}</span
            >
            <span class="info info-one"
              >配件种类：<i style="color: #3aa7ff">{{
                special && special.toDeliver ? special.toDeliver.partCount : 0
              }}</i></span
            >
            <span class="info"
              >金额：￥{{
                unitConvert(
                  special && special.toDeliver ? special.toDeliver.amount : 0
                )
              }}</span
            >
            <br />
            <span class="info"
              >配件数量：<i style="color: #f5a622">{{
                special && special.toDeliver ? special.toDeliver.partQty : 0
              }}</i></span
            >
          </div>
          <div class="eachPanel">
            <h4>
              <i class="icon icon-xuqiu"></i>月均销售
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content="近3个月销售（精度2位）单据数月平均、销售金额月平均"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:86px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span class="info"
              >单据数：{{
                special && special.perMonth ? special.perMonth.billCount : 0
              }}</span
            >
            <br />
            <span class="info"
              >金额：￥{{
                unitConvert(
                  special && special.perMonth ? special.perMonth.amount : 0
                )
              }}</span
            >
          </div>
        </div>
      </div>
    </el-col>

    <el-col class="content_height" :span="11">
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          销售退货
          <p class="detail_info" @click="toReturn(0)">
            未完成
            <span
              >单据数
              <span class="num">{{
                returnObj.unfinish ? returnObj.unfinish.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    returnObj.unfinish ? returnObj.unfinish.amount : 0
                  )
                }}</span
              ></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange" @click="toReturn(1)">
            <h4 class="status">
              <span class="status_icon "></span>
              待提交
            </h4>
            <span
              >单据数
              <span class="num">{{
                returnObj.toSubmit ? returnObj.toSubmit.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    returnObj.toSubmit ? returnObj.toSubmit.amount : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_purple" @click="toReturn(2)">
            <h4 class="status">
              <span class="status_icon "></span>
              待审核
            </h4>
            <span
              >单据数
              <span class="num">{{
                returnObj.toAudit ? returnObj.toAudit.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(returnObj.toAudit ? returnObj.toAudit.amount : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_blue" @click="toReturn(3)">
            <h4 class="status">
              <span class="status_icon "></span>
              待财务处理
            </h4>
            <span
              >单据数
              <span class="num">{{
                returnObj.toFinancial ? returnObj.toFinancial.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    returnObj.toFinancial ? returnObj.toFinancial.amount : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green" @click="toReturn(4)">
            <h4 class="status">
              <span class="status_icon "></span>
              待仓库处理
            </h4>
            <span
              >单据数
              <span class="num">{{
                returnObj.toTransSale ? returnObj.toTransSale.billCount : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    returnObj.toTransSale ? returnObj.toTransSale.amount : 0
                  )
                }}</span
              ></span
            >
          </div>
        </div>
      </div>
    </el-col>

    <el-col
      class="content_height"
      style="margin-top:-21px;height:auto"
      :span="24"
    >
      <div style="background:#ffffff;padding:16px;border-radius:6px;">
        <h4
          class="right_table_title"
          @click="toList()"
          style="cursor:pointer;width:140px;"
        >
          <span class="border"></span>
          销售排行榜
        </h4>

        <div class="order-type">
          <span
            class="each-type"
            v-for="type in orderTypes"
            :key="type.key"
            :class="{ active: checked == type.key }"
            @click="changeOrderType(type)"
          >
            {{ type.name }}
          </span>
        </div>
        <div class="table-content">
          <el-table
            :data="tableData"
            border
            style="width: 100%;background:#ffffff;"
            :loading="loading"
            @sort-change="sortChange"
            @row-click="toList()"
            :default-sort="{ prop: 'taxedSaleAmount', order: 'descending' }"
          >
            <el-table-column
              type="index"
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
            <el-table-column
              v-if="checked == 1"
              prop="partName"
              label="配件名称"
            ></el-table-column>
            <el-table-column
              v-if="checked == 1"
              prop="partCode"
              label="配件编码"
            ></el-table-column>

            <el-table-column
              v-if="checked == 3"
              prop="cooperatorNameStr"
              label="客户名称"
            ></el-table-column>
            <el-table-column
              :prop="checkedPeople === 2 ? 'createdByMan' : 'businessMan'"
              :class-name="checked == 2 ? '' : 'd-none'"
            >
              <template slot="header">
                <select
                  v-model="checkedPeople"
                  @change="getPanelList"
                  style="width:100%;border-color:#C0C4CC;border-radius:4px;color:#C0C4CC"
                >
                  <option :value="1">业务员</option>
                  <option :value="2">制单员</option>
                </select>
              </template>
            </el-table-column>
            <el-table-column
              prop="billCount"
              label="单据数"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              prop="saleQty"
              label="销售数量"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              prop="taxedSaleAmount"
              label="销售金额"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              prop="taxedGrossProfit"
              label="毛利"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              prop="taxedGrossProfitRate"
              label="毛利率"
              sortable="custom"
            >
              <template slot-scope="props">
                {{ (Number(props.row.taxedGrossProfitRate) * 100).toFixed(2) }}%
              </template>
            </el-table-column>
            <el-table-column
              prop="momIncreaseRatio"
              label="月至今环比"
              sortable="custom"
            >
              <template slot-scope="props">
                {{
                  props.row.momIncreaseRatio != 0
                    ? (props.row.momIncreaseRatio * 100).toFixed(2) + "%"
                    : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="priceUpRate"
              label="加价率"
              sortable="custom"
            >
              <template slot-scope="props">
                {{ (Number(props.row.priceUpRate) * 100).toFixed(2) }}%
              </template>
            </el-table-column>
            <el-table-column
              prop="taxedSaleRatio"
              label="销售占比"
              sortable="custom"
            >
              <template slot-scope="props">
                {{ (Number(props.row.taxedSaleRatio) * 100).toFixed(2) }}%
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { loadReportOrderList } from "@/api/salesReport";
import { unitConvert } from "../../../common/common";
export default {
  name: "BottomContent",
  data() {
    return {
      customer: {},
      sale: {},
      returnObj: {},
      special: {},
      tableData: [],
      sortType: null,
      sortStytle: null,
      orderTypes: [
        { name: "本月配件销售排行", key: 1 },
        { name: "本月员工销售排行", key: 2 },
        { name: "本月客户销售排行", key: 3 }
      ],
      checked: 1,
      checkedPeople: 1,
      loading: false,
      conpanyList: [],
      sortParam: {
        column: "taxedSaleAmount",
        mode: "DESC"
      },
      leftInfoEach: []
    };
  },
  props: {
    panelData: Object,
    companyIds: Array
  },
  watch: {
    panelData: {
      deep: true, // 深度监听
      handler(newVal) {
        if (newVal) {
          this.customer = newVal?.todo?.customer;
          this.sale = newVal?.todo?.sale;
          this.returnObj = newVal?.todo?.return;
          this.special = newVal?.special;
          this.leftInfoEach = [
            {
              ...newVal.dayAndMonth.sale,
              name: "销售金额",
              content:
                "指定业务日期范围内 实售额 与 实退额 之和、单据之和、配件种类之和、配件数量之和、成本金额之和、毛利之和以及本月至今与上月同一时间段的比值"
            },
            {
              ...newVal.dayAndMonth.return,
              name: "退货金额",
              content:
                "销售退货单业务日期为今日/本月并财务或仓库审核通过的单据退货金额之和、单据之和、配件种类之和、配件数量之和、和本月至今与上月同一时间段的比值"
            },
            {
              ...newVal.dayAndMonth.stockout,
              name: "出库金额",
              content:
                "销售出库单今日/本月仓库审核通过的出库金额之和、单据之和、出库配件种类之和、出库配件数量之和、和本月至今与上月同一时间段的比值"
            }
          ];
        }
        this.getPanelList();
      }
    },
    companyIds: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.conpanyList = newVal;
          this.getPanelList();
        }
      }
    }
  },
  methods: {
    changeCheckedPeople(value) {
      this.checkedPeople = value;
    },
    unitConvert: unitConvert,
    toCustomer(type) {
      const query = {};
      switch (type) {
        case 0:
          query.status = [1, 2, 3, 4, 5, 6, 7, 11, 90];
          break;
        case 1:
          query.status = [1, 90];
          break;
        case 2:
          query.status = [2];
          break;
        case 3:
          query.status = [11];
          break;
        case 4:
          query.status = [4];
          break;
      }
      this.$router.push({
        name: "SalesList",
        query: query
      });
    },
    toSale(type) {
      const query = {};
      switch (type) {
        case 0:
          query.statuses = [1, 4, 5, 6, 90, 91, 93, 94];
          break;
        case 1:
          query.statuses = [1, 90, 94];
          break;
        case 2:
          query.statuses = [5, 6];
          break;
        case 3:
          query.statuses = [4, 6];
          break;
      }
      this.$router.push({
        name: "SalesOutList",
        query: query
      });
    },
    toReturn(type) {
      const query = {};
      switch (type) {
        case 0:
          query.statuses = [1, 2, 4, 5, 6, 90];
          break;
        case 1:
          query.statuses = [1, 90];
          break;
        case 2:
          query.statuses = [2];
          break;
        case 3:
          query.statuses = [5, 6];
          break;
        case 4:
          query.statuses = [4, 6];
          break;
      }
      this.$router.push({
        name: "SalesReturnList",
        query: query
      });
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    toList() {
      //把日期区间设置为今天
      const d = new Date();
      const year = d.getFullYear();
      const month = this.change(d.getMonth() + 1);
      const day = this.change(d.getDate());
      const dateStart = `${year}-${month}-01`;
      const dateEnd = `${year}-${month}-${day}`;
      const query = {
        cond: {
          companyIds: this.conpanyList,
          dateStart: dateStart,
          dateEnd: dateEnd
        }
      };
      if (this.checked == 1) {
        query.aggregate = {
          part: ["partCode", "partName", "partBrand"]
        };
      } else if (this.checked == 2) {
        query.aggregate = {
          people: ["businessMan"]
        };
      } else if (this.checked == 3) {
        query.aggregate = {
          cooperator: [
            "cooperatorArea",
            "cooperatorNameStr",
            "cooperatorProperty"
          ]
        };
      }
      this.$router.push({
        name: "salesReportList",
        query: query
      });
    },
    changeOrderType(type) {
      this.sortParam = {
        column: "taxedSaleAmount",
        mode: "DESC"
      };
      this.checked = type.key;
      this.getPanelList();
    },
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
    getPanelList() {
      this.tableData = [];
      this.loading = true;
      const d = new Date();
      const year = d.getFullYear();
      const month = this.change(d.getMonth() + 1);
      const postData = {
        aggregate: {
          part: this.checked == 1 ? ["partName", "partCode"] : [],
          people:
            this.checked == 2
              ? [this.checkedPeople === 2 ? "createdByMan" : "businessMan"]
              : [],
          cooperator: this.checked == 3 ? ["cooperatorNameStr"] : []
        },
        order: this.sortParam,
        cond: {
          dateStart: `${year}-${month}-01`,
          companyIds: this.conpanyList
        }
      };
      return loadReportOrderList(postData)
        .then(res => {
          this.loading = false;
          this.tableData = res.rows || [];
        })
        .catch(() => {
          this.loading = false;
        });
    },
    toListPanel(type) {
      let query = {};
      //把日期区间设置为今天
      const d = new Date();
      const year = d.getFullYear();
      const month = this.change(d.getMonth() + 1);
      const day = this.change(d.getDate());
      const dateStart = `${year}-${month}-${day}`;
      const dateEnd = `${year}-${month}-${day}`;
      const aggregate = {
        cooperator: [
          "cooperatorArea",
          "cooperatorNameStr",
          "cooperatorProperty"
        ],
        bill: ["billNo", "billType"],
        part: [
          "partCode",
          "partName",
          "partBrand",
          "partCategory",
          "partVehModel",
          "partProductionPlace"
        ]
      };
      if (type == "销售金额") {
        query = {
          cond: {
            companyIds: this.conpanyList,
            dateStart: dateStart,
            dateEnd: dateEnd,
            billTypes: ["xs"]
          },
          aggregate: aggregate
        };
      } else if (type == "退货金额") {
        query = {
          cond: {
            companyIds: this.conpanyList,
            dateStart: dateStart,
            dateEnd: dateEnd,
            billTypes: ["xt"]
          },
          aggregate: aggregate
        };
      } else if (type == "出库金额") {
        query = {
          cond: {
            companyIds: this.conpanyList,
            dateStart: dateStart,
            dateEnd: dateEnd,
            billTypes: ["xs"]
          },
          aggregate: aggregate
        };
      }
      this.$router.push({
        name: "salesReportList",
        query: query
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content_height {
  margin-top: 10px;
  height: 184px;
  border-radius: 6px;
  .main_div {
    background: #ffffff;
    border-radius: 6px;
    height: 216px;
    padding: 16px;
    overflow: hidden;
    .infoPanel {
      display: flex;
      justify-content: space-between;
      .eachPanel {
        background: #f5f9ff;
        height: 146px;
        border-radius: 6px;
        margin-right: 10px;
        padding: 16px;
        flex: 1;
        &:nth-last-child(1) {
          margin: 0;
        }
        h4 {
          position: relative;
          margin: 0 0 10px;
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
        .info {
          margin-bottom: 8px;
          font-weight: 400;
          min-width: 140px;
          width: 50%;
          font-size: 14px;
          display: inline-block;
          color: #666666;
          &.info-one {
            min-width: 50%;
          }
        }
      }
    }
  }
  .main_div_each {
    width: 100%;
    height: 184px;
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    .border {
      top: 1px;
    }
    .status_div {
      margin: 10px 16px 0;
      height: 138px;
      display: flex;
      .status_each {
        flex: 1;
        h4 {
          margin: 0 0 16px;
        }
        cursor: pointer;
        margin: 0 10px 0 0;
        width: 206px;
        height: 114px;
        background: #fafafa;
        border-radius: 6px;
        padding: 16px 0 16px 16px;
        span {
          font-size: 12px;
          display: block;
        }
        .num {
          padding: 0 0 0 5px;
          display: inline;
        }
        .price {
          padding: 0 0 0 5px;
          display: inline;
        }
        .status {
          font-size: 16px;
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
        &.active {
          border-bottom: 7px solid #3aa7ff;
        }
      }
    }
  }
  .right_table_title {
    font-family: PingFangSC-Medium;
    margin: 0 0 16px 0;
    font-size: 16px;
    color: #171f24;
    .border {
      top: 2px;
    }
  }
  .order-type {
    margin-bottom: 16px;
    .each-type {
      display: inline-block;
      padding: 5px 8px;
      font-size: 12px;
      border-radius: 6px;
      background: #eeeeee;
      color: #333333;
      cursor: pointer;
      margin-right: 16px;
      &.active {
        color: #ffffff;
        background: #3aa7ff;
      }
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
i {
  font-style: normal;
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
.total_div {
  border-radius: 6px;
  padding: 16px;
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
  .left_Info {
    height: 253px;
    .totalTitle {
      margin: 0;
      font-size: 16px;
      color: #171f24;
      letter-spacing: 0;
    }
    .border {
      display: inline-block;
      margin-right: 5px;
      width: 4px;
      height: 14px;
      border-radius: 6px;
      background: #3aa7ff;
    }
    .bottom_div {
      overflow: hidden;
      margin-top: 16px;
      display: flex;
      .eachInfo {
        flex: 1;
        cursor: pointer;
        float: left;
        margin-right: 10px;
        height: 276px;
        padding: 16px;
        background-image: linear-gradient(135deg, #3f8eff 0%, #41ccff 100%);
        border-radius: 6px;
        color: #ffffff;
        .title {
          color: #ffffff;
          font-size: 14px;
          padding: 0;
        }
        h4 {
          margin: 0;
          font-size: 14px;
          margin-bottom: 8px;
          font-weight: 600;
          color: #ffffff;
          span {
            font-size: 12px;
            font-weight: 0;
          }
        }
        .line {
          width: 100%;
          height: 1px;
          margin: 8px auto;
          background: #e8e8e8;
        }
        p {
          margin: 0;
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 8px;
          span {
            margin-right: 10px;
          }
          .icon {
            display: inline-block;
            width: 10px;
            height: 12px;
            background-size: 100% 100%;
            &.iconUp {
              background-image: url("~@/assets/images/icon-up.png");
            }
            &.iconDown {
              background-image: url("~@/assets/images/icon-down.png");
            }
          }
        }
      }
    }
  }
}

.icon-question {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-ques.png");
  background-size: 100% 100%;
}
.title {
  margin: 16px 22.2px 0 16px;
  font-size: 16px;
  color: #171f24;
  padding-left: 8px;
  font-weight: 600;
  .detail_info {
    cursor: pointer;
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
        padding: 0 0 0 5px;
        color: #3aa7ff;
      }
      .price {
        padding: 0 0 0 5px;
        color: #ee6723;
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
/deep/ .d-none {
  display: none!important;
}
</style>
