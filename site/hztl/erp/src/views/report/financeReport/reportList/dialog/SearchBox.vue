<template>
  <ht-dialog
    v-bind="$attrs"
    title="数据查询"
    width="400px"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      :model="searchForm"
      submit-on-enter
      label-width="135px"
      class="form-item-small-margin-bottom display_none mt-1"
      size="mini"
    >
      <el-form-item label="分公司">
        <ht-select
          v-model="searchForm.companyIds"
          :options="allCompaniesWithPerm"
          placeholder="分公司"
          clearable
          filterable
          multiple
          collapse-tags
          has-selecte-all-val
        />
      </el-form-item>
      <el-form-item label="业务日期">
        <ht-date-range v-model="searchForm.billDate" shortcuts-type="all" />
      </el-form-item>
      <el-form-item label="结算日期">
        <ht-date-range
          v-model="searchForm.settlementDate"
          shortcuts-type="all"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ht-autoselect
          v-model="searchForm.cooperatorId"
          :fetch-suggestions="searchLoadAllCustromerCooperators"
          :trigger-on-focus="false"
          filterZero
          remote
          clearable
          highlight-first-item
          placeholder="客户名称"
        />
      </el-form-item>
      <el-form-item label="客户区域">
        <area-select
          v-model="searchForm.cooperatorAreaId"
          :props="{ checkStrictly: true }"
          clearable
        />
      </el-form-item>
      <el-form-item label="业务员">
        <ht-autoselect
          v-model="searchForm.businessManId"
          :fetch-suggestions="searchLoadAllBusinessMen"
          :trigger-on-focus="false"
          placeholder="请选择"
          remote
          clearable
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="制单人">
        <ht-autoselect
          v-model="searchForm.createdManId"
          :fetch-suggestions="query => searchLoadAllCreatedMen([], query)"
          :trigger-on-focus="false"
          placeholder="请选择"
          remote
          clearable
          highlight-first-item
        />
      </el-form-item>
      <el-form-item class="no-margin">
        <ht-select
          v-model="searchForm.index"
          placeholder="销售金额"
          :clearable="false"
          :options="AMOUNT_INDEX"
          style="width:135px"
        />
        <ht-select
          v-model="searchForm.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:65px"
        />
        <ht-input v-model="searchForm.indexValue" style="width:180px">
        </ht-input>
      </el-form-item>

      <div style="margin-top: 10px; text-align: center;">
        <el-button type="primary" plain size="mini" @click.stop="searchHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click.stop="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </el-form>
  </ht-dialog>
</template>

<script>
import AreaSelect from "@/components/select/AreaSelect";
import { searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";
import { INDEX_PATTERN } from "../../../group";
import { AMOUNT_INDEX } from "../../group";
import * as store from "@/utils/store";

const defaultSearchForm = {
  companyIds: [],
  billDate: [dateFormat(new Date()), dateFormat(new Date())],
  settlementDate: [dateFormat(new Date()), dateFormat(new Date())],
  cooperatorAreaId: null,
  businessMan: null,
  createdManId: null,
  index: "saleTaxedAmount",
  indexPattern: 0,
  indexValue: ""
};

export default {
  name: "SearchBox",
  components: { AreaSelect },
  mixins: [searchMixin],
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      cooperatorAreaId: [],
      AMOUNT_INDEX,
      INDEX_PATTERN
    };
  },
  methods: {
    store() {
      return store;
    },
    searchHandle() {
      const searchForm = {
        ...this.searchForm,
        billDate: {
          dateStart: this.searchForm.billDate.length
            ? this.searchForm.billDate[0]
            : "",
          dateEnd:
            this.searchForm.billDate.length === 2
              ? this.searchForm.billDate[1]
              : ""
        },
        settlementDate: {
          dateStart: this.searchForm.settlementDate.length
            ? this.searchForm.settlementDate[0]
            : "",
          dateEnd:
            this.searchForm.settlementDate.length === 2
              ? this.searchForm.settlementDate[1]
              : ""
        }
      };
      this.$emit("searchParamsChange", searchForm);
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="scss">
.no-margin {
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
