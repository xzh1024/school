<template>
  <ht-dialog
    v-bind="$attrs"
    title="配件查询"
    width="400px"
    top="7vh"
    append-to-body
    v-on="$listeners"
    class="ignore-top-hotkeys"
  >
    <ht-tabs
      v-model="activeTab"
      :tabs="TABS"
      class="tabs-regular"
      style="margin: 0"
    />
    <el-form
      v-if="activeTab === TABS[0].id"
      submit-on-enter
      label-width="100px"
      class="form-item-small-margin-bottom mt-1"
      size="mini"
    >
      <el-form-item label="配件编码">
        <ht-input
          v-if="setFoucs('code')"
          v-delay-focus="setFoucs('code')"
          v-model="formData.code"
          placeholder="配件编码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.codeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="formData.code"
          placeholder="配件编码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.codeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="图号">
        <ht-input
          v-if="setFoucs('customCode')"
          v-delay-focus="setFoucs('customCode')"
          v-model="formData.customCode"
          placeholder="图号"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.customCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="formData.customCode"
          placeholder="图号"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.customCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="配件名称">
        <ht-autocomplete
          v-if="setFoucs('name')"
          v-delay-focus="setFoucs('name')"
          v-model="formData.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          highlight-first-item
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="formData.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="车型/适用车型">
        <ht-autocomplete
          v-if="setFoucs('vehModel')"
          v-delay-focus="setFoucs('vehModel')"
          v-model="formData.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="车型/适用车型"
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="formData.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="车型/适用车型"
          clearable
        />
      </el-form-item>
      <el-form-item label="配件品牌">
        <ht-autocomplete
          v-if="setFoucs('brand')"
          v-delay-focus="setFoucs('brand')"
          v-model="formData.brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="配件品牌"
          highlight-first-item
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="formData.brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="配件品牌"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="产地">
        <ht-autocomplete
          v-if="setFoucs('productionPlace')"
          v-delay-focus="setFoucs('productionPlace')"
          v-model="formData.productionPlace"
          :fetch-suggestions="autocompleteSearchProductionPlace"
          :trigger-on-focus="false"
          placeholder="产地"
          highlight-first-item
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="formData.productionPlace"
          :fetch-suggestions="autocompleteSearchProductionPlace"
          :trigger-on-focus="false"
          placeholder="产地"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="生产码">
        <ht-input
          v-if="setFoucs('productionCode')"
          v-delay-focus="setFoucs('productionCode')"
          v-model="formData.productionCode"
          placeholder="生产码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.productionCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="formData.productionCode"
          placeholder="生产码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.productionCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="部位码">
        <ht-input
          v-if="setFoucs('posCode')"
          v-delay-focus="setFoucs('posCode')"
          v-model="formData.posCode"
          placeholder="部位码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.posCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="formData.posCode"
          placeholder="部位码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.posCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="配件性质">
        <ht-autocomplete
          v-if="setFoucs('property')"
          v-delay-focus="setFoucs('property')"
          v-model="formData.property"
          :fetch-suggestions="autocompleteSearchProperty"
          :trigger-on-focus="false"
          placeholder="配件性质"
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="formData.property"
          :fetch-suggestions="autocompleteSearchProperty"
          :trigger-on-focus="false"
          placeholder="配件性质"
          clearable
        />
      </el-form-item>
      <el-form-item label="所属仓库">
        <div class="flex-container">
          <ht-select
            v-model="formData.warehouseIds"
            :options="warehouseOptions"
            filterZero
            clearable
            collapse-tags
            filterable
            multiple
            has-selecte-all-val
            placeholder="所属仓库"
          />
          <el-button type="text" @click.stop="shwoDefaultWarehouseBox">
            默认值设置
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="销售状态">
        <ht-autoselect
          v-if="setFoucs('canSale')"
          v-delay-focus="setFoucs('canSale')"
          v-model="formData.canSale"
          :options="searchBaseData.salesStatuses"
          :trigger-on-focus="false"
          placeholder="销售状态"
          highlight-first-item
          submit-on-enter-ignore
          clearable
        />
        <ht-autoselect
          v-else
          v-model="formData.canSale"
          :options="searchBaseData.salesStatuses"
          :trigger-on-focus="false"
          placeholder="销售状态"
          highlight-first-item
          submit-on-enter-ignore
          clearable
        />
      </el-form-item>
      <el-form-item label="配件分类">
        <ht-autoselect
          v-if="setFoucs('categoryName')"
          v-delay-focus="setFoucs('categoryName')"
          v-model="formData.categoryName"
          :fetch-suggestions="searchLoadCategory"
          remote
          filter-zero
          clearable
          :trigger-on-focus="false"
          highlight-first-item
          placeholder="配件分类"
        />
        <ht-autoselect
          v-else
          v-model="formData.categoryName"
          :fetch-suggestions="searchLoadCategory"
          remote
          filter-zero
          clearable
          :trigger-on-focus="false"
          highlight-first-item
          placeholder="配件分类"
        />
      </el-form-item>
      <el-form-item label="规格">
        <ht-input
          v-if="setFoucs('model')"
          v-delay-focus="setFoucs('model')"
          v-model="formData.model"
          placeholder="规格"
        />
        <ht-input v-else v-model="formData.model" placeholder="规格" />
      </el-form-item>
      <el-form-item label="库存上下限">
        <ht-select
          v-model="formData.stockLimits"
          :options="STOCK_LIMITS_OPTINS"
          clearable
          collapse-tags
          filterable
          multiple
          has-selecte-all-val
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label-width="0" style="margin-top: 10px;">
        <div class="flex">
          <el-checkbox
            class="m-l-27"
            label="仅查询有库存记录的商品"
            v-model="formData.existedInStock"
            @change="
              () => {
                localSave();
              }
            "
          />
          <div class="flex-space"></div>
          <el-button
            type="text"
            size="mini"
            @click.stop="showSetDefaultFoucusBox"
          >
            光标默认锁定设置
          </el-button>
        </div>
      </el-form-item>
      <el-form-item
        label-width="0"
        style="margin-top: 10px; text-align: center;"
      >
        <el-button
          type="primary"
          plain
          size="mini"
          @click.stop="searchHandle(formData)"
        >
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click.stop="cancelHandle">
          取消（Esc）
        </el-button>
      </el-form-item>
    </el-form>

    <StdVehModelsSearch
      v-if="activeTab === TABS[1].id"
      :existedInStock="formData.existedInStock"
      :delayFocus="activeTab === TABS[1].id"
      @localSave="localSave"
      @close="cancelHandle"
      @change="searchHandle"
    />

    <el-form
      v-if="activeTab === TABS[2].id"
      submit-on-enter
      label-width="100px"
      class="form-item-small-margin-bottom mt-1"
      size="mini"
    >
      <el-form-item label="配件名称">
        <ht-autocomplete
          v-delay-focus="activeTab === TABS[2].id"
          v-model="formData.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="车型/适用车型">
        <ht-autocomplete
          v-model="formData.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="车型/适用车型"
          clearable
        />
      </el-form-item>
      <el-form-item label="配件品牌">
        <ht-autocomplete
          v-model="formData.brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="配件品牌"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="产地">
        <ht-autocomplete
          v-model="formData.productionPlace"
          :fetch-suggestions="autocompleteSearchProductionPlace"
          :trigger-on-focus="false"
          placeholder="产地"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="配件性质">
        <ht-autocomplete
          v-model="formData.property"
          :fetch-suggestions="autocompleteSearchProperty"
          :trigger-on-focus="false"
          placeholder="配件性质"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="所属仓库">
        <ht-select
          v-model="formData.warehouseIds"
          :options="warehouseOptions"
          filterZero
          clearable
          collapse-tags
          filterable
          multiple
          has-selecte-all-val
          placeholder="所属仓库"
        />
      </el-form-item>
      <el-form-item label="销售状态">
        <ht-autoselect
          v-model="formData.canSale"
          :options="searchBaseData.salesStatuses"
          :trigger-on-focus="false"
          placeholder="销售状态"
          highlight-first-item
          submit-on-enter-ignore
        />
      </el-form-item>
      <el-form-item label="图号">
        <ht-input
          v-model="formData.customCode"
          placeholder="图号"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.customCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="库存上下限">
        <ht-select
          v-model="formData.stockLimits"
          :options="STOCK_LIMITS_OPTINS"
          clearable
          collapse-tags
          filterable
          multiple
          has-selecte-all-val
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="批量查询">
        <parsing-codes v-model="batchData" />
      </el-form-item>
      <el-checkbox
        class="m-l-27"
        label="仅查询有库存记录的商品"
        v-model="formData.existedInStock"
        @change="
          () => {
            localSave();
          }
        "
      />
      <el-form-item
        label-width="0"
        style="margin-top: 10px; text-align: center;"
      >
        <el-button
          type="primary"
          plain
          size="mini"
          @click.stop="searchHandle(formData)"
        >
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click.stop="cancelHandle">
          取消（Esc）
        </el-button>
      </el-form-item>
    </el-form>

    <set-default-foucus-box
      :visible.sync="setDefaultFoucusBoxVisible"
      v-model="tab0Focus"
      :options="SET_DEFAULT_FOCUS_OPTIONS"
      :type="type"
    />
    <set-default-warehouses-box
      :visible.sync="setDefaultWarehouseBoxVisible"
      v-model="defaultFormData.warehouseIds"
      :options="warehouseOptions"
      :type="type"
      @change="handleDefaultWarehouseIdsChange"
    />
  </ht-dialog>
