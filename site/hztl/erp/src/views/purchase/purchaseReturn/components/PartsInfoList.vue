<template>
  <div class="full-container">
    <ht-table
      v-bind="$attrs"
      :key-scope="keyScope"
      :selected-rows.sync="relSelectedRows"
      :columns="tableFormatColumns"
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
    />
  </div>
</template>

<script>
import { TABLE_RETURN_PARTS_INFO_LIST } from "@/views/purchase/constants";
import { EditColumns } from "@/components/table";
import hotkeys from "hotkeys-js";

export default {
  name: "PartsInfoList",
  components: {
    EditColumns
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
      editColumnsVisible: false,
      tableName: TABLE_RETURN_PARTS_INFO_LIST.name,
      baseTableColumns: TABLE_RETURN_PARTS_INFO_LIST.columns,
      tablecolumns: []
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
      function addHandle(row, e) {
        e.stopPropagation();
        self.addHandle(row);
      }
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
                      on-click={e => addHandle(row, e)}
                    ></span>
                  </el-tooltip>
                </div>
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
    addHandle(row) {
      hotkeys.setScope(this.keyScope);
      this.relSelectedRows = [row];
      this.$emit("on-add-parts", row);
    }
  }
};
</script>
