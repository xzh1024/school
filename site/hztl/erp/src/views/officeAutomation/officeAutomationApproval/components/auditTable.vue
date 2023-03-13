<script lang="tsx">
import { Component, Mixins, Prop, Emit, Watch } from "vue-property-decorator";
import { AUDIT_TABLE_COLUMN } from "../constant/tableColumns";
import { QUERY_TYPE, BILL_TYPE, BILL_TYPE_NAME } from "../constant";
import {
  FeeApplicationQueryParams,
  FeeApplicationModel
} from "../constant/interfaces";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
const h = eventBus.$createElement;
import { OfficeAutomationService } from "../constant/services";
const officeAutomationService = new OfficeAutomationService();
import PaginationDataMixin from "@/mixins/PaginationDataMixin";

@Component({ name: "AuditTable" })
export default class AuditTable extends Mixins(PaginationDataMixin) {
  @Prop() readonly type!: string;
  @Prop() searchForm!: FeeApplicationQueryParams;

  @Emit("updateRowData") updateRowData(row: FeeApplicationModel) {
    return row;
  }

  protected loading = false;
  public tableData: FeeApplicationModel[] = [];
  public selections: FeeApplicationModel[] = [];
  @Watch("selections", { deep: true })
  onSelections(rows: FeeApplicationModel[]) {
    if (Array.isArray(rows) && rows.length === 1) {
      this.updateRowData(rows[0]);
    } else {
      this.updateRowData({} as FeeApplicationModel);
    }
  }

  protected totalInfoTemp: any = {
    applyAmount: 0
  };

  public async loadData() {
    const searchForm: FeeApplicationQueryParams = this.searchForm;
    const params = {
      ...searchForm,
      fromDate: searchForm.timeRange[0] || "",
      toDate: searchForm.timeRange[1] || "",
      page: this.page,
      pageSize: this.pageSize
    } as FeeApplicationQueryParams;
    const data = await officeAutomationService.getFeeApplications(params);
    this.totalInfoTemp = {
      applyAmount: data.totalAmount
    };
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

  get tableColumns() {
    const abstractColumn = {
      prop: "abstract",
      label: "摘要",
      width: CELL_WIDTH.abstract,
      render: (value: string, row: FeeApplicationModel) => {
        let elements: any[] = [];
        const billTypeElement = h("div", {}, [
          h("span", {}, "资金类型："),
          h("span", {}, BILL_TYPE_NAME[row.billType])
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
    };
    const applicantNameColumn = {
      prop: "applicantName",
      label: "发起人",
      width: CELL_WIDTH.personName
    };
    const approvedByNameColumn = {
      prop: "approvedByName",
      label: "审批人",
      width: CELL_WIDTH.personName
    };

    const columns: any = [];
    AUDIT_TABLE_COLUMN.columns.forEach(item => {
      columns.push(item);
      if (item.prop === "status") {
        columns.push(abstractColumn);
      }
      if (item.prop === "companyName") {
        columns.push(
          this.type === QUERY_TYPE.initiated
            ? approvedByNameColumn
            : applicantNameColumn
        );
      }
    });

    return columns;
  }

  protected handlePageChange(page: number) {
    this.page = page;
    this.pageChange(this.page);
  }

  private handlerSelectChange(list: FeeApplicationModel[]) {
    this.selections = list;
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
      <ht-setting-table
        loading={this.loading}
        data={this.tableData}
        table-name={this.type + AUDIT_TABLE_COLUMN.name}
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
    );
  }
}
</script>
