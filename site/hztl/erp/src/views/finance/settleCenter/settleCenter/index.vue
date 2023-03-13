<template>
  <div class="container-box">
    <ht-card>
      <search
        ref="search"
        :activeTab="activeTab"
        @query-data="searchHandle"
        @billNoChange="handleBillNoChange"
      />
    </ht-card>

    <ht-card no-padding class="auto-card">
      <div class="flex-container column-flex">
        <el-tabs
          v-model="activeTab"
          class="no-tab-content"
          type="border-card"
          @tab-click="changeTabAndResetChild"
        >
          <el-tab-pane :label="settleTabs.pay" name="pay">
            <span slot="label">
              {{ settleTabs.pay }}
              <span class="total-numer"
                >({{
                  totalNumers.nowpayInNum + totalNumers.nowpayOutNum
                }})</span
              >
            </span>
          </el-tab-pane>
          <el-tab-pane :label="settleTabs.charge" name="charge">
            <span slot="label">
              {{ settleTabs.charge }}
              <span class="total-numer"
                >({{
                  totalNumers.ontickPurcNum +
                    totalNumers.ontickSaleNum +
                    totalNumers.ontickRepaireNum
                }})</span
              >
            </span>
          </el-tab-pane>
          <el-tab-pane :label="settleTabs.collect" name="collect">
            <span slot="label">
              {{ settleTabs.collect }}
              <span class="total-numer"
                >({{
                  totalNumers.collectionPurcNum + totalNumers.collectionSaleNum
                }})</span
              >
            </span>
          </el-tab-pane>
          <el-tab-pane :label="settleTabs.transfer" name="transfer">
            <span slot="label">
              {{ settleTabs.transfer }}
              <span class="total-numer"
                >({{ totalNumers.allocInNum + totalNumers.allocOutNum }})</span
              >
            </span>
          </el-tab-pane>
        </el-tabs>
        <div
          v-show="activeTab === 'pay'"
          class="flex-container column-flex auto-block"
        >
          <pay-table
            ref="pay"
            :key-scope="keyScopes.payTable"
            :selectable="canSettle"
            :total-numers="totalNumers"
            :query-params="queryParams"
            class="table-box"
            @hotkeysUp="handleHotkeysUp"
            @rows-change="handleSelectChange"
            @totalNumberChange="handleTotalNumberChange"
            @paymentTypeChange="handlePaymentTypeChange"
            @rowOperation="settleBill"
            @show-pagination="value => (isPayTableShowPagination = value)"
            @click.native.stop="setKeyScope(keyScopes.payTable)"
            @activeTabChange="activeTab => (childActiveTab = activeTab)"
          />
          <div class="button-box">
            <el-button
              :disabled="!selection.length"
              type="primary"
              size="mini"
              @click="showSettleBox"
            >
              结算（F7）
            </el-button>
          </div>
        </div>
        <div
          v-show="activeTab === 'charge'"
          class="flex-container column-flex auto-block"
        >
          <charge-table
            ref="charge"
            :key-scope="keyScopes.chargeTable"
            :selectable="canSettle"
            :total-numers="totalNumers"
            :query-params="queryParams"
            class="table-box"
            @hotkeysUp="handleHotkeysUp"
            @rows-change="handleSelectChange"
            @totalNumberChange="handleTotalNumberChange"
            @rowOperation="settleBill"
            @show-pagination="value => (isChargeTableShowPagination = value)"
            @click.native.stop="setKeyScope(keyScopes.chargeTable)"
            @activeTabChange="activeTab => (childActiveTab = activeTab)"
          />
          <div class="button-box">
            <el-button
              :disabled="!selection.length"
              type="primary"
              size="mini"
              @click="showSettleBox"
            >
              结算（F7）
            </el-button>
          </div>
        </div>
        <div
          v-show="activeTab === 'collect'"
          class="flex-container column-flex auto-block"
        >
          <collect-table
            ref="collect"
            :key-scope="keyScopes.collectTable"
            :selectable="canSettle"
            :total-numers="totalNumers"
            :query-params="queryParams"
            class="table-box"
            @hotkeysUp="handleHotkeysUp"
            @rows-change="handleSelectChange"
            @totalNumberChange="handleTotalNumberChange"
            @rowOperation="settleBill"
            @show-pagination="value => (isCollectTableShowPagination = value)"
            @click.native.stop="setKeyScope(keyScopes.collectTable)"
            @activeTabChange="activeTab => (childActiveTab = activeTab)"
          />
          <div class="button-box">
            <el-button
              :disabled="!selection.length"
              type="primary"
              size="mini"
              @click="showSettleBox"
            >
              结算（F7）
            </el-button>
          </div>
        </div>
        <div
          v-show="activeTab === 'transfer'"
          class="flex-container column-flex auto-block"
        >
          <transfer-table
            ref="transfer"
            :key-scope="keyScopes.transferTable"
            :selectable="canSettle"
            :total-numers="totalNumers"
            :query-params="queryParams"
            class="table-box"
            @hotkeysUp="handleHotkeysUp"
            @rows-change="handleSelectChange"
            @totalNumberChange="handleTotalNumberChange"
            @rowOperation="settleBill"
            @show-pagination="value => (isTransferTableShowPagination = value)"
            @click.native.stop="setKeyScope(keyScopes.transferTable)"
            @activeTabChange="activeTab => (childActiveTab = activeTab)"
          />
          <div class="button-box">
            <el-button
              :disabled="!selection.length"
              type="primary"
              size="mini"
              @click="showSettleBox"
            >
              结算（F7）
            </el-button>
          </div>
        </div>
      </div>
    </ht-card>

    <settle-dialog
      :visible.sync="singleSettleVisible"
      :informationList="informationList"
      :companyId="detailRow && detailRow.companyId"
      :settlData="settleBillData"
      @settleSuccess="handleSettleRes"
    />
    <batch-settle-center-dialog
      :batch-settle="selection"
      :visible.sync="batchSettleVisible"
      @settle-res="handleSettleRes"
    />
    <payBox
      :visible.sync="payBoxVisible"
      :pay-data="payBoxData"
      @settle-res="handleSettleRes"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { baseDataMixin, tabChangeMixin } from "@/mixins/";
