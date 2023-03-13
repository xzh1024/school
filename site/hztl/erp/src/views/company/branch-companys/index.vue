<template>
  <div class="container-box">
    <div class="header">
      <el-button
        type="primary"
        size="mini"
        :disabled="!hasAutoPerm('create')"
        @click="addNewCompany"
      >
        新增公司（F2）
      </el-button>
    </div>
    <ht-card class="auto-card" no-padding>
      <ht-setting-table
        :loading="loading"
        :data="tableData"
        :columns="tableColumns"
        :table-name="tableName"
        :total="totalSize"
        :current-page="currentPage"
        :key-scope="keyScope"
        :selected-rows.sync="selectedRows"
        pagination
        setting-all-column
        show-table-setting
        @rowOperation="handleRowEdit"
        @pageChange="_handleSizeChange"
      />
    </ht-card>

    <ht-dialog
      :visible.sync="showEditCompanyInfo"
      class="company-information"
      width="760px"
      title="公司资料"
      top="7vh"
    >
      <CompanyInfo
        :is-add-type="isAddType"
        :company-id="companyId"
        :visible.sync="showEditCompanyInfo"
        style="height: 685px;"
        is-dialog
        @on-success="handleEidtSuccess"
      />
    </ht-dialog>
  </div>
</template>

<script>
// 账套下公司列表
import { getAllCompanies } from "@/api/company/company";
import { CELL_WIDTH } from "@/constants";
import { mapState } from "vuex";
import CompanyInfo from "../company-info";
import hotkeys from "hotkeys-js";

export default {
  name: "BranchCompanys",
  components: {
    CompanyInfo
  },
  data() {
    return {
      keyScope: Symbol("BranchCompanys"),
      tableName: "BranchCompanyTable",
      tableData: [],
      selectedRows: [],
      totalSize: null,
      loading: false,
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true
        },
        {
          prop: "control",
          label: "操作",
          width: 60,
          cantExport: true,
          render: (value, row) => {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            function handleEdit(row, e) {
              e.stopPropagation();
              self.handleEdit(row);
            }
            return this.hasAutoPerm("update") ? (
              <el-tooltip
                enterable={false}
                effect="dark"
                content="编辑"
                placement="top"
              >
                <span
                  on-click={e => handleEdit(row, e)}
                  class="icon operation-icon icon-edit-info"
                />
              </el-tooltip>
            ) : null;
          }
        },
        { prop: "ident", label: "公司标识", width: CELL_WIDTH.type },
        {
          label: "是否总公司",
          width: 100,
          formatter: (value, row) => {
            return row.isHeadCompany ? "是" : "否";
          }
        },
        { prop: "name", label: "公司名称", width: CELL_WIDTH.companyName },
        { prop: "shortName", label: "公司简称", width: CELL_WIDTH.companyName },
        { prop: "contacts", label: "负责人", width: CELL_WIDTH.personName },
        { prop: "phone", label: "负责人电话", width: CELL_WIDTH.phone },
        { prop: "areaName", label: "所属区域", width: CELL_WIDTH.address }
      ],
      currentPage: 1,
      companyId: null,
      isAddType: false,
      showEditCompanyInfo: false
    };
  },
  computed: {
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize
    })
  },
  mounted() {
    this.loadData(this.currentPage);
    hotkeys("f2", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f2":
          this.addNewCompany();
          break;
        default:
      }
    });
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    loadData(page) {
      // 初始化列表数据
      this.loading = true;
      getAllCompanies({ page, pageSize: this.pageSizes })
        .then(data => {
          this.totalSize = data.totalSize;
          this.tableData = data.rows || [];
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    _handleSizeChange(page) {
      // 分页操作
      this.currentPage = page;
      this.loadData(page);
    },
    handleRowEdit(row) {
      if (!row.id) return;
      this.handleEdit(row);
    },
    handleEdit(row) {
      this.selectedRows = [row];
      this.isAddType = false;
      this.companyId = Number(row.id);
      this.showEditCompanyInfo = true;
    },
    addNewCompany() {
      this.isAddType = true;
      this.showEditCompanyInfo = true;
    },
    handleEidtSuccess() {
      this.showEditCompanyInfo = false;
      this.loadData(this.currentPage);
    }
  }
};
</script>

<style lang="stylus" scoped>
.company-information
    /deep/.el-dialog__body
        padding: 0 0 5px 0
</style>
