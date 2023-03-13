<template>
  <div style="height:100%;">
    <ht-card class="auto-card" title="项目列表">
      <ht-setting-table
        :data="tableData"
        @selectChange="selectChange"
        :enable-table-setting="true"
        :columns="tableColumns"
        pagination
        :total="totalSize"
        :selected-rows.sync="selectedRows"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        table-name="kpi"
      />
    </ht-card>
    <export-table
      :base-columns="itemColumns"
      :default-data="tableData"
      table-name="repair-export-maintenance"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="维修服务项目"
      is-end-export
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { listItems, exportItems } from "@/api/repairs";
import { ExportTable } from "@/components/table";
import { mapState } from "vuex";

export default {
  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 30,
      cantExport: true,
      render: (value, row) => (
        <div>
          {this.hasAutoPerm("update") ? (
            <el-tooltip enterable={false} placement="top" content="编辑">
              <span
                on-click={e => this.handleEdit(row, e)}
                class="icon operation-icon icon-edit-info"
              />
            </el-tooltip>
          ) : null}
          {this.hasAutoPerm("delete") ? (
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.handleDelete(row, e)}
                class="icon operation-icon icon-delete-info"
              />
            </el-tooltip>
          ) : null}
        </div>
      )
    };
    const itemColumns = [
      {
        prop: "code",
        label: "项目编码",
        width: CELL_WIDTH.index
      },
      {
        prop: "name",
        label: "项目名称",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "categoryName",
        label: "项目类型",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "flags.commonUse",
        label: "常用项目",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "flags.discount",
        label: "允许打折",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "flags.status",
        label: "是否停用",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "remark",
        label: "备注",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "chargeManHour",
        label: "收费工时",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "checkManHour",
        label: "考核工时",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "manHourPrice",
        label: "工时单价",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "manHourCostPrice",
        label: "工时成本价",
        width: CELL_WIDTH.sex
      },
      {
        prop: "amount",
        label: "收费金额",
        width: CELL_WIDTH.multiple
      },
      {
        prop: "costAmount",
        label: "成本金额",
        width: CELL_WIDTH.multiple
      }
    ];
    return {
      currentPage: 1,
      totalSize: 0,
      exportVisible: false,
      tableData: [],
      itemColumns: itemColumns,
      selectedRows: [],
      queryForm: {},
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        controlsColumn,
        {
          prop: "code",
          label: "项目编码",
          width: CELL_WIDTH.index
        },
        {
          prop: "name",
          label: "项目名称",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "categoryName",
          label: "项目类型",
          width: CELL_WIDTH.multiple
        },
        {
          label: "常用项目",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { flags } = row;
            const { commonUse } = flags;
            return <span>{commonUse ? "是" : "否"}</span>;
          }
        },
        {
          label: "允许打折",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { flags } = row;
            const { discount } = flags;
            return <span>{discount ? "是" : "否"}</span>;
          }
        },
        {
          label: "是否停用",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { flags } = row;
            const { status } = flags;
            return <span>{status === "disable" ? "是" : "否"}</span>;
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.multiple
        }
      ]
    };
  },
  components: {
    ExportTable
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  methods: {
    showExport() {
      this.exportVisible = true;
    },
    outExoportHandle(sampleColums) {
      return exportItems({
        ...this.queryForm,
        columnsSettings: sampleColums
      });
    },
    listItems(query, name) {
      this.queryForm = {
        ...query,
        commonUse: query.commonUse ? true : null,
        page: this.currentPage,
        pageSize: this.pageSize
      };
      listItems({
        ...query,
        commonUse: query.commonUse ? true : null,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.tableData = rows || [];
        this.totalSize = totalSize;
        this.$nextTick(() => {
          this.selecteFirstRow(name);
        });
      });
    },
    selecteFirstRow(name) {
      if (!this.tableData || !this.tableData.length) return;
      if (typeof name === "string" && name) {
        const item = this.tableData.find(item => item.name === name);
        this.selectedRows = [item];
        setTimeout(() => {
          this.selectedRows = [item];
        }, 500);
        this.$emit("select", item);
      } else {
        this.selectedRows = [this.tableData[0]];
        this.$nextTick(() => {
          this.selectedRows = [this.tableData[0]];
        });
        this.$emit("select", this.selectedRows[0]);
      }
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.$emit("pageChange");
    },
    selectChange(e) {
      if (e && e.length) {
        this.selectedRows = e;
        this.$emit("select", e[0]);
      }
    },
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete", row);
    }
  }
};
</script>

<style></style>
