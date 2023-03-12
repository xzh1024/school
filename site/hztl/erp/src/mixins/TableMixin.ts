/**
  1、列表加载完数据，自动选中一行
  2、统一合计方法
**/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Mixins } from "vue-property-decorator";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import {
  BaseItem,
  TotalFiles,
  PrecisionTypes,
  TotalInfo,
  TableData
} from "@/constants/interface";
import { add } from "@/utils/numberAPI";
import { sleep } from "@/utils/tool";

@Component
export default class TableMixin extends Mixins(PrecisionsFixed) {
  protected loading = false;
  protected tableData: BaseItem[] = [];
  protected selections: BaseItem[] = []; // 选中行
  protected autoSelectRow = true; // 是否自动选择中一行，默认是
  protected tableKey = "id"; // 判断行唯一性字段，默认该条数据自增id
  protected page = 1;
  protected totalSize = 0;
  protected totalInfo: TotalInfo = {}; // 后端合计，合计字段必须与列表字段一致

  protected get pageSize() {
    return (this.$store && this.$store.state.admin.table.pageSize) || 20;
  }

  // 加载数据调用后端数据接口，在外部重写，返回调用后端数据接口
  protected async loadData(): Promise<TableData<BaseItem>> {
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
  // 加载数据
  public refreshData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.loadData()
        .then(res => {
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize || 0;
          this.totalInfo = res.totalInfo || {};

          // 加载完数据，自动选中之前行。如果之前行不存在，就选中第一行
          if (this.autoSelectRow) {
            let selectedRow;
            if (this.selections.length) {
              selectedRow = this.tableData.find(
                item =>
                  item[this.tableKey] === this.selections[0][this.tableKey]
              );
            }
            this.selections = selectedRow
              ? [selectedRow]
              : this.tableData.length
              ? [this.tableData[0]]
              : [];
          }
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
  // 翻页
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

  // 后端合计
  protected getSummaries(
    param: { columns: any },
    info: TotalInfo = this.totalInfo
  ) {
    const { columns } = param; // param为table中summary-method的参数
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
  // 前端合计
  getSummariesByCalculate(
    param: { columns: any; data: any },
    totalFiles: TotalFiles[]
  ) {
    const { data } = param; // param为table中summary-method的参数
    const totalData = {}; // 合计数据
    data.forEach((item: any) => {
      totalFiles.forEach((it: TotalFiles) => {
        // 累加
        let sum = 0;
        sum = add(item[it.file] || 0, sum);
        // 取精度
        if (typeof item.type === "number") {
          sum = this.precisionByNumber(sum, it.type as number);
        } else if (typeof item.type === "string") {
          sum = this.precisionFormat(sum, it.type as PrecisionTypes);
        }
        totalData[it.file] = sum;
      });
    });
    this.getSummaries(param, totalData);
  }
}
