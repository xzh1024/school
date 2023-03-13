/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageData, BaseItem } from "@/constants/interface";
import { sleep } from "@/utils/tool";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PaginationDataMixin extends Vue {
  protected tableKey = "id";
  protected loading = false;
  protected selections: BaseItem[] = [];
  protected tableData: BaseItem[] = [];
  protected totalSize = 0;
  protected totalInfo: any = {};
  // 加载数据方法在外部从写
  protected async loadData(): Promise<PageData<BaseItem>> {
    this.loading = true;
    await sleep(1000);
    console.error("覆盖此方法");
    this.loading = false;
    return {
      rows: [],
      totalSize: 0,
      totalPage: 0,
      totalInfo: {}
    };
  }
  protected page = 1;
  protected pageChange(page: number) {
    this.page = page;
    return new Promise((resolve, reject) => {
      this.refreshData()
        .then(res => {
          resolve(res);
        })
        .catch(() => {
          reject();
        });
    });
  }

  public refreshData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.loadData()
        .then(res => {
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize;
          this.totalInfo = res.totalInfo || {};

          let selectedRow;
          if (this.selections.length) {
            selectedRow = this.tableData.find(
              item => item[this.tableKey] === this.selections[0][this.tableKey]
            );
          }
          this.selections = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          resolve(res);
        })
        .catch(() => {
          reject();
        })
        .finally(() => {
          this.loading = false;
        });
    });
  }

  protected getSummaries(
    param: { columns: any; data: any },
    info: any = this.totalInfo
  ) {
    const { columns } = param;
    const sums: (string | number)[] = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      if (info[column.property]) {
        sums[index] = info[column.property];
      }
    });

    return sums;
  }

  protected get pageSize() {
    return (this.$store && this.$store.state.admin.table.pageSize) || 20;
  }
}
