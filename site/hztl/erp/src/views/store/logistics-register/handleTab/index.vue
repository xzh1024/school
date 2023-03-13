<template>
  <div class="container-box">
    <ht-card no-padding>
      <ht-tabs
        v-model="activeTab"
        :tabs="tabList"
        class="tabs-regular"
        style="margin-bottom: 10px;"
        @change="changeTab"
      />
      <span
        class="text-danger"
        style="cursor:pointer;float:right;position:absolute;right:5px;top:52px;"
        @click="openManualDialog"
        ><i class="el-icon-question"></i>如何使用收发货登记</span
      >
      <ToBeHandledSearch
        v-show="activeTab === 'ToBeHandle'"
        class="search-container"
        @on-search="searchToBeHandled"
      />
      <LogisticsRegisterSearch
        v-show="activeTab === 'Logistics'"
        :is-receive="isReceive"
        class="search-container"
        @on-search="searchLogisticsRegister"
      />
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ToBeHandledList
        v-show="activeTab === 'ToBeHandle'"
        ref="refToBeHandledList"
        :query-params="queryParamsToBeHandled"
        :is-receive="isReceive"
        height="calc(100% - 33px)"
        @rows-change="handleSelectedToBeHandledListRows"
      />
      <LogisticsRegisterList
        v-show="activeTab === 'Logistics'"
        ref="refLogisticsRegisterList"
        :is-receive="isReceive"
        :is-handle-search="isHandleSearch"
        :query-params="queryParamsLogisticsRegister"
        height="calc(100% - 33px)"
        @rows-change="handleSelectedLogisticsRegisterListRows"
        @rowOperation="updateHandle"
      />
      <div
        v-show="activeTab === 'ToBeHandle'"
        style="margin: -31px 0 0 10px; width: 100px"
      >
        <el-button
          :disabled="!selectedToBeHandledListRows.length || !canRegister"
          type="primary"
          size="mini"
          @click="registerHandle"
        >
          {{ isReceive ? "收货登记" : "发货登记" }}
        </el-button>
      </div>
      <div
        v-show="activeTab === 'Logistics'"
        style="margin: -31px 0 0 10px; width: 490px"
      >
        <el-button
          :disabled="!canUpdate"
          type="primary"
          size="mini"
          @click="updateHandle"
        >
          查改（F3）
        </el-button>
        <el-button
          :disabled="!canConfirm"
          type="primary"
          size="mini"
          @click="confirmHandle"
        >
          确认（F9）
        </el-button>
        <el-button
          :disabled="!canSettle"
          type="primary"
          size="mini"
          @click="settleHandle"
        >
          结算（F7）
        </el-button>
        <el-button
          :disabled="!canSignFor"
          type="primary"
          size="mini"
          @click="signForHandle"
        >
          签收
        </el-button>
        <el-button
          v-if="!isReceive"
          :disabled="!canPrint"
          type="primary"
          size="mini"
          @click="printLabelHandle"
        >
          打印发货标签
        </el-button>
      </div>
    </ht-card>

    <HandleRigisterBox
      :visible.sync="showHandleRigisterBox"
      :rule-data="ruleData"
      :is-receive="isReceive"
      :register-id="registerId"
      :is-confirm="isConfirm"
      @on-sure="handleRigisterSure"
      @on-confirm="confirmRigister"
      @on-sign-for="signForHandle"
    />
    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :companyId="companyId"
      cantEditMoney
      @settleSuccess="settleComplete"
    />
    <PrintGoodsLabelBox
      v-if="!isReceive"
      :value="{
        billType: TYPE,
        billId: selectedLogisticsRegisterListRows[0]
          ? selectedLogisticsRegisterListRows[0].id
          : null
      }"
      :visible.sync="printGoodsLabelBoxVisible"
    />
  </div>
</template>

