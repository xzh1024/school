<template>
  <ht-card
    title="急件到货单详情"
    class="list-card box-card auto-card urgent-detail-card"
  >
    <div v-show="showDetail" class="content">
      <div class="options-bar">
        <div>
          <el-button
            :disabled="!canDelete"
            type="primary"
            size="mini"
            @click.stop="deleteHandle"
          >
            删除（F4）
          </el-button>
          <el-button
            :disabled="!canSubmit"
            type="primary"
            size="mini"
            @click.stop="submitHandle"
          >
            提交（F9）
          </el-button>
          <el-button
            :disabled="!canRecall"
            type="primary"
            size="mini"
            @click.stop="recallHandle"
          >
            撤回（F9）
          </el-button>
          <el-button
            :disabled="!canReceive"
            type="primary"
            size="mini"
            @click.stop="receiveHandle"
          >
            收货即入库（F8）
          </el-button>
          <el-button
            :disabled="!canSettleStockIn"
            type="primary"
            size="mini"
            @click.stop="settleHandle"
          >
            结算（F7）
          </el-button>
          <el-button
            :disabled="
              !this.hasBelongsPermWithoutRoute(
                'print',
                'purchases.urgents.settle',
                this.bill.belongs
              )
            "
            type="primary"
            size="mini"
            @click.stop="printHandle"
          >
            打印（F11）
          </el-button>
        </div>
        <bill-status-bar
          :bill-no="header.billNo"
          :bill-status="statusName(header.status)"
          style="width: 250px;"
        />
      </div>

      <el-form
        ref="headerForm"
        :disabled="!canUpdate || tableLoading"
        :rules="rules"
        :show-message="false"
        :model="header"
        label-width="73px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="业务日期" prop="billDate">
              <el-date-picker
                v-model="header.billDate"
                :clearable="false"
                :editable="false"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                @change="updateBill"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item
              style="flex: auto"
              label="供应商"
              prop="cooperatorId"
              label-width="57px"
            >
              <CooperatorsSelect
                v-model="header.cooperatorId"
                :clearable="false"
                :default-value.sync="header.cooperatorName"
                :allow-create="
                  hasCompletePerm('basics.cooperators.createSupplier')
                "
                type="supplier"
                no-data-tips="没有查询到供应商,回车新增"
                placeholder="请选择"
                @change="updateBill"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              prop="enhancedSettlementType"
              label="支付方式"
              label-width="71px"
            >
              <ht-autoselect
                v-model="header.enhancedSettlementType"
                :clearable="false"
                :options="store().enhancedSettlementTypeDictionary()"
                :trigger-on-focus="false"
                placeholder="请选择"
                mnemonic
                filter-zero
                highlight-first-item
                @change="updateBill"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label-width="71px"
              prop="invoiceType"
              label="发票类型"
            >
              <ht-autoselect
                v-model="header.invoiceType"
                :clearable="false"
                :options="store().formatInvoiceTypeDictionary()"
                :trigger-on-focus="false"
                :format-name="
                  value =>
                    getFormatInvoiceType(header.invoiceType, header.taxRate)
                "
                placeholder="请选择"
                mnemonic
                filter-zero
                highlight-first-item
                @change="updateBillHeaderTaxed(header.invoiceType)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="对方订单号" prop="peerOrderNo">
              <ht-input v-model="header.peerOrderNo" @change="updateBill" />
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="备注" prop="remark" label-width="57px">
              <ht-input
                v-model="header.remark"
                placeholder="最大支持100个字符"
                maxlength="100"
                @change="updateBill"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="detail-table">
        <ht-table
          :loading="tableLoading"
          :data="details"
          :columns="tableColumnsFormat"
          :selected-rows.sync="selectedRows"
          :index-column="false"
          :summary-method="setTotals"
          show-summary
          setting-allcolumn
          show-table-setting
          @selectChange="tableSelectChange"
          @table-setting="editColumnsVisible = true"
        />
      </div>
    </div>
    <edit-columns
      :base-columns="baseColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="columnsChange"
    />
    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :companyId="companyId"
      @settleSuccess="settleComplete"
    />
    <split-detail-dialog
      :detail="splitDialogData"
      :visible.sync="splitDialogVisible"
      @success="handleSplitSuccess"
      @merge-success="handleMergeDone"
    />
    <merge-dialog
      :visible.sync="mergeInfo.visible"
      :req-type="mergeInfo.reqType"
      :req-body="mergeInfo.reqBody"
      :bill-list="mergeInfo.billList"
      @done="handleMergeDone"
    />
  </ht-card>
