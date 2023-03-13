<template>
  <div class="full-container">
    <ht-table
      v-bind="$attrs"
      :key-scope="keyScope"
      :selected-rows.sync="relSelectedRows"
      :columns="tableFormatColumns"
      :pagination="relIsShowPagination"
      selection-type="multiple"
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
      @show-pagination-change="value => (relIsShowPagination = value)"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
  </div>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import { TABLE_RETURN_NO_HISTORY_LIST } from "@/views/purchase/constants";
import { EditColumns } from "@/components/table";
import { TAG_TOOLTIP } from "@/constants";
import hotkeys from "hotkeys-js";

export default {
  name: "NoHistoryList",
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
    },
    isShowPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editColumnsVisible: false,
      tableName: TABLE_RETURN_NO_HISTORY_LIST.name,
      baseTableColumns: TABLE_RETURN_NO_HISTORY_LIST.columns,
      tablecolumns: [],
      avaVehModelsVisible: false,
      avaVehModelsPart: null
    };
  },
  computed: {
    relIsShowPagination: {
      get() {
        return this.isShowPagination;
      },
      set(value) {
        this.$emit("update:isShowPagination", value);
      }
    },
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
      function addNHHandle(row, e) {
        e.stopPropagation();
        self.addNHHandle(row);
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
                  <el-tooltip placement="top" content="添加" enterable={false}>
                    <span
                      class="icon operation-icon icon-add-info"
                      on-click={e => addNHHandle(row, e)}
                    ></span>
                  </el-tooltip>
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
    addNHHandle(row) {
      hotkeys.setScope(this.keyScope);
      this.relSelectedRows = [row];
      this.$emit("on-add-nh-parts", row);
    },
    handlePartDetailChange(row) {
      hotkeys.setScope(this.keyScope);
      this.relSelectedRows = [row];
      this.$emit("handlePartDetailChange", row);
    }
  }
};
</script>
