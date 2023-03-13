<template>
  <div class="container-box">
    <div class="header" style="padding:0 16px;">
      <div class="flex-container">
        <div>
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
        <div>
          <el-popover
            popper-class="help-box"
            placement="left-start"
            width="290"
            trigger="hover"
          >
            <div class="help-wrap">
              <div class="help-item">
                <span class="help-title">关于汇总方式：</span>
                <span class="text-font">
                  汇总方式字段为仓库/货主/货位/配件编码/配件名称/品牌/产地/性质/批次号或这几种方式的任意组合时才能查出期初期末数据，反之则不能查出期初期末数据
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">关于表格中的指标:</span>
              </div>
              <div class="help-item">
                <span class="help-title">进货价：</span>
                <span class="text-font">
                  只有汇总方式为批次+性质+配件名称+配件编码时才能展示出进货价
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">未税进货价：</span>
                <span class="text-font">
                  不含税的采购进货价
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">销售价：</span>
                <span class="text-font">
                  只有汇总方式为配件名称+配件编码+性质时才能展示出零售价
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">未税销售价：</span>
                <span class="text-font">
                  不含税的销售单价
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">期初库存数量：</span>
                <span class="text-font">
                  指定日期范围内起始时间0点时的实际库存数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">期初库存金额：</span>
                <span class="text-font">
                  SUM（实际库存数*进货价）
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">期初未税库存金额：</span>
                <span class="text-font">
                  SUM（实际库存数量*未税进货价）
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">入库金额</span>
                <span class="text-font">
                  =进货价*入库数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">未税入库金额</span>
                <span class="text-font">
                  =未税进货价*入库数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">出库成本金额</span>
                <span class="text-font">
                  =进货价*出库数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">未税出库成本金额</span>
                <span class="text-font">
                  =未税进货价*出库数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">出库销售金额</span>
                <span class="text-font">
                  =销售价*出库数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">未税出库销售金额</span>
                <span class="text-font">
                  =未税销售价*出库数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">结算优惠：</span>
                <span class="text-font">
                  业务单据的结算优惠金额
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">毛利</span>
                <span class="text-font">
                  =出库销售金额-出库成本金额
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">毛利率</span>
                <span class="text-font">
                  =毛利/出库销售金额
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">未税毛利</span>
                <span class="text-font">
                  =未税出库销售金额-未税出库成本金额
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">未税毛利率</span>
                <span class="text-font">
                  =未税毛利/未税出库销售金额
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">加价率</span>
                <span class="text-font">
                  =毛利/出库成本额
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">期末库存数量：</span>
                <span class="text-font">
                  指定日期范围内结束时间0点时的实际库存数量
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">期末库存金额</span>
                <span class="text-font">
                  =SUM（实际库存数*进货价）
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">期初未税库存金额</span>
                <span class="text-font">
                  =SUM（实际库存数量*未税进货价）
                </span>
              </div>
              <div class="help-item">
                <span class="help-title">本期库存周转率</span>
                <span class="text-font">
                  =（本期配件销售成本+本期调拨成本）/（(本期配件期初金额+本期配件期末金额)/2）：指定日期范围内库存周转的快慢程度
                </span>
              </div>
            </div>
            <i slot="reference" class="el-icon-question help-tips" />
          </el-popover>
        </div>
      </div>
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
          <el-col :span="5">
            <el-form-item prop="fields" label="汇总方式">
              <ht-select
                v-model="aggregate.fields"
                :options="FIELDS"
                clearable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期汇总" prop="datePattern">
              <ht-select
                v-model="aggregate.datePattern"
                :options="dateStr"
                clearable
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
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <export-table
      :base-columns="mainColmns"
      :default-data="tableData"
      :table-name="tableName"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="出入库明细报表"
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
  STORE_REPORT_LIST_CHILD,
  STORE_REPORT_LIST_CHILDREN,
  STORE_REPORT_LIST_SEARCH
} from "@/views/report/constants";
import { DATE } from "../../group";
import { FIELDS } from "../group";
import {
  exportReportChildList,
  loadReportChildList,
  loadReportList
} from "@/api/storeReport";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import AccumulationBox from "./dialog/AccumulationBox";
import PartsInfoSearch from "@/components/partsInfoSearch";

const defaultAggregate = {
  fields: [
    "ownerCompanyName",
    "warehouseName",
    "positionName",
    "partCode",
    "partName",
    "partBrand",
    "partProductionPlace"
  ],
  datePattern: 0
};

export default {
  name: "storeReportList",
  components: { SearchBox, PartsDetailBox, AccumulationBox, ExportTable },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      tableDataChild: [],
      multipleSelections: [],
      tableName: STORE_REPORT_LIST_SEARCH.name,
      childTableName: STORE_REPORT_LIST_CHILD.name,
      defaultColumns: STORE_REPORT_LIST_SEARCH.columns, //默认父列表维度
      defaultChildColumns: STORE_REPORT_LIST_CHILD.columns, //默认父列表维度
      indexColumns: STORE_REPORT_LIST_CHILDREN.columns, //指标列表
      mainColmns: STORE_REPORT_LIST_CHILDREN.columns.concat(
        STORE_REPORT_LIST_SEARCH.columns
      ), //父列表，默认使用父列表维度列表
      defaultChildCol: STORE_REPORT_LIST_CHILDREN.columns.concat(
        STORE_REPORT_LIST_CHILD.columns
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
      dateStr: DATE,
      aggregate: {
        ...defaultAggregate
      },
      cond: {
        types: ["出库", "入库"],
        billTypes: [
          "cg",
          "jj",
          "xt",
          "pdr",
          "ycr",
          "qc",
          "xs",
          "ct",
          "pdc",
          "ycc"
        ]
      },
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
      if (this.multipleSelections?.length) {
        this.partId = this.multipleSelections[0].partId;
      } else {
        this.partId = null;
      }
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
            if (childCol === "warehouseName") {
              this.groupedData.push("warehouseId");
            } else if (childCol === "positionName") {
              this.groupedData.push("positionId");
            } else if (childCol === "ownerCompanyName") {
              this.groupedData.push("ownerCompanyId");
            } else if (childCol === "supplierName") {
              this.groupedData.push("supplierId");
            } else if (childCol === "cooperatorName") {
              this.groupedData.push("cooperatorId");
            }
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

<style lang="scss">
.el-popover.help-box {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.help-wrap {
  .help-item {
    margin-top: 2px;
    .help-title {
      font-weight: 600;
      margin-top: 5px;
    }
  }
}
</style>
