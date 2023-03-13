<template>
  <ht-dialog
    v-bind="$attrs"
    class="dialog-container ignore-top-hotkeys"
    title="待转采购单"
    top="7vh"
    width="1200px"
    v-on="$listeners"
  >
    <div class="container-box" style="height: 600px" v-loading="loading">
      <ht-card>
        <el-form
          ref="pendingForm"
          :model="searchForm"
          class="form-item-small-margin-bottom"
          size="mini"
          label-width="60px"
          label-position="left"
        >
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="单据日期" prop="billDate">
                <HtDateRange
                  v-model="searchForm.billDate"
                  shortcuts-type="all"
                />
              </el-form-item>
              <el-form-item prop="businessManId" label="业务员">
                <ht-autoselect
                  v-model="searchForm.businessManId"
                  :fetch-suggestions="searchLoadAllPurchaseMen"
                  :trigger-on-focus="false"
                  placeholder="请选择"
                  remote
                  clearable
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="预计到货日期"
                prop="arrivalDate"
                label-width="87px"
              >
                <HtDateRange
                  v-model="searchForm.arrivalDate"
                  shortcuts-type="all"
                />
              </el-form-item>
              <el-form-item prop="createdBy" label="制单人" label-width="87px">
                <ht-autoselect
                  v-model="searchForm.createdBy"
                  :fetch-suggestions="
                    query => searchLoadAllCreatedMen(['CD'], query)
                  "
                  :trigger-on-focus="false"
                  placeholder="请选择"
                  remote
                  clearable
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="供应商" prop="cooperatorName">
                <ht-autocomplete
                  v-model="searchForm.cooperatorName"
                  :fetch-suggestions="autocompleteSearchAllSuppliers"
                  :trigger-on-focus="false"
                  clearable
                  highlight-first-item
                  placeholder="请选择"
                />
              </el-form-item>
              <el-form-item label="配件" prop="partNameOrCode">
                <ht-input
                  v-model="searchForm.partNameOrCode"
                  placeholder="配件编号/配件名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单据号" prop="billNo">
                <ht-input v-model="searchForm.billNo" placeholder="订单号" />
              </el-form-item>
              <div style="text-align: right;">
                <el-button type="primary" size="mini" @click="searchHandle">
                  查询（F5）
                </el-button>
                <el-button type="primary" size="mini" @click="resetHandle">
                  重置（F6）
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </ht-card>

      <ht-card class="auto-card" no-padding>
        <ht-setting-table
          :loading="tableLoading"
          :data="tableData"
          :columns="tableColumns"
          :total="totalSize"
          :current-page="currentPage"
          :key-scope="keyScope"
          :selected-rows.sync="selectedRows"
          :table-name="tableName"
          pagination
          @pageChange="pageChangeHandle"
          @hotkeysUp="handleKeyCode"
          @rowOperation="handleRowAdd"
        />
      </ht-card>
    </div>

    <TransferBox
      :visible.sync="transferBoxVisible"
      :headerData="billHeader"
      :totalData="billDetails"
      :mapData="billMapData"
      :companyId="companyId"
      @success="handleTransferSuccess"
    />
  </ht-dialog>
</template>

<script>
import { reqReceivePendingList } from "@/api/purchase/purchaseReceive";
import { reqPurchaseBillingDetails } from "@/api/purchase/purchaseList";
import { mapState } from "vuex";
import { CELL_WIDTH } from "@/constants";
import { searchMixin } from "@/mixins";
import BillMapConfirm from "@/components/bill-map-confirm";
import hotkeys from "hotkeys-js";
import TransferBox from "../../components/TransferBox";
import { PURCHASE_ORDER_STATUS } from "@/constants/states/purchase";

let oldKeyScope;
const defaultSearchForm = {
  billDate: [],
  businessManId: null,
  arrivalDate: [],
  createdBy: null,
  cooperatorName: "",
  partNameOrCode: "",
  billNo: ""
};

