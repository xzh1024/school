/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Mixins } from "vue-property-decorator";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import { add } from "@/utils/numberAPI";

/**
 * getSummaries
 *  参数param 为table中summary-method的参数
 *
 *  totalFiles
 *   {
 *      file        统计字段
 *      type        采用精度类别
 *  }
 *
 *
 */

@Component
export default class Summaries extends Mixins(PrecisionsFixed) {
  getSummariesByCalculate(param: any, totalFiles: any) {
    const { columns, data } = param;
    const sums: any = [];
    const totalData = {};

    totalFiles.forEach((item: any) => {
      totalData[item.file] = 0;
    });
    data.forEach((item: any) => {
      totalFiles.forEach((it: any) => {
        totalData[it.file] = add(
          Number(item[it.file] || 0),
          totalData[it.file]
        );
      });
    });

    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }

      totalFiles.forEach((item: any) => {
        if (column.property === item.file) {
          if (typeof item.type === "number") {
            sums[index] = this.precisionByNumber(
              totalData[item.file],
              item.type
            );
          } else if (typeof item.type === "string") {
            sums[index] = this.precisionFormat(totalData[item.file], item.type);
          }
        }
      });
    });
    return sums;
  }

  protected totalInfo: any = {};
  getSummaries(param: { columns: any; data: any }, info: any = this.totalInfo) {
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
}
