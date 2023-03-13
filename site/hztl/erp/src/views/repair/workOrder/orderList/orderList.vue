<template>
  <div
    class="order-list-wrap"
    style="height:100%;padding-bottom:10px;background:#fff;"
  >
    <el-form ref="form" :model="form" inline size="mini" label-width="50px">
      <div class="query-line">
        <div class="query-input">
          <el-form-item label="">
            <el-input
              style="width:100%"
              v-model="form.keyword"
              placeHolder="车牌号/工单号/客户名称"
              size="small"
            />
          </el-form-item>
        </div>
        <div class="query-btns">
          <el-button
            v-if="allowGetList"
            type="primary"
            size="small"
            @click="query()"
            >查询（F5）</el-button
          >
          <el-button
            v-if="hasBelongsPerm('create')"
            type="primary"
            size="small"
            @click="$emit('newOrder')"
            >开单（F2）</el-button
          >
        </div>
      </div>
    </el-form>
    <ht-setting-table
      :data="tableData"
      setting-all-column
      show-table-setting
      :columns="tableColumns"
      pagination
      :selected-rows.sync="selectedRows"
      :total="totalSize"
      @row-dblclick="selectChange"
      :current-page.sync="currentPage"
      @pageChange="_handleSizeChange"
      style="height:95%;"
      table-name="work-orders"
    />
  </div>
</template>

