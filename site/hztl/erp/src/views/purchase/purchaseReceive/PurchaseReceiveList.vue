<template>
  <div class="container-box">
    <div class="header">
      <div class="flex-container">
        <div>
          <el-button
            :disabled="!canClick || !canCreate"
            type="primary"
            size="mini"
            @click="createHandle"
          >
            开单（F2）
          </el-button>
          <el-button
            :disabled="!canClick || !canRead"
            type="primary"
            size="mini"
            @click="updateHandle"
          >
            查改（F3）
          </el-button>
          <el-button
            :disabled="!canClick || !canDelete"
            :loading="deleteLoading"
            type="primary"
            size="mini"
            @click="deleteHandle"
          >
            删除（F4）
          </el-button>
          <el-button
            :disabled="!canClick || !canSubmit"
            :loading="submitLoading"
            type="primary"
            size="mini"
            @click="submitHandle"
          >
            提交（F9）
          </el-button>
          <el-button
            :disabled="!canClick || !canRecall"
            :loading="recallLoading"
            type="primary"
            size="mini"
            @click="recallHandle"
          >
            撤回（F9）
          </el-button>
          <el-button
            :disabled="!canClick || !canSettleStockIn"
            type="primary"
            size="mini"
            @click="settleHandle"
          >
            结算即入库（F7）
          </el-button>
          <el-button
            :disabled="!canClick || !canImport"
            type="primary"
            size="mini"
            @click="importHandle"
          >
            导入（Alt+I）
          </el-button>
          <el-button
            :disabled="!canClick || !canPrint"
            type="primary"
            size="mini"
            @click="printHandle"
          >
            打印（F11）
          </el-button>
          <el-button
            :disabled="!canClick || !canSubmit"
            type="primary"
            size="mini"
            @click="setWarehouseHandle"
          >
            设置到货仓库
          </el-button>
        </div>

        <div>
          <span v-show="pendingNum" style="margin-right: 10px">
            <el-link :underline="false" @click="showPendingBox = true">
              <span class="pending-text">待转采购单</span>
              <span class="danger-text">（{{ pendingNum }}）</span>
            </el-link>
          </span>
          <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
        </div>
      </div>
    </div>

    <ht-card>
      <el-form
        ref="receiveForm"
        :model="searchForm"
        size="mini"
        label-width="60px"
        label-position="left"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="业务日期" prop="billDate">
              <HtDateRange v-model="searchForm.billDate" shortcuts-type="all" />
            </el-form-item>
            <el-form-item label="供应商" prop="cooperatorId">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="searchLoadAllSupplierCooperators"
                :trigger-on-focus="false"
                filterZero
                remote
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="业务公司" prop="companyIds">
              <ht-select
                v-model="searchForm.companyIds"
                :options="myCompanys"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据号" prop="billNo">
              <ht-input
                v-model="searchForm.billNo"
                placeholder="单据号/订货计划单号"
              />
            </el-form-item>
            <el-form-item prop="enhancedSettlementTypes" label="支付方式">
              <ht-select
                v-model="searchForm.enhancedSettlementTypes"
                :options="store().enhancedSettlementTypeDictionary()"
                placeholder="支付方式"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item
              prop="businessManId"
              label="业务员"
              label-width="45px"
            >
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
          <el-col :span="5">
            <el-form-item label="单据状态" prop="status">
              <ht-select
                v-model="searchForm.status"
                :options="orderStatuses"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="打印状态" prop="printStatus">
              <ht-select
                v-model="searchForm.printStatus"
                :options="NEW_PRINT_STATUS"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="配件" prop="partNameOrCode" label-width="45px">
              <ht-input
                v-model="searchForm.partNameOrCode"
                placeholder="配件编号/配件名称"
              />
            </el-form-item>
            <el-form-item prop="createdBy" label="制单人" label-width="45px">
              <ht-autoselect
                v-model="searchForm.createdBy"
                :fetch-suggestions="
                  query => searchLoadAllCreatedMen(['CG'], query)
                "
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                highlight-first-item
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click.stop="clearSearchForm"
              >
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-padding>
      <ht-table
        autofocus
        :loading="tableLoading"
        :data="tableData"
        :pagination="showPagination"
        :total="receiveTotal"
        :current-page="currentPage"
        :table-name="detailsName"
        :columns="tablecolumnsReceive"
        :summary-method="setTotals"
        :selected-rows.sync="selectedRows"
        show-summary
        setting-all-column
        show-table-setting
        @pageChange="pageChangeHandle"
        @rowOperation="handleRowEdit"
        @table-setting="handleTableSetting"
        @sort-change="handleSortChange"
      />
    </ht-card>
    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
      @show-pagination-change="value => (showPagination = value)"
    />

    <PendingReceiveBox
      :visible.sync="showPendingBox"
      @on-receive="handleSearch"
    />
    <EditWarehouseBox
      :visible.sync="editWarehouseBoxVisible"
      :details="details"
      :header="header"
      :hasSubmit="hasSubmit"
      @on-eidt="pageChangeHandle(currentPage)"
    />
    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :companyId="companyId"
      @settleSuccess="settleComplete"
    />
    <BillingImportBox
      ref="refBillingImportBox"
      v-model="importInfo"
      :visible.sync="importVisible"
      :disabled="!canImport"
      :req-handler="importPurchasesOrders"
      :billData="billData"
      :companyId="companyId"
    />
  </div>
