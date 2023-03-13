<template>
  <div class="container-box">
    <ht-card>
      <el-button
        :disabled="!selectedRows.length || !hasHandlePerm()"
        type="primary"
        size="mini"
        @click.stop="clickCreate"
      >
        生成急件到货单（F2)
      </el-button>
      <el-button
        :disabled="!canShowPartDetailBox"
        type="primary"
        size="mini"
        @click="showPartDetailBox"
      >
        配件详情（F10）
      </el-button>
      <span
        class="text-danger"
        style="cursor:pointer;float:right"
        @click.stop="openManualDialog"
        ><i class="el-icon-question"></i>如何使用急件处理</span
      >
    </ht-card>
    <ht-card>
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label-width="75px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                :options="dateTypes"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range
                v-model="searchForm.billDate"
                shortcuts-type="all"
              />
            </el-form-item>
            <el-row :gutter="2">
              <el-col :span="12">
                <el-form-item
                  label="业务类型"
                  prop="sourceTypes"
                  label-width="75px"
                >
                  <ht-select
                    v-model="searchForm.sourceTypes"
                    :options="sourceTypes"
                    :clearable="false"
                    multiple
                    collapse-tags
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务单号" prop="billNo" label-width="75px">
                  <ht-input
                    v-model="searchForm.billNo"
                    placeholder="销售单号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-form-item label="配件编码" prop="code">
              <ht-input v-model="searchForm.code" placeholder="配件编码" />
            </el-form-item>
            <el-form-item label="配件名称" prop="partName">
              <ht-autocomplete
                v-model="searchForm.partName"
                :fetch-suggestions="autocompleteSearchPartName"
                :trigger-on-focus="false"
                placeholder="配件名称"
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="配件品牌" prop="brand">
              <ht-autoselect
                v-model="searchForm.brand"
                :options="store().partBrandDictionary()"
                :trigger-on-focus="false"
                placeholder="配件品牌"
                clearable
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="产地" prop="productionPlace">
              <ht-autoselect
                v-model="searchForm.productionPlace"
                :options="store().productionPlaceDictionary()"
                :trigger-on-focus="false"
                placeholder="产地"
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="业务员" prop="businessManId">
              <ht-autoselect
                v-model="searchForm.businessManId"
                :options="store().allStaffs()"
                :trigger-on-focus="false"
                placeholder="业务员"
                clearable
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="制单人" prop="createdBy">
              <ht-autoselect
                v-model="searchForm.createdBy"
                :options="store().allStaffs()"
                :trigger-on-focus="false"
                placeholder="制单人"
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="客户名称" prop="cooperatorId">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllCustromerCooperators(query)
                "
                :trigger-on-focus="false"
                remote
                clearable
                filter-zero
                highlight-first-item
                placeholder="客户名称"
              />
            </el-form-item>
            <div style="text-align: right">
              <el-button type="primary" size="mini" @click.stop="searchHandle">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetHandle">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card :no-padding="true" no-background class="auto-card">
      <el-row :gutter="10" type="flex" style="height:100%">
        <el-col :span="24" style="height:100%">
          <ht-table
            ref="pending_tab"
            :loading="tabLoading"
            :data="tableData"
            :total="tabTotal"
            :current-page="currentPage"
            :columns="tableColumns"
            :selected-rows.sync="selectedRows"
            :index-column="false"
            selection-type="multiple"
            pagination
            setting-allcolumn
            show-table-setting
            @pageChange="pageChange"
            @table-setting="editColumnsVisible = true"
            @rowOperation="rowOperation"
          />
          <edit-columns
            :base-columns="baseColumns"
            :table-name="tableName"
            :visible.sync="editColumnsVisible"
            @columns-change="columnsChange"
          />
        </el-col>
        <el-col v-if="false" :span="8" style="height:100%">
          <parts-suppliers
            :part-id="supplierPartId"
            height="calc(100% - 1px)"
          />
        </el-col>
      </el-row>
    </ht-card>
    <EditUrgentBillBox
      :visible.sync="editUrgentBillBoxVisible"
      :data="editPartData"
      @on-success="searchHandle"
    />
    <BatchEditUrgentBillBox
      :visible.sync="createUrgentBillBoxVisible"
      :selectedRows="selectedRows"
      @on-success="searchHandle"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
  </div>
</template>
<script>
import PartsInfoSearch from "@/components/partsInfoSearch";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import PartsSuppliers from "@/components/parts/PartsSuppliers";
import EditUrgentBillBox from "./EditUrgentBillBox";
import BatchEditUrgentBillBox from "./BatchEditUrgentBillBox";
import { reqPendingSalesList } from "@/api/purchase/purchaseDispatch/pending";
import { mapState, mapGetters } from "vuex";
import { searchMixin } from "@/mixins";
import { EditColumns } from "@/components/table";
import { TABLE_DISPATCH_PENDING_LIST } from "@/views/purchase/constants";
import eventBus from "@/event";
import baseIndexJump from "@/utils/baseIndexJump";
import { TAG_TOOLTIP } from "@/constants";
import * as store from "@/utils/store";

const defaultSearchForm = {
  dateType: "bill",
  billDate: [],
  sourceTypes: [],
  billNo: "",
  code: "",
  partName: "",
  brand: "",
  productionPlace: "",
  businessManId: null,
  createdBy: null,
  cooperatorId: null
};

