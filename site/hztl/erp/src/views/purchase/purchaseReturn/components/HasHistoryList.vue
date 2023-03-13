<template>
  <div class="full-container">
    <ht-table
      v-bind="$attrs"
      :key-scope="keyScope"
      :selected-rows.sync="relSelectedRows"
      :columns="tableFormatColumns"
      :pagination="isShowPagination"
      setting-all-column
      show-table-setting
      v-on="$listeners"
      @table-setting="handleTableSetting"
    />

    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
  </div>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import { TABLE_RETURN_HAS_HISTORY_LIST } from "@/views/purchase/constants";
import { EditColumns } from "@/components/table";
import { TAG_TOOLTIP } from "@/constants";
import hotkeys from "hotkeys-js";

export default {
  name: "HasHistoryList",
  components: {
    EditColumns,
    AvaVehModels
  },
  props: {
    canEdit: Boolean,
    keyScope: {
      type: [String, Symbol],
      default: Symbol()
    },
    selectedRows: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isShowPagination: true,
      editColumnsVisible: false,
      tableName: TABLE_RETURN_HAS_HISTORY_LIST.name,
      baseTableColumns: TABLE_RETURN_HAS_HISTORY_LIST.columns,
      tablecolumns: [],
      avaVehModelsVisible: false,
      avaVehModelsPart: null
    };
  },
  computed: {
    relSelectedRows: {
      get() {
        return this.selectedRows;
      },
      set(value) {
        this.$emit("update:selectedRows", value);
      }
    },
    tableFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function addAllStock(row, e) {
        e.stopPropagation();
        self.addAllStock(row);
      }
      function addAllBill(row, e) {
        e.stopPropagation();
        self.addAllBill(row);
      }
      function handlePartDetailChange(row, e) {
        e.stopPropagation();
        self.handlePartDetailChange(row);
      }
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return this.tablecolumns
        .filter(item => this.canEdit || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={e => addAllStock(row, e)}
                  >
                    全仓退
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={e => addAllBill(row, e)}
                  >
                    整单退
                  </el-button>
                </div>
              )
            };
          }
          if (item.prop === "labels") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  {value && value.length
                    ? value.map(label => (
                        <span style="margin-right: 10px">
                          <el-tooltip placement="top" enterable={false}>
                            <span slot="content">{TAG_TOOLTIP[label]}</span>
                            {label === "图" ? (
                              <el-button
                                type="primary"
                                circle
                                size="mini"
                                on-click={e => handlePartDetailChange(row, e)}
                              >
                                {label}
                              </el-button>
                            ) : (
                              <span class="label-style">{label}</span>
                            )}
                          </el-tooltip>
                        </span>
                      ))
                    : null}
                </div>
              )
            };
          }
          if (item.type === "avaVehModels") {
            return {
              ...item,
              render: (value, row) => (
                <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
                  查看
                </a>
              )
            };
          }
          return item;
        });
    }
  },
  methods: {
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tablecolumns = [];
      this.$nextTick(() => {
        this.tablecolumns = columns;
      });
    },
    addAllStock(row) {
      hotkeys.setScope(this.keyScope);
      this.relSelectedRows = [row];
      this.$emit("on-add-all-stock", row);
    },
    addAllBill(row) {
      hotkeys.setScope(this.keyScope);
      this.relSelectedRows = [row];
      this.$emit("on-add-all-bill", row);
    },
    handlePartDetailChange(row) {
      hotkeys.setScope(this.keyScope);
      this.relSelectedRows = [row];
      this.$emit("handlePartDetailChange", row);
    }
  }
};
</script>
<style lang="scss" scoped>
.full-container {
  width: 100%;
  height: 100%;
}
</style>