</template>
<script>
import PendingReceiveBox from "./dialog/PendingReceiveBox";
import { mapState, mapGetters } from "vuex";
import { PURCHASE_RECEIVE_STATUS } from "@/constants/states/purchase";
import {
  reqReceiveDelete,
  reqReceiveDetails,
  reqReceiveList,
  reqReceivePendingList,
  reqReceiveRecall,
  reqReceiveSubmit
} from "@/api/purchase/purchaseReceive";
import { TABLE_PURCHASE_RECEIVE_LIST } from "../constants";
import { NEW_PRINT_STATUS } from "@/constants";
import { EditColumns } from "@/components/table";
import EditWarehouseBox from "./dialog/EditWarehouseBox";
import {
  hotkeyMixin,
  precisionsFixed,
  searchMixin,
  baseDataMixin
} from "@/mixins";
import { SettleDialog } from "@/components/business";
import { BillingImportBox } from "../components";
import { reqImportPurchasesBills } from "@/api/importBox";
import { purchaseBillOptions } from "@/components/importBox/options";
import { PURCHASE_BILL_COUNT } from "@/constants";
import { openNewWindow } from "@/utils/tool";
import VideoPopover from "@/components/VideoPopover";
import * as store from "@/utils/store";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
const defaultSearchForm = {
  billDate: [],
  cooperatorId: null,
  billNo: "",
  status: Object.keys(PURCHASE_RECEIVE_STATUS).map(item => Number(item)),
  partNameOrCode: "",
  businessManId: null,
  createdBy: null,
  printStatus: [],
  enhancedSettlementTypes: []
};