export default {
  name: "PendingList",
  components: {
    PartsSuppliers,
    EditUrgentBillBox,
    BatchEditUrgentBillBox,
    EditColumns,
    PartsDetailBox
  },
  mixins: [searchMixin],
  data() {
    return {
      partId: 0,
      editColumnsVisible: false,
      searchForm: {
        ...defaultSearchForm
      },
      sourceTypes: [
        { id: "销售单", name: "销售单" },
        { id: "维修工单", name: "维修工单" }
      ],
      dateTypes: [
        { id: "bill", name: "业务日期" },
        { id: "create", name: "制单日期" }
      ],
      tableName: TABLE_DISPATCH_PENDING_LIST.name,
      tabLoading: false,
      selectedRows: [],
      tableColumns: [],
      tableData: [],
      tabTotal: 0,
      currentPage: 1,

      supplierPartId: "",
      createUrgentBillBoxVisible: false,
      editUrgentBillBoxVisible: false,
      editPartData: {},
      partDetailBoxVisible: false
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    canShowPartDetailBox() {
      return this.selectedRows.length === 1;
    },
    baseColumns() {
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.showPartDetailBox();
      };
      return TABLE_DISPATCH_PENDING_LIST.columns.map(item => {
        if (item.prop === "labels") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {value && value.length
                  ? value.map(label => (
                      <span style="margin-right: 10px">
                        <el-tooltip placement="top" enterable={false}>
                          <span slot="content">{TAG_TOOLTIP[label]}</span>
                          {label === "图" ? (
                            <el-button
                              type="primary"
                              circle
                              size="mini"
                              on-click={e => handlePartDetailChange(row, e)}
                            >
                              {label}
                            </el-button>
                          ) : (
                            <span class="label-style">{label}</span>
                          )}
                        </el-tooltip>
                      </span>
                    ))
                  : null}
              </div>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "/PurchaseDispatch" &&
        to.query.tabName === "PendingList" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    selectedRows(val) {
      if (val.length) {
        this.partId = val[0].partId;
      } else {
        this.partId = 0;
      }
    },
    billQueryDefaultDateRange(val) {
      defaultSearchForm.billDate = val;
      this.searchForm.billDate = val;
    }
  },
  mounted() {
    defaultSearchForm.billDate = this.billQueryDefaultDateRange;
    this.resetHandle();
  },
  activated() {
    this.toDoHandle();
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
    store() {
      return store;
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "handlePurchaseDispatch" && jumpData) {
        this.searchForm = {
          ...defaultSearchForm,
          billNo: jumpData,
          billDate: []
        };
        this.$emit("get-jump-id", jumpId);
        baseIndexJump.clearInfo();
        this.searchHandle();
      } else {
        this.$nextTick(() => {
          this.searchHandle();
        });
      }
    },
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 28);
    },
    rowOperation(row) {
      this.selectedRows = [row];
      this.clickCreate();
    },
    columnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    searchHandle() {
      this.searchForm.page = 1;
      this.pageChange(this.searchForm.page);
    },
    pageChange(page = 1) {
      this.currentPage = page;
      const req = { ...this.searchForm };
      req.page = this.currentPage;
      req.pageSize = this.pageSize;
      if (req.billDate && req.billDate.length) {
        if (req.dateType == "bill") {
          req.billDateStart = req.billDate[0];
          req.billDateEnd = req.billDate[1];
          delete req.createdAtStart;
          delete req.createdAtEnd;
        } else {
          req.createdAtStart = req.billDate[0];
          req.createdAtEnd = req.billDate[1];
          delete req.billDateStart;
          delete req.billDateEnd;
        }
      }
      delete req.billDate;
      this.tabLoading = true;
      reqPendingSalesList(req)
        .then(data => {
          if (!data.rows) {
            this.tableData = [];
            this.tabTotal = 0;
            this.selectedRows = [];
            this.tabLoading = false;
            return;
          }
          data.rows.forEach(item => {
            item.details = [];
            item.selectIds = [];
          });
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
          this.tabTotal = data.totalSize;
          this.tabLoading = false;
        })
        .catch(() => {
          this.tabLoading = false;
        });
    },

    clickCreate() {
      if (!this.selectedRows || !this.selectedRows.length) {
        return;
      }
      const noPerm = this.getNoPermList();
      if (noPerm && noPerm.length) {
        const msg = `配件（${noPerm
          .slice(0, 10)
          .map(item => item.code)
          .join("，")}${
          noPerm.length > 10 ? "等" : ""
        }）您无权生成急件到货单，请重新选择！`;
        this.$alert(msg, "提示");
        return;
      }
      if (this.selectedRows.length == 1) {
        this.createArrivalHandle(this.selectedRows[0]);
      } else {
        this.createUrgentBillBoxVisible = true;
      }
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    },
    getSearchForm() {
      return this.$refs.searchForm;
    },

    createArrivalHandle(row) {
      this.editPartData = {
        taxedPrice: row.taxedPurchasePrice,
        urgentId: row.id,
        partId: row.partId,
        name: row.name,
        code: row.code,
        brand: row.brand,
        productionPlace: row.productionPlace,
        qty: row.qty,
        cooperatorId: row.supplierId,
        cooperatorName: row.supplierName,
        belongs: row.belongs
      };
      this.editUrgentBillBoxVisible = true;
    },
    hasHandlePerm() {
      const noPerm = this.getNoPermList();
      return !noPerm || !noPerm.length;
    },
    getNoPermList() {
      return this.selectedRows.filter(
        item =>
          !this.hasBelongsPermWithoutRoute(
            "create",
            "purchases.urgents.confirmAndCreate",
            // 只操作自己公司的单据，有其他分公司权限不可操作
            item.belongs && item.belongs.length ? item.belongs : ["null"]
          )
      );
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partDetailBoxVisible = true;
    }
  }
};
</script>
