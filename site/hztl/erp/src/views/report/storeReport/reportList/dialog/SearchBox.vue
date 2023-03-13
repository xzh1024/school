<template>
  <ht-dialog
    v-bind="$attrs"
    title="报表查询"
    width="400px"
    top="calc(1vh + 40px)"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      :model="searchForm"
      submit-on-enter
      label-width="100px"
      class="form-item-small-margin-bottom display_none mt-1"
      size="mini"
    >
      <el-form-item label="货主公司">
        <ht-select
          v-model="searchForm.ownerCompanyIds"
          :options="allCompaniesWithPerm"
          placeholder="货主公司"
          clearable
          filterable
          multiple
          collapse-tags
          has-selecte-all-val
        />
      </el-form-item>
      <el-form-item label="仓库">
        <ht-select
          v-model="searchForm.warehouseId"
          :options="store().administerWareHouse()"
          placeholder="仓库"
          clearable
          filterable
          multiple
          collapse-tags
          has-selecte-all-val
        />
      </el-form-item>
      <el-form-item>
        <ht-select
          slot="label"
          v-model="dateType"
          :options="dateTypes"
          :clearable="false"
          class="date-label"
        />
        <ht-date-range v-model="searchForm.timeRange" shortcuts-type="all" />
      </el-form-item>
      <el-form-item label="供应商名称">
        <ht-autoselect
          v-model="searchForm.supplier.cooperatorId"
          :fetch-suggestions="searchLoadAllSupplierCooperators"
          :trigger-on-focus="false"
          filterZero
          remote
          clearable
          highlight-first-item
          placeholder="供应商"
        />
      </el-form-item>
      <el-form-item label="业务往来单位">
        <ht-autoselect
          v-model="searchForm.cooperator.cooperatorName"
          :fetch-suggestions="searchLoadCooperatorsBranches"
          :trigger-on-focus="false"
          remote
          clearable
          filter-zero
          highlight-first-item
          placeholder="业务往来单位"
        />
      </el-form-item>
      <el-form-item label="出入库类型">
        <ht-select
          v-model="searchForm.types"
          :options="TYPE"
          placeholder="出入库类型"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
          @clear="clearType"
          @change="changeType"
        />
      </el-form-item>
      <el-form-item label="业务类型">
        <ht-select
          v-model="searchForm.billTypes"
          :options="businessTypes"
          placeholder="业务类型"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
        />
      </el-form-item>
      <el-form-item label="批次号">
        <ht-input
          v-model="searchForm.batchNo"
          placeholder="批次号"
          size="mini"
          class="input-with-select"
        ></ht-input>
      </el-form-item>
      <el-form-item label="配件名称">
        <ht-autocomplete
          v-model="searchForm.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="配件编码">
        <ht-input
          v-model="searchForm.code"
          v-delay-focus="focusItem === 'code'"
          placeholder="配件编码"
          size="mini"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.codePattern"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="配件品牌">
        <ht-autocomplete
          v-model="searchForm.brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="配件品牌"
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="产地">
        <ht-autocomplete
          v-model="searchForm.productionPlace"
          :fetch-suggestions="autocompleteSearchProductionPlace"
          :trigger-on-focus="false"
          placeholder="产地"
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="配件性质">
        <ht-autocomplete
          v-model="searchForm.property"
          :fetch-suggestions="autocompleteSearchProperty"
          :trigger-on-focus="false"
          highlight-first-item
          placeholder="配件性质"
        />
      </el-form-item>
      <el-form-item label="配件分类">
        <ht-autoselect
          v-model="searchForm.categoryName"
          :fetch-suggestions="searchLoadCategory"
          remote
          filter-zero
          clearable
          :trigger-on-focus="false"
          highlight-first-item
          placeholder="配件分类"
        />
      </el-form-item>
      <el-form-item class="no-margin">
        <ht-select
          v-model="searchForm.beginIndex.index"
          placeholder="出入库"
          :clearable="false"
          :options="CURRENT_INDEX"
          style="width:100px"
        />
        <ht-select
          v-model="searchForm.beginIndex.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.beginIndex.indexValue"
          size="mini"
          style="width:189px"
        >
        </ht-input>
      </el-form-item>

      <el-form-item class="no-margin">
        <ht-select
          v-model="searchForm.endPeriodIndex.index"
          placeholder="库存"
          :clearable="false"
          :options="BEGIN_END_INDEX"
          style="width:100px"
        />
        <ht-select
          v-model="searchForm.beginIndex.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.endPeriodIndex.indexValue"
          size="mini"
          style="width:189px"
        >
        </ht-input>
      </el-form-item>

      <el-form-item label="库存周转率">
        <ht-select
          v-model="searchForm.turnOverIndex.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.turnOverIndex.indexValue"
          size="mini"
          style="width:189px"
        >
        </ht-input>
      </el-form-item>

      <el-form-item label="本期出入情况">
        <ht-autoselect
          v-model="searchForm.thisPeriodInOutStatus"
          :options="CRU_IN_OUT_STATUSES"
          :trigger-on-focus="false"
          clearable
          highlight-first-item
          placeholder="本期出入情况"
        />
      </el-form-item>
      <el-form-item label="是否含移仓">
        <el-checkbox
          v-model="searchForm.includeStockmoving"
          @change="onIncludeStockmovingChange"
        />
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
import { searchMixin } from "@/mixins";
import { PART_CODE_WAY } from "@/constants";
import { INDEX_PATTERN } from "../../../group";
import {
  BUSINESSTYPE1,
  BUSINESSTYPE2,
  BUSINESSTYPE3,
  OUT_IN_INDEX,
  STOCK_INDEX,
  CURRENT_INDEX,
  BEGIN_END_INDEX,
  TYPE,
  CRU_IN_OUT_STATUSES
} from "../../group";
import { getKeys } from "@/utils/tool";
import { dateFormat } from "@/utils/date";
import * as store from "@/utils/store";

