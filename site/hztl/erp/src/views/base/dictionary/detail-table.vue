<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { TableColumn } from "@/constants/interface";
import { DictionaryItem, dictionaryList } from "@/constants/base";
import { multiply } from "@/utils/numberAPI";
import { CELL_WIDTH } from "@/constants";
import { baseDictionary } from "@/api/base/base";

interface Props {
  dictionaryKey: string;
}

interface Events {
  onChange: (key: string) => void;
  onChangeDefault: (item: DictionaryItem) => void;
  onEdit: (item: DictionaryItem) => void;
  onEnable: (item: DictionaryItem) => void;
  onDisable: (item: DictionaryItem) => void;
  onDelete: (item: DictionaryItem) => void;
  onSelectChang: (item: DictionaryItem[]) => void;
}

@Component
export default class DetailTable extends tsc.Component<Props, Events> {
  @Prop() readonly dictionaryKey!: string;

  private get curDictionary() {
    return dictionaryList.find(item => item.key === this.dictionaryKey);
  }

  private get isInvoiceType() {
    return this.dictionaryKey === "invoiceType";
  }

  private get isSettlementType() {
    return this.dictionaryKey === "settlementType";
  }

  private loading = false;
  private tableData: DictionaryItem[] = [];
  private totalSize = 0;
  private keyword = "";
  private containDisabled = false;
  private page = 1;
  protected get pageSize() {
    return (this.$store && this.$store.state.admin.table.pageSize) || 20;
  }
  public refreshData(
    keyword = this.keyword,
    containDisabled = this.containDisabled
  ) {
    this.keyword = keyword;
    this.containDisabled = containDisabled;
    this.page = 1;
    this.loadData();
  }
  public pageChange(page: number) {
    this.page = page;
    this.loadData();
  }
  private loadData() {
    this.loading = true;
    return (
      baseDictionary({
        type: this.dictionaryKey,
        keyword: this.keyword,
        containDisabled: this.containDisabled,
        page: this.page,
        pageSize: this.pageSize,
        isReload: true
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          this.totalSize = res.totalSize || 0;
          this.tableData = res.options || [];
        })
        .finally(() => {
          this.loading = false;
        })
    );
  }

  private changeDefault(item: DictionaryItem, value: boolean) {
    item.isDefault = value;
    this.$emit("changeDefault", item);
  }

  private onSelectChange(rows: DictionaryItem[]) {
    this.$emit("selectChang", rows);
  }

  private canEdit(item: DictionaryItem) {
    return (
      this.hasAutoPerm("update") &&
      !this.isSettlementType &&
      this.curDictionary?.editable &&
      (!item.builtin || this.isInvoiceType)
    );
  }
  private editItem(item: DictionaryItem, e?: MouseEvent) {
    e?.stopPropagation();
    if (this.canEdit(item)) {
      this.$emit("edit", item);
    }
  }

  private canEnable(item: DictionaryItem) {
    return this.hasAutoPerm("update") && !this.isSettlementType && item.disable;
  }
  private enableItem(item: DictionaryItem, e?: MouseEvent) {
    e?.stopPropagation();
    if (this.canEnable(item)) {
      this.$emit("enable", item);
    }
  }

  private canDisable(item: DictionaryItem) {
    return (
      this.hasAutoPerm("update") && !this.isSettlementType && !item.disable
    );
  }
  private disableItem(item: DictionaryItem, e?: MouseEvent) {
    e?.stopPropagation();
    if (this.canDisable(item)) {
      this.$emit("disable", item);
    }
  }

  private canDelete(item: DictionaryItem) {
    return (
      this.hasAutoPerm("delete") &&
      !this.isSettlementType &&
      this.curDictionary?.editable &&
      !item.builtin
    );
  }
  private deleteItem(item: DictionaryItem, e?: MouseEvent) {
    e?.stopPropagation();
    if (this.canDelete(item)) {
      this.$emit("delete", item);
    }
  }