export default {
  name: "PurchaseReceiveList",
  components: {
    PendingReceiveBox,
    EditColumns,
    EditWarehouseBox,
    SettleDialog,
    BillingImportBox,
    VideoPopover
  },
  mixins: [searchMixin, precisionsFixed, hotkeyMixin, baseDataMixin],
  data() {
    return {
      showPendingBox: false,
      pendingNum: 0,
      orderStatuses: PURCHASE_RECEIVE_STATUS,
      searchForm: {
        ...defaultSearchForm
      },
      tableLoading: false,
      currentPage: 1,
      editColumnsVisible: false,
      showPagination: false,
      baseDetailsColumns: TABLE_PURCHASE_RECEIVE_LIST.columns,
      detailsName: TABLE_PURCHASE_RECEIVE_LIST.name,
      tablecolumnsReceive: [],
      tableData: [],
      summaryTotals: {},
      receiveTotal: 0,
      selectedRows: [],
      details: [],
      header: {},
      editWarehouseBoxVisible: false,
      hasSubmit: false,
      settleDialogVisible: false,
      settleList: [],
      settleData: {},
      deleteLoading: false,
      submitLoading: false,
      recallLoading: false,
      importVisible: false,
      importInfo: {
        options: purchaseBillOptions,
        hasSetting: true,
        offset: PURCHASE_BILL_COUNT,
        cooperatorId: null,
        cooperatorName: "",
        enhancedSettlementType: "",
        invoiceType: "",
        createPartsIfNotExist: false,
        isAssignBrand: false,
        assignBrand: "",
        isAssignProductionPlace: false,
        assignProductionPlace: "",
        isAssignWarehouse: false,
        assignWarehouseId: 0
      },
      billData: {},
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_purchases.mp4",
      videoPopoverRemark: "采购开单页面，用于几率进货开单、结算入库。",
      NEW_PRINT_STATUS,
      sort: ""
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    curSelect() {
      return this.selectedRows.length === 1
        ? this.selectedRows[0]
        : {
            belongs: []
          };
    },
    companyId() {
      return this.curSelect.companyId || 0;
    },
    isPlatform() {
      return !!this.curSelect.platformKey;
    },
    canClick() {
      return !this.submitLoading && !this.recallLoading && !this.deleteLoading;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canRead() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("read", this.curSelect.belongs)
      );
    },
    canDelete() {
      return (
        !this.isPlatform &&
        this.curSelect.status === 0 &&
        this.hasBelongsPerm("delete", this.curSelect.belongs)
      );
    },
    canSubmit() {
      return (
        this.curSelect.status === 0 &&
        this.hasBelongsPerm("submit", this.curSelect.belongs)
      );
    },
    canRecall() {
      return (
        !this.isPlatform &&
        [1, 2, 3].includes(this.curSelect.status) &&
        this.hasBelongsPerm("submitRecall", this.curSelect.belongs)
      );
    },
    canSettleStockIn() {
      return (
        [2, 3].includes(this.curSelect.status) &&
        this.hasBelongsPerm("settleStockIn", this.curSelect.companyBelongs)
      );
    },
    canImport() {
      return this.hasBelongsPerm("import");
    },
    canPrint() {
      return (
        this.curSelect.canPrint &&
        this.hasBelongsPerm("print", this.curSelect.belongs)
      );
    },
    myCompanyId() {
      return store.userInfoMsg().companyId;
    },
    myCompanys() {
      const canShowMyCompany = this.hasBelongsPerm("read", ["self", "others"]);
      const canShowOtherCompany = this.hasBelongsPerm("read", ["rests"]);
      return store.allCompanies().filter(item => {
        if (canShowMyCompany && canShowOtherCompany) return true;
        if (canShowMyCompany) return item.id == this.myCompanyId;
        if (canShowOtherCompany) return item.id != this.myCompanyId;
      });
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      defaultSearchForm.billDate = val;
      this.searchForm.billDate = val;
    }
  },
  mounted() {
    this.setSortData();
    defaultSearchForm.billDate = this.billQueryDefaultDateRange;
    defaultSearchForm.enhancedSettlementTypes = this.store()
      .enhancedSettlementTypeDictionary()
      .map(item => item.id);
    const canShowMyCompany = this.hasBelongsPerm("read", ["self", "others"]);
    defaultSearchForm.companyIds = canShowMyCompany ? [this.myCompanyId] : [];
    this.clearSearchForm();
    this.pageChangeHandle();
  },
  activated() {
    const query = this.$route.query;
    if (query && query.status && query.status.length) {
      const status = query.status.map(item => Number(item));
      //拼接初始化查询条件
      this.searchForm.status = Object.keys(PURCHASE_RECEIVE_STATUS)
        .map(item => Number(item))
        .filter(item => status.includes(item));
      this.pageChangeHandle(this.currentPage);
    }
    if (this.hasBelongsPermWithoutRoute("read", "purchases.orders")) {
      this.getPendingNum();
    }
  },
  deactivated() {
    this.showPendingBox = false;
  },
  methods: {
    setSortData() {
      const storage = Local.get(this.$route.path);
      if (storage.defaultSort && storage.defaultSort[this.detailsName]) {
        this.sort = setTableSort(storage.defaultSort[this.detailsName]);
      }
    },
    handleSortChange(column) {
      this.sort = setTableSort(column);
      if (this.tableData.length) {
        this.pageChangeHandle(1);
      }
    },
    store() {
      return store;
    },
    setTotals(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "qty":
            sums[index] = this.summaryTotals["totalQty"];
            break;
          case "taxedAmount":
            sums[index] = this.summaryTotals["totalTaxedAmount"];
            break;
          case "receivedQty":
            sums[index] = this.summaryTotals["totalReceivedQty"];
            break;
          case "stockinQty":
            sums[index] = this.summaryTotals["totalStockinQty"];
            break;
          case "stockinTaxedAmount":
            sums[index] = this.summaryTotals["totalStockinTaxedAmount"];
            break;
          case "freight":
            sums[index] = this.summaryTotals["totalFreight"];
            break;
          default:
            break;
        }
      });
      return sums;
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    detailsColumnsChange(columns) {
      this.tablecolumnsReceive = [];
      this.$nextTick(() => {
        this.tablecolumnsReceive = columns;
      });
    },
    handleRowEdit(row) {
      this.selectedRows = [row];
      this.updateHandle();
    },
    getPendingNum() {
      const searchData = {};
      reqReceivePendingList({
        ...searchData
      })
        .then(data => {
          this.pendingNum = data.totalSize || 0;
        })
        .catch(() => {
          this.pendingNum = 0;
        });
    },
    createHandle() {
      if (!this.canCreate) return;
      this.$router.push("/PurchaseReceiveBilling");
    },
    updateHandle() {
      if (!this.canClick) return;
      if (!this.canRead) return;
      this.$router.push({
        path: "/PurchaseReceiveBilling",
        query: { billId: Number(this.selectedRows[0].id) }
      });
    },
    handleSearch() {
      this.pageChangeHandle(1);
    },
    pageChangeHandle(page = 1) {
      this.currentPage = page;
      this.tableLoading = true;
      const searchData = {
        ...this.searchForm,
        sort: this.sort
      };
      if (searchData.billDate && searchData.billDate.length) {
        searchData.billDateStart = searchData.billDate[0];
        searchData.billDateEnd = searchData.billDate[1];
      }
      if (!searchData?.printStatus || !searchData?.printStatus?.length) {
        delete searchData.printStatus;
      }
      if (searchData?.printStatus?.length > 1) {
        searchData.printStatus = 0;
      } else if (searchData?.printStatus?.length === 1) {
        searchData.printStatus = searchData.printStatus[0];
      }
      return reqReceiveList({
        ...searchData,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(data => {
          this.tableData = data.rows || [];
          this.summaryTotals = data.totalInfo;
          this.receiveTotal = data.totalSize;
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.curSelect.id
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    deleteHandle() {
      if (!this.canClick) return;
      if (!this.canDelete) return;
      const billNos = [];
      this.selectedRows.forEach(item => {
        billNos.push(item.billNo);
      });
      this.$confirm(
        `确定要删除选中的 ${this.selectedRows.length} 条（${billNos.join(
          "、"
        )}）订单吗？`,
        "删除订单",
        { type: "warning" }
      )
        .then(() => {
          this.deleteLoading = true;
          reqReceiveDelete({
            ids: this.selectedRows.map(item => {
              return item.id;
            })
          })
            .then(() => {
              this.pageChangeHandle(this.currentPage)
                .then(() => {
                  this.deleteLoading = false;
                  this.$message({
                    type: "success",
                    message: "订单删除成功",
                    showClose: true
                  });
                })
                .catch(() => {
                  this.deleteLoading = false;
                });
            })
            .catch(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => {});
    },
    submitHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      this.hasSubmit = true;
      this.submitLoading = true;
      reqReceiveDetails(this.curSelect.id)
        .then(data => {
          this.details = data.details;
          this.header = {
            billId: data.header.id,
            billNo: data.header.billNo
          };
          if (
            this.details.some(item => {
              return !Number(item.warehouseId);
            })
          ) {
            this.editWarehouseBoxVisible = true;
          } else {
            this.submitLoading = true;
            const warehouseInfos = this.details.map(item => {
              return {
                detailId: item.id,
                warehouseId: item.warehouseId,
                positionId: item.positionId || null
              };
            });
            reqReceiveSubmit({ id: this.header.billId, warehouseInfos })
              .then(() => {
                this.pageChangeHandle(this.currentPage)
                  .then(() => {
                    this.submitLoading = false;
                    this.$message({
                      type: "success",
                      message: "单据 " + this.curSelect.billNo + " 提交成功",
                      showClose: true
                    });
                  })
                  .catch(() => {
                    this.submitLoading = false;
                  });
              })
              .catch(() => {
                this.submitLoading = false;
              });
          }
        })
        .catch(() => {});
    },
    recallHandle() {
      if (!this.canClick) return;
      if (!this.canRecall) return;
      this.recallLoading = true;
      reqReceiveRecall(this.curSelect.id)
        .then(() => {
          this.pageChangeHandle(this.currentPage)
            .then(() => {
              this.recallLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + this.curSelect.billNo + " 撤回成功",
                showClose: true
              });
            })
            .catch(() => {
              this.recallLoading = false;
            });
        })
        .catch(() => {
          this.recallLoading = false;
        });
    },
    settleHandle() {
      if (!this.canClick) return;
      if (!this.canSettleStockIn) return;
      this.settleData = {
        id: this.curSelect.id,
        billType: this.curSelect.billType,
        billNo: this.curSelect.billNo,
        cooperatorId: this.curSelect.cooperatorId,
        sourceBillType: "CG",
        sourceBillId: this.curSelect.id,
        enhancedSettlementType: this.curSelect.enhancedSettlementType,
        invoiceType: this.curSelect.invoiceType,
        amount: this.precisionFormat(
          this.curSelect.invoiceType === "收据"
            ? this.curSelect.untaxedAmount
            : this.curSelect.taxedAmount,
          "money"
        )
      };
      this.settleList = [
        {
          name: "单号",
          content: this.curSelect.billNo
        },
        {
          type: "billType"
        },
        {
          name: "往来单位",
          content: this.curSelect.cooperatorName
        },
        {
          name: "发票类型",
          content:
            this.getFormatInvoiceType(
              this.curSelect.invoiceType,
              this.curSelect.taxRate
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
      this.settleDialogVisible = true;
    },
    settleComplete(isSuccess) {
      this.settleDialogVisible = false;
      if (isSuccess) {
        this.pageChangeHandle(this.currentPage);
      }
    },
    importHandle() {
      if (!this.canClick) return;
      if (!this.canImport) return;
      this.importVisible = true;
    },
    importPurchasesOrders(rows) {
      if (!this.$refs.refBillingImportBox) return;
      return new Promise((resolve, reject) => {
        if (this.$refs.refBillingImportBox.isValidate()) {
          reqImportPurchasesBills({
            cooperatorId: this.importInfo.cooperatorId,
            enhancedSettlementType: this.importInfo.enhancedSettlementType,
            invoiceType: this.importInfo.invoiceType,
            createPartsIfNotExist: this.importInfo.createPartsIfNotExist,
            isAssignBrand: this.importInfo.isAssignBrand,
            assignBrand: this.importInfo.assignBrand,
            isAssignProductionPlace: this.importInfo.isAssignProductionPlace,
            assignProductionPlace: this.importInfo.assignProductionPlace,
            isAssignWarehouse: this.importInfo.isAssignWarehouse,
            assignWarehouseId: this.importInfo.assignWarehouseId,
            rows
          })
            .then(res => {
              resolve(res);
              if (res.billNo && res.billId) {
                this.billData = {
                  billNo: res.billNo,
                  billId: res.billId,
                  path: "/PurchaseReceiveBilling"
                };
              }
            })
            .catch(() => {
              reject();
            });
        } else {
          reject();
        }
      });
    },
    printHandle() {
      if (!this.canClick) return;
      if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Purchase/Receive/" + this.curSelect.id
        }).href,
        "print"
      );
    },
    clearSearchForm() {
      this.searchForm = { ...defaultSearchForm };
    },
    setWarehouseHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      this.hasSubmit = false;
      reqReceiveDetails(this.curSelect.id).then(data => {
        this.details = data.details;
        this.header = {
          billId: data.header.id,
          billNo: data.header.billNo
        };
        this.editWarehouseBoxVisible = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.pending-text {
  color: $color-primary;
  @include font_color("color-primary");
}

.danger-text {
  color: $color-danger;
}
</style>
