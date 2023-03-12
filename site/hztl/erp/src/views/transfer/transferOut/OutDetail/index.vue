<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import { Table } from "hztl-ui";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchMixin from "@/mixins/searchMixin";
import Summaries from "@/mixins/summaries";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import { SettleDialog } from "@/components/business";
import BillModelDialog from "@/components/BillModelDialog";
import PartsDetailBox from "@/components/parts/PartsDetailsBox.vue";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog.vue";
import { StockFilter } from "@/components/storage-detail/services";
import PartsInfoSearch from "@/components/partsInfoSearch";
import PrintGoodsLabelBox from "@/components/PrintGoodsLabelBox";
import SearchTable from "./SearchTable/index.vue";
import {
  defaultFormData,
  DetailFormData,
  EditBillPart,
  OUT_DETAIL_TABLE,
  OUT_DETAIL_TOTAL_FILES,
  ImportInfo
} from "./DetailTable/constants";
import HeaderForm from "./DetailTable/HeaderForm.vue";
import transferService from "../transferService";
import OutOperationMixin from "../mixins/OutOperationMixin";
import EditBillPartDialog, {
  EditFormData,
  PartBaseData
} from "./EditBillPartDialog";
import { TransferBillPartItem, TransferBillItem } from "../../interface";
import { pick } from "lodash";
import { getKeys } from "@/utils/tool";
import { TransferOutSearchData } from "./SearchTable/interface";
import { getBillDefultMode } from "./SearchTable/services";
import { updateBillPart } from "./services";
import { TYPE } from "../constants";
import * as store from "@/utils/store";
import ImportBox from "../ImportBox.vue";
import { TRANSFER_OUT_COUNT, NEW_MODE_OPTIONS } from "@/constants";
import {
  transferOutOptions,
  transferOutStandardOptions
} from "@/components/importBox/options";
import { reqImportTransferBill } from "@/api/importBox";
import { updateStaffSystemParamsDetail } from "@/api/base/base";
import Local from "@/utils/localStorage";
import { setTableSort } from "@/utils/tool";
import { openNewWindow } from "@/utils/tool";

