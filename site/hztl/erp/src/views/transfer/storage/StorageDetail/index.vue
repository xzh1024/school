<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchMixin from "@/mixins/searchMixin";
import Summaries from "@/mixins/summaries";
import PartsInfoSearch from "@/components/partsInfoSearch";
import PartsDetailBox from "@/components/parts/PartsDetailsBox.vue";
import StorageOperationMixin from "../mixins/StorageOperationMixin";
import {
  DetailFormData,
  STORAGE_DETAL_TABLE,
  defaultFormData,
  STORAGE_DETAL_TOTAL_FILES
} from "./DetailTable/constants";
import EditBillPartDialog, {
  EditFormData,
  InfoData
} from "./EditBillPartDialog";
import HeaderForm from "./DetailTable/HeaderForm.vue";
import transferService from "../transferService";
import { SettleDialog } from "@/components/business";
import { TransferBillPartItem, TransferBillItem } from "../../interface";
import { pick } from "lodash";
import { getKeys } from "@/utils/tool";
import EditWarehouseBox from "../EditWarehouseBox/index.vue";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
@Component({
  name: "transferStorageDatail",
  components: {
    HeaderForm,
    SettleDialog,
    EditBillPartDialog,
    EditWarehouseBox,
    PartsDetailBox
  }
})
export default class TransfersStorageDetail extends Mixins(
  HotkeyMixin,
  SearchMixin,
  StorageOperationMixin,
  Summaries
) {
  public $refs!: {
    headerForm: HeaderForm;
  };
  private tableName = STORAGE_DETAL_TABLE.name;
  private sort = "";
  @Watch("$route.query.time", { immediate: true })
  onTimeChange() {
    if (this.$route.name === this.$options.name) {
      this.billId = Number(this.$route.query.billId || 0);
      this.refreshData();
      this.setDefaultHotkey();
    }
  }

  private backMainList() {
    this.$router.push({
      path: "./storageList"
    });
  }

  private get informationList() {
    return [
      {
        name: "业务单号",
        content: this.header?.billNo
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
  private get settleBillData() {
    return { ...this.header };
  }

  protected get curData() {
    return this.header;
  }
  private get canEdit() {
    return (
      (!this.curData?.id && !this.createDisabled) ||
      (this.curData?.id && !this.updateDisabled)
    );
  }

  public handleSettleRes(res: boolean) {
    if (res) {
      this.refreshData();
    }
  }
  public getFormValid() {
    return this.$refs.headerForm.getFormValid();
  }

  protected settleBill() {
    this.settleVisible = true;
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
      billType: "RD"
    };
  }
  private partDetailBoxVisible = false;
  private showPartDetailBox() {
    if (!this.selections.length) {
      return;
    }
    this.partDetailBoxVisible = true;
  }

  private billId = 0;
  private groupId = 0;
  protected transferService = transferService;
  protected loading = false;
  protected settleVisible = false;
  private header: TransferBillItem | null = null;
  private tableData: TransferBillPartItem[] = [];
  private currentRow?: TransferBillPartItem;
  public refreshData() {
    if (!this.billId) {
      this.tableData = [];
      this.header = null;
      return Promise.resolve();
    }
    this.setSortData();
    this.loading = true;
    return this.transferService
      .fetchTransferBill(this.billId, this.sort)
      .then(res => {
        this.billId = res.header.id;
        this.tableData = res.details;
        this.header = res.header;
        this.formData = pick(
          { ...res.header, ...res.header.logistics },
          getKeys(defaultFormData)
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private partId: number | null = null;
  private selections: TransferBillPartItem[] = [];
  private selectChangeHandler(data: TransferBillPartItem[]) {
    this.selections = data;
    if (data.length) {
      this.partId = data[0].part.partId || null;
    } else {
      this.partId = null;
    }
  }

  private formData: DetailFormData = { ...defaultFormData };
  private formDataChange(formData: DetailFormData) {
    // 更新单据
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
    } else {
      this.formData = formData;
    }
  }
  private editPartVisible = false;
  private editDetailId?: number = undefined;
  private editPartId?: number = undefined;
  private editPartData?: EditFormData;
  private infoData?: InfoData;
  private showEditPartDialog(
    detailId: number,
    partId: number,
    data: EditFormData = {
      warehouseId: 0,
      warehouseName: "",
      positionId: 0,
      positionName: "",
      remark: "",
      salePrices: {
        retail: "0",
        platform: "0",
        allot: "0",
        wholesale: "0",
        wholesale1: "0",
        wholesale2: "0",
        wholesale3: "0",
        wholesale4: "0"
      }
    },
    infoData: {
      code: string;
      name: string;
      brand: string;
      property: string;
      batchNo: string;
      qty: string;
      price: string;
      amount: string;
    }
  ) {
    this.editDetailId = detailId;
    this.editPartId = partId;
    this.editPartData = data;
    this.infoData = infoData;
    this.editPartVisible = true;
  }
  private editPartConfirm(data: any) {
    this.loading = true;
    this.transferService
      .updateTransferBillpart(
        [
          {
            ...data,
            groupId: this.currentRow?.groupId,
            mode: 3,
            property: this.currentRow?.property
          }
        ],
        this.header?.id
      )
      .then(() => {
        this.editPartVisible = false;
        return this.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private editPartHandle(row: TransferBillPartItem) {
    this.currentRow = row;
    if (!this.canEdit) {
      this.$message.warning({ message: "当前状态不可编辑", showClose: true });
      return;
    }
    this.showEditPartDialog(
      row.id,
      row.part.partId,
      {
        warehouseId: row.warehouseId,
        warehouseName: row.warehouseName,
        positionId: row.positionId,
        positionName: row.positionName,
        remark: row.remark,
        salePrices: row.salePrices
          ? row.salePrices
          : {
              retail: "0",
              platform: "0",
              allot: "0",
              wholesale: "0",
              wholesale1: "0",
              wholesale2: "0",
              wholesale3: "0",
              wholesale4: "0"
            }
      },
      {
        code: row.part.code,
        name: row.part.name,
        brand: row.part.brand,
        property: row.property,
        batchNo: row.batchNo,
        qty: row.qty,
        price: row.price,
        amount: row.amount
      }
    );
  }
  get columns() {
    const editHandle = (row: TransferBillPartItem, e: MouseEvent) => {
      e.stopPropagation();
      this.selections = [row];
      this.editPartHandle(row);
    };
    return STORAGE_DETAL_TABLE.columns
      .filter(item => item.type !== "controls" || this.canEdit)
      .map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value: null, row: TransferBillPartItem) => {
              return (
                <el-tooltip placement="top" content="编辑" enterable={false}>
                  <i
                    class="icon operation-icon icon-edit-info"
                    on-click={(e: MouseEvent) => editHandle(row, e)}
                  />
                </el-tooltip>
              );
            }
          };
        }
        return item;
      });
  }
  private setSortData() {
    const storage = Local.get(this.$route.path);
    if (storage.defaultSort && storage.defaultSort[this.tableName]) {
      this.sort = setTableSort(storage.defaultSort[this.tableName]);
    }
  }
  private handleSortChange(column: any) {
    this.page = 1;
    this.sort = setTableSort(column);
    if (this.tableData?.length) {
      this.refreshData();
    }
  }
  activated() {
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch
          partId={this.partId}
          resetedActiveTab="Transfer"
          header={this.header}
        />
      )
    });
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

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btn-group">
          <div class="flex-container">
            <div>
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
                onClick={this.auditBill}
                disabled={this.auditDisabled}
              >
                审核（F7）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                loading={this.loading}
                onClick={this.settleBill}
                disabled={this.settleDisabled}
              >
                结算即入库（F7）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                loading={this.loading}
                disabled={!this.selections.length}
                onClick={this.showPartDetailBox}
              >
                配件详情（F10）
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
                onClick={this.setWarehouseHandle}
                disabled={this.updateDisabled}
              >
                设置到货仓库
              </el-button>
            </div>
            <div>
              <el-link underline={false} onClick={this.backMainList}>
                返回列表
                <span class="el-icon-arrow-right" />
              </el-link>
            </div>
          </div>
        </div>
        <header-form
          ref="headerForm"
          header={this.header}
          loading={this.loading}
          v-model={this.formData}
          onFormDataChange={this.formDataChange}
          relatedCompanies={this.relatedCompanies}
          class="flex-block-bg flex-block-padding flex-block-margin"
        />
        <ht-setting-table
          class="auto-block flex-block-margin"
          table-name={STORAGE_DETAL_TABLE.name}
          columns={this.columns}
          data={this.tableData}
          loading={this.loading}
          selectedRows={this.selections}
          onSelectChange={this.selectChangeHandler}
          onRowOperation={this.editPartHandle}
          onSort-change={this.handleSortChange}
          show-summary
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          summary-method={(params: any) =>
            this.getSummariesByCalculate(params, STORAGE_DETAL_TOTAL_FILES)
          }
        />
        <div class="flex-block-bg flex-block-padding" style="display: flex;">
          <div>
            记录数：
            <span class="amount-font">{this.header?.detailsCount}</span>
          </div>
          <div style="margin-left: 20px;">
            总数量：
            <span class="amount-font">{this.header?.qty}</span>
          </div>
          <div style="margin-left: 20px;">
            合计应付：
            <span class="amount-font">{this.header?.amount}</span>
          </div>
        </div>

        <settle-dialog
          visible={this.settleVisible}
          informationList={this.informationList}
          companyId={this.curData?.companyId}
          settlData={this.settlData}
          onSettleSuccess={this.handleSettleRes}
          onVisibleChange={(visible: boolean) => (this.settleVisible = visible)}
        />
        <edit-bill-part-dialog
          loading={this.loading}
          visible={this.editPartVisible}
          editData={this.editPartData}
          detailId={this.editDetailId}
          partId={this.editPartId}
          groupId={this.currentRow?.groupId}
          billId={this.billId}
          companyId={this.curData?.companyId}
          infoData={this.infoData}
          onConfirm={this.editPartConfirm}
          onClose={() => (this.editPartVisible = false)}
        />
        <edit-warehouse-box
          visible={this.editWarehouseBoxVisible}
          onClose={() => (this.editWarehouseBoxVisible = false)}
          details={this.tableData}
          headerId={this.header?.id}
          companyId={this.curData?.companyId}
          onEdit={this.handleWarehouseEdit}
        />
        <parts-detail-box
          visible={this.partDetailBoxVisible}
          on={{
            "update:visible": (val: boolean) =>
              (this.partDetailBoxVisible = val)
          }}
          value={this.partId}
        />
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
.btn-group {
  margin-top: 5px;
}
</style>
