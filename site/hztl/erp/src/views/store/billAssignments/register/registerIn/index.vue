<script lang="tsx">
import { Component, Prop, Mixins, Emit } from "vue-property-decorator";
import { COLUMN_ENTER } from "../interface/tableColumns";
import { ENTER_BILL_ENUM } from "@/components/globalDialog/bill-details/constants/storage/enum";
import RegisterDialog from "../components/RegisterDialog.vue";
import {
  SearchFormModule,
  WarehouseBillItem,
  TabsCountModel,
  TotalInfo
} from "../interface";
import registerService from "../services/registerService";
import { openNewWindow } from "@/utils/tool";
import SearchMixin from "@/mixins/searchMixin";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
@Component({
  name: "RegisterIn",
  components: {
    RegisterDialog
  }
})
export default class RegisterIn extends Mixins(
  SearchMixin,
  HotkeyMixin,
  PaginationDataMixin
) {
  public $refs!: {
    registerDialog: RegisterDialog;
  };
  @Prop() searchForm!: SearchFormModule;

  public TabsCount = {} as TabsCountModel;
  @Emit("updateTabsCount") updateTabsCount() {
    return this.TabsCount;
  }
  public tableData: Array<WarehouseBillItem> = [];
  public selections: Array<WarehouseBillItem> = [];
  public registerType = 0;
  public status = -1;
  public page = 1;
  public totalInfo: TotalInfo = {
    partCount: "",
    amount: ""
  };
  protected get curData(): WarehouseBillItem | undefined {
    const data = this.selections.length === 1 ? this.selections[0] : undefined;
    // 单据状态： 0-待出库拣货，1-待出库验货，2-待入库验货，3-待入库上架，4-待审核确认，5-完成
    if (data) {
      this.status = data.status;
    } else {
      this.status = -1;
    }
    return data;
  }

  public created() {
    this.searchForm.billType = "RK";
  }
  public mounted() {
    if (this.hasAutoPerm("register.in.read")) {
      this.handlePageChange(1);
    }
  }

  protected async loadData() {
    if (!this.hasAutoPerm("register.in.read")) {
      return {
        rows: [],
        totalSize: 0,
        totalPage: 0
      };
    }
    // TODO 处理过滤数据
    const searchForm: SearchFormModule = this.searchForm;
    const data = await registerService.getBillList({
      ...searchForm,
      dateStart: searchForm.timeRange[0] || "",
      dateEnd: searchForm.timeRange[1] || "",
      page: this.page,
      pageSize: this.pageSize
    });
    if (data) {
      this.TabsCount = {
        enter: 0,
        out: data.otherSize || 0
      };
      if (data.totalInfo) {
        this.totalInfo.partCount = data.totalInfo.partCount || "";
        this.totalInfo.amount = data.totalInfo.amount || "";
      }
      this.updateTabsCount();
    }
    return data;
  }

  public handlePageChange(page: number) {
    this.page = page;
    this.searchBillList();
  }

  public searchBillList() {
    this.pageChange(this.page);
  }

  private selectChangeHandler(data: WarehouseBillItem[]) {
    this.selections = data;
  }

  private checkRegister() {
    this.registerType = 2;
    this.$refs.registerDialog.show();
  }
  private onShelvesRegister() {
    this.registerType = 3;
    this.$refs.registerDialog.show();
  }
  private auditConfirm() {
    this.registerType = 5;
    this.$refs.registerDialog.show();
  }
  private printHandle() {
    // if (!this.canPrint) {
    if (!this.curData) {
      return;
    }
    openNewWindow(
      this.$router.resolve({
        path: "/Print/Store/RegisterIn/" + this.curData?.id
      }).href,
      "print"
    );
  }
  private canPrint() {
    return (
      this.selections.length === 1
      // && this.selections[0].canPrint &&
      // this.hasBelongsPerm("print", this.selections[0].belongs)
    );
  }

  public cinBillEnum = ENTER_BILL_ENUM;

  render() {
    return (
      <div class="container-box">
        <div class="header">
          <el-button
            type="primary"
            size="mini"
            onClick={this.checkRegister}
            disabled={
              !this.curData ||
              !(this.status === 2) ||
              !this.hasAutoPerm("register.in.check")
            }
          >
            验货登记（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={this.onShelvesRegister}
            disabled={
              !this.curData ||
              !(this.status === 3) ||
              !this.hasAutoPerm("register.in.stock")
            }
          >
            上架登记（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={this.auditConfirm}
            disabled={
              !this.curData ||
              !(this.status === 4) ||
              !this.hasAutoPerm("register.in.audit")
            }
          >
            审核确认（F7）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={this.printHandle}
            disabled={!this.curData || !this.hasAutoPerm("register.in.print")}
          >
            打印（F11）
          </el-button>
        </div>
        <ht-card class="auto-card container-register" no-padding>
          <ht-setting-table
            loading={this.loading}
            data={this.tableData}
            table-name={COLUMN_ENTER.name}
            columns={COLUMN_ENTER.columns}
            total={this.totalSize}
            current-page={this.page}
            selectedRows={this.selections}
            autofocus
            pagination
            onPageChange={this.handlePageChange}
            onSelectChange={this.selectChangeHandler}
          />
          <div class="footer-left">
            <div class="footer-amount">
              <div class="footer-amount-item">
                单据总数：
                <div class="amount-font" title={String(this.totalSize)}>
                  {this.totalSize}
                </div>
              </div>
              <div class="footer-amount-item">
                配件数量：
                <div class="amount-font" title={this.totalInfo.partCount}>
                  {this.totalInfo.partCount}
                </div>
              </div>
              <div class="footer-amount-item">
                库存总额：
                <div class="amount-font" title={this.totalInfo.amount}>
                  {this.totalInfo.amount}
                </div>
              </div>
            </div>
          </div>
        </ht-card>
        <register-dialog
          ref="registerDialog"
          billInfo={this.curData}
          onUpdate={this.handlePageChange}
          billEnum={this.cinBillEnum}
          type={this.registerType}
        ></register-dialog>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.container-box {
  & > .container-register {
    margin: 0 !important;
    padding-bottom: 7px !important;
    &::v-deep .pagination {
      border-bottom: 1px solid transparent;
      background-color: transparent !important;
    }
    .footer-left {
      position: absolute;
      width: 240px;
      left: 5px;
      bottom: 0;
      height: 40px;
      overflow: hidden;
      .footer-amount {
        width: 100%;
        display: flex;
        background-color: transparent;
        .footer-amount-item {
          flex: 1;
          height: 40px;
          overflow: hidden;
          .amount-font {
            text-indent: 8px;
            width: 100%;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  & > .header {
    margin-top: 0 !important;
  }
}
</style>