@Component({
  name: "transferOutDetail",
  components: {
    SearchTable,
    HeaderForm,
    EditBillPartDialog,
    SettleDialog,
    BillModelDialog,
    PartsDetailBox,
    StorageStocksLockedDialog,
    PrintGoodsLabelBox,
    ImportBox
  }
})
export default class TransfersOutDetail extends Mixins(
  HotkeyMixin,
  SearchMixin,
  PrecisionsFixed,
  OutOperationMixin,
  Summaries
) {
  public $refs!: {
    headerForm: HeaderForm;
    searchTable: SearchTable;
    detailTable: Table;
    importBox: any;
  };
  public getFormValid() {
    return this.$refs.headerForm.getFormValid();
  }

  private tableName = OUT_DETAIL_TABLE.name;
  private sort = "";

  protected get curData() {
    return this.header;
  }
  private get canEdit() {
    return (
      (!this.curData?.id && !this.createDisabled) ||
      (this.curData?.id && !this.updateDisabled)
    );
  }
  private get getHasPriceIsZero() {
    return this.tableData.some(item => {
      return item.price == "0" || item.amount == "0";
    });
  }
  private get editMode() {
    return this.header?.mode ?? this.mode;
  }
  private billId = 0;
  private mode: number | null = 0;
  protected transferService = transferService;
  protected loading = false;
  private header: TransferBillItem | null = null;
  private tableData: TransferBillPartItem[] = [];
  private firstLoad = true;
  public refreshData() {
    this.loading = true;
    return this.transferService
      .fetchTransferBill(this.billId, this.sort)
      .then(res => {
        this.billId = res.header.id;
        this.tableData = res.details;
        this.header = res.header;
        // 如果开单模式变化，则清空配件列表
        if (this.$route.query.list) {
          this.$refs.searchTable?.initData();
          this.mode = res.header.mode;
          this.$router.replace({
            path: "/transfer/outDetail",
            query: { billId: this.$route.query.billId }
          });
        }
        this.formData = pick(
          { ...res.header, ...res.header.logistics },
          getKeys(defaultFormData)
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }
  protected initData(billId = 0) {
    this.billId = Number(this.$route.query.billId || 0) || billId;
    this.tableData = [];
    this.header = null;
    this.formData = {
      ...defaultFormData,
      companyId: store.userInfoMsg()?.companyId,
      businessManId: store.userInfoMsg()?.staffId
    };
    if (!this.billId) {
      //无订单，加载默认的查询模式
      getBillDefultMode("allocation").then(res => {
        this.mode = res.value;
        this.$nextTick(() => {
          this.$refs.headerForm?.clearValidate();
        });
      });
    } else {
      //有订单号刷新
      this.refreshData();
    }
  }

  private get companyId() {
    return this.header?.companyId || store.userInfoMsg()?.companyId;
  }

  private selections: TransferBillPartItem[] = [];
  private selectChangeHandler(data: TransferBillPartItem[]) {
    this.selections = data;
    if (
      this.selections &&
      this.selections.length &&
      this.$refs.detailTable?.$el.querySelector(".is-hotkey-active")
    ) {
      this.partId = this.selections[0].part.partId;
    }
  }

  private isEdit = false;
  private cachePart?: TransferOutSearchData;
  private usePart?: TransferOutSearchData;
  private selectPartHandle(row: TransferOutSearchData) {
    if (!this.checkModeType()) return;
    this.isEdit = false;
    const valid = this.getFormValid();
    if (valid) {
      this.usePart = {
        ...row,
        price: "",
        amount: ""
      };
      this.showEditPartDialog(
        {
          ...row,
          partId: row.id,
          relatedCompanyId: this.formData?.relatedCompanyId
        },
        {
          qty: 1,
          amount: Number(this.usePart?.amount || 0),
          remark: "",
          price: Number(this.usePart?.price || 0),
          amount2Price: false
        }
      );
    } else {
      this.cachePart = {
        ...row,
        price: "",
        amount: ""
      };
    }
  }

  private formData: DetailFormData = { ...defaultFormData };
  private get relatedCompanyId() {
    return this.header?.relatedCompanyId || this.formData.relatedCompanyId;
  }
  private searchDataChange(data: DetailFormData) {
    this.formData = {
      ...this.formData,
      ...data
    };
  }
  private checkModeType() {
    if (!this.tableData.length) return true;
    if (this.header?.mode != this.mode) {
      this.$message.warning(
        "当前查询模式无法添加，请切换和本单模式一致后添加。"
      );
      return false;
    }
    return true;
  }
  private formDataChange(formData: DetailFormData) {
    // 已创建单据直接更新，未创建单据
    this.formData = { ...formData };
    this.syncHeader(formData);
  }
  private syncHeader(formData: DetailFormData) {
    const valid = this.getFormValid();
    if (!valid) {
      return;
    }
    if (this.billId) {
      this.loading = true;
      this.transferService
        .updateTransferBillHeader(this.billId, formData)
        .then(() => {
          this.$message.success({
            message: "单头更新成功！",
            showClose: true
          });
        })
        .finally(() => {
          this.loading = false;
        });
    } else if (this.cachePart) {
      this.usePart = this.cachePart;
      this.cachePart = undefined;
      this.showEditPartDialog(
        {
          ...this.usePart,
          partId: this.usePart.id,
          relatedCompanyId: formData.relatedCompanyId
        },
        {
          qty: 1,
          amount: Number(this.usePart?.amount || 0),
          remark: "",
          price: Number(this.usePart?.price || 0),
          amount2Price: false
        }
      );
    }
  }

  private async addPartHandle(part: EditBillPart) {
    let promise: Promise<unknown>;
    this.loading = true;
    if (this.billId) {
      promise = transferService.addPart({ id: this.billId }, part);
    } else if (this.formData) {
      promise = transferService.addPart(this.formData, part);
    } else {
      // 已有逻辑回保证添加配件前，formData填写完毕，暂时不会执行
      promise = Promise.resolve();
    }
    promise
      .then(() => {
        this.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private editPartHandle(row: TransferBillPartItem) {
    this.isEdit = true;
    if (!this.canEdit) {
      this.$message.warning({
        message: "当前状态不可编辑明细",
        showClose: true
      });
      return;
    }
    this.showEditPartDialog(
      {
        ...row.part,
        detailId: row.id,
        ...pick(row, [
          "warehouseName",
          "property",
          "batchNo",
          "positionName",
          "positionId",
          "warehouseId",
          "stockId"
        ])
      },
      {
        groupId: row.groupId,
        qty: Number(row.qty),
        amount: Number(row.amount),
        remark: row.remark,
        price: Number(row.price),
        amount2Price: row.amount2Price
      }
    );
  }
  protected removePart(row: TransferBillPartItem) {
    const len = this.tableData.length;
    if (len === 0) {
      return;
    }
    if (len === 1) {
      this.removeBill(
        this.curData!,
        "该单据只有一条明细，删除后单据也将删除，确定继续删除？"
      ).then(() => {
        return this.$confirm(
          `删除单据${this.curData!.billNo}成功，是否重新开单！`,
          {
            type: "warning"
          }
        )
          .then(() => {
            this.$router.replace({
              path: "./outDetail"
            });
            this.initData();
          })
          .catch(() => {
            this.closePage();
          });
      });
    } else {
      this.$confirm("确定要删除该条单据明细?", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.transferService
          .removeTransferBillPart(this.curData!.id, [row.groupId], true)
          .then(() => {
            this.$message.success({
              message: "移除配件成功!",
              showClose: true
            });
            this.refreshData();
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  }
  private editPartVisible = false;
  private partBaseInfo?: PartBaseData;
  private editPartData?: EditFormData;
  private showEditPartDialog(
    partInfo: PartBaseData,
    data: EditFormData = {
      qty: 1,
      price: 0,
      amount: 0,
      remark: "",
      amount2Price: false
    }
  ) {
    (this.partBaseInfo as any) = pick(partInfo, [
      "detailId",
      "partId",
      "relatedCompanyId",
      "code",
      "name",
      "brand",
      "property",
      "batchNo",
      "warehouseId",
      "warehouseName",
      "positionId",
      "positionName",
      "stockId",
      "isNegative"
    ]);
    this.editPartData = data;
    this.editPartVisible = true;
  }

  private editPartConfirm(data: EditFormData) {
    if (!data.groupId) {
      const header = this.billId
        ? { id: this.billId }
        : { ...this.formData!, mode: this.mode };
      transferService
        .addPart(header, {
          ...data,
          partId: this.partBaseInfo!.partId,
          price: data.price?.toString(),
          amount: data.amount?.toString(),
          qty: data.qty?.toString(),
          property: this.usePart?.property,
          warehouseId: this.usePart?.warehouseId,
          positionId: this.usePart?.positionId,
          stockId: this.usePart?.stockId
        })
        .then(res => {
          if (this.billId) {
            this.refreshData();
            this.$message.success({
              message: "添加成功!",
              showClose: true
            });
          } else {
            this.$message.success({
              message: "添加成功!",
              showClose: true
            });
            this.$router.replace({
              path: "./outDetail",
              query: { billId: String(res.id) }
            });
            this.billId = res.id;
            this.refreshData();
          }
          this.editPartVisible = false;
        });
    } else {
      updateBillPart(
        {
          ...data,
          partId: this.partBaseInfo?.partId,
          price: data.price?.toString(),
          amount: data.amount?.toString(),
          qty: data.qty?.toString()
        },
        this.billId
      )
        .then(() => {
          this.editPartVisible = false;
          return this.refreshData();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  private removeBillAndReload() {
    this.removeBill().then(() => {
      this.$confirm(`单据 ${this.header?.billNo} 已删除，是否重新开单？`, {
        type: "warning"
      })
        .then(() => {
          this.$router.replace({
            path: "./outDetail"
          });
          this.initData();
        })
        .catch(() => {
          this.closePage();
        });
    });
  }

  private get informationList() {
    return [
      {
        name: "业务单号",
        content: this.curData?.billNo
      },
      {
        type: "billType"
      },
      { name: "往来单位", content: this.curData?.relatedBill?.companyName },
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
  }

  private get settlData() {
    return {
      ...pick(this.curData, [
        "id",
        "amount",
        "discountAmount",
        "settledAmount",
        "billNo"
      ]),
      enhancedSettlementType: this.curData?.paymentType,
      billType: "KD"
    };
  }

  private billModelVisible = false;
  private showBillModelDialog() {
    this.billModelVisible = true;
  }

  private settleVisible = false;
  protected settleBill() {
    this.settleVisible = true;
  }

  public handleSettleRes(res: boolean) {
    if (res) {
      this.refreshData();
    }
    this.settleVisible = false;
  }

  private get columns() {
    const editHandle = (row: TransferBillPartItem, e: MouseEvent) => {
      e.stopPropagation();
      this.editPartHandle(row);
    };

    const removePart = (row: TransferBillPartItem, e: MouseEvent) => {
      e.stopPropagation();
      this.removePart(row);
    };
    return OUT_DETAIL_TABLE.columns
      .filter(item => {
        if (this.canEdit || item.prop !== "controls") {
          const mode = this.billId ? this.header?.mode : this.mode;
          if (mode === undefined) return true;
          switch (mode) {
            case 0:
              return true;
            case 1:
              return !(item.prop === "batchNo" || item.prop === "supplierName");
            case 2:
              return !(
                item.prop === "batchNo" ||
                item.prop === "positionName" ||
                item.prop === "supplierName"
              );
            case 3:
              return !(
                item.prop === "batchNo" ||
                item.prop === "positionName" ||
                item.prop === "warehouseName" ||
                item.prop === "supplierName"
              );
            default:
              return true;
          }
        } else {
          return false;
        }
      })
      .map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value: null, row: TransferBillPartItem) => {
              return (
                <div>
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={(e: MouseEvent) => editHandle(row, e)}
                    />
                  </el-tooltip>
                  <el-tooltip placement="top" content="删除" enterable={false}>
                    <i
                      class="icon operation-icon icon-delete-info"
                      on-click={(e: MouseEvent) => removePart(row, e)}
                    />
                  </el-tooltip>
                </div>
              );
            }
          };
        }
        if (item.prop === "price" || item.prop === "amount") {
          return {
            ...item,
            render: (value: null, row: TransferBillPartItem) => {
              return (
                <div class="text-right">
                  {row[item.prop as any] == 0 ? (
                    <span class="text-font-danger">
                      {row[item.prop as any]}
                    </span>
                  ) : (
                    <span>{row[item.prop as any]}</span>
                  )}
                </div>
              );
            }
          };
        }
        return item;
      });
  }

  private get canShowPartDetail() {
    return this.partSelection.length || this.selections.length;
  }
  private get canShowStocksLocked() {
    return this.partSelection.length || this.selections.length;
  }

  protected get manageMode() {
    return this.$store.state.admin.systemParams.params.manageMode;
  }
  private partId: number | undefined = 0;
  private partDetailBoxVisible = false;
  private partSelection: TransferOutSearchData[] = [];
  private storageStocksLockedVisible = false;
  private stockFilter: StockFilter = {};

  private showPartDetailBox() {
    if (!this.canShowPartDetail) {
      return;
    }
    this.setPartId();
    this.partDetailBoxVisible = true;
  }
  private showStocksLockedBox() {
    if (!this.canShowStocksLocked) {
      return;
    }
    this.setStockFilter();
    this.storageStocksLockedVisible = true;
  }
  private setPartId() {
    if (this.selections.length && this.partSelection.length) {
      if (this.$refs.detailTable?.$el.querySelector(".is-hotkey-active")) {
        this.partId = this.selections[0].part.partId;
      } else {
        this.partId = this.partSelection[0].id;
      }
    } else if (this.selections.length) {
      this.partId = this.selections[0].part.partId;
    } else if (this.partSelection.length) {
      this.partId = this.partSelection[0].id;
    }
  }
  private setStockFilter() {
    if (this.selections.length && this.partSelection.length) {
      if (this.$refs.detailTable?.$el.querySelector(".is-hotkey-active")) {
        this.stockFilter = {
          partId: this.selections[0].part.partId || undefined,
          ownerCompanyId: this.selections[0].companyId,
          property: this.selections[0].property,
          positionId:
            (this.mode || 0) < 3 ? this.selections[0].positionId : undefined,
          warehouseId:
            (this.mode || 0) < 2 ? this.selections[0].warehouseId : undefined,
          batchNo: (this.mode || 0) < 1 ? this.selections[0].batchNo : undefined
        };
      } else {
        this.stockFilter = {
          partId: this.partSelection[0].id || undefined,
          property: this.partSelection[0].property,
          ownerCompanyId: this.partSelection[0].ownerCompanyId,
          positionId:
            (this.mode || 0) < 3 ? this.partSelection[0].positionId : undefined,
          warehouseId:
            (this.mode || 0) < 2
              ? this.partSelection[0].warehouseId
              : undefined,
          batchNo:
            (this.mode || 0) < 1 ? this.partSelection[0].batchNo : undefined
        };
      }
    } else if (this.selections.length) {
      this.stockFilter = {
        partId: this.selections[0].part.partId || undefined,
        property: this.selections[0].property,
        ownerCompanyId: this.selections[0].companyId,
        positionId:
          (this.mode || 0) < 3 ? this.selections[0].positionId : undefined,
        warehouseId:
          (this.mode || 0) < 2 ? this.selections[0].warehouseId : undefined,
        batchNo: (this.mode || 0) < 1 ? this.selections[0].batchNo : undefined
      };
    } else if (this.partSelection.length) {
      this.stockFilter = {
        partId: this.partSelection[0].id || undefined,
        property: this.partSelection[0].property,
        ownerCompanyId: this.partSelection[0].ownerCompanyId,
        positionId:
          (this.mode || 0) < 3 ? this.partSelection[0].positionId : undefined,
        warehouseId:
          (this.mode || 0) < 2 ? this.partSelection[0].warehouseId : undefined,
        batchNo:
          (this.mode || 0) < 1 ? this.partSelection[0].batchNo : undefined
      };
    }
  }
  private partSelectChange(data: TransferOutSearchData[]) {
    this.partSelection = data;
    if (this.partSelection && this.partSelection.length) {
      this.partId = data[0].id;
    }
  }

  protected importInfo: ImportInfo = {
    options:
      this.manageMode == 0 ? transferOutStandardOptions : transferOutOptions,
    hasSetting: true,
    offset: TRANSFER_OUT_COUNT,
    relatedCompanyId: undefined,
    relatedCompanyName: "",
    billDate: "",
    mode: null
  };
  protected importBoxVisible = false;
  protected importHandle() {
    // 根据系统参数设置中的仓储设置来使用不同的表头
    if (this.importDisabled) {
      return;
    }
    /* 开单方式选择前两项时，三个字段必填 */
    const userWareLayer =
      this.manageMode == 0 && (this.mode == 0 || this.mode == 1);
    this.importInfo = {
      ...this.importInfo,
      options: userWareLayer ? transferOutStandardOptions : transferOutOptions,
      relatedCompanyId: this.formData.relatedCompanyId,
      relatedCompanyName: this.formData.relatedCompanyName,
      billDate: this.formData.billDate,
      mode: this.mode
    };
    this.importBoxVisible = true;
  }
  private importInfoChange(data: ImportInfo) {
    this.mode = data.mode;
    /* 开单方式选择前两项时，三个字段必填 */
    const userWareLayer =
      this.manageMode == 0 && (this.mode == 0 || this.mode == 1);
    this.importInfo = {
      ...data,
      options: userWareLayer ? transferOutStandardOptions : transferOutOptions
    };
    this.formDataChange({ ...this.formData, ...this.importInfo });
  }
  protected importBill(rows: any) {
    return new Promise((resolve, reject) => {
      if (this.$refs.importBox.isValidate()) {
        reqImportTransferBill(
          {
            relatedCompanyId: this.importInfo.relatedCompanyId,
            billDate: this.importInfo.billDate,
            mode: this.importInfo.mode,
            rows
          },
          TYPE
        )
          .then((res: any) => {
            if (res.id) {
              this.importBoxVisible = false;
              this.billId = res.id;
              this.refreshData();
            }
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      } else {
        reject();
      }
    });
  }
  setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
  }
  handleSortChange(column: any) {
    this.page = 1;
    this.sort = setTableSort(column);
    if (this.tableData?.length) {
      this.refreshData();
    }
  }
  handleModeChange(value: number) {
    updateStaffSystemParamsDetail({
      module: "allocation",
      type: "billingMode",
      value
    });
  }
  activated() {
    this.setSortData();
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch
          partId={this.partId}
          resetedActiveTab="Transfer"
          header={this.formData}
        />
      )
    });
    //开单的时候
    if (this.$route.query.create) {
      this.initData();
      this.$router.replace({
        path: "/transfer/outDetail"
      });
    } else if (this.$route.query.list) {
      //列表过来的
      this.initData();
    } else if (this.$route.query.billId) {
      //兼容其他页面过来的
      this.billId = Number(this.$route.query.billId || 0);
      this.billId && this.refreshData();
    }
    this.setDefaultHotkey();
  }
  get autoSubmitWhenClose() {
    return this.$store.state?.admin?.systemParams?.params?.autoSubmitWhenClose;
  }
  async deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
    if (this.autoSubmitWhenClose) {
      await this.submitBill();
    }
  }
  // 调拨出库
  protected printLabelHandle() {
    openNewWindow(
      this.$router.resolve({
        path: "/Print/Label/ShippingLabel/KD/" + this.curData!.id
      }).href,
      "print"
    );
  }

  render() {
    return (
      <ht-resize-columns
        isColumn
        defaultLen={302}
        scopedSlots={{
          block1: () => (
            <search-table
              ref="searchTable"
              canEdit={this.canEdit}
              relatedCompanyId={this.relatedCompanyId}
              companyId={this.companyId}
              onSelectPart={this.selectPartHandle}
              onSearchDataChange={this.searchDataChange}
              billId={this.billId}
              mode={this.mode}
              onPartSelectChange={this.partSelectChange}
              onCreate={this.initData}
            >
              <el-button
                slot="button"
                type="primary"
                size="mini"
                loading={this.loading}
                disabled={!this.canShowPartDetail}
                onClick={this.showPartDetailBox}
              >
                配件详情（F10）
              </el-button>
              <el-button
                slot="button"
                type="primary"
                size="mini"
                loading={this.loading}
                disabled={!this.canShowStocksLocked}
                onClick={this.showStocksLockedBox}
              >
                锁定数明细
              </el-button>
              <div slot="button" class="inline-block m-l-6">
                <div class="inline-block m-l-6">查询模式：</div>
                <div class="inline-block m-l-4">
                  <ht-autoselect
                    size="mini"
                    style="width:260px;"
                    v-model={this.mode}
                    on-change={this.handleModeChange}
                    v-delay-focus="autoFocus"
                    options={NEW_MODE_OPTIONS}
                    trigger-on-focus={false}
                    placeholder="请选择"
                    highlight-first-item
                  />
                </div>
              </div>
            </search-table>
          ),
          block2: () => (
            <div class="flex-container column-flex">
              <div class="flex-block-bg flex-block-padding btn-group">
                <el-button
                  type="primary"
                  size="mini"
                  disabled={this.delDisabled}
                  onClick={this.removeBillAndReload}
                  loading={this.loading}
                >
                  删除（F4）
                </el-button>
                <el-button
                  type="primary"
                  loading={this.loading}
                  size="mini"
                  disabled={this.submitDisabled}
                  onClick={this.submitBill}
                >
                  提交（F9）
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  loading={this.loading}
                  onClick={this.recallBill}
                  disabled={this.recallDisabled}
                >
                  撤回（F9）
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  loading={this.loading}
                  onClick={this.settleBill}
                  disabled={this.settleDisabled}
                >
                  结算即出库（F7）
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  loading={this.loading}
                  onClick={this.printHandle}
                  disabled={this.printDisabled}
                >
                  打印（F11）
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  loading={this.loading}
                  onClick={this.printLabelHandle}
                  disabled={this.printDisabled}
                >
                  打印发货标签
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  loading={this.loading}
                  onClick={this.importHandle}
                  disabled={this.importDisabled}
                >
                  导入（Alt+ I）
                </el-button>
                <div
                  class="inline-block text-font-primary m-l-6 m-t-4"
                  v-show={this.tableData.length}
                >
                  {`本单模式： ${
                    NEW_MODE_OPTIONS[this.header?.mode || 0].name
                  }`}
                </div>
              </div>
              <header-form
                ref="headerForm"
                header={this.header}
                loading={this.loading}
                v-model={this.formData}
                onChange={this.formDataChange}
                relatedCompanies={this.relatedCompanies}
                class="flex-block-bg flex-block-padding flex-block-margin auto-width"
              />
              <ht-setting-table
                ref="detailTable"
                class="auto-block flex-block-margin"
                table-name={OUT_DETAIL_TABLE.name}
                columns={this.columns}
                data={this.tableData}
                loading={this.loading}
                selectedRows={this.selections}
                onSelectChange={this.selectChangeHandler}
                onRowOperation={this.editPartHandle}
                onRowDelete={this.removePart}
                onSort-change={this.handleSortChange}
                show-summary
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                summary-method={(params: any) =>
                  this.getSummariesByCalculate(params, OUT_DETAIL_TOTAL_FILES)
                }
              />
              <div class="flex flex-block-bg flex-block-padding">
                <div>
                  记录数：
                  <span class="amount-font">{this.header?.detailsCount}</span>
                </div>
                <div class="m-l-20">
                  总数量：
                  <span class="amount-font">{this.header?.qty}</span>
                </div>
                <div class="m-l-20">
                  合计应收：
                  <span class="amount-font">{this.header?.amount}</span>
                </div>
                <div
                  class="m-l-40 flex flex-center"
                  v-show={this.getHasPriceIsZero}
                >
                  <i class="el-icon-warning text-font-danger font-18 cricle box-shadow"></i>
                  <span class="text-font-danger m-l-6 text-shadow">
                    有单价为0的记录，请检查！
                  </span>
                </div>
              </div>

              <edit-bill-part-dialog
                mode={this.editMode}
                loading={this.loading}
                visible={this.editPartVisible}
                editData={this.editPartData}
                onConfirm={this.editPartConfirm}
                partBaseInfo={this.partBaseInfo}
                isEdit={this.isEdit}
                onClose={() => (this.editPartVisible = false)}
              />
              <settle-dialog
                visible={this.settleVisible}
                informationList={this.informationList}
                companyId={this.curData?.companyId}
                settlData={this.settlData}
                onSettleSuccess={this.handleSettleRes}
                onVisibleChange={(visible: boolean) =>
                  (this.settleVisible = visible)
                }
              />
              <bill-model-dialog
                visible={this.billModelVisible}
                v-model={this.mode}
                type="allocation"
                onClose={() => (this.billModelVisible = false)}
              />
              <parts-detail-box
                visible={this.partDetailBoxVisible}
                onClose={() => (this.partDetailBoxVisible = false)}
                value={this.partId}
              />
              <storage-stocks-locked-dialog
                visible={this.storageStocksLockedVisible}
                onClose={() => (this.storageStocksLockedVisible = false)}
                stockFilter={this.stockFilter}
              />
              <print-goods-label-box
                value={{ billType: TYPE, billId: this.billId }}
                visible={this.printGoodsLabelBoxVisible}
                onClose={() => (this.printGoodsLabelBoxVisible = false)}
              />
              <import-box
                ref="importBox"
                visible={this.importBoxVisible}
                on={{
                  "update:visible": (val: boolean) =>
                    (this.importBoxVisible = val)
                }}
                disabled={this.importDisabled}
                v-model={this.importInfo}
                header={this.header}
                relatedCompanies={this.relatedCompanies}
                req-handler={this.importBill}
                onChange={this.importInfoChange}
              />
            </div>
          )
        }}
      />
    );
  }
}
</script>
<style lang="scss" scoped>
.btn-group {
  margin-top: 5px;
}
.auto-width {
  width: auto;
}
</style>
