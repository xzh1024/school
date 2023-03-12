<template>
  <div class="container-box">
    <ht-card>
      <el-button
        :disabled="!toGetPermRows.length || !hasHandlePerm()"
        type="primary"
        size="mini"
        @click.stop="clickConfirm"
      >
        确认（F7）
      </el-button>
      <el-button
        :disabled="!toGetPermRows.length || !hasHandlePerm()"
        type="primary"
        size="mini"
        @click.stop="clickReject"
      >
        拒绝（F9）
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
                    placeholder="业务单号"
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
    <ht-card :no-padding="true" class="auto-card">
      <div class="flex-container column-flex">
        <ht-tabs
          v-model="activeTab"
          :tabs="tabs"
          class="tabs-regular"
          @change="changeTab"
        />

        <el-row v-show="activeTab === 'Sale'" :gutter="10" class="auto-block">
          <el-col :span="12" style="height:100%">
            <ht-table
              v-loading="loading"
              :data="dataByBill"
              :columns="columnsByBill"
              :selected-rows.sync="selectedRowsByBill"
              :index-column="false"
              :total="totalSizeByBill"
              :current-page="currentPageByBill"
              pagination
              selection-type="multiple"
              setting-allcolumn
              show-table-setting
              @selectChange="selectChangeByBill"
              @table-setting="editColumnsVisibleByBill = true"
              @pageChange="pageChange"
            />
            <edit-columns
              :base-columns="baseColumnsByBill"
              :table-name="tableNameByBill"
              :visible.sync="editColumnsVisibleByBill"
              @columns-change="columnsChangeByBill"
            />
          </el-col>
          <el-col :span="12" style="height:100%">
            <ht-table
              v-loading="loading"
              :data="dataByBillDetail"
              :columns="columnsByBillDetail"
              :selected-rows.sync="selectedRowsByBillDetail"
              :index-column="false"
              selection-type="multiple"
              setting-allcolumn
              show-table-setting
              @table-setting="editColumnsVisibleByBillDetail = true"
            />
            <edit-columns
              :base-columns="baseColumnsByBillDetail"
              :table-name="tableNameByBillDetail"
              :visible.sync="editColumnsVisibleByBillDetail"
              @columns-change="columnsChangeByBillDetail"
            />
          </el-col>
        </el-row>

        <el-row v-show="activeTab === 'Part'" :gutter="10" class="auto-block">
          <el-col :span="12" style="height:100%">
            <ht-table
              v-loading="loading"
              :data="dataByPart"
              :columns="columnsByPart"
              :selected-rows.sync="selectedRowsByPart"
              :index-column="false"
              :total="totalSizeByPart"
              :current-page="currentPageByPart"
              pagination
              selection-type="multiple"
              setting-allcolumn
              show-table-setting
              @selectChange="selectChangeByPart"
              @table-setting="editColumnsVisibleByPart = true"
              @pageChange="pageChange"
            />
            <edit-columns
              :base-columns="baseColumnsByPart"
              :table-name="tableNameByPart"
              :visible.sync="editColumnsVisibleByPart"
              @columns-change="columnsChangeByPart"
            />
          </el-col>
          <el-col :span="12" style="height:100%">
            <ht-table
              v-loading="loading"
              :data="dataByPartDetail"
              :columns="columnsByPartDetail"
              :selected-rows.sync="selectedRowsByPartDetail"
              :index-column="false"
              selection-type="multiple"
              setting-allcolumn
              show-table-setting
              @table-setting="editColumnsVisibleByPartDetail = true"
            />
            <edit-columns
              :base-columns="baseColumnsByPartDetail"
              :table-name="tableNameByPartDetail"
              :visible.sync="editColumnsVisibleByPartDetail"
              @columns-change="columnsChangeByPartDetail"
            />
          </el-col>
        </el-row>
      </div>
    </ht-card>

    <RejectBox
      :visible.sync="rejectVisible"
      :ids="currentUrgentIds"
      @sure="handleRejectSure"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
  </div>
