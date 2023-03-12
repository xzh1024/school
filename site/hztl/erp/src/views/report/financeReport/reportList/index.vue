<template>
  <div class="container-box">
    <div class="header" style="padding:0 16px;">
      <el-button type="primary" size="mini" @click="searchVisible = true">
        查询（Ins）
      </el-button>
      <el-button
        :disabled="!canExport"
        type="primary"
        size="mini"
        @click="exportHandle"
      >
        导出（Alt+D）
      </el-button>
      <el-button type="primary" size="mini" @click="showVisible = true">
        累计
      </el-button>
    </div>
    <ht-card no-padding style="padding:16px;">
      <el-form
        ref="aggregate"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="汇总方式">
              <ht-select
                v-model="aggregate"
                :options="FIELDS"
                clearable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="查看明细">
              <el-checkbox v-model="checked" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="mini" @click.stop="searchHandle">
              确定（F5）
            </el-button>
            <el-button type="primary" size="mini" @click.stop="resetHandle">
              重置（F6）
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ht-setting-table
        :row-key="getRowKeys"
        :loading="loading"
        :data="tableData"
        :columns="mainColmns"
        :total="totalSize"
        :current-page="currentPage"
        :selected-rows.sync="multipleSelections"
        :table-name="tableName"
        pagination
        v-bind="$attrs"
        v-on="$listeners"
        @pageChange="handlePaginationChange"
        @expand-change="getExpandData"
        :expand-row-keys="expands"
        @selectChange="handleMultipleSelection"
        @sort-change="handleSortChange"
      />
    </ht-card>
    <search-box
      ref="searchBox"
      :visible.sync="searchVisible"
      @searchParamsChange="searchBoxHandle"
    />
    <accumulation-box :data="accumulation" :visible.sync="showVisible" />
    <export-table
      :base-columns="mainColmns"
      :default-data="tableData"
      :table-name="tableName"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="销售回款率报表"
      is-end-export
      isNoSaveExportColumns
      file-type="csv"
    />
  </div>
</template>

<script>
import HotkeyMixin from "@/mixins/hotkeyMixin";
import { mapState } from "vuex";
import SearchBox from "./dialog/SearchBox";
import { ExportTable } from "@/components/table";
import {
  FINANCE_REPORT_LIST_CHILD,
  FINANCE_REPORT_LIST_CHILDREN,
  FINANCE_REPORT_LIST_SEARCH
} from "@/views/report/constants";
import { FIELDS } from "../group";
import {
  exportReportChildList,
  loadReportChildList,
  loadReportList
} from "@/api/financeReport";
import AccumulationBox from "./dialog/AccumulationBox";

const defaultAggregate = ["businessMan", "companyName"];

