<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    label-width="60px"
    size="mini"
    class="form-item-small-margin-bottom"
    label-position="left"
  >
    <el-row :gutter="10">
      <el-col :span="5">
        <el-form-item label="货主" prop="ownerCompanyId">
          <ht-autoselect
            v-model="ruleForm.ownerCompanyId"
            :options="store().allCompanies()"
            :trigger-on-focus="false"
            class="switch-focus focus-ownerCompanyId"
            placeholder="货主"
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="供应商" prop="supplierId">
          <ht-autoselect
            v-model="ruleForm.supplierId"
            :fetch-suggestions="searchLoadAllSupplierCooperators"
            :trigger-on-focus="false"
            remote
            highlight-first-item
            clearable
            placeholder="供应商"
            class="switch-focus focus-supplierId"
          />
        </el-form-item>
        <el-form-item label="库存性质" prop="stockProperty">
          <ht-autoselect
            v-model="ruleForm.stockProperty"
            :options="searchBaseData.allStockProperty"
            :trigger-on-focus="false"
            class="switch-focus focus-ownerCompanyId"
            placeholder="库存性质"
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-checkbox v-model="ruleForm.existedInStock" class="m-t-12">
          仅查询有库存记录的商品
        </el-checkbox>
      </el-col>
      <el-col :span="5">
        <el-form-item label="配件编码" prop="partCode">
          <ht-input
            v-model="ruleForm.partCode"
            class="switch-focus focus-partCode"
            maxlength="20"
            placeholder="配件编码"
          />
        </el-form-item>
        <el-form-item label="配件名称" prop="partName">
          <ht-autocomplete
            v-model="ruleForm.partName"
            :fetch-suggestions="autocompleteSearchPartName"
            :trigger-on-focus="false"
            :maxlength="50"
            class="switch-focus focus-partName"
            placeholder="配件名称"
            clearable
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="配件品牌" prop="brand">
          <ht-autocomplete
            v-model="ruleForm.brand"
            :fetch-suggestions="autocompleteSearchPartBrand"
            :trigger-on-focus="false"
            class="switch-focus focus-brand"
            placeholder="配件品牌"
            highlight-first-item
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="产地" prop="productionPlace" label-width="94px">
          <ht-autocomplete
            v-model="ruleForm.productionPlace"
            :fetch-suggestions="autocompleteSearchProductionPlace"
            :trigger-on-focus="false"
            :maxlength="50"
            class="switch-focus focus-productionPlace"
            placeholder="产地"
            clearable
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="车型/适用车型" prop="vehModel" label-width="94px">
          <ht-autocomplete
            v-model="ruleForm.vehModel"
            :fetch-suggestions="autocompleteSearchVehModel"
            :trigger-on-focus="false"
            :maxlength="50"
            class="switch-focus focus-vehModel"
            placeholder="车型/适用车型"
            clearable
          />
        </el-form-item>
        <el-form-item label="配件分类" prop="categoryName" label-width="94px">
          <ht-autoselect
            v-model="ruleForm.categoryName"
            :fetch-suggestions="searchLoadCategory"
            remote
            filter-zero
            clearable
            :trigger-on-focus="false"
            highlight-first-item
            class="switch-focus focus-categoryName"
            placeholder="配件分类"
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="规格" prop="model" label-width="31px">
          <ht-input
            v-model="ruleForm.model"
            class="switch-focus focus-model"
            placeholder="规格"
          />
        </el-form-item>
        <el-form-item label="仓库" prop="warehouseId" label-width="31px">
          <ht-autoselect
            v-model="ruleForm.warehouseId"
            :fetch-suggestions="
              query =>
                searchLoadManageWarehouses({
                  name: query,
                  managerCompanyId: store().userInfoMsg().companyId,
                  managerStaffId: store().userInfoMsg().staffId
                })
            "
            :trigger-on-focus="false"
            class="switch-focus focus-warehouseId"
            placeholder="仓库"
            remote
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-form-item prop="positionId" label="货位" label-width="31px">
          <ht-autoselect
            v-model="ruleForm.positionId"
            :trigger-on-focus="false"
            class="switch-focus focus-positionId"
            placeholder="货位"
            highlight-first-item
            remote
            filterZero
            :fetch-suggestions="queryPosition"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="配件性质" prop="property">
          <ht-autocomplete
            v-model="ruleForm.property"
            :fetch-suggestions="autocompleteSearchProperty"
            :trigger-on-focus="false"
            class="switch-focus focus-property"
            placeholder="配件性质"
            clearable
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="数量" prop="qty" label-width="31px">
          <ht-input
            v-model.number="ruleForm.qty"
            class="switch-focus focus-qty"
            placeholder="数量"
            type="number"
          >
            <ht-select
              slot="prepend"
              v-model="ruleForm.qtyLimitType"
              :clearable="false"
              :options="compareOptions"
              style="width: 80px"
            />
          </ht-input>
        </el-form-item>
        <el-form-item label="库龄" prop="age" label-width="31px">
          <ht-input
            v-model.number="ruleForm.age"
            class="switch-focus focus-age"
            placeholder="库龄（天）"
            type="number"
          >
            <ht-select
              slot="prepend"
              v-model="ruleForm.ageLimitType"
              :clearable="false"
              :options="compareOptions"
              style="width: 80px"
            />
          </ht-input>
        </el-form-item>
        <!-- <el-form-item label="查看锁定库存" label-width="100px" prop="flagLock">
          <el-switch v-model="ruleForm.flagLock" />
        </el-form-item> -->
        <div class="text-right m-t-6">
          <el-button
            type="primary"
            size="mini"
            class="switch-focus focus-button"
            @click.stop="handleSearch(ruleForm)"
          >
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click.stop="resetForm">
            重置（F6）
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { searchMixin } from "@/mixins";
import { loadSearchPosition } from "@/api/store/stocks";
import { COMPARE_OPTIONS } from "@/constants";
import * as store from "@/utils/store";
import Local from "@/utils/localStorage";
const defaultRuleForm = {
  partCode: undefined,
  partName: undefined,
  brand: undefined,
  productionPlace: undefined,
  vehModel: undefined,
  categoryName: undefined,
  model: undefined,
  ownerCompanyId: undefined,
  companyId: undefined,
  supplierId: undefined,
  warehouseId: undefined,
  property: undefined,
  qty: undefined,
  qtyLimitType: 0,
  age: undefined,
  ageLimitType: 0,
  flagLock: false,
  existedInStock: false
};

