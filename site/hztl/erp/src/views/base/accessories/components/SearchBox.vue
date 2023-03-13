<template>
  <ht-dialog
    v-bind="$attrs"
    title="配件资料查询"
    width="400px"
    top="7vh"
    append-to-body
    v-on="$listeners"
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
          v-model="searchForm.code"
          placeholder="配件编码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.codeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="searchForm.code"
          placeholder="配件编码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.codeMatch"
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
          v-model="searchForm.customCode"
          placeholder="图号"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.customCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="searchForm.customCode"
          placeholder="图号"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.customCodeMatch"
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
          v-model="searchForm.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          highlight-first-item
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="searchForm.name"
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
          v-model="searchForm.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="车型/适用车型"
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="searchForm.vehModel"
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
          v-model="searchForm.brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="配件品牌"
          highlight-first-item
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="searchForm.brand"
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
          v-model="searchForm.productionPlace"
          :fetch-suggestions="autocompleteSearchProductionPlace"
          :trigger-on-focus="false"
          placeholder="产地"
          highlight-first-item
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="searchForm.productionPlace"
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
          v-model="searchForm.productionCode"
          placeholder="生产码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.productionCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="searchForm.productionCode"
          placeholder="生产码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.productionCodeMatch"
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
          v-model="searchForm.posCode"
          placeholder="部位码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.posCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="searchForm.posCode"
          placeholder="部位码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.posCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="配件分类">
        <ht-autoselect
          v-if="setFoucs('categoryName')"
          v-delay-focus="setFoucs('categoryName')"
          v-model="searchForm.categoryName"
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
      <el-form-item label="规格">
        <ht-input
          v-if="setFoucs('model')"
          v-delay-focus="setFoucs('model')"
          v-model="searchForm.model"
          placeholder="规格"
        />
        <ht-input v-else v-model="searchForm.model" placeholder="规格" />
      </el-form-item>
      <el-form-item label="集采配件">
        <ht-autoselect
          v-if="setFoucs('groupPurchase')"
          v-delay-focus="setFoucs('groupPurchase')"
          v-model="searchForm.groupPurchase"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="集采配件"
          highlight-first-item
          clearable
        />
        <ht-autoselect
          v-else
          v-model="searchForm.groupPurchase"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="集采配件"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="允许销售">
        <ht-autoselect
          v-if="setFoucs('canSale')"
          v-delay-focus="setFoucs('canSale')"
          v-model="searchForm.canSale"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="允许销售"
          highlight-first-item
          clearable
        />
        <ht-autoselect
          v-else
          v-model="searchForm.canSale"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="允许销售"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="允许采购">
        <ht-autoselect
          v-if="setFoucs('canPurchase')"
          v-delay-focus="setFoucs('canPurchase')"
          v-model="searchForm.canPurchase"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="允许采购"
          highlight-first-item
          clearable
        />
        <ht-autoselect
          v-else
          v-model="searchForm.canPurchase"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="允许采购"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="设置标准车型">
        <ht-autoselect
          v-if="setFoucs('setAvaVehModel')"
          v-delay-focus="setFoucs('setAvaVehModel')"
          v-model="searchForm.setAvaVehModel"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="设置标准车型"
          highlight-first-item
          clearable
        />
        <ht-autoselect
          v-else
          v-model="searchForm.setAvaVehModel"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="设置标准车型"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item
        label-width="0"
        style="margin-top: 10px; text-align: right;"
      >
        <div class="flex">
          <el-checkbox
            class="m-l-27"
            label="仅查询无配件图片的配件"
            v-model="searchForm.hasImage"
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
          @click.stop="searchHandle(searchForm)"
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
      :delayFocus="activeTab === TABS[1].id"
      :hasImage="searchForm.hasImage"
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
          v-model="searchForm.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="车型/适用车型">
        <ht-autocomplete
          v-model="searchForm.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="车型/适用车型"
          clearable
        />
      </el-form-item>
      <el-form-item label="配件品牌">
        <ht-autocomplete
          v-model="searchForm.brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="配件品牌"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="产地">
        <ht-autocomplete
          v-model="searchForm.productionPlace"
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
          v-model="searchForm.productionCode"
          placeholder="生产码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.productionCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="searchForm.productionCode"
          placeholder="生产码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.productionCodeMatch"
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
          v-model="searchForm.posCode"
          placeholder="部位码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.posCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="searchForm.posCode"
          placeholder="部位码"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.posCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
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
      <el-form-item label="集采配件">
        <ht-autoselect
          v-model="searchForm.groupPurchase"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="集采配件"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="允许销售">
        <ht-autoselect
          v-model="searchForm.canSale"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="允许销售"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="允许采购">
        <ht-autoselect
          v-model="searchForm.canPurchase"
          :options="searchBaseData.booleanMap"
          :trigger-on-focus="false"
          placeholder="允许采购"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="图号">
        <ht-input
          v-model="searchForm.customCode"
          placeholder="图号"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="searchForm.customCodeMatch"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="批量查询">
        <parsing-codes v-model="batchData" />
      </el-form-item>
      <el-checkbox
        class="m-l-27"
        label="仅查询无配件图片的配件"
        v-model="searchForm.hasImage"
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
          @click.stop="searchHandle(searchForm)"
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
  </ht-dialog>
</template>

