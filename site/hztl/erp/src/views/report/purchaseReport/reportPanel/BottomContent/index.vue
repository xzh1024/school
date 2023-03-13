<template>
  <el-row :gutter="16" style="min-width:1300px;margin:0">
    <el-col
      class="content_height"
      style="background:#ffffff;padding: 11px 16px 9px;height:376px;"
      :span="9"
    >
      <h4 class="right_table_title">
        <span class="border"></span>
        当前采购状态概览
      </h4>
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="eachPanel">
            <h4>
              <i class="icon icon-zaitu"></i>采购在途
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content="有采购订单的采购单状态为待提交+待财务审核+待仓库审核+待财务/仓库审核+采购订单状态为待转采购单的单据之和、进货金额之和、配件种类之和、配件数量之和"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:87px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span>单据数：{{ dash ? dash.onpassageOrderCnt : 0 }}</span>
            <span
              >金额：￥{{
                unitConvert(dash ? dash.onpassageOrderAmount : 0)
              }}</span
            >
            <span
              >配件种类：<i style="color:#3aa7ff">{{
                dash ? dash.onpassagePartCate : 0
              }}</i></span
            >
            <span
              >配件数量：<i style="color:#f5a622">{{
                dash ? dash.onpassagePartQty : 0
              }}</i></span
            >
          </div>
        </el-col>
        <el-col :span="8">
          <div class="eachPanel">
            <h4>
              <i class="icon icon-zaiding"></i>采购在订
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content="采购订单待转采购之前的状态+采购开单（不包含订货计划转过来的）待提交+待财务审核+待仓库审核+待财务/仓库审核状态+急件到货单待提交、待收货状态下的单据之和、进货金额之和、配件种类之和、配件数量之和"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:87px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span>单据数：{{ dash ? dash.onorderOrderCnt : 0 }}</span>
            <span
              >金额：￥{{
                unitConvert(dash ? dash.onorderOrderAmount : 0)
              }}</span
            >
            <span
              >配件种类：<i style="color: #3aa7ff">{{
                dash ? dash.onorderPartCate : 0
              }}</i></span
            >
            <span
              >配件数量：<i style="color: #f5a622">{{
                dash ? dash.onorderPartQty : 0
              }}</i></span
            >
          </div>
        </el-col>
        <el-col :span="8">
          <div class="eachPanel" @click="toPage('需求')" style="cursor:pointer">
            <h4>
              <i class="icon icon-xuqiu"></i>需求
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content="当前总的需求配件种类之和、配件数量之和"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:56px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span
              >配件种类：<i style="color:#3aa7ff">{{
                dash ? dash.demandPartCate : 0
              }}</i></span
            >
            <span
              >配件数量：<i style="color:#f5a622">{{
                dash ? dash.demandPartQty : 0
              }}</i></span
            >
          </div>
        </el-col>
        <el-col :span="8">
          <div class="eachPanel" @click="toPage('超储')">
            <h4>
              <i class="icon icon-chaochu"></i>超储
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content="配件动态库存>库存上限的配件的进货金额之和、配件种类之和、配件数量之和"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:56px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span
              >金额：￥{{ unitConvert(dash ? dash.overstockPrice : 0) }}</span
            >
            <span
              >配件种类：<i style="color:#3aa7ff">{{
                dash ? dash.overstockPartCate : 0
              }}</i></span
            >
            <span
              >配件数量：<i style="color:#f5a622">{{
                dash ? dash.overstockPartCnt : 0
              }}</i></span
            >
          </div>
        </el-col>
        <el-col :span="8">
          <div class="eachPanel" @click="toPage('缺货')">
            <h4>
              <i class="icon icon-quehuo"></i>缺货
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                content="配件动态库存<库存下限的配件的进货金额之和、配件种类之和、配件数量之和"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;left:56px;"
                  slot="reference"
                ></i>
              </el-popover>
            </h4>
            <span
              >配件种类：<i style="color:#3aa7ff">{{
                dash ? dash.outofstockPartCate : 0
              }}</i></span
            >
            <span
              >配件数量：<i style="color:#f5a622">{{
                dash ? dash.outofstockPartCnt : 0
              }}</i></span
            >
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col class="content_height" style="height: 376px" :span="15">
      <el-row
        :gutter="10"
        style="background:#ffffff;height: 376px;border-radius:6px;padding: 16px;margin:0"
      >
        <h4 class="right_table_title">
          <span class="border"></span>
          【今日/月累计】概括<el-popover
            placement="right"
            width="300"
            trigger="hover"
            content="此处统计的数据表示今日至此时的汇总数据以及本月至此时的累计数据"
          >
            <i
              class="icon-question"
              style="position:absolute;top:18px;left:182px;"
              slot="reference"
            ></i>
          </el-popover>
        </h4>
        <el-col :span="8" v-for="(item, index) in totalInfo" :key="item.name">
          <div
            class="eachInfo"
            :class="{ bacBlue: index <= 2, noCursor: item.name == '销售金额' }"
            @click="toList(item.name)"
          >
            <p class="title">
              {{ item.name }}
              <el-popover
                placement="right"
                width="300"
                trigger="hover"
                :content="item.content"
              >
                <i
                  class="icon-question"
                  style="position:absolute;top:2px;right:-9px;"
                  slot="reference"
                ></i>
              </el-popover>
            </p>
            <h4>
              <span>￥</span>{{ unitConvert(item.AmountToday) }}/<span>￥</span
              >{{ unitConvert(item.AmountMonthtodate) }}
            </h4>
            <div style="clear:both;"></div>
            <p>
              单据数
              <span>{{ item.BillQtyToday }}/{{ item.BillQtyMonthtodate }}</span>
              <span v-if="item.name != '采购总金额'"
                >配件种类 {{ item.PartCateToday }}/{{
                  item.PartCateMonthtodate
                }}</span
              >
            </p>
            <p>
              配件数量 {{ item.PartQtyToday }}/{{ item.PartQtyMonthtodate }}
            </p>
            <p class="line"></p>
            <p>
              月至今环比
              <span v-if="item.AmountMOM && item.AmountMOM != '0'">
                <i
                  class="icon"
                  :class="item.AmountMOM > 0 ? 'iconUp' : 'iconDown'"
                ></i>
                {{ Math.abs(item.AmountMOM * 100).toFixed(2) }}%
              </span>
              <span v-else>-</span>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col
      class="content_height"
      style="background:#ffffff;padding: 11px 16px 9px;"
      :span="9"
    >
      <h4
        class="right_table_title"
        @click="toList('table')"
        style="cursor:pointer"
      >
        <span class="border"></span>
        本月配件采购排名
        <el-select
          v-model="conditions"
          style="width:224px;float:right"
          @change="changeConditions"
          size="small"
        >
          <el-option :value="0" label="看全部采购"></el-option>
          <el-option :value="1" label="只看急件采购"></el-option>
          <el-option :value="2" label="只看正常采购"></el-option>
        </el-select>
      </h4>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @sort-change="sortChange"
        @row-click="toList('table')"
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
          prop="name"
          label="配件名称"
          style="cursor:pointer"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="配件编码"
          style="cursor:pointer"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="采购数量"
          sortable="custom"
          style="cursor:pointer"
        ></el-table-column>
        <el-table-column
          prop="cost"
          label="采购金额"
          sortable="custom"
          style="cursor:pointer"
        ></el-table-column>
      </el-table>
    </el-col>
    <el-col class="content_height" :span="15">
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          正常采购
          <p class="detail_info" @click="toCaigou(0)">
            未完成
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.purActivedQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.purActivedA : 0)
                }}</span
              ></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange" @click="toCaigou(1)">
            <h4 class="status">
              <span class="status_icon "></span>
              待提交
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.purTosubmitQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.purTosubmitA : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green" @click="toCaigou(2)">
            <h4 class="status">
              <span class="status_icon "></span>
              待仓库处理
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.purWarehousetocheckQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    activeOrders ? activeOrders.purWarehousetocheckA : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_blue" @click="toCaigou(3)">
            <h4 class="status">
              <span class="status_icon "></span>
              待财务处理
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.purFinancetocheckQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    activeOrders ? activeOrders.purFinancetocheckA : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          急件采购
          <p class="detail_info" @click="toJijian(0)">
            未完成
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.ugActivedQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.ugActivedA : 0)
                }}</span
              ></span
            >
          </p>
        </h4>
        <div class="status_div">
          <div class="status_each status_orange" @click="toJijian(1)">
            <h4 class="status">
              <span class="status_icon "></span>
              待确认
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.ugToconfirmurgentQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    activeOrders ? activeOrders.ugToconfirmurgentA : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_blue" @click="toJijian(2)">
            <h4 class="status">
              <span class="status_icon "></span>
              待生成到货单
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.ugTomakeurgentQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.ugTomakeurgentA : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_purple" @click="toJijian(3)">
            <h4 class="status">
              <span class="status_icon "></span>
              待提交到货单
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.ugTosubmitQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.ugTosubmitA : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green" @click="toJijian(4)">
            <h4 class="status">
              <span class="status_icon "></span>
              待收货
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.ugWarehousetocheckQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    activeOrders ? activeOrders.ugWarehousetocheckA : 0
                  )
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_grey" @click="toJijian(5)">
            <h4 class="status">
              <span class="status_icon "></span>
              待结算
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.ugFinancetocheckQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.ugFinancetocheckA : 0)
                }}</span
              ></span
            >
          </div>
        </div>
      </div>
      <div class="main_div_each">
        <h4 class="title">
          <span class="border"></span>
          采购退货
          <p class="detail_info" @click="toReturn(0)">
            未完成
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.rtActivedQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.rtActivedA : 0)
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
                activeOrders ? activeOrders.rtTosubmitQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.rtTosubmitA : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_green" @click="toReturn(2)">
            <h4 class="status">
              <span class="status_icon "></span>
              待仓库处理
            </h4>
            <span
              >单据数
              <span class="num">{{
                activeOrders ? activeOrders.rtWarehousetocheckQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(
                    activeOrders ? activeOrders.rtWarehousetocheckA : 0
                  )
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
                activeOrders ? activeOrders.rtFinancetocheckQ : 0
              }}</span></span
            >
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.rtFinancetocheckA : 0)
                }}</span
              ></span
            >
          </div>
          <div class="status_each status_purple" @click="toReturn(4)">
            <h4 class="status">
              <span class="status_icon "></span>
              急件待退货
            </h4>
            <span
              >金额
              <span class="price"
                >￥{{
                  unitConvert(activeOrders ? activeOrders.rtUrgentAmt : 0)
                }}</span
              ></span
            >
            <span
              >配件种类
              <span class="num">{{
                activeOrders ? activeOrders.rtUrgentPartCate : 0
              }}</span></span
            >
            <span
              >配件数量
              <span class="num">{{
                activeOrders ? activeOrders.rtUrgentPart : 0
              }}</span></span
            >
          </div>
          <div></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { loadReportOrderList } from "@/api/report";
