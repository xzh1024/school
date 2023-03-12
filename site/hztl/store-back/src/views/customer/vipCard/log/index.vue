<template>
  <div class="vip-card-log" v-loading="loading">
    <SearchTemplate
      :formData="formData"
      labelWidth="80px"
      placeholderText="客户名称/电话/卡号/业务单据号等关键字"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
    >
      <template slot="more">
        <el-form-item label="开卡人">
          <el-input
            v-model.trim="formData.opener"
            clearable
            placeholder="开卡人名称/电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model.trim="formData.memberCardNo" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select
            v-model="formData.operateType"
            multiple
            collapse-tags
            clearable
            placeholder=""
          >
            <el-option
              v-for="item in operateTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作日期">
          <el-date-picker
            v-model="formData.createdDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="门店">
          <el-select
            v-model="formData.createdCompanyId"
            clearable
            placeholder=""
          >
            <el-option
              v-for="item in companieOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作员">
          <!-- <el-select v-model="formData.createdBy">
            <el-option
              v-for="item in createdByOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
          <el-select
            v-model="formData.createdBy"
            multiple
            filterable
            remote
            reserve-keyword
            collapse-tags
            clearable
            placeholder="请输入关键词"
            :remote-method="queryStaffs"
            :loading="selectLoading"
          >
            <el-option
              v-for="item in createdByOptions"
              :key="item.staffId"
              :label="item.staffName"
              :value="item.staffId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务员" prop="businessManName">
          <el-input
            v-model.trim="formData.businessManName"
            maxlength="10"
            size="small"
          ></el-input>
        </el-form-item>
      </template>
    </SearchTemplate>
    <div class="action-bar">
      <div class="flex-1">
        <el-button
          size="small"
          type="primary"
          :disabled="!tableData.length"
          @click="getDatas(true)"
        >
          导出
        </el-button>
      </div>
      <template>
        累计：
        <span>客户数 {{ board.openerCount }}</span>
        <el-divider direction="vertical" class="divider-base"></el-divider>
        <span>会员卡 {{ board.cardCount }}</span>
        <el-divider direction="vertical" class="divider-base"></el-divider>
        <span>交易金额 {{ board.businessAmount }}</span>
        <el-divider direction="vertical" class="divider-base"></el-divider>
        <span>赠送金额 {{ board.giftAmount }}</span>
      </template>
    </div>
    <el-table
      class="table-base"
      size="small"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="400px"
    >
      <el-table-column
        label="客户"
        prop="customerName"
        width="80"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="开卡人"
        prop="opener"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="会员卡种"
        prop="memberCardName"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="会员卡号"
        prop="memberCardNo"
        width="190"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作类型"
        prop="operateTypeName"
        width="80"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="交易金额（元）"
        prop="amount"
        width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.amount ? scope.row.amount : "-" }}
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        prop="content"
        show-overflow-tooltip
        width="400"
      >
        <template slot-scope="scope">
          <!-- 操作类型,1:开卡;2.充值;3.修改;4.消费;5.冻结;6.解冻;7.退卡 -->
          <!-- 冻结、解冻 -->
          <template v-if="[5, 6].includes(scope.row.operateType)">
            {{ scope.row.content }}
          </template>
          <!-- 开卡 -->
          <template v-if="scope.row.operateType === 1 && scope.row.content">
            开卡
            <template
              v-if="scope.row.content.gifts && scope.row.content.gifts.checked"
            >
              {{ `(赠送金额：${scope.row.content.gifts.amount})` }}
            </template>
          </template>
          <!-- 充值 -->
          <template v-if="scope.row.operateType === 2 && scope.row.content">
            <div
              class="panel"
              v-if="scope.row.content.cash && scope.row.content.cash.amount"
            >
              <div class="panel-label">现金充值金额：</div>
              <div class="panel-content">
                {{ scope.row.content.cash.amount }}
                <span v-if="scope.row.content.cash.giftAmount">
                  {{ `(赠送金额${scope.row.content.cash.giftAmount})` }}
                </span>
              </div>
            </div>
            <div class="panel" v-if="scope.row.content.projectPackage">
              <div class="panel-label">项目充值：</div>
              <div class="panel-content">
                <template v-if="scope.row.content.projectPackage.name">
                  【{{ scope.row.content.projectPackage.name }}】&emsp;
                </template>
                {{ scope.row.content.projectPackage.price }}&emsp;
                <template
                  v-if="
                    scope.row.content.projectPackage.details &&
                      scope.row.content.projectPackage.details.length
                  "
                >
                  &emsp;
                  {{
                    scope.row.content.projectPackage.details
                      .map(item => `${item.name}*${item.qty}`)
                      .join("、")
                  }}
                </template>
                <template
                  v-if="
                    (scope.row.content.projectPackage.giftDetails &&
                      scope.row.content.projectPackage.giftDetails.length) ||
                      scope.row.content.projectPackage.giftAmount
                  "
                >
                  （
                </template>
                <template
                  v-if="
                    scope.row.content.projectPackage.giftDetails &&
                      scope.row.content.projectPackage.giftDetails.length
                  "
                >
                  赠送
                  {{
                    scope.row.content.projectPackage.giftDetails
                      .map(item => `${item.name}*${item.qty}`)
                      .join("、")
                  }}
                </template>
                <template
                  v-if="
                    scope.row.content.projectPackage.giftDetails &&
                      scope.row.content.projectPackage.giftDetails.length &&
                      scope.row.content.projectPackage.giftAmount
                  "
                >
                  ；
                </template>
                <template v-if="scope.row.content.projectPackage.giftAmount">
                  赠送储值金额{{ scope.row.content.projectPackage.giftAmount }}
                </template>
                <template
                  v-if="
                    (scope.row.content.projectPackage.giftDetails &&
                      scope.row.content.projectPackage.giftDetails.length) ||
                      scope.row.content.projectPackage.giftAmount
                  "
                >
                  ）
                </template>
              </div>
            </div>
          </template>
          <!-- 修改 -->
          <template v-if="scope.row.operateType === 3 && scope.row.content">
            <div class="panel" v-if="scope.row.content.cardName">
              <div class="panel-label">卡种：</div>
              <div class="panel-content">
                <span>{{ scope.row.content.cardName.old }}</span>
                <span>&rarr;</span>
                <span>{{ scope.row.content.cardName.new }}</span>
              </div>
            </div>
            <div class="panel" v-if="scope.row.content.cardNo">
              <div class="panel-label">卡号：</div>
              <div class="panel-content">
                <span>{{ scope.row.content.cardNo.old }}</span>
                <span>&rarr;</span>
                <span>{{ scope.row.content.cardNo.new }}</span>
              </div>
            </div>
            <div class="panel" v-if="scope.row.content.limitVehicles">
              <div class="panel-label">限制车辆：</div>
              <div class="panel-content">
                <span>
                  {{
                    scope.row.content.limitVehicles.old &&
                    scope.row.content.limitVehicles.old.length
                      ? scope.row.content.limitVehicles.old.join("、")
                      : "不限车辆"
                  }}
                </span>
                <span>&rarr;</span>
                <span>
                  {{
                    scope.row.content.limitVehicles.new &&
                    scope.row.content.limitVehicles.new.length
                      ? scope.row.content.limitVehicles.new.join("、")
                      : "不限车辆"
                  }}
                </span>
              </div>
            </div>
            <div class="panel" v-if="scope.row.content.discountEndDate">
              <div class="panel-label">卡折扣有效期：</div>
              <div class="panel-content">
                <span>
                  {{
                    scope.row.content.discountEndDate.old === ""
                      ? "永久有效"
                      : scope.row.content.discountEndDate.old
                  }}
                </span>
                <span>&rarr;</span>
                <span>
                  {{
                    scope.row.content.discountEndDate.new === ""
                      ? "永久有效"
                      : scope.row.content.discountEndDate.new
                  }}
                </span>
              </div>
            </div>
            <div
              class="panel"
              v-if="
                scope.row.content.projects && scope.row.content.projects.length
              "
            >
              <div class="panel-label">项目：</div>
              <div class="panel-content">
                <div
                  v-for="(project, projectIndex) in scope.row.content.projects"
                  :key="projectIndex"
                >
                  <span>
                    {{ project.name }}
                  </span>
                  <span v-if="project.remainQty">
                    剩余充值次数&emsp;
                    {{
                      project.remainQty.old === ""
                        ? "永久有效"
                        : project.remainQty.old
                    }}
                    &rarr;
                    {{
                      project.remainQty.new === ""
                        ? "永久有效"
                        : project.remainQty.new
                    }}
                  </span>
                  <span v-if="project.endDate">
                    有效期&emsp;
                    {{
                      project.endDate.old === ""
                        ? "永久有效"
                        : project.endDate.old
                    }}
                    &rarr;
                    {{
                      project.endDate.new === ""
                        ? "永久有效"
                        : project.endDate.new
                    }}
                  </span>
                </div>
              </div>
            </div>
            <div
              class="panel"
              v-if="
                scope.row.content.packages && scope.row.content.packages.length
              "
            >
              <div class="panel-label">套餐：</div>
              <div class="panel-content">
                <div
                  v-for="(packageItem, packageIndex) in scope.row.content
                    .packages"
                  :key="packageIndex"
                >
                  <span>
                    {{ packageItem.name }}
                  </span>
                  <span v-if="packageItem.remainQty">
                    剩余充值次数&emsp;
                    {{ packageItem.remainQty.old }}
                    &rarr;
                    {{ packageItem.remainQty.new }}
                  </span>
                  <span v-if="packageItem.endDate">
                    有效期&emsp;
                    {{ packageItem.endDate.old }}
                    &rarr;
                    {{ packageItem.endDate.new }}
                  </span>
                </div>
              </div>
            </div>
          </template>
          <!-- 消费 -->
          <template v-if="scope.row.operateType === 4 && scope.row.content">
            <div class="panel" v-if="scope.row.content.businessType">
              <div class="panel-label">业务类型：</div>
              <div class="panel-content">
                {{ scope.row.content.businessType.name }}
                <span v-if="scope.row.content.businessType.no">
                  （{{ scope.row.content.businessType.no }}）
                </span>
              </div>
            </div>
            <div class="panel" v-if="scope.row.content.cash">
              <div class="panel-label">现金储值消费金额：</div>
              <div class="panel-content">{{ scope.row.content.cash }}</div>
            </div>
            <div
              class="panel"
              v-if="
                scope.row.content.projectPackages &&
                  scope.row.content.projectPackages.length
              "
            >
              <div class="panel-label">项目计次消费：</div>
              <div class="panel-content">
                {{
                  scope.row.content.projectPackages
                    .map(item => `${item.name}*${item.qty}`)
                    .join("、")
                }}
              </div>
            </div>
          </template>
          <!-- 退卡 -->
          <template v-if="scope.row.operateType === 7 && scope.row.content">
            <div class="panel" v-if="scope.row.content.cashBalance">
              <div class="panel-label">现金充值余额：</div>
              <div class="panel-content">
                {{ scope.row.content.cashBalance }}
              </div>
            </div>
            <div class="panel" v-if="scope.row.content.giftCashBalance">
              <div class="panel-label">现金充值赠送余额：</div>
              <div class="panel-content">
                {{ scope.row.content.giftCashBalance }}
              </div>
            </div>
            <div
              class="panel"
              v-if="
                scope.row.content.projectPackageBalance &&
                  scope.row.content.projectPackageBalance.length
              "
            >
              <div class="panel-label">项目套餐充次余额：</div>
              <div class="panel-content">
                {{
                  scope.row.content.projectPackageBalance
                    .map(item => `${item.name}*${item.qty}`)
                    .join("、")
                }}
              </div>
            </div>
            <div
              class="panel"
              v-if="
                scope.row.content.giftProjectPackageBalance &&
                  scope.row.content.giftProjectPackageBalance.length
              "
            >
              <div class="panel-label">项目套餐充次赠送余额：</div>
              <div class="panel-content">
                {{
                  scope.row.content.giftProjectPackageBalance
                    .map(item => `${item.name}*${item.qty}`)
                    .join("、")
                }}
              </div>
            </div>
            <div class="panel" v-if="scope.row.content.cashValue">
              <div class="panel-label">参考现金价值：</div>
              <div class="panel-content">{{ scope.row.content.cashValue }}</div>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="门店"
        prop="createdCompany"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作渠道"
        prop="channel"
        width="80"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="业务员"
        show-overflow-tooltip
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.businessManName ? scope.row.businessManName : "-" }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作员"
        prop="createdBy"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作时间"
        prop="createdAt"
        width="160"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="备注"
        prop="remarks"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <el-pagination
      class="pagination-base"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="pageData.page"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      :pager-count="pageData.pagerCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import SearchTemplate from "@/components/search/SearchTemplate.vue";
