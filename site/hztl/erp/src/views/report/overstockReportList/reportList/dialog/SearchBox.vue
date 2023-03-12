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
      <el-form-item label="车型">
        <ht-autocomplete
          v-model="searchForm.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="车型"
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
import { DEFAULT_INDEX } from "../../group";
import * as store from "@/utils/store";

const defaultSearchForm = {
  ownerCompanyIds: [],
  name: "",
  code: "",
  codePattern: 0,
  brand: "",
  productionPlace: "",
  vehModel: "",
  categoryName: "",
  indexValue: ""
};

export default {
  name: "SearchBox",
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      PART_CODE_WAY,
      focusItem: "code",
      INDEX_PATTERN,
      DEFAULT_INDEX
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
    searchHandle() {
      this.$emit("searchParamsChange", this.searchForm);
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
