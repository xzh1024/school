<template>
  <ht-dialog
    v-bind="$attrs"
    class="dialog-body"
    width="700px"
    title="未完成单据提示"
    append-to-body
    v-on="$listeners"
  >
    <ht-card title="该员工还有未完成单据，确定要继续吗？" no-padding>
      <ht-table
        :data="tableData"
        :columns="tableColumns"
        :key-scope="keyScope"
        height="400px"
      />
    </ht-card>
    <div class="dialog-footer-align" style="margin: 10px 0 5px 0;">
      <el-button type="primary" size="mini" plain @click="sureHandle">
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { CELL_WIDTH } from "@/constants";
import { dateFormat } from "@/utils/date";
import hotkeys from "hotkeys-js";
let oldKeyScope;

export default {
  name: "UnfinishedBillsBox",
  props: {
    unfinishedBillsRows: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      keyScope: Symbol("UnfinishedBillsBox"),
      tableData: [],
      tableColumns: [
        { prop: "billTypeText", label: "单据类型", width: CELL_WIDTH.type },
        { prop: "billNo", label: "单据号", width: CELL_WIDTH.no },
        { prop: "statusText", label: "单据状态", width: CELL_WIDTH.status },
        {
          prop: "billDate",
          label: "业务日期",
          width: CELL_WIDTH.type,
          formatter: value => dateFormat(value)
        }
      ]
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            hotkeys.setScope(this.keyScope);
          }, 100);
          this.initData();
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
        default:
          return;
      }
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    initData() {
      this.tableData = [...this.unfinishedBillsRows];
    },
    dateFormat(val) {
      return val ? dateFormat(val) : "";
    },
    sureHandle() {
      this.$emit("on-sure");
      this.cancelHandle();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.dialog-body {
    /deep/ .el-dialog__body {
        padding: 5px;
        background-color: #E7EBED;
    }
}
</style>
