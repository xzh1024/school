<template>
  <el-form
    :model="searchForm"
    class="form-item-small-margin-bottom"
    label-position="left"
    label-width="60px"
    size="mini"
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
          <ht-date-range v-model="searchForm.timeRange" shortcuts-type="all" />
        </el-form-item>
        <el-form-item label="往来单位" prop="cooperatorId" label-width="75px">
          <ht-autoselect
            v-model="searchForm.cooperatorId"
            :fetch-suggestions="query => searchLoadAllTypesCooperators(query)"
            :trigger-on-focus="false"
            remote
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="来源公司" prop="companyId" label-width="75px">
          <ht-autoselect
            v-model="searchForm.companyId"
            :options="store().allCompanies()"
            :trigger-on-focus="false"
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="来源单号" prop="billNo">
          <ht-input
            v-model="searchForm.billNo"
            placeholder="对账单号/业务单号"
          />
        </el-form-item>
        <el-form-item label="来源类型" prop="businessTypes">
          <ht-select
            id="name"
            v-model="searchForm.businessTypes"
            :options="billTypes"
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
        <el-form-item label="单据状态" prop="settleStatuses">
          <ht-select
            v-model="searchForm.settleStatuses"
            :options="settleStatuses"
            has-selecte-all-val
            multiple
            collapse-tags
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="经办人" prop="handleBy">
          <ht-autoselect
            v-model="searchForm.handleBy"
            :options="store().allStaffs()"
            :trigger-on-focus="false"
            clearable
            highlight-first-item
          />
        </el-form-item>
        <el-form-item
          v-if="showTradingMan"
          label="交易对象"
          prop="tradingManId"
        >
          <ht-autoselect
            v-model="searchForm.tradingManId"
            :options="store().allStaffs()"
            :trigger-on-focus="false"
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>

        <el-form-item v-else class="placeholder-form-item">
          <br class="placeholder-form-item" />
        </el-form-item>
        <el-form-item label-width="0" style="text-align: right;">
          <el-popover placement="top" width="500" trigger="click">
            <p>
              系统中产生的收付款都将在结算中心进行出纳结算。若结算错误，可进入结算单查询功能页查找结算错误单据点击反结算，即可在结算中心重新结算该笔业务单据。
            </p>
            <span
              slot="reference"
              class="text-danger"
              style="cursor:pointer;padding-right:10px"
              ><i class="el-icon-question"></i>
            </span>
          </el-popover>
          <el-button type="primary" size="mini" @click="searchHandle">
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click="resetHandle">
            重置（F6）
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { SEETTLE_BILL_TYPES, SETTLE_BILL_YX_TYPES } from "@/constants";
import { dateFormat } from "@/utils/date";
import { searchMixin } from "@/mixins";
import baseIndexJump from "@/utils/baseIndexJump";
import * as store from "@/utils/store";

const settleStatuses = ["待结算", "部分结算", "收款驳回"];
const defaultSearchForm = {
  dateType: 1,
  cooperatorId: null,
  tradingManId: null,
  billNo: "",
  handleBy: null,
  companyId: null,
  businessTypes: [],
  settleStatuses: Object.keys(settleStatuses).map(key => Number(key)),
  timeRange: []
};

export default {
  mixins: [searchMixin],
  props: {
    activeTab: String
  },
  data() {
    return {
      SEETTLE_BILL_TYPES,
      settleStatuses,
      searchForm: {
        ...defaultSearchForm,
        businessTypes: store.isYx()
          ? [...SETTLE_BILL_YX_TYPES]
          : [...SEETTLE_BILL_TYPES]
      },
      dateTypes: ["制单日期", "业务日期"]
    };
  },
  computed: {
    ...mapState("admin/staffs", ["allStaffs"]),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    showTradingMan() {
      return "pay" === this.activeTab;
    },
    billTypes() {
      return store.isYx() ? [...SETTLE_BILL_YX_TYPES] : [...SEETTLE_BILL_TYPES];
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "/SettleCenter" &&
        to.query.tabName === "SettleCenter" &&
        ["pay", "charge", "collect", "transfer"].includes(
          to.query.childTabName
        ) &&
        ["0", "1"].includes(to.query.grandChildTabName) &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    activeTab() {
      this.searchHandle();
    },
    billQueryDefaultDateRange(val) {
      defaultSearchForm.timeRange = val;
      this.searchForm.timeRange = val;
    }
  },
  mounted() {
    defaultSearchForm.timeRange = this.billQueryDefaultDateRange;
    defaultSearchForm.businessTypes = store.isYx()
      ? [...SETTLE_BILL_YX_TYPES]
      : [...SEETTLE_BILL_TYPES];
    this.resetHandle();
    this.toDoHandle();
  },
  activated() {
    const { jumpId } = baseIndexJump.getInfo();
    if (jumpId !== "settle") {
      this.searchHandle();
    }
  },
  methods: {
    store() {
      return store;
    },
    keyboardListener(e) {
      switch (e.code) {
        case "F5":
          this.searchHandle();
          break;
        case "F6":
          this.resetHandle();
          break;
        default:
          return;
      }
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "settle" && jumpData) {
        this.$emit("billNoChange", jumpData);
        this.searchForm = {
          ...defaultSearchForm,
          billNo: jumpData,
          timeRange: []
        };
        baseIndexJump.clearInfo();
        this.searchHandle();
      }
    },
    searchHandle() {
      let searchForm = { ...this.searchForm };
      // 处理数据格式
      if (searchForm.timeRange && searchForm.timeRange.length) {
        searchForm = {
          ...searchForm,
          fromDate: dateFormat(searchForm.timeRange[0]),
          toDate: dateFormat(searchForm.timeRange[1])
        };
      }
      searchForm.timeRange = undefined;
      if (searchForm.companyId) {
        searchForm.companyIds = [searchForm.companyId];
      } else {
        searchForm.companyIds = [];
      }
      searchForm.companyId = undefined;
      this.$emit("query-data", {
        ...searchForm,
        tradingManId: this.showTradingMan ? searchForm.tradingManId : undefined
      });
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