<script>
import {
  HandleRigisterBox,
  LogisticsRegisterList,
  LogisticsRegisterSearch,
  ToBeHandledList,
  ToBeHandledSearch
} from "./components";
import { SettleDialog } from "@/components/business";
import PrintGoodsLabelBox from "@/components/PrintGoodsLabelBox";
import {
  reqConfirmLogisticsRegister,
  reqSignForLogisticsRegister
} from "@/api/store/logisticsRegister";
import { baseDataMixin, precisionsFixed, tabChangeMixin } from "@/mixins";
import eventBus from "@/event";
import { add } from "@/utils/numberAPI";
import { openNewWindow } from "@/utils/tool";

const TYPE = "FHDJ";
const receiveBillTypeMap = {
  0: "RO",
  1: "RS",
  2: "RA"
};
const deliverBillTypeMap = {
  0: "SO",
  1: "SS",
  2: "SA"
};

export default {
  name: "HandleTab",
  components: {
    ToBeHandledSearch,
    ToBeHandledList,
    LogisticsRegisterSearch,
    LogisticsRegisterList,
    HandleRigisterBox,
    SettleDialog,
    PrintGoodsLabelBox
  },
  mixins: [baseDataMixin, tabChangeMixin, precisionsFixed],
  props: {
    isReceive: Boolean,
    myCompanyInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      routeParamsName: "childTabName",
      defaultTab: "ToBeHandle",
      queryParamsLogisticsRegister: {},
      queryParamsToBeHandled: {},
      selectedLogisticsRegisterListRows: [],
      selectedToBeHandledListRows: [],
      showHandleRigisterBox: false,
      ruleData: {},
      registerId: 0,
      settleDialogVisible: false,
      settleData: {},
      settleList: [],
      companyId: 0,
      isHandleSearch: false,
      isConfirm: false,
      printGoodsLabelBoxVisible: false,
      TYPE
    };
  },
  computed: {
    tabList() {
      if (this.isReceive) {
        return [
          { id: "ToBeHandle", name: "待收货登记" },
          { id: "Logistics", name: "物流登记" }
        ];
      } else {
        return [
          { id: "ToBeHandle", name: "待发货登记" },
          { id: "Logistics", name: "物流登记" }
        ];
      }
    },
    canRegister() {
      return (
        this.selectedToBeHandledListRows.length &&
        !this.selectedToBeHandledListRows.some(
          item =>
            item.cooperatorId !==
            this.selectedToBeHandledListRows[0].cooperatorId
        ) &&
        ((this.isReceive && this.hasAutoPerm("receive.register")) ||
          (!this.isReceive && this.hasAutoPerm("send.register")))
      );
    },
    canSettle() {
      return (
        this.selectedLogisticsRegisterListRows.length === 1 &&
        this.selectedLogisticsRegisterListRows[0].status === 1 &&
        this.hasBelongsPermWithoutRoute("settle", "financials.settlements")
      );
    },
    canUpdate() {
      return (
        this.selectedLogisticsRegisterListRows.length === 1 &&
        ((this.isReceive && this.hasAutoPerm("receive.register")) ||
          (!this.isReceive && this.hasAutoPerm("send.register")))
      );
    },
    canConfirm() {
      return (
        this.selectedLogisticsRegisterListRows.length === 1 &&
        this.selectedLogisticsRegisterListRows[0].status === 0 &&
        ((this.isReceive && this.hasAutoPerm("receive.register")) ||
          (!this.isReceive && this.hasAutoPerm("send.register")))
      );
    },
    canSignFor() {
      return (
        this.selectedLogisticsRegisterListRows.length === 1 &&
        this.selectedLogisticsRegisterListRows[0].status === 2 &&
        ((this.isReceive && this.hasAutoPerm("receive.register")) ||
          (!this.isReceive && this.hasAutoPerm("send.register")))
      );
    },
    canPrint() {
      return (
        this.selectedLogisticsRegisterListRows.length === 1 &&
        this.hasAutoPerm("send.labelPrint")
      );
    }
  },
  methods: {
    openManualDialog() {
      //传入角色管理对应id，打开dialog
      // this.manualVisible = true;
      eventBus.$emit("open-manual-dialog", 55);
    },
    searchToBeHandled(queryParams) {
      this.queryParamsToBeHandled = { ...queryParams };
    },
    searchLogisticsRegister(queryParams) {
      this.queryParamsLogisticsRegister = { ...queryParams };
      this.isHandleSearch = true;
    },
    loadData() {
      this.$refs.refToBeHandledList.loadData();
      this.$refs.refLogisticsRegisterList.loadData();
    },
    handleSelectedToBeHandledListRows(rows) {
      this.selectedToBeHandledListRows = rows || [];
    },
    handleSelectedLogisticsRegisterListRows(rows) {
      this.selectedLogisticsRegisterListRows = rows || [];
    },
    registerHandle() {
      if (this.canRegister) {
        this.isConfirm = false;
        this.registerId = 0;
        if (this.selectedToBeHandledListRows.length > 1) {
          let totalFreight = 0;
          this.selectedToBeHandledListRows.forEach(item => {
            totalFreight = Number(
              Number(totalFreight) + Number(item.freight)
            ).toFixed(4);
          });
          this.ruleData = {
            freight: totalFreight,
            logisticsCompanyId: this.selectedToBeHandledListRows.some(
              item =>
                item.logisticsCompanyId !==
                this.selectedToBeHandledListRows[0].logisticsCompanyId
            )
              ? null
              : this.selectedToBeHandledListRows[0].logisticsCompanyId,
            logisticsCompanyName: this.selectedToBeHandledListRows.some(
              item =>
                item.logisticsCompanyName !==
                this.selectedToBeHandledListRows[0].logisticsCompanyName
            )
              ? ""
              : this.selectedToBeHandledListRows[0].logisticsCompanyName,
            cooperatorName: this.selectedToBeHandledListRows[0].cooperatorName,
            cooperatorId: this.selectedToBeHandledListRows[0].cooperatorId,
            companyName: this.myCompanyInfo.name,
            receiverName: this.isReceive
              ? this.selectedToBeHandledListRows[0].receiverName ||
                this.myCompanyInfo.contacts
              : this.selectedToBeHandledListRows[0].receiverName,
            receiverPhone: this.isReceive
              ? this.selectedToBeHandledListRows[0].receiverPhone ||
                this.myCompanyInfo.phone
              : this.selectedToBeHandledListRows[0].receiverPhone,
            receiverAddress: this.isReceive
              ? this.selectedToBeHandledListRows[0].receiverAddress ||
                this.myCompanyInfo.address
              : this.selectedToBeHandledListRows[0].receiverAddress,
            senderPhone: this.isReceive ? "" : this.myCompanyInfo.phone,
            senderAddress: this.isReceive ? "" : this.myCompanyInfo.address,
            payer: this.selectedToBeHandledListRows[0].freightPayer,
            tableData: this.selectedToBeHandledListRows || []
          };
        } else {
          this.ruleData = {
            ...this.selectedToBeHandledListRows[0],
            companyName: this.myCompanyInfo.name,
            receiverName: this.isReceive
              ? this.selectedToBeHandledListRows[0].receiverName ||
                this.myCompanyInfo.contacts
              : this.selectedToBeHandledListRows[0].receiverName,
            receiverPhone: this.isReceive
              ? this.selectedToBeHandledListRows[0].receiverPhone ||
                this.myCompanyInfo.phone
              : this.selectedToBeHandledListRows[0].receiverPhone,
            receiverAddress: this.isReceive
              ? this.selectedToBeHandledListRows[0].receiverAddress ||
                this.myCompanyInfo.address
              : this.selectedToBeHandledListRows[0].receiverAddress,
            senderPhone: this.isReceive ? "" : this.myCompanyInfo.phone,
            senderAddress: this.isReceive ? "" : this.myCompanyInfo.address,
            payer: this.selectedToBeHandledListRows[0].freightPayer,
            tableData: this.selectedToBeHandledListRows || []
          };
        }
        this.showHandleRigisterBox = true;
      } else {
        this.$message({
          message: "请选择相同往来单位的单据！",
          type: "warning",
          showClose: true
        });
      }
    },
    handleRigisterSure() {
      if (this.registerId) {
        this.isHandleSearch = false;
        this.loadData();
      } else {
        this.isHandleSearch = true;
        this.loadData();
      }
    },
    updateHandle() {
      if (!this.canUpdate) return;
      this.isConfirm = false;
      this.registerId = this.selectedLogisticsRegisterListRows[0].id || 0;
      this.showHandleRigisterBox = true;
    },
    confirmHandle() {
      if (!this.canConfirm) return;
      this.isConfirm = true;
      this.registerId = this.selectedLogisticsRegisterListRows[0].id || 0;
      this.showHandleRigisterBox = true;
    },
    confirmRigister() {
      this.$confirm(
        `确定要对登记单「${this.selectedLogisticsRegisterListRows[0].freightNo}」做确认处理吗？`,
        "提示",
        { type: "warning" }
      ).then(() => {
        reqConfirmLogisticsRegister(
          this.selectedLogisticsRegisterListRows[0].id
        ).then(() => {
          this.$message({
            message: "确认登记单成功！",
            type: "success",
            showClose: true
          });
          this.isHandleSearch = false;
          this.showHandleRigisterBox = false;
          this.loadData();
        });
      });
    },
    settleHandle() {
      if (!this.canSettle) return;
      this.companyId = this.selectedLogisticsRegisterListRows[0].companyId;
      this.settleData = {
        id: this.selectedLogisticsRegisterListRows[0].id,
        billType: this.isReceive
          ? receiveBillTypeMap[this.selectedLogisticsRegisterListRows[0].payer]
          : deliverBillTypeMap[this.selectedLogisticsRegisterListRows[0].payer],
        billNo: this.selectedLogisticsRegisterListRows[0].freightNo,
        enhancedSettlementType: this.selectedLogisticsRegisterListRows[0]
          .enhancedSettlementType,
        amount: this.precisionFormat(
          add(
            this.selectedLogisticsRegisterListRows[0].freight,
            add(
              this.selectedLogisticsRegisterListRows[0].packCharges,
              add(
                this.selectedLogisticsRegisterListRows[0].insuredCharges,
                this.selectedLogisticsRegisterListRows[0].otherCharges
              )
            )
          ),
          "money"
        )
      };
      this.settleList = [
        {
          name: "单号",
          content: this.selectedLogisticsRegisterListRows[0].freightNo
        },
        {
          type: "billType"
        },
        {
          name: "往来单位",
          content: this.selectedLogisticsRegisterListRows[0].cooperatorName
        },
        {
          name: "物流公司",
          content: this.selectedLogisticsRegisterListRows[0]
            .logisticsCompanyName
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
      this.settleDialogVisible = true;
    },
    settleComplete() {
      this.isHandleSearch = false;
      this.loadData();
    },
    signForHandle() {
      if (!this.canSignFor) return;
      this.$confirm(
        `确定要对登记单「${this.selectedLogisticsRegisterListRows[0].freightNo}」做签收处理吗？`,
        "提示",
        { type: "warning" }
      ).then(() => {
        this.signForRegister();
      });
    },
    signForRegister() {
      reqSignForLogisticsRegister(
        this.selectedLogisticsRegisterListRows[0].id
      ).then(() => {
        this.$message({
          message: "签收登记单成功！",
          type: "success",
          showClose: true
        });
        this.isHandleSearch = false;
        this.showHandleRigisterBox = false;
        this.loadData();
      });
    },
    printGoodsLabelHandle() {
      if (!this.canPrint) {
        return;
      }
      this.printGoodsLabelBoxVisible = true;
    },
    // 收发货登记-发货处理-物流登记-发货单
    printLabelHandle() {
      openNewWindow(
        this.$router.resolve({
          path:
            "/Print/Label/ShippingLabel/Logistics/" +
            this.selectedLogisticsRegisterListRows[0].id
        }).href,
        "print"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  margin: 10px;
}
</style>
