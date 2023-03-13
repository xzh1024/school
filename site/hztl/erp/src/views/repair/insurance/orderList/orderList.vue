<template>
  <div style="height:100%;padding-bottom:10px;">
    <el-form
      ref="queryForm"
      :model="queryForm"
      inline
      size="mini"
      label-width="50px"
    >
      <el-form-item>
        <el-input
          style="width:250px"
          v-model="queryForm.keyWords"
          placeHolder="车牌号/工单号/客户名称/保险公司"
          size="small"
        />
      </el-form-item>
      <el-button type="primary" size="small" @click="query()"
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
      :selected-rows.sync="selectedRows"
      @row-dblclick="selectChange"
      :current-page.sync="currentPage"
      @pageChange="_handleSizeChange"
      style="height:95%;"
      table-name="work-orders"
    />
  </div>
</template>

<script>
import { insurancesList } from "@/api/repairs/insurances";
import { INSURANCE_LIST_COLUMNS } from "../const/columns";
import { mapState } from "vuex";
export default {
  data() {
    return {
      queryForm: {
        keyWords: ""
      },
      selectedRows: [],
      tableData: [],
      tableColumns: [...INSURANCE_LIST_COLUMNS],
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
  methods: {
    query() {
      this.currentPage = 1;
      this.list();
    },
    list() {
      insurancesList({
        ...this.queryForm,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.totalSize = totalSize;
        this.tableData = rows;
      });
    },
    listAndSelect(id) {
      insurancesList({
        ...this.queryForm,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.totalSize = totalSize;
        this.tableData = rows;
        console.log(id);
        const last = rows.find(item => item.id === id);
        console.log(last);
        if (last) {
          this.selectedRows = [last];
          this.selectChange(last);
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