const defaultSearchForm = {
  ownerCompanyIds: [],
  warehouseId: [],
  timeRange: [dateFormat(new Date()), dateFormat(new Date())],
  supplier: { cooperatorId: null },
  cooperator: { cooperatorName: null },
  types: [],
  billTypes: getKeys(BUSINESSTYPE3),
  batchNo: "",
  name: "",
  code: "",
  codePattern: 0,
  brand: "",
  productionPlace: "",
  property: "",
  categoryName: "",
  beginIndex: {
    index: "",
    indexPattern: 0,
    indexValue: ""
  },
  endPeriodIndex: {
    index: "",
    indexPattern: 0,
    indexValue: ""
  },
  turnOverIndex: {
    indexPattern: 0,
    indexValue: ""
  },
  thisPeriodInOutStatus: 0,
  includeStockmoving: false
};

export default {
  name: "SearchBox",
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      dateType: "outOrInDate",
      cooperatorAreaId: [],
      PART_CODE_WAY,
      focusItem: "code",
      INDEX_PATTERN,
      TYPE,
      OUT_IN_INDEX,
      STOCK_INDEX,
      BEGIN_END_INDEX,
      CURRENT_INDEX,
      dateTypes: {
        outOrInDate: "出入库日期",
        billDate: "业务日期",
        financialAuditdate: "财务审核日期"
      },
      businessTypes: { ...BUSINESSTYPE3 },
      CRU_IN_OUT_STATUSES
    };
  },
  mixins: [searchMixin],
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.focusItem = "code";
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    clearType() {
      this.businessTypes = { ...BUSINESSTYPE3 };
      this.searchForm.billTypes = [];
    },
    changeType(value) {
      if (value && value.length == 2) {
        this.businessTypes = { ...BUSINESSTYPE3 };
      } else if (value && value.length == 1) {
        if (value[0] === "出库") {
          this.businessTypes = { ...BUSINESSTYPE2 };
        } else {
          this.businessTypes = { ...BUSINESSTYPE1 };
        }
      } else if (!value.length) {
        this.businessTypes = { ...BUSINESSTYPE3 };
        this.searchForm.billTypes = [];
        return;
      }
      this.searchForm.billTypes = [];
      //切换之后必定全选
      for (const item in this.businessTypes) {
        this.searchForm.billTypes.push(item);
      }
    },
    onIncludeStockmovingChange(val) {
      if (val) {
        if (!this.businessTypes.ycr) {
          this.$set(this.businessTypes, "ycr", "移仓入库");
        }
      } else {
        const businessTypes = { ...this.businessTypes };
        delete businessTypes.ycr;
        this.businessTypes = { ...businessTypes };
      }
      this.searchForm.billTypes = [];
      //切换之后必定全选
      for (const item in this.businessTypes) {
        this.searchForm.billTypes.push(item);
      }
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    searchHandle() {
      const date = {
        dateStart:
          this.searchForm.timeRange.length >= 1
            ? this.searchForm.timeRange[0]
            : "",
        dateEnd:
          this.searchForm.timeRange.length === 2
            ? this.searchForm.timeRange[1]
            : ""
      };
      this.$emit("searchParamsChange", {
        ...this.searchForm,
        timeRange: undefined,
        types: this.searchForm.types.length
          ? this.searchForm.types
          : ["出库", "入库"],
        [this.dateType]: date
      });
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