export default {
  name: "financeReportList",
  components: { SearchBox, AccumulationBox, ExportTable },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      tableDataChild: [],
      multipleSelections: [],
      tableName: FINANCE_REPORT_LIST_SEARCH.name,
      childTableName: FINANCE_REPORT_LIST_CHILD.name,
      defaultColumns: FINANCE_REPORT_LIST_SEARCH.columns, //默认父列表维度
      defaultChildColumns: FINANCE_REPORT_LIST_CHILD.columns, //默认父列表维度
      indexColumns: FINANCE_REPORT_LIST_CHILDREN.columns, //指标列表
      mainColmns: FINANCE_REPORT_LIST_CHILDREN.columns.concat(
        FINANCE_REPORT_LIST_SEARCH.columns
      ), //父列表，默认使用父列表维度列表
      defaultChildCol: FINANCE_REPORT_LIST_CHILDREN.columns.concat(
        FINANCE_REPORT_LIST_CHILD.columns
      ), //子列表维度
      expandColumn: {
        prop: "expand",
        label: "操作",
        type: "expand",
        width: 50,
        cantHide: true,
        cantExport: true,
        render: () => (
          <ht-setting-table
            style="max-height:250px;height:193px;"
            data={this.tableDataChild}
            columns={this.defaultChildCol}
            table-name={this.childTableName}
            on-sort-change={this.handleSortChangeChild}
            selected-rows={this.multipleSelections}
            on-selectChange={this.handleMultipleSelection}
            loading={this.loading}
          />
        )
      },
      indexColumn: {
        prop: "index",
        label: "序号",
        type: "index",
        width: 50,
        cantHide: true,
        cantExport: true
      },
      FIELDS,
      aggregate: [...defaultAggregate],
      cond: {},
      order: "",
      checked: false,
      expands: [],
      getRowKeys(row) {
        return row.id;
      },
      searchVisible: false,
      sortParams: {},
      accumulation: {},
      showVisible: false,
      groupedData: [], //这个字段给二级列表做隐藏用
      expandRow: {},
      exportVisible: false,
      childSampleColums: [],
      timeOutToLoadData: null
    };
  },
  mixins: [HotkeyMixin],
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    canExport() {
      return this.tableData.length && this.hasBelongsPerm("export");
    }
  },
  mounted() {
    this.setGroupData();
  },
  activated() {
    if (this.$route.query.cond && typeof this.$route.query.cond != "string") {
      this.cond = this.$route.query.cond;
    }
    if (
      this.$route.query.aggregate &&
      typeof this.$route.query.aggregate != "string"
    ) {
      this.aggregate = this.$route.query.aggregate;
    }
    if (this.$route.query.cond || this.$route.query.aggregate) {
      this.expandRow = {};
      this.expands = [];
      this.setGroupData();
      this.loadData(1);
    }
    delete this.$route.query.aggregate;
    delete this.$route.query.cond;
  },
  methods: {
    outExoportHandle(sampleColums) {
      return exportReportChildList({
        cond: {
          ...this.cond,
          page: this.currentPage,
          pageSize: this.pageSize
        },
        aggregate: this.aggregate,
        order: this.sortParams,
        includeSub: this.checked,
        columnsSettings: sampleColums,
        subColumnsSettings: this.checked ? this.childSampleColums : null
      });
    },
    loadChildData() {
      const header = {};
      if (this.expandRow) {
        if (this.groupedData && this.groupedData.length) {
          for (const item of this.groupedData) {
            if (item == "companyName") {
              header.companyId = this.expandRow.companyId;
            } else {
              header[item] = this.expandRow[item];
            }
          }
        }
        this.loading = true;
        loadReportChildList({
          header: header,
          cond: this.cond,
          aggregate: this.aggregate,
          order: this.sortParamsChild
        })
          .then(res => {
            this.tableDataChild = res || [];
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    handleSortChangeChild(sortParams) {
      this.sortParamsChild = {
        column: sortParams.sortField,
        mode: sortParams.sort
      };
      this.loadChildData();
    },
    handleSortChange(sortParams) {
      this.sortParams = {
        column: sortParams.sortField,
        mode: sortParams.sort
      };
      this.loadData(1);
    },
    handleMultipleSelection(rows) {
      this.multipleSelections = [...rows];
    },
    searchBoxHandle(searchData) {
      this.expands = [];
      this.expandRow = {};
      this.searchVisible = false;
      this.cond = searchData;
      this.currentPage = 1;
      this.loadData(this.currentPage);
    },
    getExpandData(row, expandedRows) {
      if (expandedRows.length) {
        this.expands = [];
        if (row) {
          this.expands.push(row.id); // 每次push进去的是每行的ID
        }
      } else {
        this.expands = []; // 默认不展开
      }
      this.expandRow = row;
      this.loadChildData();
    },
    setChildSampleColums() {
      this.childSampleColums = [];
      // 拼接子列表导出字段
      for (const item of this.defaultChildCol) {
        if (item.prop != "index" && !item.forcedHide) {
          this.childSampleColums.push({ label: item.label, prop: item.prop });
        }
      }
    },
    setGroupData() {
      //去拼接子列表的数据
      this.groupedData = [...this.aggregate];
      this.sortParams = {};
      this.sortParamsChild = {};

      // 双层遍历，获取子列表的数据
      const mainIndexColumns = [];
      const childIndexColumns = [];
      for (const itemDefault of this.indexColumns) {
        let hasItem = false;
        for (const item of this.groupedData) {
          if (item == itemDefault.prop) {
            hasItem = true;
          }
        }
        const itemDefaultMain = { ...itemDefault };
        if (!hasItem) {
          //这里拼接主列表的index
          itemDefaultMain.forcedHide = true;
          itemDefaultMain.cantExport = true;
          itemDefaultMain.cantHide = true;
          mainIndexColumns.push(itemDefaultMain);
          itemDefault.forcedHide = false;
          childIndexColumns.push(itemDefault);
        } else {
          //这里拼接主列表的index
          itemDefaultMain.forcedHide = false;
          itemDefaultMain.cantExport = false;
          itemDefaultMain.cantHide = false;
          mainIndexColumns.push(itemDefaultMain);
          itemDefault.forcedHide = true;
          itemDefault.cantHide = true;
          childIndexColumns.push(itemDefault);
        }
      }
      mainIndexColumns.unshift(this.indexColumn);
      childIndexColumns.unshift(this.indexColumn);
      this.expandColumn.forcedHide = true;
      //放在主列表的数据
      if (this.checked) {
        this.expandColumn.forcedHide = false;
      }
      mainIndexColumns.unshift(this.expandColumn);
      this.mainColmns = mainIndexColumns.concat(this.defaultColumns);
      this.defaultChildCol = childIndexColumns.concat(this.defaultChildColumns);

      this.setChildSampleColums();
    },
    handlePaginationChange(page) {
      this.loadData(page);
    },
    loadData(page = this.currentPage) {
      this.tableData = [];
      this.loading = true;
      this.currentPage = page;
      loadReportList({
        cond: {
          ...this.cond,
          page: this.currentPage,
          pageSize: this.pageSize
        },
        aggregate: this.aggregate,
        order: this.sortParams
      })
        .then(res => {
          this.totalSize = res.totalSize;
          // 手动添加每一条的id上去
          for (const i in res.rows) {
            res.rows[i].id = i;
          }
          this.tableData = res.rows || [];
          this.loading = false;
          this.accumulation = res.accumulation;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchHandle() {
      this.expandRow = {};
      this.expands = [];
      this.setGroupData();

      if (this.timeOutToLoadData) {
        clearTimeout(this.timeOutToLoadData);
        this.timeOutToLoadData = null;
      }
      this.timeOutToLoadData = setTimeout(() => {
        this.$refs.searchBox?.searchHandle();
      }, 200);
    },
    resetHandle() {
      this.aggregate = [...defaultAggregate];
      this.checked = false;
    },
    exportHandle() {
      if (!this.canExport) {
        return;
      }
      this.exportVisible = true;
    }
  }
};
</script>
