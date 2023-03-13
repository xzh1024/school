<script lang="tsx">
import { Component, Mixins, Emit } from "vue-property-decorator";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
import baseIndexJump from "@/utils/baseIndexJump";
import { BILL_TYPE, BILL_TYPE_NAME } from "../../constant";
import {
  FeeApplicationQueryParams,
  FeeApplicationModel
} from "../../constant/interfaces";
const h = eventBus.$createElement;
import { OfficeAutomationService } from "../../constant/services";
const officeAutomationService = new OfficeAutomationService();

@Component({ name: "SystemHasBegun" })
export default class SystemHasBegun extends Mixins(PaginationDataMixin) {
  @Emit("getFeeApplicationsCount")
  protected getFeeApplicationsCount() {
    return;
  }
  private searchForm = {
    type: "initiated"
  } as FeeApplicationQueryParams;

  protected loading = false;
  protected tableData: FeeApplicationModel[] = [];
  protected selections: FeeApplicationModel[] = [];
  protected page = 1;

  protected totalInfoTemp: any = {
    applyAmount: 0
  };

  public async loadData() {
    const searchForm: FeeApplicationQueryParams = this.searchForm;
    const params = {
      ...searchForm,
      page: this.page,
      pageSize: this.pageSize
    } as FeeApplicationQueryParams;
    const data = await officeAutomationService.getFeeApplications(params);
    // 合计信息
    this.totalInfoTemp = {
      applyAmount: data.totalAmount
    };
    // 更新统计数
    this.getFeeApplicationsCount();
    return data;
  }

  // public onRefreshData() {
  //   this.refreshData().then((res: any) => {
  //     this.tableData = res.rows || [];
  //     this.totalSize = res.totalSize;
  //     this.totalInfo = {
  //       applyAmount: res.totalAmount
  //     };
  //   });
  // }

  protected handlePageChange(page: number) {
    this.page = page;
    this.pageChange(this.page);
  }

  private handlerSelectChange(data: FeeApplicationModel[]) {
    this.selections = data;
  }

  get tableColumns() {
    return [
      {
        label: "序号",
        prop: "index",
        type: "index",
        width: CELL_WIDTH.index,
        cantHide: true,
        cantExport: true
      },
      {
        prop: "controls",
        label: "操作",
        width: 102,
        render: (value: string, row: FeeApplicationModel) => {
          return (
            <el-button
              type="primary"
              size="mini"
              plain
              onClick={() => this.handleDeal(row)}
            >
              前往处理
            </el-button>
          );
        }
      },
      {
        prop: "billType",
        label: "审批类型",
        width: CELL_WIDTH.type,
        formatter(value: string) {
          return BILL_TYPE_NAME[value];
        }
      },
      {
        prop: "approvedByName",
        label: "审批人",
        width: CELL_WIDTH.personName
      },
      {
        prop: "abstract",
        label: "摘要",
        width: CELL_WIDTH.abstract,
        render: (value: string, row: FeeApplicationModel) => {
          let elements: any[] = [];
          const billTypeElement = h("div", {}, [
            h("span", {}, "资金类型："),
            h("span", {}, BILL_TYPE_NAME[row.billType])
          ]);
          const cooperatorElement = h("div", {}, [
            h("span", {}, "往来单位："),
            h("span", {}, row.cooperatorName)
          ]);
          const fundCategoryNameElement = h("div", {}, [
            h("span", {}, "收支类目："),
            h("span", {}, row.fundCategoryName)
          ]);
          const sourceElement = h("div", {}, [
            h("span", {}, "预支单信息："),
            h("span", {}, `${row.sourceBillNo}(${row.sourceAmount})`)
          ]);
          const transferElement = h("div", {}, [
            h("span", {}, "收付标识："),
            h("span", {}, row.billType === BILL_TYPE.OAAS ? "应收" : "应付")
          ]);
          const relatedCompanyElement = h("div", {}, [
            h("span", {}, "往来分公司："),
            h("span", {}, row.relatedCompanyName)
          ]);
          const applyDateElement = h("div", {}, [
            h("span", {}, "业务日期："),
            h("span", {}, row.applyDate)
          ]);
          switch (row.billType) {
            case BILL_TYPE.OAYS:
            case BILL_TYPE.OAYF:
              elements = [billTypeElement, cooperatorElement];
              break;
            case BILL_TYPE.OATS:
            case BILL_TYPE.OATF:
              elements = [billTypeElement, cooperatorElement];
              break;
            case BILL_TYPE.YZ:
              elements = [fundCategoryNameElement];
              break;
            case BILL_TYPE.YBX:
              elements = [sourceElement, fundCategoryNameElement];
              break;
            case BILL_TYPE.BX:
              elements = [fundCategoryNameElement];
              break;
            case BILL_TYPE.OAAS:
            case BILL_TYPE.OAAF:
              elements = [
                transferElement,
                relatedCompanyElement,
                applyDateElement
              ];
              break;
            default:
              break;
          }
          return h("div", {}, elements);
        }
      },
      {
        prop: "applyAmount",
        label: "申请金额",
        width: CELL_WIDTH.money,
        type: "number"
      },
      {
        prop: "applyDate",
        label: "申请日期",
        width: CELL_WIDTH.date,
        type: "date"
      }
    ];
  }

  protected handleDeal(row: FeeApplicationModel) {
    if (!row.id) return;
    baseIndexJump.setInfo("officeAutomationOaInitiated", row.billNo);
    this.$router.push({
      path: "/officeAutomationApproval",
      query: {
        tabName: "OaInitiated",
        time: `${new Date().getTime()}`
      }
    });
  }

  protected getSummaries(param: { columns: any[]; data: any[] }, info: any) {
    const { columns } = param;
    const sums: string[] = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "总计";
        return;
      }
      if (info[column.property]) {
        sums[index] = info[column.property];
      }
    });

    return sums;
  }

  created() {
    this.refreshData();
  }

  render() {
    return (
      <div class="system-pending">
        <ht-setting-table
          loading={this.loading}
          data={this.tableData}
          table-name="SystemPendingTable"
          columns={this.tableColumns}
          total={this.totalSize}
          current-page={this.page}
          selectedRows={this.selections}
          autofocus
          pagination
          onPageChange={this.handlePageChange}
          onSelectChange={this.handlerSelectChange}
          show-summary
          summary-method={(param: any) =>
            this.getSummaries(param, this.totalInfoTemp)
          }
        />
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.system-pending {
  height: calc(100% - 35px);
}
</style>
