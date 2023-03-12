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
      <el-button
        :disabled="!canView"
        type="primary"
        size="mini"
        @click="handleViewPartDetail"
      >
        配件详情（F10）
      </el-button>
      <el-button type="primary" size="mini" @click="showVisible = true">
        累计
      </el-button>
    </div>
    <ht-card no-padding class="auto-card">
      <ht-setting-table
        :columns="mainColmns"
        :row-key="getRowKeys"
        :loading="loading"
        :data="tableData"
        :total="totalSize"
        :current-page="currentPage"
        :table-name="tableName"
        pagination
        v-bind="$attrs"
        v-on="$listeners"
        @pageChange="handlePaginationChange"
        @expand-change="getExpandData"
        :expand-row-keys="expands"
        :selected-rows.sync="multipleSelections"
        @selectChange="handleMultipleSelection"
        @sort-change="handleSortChange"
      />
    </ht-card>
    <search-box
      :visible.sync="searchVisible"
      @searchParamsChange="searchBoxHandle"
    />
    <accumulation-box :data="accumulation" :visible.sync="showVisible" />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <export-table
      :base-columns="mainColmns"
      :default-data="tableData"
      :table-name="tableName"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="滞销商品报表"
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
import { UNSALE_REPORT_LIST_SEARCH } from "@/views/report/constants";
import {
  exportReportChildList,
  loadReportChildList,
  loadReportList
} from "@/api/unsale";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import AccumulationBox from "./dialog/AccumulationBox";
import PartsInfoSearch from "@/components/partsInfoSearch";

export default {
  name: "unsalableList",
  components: { SearchBox, PartsDetailBox, AccumulationBox, ExportTable },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      tableDataChild: [],
      multipleSelections: [],
      tableName: UNSALE_REPORT_LIST_SEARCH.name,
      childTableName: "",
      defaultColumns: UNSALE_REPORT_LIST_SEARCH.columns, //默认父列表维度
      defaultChildColumns: [], //默认父列表维度
      indexColumns: [], //指标列表
      mainColmns: UNSALE_REPORT_LIST_SEARCH.columns, //父列表，默认使用父列表维度列表
      defaultChildCol: [], //子列表维度
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

      aggregate: {},
      cond: {},
      order: "",
      checked: false,
      expands: [],
      getRowKeys(row) {
        return row.id;
      },
      searchVisible: false,
      partDetailBoxVisible: false,
      partId: null,
      companyListSet: [],
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
    canView() {
      return (
        this.multipleSelections.length === 1 &&
        this.multipleSelections[0].partId
      );
    },
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
      this.searchHandle();
    }
    delete this.$route.query.aggregate;
    delete this.$route.query.cond;

    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "550px",
      height: "calc(100% - 140px)",
      contentRender: () => <PartsInfoSearch partId={this.partId} />
    });
  },
  deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
  },
  methods: {
    outExoportHandle(sampleColums) {
      const exportChildColumns = this.childSampleColums.slice(
        1,
        this.childSampleColums.length - 1
      );

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
        subColumnsSettings: this.checked ? exportChildColumns : null
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
      this.partId = this.multipleSelections[0].partId;
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
      // 双层遍历，获取子列表的数据
      const mainIndexColumns = [];
      const childIndexColumns = [];
      this.expandColumn.forcedHide = true;
      //放在主列表的数据
      if (this.checked) {
        this.expandColumn.forcedHide = false;
      }
      mainIndexColumns.unshift(this.expandColumn);
      this.mainColmns = mainIndexColumns.concat(this.defaultColumns);
      this.defaultChildCol = childIndexColumns.concat(this.defaultChildColumns);
      // this.setChildSampleColums();
    },
    handleViewPartDetail() {
      if (!this.canView) return;
      this.partDetailBoxVisible = true;
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
        this.loadData(1);
      }, 200);
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
<style lang="stylus" scoped>
/deep/.ht-table{
  min-height: 200px;
}
/deep/ .el-table {
  min-height: 200px;
}
</style>