<script>
import StdVehModelsSearch from "@/components/std-veh-models-search";
import ParsingCodes from "@/components/parsingCodes";
import { searchMixin } from "@/mixins";
import SetDefaultFoucusBox from "@/components/SetDefaultFoucusBox/index.vue";
import { getStaffSystemParamsDetail } from "@/api/base/base";
import * as store from "@/utils/store";

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
const defaultSearchForm = {
  codeMatch: "fuzzy",
  code: "",
  customCodeMatch: "fuzzy",
  productionCodeMatch: "fuzzy",
  posCodeMatch: "fuzzy",
  customCode: "",
  name: "",
  brand: "",
  productionPlace: "",
  vehModel: "",
  categoryName: null,
  model: "",
  groupPurchase: null,
  canSale: null,
  canPurchase: null,
  setAvaVehModel: null,
  hasImage: false
};
const SET_DEFAULT_FOCUS_OPTIONS = [
  { id: "code", name: "配件编码" },
  { id: "customCode", name: "图号" },
  { id: "name", name: "配件名称" },
  { id: "vehModel", name: "车型/适用车型" },
  { id: "brand", name: "配件品牌" },
  { id: "productionPlace", name: "产地" },
  { id: "categoryName", name: "配件分类" },
  { id: "model", name: "规格" },
  { id: "groupPurchase", name: "集采配件" },
  { id: "canSale", name: "允许销售" },
  { id: "canPurchase", name: "允许采购" },
  { id: "setAvaVehModel", name: "设置标准车型" }
];
const defaultTab0Focus = "code";

export default {
  name: "SearchBox",
  components: {
    StdVehModelsSearch,
    ParsingCodes,
    SetDefaultFoucusBox
  },
  mixins: [searchMixin],
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeTab: TABS[0].id,
      TABS,
      PART_CODE_WAY,
      searchForm: { ...defaultSearchForm },
      batchData: [],
      focusItem: "",
      setDefaultFoucusBoxVisible: false,
      tab0Focus: "",
      SET_DEFAULT_FOCUS_OPTIONS
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.initFormData();
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
      this.searchForm = {
        ...this.searchForm,
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
  },
  methods: {
    store() {
      return store;
    },
    localSave(formData) {
      //第二个tab提交之前已保存，无需再保存；
      if (!formData && this.activeTab === 1) return;
      const _formData = formData || this.searchForm;
      const localParams0 = {
        codeMatch: _formData.codeMatch,
        customCodeMatch: _formData.customCodeMatch,
        productionCodeMatch: _formData.productionCodeMatch,
        posCodeMatch: _formData.posCodeMatch,
        hasImage: _formData.hasImage
      };
      const localParam12 = {
        hasImage: _formData.hasImage
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
      this.searchForm = {
        ...defaultSearchForm,
        ...localFormData
      };
    },
    getTab0Focus() {
      getStaffSystemParamsDetail({ module: "common", type: "focuse" })
        .then(res => {
          if (res.value && res.value[this.type]) {
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
        this.$attrs.visible
      );
    },
    showSetDefaultFoucusBox() {
      this.setDefaultFoucusBoxVisible = true;
    },
    searchHandle(searchForm) {
      let fields = {};
      let parts = {};
      switch (this.activeTab) {
        case TABS[0].id:
          parts = {
            code: searchForm.code,
            codeMatch: searchForm.codeMatch,
            customCode: searchForm.customCode,
            customCodeMatch: searchForm.customCodeMatch,
            name: searchForm.name,
            vehModel: searchForm.vehModel,
            brand: searchForm.brand,
            productionPlace: searchForm.productionPlace,
            categoryName: searchForm.categoryName,
            model: searchForm.model,
            groupPurchase: searchForm.groupPurchase,
            canSale: searchForm.canSale,
            canPurchase: searchForm.canPurchase,
            productionCode: searchForm.productionCode,
            productionCodeMatch: searchForm.productionCodeMatch,
            posCodeMatch: searchForm.posCodeMatch,
            posCode: searchForm.posCode,
            setAvaVehModel: searchForm.setAvaVehModel
          };
          if (searchForm.hasImage) {
            parts.hasImage = !searchForm.hasImage;
          }
          break;
        case TABS[1].id:
          parts = {
            avaVehModel: searchForm
          };
          if (searchForm.hasImage) {
            parts.hasImage = !searchForm.hasImage;
          }
          break;
        case TABS[2].id:
          fields = {
            ...fields,
            bookQties: this.batchData.length
              ? this.batchData.map(item => item.num)
              : []
          };
          parts = {
            name: searchForm.name,
            vehModel: searchForm.vehModel,
            brand: searchForm.brand,
            productionPlace: searchForm.productionPlace,
            categoryName: searchForm.categoryName,
            groupPurchase: searchForm.groupPurchase,
            canSale: searchForm.canSale,
            canPurchase: searchForm.canPurchase,
            customCode: searchForm.customCode,
            customCodeMatch: searchForm.customCodeMatch,
            productionCode: searchForm.productionCode,
            productionCodeMatch: searchForm.productionCodeMatch,
            posCodeMatch: searchForm.posCodeMatch,
            posCode: searchForm.posCode,
            codes: this.batchData.length
              ? this.batchData.map(item => item.code)
              : []
          };
          if (searchForm.hasImage) {
            parts.hasImage = !searchForm.hasImage;
          }
          break;
        default:
          break;
      }
      this.$emit("searchParamsChange", {
        type: this.type,
        fields,
        condsBeforeAgg: { parts }
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
