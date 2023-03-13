<template>
  <ht-dialog
    v-bind="$attrs"
    append-to-body
    width="1200px"
    title="导入完成"
    v-on="$listeners"
  >
    <ht-card
      v-show="!isAllFileImport"
      :title="
        `导入结果：共导入 ${totalCount} 条，成功 ${sucCount} 条，失败 ${failCount} 条。`
      "
      no-background
      class="title-card"
    >
      <el-link
        v-show="sucCount && billData.billNo"
        slot="after-title"
        type="primary"
        class="bill-no-container"
        @click="gotoBill"
      >
        单据号：{{ billData.billNo }}
      </el-link>
    </ht-card>
    <div v-show="isAllFileImport">
      <ht-card
        v-show="!tableData.length"
        :title="`导入结果：共导入 ${totalCount} 条，文件导入成功。`"
        no-background
        class="title-card"
      />
      <ht-card
        v-show="tableData.length"
        :title="`导入结果：共导入 ${totalCount} 条，文件导入失败。`"
        no-background
        class="title-card"
      />
    </div>
    <div v-show="tableData.length" style="margin: 0 5px 5px 5px;">
      失败原因已为您标注，请导出文件修改后再试。
    </div>
    <ht-setting-table
      :data="tableData"
      :columns="columns"
      :tableName="tableName"
      height="400"
    />
    <div class="text-font-danger" style="margin: 5px;">
      *为系统性能考虑，最多展示失败信息前 100 条，更多明细请导出后查看。
    </div>
    <div class="dialog-footer-align">
      <el-button
        :disabled="!canExport"
        type="primary"
        size="mini"
        plain
        @click="exportHandle"
      >
        导出
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { CELL_WIDTH } from "@/constants";
import downloadExcel from "@/utils/downloadExcel";
import eventBus from "@/event";

const WIDTH = 160;

export default {
  name: "ImportResult",
  props: {
    title: {
      type: String
    },
    totalErrs: {
      type: Array,
      default() {
        return [];
      }
    },
    selections: {
      type: Object,
      default() {
        return {};
      }
    },
    totalCount: {
      type: Number,
      default: 0
    },
    isAllFileImport: {
      type: Boolean,
      default: false
    },
    billData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      tableData: this.totalErrs,
      tableName: "ImportResultList",
      columns: []
    };
  },
  computed: {
    canExport() {
      return !!this.tableData.length;
    },
    failCount() {
      return this.totalErrs && this.totalErrs.length
        ? this.totalErrs.length
        : 0;
    },
    sucCount() {
      return this.totalErrs && this.totalErrs.length
        ? this.totalCount - this.totalErrs.length
        : this.totalCount;
    }
  },
  watch: {
    selections(value) {
      if (value) {
        const columns = [
          {
            prop: "errors",
            label: "出错原因",
            width: 300,
            render: (value, row) => {
              return <span class="text-font-danger">{row.errors}</span>;
            }
          }
        ];
        for (const key in this.selections) {
          const column = {
            prop: `${this.selections[key]}`,
            label: `${key}`,
            width: WIDTH
          };
          columns.push(column);
        }
        columns.unshift({
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        });
        this.columns = columns;
      }
    },
    totalErrs(value) {
      this.tableData = value.length > 100 ? value.slice(0, 100) : [...value];
    }
  },
  methods: {
    exportHandle() {
      downloadExcel(
        this.totalErrs,
        this.columns,
        `${this.title} - 异常文件.xlsx`
      );
    },
    gotoBill() {
      this.$router.push({
        path: this.billData.path,
        query: { billId: Number(this.billData.billId) }
      });
      eventBus.$emit("on-goto-bill", Number(this.billData.billId));
      this.closeHandle();
    },
    closeHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-container
    margin-bottom: 10px
    border: 1px solid #EDF2F5
    .el-header
        height: 30px !important
        line-height: 30px
        font-size: 14px
.title-card
    /deep/ .el-card__body
        padding: 10px 0 0 0
.bill-no-container
    margin-left: 10px
    vertical-align: top
</style>
