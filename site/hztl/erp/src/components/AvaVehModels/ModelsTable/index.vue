<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  AvaVehModelMingjueRes,
  AvaVehModelBeiMaiRes,
  getIsSettedAvaveh,
  removeAvaVehModels,
  searchAvaVehModels
} from "@/api/parts/partsModels";
import { TableColumn } from "@/constants/interface";
import { MODELS_BEIMAI_TABLE, MODELS_MINGJUE_TABLE } from "./constants";
import { SearchFormMingJueData } from "../ModelsSearch/MingJue";
import { SearchFormBeiMaiData } from "../ModelsSearch/BeiMai";

export interface SearchMingJueParams extends SearchFormMingJueData {
  partId: number;
}
export interface SearchBeiMaiParams extends SearchFormBeiMaiData {
  partId: number;
}

interface Props {
  isEdit: boolean;
  isMingJue: boolean;
  isBeiMai: boolean;
  params: SearchMingJueParams | SearchBeiMaiParams;
}

@Component
export default class EditModelsParts extends tsc.Component<Props, Event> {
  @Prop() readonly params!: SearchMingJueParams | SearchBeiMaiParams;
  @Prop() readonly isEdit!: boolean;
  @Prop() readonly isMingJue!: boolean;
  @Prop() readonly isBeiMai!: boolean;

  private loading = false;
  private tableData: (AvaVehModelMingjueRes | AvaVehModelBeiMaiRes)[] = [];
  private selectedRows: (AvaVehModelMingjueRes | AvaVehModelBeiMaiRes)[] = [];
  private columns: (
    | TableColumn<AvaVehModelMingjueRes>
    | TableColumn<AvaVehModelBeiMaiRes>
  )[] = [];
  private page = 1;
  private isSetted = true;
  private get pageSize() {
    return this.$store.state?.admin?.table?.pageSize;
  }
  private get tableName() {
    let tableName = "";
    if (this.isMingJue) {
      tableName = MODELS_MINGJUE_TABLE.name;
    } else if (this.isBeiMai) {
      tableName = MODELS_BEIMAI_TABLE.name;
    }
    return `${tableName}${this.isEdit ? "Edit" : ""}`;
  }
  private totalSize = 0;
  @Watch("pageSize")
  onPageSizeChange() {
    this.goFirstPage();
  }

  @Watch("params")
  onParamsChange(
    newVal: SearchMingJueParams | SearchBeiMaiParams,
    oldVal: SearchMingJueParams | SearchBeiMaiParams
  ) {
    this.goFirstPage();
    if (!this.isEdit && newVal?.partId !== oldVal?.partId) {
      getIsSettedAvaveh({ partId: newVal.partId }).then(res => {
        this.isSetted = res;
      });
    }
  }

  public goFirstPage() {
    this.loadData(1);
  }

  private loadData(page: number) {
    this.page = page;
    this.loading = true;
    searchAvaVehModels({
      ...this.params,
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
  private removeParts(
    parts: (AvaVehModelMingjueRes | AvaVehModelBeiMaiRes)[] = [],
    query?: SearchMingJueParams | SearchBeiMaiParams
  ) {
    this.$confirm(`确定将所选数据移出该配件标准适用车型？`, "提示")
      .then(() => {
        return removeAvaVehModels({
          partId: this.params.partId,
          query,
          partAvaVehModelIds: parts.length
            ? parts.map(item => item.id)
            : undefined
        });
      })
      .then(() => {
        this.$message.success({
          message: "删除成功!",
          showClose: true
        });
        this.loadData(1);
      })
      .catch(() => {});
  }
  private deleteBatch(e: MouseEvent) {
    e?.stopPropagation();
    this.removeParts(this.selectedRows);
  }
  private deleteAll(e: MouseEvent) {
    e?.stopPropagation();
    this.removeParts([], this.params);
  }
  private formateCloumns() {
    let columns: (
      | TableColumn<AvaVehModelMingjueRes>
      | TableColumn<AvaVehModelBeiMaiRes>
    )[] = [];
    if (this.isMingJue) {
      columns = MODELS_MINGJUE_TABLE.columns;
    } else if (this.isBeiMai) {
      columns = MODELS_BEIMAI_TABLE.columns;
    }
    this.columns = columns
      .filter(item => item.prop !== "multiple" || this.isEdit)
      .map(item => ({ ...item }));
  }

  mounted() {
    this.formateCloumns();
  }

  render() {
    return (
      <div class="full-box">
        {this.isSetted ? (
          <div class="table-container">
            <ht-setting-table
              class="edit-swap-group-parts"
              v-loading={this.loading}
              pagination
              total={this.totalSize}
              current-page={this.page}
              onPageChange={this.loadData}
              data={this.tableData}
              columns={this.columns}
              table-name={this.tableName}
              selectedRows={this.selectedRows}
              on={{
                "update:selectedRows": (
                  val: (AvaVehModelMingjueRes | AvaVehModelBeiMaiRes)[]
                ) => (this.selectedRows = val)
              }}
              selectionType={this.isEdit ? "multiple" : "single"}
            />
            {this.isEdit && (
              <div class="btn-container">
                <el-button
                  type="primary"
                  size="mini"
                  disabled={!this.selectedRows.length}
                  onClick={this.deleteBatch}
                >
                  勾选批量删除
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  disabled={!this.tableData.length}
                  onClick={this.deleteAll}
                >
                  全部查询结果删除
                </el-button>
              </div>
            )}
          </div>
        ) : (
          <div class="tips">无标准适用车型数据，请到基础- 配件资料进行维护</div>
        )}
      </div>
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
.full-box {
  position: relative;
  height: 100%;
  width: 100%;

  .table-container {
    height: 100%;

    .btn-container {
      margin: -31px 0 0 5px;
      width: 250px;
    }
  }

  .tips {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 20px;
    top: 30%;
    position: absolute;
  }
}
</style>
