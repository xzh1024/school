import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import { SYPPLIER_PART_SYPPLIER_LIST } from "./constants";
import { EditPartData, SupplierItem, SupplierPartItem } from "../interface";
import { loadSupplierPartList } from "../services";
import { SupplierPartFilter } from "../SearchFrom";

@Component({
  name: "partList",
  components: {
    PartsDetailBox,
    StorageStocksLockedDialog
  }
})
export default class PartList extends Mixins(PaginationDataMixin) {
  @Prop() searchParams!: SupplierPartFilter;
  @Prop() supplier!: SupplierItem | null;
  private get belongs() {
    return this.supplier?.belongs || [];
  }
  private get disEdit() {
    return !this.hasBelongsPerm("update", this.belongs);
  }
  private get disRemove() {
    return !this.hasBelongsPerm("delete", this.belongs);
  }

  protected tableData: SupplierPartItem[] = [];
  protected selections: SupplierPartItem[] = [];

  private selectChangeHandler(data: SupplierPartItem[]) {
    this.selections = data;
  }

  @Watch("selections")
  onSelectionsChange() {
    this.$emit("selectChange", this.selections);
  }

  protected get curData() {
    return this.selections.length === 1 ? this.selections[0] : undefined;
  }

  @Watch("supplier")
  protected onSupplierChange() {
    if (!this.supplier) {
      this.selections = [];
      this.tableData = [];
      this.totalSize = 0;
    } else {
      this.pageChange(1);
    }
  }

  protected loadData() {
    this.loading = true;
    return loadSupplierPartList({
      ...this.searchParams,
      cooperatorId: this.supplier?.cooperatorId,
      page: this.page,
      pageSize: this.pageSize
    }).finally(() => {
      this.loading = false;
    });
  }

  private editPartHandle(row: SupplierPartItem) {
    if (this.disEdit) {
      return;
    }
    this.$emit("editPart", [row]);
  }

  private removePart(row: SupplierPartItem) {
    if (this.disRemove) {
      return;
    }
    this.$confirm("确定移除当前配件?").then(() => {
      this.$emit("removeParts", [row.id]);
    });
  }

  private changePartData(ids: number[], data: EditPartData) {
    this.$emit("changePartData", ids, data);
  }

  private get columns() {
    const editHandle = (row: SupplierPartItem, e: MouseEvent) => {
      e.stopPropagation();
      this.editPartHandle(row);
    };

    const removePart = (row: SupplierPartItem, e: MouseEvent) => {
      e.stopPropagation();
      this.removePart(row);
    };

    const changePartType = (val: number, row: SupplierPartItem) => {
      if (this.disEdit) {
        return;
      }
      this.changePartData([row.id], {
        partType: val
      });
    };

    const columns = SYPPLIER_PART_SYPPLIER_LIST.columns.map(item => {
      if (item.type === "controls") {
        return {
          ...item,
          render: (value: null, row: SupplierPartItem) => {
            return (
              <div>
                {!this.disEdit ? (
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={(e: MouseEvent) => editHandle(row, e)}
                    />
                  </el-tooltip>
                ) : null}
                {!this.disRemove ? (
                  <el-tooltip placement="top" content="删除" enterable={false}>
                    <i
                      class="icon operation-icon icon-delete-info"
                      on-click={(e: MouseEvent) => removePart(row, e)}
                    />
                  </el-tooltip>
                ) : null}
              </div>
            );
          }
        };
      } else if (item.prop === "partType") {
        return {
          ...item,
          render: (value: number, row: SupplierPartItem) => {
            return (
              <div onClick={(e: MouseEvent) => e.stopPropagation()}>
                <el-switch
                  disabled={this.disEdit}
                  value={value}
                  active-value={1}
                  inactive-value={0}
                  onChange={(val: number) => changePartType(val, row)}
                />
              </div>
            );
          }
        };
      }
      return item;
    });
    return columns;
  }

  render() {
    return (
      <ht-setting-table
        table-name={SYPPLIER_PART_SYPPLIER_LIST.name}
        columns={this.columns}
        selectionType="multiple"
        pagination
        autofocus
        current-page={this.page}
        total={this.totalSize}
        data={this.tableData}
        loading={this.loading}
        selectedRows={this.selections}
        onSelectChange={this.selectChangeHandler}
        onPageChange={this.pageChange}
        onRowOperation={this.editPartHandle}
        onRowDelete={this.removePart}
      />
    );
  }
}