import {
  getMemberCardLogs,
  getStaffs,
  getCompanies,
  exportMembersCardServiceLogs
} from "../services";
import baseIndexJump from "@/utils/baseIndexJump";
import { downloadBlob } from "@/utils/tool";

const defaultFormData = {
  keyword: "", // 关键字
  opener: "", // 开卡人
  memberCardNo: "", // 会员卡号
  operateType: [], // 操作类型
  createdDate: null, // 操作时间
  // createdStart: "", // 操作时间开始时间
  // createdEnd: "", // 操作时间结束时间
  createdCompanyId: "", // 操作门店
  createdBy: "", // 操作员id
  businessManName: "" // 业务员
};
export default {
  name: "VipCardLog",
  components: {
    SearchTemplate
  },
  watch: {
    $route: "routeChange"
  },
  data() {
    return {
      loading: false,
      selectLoading: false,
      pageData: {
        page: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        pagerCount: 5
      },
      formData: JSON.parse(JSON.stringify(defaultFormData)),
      board: {
        openerCount: "", // 累计客户数
        cardCount: "", // 累计会员卡数
        businessAmount: "", // 交易金额
        giftAmount: "" // 赠送金额
      },
      tableData: [
        {
          id: 1, // 会员卡服务日志主键ID
          customerName: "", // 客户
          opener: "", // 开卡人
          memberCardName: "", // 会员卡种名称
          memberCardNo: "", //会员卡号
          operateTypeName: "", // 操作类型
          amount: "100", // 交易金额，null表示没有
          content: [""], // 日志内容
          createdCompany: "", // 操作门店
          channel: "", // 操作渠道
          createdBy: "", // 操作员
          createdAt: "", // 操作时间（YYYY-MM-DD）
          remarks: "" // 日志备注
        }
      ],
      // 0:全部;1:开卡;2.充值;3.修改;4.消费;5.冻结;6.解冻;7.退卡;（多个以“,”分隔）
      operateTypeOptions: [
        {
          value: "1",
          label: "开卡"
        },
        {
          value: "2",
          label: "充值"
        },
        {
          value: "3",
          label: "修改"
        },
        {
          value: "4",
          label: "消费"
        },
        {
          value: "5",
          label: "冻结"
        },
        {
          value: "6",
          label: "解冻"
        },
        {
          value: "7",
          label: "退卡"
        }
      ],
      companieOptions: [],
      createdByOptions: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    getCompanies() {
      getCompanies()
        .then(res => {
          this.companieOptions = res || [];
        })
        .catch(() => {
          this.companieOptions = [];
        });
    },
    routeChange(to) {
      if (to.path === "/vipCard" && to.query.tabName === "VipCardLog") {
        const { jumpId, jumpData } = baseIndexJump.getInfo();
        if (jumpId === "vipCardLog" && jumpData) {
          this.formData.keyword = jumpData;
          baseIndexJump.clearInfo();
          this.getDatas();
        }
      }
    },
    handleQuery() {
      this.pageData.page = 1;
      this.getDatas();
    },
    handleReset() {
      this.formData = JSON.parse(JSON.stringify(defaultFormData));
    },
    handleSizeChange(val) {
      this.pageData.page = 1;
      this.pageData.pageSize = val;
      this.getDatas();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.getDatas();
    },
    queryStaffs(query) {
      const params = {
        name: query,
        page: 1,
        pageSize: 50
      };
      getStaffs(params)
        .then(res => {
          this.createdByOptions = res.rows || [];
          this.selectLoading = false;
        })
        .catch(() => {
          this.createdByOptions = [];
          this.selectLoading = false;
        });
    },
    // 获取日志列表
    getDatas(isExport = false) {
      const params = JSON.parse(JSON.stringify(this.formData));
      params.page = this.pageData.page;
      params.pageSize = this.pageData.pageSize;
      params.operateType = params.operateType.join(",");
      if (params.createdDate) {
        params.createdStart = params.createdDate[0];
        params.createdEnd = params.createdDate[1];
      }
      delete params.createdDate;
      if (isExport) {
        this.exportMembersCardServiceLogs(params);
      } else {
        this.getMemberCardLogs(params);
      }
    },
    exportMembersCardServiceLogs(params) {
      this.loading = true;
      exportMembersCardServiceLogs(params)
        .then(res => {
          downloadBlob(res, "会员卡服务日志列表.xlsx");
          this.loading = false;
          this.$message.success("导出操作成功！");
        })
        .catch(() => (this.loading = false));
    },
    getMemberCardLogs(params) {
      this.loading = true;
      getMemberCardLogs(params)
        .then(res => {
          this.pageData.total = res.totalSize || 0;
          this.tableData = res.rows || [];
          this.board = {
            openerCount: res.openerCount || "-",
            cardCount: res.cardCount || "-",
            businessAmount: res.businessAmount || "-",
            giftAmount: res.giftAmount || "-"
          };
          this.loading = false;
        })
        .catch(() => {
          this.pageData.total = 0;
          this.tableData = [];
          this.board = {
            openerCount: "-",
            cardCount: "-",
            businessAmount: "-",
            giftAmount: "-"
          };
          this.loading = false;
        });
    }
  },
  created() {
    const { jumpId, jumpData } = baseIndexJump.getInfo();
    if (jumpId === "vipCardLog" && jumpData) {
      this.formData.keyword = jumpData;
      baseIndexJump.clearInfo();
    }
    this.getDatas();
    this.queryStaffs("");
    this.getCompanies();
  }
};
</script>

<style lang="less" scoped>
.vip-card-log {
  height: 100%;
  display: flex;
  flex-direction: column;
  .action-bar {
    display: flex;
    align-items: center;
    margin-top: @margin-size-main;
  }
  .table-base {
    flex: 1;
    margin-top: @margin-size-main;
    .panel {
      display: flex;
      .panel-label {
        color: #666666;
      }
      .panel-content {
        flex: 1;
        white-space: normal;
        color: #333333;
      }
    }
  }
  .pagination-base {
    text-align: right;
    padding-top: 12px;
  }
  /deep/ .el-icon-question {
    font-size: 16px;
    color: @color-warning;
    margin-left: @margin-size-secondary;
    cursor: pointer;
  }
}
</style>
