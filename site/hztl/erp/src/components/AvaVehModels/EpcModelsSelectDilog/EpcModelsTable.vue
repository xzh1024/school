<script lang="tsx">
import { Component, Model, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { TableColumn } from "@/constants/interface";
import { SysAvaVehModelMingJueRes } from "@/api/parts/partsModels";
import { EPC_MODELS_TABLE } from "./constants";
import { SearchEpcModelsFormData } from "./EpcModelsSearch.vue";

export interface EpcModelsSearchParams extends SearchEpcModelsFormData {
  signCheckedByPartId: number;
}

interface Props {
  value?: SysAvaVehModelMingJueRes[];
  params?: EpcModelsSearchParams;
  dataList: SysAvaVehModelMingJueRes[];
}

@Component
export default class EpcModelsTable extends tsc.Component<Props, Event> {
  @Prop() readonly params!: EpcModelsSearchParams;
  @Prop() readonly dataList!: SysAvaVehModelMingJueRes[];
  @Model("change") readonly value!: SysAvaVehModelMingJueRes[];
  private get tableData() {
    return this.dataList.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page + 1
    );
  }
  private get totalSize() {
    return this.dataList.length;
  }
  private get canSelectedRows() {
    return this.tableData.filter(item => !item.checked);
  }
  private get isAllSelected(): boolean {
    return !!(
      this.value.length && this.canSelectedRows.length === this.value.length
    );
  }
  private changeAllSelected(value: boolean) {
    if (value) {
      this.changeValue(this.canSelectedRows);
    } else {
      this.changeValue([]);
    }
  }
  private loading = false;
  private columns: TableColumn<SysAvaVehModelMingJueRes>[] = [];
  private page = 1;
  get pageSize() {
    return this.$store.state?.admin?.table?.pageSize;
  }
  @Watch("pageSize")
  onPageSizeChange() {
    this.goFirstPage();
  }
  @Watch("params")
  onParamsChange() {
    this.goFirstPage();
  }

  @Watch("tableData")
  onTableDataChange() {
    this.changeValue([]);
  }

  public goFirstPage() {
    this.changePage(1);
  }

  private changePage(page: number) {
    this.page = page;
  }

  private handleCheckboxChange(
    row: SysAvaVehModelMingJueRes,
    ischecked: boolean
  ) {
    let selected = [...this.value];
    if (ischecked) {
      if (!selected.includes(row)) selected.push(row);
    } else {
      selected = selected.filter(item => item !== row);
    }
    this.changeValue(selected);
  }

  private changeValue(value: SysAvaVehModelMingJueRes[]) {
    this.$emit("change", value);
  }

  private formateCloumns() {
    this.columns = EPC_MODELS_TABLE.columns.map(item => {
      const handleCheckboxChange = (
        row: SysAvaVehModelMingJueRes,
        ischecked: boolean
      ) => {
        this.handleCheckboxChange(row, ischecked);
      };
      if (item.type === "customMultiple") {
        const column: TableColumn<SysAvaVehModelMingJueRes> = {
          ...item,
          renderHeader: () => (
            <el-checkbox
              disabled={!this.canSelectedRows.length}
              indeterminate={this.value.length > 0 && !this.isAllSelected}
              nativeOn-click={(e: MouseEvent) => e.stopPropagation()}
              value={this.isAllSelected}
              on-change={this.changeAllSelected}
            />
          ),
          render: (value, row) => {
            if (row.checked) {
              return "已添加";
            }
            return (
              <el-checkbox
                value={this.value.includes(row)}
                nativeOn-click={(e: MouseEvent) => e.stopPropagation()}
                on-change={(ischecked: boolean) =>
                  handleCheckboxChange(row, ischecked)
                }
              />
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
      <ht-setting-table
        v-loading={this.loading}
        pagination
        total={this.totalSize}
        current-page={this.page}
        onPageChange={this.changePage}
        data={this.tableData}
        columns={this.columns}
        table-name={EPC_MODELS_TABLE.name}
      />
    );
  }
}
</script>