<script>
import { listBills } from "@/api/repairs/bills";
import { ORDER_STATUS } from "../const/columns";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { mapState } from "vuex";
const defaultForm = {
  keyword: "",
  statuses: ["recepting", "repairing", "toFinancialConfirm", "toFinancial"]
};
export default {
  name: "orderList",
  data() {
    return {
      lastQueryBillNo: "", // 上次路由的billNo参数
      lastQueryTime: "", // 上次路由的time参数
      form: {
        ...defaultForm
      },
      currentStatu: "状态",
      tableData: [],
      selectedRows: [],
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
          prop: "cooperatorName",
          label: "客户名称",
          width: CELL_WIDTH.date
        },
        {
          prop: "status",
          label: "状态",
          width: CELL_WIDTH.companySortName,
          formatter: value => {
            return ORDER_STATUS[value] || "";
          },
          renderHeader: () => {
            return (
              <el-dropdown on-command={this.handleCommand}>
                <span class="thead cell">
                  {this.currentStatu}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="">全部</el-dropdown-item>
                  <el-dropdown-item command="recepting">
                    接待中
                  </el-dropdown-item>
                  <el-dropdown-item command="repairing">
                    施工中
                  </el-dropdown-item>
                  <el-dropdown-item command="toFinancialConfirm">
                    待结算确认
                  </el-dropdown-item>
                  <el-dropdown-item command="toFinancial">
                    待收款交车
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            );
          }
        },
        {
          prop: "businessCategoryName",
          label: "业务类型",
          width: CELL_WIDTH.date
        },
        {
          prop: "receptionTime",
          label: "接待时间",
          width: CELL_WIDTH.date,
          type: "time"
        },
        {
          prop: "cooperatorPhone",
          label: "客户电话",
          width: CELL_WIDTH.date
        },
        {
          prop: "billNo",
          label: "工单号",
          width: CELL_WIDTH.date
        }
      ],
      editKeyWord: false,
      totalSize: 0,
      currentPage: 1
    };
  },
  watch: {
    "$route.query.billNo": {
      handler() {
        console.log(this.lastQueryTime);
        console.log(this.$route.query.time);
        if (
          window.location.pathname.indexOf("WorkOrder") > -1 &&
          this.lastQueryTime != this.$route.query.time
        ) {
          console.log("请求数据");
          this.lastQueryBillNo = this.$route.query.billNo;
          this.lastQueryTime = this.$route.query.time;
          console.log(this.lastQueryBillNo);
          console.log(this.lastQueryTime);
          this.list(this.$route.query.billNo);
        }
      }
    },
    "$route.query.time": {
      handler() {
        console.log(this.lastQueryBillNo);
        console.log(this.lastQueryTime);
        // console.log(this.form.keyword);
        if (
          window.location.pathname.indexOf("WorkOrder") > -1 &&
          this.lastQueryTime != this.$route.query.time
        ) {
          console.log("请求数据2");

          this.lastQueryBillNo = this.$route.query.billNo;
          this.lastQueryTime = this.$route.query.time;
          this.list(this.$route.query.billNo);
        }
      }
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    allowGetList() {
      return this.hasBelongsPerm("read");
    }
  },
  mounted() {
    this.form.keyword = "";
    if (
      window.location.pathname.indexOf("WorkOrder") > -1 &&
      this.$route.query.billNo
    ) {
      console.log("请求数据mounted");
      this.lastQueryBillNo = this.$route.query.billNo;
      this.lastQueryTime = this.$route.query.time;
      this.list(this.$route.query.billNo);
    } else {
      this.list();
    }
  },
  methods: {
    handleCommand(e) {
      if (e) {
        this.form.statuses = [e];
        this.currentStatu = ORDER_STATUS[e];
      } else {
        this.form.statuses = [
          "recepting",
          "repairing",
          "toFinancialConfirm",
          "toFinancial"
        ];
        this.currentStatu = "全部";
      }
      this.query();
    },
    query() {
      this.currentPage = 1;
      this.list();
    },
    list(billNo) {
      console.log(billNo);
      if (billNo) {
        this.form.keyword = billNo;
        this.currentStatu = "全部";
        this.form.statuses = [
          "recepting",
          "repairing",
          "toFinancialConfirm",
          "toFinancial"
        ];
      }
      listBills({
        ...this.form,
        queryChannel: "repair",
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.totalSize = totalSize;
        this.tableData = rows || [];
        if (rows && rows.length) {
          this.selectedRows = [rows[0]];
          this.selectChange(rows[0]);
        }
      });
    },
    refreshAndSelect(e) {
      // this.currentStatu = ORDER_STATUS[e.status] || "全部";
      // this.form = {
      //   ...defaultForm,
      //   statuses: [e.status] || defaultForm.statuses
      // };
      this.currentPage = 1;
      listBills({
        ...this.form,
        queryChannel: "repair",
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.totalSize = totalSize;
        this.tableData = rows || [];
        if (!this.tableData || !this.tableData.length) return;
        // 默认选中第一条，并非上次编辑的那条工单
        // this.selectedRows = [this.tableData[0]];
        // this.selectChange(this.tableData[0]);
        if (e) {
          const newAddOrder = this.tableData.find(item => item.id === e.id);
          if (newAddOrder) {
            this.selectedRows = [newAddOrder];
            this.selectChange(newAddOrder);
          } else {
            this.selectedRows = [this.tableData[0]];
            this.selectChange(this.tableData[0]);
          }
        } else {
          this.selectedRows = [this.tableData[0]];
          this.selectChange(this.tableData[0]);
        }
      });
    },
    selectChange(e) {
      if (this.allowGetList) {
        this.$emit("selectChange", e);
      }
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    }
  }
};
</script>

<style lang="scss" scoped>
.order-list-wrap {
  ::v-deep {
    .el-dropdown {
      color: inherit !important;
      height: 18px;
      line-height: 23px;
      .cell {
        display: inline-block;
        width: 99px;
        font-size: 12px;
        color: inherit !important;
        text-align: left;
      }
    }
  }
}
.query-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  .query-input {
    flex: 1;
    padding-right: 20px;
    ::v-deep {
      .el-form-item {
        width: 100%;
      }
      .el-form-item__content {
        width: 100%;
      }
    }
  }
  ::v-deep {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.status-filter {
  color: rgb(144, 147, 153);
  font-size: 12px;
  font-weight: 700;
}
</style>