export default {
  name: "StocksSearchForm",
  mixins: [searchMixin],
  data() {
    return {
      compareOptions: COMPARE_OPTIONS,
      ruleForm: { ...defaultRuleForm },
      hasSearched: false
    };
  },
  activated() {
    const query = this.$route.query;
    const storage = Local.get(this.$route.path);
    this.ruleForm = Object.assign(this.ruleForm, storage.ruleForm);
    if (query && query.reportSearch) {
      this.ruleForm = {
        ...defaultRuleForm,
        qtyLimitType: query.reportSearch.qtyLimitType,
        qty: query.reportSearch.qty
      };
      this.handleSearch(
        {
          value: query.reportSearch.summaryType,
          summaryTypesData: query.reportSearch.summaryTypesData
        },
        true
      );
      delete this.$route.query.reportSearch;
    }
  },
  methods: {
    store() {
      return store;
    },
    async queryPosition(query) {
      const res = await loadSearchPosition({
        warehouseId: this.ruleForm.warehouseId,
        name: query || ""
      });
      return res || [];
    },
    dataFormater(obj) {
      const formatData = {};
      for (const key in obj) {
        if (
          [
            "warehouseId",
            "companyId",
            "supplierId",
            "ownerCompanyId",
            "qty",
            "age"
          ].includes(key)
        ) {
          if (obj[key] || obj[key] === 0) {
            formatData[key] = obj[key];
          } else {
            formatData[key] = undefined;
          }
        } else {
          formatData[key] = obj[key];
        }
      }
      return formatData;
    },
    handleSearch(summaryTypes, init) {
      if (!init) {
        Local.set(this.$route.path, {
          ruleForm: {
            existedInStock: this.ruleForm.existedInStock
          }
        });
      }
      this.hasSearched = true;
      this.$emit(
        "search-data",
        { summaryTypesData: this.dataFormater(summaryTypes) },
        this.hasSearched
      );
    },
    resetForm() {
      this.ruleForm = { ...defaultRuleForm };
    }
  }
};
</script>
