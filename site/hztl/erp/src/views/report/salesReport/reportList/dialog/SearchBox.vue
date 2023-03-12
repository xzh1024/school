<template>
  <ht-dialog
    v-bind="$attrs"
    title="报表查询"
    width="400px"
    top="7vh"
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
      <el-form-item label="分公司">
        <ht-select
          v-model="searchForm.companyIds"
          :options="allCompaniesWithPerm"
          clearable
          filterable
          multiple
          collapse-tags
          has-selecte-all-val
          placeholder="分公司"
        />
      </el-form-item>
      <el-form-item label="开始业务日期">
        <el-date-picker
          v-model="searchForm.dateStart"
          type="date"
          placeholder="开始业务日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束业务日期">
        <el-date-picker
          v-model="searchForm.dateEnd"
          type="date"
          placeholder="结束业务日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="客户区域">
        <area-select
          v-model="cooperatorAreaId"
          :props="{ checkStrictly: true }"
          clearable
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
      <el-form-item label="支付方式">
        <ht-select
          v-model="searchForm.settlementType"
          :options="store().enhancedSettlementTypeDictionary()"
          placeholder="支付方式"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
        />
      </el-form-item>
      <el-form-item label="发票类型">
        <ht-select
          v-model="searchForm.invoiceTypes"
          :options="store().invoiceTypeDictionary()"
          placeholder="发票类型"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
        />
      </el-form-item>
      <el-form-item class="no-margin">
        <ht-select
          v-model="peopleType"
          :options="PEOPLE_TYPE"
          style="width:100px;"
        />
        <ht-select
          style="width:280px;"
          v-if="peopleType == 0"
          v-model="searchForm.bussinessManIds"
          :options="bussinessMan"
          placeholder="业务员"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
        />
        <ht-select
          style="width:280px;"
          v-if="peopleType == 1"
          v-model="searchForm.createdManIds"
          :options="createdMan"
          placeholder="制单人"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
        />
        <ht-select
          style="width:280px;"
          v-if="peopleType == 2"
          v-model="searchForm.financialAuditManIds"
          :options="financialAuditMan"
          placeholder="财务审核人"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
        />
      </el-form-item>
      <el-form-item label="单据类型">
        <ht-select
          v-model="searchForm.billTypes"
          :options="BILL_TYPE"
          placeholder="单据类型"
          clearable
          filterable
          multiple
          has-selecte-all-val
          collapse-tags
        />
      </el-form-item>
      <el-form-item label="单据状态">
        <ht-select
          placeholder="单据状态"
          v-model="searchForm.status"
          multiple
          :options="STATUS"
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
      <el-form-item label="单据号">
        <ht-input
          v-model="searchForm.billNo"
          placeholder="单据号"
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
      <el-form-item label="车型">
        <ht-autocomplete
          v-model="searchForm.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="车型"
        />
      </el-form-item>
      <el-form-item class="no-margin">
        <ht-select
          v-model="searchForm.index"
          placeholder="指标"
          :clearable="false"
          :options="DEFAULT_INDEX"
          style="width:100px"
        />
        <ht-select
          v-model="searchForm.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.indexValue"
          size="mini"
          style="width:189px"
        >
        </ht-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="searchForm.collectEarlyReturn"
          >统计退前期的退货单</el-checkbox
        >
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
import AreaSelect from "@/components/select/AreaSelect";
import { loadBussiness, loadCreated, loadFinancialAudit } from "@/api/report";
import { INDEX_PATTERN } from "../../../group";
import { BILL_TYPE, DEFAULT_INDEX, PEOPLE_TYPE, STATUS } from "../../group";
import { dateFormat } from "@/utils/date";
import * as store from "@/utils/store";

const defaultSearchForm = {
  companyIds: [],
  dateStart: dateFormat(new Date()),
  dateEnd: dateFormat(new Date()),
  cooperatorId: null,
  settlementType: [],
  invoiceTypes: [],
  bussinessManIds: [],
  createdManIds: [],
  financialAuditManIds: [],
  billTypes: [],
  status: [],
  productionPlace: "",
  billNo: "",
  name: "",
  code: "",
  codePattern: 0,
  brand: "",
  categoryName: "",
  vehModel: "",
  indexValue: null,
  collectEarlyReturn: true
};

export default {
  name: "SearchBox",
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      cooperatorAreaId: [],
      PART_CODE_WAY,
      focusItem: "",
      STATUS,
      BILL_TYPE,
      INDEX_PATTERN,
      DEFAULT_INDEX,
      PEOPLE_TYPE,
      peopleType: 0,
      bussinessMan: [],
      financialAuditMan: [],
      createdMan: []
    };
  },
  components: { AreaSelect },
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
  mounted() {
    this.loadBussinessMan();
    this.loadFinancialAuditMan();
    this.loadCreatedMan();
  },
  methods: {
    store() {
      return store;
    },
    loadBussinessMan() {
      loadBussiness({
        role: "salesMan",
        companyId: store.userInfoMsg().companyId
      }).then(res => {
        this.bussinessMan = res.staffs;
      });
    },
    loadFinancialAuditMan() {
      loadFinancialAudit({
        role: "salesMan",
        companyId: store.userInfoMsg().companyId
      }).then(res => {
        this.financialAuditMan = res.staffs;
      });
    },
    loadCreatedMan() {
      loadCreated({
        companyId: store.userInfoMsg().companyId,
        billTypes: ["XS", "XT"]
      }).then(res => {
        this.createdMan = res.staffs;
      });
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    searchHandle() {
      if (this.cooperatorAreaId && this.cooperatorAreaId.length) {
        this.searchForm.cooperatorAreaId = Number(this.cooperatorAreaId[2]);
      }
      this.$emit("searchParamsChange", { ...this.searchForm });
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
