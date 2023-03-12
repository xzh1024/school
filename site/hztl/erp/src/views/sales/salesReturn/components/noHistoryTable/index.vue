<template>
  <Fragment>
    <ht-setting-table
      v-bind="$attrs"
      v-on="$listeners"
      :key-scope="keyScope"
      :data="tableData"
      :columns="tableColumns"
      :total="totalSize"
      :current-page="currentPage"
      :table-name="tableName"
      :selected-rows.sync="selectedRows"
      pagination
      @hotkeysUp="handleKeyCode"
      @pageChange="handlePageChange"
      @rowOperation="handlePartEdit"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import { TABLE_SALES_RETURN_PARTS_NO_HISTORY } from "@/views/sales/constants";
import { TAG_TOOLTIP } from "@/constants";

export default {
  name: "NoHistoryTable",
  components: {
    Fragment,
    AvaVehModels
  },
  props: {
    tableData: Array,
    selectedRow2: Array,
    keyScope: {
      type: [String, Symbol]
    },
    showHandle: Boolean,
    totalSize: [String, Number],
    currentPage: [String, Number]
  },
  data() {
    return {
      tableName: TABLE_SALES_RETURN_PARTS_NO_HISTORY.name,
      columns: TABLE_SALES_RETURN_PARTS_NO_HISTORY.columns,
      avaVehModelsVisible: false,
      avaVehModelsPart: null
    };
  },
  computed: {
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function handleReturnBill(row, e) {
        e.stopPropagation();
        self.selectedRows = [row];
        self.handleReturnBill(row, "add");
      }
      function handlePartDetailChange(row, e) {
        e.stopPropagation();
        self.selectedRows = [row];
        self.handlePartDetailChange(row);
      }
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return this.columns
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
                      on-click={e => handleReturnBill(row, e)}
                    ></i>
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
    },
    selectedRows: {
      get() {
        return this.selectedRow2;
      },
      set(value) {
        this.$emit("update:selectedRow2", value);
      }
    }
  },
  methods: {
    handlePageChange(page) {
      this.$emit("noHistoryPageChange", page);
    },
    handleKeyCode(code) {
      this.$emit("handleKeyCode", code);
    },
    handlePartEdit(row) {
      this.handleReturnBill(row, "add");
    },
    handleReturnBill(row, type) {
      this.$emit("addSalesOutOrder", row, type);
    },
    handlePartDetailChange(row) {
      this.$emit("handlePartDetailChange", row);
    }
  }
};
</script>
