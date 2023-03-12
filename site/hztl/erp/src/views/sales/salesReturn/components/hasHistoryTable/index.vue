<template>
  <div style="height: 100%">
    <ht-table
      v-bind="$attrs"
      v-on="$listeners"
      :columns="detailsFormatColumns"
      :data="tableData"
      :total="totalSize"
      :pagination="isShowedPagination"
      :current-page="currentPage"
      :key-scope="keyScope"
      :selected-rows.sync="selectedRows"
      setting-all-column
      show-table-setting
      @hotkeysUp="handleKeyCode"
      @pageChange="handlePageChange"
      @rowOperation="handlePartEdit"
      @table-setting="handleTableSetting"
    />
    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
      @show-pagination-change="handleIsShowedPagination"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
  </div>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import { EditColumns } from "@/components/table";
import { TABLE_SALES_RETURN_PARTS_HAS_HISTORY } from "@/views/sales/constants";
import { TAG_TOOLTIP } from "@/constants";

export default {
  name: "HasHistoryTable",
  components: {
    EditColumns,
    AvaVehModels
  },
  props: {
    tableData: Array,
    mainSelectedRow: Array,
    keyScope: {
      type: [String, Symbol]
    },
    showHandle: Boolean,
    totalSize: [String, Number],
    currentPage: [String, Number]
  },
  data() {
    return {
      detailsName: TABLE_SALES_RETURN_PARTS_HAS_HISTORY.name,
      editColumnsVisible: false,
      detailsColumns: [],
      isShowedPagination: true,
      avaVehModelsVisible: false,
      avaVehModelsPart: null
    };
  },
  computed: {
    baseDetailsColumns() {
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return TABLE_SALES_RETURN_PARTS_HAS_HISTORY.columns.map(item => {
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
    },
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function addSalesOutOrder(row, e) {
        e.stopPropagation();
        self.selectedRows = [row];
        self.addSalesOutOrder(row);
      }
      function handleReturnBill(row, e) {
        e.stopPropagation();
        self.selectedRows = [row];
        self.handleReturnBill(row);
      }
      function handlePartDetailChange(row, e) {
        e.stopPropagation();
        self.selectedRows = [row];
        self.handlePartDetailChange(row);
      }
      return this.detailsColumns
        .filter(item => this.showHandle || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  <el-tooltip placement="top" content="添加" enterable={false}>
                    <i
                      class="icon operation-icon icon-add-info"
                      on-click={e => addSalesOutOrder(row, e)}
                    ></i>
                  </el-tooltip>
                  <el-button
                    type="primary"
                    class="icon"
                    size="mini"
                    on-click={e => handleReturnBill(row, e)}
                  >
                    {"整单退"}
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
          return item;
        });
    },
    selectedRows: {
      get() {
        return this.mainSelectedRow;
      },
      set(value) {
        this.$emit("update:mainSelectedRow", value);
      }
    }
  },
  methods: {
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    detailsColumnsChange(columns) {
      this.detailsColumns = [];
      this.$nextTick(() => {
        this.detailsColumns = columns;
      });
    },
    handleIsShowedPagination(value) {
      this.isShowedPagination = value;
    },
    handlePageChange(page) {
      this.$emit("hasHistoryPageChange", page);
    },
    handleKeyCode(code) {
      this.$emit("handleKeyCode", code);
    },
    handlePartEdit(row) {
      this.addSalesOutOrder(row);
    },
    addSalesOutOrder(row) {
      this.$emit("addSalesOutOrder", row, "add");
    },
    handleReturnBill(row) {
      this.$emit("handleReturnBill", row);
    },
    handlePartDetailChange(row) {
      this.$emit("handlePartDetailChange", row);
    }
  }
};
</script>
