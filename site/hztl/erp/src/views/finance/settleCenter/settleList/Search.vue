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
        <el-form-item label-width="110px">
          <ht-select
            slot="label"
            v-model="searchForm.dateType"
            :options="dateTypes"
            :clearable="false"
            class="date-label"
          />
          <ht-date-range v-model="searchForm.timeRange" shortcuts-type="all" />
        </el-form-item>
        <el-form-item label="往来单位" prop="cooperatorId" label-width="110px">
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
        <el-form-item label-width="110px" label="交易对象" prop="tradingManId">
          <ht-autoselect
            v-model="searchForm.tradingManId"
            :options="store().allStaffs()"
            :trigger-on-focus="false"
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="来源单号" prop="sourceBillNo">
          <ht-input
            v-model="searchForm.sourceBillNo"
            placeholder="对账单号/业务单号"
          />
        </el-form-item>
        <el-form-item label="来源类型" prop="sourceTypes">
          <ht-select
            v-model="searchForm.sourceTypes"
            :options="SOURCE_TYPES"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
        <el-form-item label="结算单号" prop="billNo">
          <ht-input v-model="searchForm.billNo" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="结算单位" prop="settleCooperatorName">
          <ht-autoselect
            v-model="searchForm.settleCooperatorName"
            :fetch-suggestions="query => searchLoadCooperatorsBranches(query)"
            :trigger-on-focus="false"
            remote
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="结算公司" prop="companyId">
          <ht-autoselect
            v-model="searchForm.companyId"
            :options="store().allCompanies()"
            :trigger-on-focus="false"
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="收付类型" prop="paymentTypes">
          <ht-select
            v-model="searchForm.paymentTypes"
            :options="PAYMENT_TYPES"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item
          label="显示反结算记录"
          label-width="110px"
          prop="isShowUnsettle"
        >
          <el-switch v-model="searchForm.isShowUnsettle" />
        </el-form-item>
        <el-form-item class="placeholder-form-item">
          <br class="placeholder-form-item" />
        </el-form-item>
        <el-form-item label-width="0" class="form-search-btn-group">
          <el-popover placement="top" width="500" trigger="click">
            <p>
              系统中产生的收付款都将在结算中心进行出纳结算。若结算错误，可进入结算单查询功能页查找结算错误单据点击反结算，即可在结算中心重新结算该笔业务单据。
            </p>
            <span
              slot="reference"
              class="text-danger"
              style="cursor:pointer;padding-right:10px;"
            >
              <i class="el-icon-question"></i>
            </span>
          </el-popover>
          <el-button type="primary" size="mini" @click="queryData">
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click="clearDefine">
            重置（F6）
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/utils/date";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

const sourceTypeInYX = [
  { id: 1, name: "销售现付" },
  { id: 2, name: "采购现付" },
  { id: 3, name: "应收付对账" },
  { id: 4, name: "代收对账" },
  { id: 5, name: "费用" },
  { id: 6, name: "佣金" },
  { id: 7, name: "调拨对账" },
  { id: 8, name: "预收" },
  { id: 9, name: "预付" },
  { id: 10, name: "预收冲销" },
  { id: 11, name: "预付冲销" },
  { id: 12, name: "维修现付" },
  { id: 13, name: "洗车现付" }
];
const sourceType = [
  { id: 1, name: "销售现付" },
  { id: 2, name: "采购现付" },
  { id: 3, name: "应收付对账" },
  { id: 4, name: "代收对账" },
  { id: 5, name: "费用" },
  { id: 6, name: "佣金" },
  { id: 7, name: "调拨对账" },
  { id: 8, name: "预收" },
  { id: 9, name: "预付" },
  { id: 10, name: "预收冲销" },
  { id: 11, name: "预付冲销" }
];
const PAYMENT_TYPES = ["收款", "付款", "收付抵消"];
const defaultSearchForm = {
  dateType: 0,
  cooperatorId: null,
  settleCooperatorName: "",
  billNo: null,
  sourceBillNo: null,
  companyId: null,
  tradingManId: null,
  sourceTypes: sourceType.map(item => item.id),
  paymentTypes: Object.keys(PAYMENT_TYPES).map(key => Number(key)),
  timeRange: [],
  isShowUnsettle: false
};

export default {
  mixins: [searchMixin],
  data() {
    return {
      sourceTypeInYX,
      sourceType,
      PAYMENT_TYPES,
      searchForm: {
        ...defaultSearchForm
      },
      dateTypes: ["结算日期", "对账/业务日期", "制单日期"]
    };
  },
  computed: {
    ...mapGetters("admin/systemParams", ["sumQueryDefaultDateRange"]),
    SOURCE_TYPES() {
      return store.isYx() ? sourceTypeInYX : sourceType;
    }
  },
  watch: {
    sumQueryDefaultDateRange(val) {
      defaultSearchForm.timeRange = val;
      this.searchForm.timeRange = val;
    }
  },
  mounted() {
    defaultSearchForm.timeRange = this.sumQueryDefaultDateRange;
    if (store.isYx()) {
      this.searchForm = JSON.parse(
        JSON.stringify({
          ...this.searchForm,
          sourceTypes: sourceTypeInYX.map(item => item.id)
        })
      );
      this.$nextTick(() => {
        this.searchForm.sourceTypes = sourceTypeInYX.map(item => item.id);
      });
      this.queryData();
    } else {
      this.queryData();
    }
    this.clearDefine();
  },
  methods: {
    store() {
      return store;
    },
    keyboardListener(e) {
      switch (e.code) {
        case "F5":
          this.queryData();
          break;
        case "F6":
          this.clearDefine();
          break;
        default:
          return;
      }
    },
    queryData() {
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
      }
      searchForm.companyId = undefined;

      this.$emit("query-data", {
        ...searchForm
      });
    },
    clearDefine() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
