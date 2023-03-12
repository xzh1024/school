<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { reduce } from "lodash";
import SearchMixin from "@/mixins/searchMixin";
import Summaries from "@/mixins/summaries";
import PrecisionsFixedMixin from "@/mixins/PrecisionsFixedMixin";
import { CELL_WIDTH } from "@/constants";
import { add } from "@/utils/numberAPI";
import {
  TransferBillItem,
  TransferBillPartItem
} from "@/views/transfer/interface";
import HeaderText from "./HeaderText.vue";
import BoxSearchForm from "./BoxSearchForm.vue";
import { APPLY_DETAL_TABLE, APPLY_DETAL_TABLE_TOTAL_FILES } from "./constants";
import transferService from "./transferService";

export interface SearchFormData {
  code?: string;
  name?: string;
  brand?: string;
  categoryName?: string;
  productionPlace?: string;
  vehModel: string;
  onlyWaitAlloc?: boolean;
}
export interface TableItem extends TransferBillPartItem {
  curTermQty?: number;
  hasStockWarehouseIds?: number[];
  enoughWarehouseIds?: number[];
}
export interface Warehouse {
  id: number;
  name: string;
}

const TOTAL_FILES = [...APPLY_DETAL_TABLE_TOTAL_FILES];
TOTAL_FILES.push({ file: "curTermQty", type: "qty" });
const defaultSearchData: SearchFormData = {
  code: "",
  name: "",
  brand: "",
  categoryName: "",
  productionPlace: "",
  vehModel: "",
  onlyWaitAlloc: true
};
const curTermQtyRules = {
  curTermQty: {
    required: true,
    message: "请输入本次取消数量",
    trigger: "change"
  }
};

