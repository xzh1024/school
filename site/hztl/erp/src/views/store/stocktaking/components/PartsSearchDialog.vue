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
      class="tabs-regular ignore-hotkeys"
      style="margin: 0"
    />
    <el-form
      v-if="activeTab === TABS[0].id"
      submit-on-enter
      label-width="80px"
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
            v-model="formData.codeMatchType"
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
            v-model="formData.codeMatchType"
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
            v-model="formData.customCodePattern"
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
            v-model="formData.customCodePattern"
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
      <el-form-item label="适用车型">
        <ht-autocomplete
          v-if="setFoucs('vehModel')"
          v-delay-focus="setFoucs('vehModel')"
          v-model="formData.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="适用车型"
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="formData.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="适用车型"
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
      <el-form-item label="配件性质">
        <ht-autocomplete
          v-if="setFoucs('property')"
          v-delay-focus="setFoucs('property')"
          v-model="formData.property"
          :fetch-suggestions="autocompleteSearchProperty"
          :trigger-on-focus="false"
          placeholder="配件性质"
          highlight-first-item
          clearable
        />
        <ht-autocomplete
          v-else
          v-model="formData.property"
          :fetch-suggestions="autocompleteSearchProperty"
          :trigger-on-focus="false"
          placeholder="配件性质"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="所属仓库">
        <ht-autoselect
          v-if="setFoucs('warehouseId')"
          v-delay-focus="setFoucs('warehouseId')"
          v-model="formData.warehouseId"
          :fetch-suggestions="
            query =>
              searchLoadAllWarehouses(query, store().userInfoMsg().companyId)
          "
          :trigger-on-focus="false"
          placeholder="所属仓库"
          highlight-first-item
          remote
          filter-zero
          clearable
        />
        <ht-autoselect
          v-else
          v-model="formData.warehouseId"
          :fetch-suggestions="
            query =>
              searchLoadAllWarehouses(query, store().userInfoMsg().companyId)
          "
          :trigger-on-focus="false"
          placeholder="所属仓库"
          highlight-first-item
          remote
          filter-zero
          clearable
        />
      </el-form-item>
      <el-form-item label="盘点状态">
        <ht-autoselect
          v-if="setFoucs('status')"
          v-delay-focus="setFoucs('status')"
          v-model="formData.status"
          :options="searchBaseData.allTakingStutas"
          :trigger-on-focus="false"
          placeholder="盘点状态"
          highlight-first-item
          clearable
        />
        <ht-autoselect
          v-else
          v-model="formData.status"
          :options="searchBaseData.allTakingStutas"
          :trigger-on-focus="false"
          placeholder="盘点状态"
          highlight-first-item
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
      <el-form-item label="库存数量">
        <ht-input
          v-if="setFoucs('qtyLimit')"
          v-delay-focus="setFoucs('qtyLimit')"
          v-model="formData.qtyLimit"
          placeholder="库存数量"
          type="number"
          class="input-with-select"
        >
          <ht-select
            slot="prepend"
            v-model="formData.qtyLimitType"
            :clearable="false"
            :options="qtyOptions"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="formData.qtyLimit"
          placeholder="库存数量"
          type="number"
          class="input-with-select"
        >
          <ht-select
            slot="prepend"
            v-model="formData.qtyLimitType"
            :clearable="false"
            :options="qtyOptions"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="业务日期">
        <ht-date-range v-model="dateRange" clearable shortcuts-type="all" />
      </el-form-item>
      <el-form-item label="未盘点">
        <ht-input
          v-if="setFoucs('lastOptDay')"
          v-delay-focus="setFoucs('lastOptDay')"
          v-model.number="formData.lastOptDay"
          placeholder="未盘点时间"
          type="number"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="lastOptType"
            :clearable="false"
            :options="timeUnitOptions"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model.number="formData.lastOptDay"
          placeholder="未盘点时间"
          type="number"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="lastOptType"
            :clearable="false"
            :options="timeUnitOptions"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item
        label-width="0"
        style="margin-top: 10px; text-align: right;"
      >
        <el-button
          type="text"
          size="mini"
          @click.stop="showSetDefaultFoucusBox"
        >
          光标默认锁定设置
        </el-button>
      </el-form-item>
      <el-form-item
        label-width="0"
        style="margin-top: 10px; text-align: center;"
      >
        <el-button type="primary" plain size="mini" @click.stop="handleSearch">
          确 定(F3)
        </el-button>
        <el-button type="primary" plain size="mini" @click.stop="handleHide">
          取 消(Esc)
        </el-button>
      </el-form-item>
    </el-form>

    <el-form
      v-if="activeTab === TABS[1].id"
      submit-on-enter
      label-width="80px"
      class="form-item-small-margin-bottom mt-1"
      size="mini"
    >
      <el-form-item label="配件名称">
        <ht-autocomplete
          v-delay-focus="activeTab === TABS[1].id"
          v-model="formData.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          highlight-first-item
          clearable
        />
      </el-form-item>
      <el-form-item label="适用车型">
        <ht-autocomplete
          v-model="formData.vehModel"
          :fetch-suggestions="autocompleteSearchVehModel"
          :trigger-on-focus="false"
          placeholder="适用车型"
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
        <ht-autoselect
          v-model="formData.warehouseId"
          :fetch-suggestions="
            query =>
              searchLoadManageWarehouses({
                name: query,
                managerCompanyId: store().userInfoMsg().companyId,
                managerStaffId: store().userInfoMsg().staffId
              })
          "
          :trigger-on-focus="false"
          placeholder="所属仓库"
          highlight-first-item
          remote
          filter-zero
          clearable
        />
      </el-form-item>
      <el-form-item label="配件分类">
        <ht-autoselect
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
      <el-form-item label="库存数量">
        <ht-input
          v-model="formData.qtyLimit"
          placeholder="库存数量"
          type="number"
          class="input-with-select"
        >
          <ht-select
            slot="prepend"
            v-model="formData.qtyLimitType"
            :clearable="false"
            :options="qtyOptions"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="业务日期">
        <ht-date-range v-model="dateRange" clearable shortcuts-type="all" />
      </el-form-item>
      <el-form-item label="未盘点">
        <ht-input
          v-model.number="formData.lastOptDay"
          placeholder="未盘点时间"
          type="number"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="lastOptType"
            :clearable="false"
            :options="timeUnitOptions"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="图号">
        <ht-input
          v-model="formData.customCode"
          placeholder="图号"
          class="input-with-select"
        >
          <ht-select
            slot="append"
            v-model="formData.customCodePattern"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
      </el-form-item>
      <el-form-item label="批量查询">
        <parsing-codes v-model="batchData" no-num />
      </el-form-item>
      <el-form-item
        label-width="0"
        style="margin-top: 10px; text-align: center;"
      >
        <el-button type="primary" plain size="mini" @click.stop="handleSearch">
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click.stop="handleHide">
          取消（Esc）
        </el-button>
      </el-form-item>
    </el-form>

    <set-default-foucus-box
      :visible.sync="setDefaultFoucusBoxVisible"
      v-model="tab0Focus"
      :options="SET_DEFAULT_FOCUS_OPTIONS"
      :type="TYPE"
    />
  </ht-dialog>