</template>

<script>
import {
  baseDataMixin,
  permissionsMixin,
  precisionsFixed,
  searchMixin,
  setTotals
} from "@/mixins";
import { openNewWindow } from "@/utils/tool";
import { CooperatorsSelect } from "@/components/select";
import { EditColumns } from "@/components/table";
import { PURCHASE_URGENT_DETAILS } from "@/views/purchase/constants";
import BillStatusBar from "@/components/billStatusBar";
import { SettleDialog } from "@/components/business";
import { PURCHASE_URGENT_STATUS } from "@/constants/states/purchase";
import SplitDetailDialog from "./SplitDetailDialog";
import MergeDialog from "../components/MergeDialog";
import {
  reqPurchaseDispatchArrivalDelete,
  reqPurchaseDispatchArrivalDetail,
  reqPurchaseDispatchArrivalDetailDelete,
  reqPurchaseDispatchArrivalDetailUpdate,
  reqPurchaseDispatchArrivalRecall,
  reqPurchaseDispatchArrivalReceive,
  reqPurchaseDispatchArrivalSubmit,
  updatePurchaseDispatch
} from "@/api/purchase/purchaseDispatch";
import { add } from "@/utils/numberAPI";
import * as store from "@/utils/store";

export default {
  name: "BillDetail",
  components: {
    CooperatorsSelect,
    EditColumns,
    BillStatusBar,
    SettleDialog,
    SplitDetailDialog,
    MergeDialog
  },
  mixins: [
    precisionsFixed,
    searchMixin,
    baseDataMixin,
    setTotals,
    permissionsMixin
  ],
  props: {
    bill: {
      type: Object,
      default() {
        return {
          billId: null,
          belongs: null
        };
      }
    }
  },
  data() {
    return {
      mergeInfo: {
        reqType: "update",
        reqBody: {},
        billList: [],
        visible: false
      },
      settleData: {},
      settleList: [],
      settleDialogVisible: false,
      splitDialogData: {
        row: {},
        header: {}
      },
      splitDialogVisible: false,

      header: {
        status: null
      },
      details: [],
      tableName: PURCHASE_URGENT_DETAILS.name,
      editColumnsVisible: false,
      tableLoading: false,
      tableColumns: [],
      selectedRows: [],
      baseColumns: PURCHASE_URGENT_DETAILS.columns,
      rules: {
        billDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        cooperatorId: [
          {
            required: true,
            message: "请选择供应商",
            trigger: "blur"
          }
        ],
        enhancedSettlementType: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change"
          }
        ],
        invoiceType: [
          {
            required: true,
            message: "请选择发票类型",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    showDetail() {
      return this.bill && this.bill.billId;
    },
    tableColumnsFormat() {
      const splitDetail = (row, e) => {
        e.stopPropagation();
        this.splitDetail(row, e);
      };
      const deleteDetail = (row, e) => {
        e.stopPropagation();
        this.deleteDetail(row, e);
      };
      return this.tableColumns
        .filter(
          item => this.canUpdate || this.canSplit || item.type !== "controls"
        )
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  {this.canSplit ? (
                    <el-tooltip
                      placement="top"
                      content="拆分"
                      enterable={false}
                    >
                      <i
                        class="icon operation-icon icon-img-split"
                        on-click={e => splitDetail(row, e)}
                      ></i>
                    </el-tooltip>
                  ) : null}
                  {this.canUpdate ? (
                    <el-tooltip
                      placement="top"
                      content="删除"
                      enterable={false}
                    >
                      <i
                        class="icon operation-icon icon-delete-info"
                        on-click={e => deleteDetail(row, e)}
                      ></i>
                    </el-tooltip>
                  ) : null}
                </div>
              )
            };
          } else if (item.prop === "qty") {
            return {
              ...item,
              render: (value, row) => (
                <HtFormatNumber
                  v-model={row.qty}
                  disabled={!this.canUpdate}
                  min={1}
                  precision-type="qty"
                  size="mini"
                  on-blur={() => this.updateQtyPrice(row)}
                />
              )
            };
          } else if (item.prop === "taxedPrice") {
            return {
              ...item,
              render: (value, row) => (
                <HtFormatNumber
                  v-model={row.taxedPrice}
                  disabled={!this.canUpdate}
                  min={0}
                  precision-type="price"
                  size="mini"
                  on-blur={() => this.updateQtyPrice(row)}
                />
              )
            };
          }
          return item;
        });
    },
    canUpdate() {
      return (
        this.bill.status === 0 &&
        this.hasBelongsPermWithoutRoute(
          "update",
          "purchases.urgents.settle",
          this.bill.belongs
        )
      );
    },
    canDelete() {
      return (
        this.bill.status === 0 &&
        this.hasBelongsPermWithoutRoute(
          "delete",
          "purchases.urgents.settle",
          this.bill.belongs
        )
      );
    },
    canSubmit() {
      return (
        this.bill.status === 0 &&
        this.hasBelongsPermWithoutRoute(
          "submit",
          "purchases.urgents.settle",
          this.bill.belongs
        )
      );
    },
    canRecall() {
      return (
        this.bill.status === 1 &&
        this.hasBelongsPermWithoutRoute(
          "submitRecall",
          "purchases.urgents.settle",
          this.bill.belongs
        )
      );
    },
    canReceive() {
      return (
        this.bill.status === 1 &&
        this.hasBelongsPermWithoutRoute(
          "receive",
          "purchases.urgents.settle",
          this.bill.belongs
        )
      );
    },
    canSettleStockIn() {
      return (
        this.bill.status === 2 &&
        this.hasBelongsPermWithoutRoute(
          "settleStockIn",
          "purchases.urgents.settle",
          this.bill.belongs
        )
      );
    },
    canSplit() {
      return (
        this.bill.status === 0 &&
        this.hasBelongsPermWithoutRoute(
          "split",
          "purchases.urgents.settle",
          this.bill.belongs
        )
      );
    },
    companyId() {
      return this.header.companyId || store.userInfoMsg().companyId;
    }
  },
  watch: {
    bill() {
      this.$nextTick(() => {
        this.refreshBill();
      });
    }
  },
  mounted() {
    this.refreshBill();
  },
  methods: {
    store() {
      return store;
    },
    // 更新数量价格
    updateQtyPrice(row) {
      const req = {};
      req.id = row.id;
      req.qty = row.qty;
      req.taxedPrice = row.taxedPrice;
      reqPurchaseDispatchArrivalDetailUpdate({
        ...req,
        billId: this.bill.billId
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "更新成功"
          });
          this.refreshBill();
        })
        .catch(err => {
          console.log(err);
        });
    },
    settleHandle() {
      if (!this.canSettleStockIn) return;
      this.settleData = {
        id: this.header.id,
        billType: this.header.billType,
        billNo: this.header.billNo,
        cooperatorId: this.header.cooperatorId,
        enhancedSettlementType: this.header.enhancedSettlementType,
        invoiceType: this.header.invoiceType,
        taxRate: this.header.taxRate,
        amount: this.precisionFormat(
          this.details.reduce((amt, curr) => {
            return add(
              amt,
              Number(
                this.header.invoiceType === "收据"
                  ? curr.untaxedAmount
                  : curr.taxedAmount
              )
            );
          }, 0),
          "money"
        )
      };
      this.settleList = [
        {
          name: "单号",
          content: this.header.billNo
        },
        {
          type: "billType"
        },
        {
          name: "往来单位",
          content: this.header.cooperatorName
        },
        {
          name: "发票类型",
          content:
            this.getFormatInvoiceType(
              this.header.invoiceType,
              this.header.taxRate
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
        this.refreshBill();
      }
    },
    deleteHandle() {
      if (!this.canDelete) return;
      const req = {};
      req.ids = [this.header.id];
      reqPurchaseDispatchArrivalDelete(req)
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.$emit("bill-change");
        })
        .catch({});
    },
    submitHandle() {
      if (!this.canSubmit) return;
      this.$refs.headerForm &&
        this.$refs.headerForm.validate((valid, err) => {
          if (valid) {
            const req = {};
            req.ids = [this.header.id];
            return reqPurchaseDispatchArrivalSubmit(req)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "提交成功"
                });
                this.refreshBill();
              })
              .catch({});
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
          }
        });
    },
    recallHandle() {
      if (!this.canRecall) return;
      const req = {};
      req.ids = [this.header.id];
      reqPurchaseDispatchArrivalRecall(req)
        .then(() => {
          this.$message({
            type: "success",
            message: "撤回成功"
          });
          this.refreshBill();
        })
        .catch({});
    },
    receiveHandle() {
      if (!this.canReceive) return;
      const req = {};
      req.ids = [this.header.id];
      reqPurchaseDispatchArrivalReceive(req)
        .then(() => {
          this.$message({
            type: "success",
            message: "收货成功"
          });
          this.refreshBill();
        })
        .catch({});
    },
    updateBill() {
      const req = {
        billId: this.header.id, // 单据Id
        billDate: this.header.billDate, // 业务日期
        cooperatorId: this.header.cooperatorId, // 供应商ID
        invoiceType: this.header.invoiceType, // 发票类型
        taxRate: this.header.taxRate, // 税率
        peerOrderNo: this.header.peerOrderNo, // 对方单号
        remark: this.header.remark, // 备注
        enhancedSettlementType: this.header.enhancedSettlementType // 结算方式
        // "mergedBillId": this.header.billId                               // 将要合并到的急件到货单ID
      };
      updatePurchaseDispatch(req)
        .then(res => {
          if (res.code === "ok") {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.refreshBill();
          } else if (res.code === "merge-option") {
            this.mergeInfo.reqBody = req;
            this.mergeInfo.billList = res.data;
            this.mergeInfo.visible = true;
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch({});
    },
    handleMergeDone(isMerge) {
      this.mergeInfo.visible = false;
      if (isMerge) {
        this.$message({
          type: "success",
          message: "合并成功"
        });
      }
    },
    updateBillInList() {
      this.bill.billDate = this.header.billDate;
      this.bill.status = this.header.status;
      this.bill.cooperatorId = this.header.cooperatorId;
      this.bill.cooperatorName = this.header.cooperatorName;
    },
    refreshBill() {
      if (this.bill) {
        if (this.bill.billId > 0) {
          this.tableLoading = true;
          reqPurchaseDispatchArrivalDetail(this.bill.billId)
            .then(data => {
              this.tableLoading = false;
              this.header = data.header;
              this.details = data.details;
              this.updateBillInList();
            })
            .catch(() => {
              this.tableLoading = false;
            });
        }
      } else {
        this.header = {};
      }
    },
    statusName(stat) {
      return PURCHASE_URGENT_STATUS[stat];
    },
    updateBillHeaderTaxed(value) {
      if (!value) return;
      const obj = store
        .formatInvoiceTypeDictionary()
        .find(item => item.id === value);
      this.header.taxRate = obj.specialValue;
      this.updateBill();
    },
    columnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    tableSelectChange() {},
    splitDetail(row) {
      if (!this.canSplit) {
        this.$message.error({
          message: "您没有权限拆分单据",
          showClose: true
        });
        return;
      }
      this.splitDialogData = {
        row: row,
        header: this.header
      };
      this.splitDialogVisible = true;
    },
    handleSplitSuccess() {
      this.splitDialogVisible = false;
      this.$emit("bill-change");
    },
    deleteDetail(row) {
      if (!this.canUpdate) return;
      let tips = `确定删除配件 ${row.name}（${row.code}）？`;
      if (this.details.length === 1) {
        tips = "该单据只有一条明细，删除后单据也将删除，确定继续删除？";
      }
      this.$confirm(tips, "删除明细", {
        type: "warning"
      })
        .then(() => {
          if (this.details.length === 1 && !this.canDelete) {
            this.$message.error({
              message: "您没有权限删除该单据",
              showClose: true
            });
          } else {
            reqPurchaseDispatchArrivalDetailDelete({
              id: row.id,
              billId: this.bill.billId
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: `配件 ${row.name}（${row.code}） 删除成功！`,
                  showClose: true
                });
                if (this.details.length === 1) {
                  this.$emit("bill-change");
                } else {
                  this.refreshBill();
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    },
    printHandle() {
      // if (!this.canClick) return;
      // if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Purchase/DispatchArrival/" + this.bill.billId
        }).href,
        "print"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.urgent-detail-card {
  &::v-deep .el-card__body {
    padding-top: 0 !important;
  }
}
.options-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.detail-table {
  flex: auto;
  height: 1px;
}
</style>
