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
    <ht-card no-padding style="padding:16px;">
      <el-row>
        <el-col :span="5">
          <el-checkbox v-model="checked" @change="changeChecked"
            >查看库存明细</el-checkbox
          >
        </el-col>
      </el-row>
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
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <export-table
      :base-columns="mainColmns"
      :default-data="tableData"
      :table-name="tableName"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="超储商品报表"
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
  OVERSTOCK_REPORT_LIST_CHILD,
  OVERSTOCK_REPORT_LIST_CHILDREN,
  OVERSTOCK_REPORT_LIST_SEARCH
} from "@/views/report/constants";
import {
  exportReportChildList,
  loadReportChildList,
  loadReportList
} from "@/api/overstock";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import AccumulationBox from "./dialog/AccumulationBox";
import PartsInfoSearch from "@/components/partsInfoSearch";

export default {
  name: "overstockReportList",
  components: { SearchBox, PartsDetailBox, AccumulationBox, ExportTable },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      tableDataChild: [],
      multipleSelections: [],
      tableName: OVERSTOCK_REPORT_LIST_SEARCH.name,
      childTableName: OVERSTOCK_REPORT_LIST_CHILD.name,
      defaultColumns: OVERSTOCK_REPORT_LIST_SEARCH.columns, //默认父列表维度
      defaultChildColumns: OVERSTOCK_REPORT_LIST_CHILD.columns, //默认父列表维度
      indexColumns: OVERSTOCK_REPORT_LIST_CHILDREN.columns, //指标列表
      mainColmns: OVERSTOCK_REPORT_LIST_CHILDREN.columns.concat(
        OVERSTOCK_REPORT_LIST_SEARCH.columns
      ), //父列表，默认使用父列表维度列表
      defaultChildCol: OVERSTOCK_REPORT_LIST_CHILDREN.columns.concat(
        OVERSTOCK_REPORT_LIST_CHILD.columns
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
      sortParams: {},
      accumulation: {},
      showVisible: false,
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
      this.expandRow = {};
      this.expands = [];
      this.setGroupData();
      this.loadData(1);
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
      if (this.expandRow) {
        this.loading = true;
        loadReportChildList({
          ownerCompanyIds: this.cond.ownerCompanyIds,
          partId: this.partId,
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
          this.partId = row.partId;
        }
      } else {
        this.expands = []; // 默认不展开
      }
      this.expandRow = row;
      this.loadChildData();
    },
    changeChecked() {
      this.searchHandle();
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
      this.groupedData = [];
      this.sortParams = {};
      this.sortParamsChild = {};
      //日期字段单独提出来判断
      if (
        this.aggregate.datePattern === 0 ||
        this.aggregate.datePattern === 1
      ) {
        this.aggregate.date = "date";
      } else {
        delete this.aggregate.date;
        delete this.aggregate.datePattern;
      }
      for (const key in this.aggregate) {
        if (
          typeof this.aggregate[key] != "string" &&
          typeof this.aggregate[key] != "number" &&
          this.aggregate[key] &&
          this.aggregate[key].length
        ) {
          for (const childCol of this.aggregate[key]) {
            this.groupedData.push(childCol);
          }
        } else if (
          this.aggregate[key] &&
          typeof this.aggregate[key] == "string"
        ) {
          this.groupedData.push(this.aggregate[key]);
        }
      }
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
        this.$refs.searchBox?.searchHandle();
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
