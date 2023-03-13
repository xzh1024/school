<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { LocalPart, loadLocalParts } from "@/api/parts/swapGroupParts";
import { TableColumn } from "@/constants/interface";
import { EDIT_LOCAL_PART_LIST } from "./constans";
import { EditSearchParams } from "./EditSearch.vue";

interface Props {
  params?: EditSearchParams;
}

interface Event {
  onPartAdd(part: LocalPart): void;
}

@Component
export default class EditLocalParts extends tsc.Component<Props, Event> {
  @Prop() readonly params!: EditSearchParams;

  private loading = false;
  private tableData: LocalPart[] = [];
  private columns: TableColumn<LocalPart>[] = [];
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

  private goFirstPage() {
    this.loadLocalParts(1);
  }

  private loadLocalParts(page: number) {
    this.page = page;
    this.loading = true;
    loadLocalParts({
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
  private addPart(part: LocalPart) {
    this.$emit("partAdd", part);
  }
  private formateCloumns() {
    this.columns = EDIT_LOCAL_PART_LIST.columns.map(item => {
      const addPart = (row: LocalPart, e: MouseEvent) => {
        e && e.stopPropagation();
        this.addPart(row);
      };
      if (item.type === "controls") {
        const column: TableColumn<LocalPart> = {
          ...item,
          render: (value, row) => {
            return (
              <div class="table-button">
                <el-tooltip
                  enterable={false}
                  effect="dark"
                  content="添加"
                  placement="top"
                >
                  <span
                    class="operation-icon icon-add-info"
                    on-click={(e: MouseEvent) => addPart(row, e)}
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
  mounted() {
    this.formateCloumns();
  }
  render() {
    return (
      <ht-setting-table
        class="auto-block swap-group-parts"
        v-loading={this.loading}
        pagination
        total={this.totalSize}
        current-page={this.page}
        onPageChange={this.loadLocalParts}
        data={this.tableData}
        columns={this.columns}
        table-name={EDIT_LOCAL_PART_LIST.name}
      />
    );
  }
}
</script>
