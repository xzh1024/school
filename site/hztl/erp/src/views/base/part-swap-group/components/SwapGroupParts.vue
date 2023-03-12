<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  SwapGourpPart,
  addAutoPartToSwapGroup,
  loadSwapGroupParts,
  removePartsFromSwapGroup,
  updateAutoPartToSwapGroup
} from "@/api/parts/swapGroupParts";
import { SwapGroup } from "@/api/parts/swapGroup";
import { TableColumn } from "@/constants/interface";
import { SWAP_GROUP_PART_LIST } from "./constans";
import EditSwapGroupPartsDialog from "./EditSwapGroupPartsDialog.vue";

interface Props {
  group?: SwapGroup | null;
  disabled: boolean;
}

interface Event {
  onDataChanged(): void;
}

@Component
export default class SwapGroupParts extends tsc.Component<Props, Event> {
  @Prop() readonly group?: SwapGroup;
  @Prop() readonly disabled!: boolean;
  private loading = false;
  private editVisible = false;
  private changeEditVisible(visible: boolean) {
    if (!visible) {
      this.$emit("dataChanged");
    }
    this.editVisible = visible;
  }

  private tableData: SwapGourpPart[] = [];
  private columns: TableColumn<SwapGourpPart>[] = [];
  private selectedRows: SwapGourpPart[] = [];
  private page = 1;
  private totalSize = 0;
  get pageSize() {
    return this.$store.state?.admin?.table?.pageSize;
  }
  @Watch("group")
  onGroupChange() {
    this.loadSwapGroupParts(1);
  }
  @Watch("pageSize")
  onPageSizeChange() {
    this.loadSwapGroupParts(1);
  }
  private changeSelected(rows: SwapGourpPart[]) {
    this.selectedRows = rows;
  }
  private showNameDialog(model: { name: string }, title: string) {
    const rules = {
      name: [
        {
          required: true,
          message: "互换组名称必填!",
          trigger: "change"
        }
      ]
    };
    return this.$promiseDialog({
      title,
      model,
      width: "400px",
      beforeConfirm: async data => {
        return !!data?.name;
      },
      contentRender: data => (
        <el-form
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
          label-width="100px"
          attrs={{ model: data, rules }}
          show-message={false}
        >
          <el-form-item prop="name" label="互换组名称">
            <ht-input v-model={data.name} />
          </el-form-item>
        </el-form>
      )
    });
  }
  private loadSwapGroupParts(page: number) {
    this.page = page;
    if (!this.group?.id) {
      this.tableData = [];
      this.totalSize = 0;
      this.selectedRows = [];
      return;
    }
    this.loading = true;
    loadSwapGroupParts({
      groupId: this.group?.id,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(res => {
        this.tableData = res.rows || [];
        this.totalSize = res.totalSize;
        this.selectedRows = [];
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private removeParts(parts: SwapGourpPart[]) {
    this.$confirm(
      `是否确定将${parts.map(item => item.code)}从「互换组：${
        this.group?.name
      }」移除？`
    )
      .then(() => {
        return removePartsFromSwapGroup({
          groupId: this.group!.id,
          detailIds: parts.map(item => item.id)
        });
      })
      .then(() => {
        this.$message.success({
          message: "删除成功!",
          showClose: true
        });
        this.$emit("dataChanged");
      });
  }
  private addAutoCode() {
    this.showAutoCodeDilog(
      {
        name: "",
        code: "",
        brand: "",
        productionPlace: ""
      },
      `添加自定义配件编码「互换组:${this.group!.name}」`
    )
      .then(res => {
        return addAutoPartToSwapGroup({
          groupId: this.group!.id,
          ...res
        });
      })
      .then(() => {
        this.$emit("dataChanged");
      });
  }
  private updateCustomizeCode(data: SwapGourpPart) {
    this.showAutoCodeDilog(
      {
        code: data.code,
        name: data.partInfo[0]?.name,
        brand: data.partInfo[0]?.brand,
        productionPlace: data.partInfo[0]?.productionPlace
      },
      `编辑自定义配件编码「互换组:${this.group!.name}`
    )
      .then(res => {
        return updateAutoPartToSwapGroup({
          groupId: this.group!.id,
          detailId: data.id,
          ...res
        });
      })
      .then(() => {
        this.$message.success({
          message: "更新成功!",
          showClose: true
        });
        this.$emit("dataChanged");
      });
  }
  private showAutoCodeDilog(
    model: {
      name: string;
      code: string;
      brand: string;
      productionPlace: string;
    },
    title: string
  ) {
    const rules = {
      code: [
        {
          required: true,
          message: "自定义配件编码必填!",
          trigger: "change"
        }
      ]
    };
    return this.$promiseDialog({
      title,
      model,
      width: "400px",
      beforeConfirm: async data => {
        return !!data?.code;
      },
      contentRender: data => (
        <el-form
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
          label-width="120px"
          attrs={{ model: data, rules }}
          show-message={false}
        >
          <el-form-item prop="code" label="自定义配件编码">
            <ht-input v-model={data.code} />
          </el-form-item>
          <el-form-item prop="name" label="配件名称">
            <ht-input v-model={data.name} />
          </el-form-item>
          <el-form-item prop="brand" label="配件品牌">
            <ht-input v-model={data.brand} />
          </el-form-item>
          <el-form-item prop="productionPlace" label="产地">
            <ht-input v-model={data.productionPlace} />
          </el-form-item>
        </el-form>
      )
    });
  }
  private formateCloumns() {
    this.columns = SWAP_GROUP_PART_LIST.columns.map(item => {
      const removeParts = (row: SwapGourpPart, e: MouseEvent) => {
        e && e.stopPropagation();
        this.removeParts([row]);
      };

      const updateCustomizeCode = (row: SwapGourpPart, e: MouseEvent) => {
        e && e.stopPropagation();
        this.updateCustomizeCode(row);
      };
      if (item.type === "controls") {
        const column: TableColumn<SwapGourpPart> = {
          ...item,
          render: (value, row) => {
            return (
              <div class="table-button">
                {row.isCustomize && this.hasAutoPerm("update") ? (
                  <el-tooltip
                    enterable={false}
                    effect="dark"
                    content="编辑"
                    placement="top"
                  >
                    <span
                      class="operation-icon icon-edit-info"
                      on-click={(e: MouseEvent) => updateCustomizeCode(row, e)}
                    />
                  </el-tooltip>
                ) : (
                  " "
                )}
                {this.hasAutoPerm("update") ? (
                  <el-tooltip
                    enterable={false}
                    effect="dark"
                    content="删除"
                    placement="top"
                  >
                    <span
                      class="operation-icon icon-delete-info"
                      on-click={(e: MouseEvent) => removeParts(row, e)}
                    />
                  </el-tooltip>
                ) : null}
              </div>
            );
          }
        };
        return column;
      }
      return item;
    });
  }
  private rowClassName({ row }: { row: SwapGourpPart; rowIndex: number }) {
    return row.isCustomize ? "customize-row" : "";
  }
  mounted() {
    this.formateCloumns();
  }
  render() {
    return (
      <div class="flex-container column-flex">
        <div class="btn-group">
          <el-button
            type="primary"
            size="mini"
            disabled={!this.group || !this.hasAutoPerm("update")}
            on-click={() => this.changeEditVisible(true)}
          >
            编辑互换组配件明细(F3)
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.group || !this.hasAutoPerm("update")}
            on-click={this.addAutoCode}
          >
            添加自定义配件编码
          </el-button>
          <el-button
            type="primary"
            size="mini"
            disabled={!this.selectedRows.length || !this.hasAutoPerm("update")}
            on-click={() => this.removeParts(this.selectedRows)}
          >
            删除勾选配件
          </el-button>
        </div>
        <ht-setting-table
          class="auto-block swap-group-parts"
          selection-type="multiple"
          v-loading={this.loading || this.disabled}
          pagination
          total={this.totalSize}
          current-page={this.page}
          onPageChange={this.loadSwapGroupParts}
          data={this.tableData}
          columns={this.columns}
          table-name={SWAP_GROUP_PART_LIST.name}
          selected-rows={this.selectedRows}
          on-selectChange={this.changeSelected}
          rowClassName={this.rowClassName}
        />
        <EditSwapGroupPartsDialog
          group={this.group}
          visible={this.editVisible}
          onVisibleChange={this.changeEditVisible}
        />
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.swap-group-parts {
  &::v-deep {
    .customize-row td {
      background-color: rgba($color-warning, 0.5) !important;
    }
    .fake-table-cell {
      height: 22px;
      border-bottom: 1px solid #e8eaef;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