export default {
  name: "PendingReceiveBox",
  components: { TransferBox },
  mixins: [searchMixin],
  data() {
    const createReceive = (row, e) => {
      e.stopPropagation();
      this.createReceive(row);
    };
    const controlsColumn = {
      label: "操作",
      prop: "controls",
      width: 70,
      cantExport: true,
      render: (value, row) => (
        <div class="table-button">
          <el-button
            disabled={!this.canTransfer(row)}
            type="text"
            size="mini"
            on-click={e => createReceive(row, e)}
          >
            转采购单
          </el-button>
        </div>
      )
    };

    return {
      keyScope: "PendingReceiveBox",
      searchForm: {
        ...defaultSearchForm
      },
      loading: false,
      tableLoading: false,
      totalSize: 0,
      currentPage: 1,
      tableData: [],
      selectedRows: [],
      tableName: "PurchaseReceivePendingReceiveBoxList",
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true
        },
        controlsColumn,
        {
          prop: "arrivalDate",
          label: "预计到货日期",
          width: CELL_WIDTH.date,
          type: "date"
        },
        {
          prop: "billDate",
          label: "单据日期",
          width: CELL_WIDTH.date,
          type: "date"
        },
        { prop: "billNo", label: "订单号", width: CELL_WIDTH.no },
        {
          prop: "cooperatorName",
          label: "供应商",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "realQty",
          label: "数量",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "taxedAmount",
          label: "进货总额",
          width: CELL_WIDTH.money,
          type: "number"
        },
        {
          prop: "depositAmount",
          label: "定金",
          width: CELL_WIDTH.money,
          type: "number"
        },
        {
          prop: "receiverAt",
          label: "到货日期",
          width: CELL_WIDTH.time
        },
        {
          prop: "stockinQty",
          label: "已到货数量",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "stockinTaxedAmount",
          label: "已到货金额",
          width: CELL_WIDTH.money,
          type: "number"
        },
        {
          prop: "terminatedQty",
          label: "终止数量",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "peerOrderNo",
          label: "对方单号",
          width: CELL_WIDTH.no
        },
        {
          prop: "enhancedSettlementType",
          label: "支付方式",
          width: CELL_WIDTH.type
        },
        {
          prop: "invoiceType",
          label: "发票类型",
          width: CELL_WIDTH.type
        },
        {
          prop: "sourceType",
          label: "单据来源",
          width: CELL_WIDTH.type
        },
        {
          prop: "sourceBillNo",
          label: "来源单号",
          width: CELL_WIDTH.no
        },
        {
          prop: "receiverName",
          label: "收货人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "receiverPhone",
          label: "收货人手机",
          width: CELL_WIDTH.phone
        },
        {
          prop: "receiverAddress",
          label: "收货人地址",
          width: CELL_WIDTH.address,
          type: "address"
        },
        {
          prop: "businessManName",
          label: "业务员",
          width: CELL_WIDTH.personName
        },
        {
          prop: "createdByName",
          label: "制单人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "createdAt",
          label: "制单时间",
          width: CELL_WIDTH.time,
          type: "time"
        },
        {
          prop: "submitByName",
          label: "提交人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "submitAt",
          label: "提交时间",
          width: CELL_WIDTH.time,
          type: "time"
        },
        {
          prop: "auditByName",
          label: "审核人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "auditAt",
          label: "审核时间",
          width: CELL_WIDTH.time,
          type: "time"
        },
        { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
      ],

      transferBoxVisible: false,
      billHeader: {},
      billDetails: [],
      billMapData: {}
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    companyId() {
      return this.selectedRows.length === 1
        ? this.selectedRows[0].companyId
        : 0;
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          setTimeout(() => {
            oldKeyScope = hotkeys.getScope();
            hotkeys.setScope(this.keyScope);
          }, 100);
          this.searchHandle();
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
          this.searchForm = { ...defaultSearchForm };
          this.tableData = [];
          this.selectedRows = [];
          this.currentPage = 1;
        }
      },
      immediate: true
    }
  },
  methods: {
    handleKeyCode(e) {
      switch (e.code) {
        case "F5":
          this.searchHandle();
          break;
        case "F6":
          this.resetHandle();
          break;
        default:
          return;
      }
    },
    handleRowAdd(row) {
      this.createReceive(row);
    },
    searchHandle() {
      this.pageChangeHandle(1);
    },
    resetHandle() {
      this.$refs["pendingForm"].resetFields();
    },
    pageChangeHandle(page = 1) {
      this.selectedRows = [];
      this.currentPage = page;
      const searchData = {
        ...this.searchForm,
        cooperatorId: (
          this.searchedData.suppliers.find(
            item => item.name === this.searchForm.cooperatorName
          ) || {}
        ).id
      };
      if (searchData.billDate && searchData.billDate.length) {
        searchData.billDateStart = searchData.billDate[0];
        searchData.billDateEnd = searchData.billDate[1];
      }
      if (searchData.arrivalDate && searchData.arrivalDate.length) {
        searchData.arrivalDateStart = searchData.arrivalDate[0];
        searchData.arrivalDateEnd = searchData.arrivalDate[1];
      }
      this.tableLoading = true;
      reqReceivePendingList({
        ...searchData,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(data => {
          this.tableLoading = false;
          this.tableData = data.rows || [];
          this.totalSize = data.totalSize;
          this.selectedRows = [this.tableData[0]] || [];
        })
        .catch(() => {
          this.selectedRows = [];
          this.tableLoading = false;
        });
    },
    canTransfer(row) {
      return this.hasBelongsPermWithoutRoute(
        "transfer",
        "purchases.orders",
        // 只操作自己公司的单据，有其他分公司权限不可操作
        row.belongs && row.belongs.length ? row.belongs : ["null"]
      );
    },
    createReceive(row) {
      this.selectedRows = [row];
      if (!this.canTransfer(row)) return;
      if (row.platformKey) {
        BillMapConfirm(
          {
            billId: row.id,
            platformKey: row.platformKey,
            billType: 0
          },
          this.searchLoadAllSupplierCooperators
        )
          .then(res => {
            this.billMapData = { ...res };
            this.getBillData(row.id).then(() => {
              this.transferBoxVisible = true;
            });
          })
          .catch(() => {});
      } else {
        this.getBillData(row.id).then(() => {
          this.transferBoxVisible = true;
        });
      }
    },
    getBillData(billId) {
      this.loading = true;
      return reqPurchaseBillingDetails(billId)
        .then(res => {
          let tips = "";
          if (res.header.platformKey) {
            if ([0, 1, 2, 3, 4].includes(res.header.status)) {
              tips = "（平台订单待卖家发货后，可转采购单）";
            } else if (res.header.status === 12) {
              tips = `（请前往${res.header.platformName}平台完成付款）`;
            }
          }
          if (res.header.status === 5) {
            tips = "（请前往采购开单，完成采购入库单流程）";
          }
          this.billHeader = {
            ...res.header,
            statusTxt: PURCHASE_ORDER_STATUS[res.header.status],
            tips
          };
          this.billDetails = res.details || [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleTransferSuccess(arrivalId) {
      this.searchHandle();
      this.$emit("on-receive");
      this.gotoBilling(arrivalId);
    },
    gotoBilling(id) {
      if (typeof id === "number") {
        this.$router.push({
          path: "/PurchaseReceiveBilling",
          query: { billId: id }
        });
      } else {
        if (this.selectedRows.length === 1) {
          this.$router.push({
            path: "/PurchaseReceiveBilling",
            query: { billId: this.selectedRows[0].id }
          });
        } else {
          this.$message.warning({ message: "请选择一个订单", showClose: true });
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.dialog-container
    /deep/ .el-dialog__body
        padding: 0;
        background-color: #E7EBED;
</style>