  get columns() {
    const columns: TableColumn<DictionaryItem>[] = [
      {
        prop: "index",
        label: "序号",
        type: "index",
        width: CELL_WIDTH.index,
        cantHide: true,
        cantExport: true
      },
      {
        prop: "multiple",
        label: "选择",
        type: "multiple",
        width: CELL_WIDTH.multiple,
        cantExport: true
      },
      {
        label: "操作",
        prop: "id",
        key: "control",
        width: 80,
        render: (value, row) => {
          return (
            <div
              class="table-button"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              {this.canEdit(row) ? (
                <el-tooltip
                  enterable={false}
                  effect="dark"
                  content="编辑"
                  placement="top"
                >
                  <span
                    class="operation-icon icon-edit-info"
                    on-click={(e: MouseEvent) => this.editItem(row, e)}
                  />
                </el-tooltip>
              ) : null}
              {this.canEnable(row) ? (
                <el-tooltip
                  enterable={false}
                  effect="dark"
                  content="启用"
                  placement="top"
                >
                  <span
                    class="operation-icon icon-enable-info"
                    on-click={(e: MouseEvent) => this.enableItem(row, e)}
                  />
                </el-tooltip>
              ) : null}
              {this.canDisable(row) ? (
                <el-tooltip
                  enterable={false}
                  effect="dark"
                  content="停用"
                  placement="top"
                >
                  <span
                    class="operation-icon icon-disable-info"
                    on-click={(e: MouseEvent) => this.disableItem(row, e)}
                  />
                </el-tooltip>
              ) : null}
              {this.canDelete(row) ? (
                <el-tooltip
                  enterable={false}
                  effect="dark"
                  content="删除"
                  placement="top"
                >
                  <span
                    class="operation-icon icon-delete-info"
                    on-click={(e: MouseEvent) => this.deleteItem(row, e)}
                  />
                </el-tooltip>
              ) : null}
            </div>
          );
        }
      },
      {
        label: "默认选项",
        prop: "isDefault",
        width: 80,
        render: (value, row) => (
          <div onClick={(e: MouseEvent) => e.stopPropagation()}>
            <el-switch
              value={row.isDefault}
              on-change={(value: boolean) => this.changeDefault(row, value)}
            />
          </div>
        )
      },
      {
        label: "名称",
        prop: "name",
        width: 200
      },
      {
        label: "平台内置",
        prop: "builtin",
        width: 80,
        formatter: value => (value ? "是" : "否")
      },
      {
        prop: "specialValue",
        key: "special",
        width: 100,
        renderHeader: () => {
          if (this.curDictionary?.key === "technicianLevel") {
            return (
              <span>
                {(this.curDictionary && this.curDictionary?.specialName) || ""}
                <el-tooltip
                  class="item"
                  effect="dark"
                  content=""
                  placement="top"
                >
                  <span slot="content">
                    当多个技师同时分配到同一个维修项目时，根据级别提成权重计算
                    <br />
                    每人可分配的提成比例。例如技师A和技师B分配到一起时：
                    <br />
                    技师A：高级技师（级别提成权重：5）
                    <br />
                    技师B：中级技师（级别提成权重：3）
                    <br />
                    那么：A提成比例 = 5 / （5+3），B提成比例 = 3 /（5+3）
                  </span>
                  <span class="text-danger" style="cursor:pointer;float:right">
                    <i class="el-icon-question"></i>
                  </span>
                </el-tooltip>
              </span>
            );
          } else {
            return (
              (this.curDictionary && this.curDictionary?.specialName) || ""
            );
          }
        },
        formatter: (value: string) => {
          if (this.curDictionary?.key === "invoiceType") {
            return `${multiply(value, 100)}%`;
          } else {
            return value;
          }
        }
      },
      {
        label: "备注",
        prop: "remark",
        width: 200
      }
    ];
    return columns.filter(item => {
      if (item.key === "control") {
        return (
          (this.hasAutoPerm("delete") || this.hasAutoPerm("update")) &&
          !this.isSettlementType
        );
      } else if (item.key === "special") {
        return this.curDictionary?.specialName;
      } else if (item.type === "multiple") {
        return !this.isSettlementType;
      } else {
        return true;
      }
    });
  }

  render() {
    return (
      <ht-setting-table
        on-rowOperation={this.editItem}
        on-rowDelete={this.deleteItem}
        tableName={`baseDictionaryTable${this.dictionaryKey}`}
        columns={this.columns}
        data={this.tableData}
        onSelectChange={this.onSelectChange}
        selection-type={this.isSettlementType ? "single" : "multiple"}
        total={this.totalSize}
        pagination
        current-page={this.page}
        onPageChange={this.pageChange}
        loading={this.loading}
      />
    );
  }
}
</script>