import { unitConvert } from "../../../common/common";
export default {
  name: "BottomContent",
  data() {
    return {
      activeOrders: {},
      dash: {},
      tableData: [],
      sortType: null,
      sortStytle: null,
      conditions: 0,
      selectCompanyIds: [],
      totalInfo: []
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
          this.activeOrders = newVal.activeOrders;
          this.dash = newVal.dash;
          this.totalInfo = [
            {
              ...newVal.totalPurchases,
              name: "采购总金额",
              content:
                "指定业务日期范围内 实采额 与 实退额 之和、单据之和、配件种类之和、配件数量之和以及本月至今与上月同一时间段的比值注意：这里的统计数据是刨除了当日采当日退的配件的    月至今环比公式：（本月至今金额-上月同期金额）/上月同期金额*100%"
            },
            {
              ...newVal.stockin,
              name: "入库金额",
              content:
                "今日/本月仓库审核通过的入库金额之和、单据之和、入库配件种类之和、入库配件数量之和、和本月至今与上月同一时间段的比值"
            },
            {
              ...newVal.sales,
              name: "销售金额",
              content:
                "今日/本月销售开单审核通过的销售金额之和、配件种类之和、配件数量之和、和本月至今与上月同一时间段的比值，注意：这里的统计数据是刨除了当日销当日销退的配件的"
            },
            {
              ...newVal.normalPurchases,
              name: "正常采购金额",
              content:
                '单据类型为"采购开单"今日/本月财务或仓库审核通过的单据进货金额之和、单据之和、配件种类之和、配件数量之和、和本月至今与上月同一时间段的比值，注意：这里的统计数据是刨除了当日采当日退的配件的'
            },
            {
              ...newVal.urgentPurchases,
              name: "急件采购金额",
              content:
                '单据类型为"急件采购"今日/本月财务或仓库审核通过的单据进货金额之和、单据之和、配件种类之和、配件数量之和、和本月至今与上月同一时间段的比值，注意：这里的统计数据是刨除了当日采当日退的配件的'
            },
            {
              ...newVal.return,
              name: "退货金额",
              content:
                '单据类型为"采购退货"今日/本月财务或仓库审核通过的单据进货金额之和、单据之和、配件种类之和、配件数量之和、和本月至今与上月同一时间段的比值'
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
          this.selectCompanyIds = newVal;
          this.getPanelList();
        }
      }
    }
  },
  methods: {
    unitConvert: unitConvert,
    toReturn(type) {
      let path = "PurchaseReturnList";
      let query = {};
      if (type == 0) {
        query = {
          status: [0, 1, 2, 3]
        };
      } else if (type == 1) {
        query = {
          status: [0]
        };
      } else if (type == 2) {
        query = {
          status: [1]
        };
      } else if (type == 3) {
        query = {
          status: [2]
        };
      } else if (type == 4) {
        path = "PurchaseReturnBilling";
        query = {};
      }
      this.$router.push({
        name: path,
        query: query
      });
    },
    toJijian(type) {
      let query = {};
      switch (type) {
        case 0:
        case 2:
          query = {
            tabName: "PendingList",
            childTabName: "Sale"
          };
          break;
        case 1:
          query = {
            tabName: "ConfirmList",
            childTabName: "Sale"
          };
          break;
        case 3:
          query = {
            tabName: "Settlement",
            childTabName: "Sale",
            status: [0]
          };
          break;
        case 4:
          query = {
            tabName: "Settlement",
            childTabName: "Sale",
            status: [1]
          };
          break;
        case 5:
          query = {
            tabName: "Settlement",
            childTabName: "Sale",
            status: [2]
          };
          break;
      }
      query.from = true;
      this.$router.push({
        name: "PurchaseDispatch",
        query: query
      });
    },
    toCaigou(type) {
      let status = [];
      switch (type) {
        case 0:
          status = [0, 1, 2, 3];
          break;
        case 1:
          status = [0];
          break;
        case 2:
          status = [1];
          break;
        case 3:
          status = [2];
          break;
      }
      this.$router.push({
        name: "PurchaseReceiveList",
        query: {
          status: status
        }
      });
    },
    toPage(page) {
      if (page == "需求") {
        this.$router.push({
          name: "PurchaseDemands"
        });
      }
      // else if (page == "超储") {
      //   this.$router.push("StocksSearch");
      // } else {
      //   this.$router.push("StocksSearch");
      // }
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    toList(type) {
      let query = {};
      //把日期区间设置为今天
      const d = new Date();
      const year = d.getFullYear();
      const month = this.change(d.getMonth() + 1);
      const day = this.change(d.getDate());
      const dateStart = `${year}-${month}-${day}`;
      const dateEnd = `${year}-${month}-${day}`;
      const aggregate = {
        cooperator: ["cooperatorArea", "cooperatorNameStr"],
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
      if (type == "采购总金额") {
        query = {
          cond: {
            billType: ["cg", "jj"],
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd
          },
          aggregate: aggregate
        };
      } else if (type == "正常采购金额") {
        query = {
          cond: {
            billType: ["cg"],
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd
          },
          aggregate: aggregate
        };
      } else if (type == "急件采购金额") {
        query = {
          cond: {
            billType: ["jj"],
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd
          },
          aggregate: aggregate
        };
      } else if (type == "退货金额") {
        query = {
          cond: {
            billType: ["ct"],
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd
          },
          aggregate: aggregate
        };
      } else if (type == "入库金额") {
        query = {
          cond: {
            billType: ["cg", "jj"],
            companyIds: this.selectCompanyIds,
            dateStart: dateStart,
            dateEnd: dateEnd
          },
          aggregate: aggregate
        };
      } else if (type == "table") {
        query = {
          cond: {
            companyIds: this.selectCompanyIds,
            dateStart: `${year}-${month}-01`,
            dateEnd: `${year}-${month}-${day}`
          },
          aggregate: {
            part: ["partCode", "partName", "partBrand"]
          }
        };
      } else {
        return;
      }
      this.$router.push({
        name: "purchaseReportList",
        query: query
      });
    },
    sortChange(value) {
      if (value.prop == "number") {
        this.sortStytle = 1;
      } else {
        this.sortStytle = 0;
      }
      if (value.order == "ascending") {
        this.sortType = 1;
      } else if (value.order == "descending") {
        this.sortType = 0;
      } else {
        this.sortType = null;
      }
      this.getPanelList();
    },
    changeConditions() {
      this.getPanelList();
    },
    getPanelList() {
      const params = {
        conditions: this.conditions,
        companyIds: this.selectCompanyIds
      };
      if (this.sortType != null) {
        params.sortType = this.sortType;
      }
      if (this.sortStytle != null) {
        params.sortStytle = this.sortStytle;
      }

      return loadReportOrderList(params)
        .then(res => {
          this.tableData = res;
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.content_height {
  height: 668px;
  border-radius: 6px;
  margin-top: 10px;
  .eachPanel {
    background: #f5f9ff;
    width: 100%;
    height: 148px;
    border-radius: 6px;
    padding: 16px 0 16px 16px;
    margin-bottom: 10px;
    h4 {
      position: relative;
      height: 24px;
      font-size: 16px;
      font-weight: 600;
      margin: 10px 0;
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
      font-size: 12px;
      display: inline-block;
      color: #666666;
    }
  }
  .main_div_each {
    margin-bottom: 10px;
    width: 100%;
    height: 216px;
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
      display: flex;
      margin: 10px 16px 0;
      height: 138px;
      div {
        flex: 1;
        margin: 0 10px 0 0;
        padding: 16px;
      }
      .status_each {
        cursor: pointer;
        height: 138px;
        background: #fafafa;
        border-radius: 6px;
        span {
          display: block;
        }
        .num {
          padding: 0 0 0 10px;
          display: inline;
        }
        .price {
          display: inline;
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
        &.active {
          border-bottom: 7px solid #3aa7ff;
        }
      }
    }
  }
  .right_table_title {
    margin: 0 0 16px;
    font-family: PingFangSC-Medium;
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
.eachInfo {
  cursor: pointer;
  width: 100%;
  height: 148px;
  padding: 16px;
  background-image: linear-gradient(-44deg, #92edb7 0%, #41c6af 100%);
  border-radius: 6px;
  color: #ffffff;
  .title {
    position: relative;
    font-size: 14px;
    display: inline-block;
    margin-right: 8px;
  }
  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    span {
      font-weight: 200;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    margin: 8px 0;
    background: #e8e8e8;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    span {
      margin-right: 10px;
    }
    .icon {
      display: inline-block;
      width: 10px;
      height: 12px;
      background-size: 100% 100%;
      margin-right: 5px;
      &.iconUp {
        background-image: url("~@/assets/images/icon-up.png");
      }
      &.iconDown {
        background-image: url("~@/assets/images/icon-down.png");
      }
    }
  }
  &.bacBlue {
    background-image: linear-gradient(135deg, #3f8eff 0%, #41ccff 100%);
    margin-bottom: 10px;
  }
}
.icon-question {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-ques.png");
  background-size: 100% 100%;
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
.noCursor {
  cursor: default !important;
}
</style>
<style lang="stylus" scoped>
/deep/ .el-table__row{
  cursor: pointer;
}
</style>
