<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  SwapGourpPart,
  loadSwapGroupParts,
  removePartsFromSwapGroup
} from "@/api/parts/swapGroupParts";
import { TableColumn } from "@/constants/interface";
import { EDIT_SWAP_GROUP_PART_LIST } from "./constans";
import { SwapGroup } from "@/api/parts/swapGroup";

interface Props {
  group?: SwapGroup;
}

@Component
export default class EditSwapGroupParts extends tsc.Component<Props, Event> {
  @Prop() readonly group!: SwapGroup;

  private loading = false;
  private tableData: SwapGourpPart[] = [];
  private columns: TableColumn<SwapGourpPart>[] = [];
  private page = 1;
  get pageSize() {
    return this.$store.state?.admin?.table?.pageSize;
  }
  private totalSize = 0;
  @Watch("pageSize")
  onPageSizeChange() {
    this.goFirstPage();
  }

  public goFirstPage() {
    this.loadSwapGroupParts(1);
  }

  private loadSwapGroupParts(page: number) {
    this.page = page;
    this.loading = true;
    loadSwapGroupParts({
      groupId: this.group.id,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(res => {
        this.tableData = res.rows || [];
        this.totalSize = res.totalSize;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private removeParts(parts: SwapGourpPart[]) {
    this.$confirm(
      `是否确定将${parts.map(item => item.code)}从「互换组：${
        this.group?.name
      }」移除？`,
      "提示"
    )
      .then(() => {
        return removePartsFromSwapGroup({
          groupId: this.group.id,
          detailIds: parts.map(item => item.id)
        });
      })
      .then(() => {
        this.$message.success({
          message: "删除成功!",
          showClose: true
        });
        this.loadSwapGroupParts(1);
      })
      .catch(() => {
        //
      });
  }
  private formateCloumns() {
    this.columns = EDIT_SWAP_GROUP_PART_LIST.columns.map(item => {
      const removeParts = (row: SwapGourpPart, e: MouseEvent) => {
        e && e.stopPropagation();
        this.removeParts([row]);
      };
      if (item.type === "controls") {
        const column: TableColumn<SwapGourpPart> = {
          ...item,
          render: (value, row) => {
            return (
              <div class="table-button">
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
      <ht-setting-table
        class="auto-block edit-swap-group-parts"
        v-loading={this.loading}
        pagination
        total={this.totalSize}
        current-page={this.page}
        onPageChange={this.loadSwapGroupParts}
        data={this.tableData}
        columns={this.columns}
        table-name={EDIT_SWAP_GROUP_PART_LIST.name}
        rowClassName={this.rowClassName}
      />
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.edit-swap-group-parts {
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
