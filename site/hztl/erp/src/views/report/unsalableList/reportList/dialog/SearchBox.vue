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
        />
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
          placeholder="供应商名称"
        />
      </el-form-item>
      <el-form-item label="货位">
        <ht-autoselect
          v-model="searchForm.positionId"
          :trigger-on-focus="false"
          class="switch-focus focus-warehouseId"
          placeholder="货位"
          highlight-first-item
          remote
          filterZero
          :fetch-suggestions="queryPosition"
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

      <el-form-item label="库存">
        <ht-select
          v-model="searchForm.stockQty.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.stockQty.indexValue"
          size="mini"
          style="width:189px"
        >
        </ht-input>
      </el-form-item>

      <el-form-item label="库龄">
        <ht-select
          v-model="searchForm.inventoryAge.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.inventoryAge.indexValue"
          size="mini"
          style="width:189px"
        >
        </ht-input>
      </el-form-item>

      <el-form-item label="滞销天数">
        <ht-select
          v-model="searchForm.unsalableDay.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.unsalableDay.indexValue"
          size="mini"
          style="width:189px"
        >
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
import { searchMixin } from "@/mixins";
import { PART_CODE_WAY } from "@/constants";
import { BILL_TYPE, INDEX_PATTERN } from "../../../group";
import { loadSearchPosition } from "@/api/store/stocks";
import * as store from "@/utils/store";

const defaultSearchForm = {
  ownerCompanyIds: [],
  warehouseId: [],
  supplier: { cooperatorId: null },
  positionId: null,
  batchNo: "",
  name: "",
  code: "",
  codePattern: 0,
  brand: "",
  productionPlace: "",
  categoryName: "",
  stockQty: {
    indexPattern: 0,
    indexValue: ""
  },
  inventoryAge: {
    indexPattern: 0,
    indexValue: ""
  },
  unsalableDay: {
    indexPattern: 0,
    indexValue: ""
  }
};

export default {
  name: "SearchBox",
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      PART_CODE_WAY,
      focusItem: "code",
      INDEX_PATTERN,
      BILL_TYPE,
      storeListSearch: []
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
    },
    "$attrs.storeList": {
      handler(value) {
        if (value) {
          this.storeListSearch = value;
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    async queryPosition(query) {
      const res = await loadSearchPosition({
        warehouseId: this.searchForm.warehouseId,
        name: query || "",
        pageSize: 50
      });
      return res || [];
    },
    searchHandle() {
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
