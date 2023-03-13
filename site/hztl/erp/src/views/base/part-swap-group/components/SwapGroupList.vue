<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  SearchSwapGroupParams,
  SwapGroup,
  createSwapGroup,
  getDefultSwapGroupName,
  removeSwapGroup,
  searchSwapGroup,
  updateSwapGroup
} from "@/api/parts/swapGroup";
import { SWAP_GROUP_LIST } from "./constans";
import { TableColumn } from "@/constants/interface";

interface Props {
  selectedRow: SwapGroup | null;
  params: SearchSwapGroupParams;
  loading: boolean;
}
interface Events {
  onChange(params: SearchSwapGroupParams): void;
  onLoadingChange(loading: boolean): void;
  onSelectedChange(row?: SwapGroup): void;
}

@Component
export default class SwapGroupList extends tsc.Component<Props, Events> {
  @Prop() readonly params!: SearchSwapGroupParams;
  @Prop() readonly loading!: boolean;
  @Prop() readonly selectedRow!: SwapGroup | null;
  private tableData: SwapGroup[] = [];
  private columns: TableColumn<SwapGroup>[] = [];
  private get selectedRows() {
    return this.selectedRow ? [this.selectedRow] : [];
  }
  @Watch("params")
  onParamsChange(val: SearchSwapGroupParams) {
    this.loadSwapGroup(val).then(() => {
      this.changeSelected(this.tableData[0]);
    });
  }
  refreshCurData() {
    const lastSelectedRow = this.selectedRow;
    this.loadSwapGroup(this.params).then(() => {
      const curRow = this.tableData.find(
        item => item.id === lastSelectedRow?.id
      );
      this.changeSelected(curRow);
    });
  }
  private loadSwapGroup(val: SearchSwapGroupParams) {
    this.$emit("loadingChange", true);
    return searchSwapGroup(val)
      .then(res => {
        const rows = res.rows || [];
        this.tableData = rows;
        return rows;
      })
      .finally(() => {
        this.$emit("loadingChange", false);
      });
  }
  private changeSelected(row?: SwapGroup) {
    if (row && this.tableData.includes(row)) {
      this.$emit("selectedChange", row);
    } else {
      this.$emit("selectedChange");
    }
  }
  private addSwapGroup() {
    getDefultSwapGroupName()
      .then(res => {
        return this.showNameDialog(
          { name: res.number.toString() },
          "新增互换组"
        );
      })
      .then(res => {
        return createSwapGroup(res)
          .then(() => {
            return this.loadSwapGroup({});
          })
          .then((rows: SwapGroup[]) => {
            this.$message.success({
              message: "新增成功!",
              showClose: true
            });
            const curRow = rows.find(item => item.name === res.name);
            this.changeSelected(curRow);
          });
      })
      .catch(() => {
        //
      });
  }
  private updateSwapGroup(row: SwapGroup) {
    this.showNameDialog({ name: row.name }, "修改互换组名")
      .then(res => {
        return updateSwapGroup({
          name: res.name,
          id: row.id
        }).then(() => {
          return res;
        });
      })
      .then(res => {
        this.$message.success({
          message: "更新成功!",
          showClose: true
        });
        row.name = res.name;
        this.changeSelected(row);
      })
      .catch(() => {
        //
      });
  }
  private deleteSwapGroup(row: SwapGroup) {
    this.$confirm(
      `删除该互换组后系统内部配件查询部分将不能查询到该互换组内包含的互换信息。是否确认删除「互换组：${row.name}」?`,
      "删除互换组"
    )
      .then(() => {
        return removeSwapGroup({ id: row.id });
      })
      .then(() => {
        this.$message.success({
          message: "删除成功!",
          showClose: true
        });
        this.tableData = this.tableData.filter(item => item.id != row.id);
        if (this.selectedRow?.id === row.id) {
          this.changeSelected(this.tableData[0]);
        }
      })
      .catch(() => {
        //
      });
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
  private formateCloumns() {
    this.columns = SWAP_GROUP_LIST.columns.map(item => {
      const deleteSwapGroup = (row: SwapGroup, e: MouseEvent) => {
        e && e.stopPropagation();
        this.deleteSwapGroup(row);
      };

      const updateSwapGroup = (row: SwapGroup, e: MouseEvent) => {
        e && e.stopPropagation();
        this.updateSwapGroup(row);
      };
      if (item.type === "controls") {
        const column: TableColumn<SwapGroup> = {
          ...item,
          render: (value, row) => {
            return (
              <div class="table-button">
                {this.hasAutoPerm("update") ? (
                  <el-tooltip
                    enterable={false}
                    effect="dark"
                    content="编辑"
                    placement="top"
                  >
                    <span
                      class="operation-icon icon-edit-info"
                      on-click={(e: MouseEvent) => updateSwapGroup(row, e)}
                    />
                  </el-tooltip>
                ) : null}
                {this.hasAutoPerm("delete") ? (
                  <el-tooltip
                    enterable={false}
                    effect="dark"
                    content="删除"
                    placement="top"
                  >
                    <span
                      class="operation-icon icon-delete-info"
                      on-click={(e: MouseEvent) => deleteSwapGroup(row, e)}
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
  mounted() {
    this.formateCloumns();
  }
  render() {
    return (
      <div class="flex-container column-flex">
        <div class="btn-group">
          <el-button
            type="primary"
            disabled={!this.hasAutoPerm("create")}
            size="mini"
            on-click={this.addSwapGroup}
          >
            新增互换组(F2)
          </el-button>
        </div>
        <ht-setting-table
          class="auto-block"
          v-loading={this.loading}
          data={this.tableData}
          columns={this.columns}
          table-name={SWAP_GROUP_LIST.name}
          on-rowOperation={this.updateSwapGroup}
          on-rowDelete={this.deleteSwapGroup}
          selected-rows={this.selectedRows}
          on-cur-select-change={this.changeSelected}
        />
      </div>
    );
  }
}
</script>
