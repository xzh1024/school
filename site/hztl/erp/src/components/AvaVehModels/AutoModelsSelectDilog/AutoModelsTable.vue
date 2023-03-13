<script lang="tsx">
import { Component, Model, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  AutoAvaVehModelRes,
  searchAutoAvaVehModels
} from "@/api/parts/partsModels";
import { TableColumn } from "@/constants/interface";
import { AUTO_MODELS_TABLE } from "./constants";
import { SearchAutoModelsFormData } from "./AutoModelsSearch.vue";

export interface AutoModelsSearchParams extends SearchAutoModelsFormData {
  signCheckedByPartId: number;
}

interface Props {
  value?: AutoAvaVehModelRes[];
  params?: AutoModelsSearchParams;
}

@Component
export default class AutoModelsTable extends tsc.Component<Props, Event> {
  @Prop() readonly params!: AutoModelsSearchParams;
  @Model("change") readonly value!: AutoAvaVehModelRes[];
  private get canSelectedRows() {
    return this.tableData.filter(item => !item.checked);
  }
  private get isAllSelected(): boolean {
    return !!(
      this.value.length && this.canSelectedRows.length === this.value.length
    );
  }
  changeAllSelected(value: boolean) {
    if (value) {
      this.changeValue(this.canSelectedRows);
    } else {
      this.changeValue([]);
    }
  }
  private loading = false;
  private tableData: AutoAvaVehModelRes[] = [];
  private columns: TableColumn<AutoAvaVehModelRes>[] = [];
  private page = 1;
  get pageSize() {
    return this.$store.state?.admin?.table?.pageSize;
  }
  private totalSize = 0;
  @Watch("pageSize")
  onPageSizeChange() {
    this.goFirstPage();
  }

  @Watch("params")
  onParamsChange() {
    this.goFirstPage();
  }

  public goFirstPage() {
    this.loadData(1);
  }

  private loadData(page: number) {
    this.page = page;
    this.loading = true;
    searchAutoAvaVehModels({
      ...this.params,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(res => {
        this.tableData = res.rows || [];
        this.totalSize = res.totalSize;
        this.changeValue([]);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private handleCheckboxChange(row: AutoAvaVehModelRes, ischecked: boolean) {
    let selected = [...this.value];
    if (ischecked) {
      if (!selected.includes(row)) selected.push(row);
    } else {
      selected = selected.filter(item => item !== row);
    }
    this.changeValue(selected);
  }

  private changeValue(value: AutoAvaVehModelRes[]) {
    this.$emit("change", value);
  }

  private formateCloumns() {
    this.columns = AUTO_MODELS_TABLE.columns.map(item => {
      const handleCheckboxChange = (
        row: AutoAvaVehModelRes,
        ischecked: boolean
      ) => {
        this.handleCheckboxChange(row, ischecked);
      };
      if (item.type === "customMultiple") {
        const column: TableColumn<AutoAvaVehModelRes> = {
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
        onPageChange={this.loadData}
        data={this.tableData}
        columns={this.columns}
        table-name={AUTO_MODELS_TABLE.name}
      />
    );
  }
}
</script>
