<template>
  <div
    style="position: relative; height: 100%;"
    class="flex-container column-flex auto-block"
  >
    <el-alert
      v-if="isBackStatus"
      :closable="false"
      title="有急件/调货配件未确认通过，需要重新处理"
      type="warning"
      show-icon
      style="position: absolute; top: 1px; left: 30%; width: 360px"
    />
    <div v-if="isBackStatus" class="mt-3" />
    <ht-table
      v-bind="$attrs"
      v-on="$listeners"
      :columns="detailsFormatColumns"
      :data="scheduleData"
      :table-name="detailsName"
      :summary-method="setTotals"
      :selected-rows="selectedRows"
      :key-scope="keyScope"
      show-summary
      setting-all-column
      show-table-setting
      @hotkeysUp="handleKeyCode"
      @rowOperation="handleRowEdit"
      @rowDelete="handleRowDelete"
      @table-setting="handleTableSetting"
      @click.native.stop="handleSetDetailScope"
      @selectChange="handleSelectChange"
    />
    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
    />
    <export-table
      :base-columns="baseDetailsColumns"
      :default-data="exportData"
      :file-name="`销售出库单-${billNo}`"
      :table-name="detailsName"
      :visible.sync="exportVisible"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
  </div>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import { EditColumns, ExportTable } from "@/components/table";
import { setTotals } from "@/mixins";
import { getExtraColumns } from "@/views/sales/util/extraColumns";
import { TABLE_SALES_OUT_DETAIL_TABLE } from "@/views/sales/constants";
import { formatterDetailBillMarks } from "@/utils/formatterDetailBillMarks";

export default {
  name: "DetailTable",
  components: {
    EditColumns,
    ExportTable,
    AvaVehModels
  },
  mixins: [setTotals],
  props: {
    scheduleData: Array,
    selectedRows: Array,
    keyScope: {
      type: [String, Symbol]
    },
    isBackStatus: Boolean,
    showHandle: Boolean,
    exportTableVisible: Boolean,
    header: Object,
    mode: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      exportData: [],
      detailsName: TABLE_SALES_OUT_DETAIL_TABLE.name,
      editColumnsVisible: false,
      detailsColumns: [],
      exportVisible: false,
      avaVehModelsVisible: false,
      avaVehModelsPart: null
    };
  },
  computed: {
    belongs() {
      return this.header && this.header.belongs;
    },
    billNo() {
      return this.header && this.header.billNo;
    },
    baseDetailsColumns() {
      const baseTableColumns = [...TABLE_SALES_OUT_DETAIL_TABLE.columns];
      baseTableColumns.splice(8, 0, ...getExtraColumns(this.mode));
      return baseTableColumns;
    },
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function editDetailHandle(row, e) {
        e.stopPropagation();
        self.editDetailHandle(row);
      }
      function deleteDetailHandle(row, e) {
        e.stopPropagation();
        self.deleteDetailHandle(row);
      }
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };

      return this.detailsColumns
        .filter(
          item =>
            (this.header.platformKey
              ? this.header.status === 94
              : this.showHandle) || item.type !== "controls"
        )
        .map(item => {
          if (item.type === "controls") {
            const { platformKey } = this.header;
            return {
              ...item,
              render: (value, row) => (
                <div>
                  {platformKey ? (
                    ["库存不足", "急件驳回"].includes(
                      formatterDetailBillMarks(row)
                    ) ? (
                      <el-tooltip
                        placement="top"
                        content="编辑"
                        enterable={false}
                      >
                        <i
                          class="icon operation-icon icon-edit-info"
                          on-click={e => editDetailHandle(row, e)}
                        ></i>
                      </el-tooltip>
                    ) : null
                  ) : (
                    <el-tooltip
                      placement="top"
                      content="编辑"
                      enterable={false}
                    >
                      <i
                        class="icon operation-icon icon-edit-info"
                        on-click={e => editDetailHandle(row, e)}
                      ></i>
                    </el-tooltip>
                  )}
                  {!platformKey ? (
                    <el-tooltip
                      placement="top"
                      content="删除"
                      enterable={false}
                    >
                      <i
                        class="icon operation-icon icon-delete-info"
                        on-click={e => deleteDetailHandle(row, e)}
                      ></i>
                    </el-tooltip>
                  ) : null}
                </div>
              )
            };
          } else if (item.prop === "sourceType") {
            return {
              ...item,
              formatter: () => this.header && this.header.sourceType
            };
          } else if (item.type === "avaVehModels") {
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
  watch: {
    scheduleData(value) {
      if (value.length) {
        this.exportData = value.map(item => {
          return {
            ...item,
            marks: formatterDetailBillMarks(item)
          };
        });
      }
    },
    exportTableVisible(val) {
      this.exportVisible = val;
    },
    exportVisible(val) {
      if (!val) {
        this.$emit("update:exportTableVisible", false);
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
    handleSelectChange(row) {
      this.$emit("handleSelectRow", row);
    },
    editDetailHandle(row) {
      this.$emit("handleEditDetail", row);
    },
    deleteDetailHandle(row, index) {
      if (this.header.platformKey) {
        return;
      }
      this.$emit("deleteDetail", row, index);
    },
    handleKeyCode(e) {
      this.$emit("handleKeyCode", e);
    },
    handleRowEdit(row) {
      if (!this.showHandle) {
        this.$message.warning({
          message: "当前状态不能编辑明细",
          showClose: true
        });
        return;
      }
      this.editDetailHandle(row);
    },
    handleRowDelete(row) {
      if (this.showHandle && [0, 2].includes(row.status)) {
        let index = 0;
        if (this.scheduleData.length) {
          index = this.scheduleData.findIndex(item => item.id == row.id);
        }
        this.deleteDetailHandle(row, index);
      }
    },
    handleSetDetailScope() {
      this.$emit("handleSetDetailScope");
    }
  }
};
</script>
<style lang="stylus">
.sales-out-active-type {
    color: #E6A23C;
}
</style>