</template>

<script>
import StdVehModelsSearch from "@/components/std-veh-models-search";
import ParsingCodes from "@/components/parsingCodes";
import { searchMixin } from "@/mixins";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import SetDefaultFoucusBox from "@/components/SetDefaultFoucusBox/index.vue";
import { getStaffSystemParamsDetail } from "@/api/base/base";
import SetDefaultWarehousesBox from "@/components/SetDefaultWarehousesBox/index.vue";
import * as store from "@/utils/store";

const topHotkeys = new TopHotkeys();
let lastKeyScope;

const TABS = [
  { id: "0", name: "精确查询" },
  { id: "1", name: "标准车型查询" },
  { id: "2", name: "批量查询" }
];
const PART_CODE_WAY = {
  fuzzy: "模糊匹配",
  left: "左匹配",
  right: "右匹配",
  full: "全匹配"
};
const STOCK_LIMITS_OPTINS = [
  { id: "normal", name: "正常" },
  { id: "over", name: "超出上限" },
  { id: "below", name: "低于下限" }
];
const defaultFormData = {
  codeMatch: "fuzzy",
  code: "",
  customCodeMatch: "fuzzy",
  productionCodeMatch: "fuzzy",
  posCodeMatch: "fuzzy",
  customCode: "",
  name: "",
  vehModel: "",
  brand: "",
  productionPlace: "",
  property: "",
  warehouseIds: [],
  canSale: true,
  categoryName: "",
  model: "",
  stockLimits: [],
  existedInStock: true
};
const SET_DEFAULT_FOCUS_OPTIONS = [
  { id: "code", name: "配件编码" },
  { id: "customCode", name: "图号" },
  { id: "name", name: "配件名称" },
  { id: "vehModel", name: "车型/适用车型" },
  { id: "brand", name: "配件品牌" },
  { id: "productionPlace", name: "产地" },
  { id: "productionCode", name: "生产码" },
  { id: "posCode", name: "部位码" },
  { id: "property", name: "配件性质" },
  { id: "canSale", name: "销售状态" },
  { id: "categoryName", name: "配件分类" },
  { id: "model", name: "规格" }
];
const defaultTab0Focus = "code";