</template>
<script>
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import RejectBox from "./RejectBox";
import {
  reqConfirmBatchResolve,
  reqConfirmPartsDetails,
  reqConfirmPartsList,
  reqConfirmSalesDetails,
  reqConfirmSalesList
} from "@/api/purchase/purchaseDispatch/confirm";
import { mapState, mapGetters } from "vuex";
import { searchMixin, tabChangeMixin } from "@/mixins";
import { EditColumns } from "@/components/table";
import eventBus from "@/event";
import baseIndexJump from "@/utils/baseIndexJump";
import {
  PURCHASE_DISPATCH_BY_BILL_DETAIL,
  PURCHASE_DISPATCH_BY_BILL_LIST,
  PURCHASE_DISPATCH_BY_PART_DETAIL,
  PURCHASE_DISPATCH_BY_PART_LIST
} from "@/views/purchase/constants";
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
  name: "ConfirmList",
  components: {
    EditColumns,
    RejectBox,
    PartsDetailBox
  },
  mixins: [searchMixin, tabChangeMixin],
  data() {
    return {
      routeParamsName: "childTabName",
      defaultTab: "Sale",
      tabs: [
        { id: "Sale", name: "按单据分组" },
        { id: "Part", name: "按配件分组" }
      ],
      sourceTypes: [
        { id: "销售单", name: "销售单" },
        { id: "维修工单", name: "维修工单" }
      ],
      searchForm: { ...defaultSearchForm },
      dateTypes: [
        { id: "bill", name: "业务日期" },
        { id: "create", name: "制单日期" }
      ],
      loading: false,

      tableNameByBill: "PurchaseDispatchConfirmListByBill",
      tableNameByBillDetail: "PurchaseDispatchConfirmListByBillDetail",
      tableNameByPart: "PurchaseDispatchConfirmListByPart",
      tableNameByPartDetail: "PurchaseDispatchConfirmListByPartDetail",

      totalSizeByBill: 0,
      currentPageByBill: 1,
      totalSizeByPart: 0,
      currentPageByPart: 1,

      dataByBill: [],
      dataByBillDetail: [],
      dataByPart: [],
      dataByPartDetail: [],

      columnsByBill: [],
      columnsByPart: [],
      columnsByBillDetail: [],
      columnsByPartDetail: [],
      baseColumnsByBill: PURCHASE_DISPATCH_BY_BILL_LIST.columns,
      baseColumnsByPartDetail: PURCHASE_DISPATCH_BY_PART_DETAIL.columns,
      selectedRowsByBill: [],
      selectedRowsByBillDetail: [],
      selectedRowsByPart: [],
      selectedRowsByPartDetail: [],
      editColumnsVisibleByBillDetail: false,
      editColumnsVisibleByBill: false,
      editColumnsVisibleByPartDetail: false,
      editColumnsVisibleByPart: false,
      rejectVisible: false,
      partDetailBoxVisible: false,
      partId: null
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    currentUrgentIds() {
      const ids = [];
      let rows = [];
      if (this.activeTab === "Sale") {
        rows = this.selectedRowsByBillDetail || [];
      } else {
        rows = this.selectedRowsByPartDetail || [];
      }
      rows.forEach(obj => {
        ids.push(obj.id);
      });
      return ids;
    },
    toGetPermRows() {
      if (this.activeTab === "Sale") {
        return this.selectedRowsByBill || [];
      } else {
        return this.selectedRowsByPartDetail || [];
      }
    },
    canShowPartDetailBox() {
      if (this.activeTab === "Sale") {
        return (
          this.selectedRowsByBillDetail &&
          this.selectedRowsByBillDetail.length === 1
        );
      } else {
        return (
          this.selectedRowsByPartDetail &&
          this.selectedRowsByPartDetail.length === 1
        );
      }
    },
    baseColumnsByBillDetail() {
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.partId = row.partId;
        this.partDetailBoxVisible = true;
      };
      return PURCHASE_DISPATCH_BY_BILL_DETAIL.columns.map(item => {
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
    },
    baseColumnsByPart() {
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.partId = row.partId;
        this.partDetailBoxVisible = true;
      };
      return PURCHASE_DISPATCH_BY_PART_LIST.columns.map(item => {
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
        to.query.tabName === "ConfirmList" &&
        to.query.childTabName === "Sale" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    activeTab() {
      this.toDoHandle();
      this.$nextTick(() => {
        this.searchHandle();
      });
    },
    selectedRowsByBillDetail(val) {
      if (val.length === 1) {
        this.partId = val[0].partId;
      } else {
        this.partId = null;
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
    this.searchHandle();
  },
  methods: {
    store() {
      return store;
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "confirmPurchaseDispatch" && jumpData) {
        this.searchForm = {
          ...defaultSearchForm,
          billNo: jumpData,
          billDate: []
        };
        this.$emit("get-jump-id", jumpId);
        baseIndexJump.clearInfo();
      }
    },
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 28);
    },
    columnsChangeByBill(columns) {
      this.columnsByBill = [];
      this.$nextTick(() => {
        this.columnsByBill = columns;
      });
    },
    columnsChangeByBillDetail(columns) {
      this.columnsByBillDetail = [];
      this.$nextTick(() => {
        this.columnsByBillDetail = columns;
      });
    },
    columnsChangeByPart(columns) {
      this.columnsByPart = [];
      this.$nextTick(() => {
        this.columnsByPart = columns;
      });
    },
    columnsChangeByPartDetail(columns) {
      this.columnsByPartDetail = [];
      this.$nextTick(() => {
        this.columnsByPartDetail = columns;
      });
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    },
    searchHandle() {
      return this.pageChange(1);
    },
    pageChange(page) {
      this.loading = true;
      const req = this.makeReq();
      req.pageSize = this.pageSize;
      if (this.activeTab === "Sale") {
        // 按销售单分组
        this.currentPageByBill = page;
        req.page = this.currentPageByBill;
        return reqConfirmSalesList(req)
          .then(data => {
            this.dataByBill = data.rows || [];
            this.totalSizeByBill = data.totalSize;
            let selectedRow;
            if (this.selectedRowsByBill.length) {
              selectedRow = this.dataByBill.find(
                item => item.id === this.selectedRowsByBill[0].id
              );
            }
            this.selectedRowsByBill = selectedRow
              ? [selectedRow]
              : this.dataByBill.length
              ? [this.dataByBill[0]]
              : [];
            this.selectChangeByBill(this.selectedRowsByBill);
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.currentPageByPart = page;
        req.page = this.currentPageByPart;
        return reqConfirmPartsList(req)
          .then(data => {
            this.dataByPart = data.rows || [];
            this.totalSizeByPart = data.totalSize;
            let selectedRow;
            if (this.selectedRowsByPart.length) {
              selectedRow = this.dataByPart.find(
                item => item.id === this.selectedRowsByPart[0].id
              );
            }
            this.selectedRowsByPart = selectedRow
              ? [selectedRow]
              : this.dataByPart.length
              ? [this.dataByPart[0]]
              : [];
            this.selectChangeByPart(this.selectedRowsByPart);
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    selectChangeByBill(rows) {
      this.dataByBillDetail = [];

      if (rows.length > 0) {
        const req = { bills: [] };
        rows.forEach(obj => {
          req.bills.push({
            sourceType: obj.sourceType,
            sourceBillId: obj.sourceBillId
          });
        });
        reqConfirmSalesDetails(req)
          .then(data => {
            this.dataByBillDetail = data.rows || [];
            this.selectedRowsByBillDetail = this.dataByBillDetail;
          })
          .catch(() => {});
      }
    },
    selectChangeByPart(rows) {
      this.dataByPartDetail = [];
      if (rows.length > 0) {
        const req = { parts: [] };
        rows.forEach(obj => {
          req.parts.push({
            companyId: obj.companyId,
            partId: obj.partId,
            warehouseId: obj.warehouseId
          });
        });
        reqConfirmPartsDetails(req)
          .then(data => {
            this.dataByPartDetail = data.rows || [];
            this.selectedRowsByPartDetail = this.dataByPartDetail;
          })
          .catch(() => {});
      }
      if (rows.length === 1) {
        this.partId = rows[0].partId;
      } else {
        this.partId = null;
      }
    },
    makeReq() {
      const req = { ...this.searchForm };
      req.page = 1;
      try {
        if (req.dateType == "bill") {
          req.billDateStart = req.billDate[0];
          req.billDateEnd = req.billDate[1];
        } else {
          req.createdAtStart = req.billDate[0];
          req.createdAtEnd = req.billDate[1];
        }
      } catch (err) {
        //
      }
      delete req.dateType;
      delete req.billDate;
      return req;
    },

    clickConfirm() {
      if (!this.toGetPermRows || !this.toGetPermRows.length) {
        return;
      }
      const noPerm = this.getNoPermList();
      if (noPerm && noPerm.length) {
        const msg = `单据（${noPerm
          .slice(0, 10)
          .map(item => item.billNo)
          .join("，")}${
          noPerm.length > 10 ? "等" : ""
        }）您无权确认，请重新选择！`;
        this.$alert(msg, "提示");
        return;
      }
      const req = { ids: this.currentUrgentIds };
      reqConfirmBatchResolve(req)
        .then(() => {
          this.$message({
            type: "success",
            message: "急件已确认"
          });
          this.searchHandle();
        })
        .catch(() => {});
    },
    clickReject() {
      if (!this.toGetPermRows || !this.toGetPermRows.length) {
        return;
      }
      const noPerm = this.getNoPermList();
      if (noPerm && noPerm.length) {
        const msg = `单据（${noPerm
          .slice(0, 10)
          .map(item => item.billNo)
          .join("，")}${
          noPerm.length > 10 ? "等" : ""
        }）您无权拒绝，请重新选择！`;
        this.$alert(msg, "提示");
        return;
      }
      this.rejectVisible = true;
    },
    hasHandlePerm() {
      const noPerm = this.getNoPermList();
      return !noPerm || !noPerm.length;
    },
    getNoPermList() {
      return this.toGetPermRows.filter(
        item =>
          !this.hasBelongsPermWithoutRoute(
            "confirm",
            "purchases.urgents.confirmAndCreate",
            item.belongs
          )
      );
    },
    handleRejectSure() {
      this.rejectVisible = false;
      this.searchHandle();
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