import { BatchSettleCenterDialog, SettleDialog } from "@/components/business";
import Search from "./Search";
import PayTable from "./PayTable";
import ChargeTable from "./ChargeTable";
import CollectTable from "./CollectTable";
import TransferTable from "./TransferTable";
import payBox from "../../components/payBox";

const settleTabs = {
  pay: "现付",
  charge: "挂账",
  collect: "物流代收",
  transfer: "调拨挂账"
};

export default {
  name: "SettleCenter",
  components: {
    Search,
    PayTable,
    ChargeTable,
    CollectTable,
    TransferTable,
    SettleDialog,
    BatchSettleCenterDialog,
    payBox
  },
  mixins: [tabChangeMixin, baseDataMixin],
  data() {
    return {
      keyScopes: {
        payTable: Symbol("settleCenterPayTable"),
        chargeTable: Symbol("settleCenterChargeTable"),
        collectTable: Symbol("settleCenterCollectTable"),
        transferTable: Symbol("settleCenterTransferTable")
      },
      singleSettleVisible: false,
      batchSettleVisible: false,
      settleTabs,
      totalNumers: {
        nowpayInNum: 0,
        nowpayOutNum: 0,
        ontickPurcNum: 0,
        ontickSaleNum: 0,
        ontickRepaireNum: 0,
        collectionPurcNum: 0,
        collectionSaleNum: 0,
        allocInNum: 0,
        allocOutNum: 0
      },
      selection: [],
      detailRow: null,
      queryParams: {},
      routeParamsName: "childTabName",
      defaultTab: "pay",
      childActiveTab: "0",
      isPayTableShowPagination: true,
      isChargeTableShowPagination: true,
      isCollectTableShowPagination: true,
      isTransferTableShowPagination: true,
      billNo: "",
      payBoxVisible: false,
      payBoxData: {},
      paymentType: 0
    };
  },
  computed: {
    ...mapState("admin/baseData", ["accountList"]),
    defaultAccountList() {
      return this.$store.state.admin.baseData.accountList.filter(
        item => item.isDefault && !item.isDisable
      );
    },
    activeTableRef() {
      return this.$refs[this.activeTab];
    },
    informationList() {
      if (!this.detailRow) {
        return [];
      }
      const columns = [
        { name: "单号", content: this.detailRow.billNo },
        {
          type: "billType"
        },
        {
          name: this.activeTab === "transfer" ? "往来分公司" : "往来单位",
          content: this.detailRow.cooperatorName
        },
        {
          name: "发票类型",
          content:
            this.getFormatInvoiceType(
              this.detailRow.invoiceType,
              this.detailRow.taxRate
            ) || "--"
        },
        {
          type: "amount"
        },
        {
          type: "settledAmount"
        },
        // {
        //   type: "discountAmount"
        // },
        {
          type: "unSettledAmount"
        }
      ];
      if (["XT", "XS"].includes(this.detailRow.billType)) {
        const brokerageAmountColumn = {
          name: "佣金",
          content: this.detailRow.brokerageAmount
        };
        columns.splice(3, 0, brokerageAmountColumn);
      }
      return columns;
    },
    settleBillData() {
      return (
        this.detailRow && {
          ...this.detailRow,
          id: this.detailRow.billId,
          sourceBillType: this.detailRow.billType,
          sourceBillId: this.detailRow.billId,
          isSettleIn: this.childActiveTab === "0"
        }
      );
    }
  },
  watch: {
    activeTab() {
      this.setTabKeyScope();
    }
  },
  activated() {
    this.setTabKeyScope();
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScopes.payTable);
    hotkeys.deleteScope(this.keyScopes.chargeTable);
    hotkeys.deleteScope(this.keyScopes.collectTable);
    hotkeys.deleteScope(this.keyScopes.transferTable);
  },
  methods: {
    setTabKeyScope() {
      if (this.activeTab === "pay") {
        this.setKeyScope(this.keyScopes.payTable);
      } else if (this.activeTab === "charge") {
        this.setKeyScope(this.keyScopes.chargeTable);
      } else if (this.activeTab === "collect") {
        this.setKeyScope(this.keyScopes.collectTable);
      } else if (this.activeTab === "transfer") {
        this.setKeyScope(this.keyScopes.transferTable);
      }
    },
    handleHotkeysUp(e) {
      switch (e.code) {
        case "F7":
          this.showSettleBox();
          break;
        default:
          break;
      }
      this.$refs.search &&
        this.$refs.search.keyboardListener &&
        this.$refs.search.keyboardListener(e);
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    canSettle(row) {
      return this.hasBelongsPerm("settle", row.belongs);
    },
    settleBill(row) {
      if (!row || !this.canSettle(row)) {
        this.detailRow = null;
        return;
      }
      this.detailRow = { ...row };
      if (this.activeTab === "pay" && row.billType === "DD") {
        this.payBoxData = {
          statementId: this.detailRow.billId,
          rpType: Number(this.paymentType || 0) === 0 ? 1 : 0
        };
        this.payBoxVisible = true;
      } else {
        this.singleSettleVisible = true;
      }
    },
    handlePaymentTypeChange(paymentType) {
      this.paymentType = paymentType;
    },
    showSettleBox() {
      if (this.selection.length >= 2) {
        const transferstatementList = this.selection.filter(
          item => item.billType === "DD"
        );
        if (transferstatementList.length) {
          this.$alert(
            `单据 ${transferstatementList
              .map(item => item.billNo)
              .join("，")} 为调拨对账单，请采用单个结算！`,
            { type: "warning" }
          );
          return;
        }

        const unSetInvoiceList = this.selection.filter(
          item =>
            ["XS", "XT", "CG", "CT", "JJ"].includes(item.billType) &&
            !item.invoiceType
        );
        if (unSetInvoiceList.length) {
          this.$alert(
            `单据 ${unSetInvoiceList
              .map(item => item.billNo)
              .join("，")} 没有设置发票类型，请采用单个结算！`,
            { type: "warning" }
          );
          return;
        }
        const unSetAccountList = this.selection.filter(
          item => !item.fundAccountId
        );
        const noDefaultList = [];
        unSetAccountList.forEach(item => {
          const curDefaultAccount = this.defaultAccountList.find(
            it => it.companyId === item.companyId
          );
          if (curDefaultAccount) {
            item.cooperatorId = curDefaultAccount.id;
            item.cooperatorName = curDefaultAccount.name;
            item.paymentMethod = curDefaultAccount.paymentMethod;
          } else {
            noDefaultList.push(item.companyId);
          }
        });
        if (noDefaultList.length) {
          this.$confirm(
            `${noDefaultList.map(
              this.getCompanyName
            )}没有设置默认结算账户，请先设置后再批量结算！`,
            "提示"
          );
        } else {
          this.batchSettleVisible = true;
        }
      } else if (this.selection.length === 1) {
        this.settleBill(this.selection[0]);
      }
    },
    sortDataArray(dataArray) {
      dataArray.sort(function(a, b) {
        return (
          Date.parse(b.createdAt.replace(/-/g, "/")) -
          Date.parse(a.createdAt.replace(/-/g, "/"))
        );
      });
      return dataArray;
    },
    uniqueArr(arr) {
      const nweArr = new Set(arr);
      return [...nweArr];
    },
    handleSettleRes(res) {
      if (res) {
        this.payBoxVisible = false;
        this.batchSettleVisible = false;
        this.singleSettleVisible = false;
        this.activeTableRef.loadData();
      }
    },
    searchHandle(queryParams) {
      this.queryParams = queryParams;
      this.selection = [];
      setTimeout(async () => {
        await this.activeTableRef?.loadFirstPage();
        setTimeout(() => {
          if (this.billNo && this.selection.length) {
            this.settleBill(this.selection[0]);
            this.billNo = "";
          }
        });
      });
    },
    handleSelectChange(selection) {
      this.selection = selection || [];
    },
    handleTotalNumberChange(totalNumers) {
      this.totalNumers = totalNumers;
    },
    handleBillNoChange(billNo) {
      this.billNo = billNo;
    }
  }
};
</script>

<style lang="scss" scoped>
.auto-card {
  ::v-deep .total-numer {
    color: #d9001b;
  }
}

.no-tab-content {
  ::v-deep .el-tabs__content {
    padding: 0;
  }
}

.table-box {
  height: calc(100% - 50px);

  ::v-deep .el-radio-group {
    margin: 10px;
  }

  ::v-deep .icon-back-settle {
    display: inline-block;
    background: #f5387d;
    color: #ffffff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    text-align: center;
  }
}

.button-box {
  margin: -45px 0 5px 5px;
  width: 115px;
}
</style>