export default {
  name: "SearchParts",
  components: {
    StdVehModelsSearch,
    ParsingCodes,
    SetDefaultFoucusBox,
    SetDefaultWarehousesBox
  },
  mixins: [searchMixin],
  props: {
    type: {
      type: String,
      required: true
    },
    companyId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeTab: TABS[0].id,
      TABS,
      defaultFormData,
      formData: { ...defaultFormData },
      PART_CODE_WAY,
      STOCK_LIMITS_OPTINS,
      batchData: [],
      focusItem: "",
      setDefaultFoucusBoxVisible: false,
      tab0Focus: "",
      SET_DEFAULT_FOCUS_OPTIONS,
      setDefaultWarehouseBoxVisible: false,
      warehouseOptions: []
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          lastKeyScope = hotkeys.getScope();
          topHotkeys.bindHotkeys(this.$el);
          this.initFormData();
        } else if (oldValue) {
          topHotkeys.unbindHotkeys(this.$el);
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    },
    activeTab(value) {
      if (value === TABS[0].id) {
        this.focusItem = this.tab0Focus || defaultTab0Focus;
      }
      const storage = JSON.parse(localStorage.search || "{}")[this.type];
      const cache = storage ? storage[this.activeTab] : {};
      this.formData = {
        ...this.formData,
        ...cache
      };
    },
    tab0Focus(val) {
      if (val) {
        this.focusItem = val;
      } else {
        this.focusItem = defaultTab0Focus;
      }
    }
  },
  mounted() {
    this.getTab0Focus();
    this.getWarehouseOptions();
    this.getDefualtWarehouses();
  },
  methods: {
    store() {
      return store;
    },
    localSave(formData) {
      //第二个tab提交之前已保存，无需再保存；
      if (!formData && this.activeTab === 1) return;
      const _formData = formData || this.formData;
      const localParams0 = {
        codeMatch: _formData.codeMatch,
        customCodeMatch: _formData.customCodeMatch,
        productionCodeMatch: _formData.productionCodeMatch,
        posCodeMatch: _formData.posCodeMatch,
        existedInStock: _formData.existedInStock
      };
      const localParam12 = {
        existedInStock: _formData.existedInStock
      };
      try {
        const storage = localStorage.search
          ? JSON.parse(localStorage.search || "{}")
          : {};
        storage[this.type] = {
          ...storage[this.type],
          ...{
            [this.activeTab]: this.activeTab == 0 ? localParams0 : localParam12
          }
        };
        localStorage.search = JSON.stringify(storage);
      } catch (e) {
        console.log(e);
      }
    },
    initFormData() {
      this.batchData = [];
      this.activeTab = TABS[0].id;
      let localFormData = {};
      try {
        if (localStorage.search) {
          const storage = JSON.parse(localStorage.search || "{}")[this.type];
          localFormData = storage ? storage[this.activeTab] : {};
        }
      } catch (e) {
        console.log(e);
      }
      this.formData = {
        ...this.defaultFormData,
        ...localFormData
      };
    },
    getTab0Focus() {
      getStaffSystemParamsDetail({ module: "common", type: "focuse" })
        .then(res => {
          if (res.value && res.value[this.type]) {
            console.log(this.type);
            this.tab0Focus = res.value[this.type];
          } else {
            this.focusItem = defaultTab0Focus;
          }
        })
        .catch(() => {
          this.focusItem = defaultTab0Focus;
        });
    },
    setFoucs(name) {
      return (
        this.focusItem === name &&
        !this.setDefaultFoucusBoxVisible &&
        !this.setDefaultWarehouseBoxVisible &&
        this.$attrs.visible
      );
    },
    showSetDefaultFoucusBox() {
      this.setDefaultFoucusBoxVisible = true;
    },
    getWarehouseOptions() {
      this.searchLoadAssignWarehouses({
        status: 0,
        assignCompanyId: this.companyId
      }).then(res => {
        this.warehouseOptions = res || [];
      });
    },
    getDefualtWarehouses() {
      this.defaultFormData = { ...defaultFormData };
      getStaffSystemParamsDetail({
        module: "webSetting",
        type: "defaultQueryWarehouse"
      }).then(res => {
        if (res.value && res.value[this.type]) {
          this.defaultFormData.warehouseIds = res.value[this.type];
        }
      });
    },
    shwoDefaultWarehouseBox() {
      this.setDefaultWarehouseBoxVisible = true;
    },
    handleDefaultWarehouseIdsChange(warehouseIds) {
      this.formData.warehouseIds = [...warehouseIds];
    },

    searchHandle(formData) {
      let fields = {
        replacementCodes: true
      };
      let parts = {};
      let stocks = {
        ownerCompanyId: this.companyId,
        filterNegativeZero: true,
        existedInStock: formData.existedInStock
      };
      switch (this.activeTab) {
        case TABS[0].id:
          parts = {
            code: formData.code,
            codeMatch: formData.codeMatch,
            customCode: formData.customCode,
            customCodeMatch: formData.customCodeMatch,
            productionCode: formData.productionCode,
            productionCodeMatch: formData.productionCodeMatch,
            posCodeMatch: formData.posCodeMatch,
            posCode: formData.posCode,
            name: formData.name,
            vehModel: formData.vehModel,
            brand: formData.brand,
            productionPlace: formData.productionPlace,
            canSale: formData.canSale,
            categoryName: formData.categoryName,
            model: formData.model,
            stockLimits: formData.stockLimits
          };
          stocks = {
            ...stocks,
            property: formData.property,
            warehouseIds: formData.warehouseIds
          };
          break;
        case TABS[1].id:
          parts = {
            avaVehModel: formData
          };
          break;
        case TABS[2].id:
          fields = {
            ...fields,
            bookQties: this.batchData.length
              ? this.batchData.map(item => item.num)
              : []
          };
          parts = {
            name: formData.name,
            vehModel: formData.vehModel,
            brand: formData.brand,
            productionPlace: formData.productionPlace,
            canSale: formData.canSale,
            customCode: formData.customCode,
            customCodeMatch: formData.customCodeMatch,
            stockLimits: formData.stockLimits,
            codes: this.batchData.length
              ? this.batchData.map(item => item.code)
              : []
          };
          stocks = {
            ...stocks,
            property: formData.property,
            warehouseIds: formData.warehouseIds
          };
          break;
        default:
          break;
      }
      this.$emit("searchParamsChange", {
        type: this.type,
        fields,
        condsBeforeAgg: {
          parts,
          stocks
        }
      });
      this.localSave();
      this.cancelHandle();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
