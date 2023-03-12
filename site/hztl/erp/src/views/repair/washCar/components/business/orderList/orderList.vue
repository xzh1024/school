<template>
  <div style="height:100%;">
    <el-form ref="form" :model="form" inline size="mini" label-width="50px">
      <div class="query-line">
        <div>
          <el-form-item label="">
            <el-input
              v-model="form.key"
              placeholder="车牌号/单号/客户名称"
              size="small"
              style="width: 180px"
            />
          </el-form-item>
        </div>
        <div class="query-btns">
          <el-button type="primary" size="small" @click="list"
            >查询（F5）</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="open"
            v-if="hasBelongsPermWithoutRoute('create', 'repairs.washing.bill')"
          >
            开单（F2）
          </el-button>
        </div>
      </div>
    </el-form>
    <ht-setting-table
      v-loading="loading"
      class="order-list"
      :data="tableData"
      setting-all-column
      show-table-setting
      :columns="tableColumns"
      pagination
      :total="totalSize"
      :selected-rows.sync="selectedRows"
      @row-dblclick="selectChange"
      :current-page.sync="currentPage"
      @pageChange="_handleSizeChange"
      style="height: calc(100% - 45px);"
      table-name="work-orders"
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { getWashingsList } from "@/api/repairs/washCar";
import { ORDER_COLUMNS } from "../../const/columns";
import { mapState } from "vuex";
export default {
  name: "washOrderList",
  data() {
    return {
      loading: false,
      form: {
        key: "",
        status: ""
      },
      currentStatus: "状态",
      statusOptions: [
        {
          id: "待清洗",
          name: "待清洗"
        },
        {
          id: "待结算",
          name: "待结算"
        },
        {
          id: "已完成",
          name: "已完成"
        }
      ],
      tableData: [],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "plateNumber",
          label: "车牌号",
          width: CELL_WIDTH.date
        },
        {
          prop: "status",
          label: "状态",
          width: CELL_WIDTH.date,
          render: value => {
            if (value == "已完成") {
              return <span style="color:#909399">{value}</span>;
            } else {
              return <span style="color:#606266">{value}</span>;
            }
          },
          renderHeader: () => {
            return (
              <el-dropdown on-command={this.handleCommand} style="padding: 0">
                <span class="thead cell" style="font-size: 12px;padding: 0">
                  {this.currentStatus}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="全部">全部</el-dropdown-item>
                  <el-dropdown-item command="待清洗">待清洗</el-dropdown-item>
                  <el-dropdown-item command="待结算">待结算</el-dropdown-item>
                  <el-dropdown-item command="已完成">已完成</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            );
          }
        },
        ...ORDER_COLUMNS
      ],
      totalSize: 0,
      currentPage: 1,
      selectedRows: []
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.loading = true;
      getWashingsList({
        ...this.form,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          const { rows, totalSize } = res;
          this.totalSize = totalSize;
          this.tableData = rows || [];
          if (this.tableData.length > 0) {
            this.selectedRows.push(this.tableData[0]);
            this.$emit("selectChange", this.tableData[0]);
          } else {
            this.open();
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updata(id) {
      this.loading = true;
      getWashingsList({
        ...this.form,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          const { rows, totalSize } = res;
          this.totalSize = totalSize;
          this.tableData = rows || [];
          this.loading = false;
          this.selectedRows = [];
          const arrs = this.tableData.filter(item => {
            return item.id == id;
          });
          let row = {};
          if (arrs.length > 0) {
            row = arrs[0];
          } else {
            row = this.tableData.length > 0 ? this.tableData[0] : {};
          }
          this.selectedRows.push(row);
          this.$emit("selectChange", row);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleCommand(command) {
      if (command == "全部") {
        this.currentStatus = "状态";
        this.form.status = "";
        this.list();
      } else {
        this.currentStatus = command;
        this.form.status = command;
        this.list();
      }
    },
    open() {
      this.$emit("newOrder");
      this.selectedRows = [];
    },
    selectChange(e) {
      this.$emit("selectChange", e);
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .order-list {
    border: 1px solid #e8eaef;
    border-width: 1px 1px 0 0;
  }
  .pagination {
    border-top: 1px solid #e8eaef;
    border-width: 1px 0 1px 1px;
  }
  // .ht-table .table .selected-row {
  //   color: rgba(58, 167, 255, 1);
  //   span {
  //     color: rgba(58, 167, 255, 1) !important;
  //   }
  // }
  .el-dropdown {
    // height: 18px;
    // line-height: 23px;
    // color: rgb(144, 147, 153);
    color: inherit !important;
    height: 18px;
    line-height: 23px;
    .cell {
      display: inline-block;
      // white-space: nowrap;
      font-size: 12px;
      color: inherit !important;
    }
  }
}
.query-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  ::v-deep {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
