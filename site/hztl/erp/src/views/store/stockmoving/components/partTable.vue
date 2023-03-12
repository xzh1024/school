<template>
  <ht-card no-padding class="auto-card">
    <ht-table
      ref="tableDom"
      :columns="mainTableColumns"
      :data="mainTableData"
      :total="totalSize"
      :current-page="page"
      :key-scope="keyScope"
      :selection-type="selectionType"
      :pagination="isShowPagination"
      :selected-rows.sync="selectedPartRows"
      setting-all-column
      show-table-setting
      @hotkeysUp="handleKeyCode"
      @pageChange="_handleSizeChange"
      @rowOperation="handleDbclick"
      @table-setting="handleTableSetting"
      @click.native.stop="handleSetPartTableScope"
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
  </ht-card>
</template>
<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import { TABLE__MOVEING_PART_TABLE, TAG_TOOLTIP } from "@/constants";
import { EditColumns } from "@/components/table";

export default {
  name: "PartTable",
  components: {
    EditColumns,
    AvaVehModels
  },
  props: {
    mainTableData: Array,
    keyScope: [String, Symbol],
    page: [String, Number],
    totalSize: [String, Number],
    selectedRows: Array,
    isCanEdit: Boolean,
    selectionType: String
  },
  data() {
    return {
      isShowPagination: false,
      tableName: TABLE__MOVEING_PART_TABLE.name,
      editColumnsVisible: false,
      // eslint-disable-next-line @typescript-eslint/camelcase
      main_loading: false,
      tablecolumns: [],
      avaVehModelsVisible: false,
      avaVehModelsPart: null
    };
  },
  computed: {
    mainTableColumns() {
      const addOrder = (row, e) => {
        e.stopPropagation();
        this.selectedPartRows = [row];
        this.addOrder(row);
      };
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.selectedPartRows = [row];
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.selectedPartRows = [row];
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return this.tablecolumns
        .filter(item => this.isCanEdit || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) =>
                row.status == "2" ? (
                  <el-tooltip placement="top" content="添加" enterable={false}>
                    <i
                      class="icon operation-icon icon-add-info"
                      on-click={e => addOrder(row, e)}
                    ></i>
                  </el-tooltip>
                ) : null
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
          return item;
        });
    },
    baseTableColumns() {
      return TABLE__MOVEING_PART_TABLE.columns;
    },
    selectedPartRows: {
      get() {
        return this.selectedRows;
      },
      set(val) {
        this.$emit("update:selectedRows", val);
      }
    }
  },
  methods: {
    _handleSizeChange(page) {
      this.$emit("_handleSizeChange", page);
    },
    handleKeyCode(e) {
      this.$emit("handleKeyCode", e);
    },
    handleDbclick(row) {
      if (this.isCanEdit && row.status == "2") {
        this.addOrder(row);
      } else {
        this.$message({
          type: "warning",
          message: "当前状态不能新增",
          showClose: true
        });
        return;
      }
    },
    addOrder(row) {
      this.$emit("addOrder", "add", row);
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tablecolumns = [];
      this.$nextTick(() => {
        this.tablecolumns = columns;
      });
    },
    handleSetPartTableScope() {
      this.$emit("handleSetPartTableScope");
    }
  }
};
</script>
