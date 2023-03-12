<template>
  <div style="height: 100%;">
    <ht-table
      v-bind="$attrs"
      v-on="$listeners"
      :columns="detailsFormatColumns"
      :data="scheduleData"
      :table-name="detailsName"
      :summary-method="
        params =>
          getSummariesByCalculate(params, SALES_ORDER_DETAIL_TOTAL_FILES)
      "
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
      :default-data="scheduleData"
      :file-name="`客户订单-${billNo}`"
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
import {
  TABLE_SALES_ORDER_DETAIL_TABLE,
  SALES_ORDER_DETAIL_TOTAL_FILES
} from "@/views/sales/constants";
import summaries from "@/mixins/summaries";

export default {
  name: "DetailTable",
  components: {
    EditColumns,
    ExportTable,
    AvaVehModels
  },
  mixins: [summaries],
  props: {
    scheduleData: Array,
    selectedRows: Array,
    keyScope: {
      type: [String, Symbol]
    },
    belongs: {
      type: Object
    },
    isBackStatus: Boolean,
    showHandle: Boolean,
    exportTableVisible: Boolean,
    billNo: [String, Number]
  },
  data() {
    return {
      detailsName: TABLE_SALES_ORDER_DETAIL_TABLE.name,
      editColumnsVisible: false,
      detailsColumns: [],
      SALES_ORDER_DETAIL_TOTAL_FILES,
      exportVisible: false,
      avaVehModelsVisible: false,
      avaVehModelsPart: null
    };
  },
  computed: {
    baseDetailsColumns() {
      return TABLE_SALES_ORDER_DETAIL_TABLE.columns;
    },
    detailsFormatColumns() {
      const editHandle = (row, e) => {
        e.stopPropagation();
        this.editHandle(row);
      };
      const deleteHandle = (row, e) => {
        e.stopPropagation();
        this.deleteHandle(row);
      };

      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };

      return this.detailsColumns
        .filter(item => this.showHandle || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={e => editHandle(row, e)}
                    />
                  </el-tooltip>
                  <el-tooltip placement="top" content="删除" enterable={false}>
                    <i
                      class="icon operation-icon icon-delete-info"
                      on-click={e => deleteHandle(row, e)}
                    />
                  </el-tooltip>
                </div>
              )
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
    deleteHandle(row) {
      this.$emit("deleteHandle", row);
    },
    handleKeyCode(e) {
      this.$emit("handleKeyCode", e);
    },
    editHandle(row) {
      this.$emit("editHandle", row);
    },
    handleRowEdit(row) {
      if (!this.showHandle) {
        this.$message.warning({
          message: "当前状态不能编辑明细",
          showClose: true
        });
        return;
      }
      this.editHandle(row);
    },
    handleRowDelete(row) {
      if (!this.showHandle) {
        this.$message.warning({
          message: "当前状态不能编辑明细",
          showClose: true
        });
        return;
      }
      this.deleteHandle(row);
    },
    handleSetDetailScope() {
      this.$emit("handleSetDetailScope");
    }
  }
};
</script>
