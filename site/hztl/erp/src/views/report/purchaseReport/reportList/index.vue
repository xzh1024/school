<template>
  <div class="container-box">
    <div class="header" style="padding:0 16px">
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
      <el-form
        ref="aggregate"
        :model="aggregate"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="2">
            汇总方式：
          </el-col>
          <el-col :span="5">
            <el-form-item label="分公司" prop="company">
              <ht-select
                v-model="aggregate.company"
                :options="companyStr"
                clearable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="配件" prop="part">
              <ht-select
                v-model="aggregate.part"
                :options="partsStr"
                clearable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="供应商" prop="cooperator">
              <ht-select
                v-model="aggregate.cooperator"
                :options="supplierStr"
                clearable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="日期" prop="datePattern">
              <ht-select
                v-model="aggregate.datePattern"
                :options="dateStr"
                clearable
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据" prop="bill">
              <ht-select
                v-model="aggregate.bill"
                :options="billsStr"
                clearable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="人员" prop="people">
              <ht-select
                v-model="aggregate.people"
                :options="peopleStr"
                clearable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="查看明细">
              <el-checkbox v-model="checked" />
            </el-form-item>
            <div>
              <el-button type="primary" size="mini" @click.stop="searchHandle">
                确定（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetHandle">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ht-setting-table
        :data="tableData"
        :columns="mainColmns"
        :table-name="tableName"
        @sort-change="handleSortChange"
        :selected-rows="multipleSelections"
        @selectChange="handleMultipleSelection"
        :loading="loading"
        :row-key="getRowKeys"
        :total="totalSize"
        :current-page="currentPage"
        pagination
        v-bind="$attrs"
        v-on="$listeners"
        @pageChange="handlePaginationChange"
        @expand-change="getExpandData"
        :expand-row-keys="expands"
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
      file-name="采购明细报表"
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
import PartsInfoSearch from "@/components/partsInfoSearch";
import {
  REPORT_PURCHASE_LIST_CHILD,
  REPORT_PURCHASE_LIST_CHILDREN,
  REPORT_PURCHASE_LIST_SEARCH
} from "@/views/report/constants";
import { COMPANY, DATE, PARTS, PEOPLE, SUPPLIER } from "../../group";
import { BILLS } from "../group";
import {
  exportReportChildList,
  loadReportChildList,
  loadReportList
} from "@/api/report";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import AccumulationBox from "./dialog/AccumulationBox";

const defaultAggregate = {
  company: ["companyName"],
  cooperator: ["cooperatorArea", "cooperatorNameStr"],
  datePattern: 0
};

export default {
  name: "purchaseReportList",
  components: { SearchBox, PartsDetailBox, AccumulationBox, ExportTable },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      tableDataChild: [],
      multipleSelections: [],
      tableName: REPORT_PURCHASE_LIST_SEARCH.name,
      childTableName: REPORT_PURCHASE_LIST_CHILD.name,
      defaultColumns: REPORT_PURCHASE_LIST_SEARCH.columns, //默认父列表维度
      defaultChildColumns: REPORT_PURCHASE_LIST_CHILD.columns, //默认父列表维度
      indexColumns: REPORT_PURCHASE_LIST_CHILDREN.columns, //指标列表
      mainColmns: REPORT_PURCHASE_LIST_CHILDREN.columns.concat(
        REPORT_PURCHASE_LIST_SEARCH.columns
      ), //父列表，默认使用父列表维度列表
      defaultChildCol: REPORT_PURCHASE_LIST_CHILDREN.columns.concat(
        REPORT_PURCHASE_LIST_CHILD.columns
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
      companyStr: COMPANY,
      supplierStr: SUPPLIER,
      billsStr: BILLS,
      peopleStr: PEOPLE,
      partsStr: PARTS,
      dateStr: DATE,
      aggregate: {
        ...defaultAggregate
      },
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
    resetHandle() {
      this.aggregate = { ...defaultAggregate };
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
