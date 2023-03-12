<template>
  <div style="height:100%;padding-bottom:10px;background:#fff;">
    <el-form ref="form" :model="form" inline size="mini" label-width="50px">
      <el-form-item>
        <el-input
          style="width:300px"
          v-model="form.keyword"
          placeHolder="车牌号/工单号/客户名称"
          @change="resetLocalBillNo"
          size="small"
        />
      </el-form-item>
      <el-button type="primary" size="small" @click="list()"
        >查询（F5）</el-button
      >
    </el-form>
    <ht-setting-table
      :data="tableData"
      setting-all-column
      show-table-setting
      :columns="tableColumns"
      pagination
      :total="totalSize"
      @row-dblclick="selectChange"
      :current-page.sync="currentPage"
      :selected-rows.sync="selectedRows"
      @pageChange="_handleSizeChange"
      style="height:95%;background:#fff;"
      table-name="work-orders"
    />
  </div>
</template>

<script>
import { listBills } from "@/api/repairs/bills";
import { ORDER_COLUMNS } from "../const/columns";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        keyword: ""
      },
      selectedRows: [],
      tableData: [],
      tableColumns: [...ORDER_COLUMNS],
      totalSize: 0,
      currentPage: 1
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.list();
  },
  activated() {
    this.list();
  },
  deactivated() {
    console.log("离开");
    localStorage.setItem("billNo", "");
  },
  methods: {
    list() {
      let keyStr = "";
      const localBillNo = localStorage.getItem("billNo");
      if (localBillNo) {
        this.form.keyword = localBillNo;
        keyStr = localBillNo;
      } else {
        keyStr = this.form.keyword;
      }
      listBills({
        keyword: keyStr,
        queryChannel: "pick",
        page: this.currentPage,
        pageSize: this.pageSize,
        statuses: ["recepting", "repairing"]
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
    resetLocalBillNo() {
      localStorage.setItem("billNo", "");
    },
    refreshAndSelect(e) {
      listBills({
        ...this.form,
        queryChannel: "pick",
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.totalSize = totalSize;
        this.tableData = rows || [];
        if (!this.tableData || !this.tableData.length) return;
        if (e) {
          const newAddOrder = this.tableData.find(item => item.id === e.id);
          this.selectedRows = [newAddOrder];
          this.selectChange(newAddOrder);
        } else {
          this.selectedRows = [this.tableData[0]];
          this.selectChange(this.tableData[0]);
        }
      });
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

<style></style>