@Component({
  components: {
    HeaderText,
    BoxSearchForm
  }
})
export default class CancelBox extends Mixins(
  SearchMixin,
  Summaries,
  PrecisionsFixedMixin
) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly headerData!: TransferBillItem;
  @Prop() readonly totalData!: TableItem[];

  protected transferService = transferService;
  private loading = false;
  private searchParams: SearchFormData = { ...defaultSearchData };
  private totalTableData: TableItem[] = [];
  private tableName = `${APPLY_DETAL_TABLE.name}TransferBox`;
  private tableData: TableItem[] = [];
  private selectedRows: TableItem[] = [];
  private total = 0;
  private page = 1;

  protected get pageSize() {
    return (this.$store && this.$store.state.admin.table.pageSize) || 20;
  }
  private get relVisible() {
    return this.visible;
  }
  private set relVisible(val: boolean) {
    this.$emit("update:visible", val);
  }
  private get tableColumns() {
    const multipleColumn = {
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    };
    const curTermQtyColumns = {
      label: "本次取消数量",
      prop: "curTermQty",
      width: 130
    };

    const columns = [...APPLY_DETAL_TABLE.columns];
    columns.splice(1, 1, multipleColumn);
    columns.splice(13, 0, curTermQtyColumns);

    return columns.map(item => {
      if (item.prop === "curTermQty") {
        return {
          ...item,
          render: (value: number, row: TableItem) => (
            <div on-click={(e: MouseEvent) => e.stopPropagation()}>
              <el-form
                attrs={{
                  model: row,
                  rules: curTermQtyRules,
                  "show-message": false
                }}
                disabled={!this.selectable(row)}
                size="mini"
                label-width="0"
                class="form-item-small-margin-bottom"
              >
                <el-form-item prop="curTermQty">
                  <ht-format-number
                    v-model={row.curTermQty}
                    min={0}
                    max={Number(row.onTransQty || 0)}
                    precision-type="qty"
                    on-blur={() => this.handleCurTransferQtyBlur(row)}
                  />
                </el-form-item>
              </el-form>
            </div>
          )
        };
      }

      return item;
    });
  }
  private get curTotalTermQty() {
    let total = 0;
    if (this.selectedRows.length) {
      total = this.precisionFormat(
        reduce(
          this.selectedRows,
          (sum: number | string, item) =>
            add(sum, Number(item.curTermQty || 0)),
          0
        ),
        "qty"
      );
    }
    return total;
  }

  @Watch("visible")
  private async onVisibleChange(val: boolean) {
    if (val) {
      this.searchParams = { ...defaultSearchData };
      this.filterData(this.searchParams);
    }
  }

  private selectable(row: TableItem) {
    return Number(row.onTransQty || 0) > 0;
  }

  private filterData(params?: SearchFormData) {
    let totalTableData = [];
    if (params) {
      this.searchParams = { ...params };
      const paramsKeys = Object.keys(params);
      totalTableData = this.totalData.filter((item: TableItem) => {
        return paramsKeys.every(key => {
          if (key === "onlyWaitAlloc") {
            return params[key] ? Number(item.onTransQty || 0) > 0 : true;
          } else if (key === "categoryName") {
            return (item[key] || "").indexOf(params[key]) > -1;
          } else if (key === "vehModel") {
            return params[key]
              ? (item.part.vehModel || "").indexOf(params[key]) > -1 ||
                  (item.part.avaVehModel || "").indexOf(params[key]) > -1
              : true;
          } else {
            return params[key]
              ? (item.part[key] || "").indexOf(params[key]) > -1
              : true;
          }
        });
      });
    } else {
      totalTableData = [...this.totalData];
    }
    this.totalTableData = totalTableData.map(item => ({
      ...item,
      curTermQty: 0
    }));
    this.page = 1;
    this.setTableData();
  }
  private setTableData() {
    this.total = this.totalTableData.length;
    this.tableData = this.totalTableData.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }
  private pageChange(page: number) {
    this.page = page;
    this.setTableData();
  }

  private handleCurTransferQtyBlur(row: TableItem) {
    const ids = this.selectedRows.map(item => item.id);
    if (Number(row.curTermQty || 0) > 0) {
      this.selectedRows = this.tableData.filter(
        item => ids.includes(item.id) || item.id === row.id
      );
    } else {
      this.selectedRows = this.tableData.filter(
        item => ids.includes(item.id) && item.id !== row.id
      );
    }
  }

  private inverseHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    const ids = this.selectedRows.map(item => item.id);
    this.selectedRows = this.tableData.filter(
      item => this.selectable(item) && !ids.includes(item.id)
    );
  }

  private cancelAllParstHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    const totalData = this.totalData.map(item => ({
      ...item,
      curTermQty: Number(item.onTransQty || 0)
    }));
    this.cancelParstHandle(totalData);
  }
  private cancelParstHandle(selectedRows: TableItem[], e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    const useRows = selectedRows.filter(item => this.selectable(item));
    if (!this.validateUseRows(useRows)) {
      return;
    }

    this.loading = true;
    const details = {};
    useRows.forEach((item: TableItem) => {
      details[item.id] = item.curTermQty;
    });

    this.transferService
      .cancelBill(this.headerData.id, details)
      .then(() => {
        this.$message.success({ message: "取消配件成功", showClose: true });
        this.$emit("success");
        this.cancelHandle();
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private validateUseRows(useRows: TableItem[]) {
    let flag = true;

    if (
      useRows.some(
        item => this.selectable(item) && !Number(item.curTermQty || 0)
      )
    ) {
      this.$message.warning({
        message: curTermQtyRules.curTermQty.message,
        showClose: true
      });
      flag = false;
    }

    return flag;
  }
  private cancelHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    this.relVisible = false;
  }

  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": (val: boolean) => (this.relVisible = val)
        }}
        append-to-body
        title="配件取消"
        width="1320px"
        top="50px"
        class="dialog-body"
      >
        <div class="container-box" v-loading={this.loading}>
          <ht-card title="单据信息">
            <header-text headerData={this.headerData} />
          </ht-card>
          <ht-card title="配件明细" style="margin-top: 5px;">
            <box-search-form
              onSearch={this.filterData}
              defaultFormData={defaultSearchData}
            />
          </ht-card>
          <ht-card style="margin-top: -15px;">
            <ht-setting-table
              tableName={this.tableName}
              columns={this.tableColumns}
              data={this.tableData}
              selectable={this.selectable}
              selectedRows={this.selectedRows}
              on={{
                "update:selectedRows": (val: TableItem[]) =>
                  (this.selectedRows = val)
              }}
              pagination
              total={this.total}
              current-page={this.page}
              onPageChange={this.pageChange}
              selection-type="multiple"
              show-summary
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              summary-method={(params: any) =>
                this.getSummariesByCalculate(params, TOTAL_FILES)
              }
              style="height: 375px;"
            />
            <div style="margin: -31px 0 0 5px;">
              <el-button
                type="primary"
                size="mini"
                onClick={(e: MouseEvent) => this.inverseHandle(e)}
              >
                反选
              </el-button>
              <span style="display: inline-block; margin-left: 20px;">
                选中配件数：
                <span class="text-font-primary">
                  {this.selectedRows.length}
                </span>
              </span>
              <span style="display: inline-block; margin-left: 20px;">
                本次取消数合计：
                <span class="text-font-primary">{this.curTotalTermQty}</span>
              </span>
            </div>
          </ht-card>
          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              disabled={!this.selectedRows.length}
              type="primary"
              size="mini"
              onClick={(e: MouseEvent) =>
                this.cancelParstHandle(this.selectedRows, e)
              }
            >
              取消选中配件
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={(e: MouseEvent) => this.cancelAllParstHandle(e)}
            >
              取消所有待转配件
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={(e: MouseEvent) => this.cancelHandle(e)}
            >
              取消（Esc）
            </el-button>
          </div>
        </div>
      </ht-dialog>
    );
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
</style>