</template>
<script>
import ParsingCodes from "@/components/parsingCodes";
import { searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";
import { PART_CODE_WAY } from "@/constants";
import SetDefaultFoucusBox from "@/components/SetDefaultFoucusBox/index.vue";
import { getStaffSystemParamsDetail } from "@/api/base/base";
import * as store from "@/utils/store";

const TABS = [
  { id: "0", name: "精确查询" },
  { id: "1", name: "批量查询" }
];
const NUM_JUDGE_WAY_OPTIONS = [
  { id: 0, name: "大于" },
  { id: 1, name: "小于" },
  { id: 2, name: "等于" },
  { id: 3, name: "大于等于" },
  { id: 4, name: "小于等于" },
  { id: 5, name: "不等于" }
];
const TIME_UNIT_OPTIONS = [
  { id: "天", label: "天" },
  { id: "月", label: "月" }
];
const defaultFormData = {
  codeMatchType: 0,
  code: null,
  customCodePattern: 0,
  customCode: null,
  name: null,
  vehModel: null,
  brand: null,
  productionPlace: null,
  property: null,
  warehouseId: null,
  status: null,
  categoryName: null,
  model: null,
  qtyLimitType: 0,
  qtyLimit: null,
  lastOptDay: null
};
const SET_DEFAULT_FOCUS_OPTIONS = [
  { id: "code", name: "配件编码" },
  { id: "customCode", name: "图号" },
  { id: "name", name: "配件名称" },
  { id: "vehModel", name: "适用车型" },
  { id: "brand", name: "配件品牌" },
  { id: "productionPlace", name: "产地" },
  { id: "property", name: "配件性质" },
  { id: "warehouseId", name: "所属仓库" },
  { id: "status", name: "盘点状态" },
  { id: "categoryName", name: "配件分类" },
  { id: "model", name: "规格" },
  { id: "qtyLimit", name: "库存数量" },
  { id: "lastOptDay", name: "未盘点" }
];
const defaultTab0Focus = "code";
const TYPE = "PD";

export default {
  name: "PartsSearchDialog",
  components: {
    ParsingCodes,
    SetDefaultFoucusBox
  },
  mixins: [searchMixin],
  data() {
    return {
      activeTab: TABS[0].id,
      TABS,
      formData: {
        ...defaultFormData
      },
      dateRange: [],
      batchData: [],
      PART_CODE_WAY,
      qtyOptions: NUM_JUDGE_WAY_OPTIONS,
      timeUnitOptions: TIME_UNIT_OPTIONS,
      lastOptType: TIME_UNIT_OPTIONS[0].id,
      focusItem: "",
      setDefaultFoucusBoxVisible: false,
      tab0Focus: "",
      SET_DEFAULT_FOCUS_OPTIONS,
      TYPE
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
    initFormData() {
      this.batchData = [];
      this.activeTab = TABS[0].id;
      let localFormData = {};
      try {
        if (localStorage.search) {
          localFormData = JSON.parse(localStorage.search)[TYPE] || {};
        }
      } catch (e) {
        console.log(e);
      }
      this.formData = {
        ...defaultFormData,
        ...localFormData
      };
    },
    getTab0Focus() {
      getStaffSystemParamsDetail({ module: "common", type: "focuse" })
        .then(res => {
          if (res.value && res.value[TYPE]) {
            this.tab0Focus = res.value[TYPE];
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
    handleSearch() {
      const params = { ...this.formData };
      params.fromDate = this.dateRange ? dateFormat(this.dateRange[0]) : "";
      params.toDate = this.dateRange ? dateFormat(this.dateRange[1]) : "";
      params.lastOptDay =
        this.lastOptType === "月"
          ? 30 * this.formData.lastOptDay
          : this.formData.lastOptDay;
      if (this.activeTab === TABS[1].id) {
        params.codes = this.batchData.map(item => item.code);
      }
      this.$emit("searchParamsChange", params);

      const localParams = {
        codeMatchType: this.formData.codeMatchType,
        customCodePattern: this.formData.customCodePattern
      };
      localStorage.search = JSON.stringify({
        ...(localStorage.search ? JSON.parse(localStorage.search) : {}),
        [TYPE]: localParams
      });

      this.handleHide();
    },
    handleHide() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
