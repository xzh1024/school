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
            filterable
          />
          <ht-date-range v-model="searchForm.timeRange" shortcuts-type="all" />
        </el-form-item>
        <el-form-item label="单号查询" prop="billNo" label-width="75px">
          <ht-input v-model="searchForm.billNo" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="对账公司" prop="companyIds">
          <ht-select
            v-model="searchForm.companyIds"
            :options="store().allCompanies()"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
        <el-form-item label="物流公司" prop="logisticId">
          <ht-autoselect
            v-model="searchForm.logisticId"
            :fetch-suggestions="
              query => searchLoadAllLogisticsCooperators(query)
            "
            :trigger-on-focus="false"
            remote
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="对账状态" prop="statuses">
          <ht-select
            v-model="searchForm.statuses"
            :options="PAYMENT_BILL_STATUS"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
        <el-form-item label="打印状态" prop="printStatuses">
          <ht-select
            v-model="searchForm.printStatuses"
            :options="PRINT_STATUS"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="经办人" prop="operator">
          <ht-autocomplete
            v-model="searchForm.operator"
            :fetch-suggestions="autocompleteSearchStaffs"
            :trigger-on-focus="false"
            clearable
            highlight-first-item
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
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/utils/date";
import { searchMixin } from "@/mixins";
import { PAYMENT_BILL_STATUS, PRINT_STATUS } from "@/constants";
import baseIndexJump from "@/utils/baseIndexJump";
import * as store from "@/utils/store";

const defaultSearchForm = {
  dateType: 0,
  timeRange: [],
  companyIds: [],
  logisticId: null,
  operator: "",
  statuses: Object.keys(PAYMENT_BILL_STATUS).map(key => Number(key)),
  printStatuses: [0, 1],
  billNo: ""
};

export default {
  name: "Search",
  mixins: [searchMixin],
  props: {
    isTake: Boolean
  },
  data() {
    return {
      searchForm: {
        ...defaultSearchForm
      },
      PAYMENT_BILL_STATUS,
      PRINT_STATUS,
      dateTypes: [
        { id: 0, name: "对账日期" },
        { id: 1, name: "制单时间" }
      ]
    };
  },
  computed: {
    ...mapGetters("admin/systemParams", ["sumQueryDefaultDateRange"])
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "/CollectionStatement" &&
        to.query.tabName === "Statement" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    sumQueryDefaultDateRange(val) {
      defaultSearchForm.timeRange = val;
      this.searchForm.timeRange = val;
    }
  },
  mounted() {
    defaultSearchForm.timeRange = this.sumQueryDefaultDateRange;
    this.resetHandle();
    this.toDoHandle();
  },
  methods: {
    store() {
      return store;
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "collectionStatement" && jumpData) {
        this.searchForm = {
          ...defaultSearchForm,
          billNo: jumpData,
          timeRange: []
        };
        baseIndexJump.clearInfo();
        this.searchHandle();
      } else {
        this.searchHandle();
      }
    },
    searchHandle() {
      let searchForm = { ...this.searchForm };
      if (searchForm.timeRange && searchForm.timeRange.length) {
        searchForm = {
          ...searchForm,
          fromDate: dateFormat(searchForm.timeRange[0]),
          toDate: dateFormat(searchForm.timeRange[1])
        };
      }
      searchForm.timeRange = undefined;
      this.$emit("on-search", { ...searchForm });
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
