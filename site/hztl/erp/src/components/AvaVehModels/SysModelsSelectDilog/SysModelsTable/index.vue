<script lang="tsx">
import { Component, Model, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  SysAvaVehModelMingJueRes,
  SysAvaVehModelBeiMaiRes,
  searchSysAvaVehModels,
  DataSource
} from "@/api/parts/partsModels";
import { TableColumn } from "@/constants/interface";
import { SYS_MODELS_BEIMAI_TABLE, SYS_MODELS_MINGJUE_TABLE } from "./constants";
import { SearchSysFormMingJueData } from "../SysModelsSearch/MingJue";
import { SearchSysFormBeiMaiData } from "../SysModelsSearch/BeiMai";

export interface SysSearchMingJueParams extends SearchSysFormMingJueData {
  signCheckedByPartId: number;
}

export interface SysSearchBeiMaiParams extends SearchSysFormBeiMaiData {
  signCheckedByPartId: number;
}

export interface SysSearchCodeParams {
  signCheckedByPartId: number;
  customCode: string;
}

interface Props {
  value?: (SysAvaVehModelMingJueRes | SysAvaVehModelBeiMaiRes)[];
  params?: SysSearchMingJueParams | SysSearchBeiMaiParams | SysSearchCodeParams;
  dataSource: DataSource;
  isMingJue: boolean;
  isBeiMai: boolean;
}

interface Event {
  onChange(
    params: (SysAvaVehModelMingJueRes & SysAvaVehModelBeiMaiRes)[]
  ): void;
  // onTableDataChange(
  //   params: (SysAvaVehModelMingJueRes & SysAvaVehModelBeiMaiRes)[]
  // ): void;
}

@Component
export default class SysModelsTable extends tsc.Component<Props, Event> {
  @Prop() readonly dataSource!: DataSource;
  @Prop() readonly isMingJue!: boolean;
  @Prop() readonly isBeiMai!: boolean;
  @Prop() readonly params!:
    | SysSearchMingJueParams
    | SysSearchBeiMaiParams
    | SysSearchCodeParams;
  @Model("change") readonly value!: (SysAvaVehModelMingJueRes &
    SysAvaVehModelBeiMaiRes)[];
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
  private tableData: (
    | SysAvaVehModelMingJueRes
    | SysAvaVehModelBeiMaiRes
  )[] = [];
  private columns: (
    | TableColumn<SysAvaVehModelMingJueRes>
    | TableColumn<SysAvaVehModelBeiMaiRes>
  )[] = [];
  private get tableName() {
    let tableName = "";
    if (this.isMingJue) {
      tableName = SYS_MODELS_MINGJUE_TABLE.name;
    } else if (this.isBeiMai) {
      tableName = SYS_MODELS_BEIMAI_TABLE.name;
    }
    return tableName;
  }
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
    if (!this.params) {
      return;
    }
    this.goFirstPage();
  }

  public goFirstPage() {
    this.loadData(1);
  }

  public loadData(page = this.page) {
    this.page = page;
    this.loading = true;
    if (this)
      searchSysAvaVehModels({
        ...this.params,
        dataSource: this.dataSource,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(res => {
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize;
          // this.$emit("tableDataChange", this.tableData);
          this.changeValue([]);
        })
        .finally(() => {
          this.loading = false;
        });
  }

  private handleCheckboxChange(
    row: SysAvaVehModelMingJueRes & SysAvaVehModelBeiMaiRes,
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

  private changeValue(
    value: (SysAvaVehModelMingJueRes | SysAvaVehModelBeiMaiRes)[]
  ) {
    this.$emit("change", value);
  }

  private formateCloumns() {
    let columns: (
      | TableColumn<SysAvaVehModelMingJueRes>
      | TableColumn<SysAvaVehModelBeiMaiRes>
    )[] = [];
    if (this.isMingJue) {
      columns = SYS_MODELS_MINGJUE_TABLE.columns;
    } else if (this.isBeiMai) {
      columns = SYS_MODELS_BEIMAI_TABLE.columns;
    }
    this.columns = columns.map(item => {
      const handleCheckboxChange = (
        row: SysAvaVehModelMingJueRes & SysAvaVehModelBeiMaiRes,
        ischecked: boolean
      ) => {
        this.handleCheckboxChange(row, ischecked);
      };
      if (item.type === "customMultiple") {
        const column = {
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
          render: (
            value: unknown,
            row: SysAvaVehModelMingJueRes & SysAvaVehModelBeiMaiRes
          ) => {
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
        table-name={this.tableName}
      />
    );
  }
}
</script>
