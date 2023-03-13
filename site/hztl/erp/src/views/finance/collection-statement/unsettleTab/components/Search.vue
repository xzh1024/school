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
        <el-form-item label="业务日期">
          <ht-date-range v-model="searchForm.timeRange" shortcuts-type="all" />
        </el-form-item>
        <el-form-item label="业务公司">
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
      <el-col :span="6">
        <el-form-item label="物流公司">
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
        <el-form-item label="往来单位">
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
      <el-col :span="5">
        <el-form-item label="帐目类型">
          <ht-select
            v-model="searchForm.accountType"
            :options="ACCOUNT_TYPES"
            placeholder="帐目类型"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
        <div style="text-align: right;">
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
import { dateFormat } from "@/utils/date";
import { searchMixin } from "@/mixins";
import { ACCOUNT_TYPES } from "@/views/finance/constans";
import * as store from "@/utils/store";

const defaultSearchForm = {
  timeRange: [],
  logisticId: null,
  cooperatorId: null,
  companyIds: [],
  accountType: [0, 1]
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
      ACCOUNT_TYPES
    };
  },
  mounted() {
    this.searchHandle();
  },
  methods: {
    store() {
      return store;
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
      this.$emit("on-search", searchForm);
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
