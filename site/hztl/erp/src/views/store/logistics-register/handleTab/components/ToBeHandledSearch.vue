<template>
  <el-form
    :model="searchForm"
    class="form-item-small-margin-bottom"
    label-position="left"
    label-width="60px"
    size="mini"
  >
    <el-row :gutter="10">
      <el-col :span="5">
        <el-form-item label="业务日期" prop="timeRange">
          <ht-date-range v-model="searchForm.timeRange" shortcuts-type="all" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="往来单位" prop="cooperatorId">
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
      </el-col>
      <el-col :span="4">
        <el-form-item label="单据号" prop="billNo" label-width="45px">
          <ht-input v-model="searchForm.billNo" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="业务公司" prop="companyIds">
          <ht-select
            v-model="searchForm.companyIds"
            :options="store().allCompanies()"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="只查代收" prop="onlyCollection">
          <el-switch v-model="searchForm.onlyCollection" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <div>
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
import baseIndexJump from "@/utils/baseIndexJump";
import * as store from "@/utils/store";

const defaultSearchForm = {
  timeRange: [],
  cooperatorId: null,
  billNo: "",
  companyIds: [],
  onlyCollection: true
};

export default {
  name: "ToBeHandledSearch",
  mixins: [searchMixin],
  data() {
    return {
      searchForm: {
        ...defaultSearchForm
      },
      dateTypes: ["登记日期", "发货日期"]
    };
  },
  computed: {
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"])
  },
  watch: {
    $route(to, from) {
      if (
        ["DeliverTab", "ReceiveTab"].includes(to.path) &&
        to.query.tabName === "ToBeHandle" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    billQueryDefaultDateRange(val) {
      defaultSearchForm.timeRange = val;
      this.searchForm.timeRange = val;
    }
  },
  mounted() {
    defaultSearchForm.timeRange = this.billQueryDefaultDateRange;
    this.resetHandle();
    this.toDoHandle();
  },
  methods: {
    store() {
      return store;
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "logisticsRegisterToBeHandle" && jumpData) {
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
          startDate: dateFormat(searchForm.timeRange[0]),
          endDate: dateFormat(searchForm.timeRange[1])
        };
      }
      searchForm.timeRange = undefined;
      this.$emit("on-search", searchForm);
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
