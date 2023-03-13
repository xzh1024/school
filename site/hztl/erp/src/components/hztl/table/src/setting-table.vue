<script>
import Table from "./table";
import EditColumns from "./edit-columns";
import ExportTable from "./export-table";
import { getSettingsTables } from "@/api/setting";
export default {
  name: "HtSettingTable",
  componentName: "HtSettingTable",
  components: {
    HtTable: Table
  },
  props: {
    tableName: String,
    fileName: String,
    exportTableVisible: Boolean,
    isEndExport: Boolean,
    endExportFunc: Function,
    isNoSaveExportColumns: Boolean,
    keyScope: {
      type: [String, Symbol],
      default() {
        return Symbol("settingTable");
      }
    },
    enableTableSetting: {
      type: Boolean,
      default: true
    },
    pagination: Boolean,
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editColumnsVisible: false,
      showPagination: false,
      tableColumns: []
    };
  },
  computed: {
    exportVisible: {
      get() {
        return this.exportTableVisible;
      },
      set(value) {
        this.$emit("update:exportTableVisible", value);
      }
    }
  },
  watch: {
    tableName() {
      this.getSettingsTables();
    }
  },
  methods: {
    async getSettingsTables() {
      const res = await getSettingsTables({
        name: this.tableName
      });
      if (res?.columnsSettings && res?.columnsSettings?.length) {
        const newColumnSort = [];
        const serverColumns = res.columnsSettings.filter(item => !item.isHide);
        serverColumns.forEach(srcItem => {
          this.columns.forEach(column => {
            if (column.prop === srcItem.prop) {
              newColumnSort.push(column);
            }
          });
        });
        this.tableColumnsChange(newColumnSort);
      }
    },
    handleTableSetting(e) {
      if (e) {
        e.stopPropagation();
      }
      if (this.enableTableSetting) {
        this.editColumnsVisible = true;
      } else {
        this.$emit("table-setting");
      }
    },
    tableColumnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
        this.setDefaultSort();
      });
    },
    setDefaultSort() {
      const tableVm = this.$refs.table;
      if (!tableVm) return;
      tableVm.setDefaultSort();
    },
    paginationChange(value) {
      this.showPagination = value;
    }
  },
  render() {
    const attrs = {
      ...this.$attrs,
      columns: this.tableColumns,
      tableName: this.tableName,
      keyScope: this.keyScope,
      "show-table-setting": this.enableTableSetting,
      "setting-all-column": this.enableTableSetting,
      pagination: this.pagination && this.showPagination
    };

    const listeners = {
      ...this.$listeners,
      "table-setting": this.handleTableSetting
    };

    const editListeners = {
      "update:visible": value => (this.editColumnsVisible = value),
      "columns-change": this.tableColumnsChange
    };

    const exportListeners = {
      "update:visible": value => (this.exportVisible = value),
      "columns-change": this.tableColumnsChange
    };

    if (this.pagination) {
      editListeners["show-pagination-change"] = this.paginationChange;
    }

    return (
      <div class="full-height full-width">
        <HtTable
          ref="table"
          on={listeners}
          attrs={attrs}
          scopedSlots={this.$scopedSlots}
        />
        <EditColumns
          tableName={this.tableName}
          baseColumns={this.columns}
          visible={this.editColumnsVisible}
          on={editListeners}
        />
        <ExportTable
          tableName={this.tableName}
          baseColumns={this.columns}
          default-data={this.$attrs.data}
          is-end-export={!!this.endExportFunc}
          end-export-func={this.endExportFunc}
          isNoSaveExportColumns={!!this.isNoSaveExportColumns}
          file-name={this.fileName}
          visible={this.exportVisible}
          on={exportListeners}
        />
      </div>
    );
  }
};
</script>
