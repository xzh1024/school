<template>
  <ht-dialog
    v-bind="$attrs"
    width="400px"
    title="退货查询"
    v-on="$listeners"
    class="ignore-top-hotkeys"
  >
    <el-form
      submit-on-enter
      class="form-item-small-margin-bottom mt-1"
      size="mini"
      label-width="100px"
    >
      <el-form-item label="采购历史">
        <ht-autoselect
          v-if="setFoucs('hasHistory')"
          v-delay-focus="setFoucs('hasHistory')"
          v-model="formData.hasHistory"
          :options="searchBaseData.hasHistoryStatus"
          :trigger-on-focus="false"
          placeholder="有/无"
          highlight-first-item
          submit-on-enter-ignore
        />
        <ht-autoselect
          v-else
          v-model="formData.hasHistory"
          :options="searchBaseData.hasHistoryStatus"
          :trigger-on-focus="false"
          placeholder="有/无"
          highlight-first-item
          submit-on-enter-ignore
        />
      </el-form-item>
      <el-form-item label="供应商">
        <ht-autoselect
          v-if="setFoucs('cooperatorId')"
          v-delay-focus="setFoucs('cooperatorId')"
          v-model="formData.cooperatorId"
          :fetch-suggestions="searchLoadAllSupplierCooperators"
          :default-value.sync="formData.cooperatorName"
          remote
          filter-zero
          :trigger-on-focus="false"
          clearable
          highlight-first-item
          placeholder="供应商"
        />
        <ht-autoselect
          v-else
          v-model="formData.cooperatorId"
          :fetch-suggestions="searchLoadAllSupplierCooperators"
          :default-value.sync="formData.cooperatorName"
          remote
          filter-zero
          :trigger-on-focus="false"
          clearable
          highlight-first-item
          placeholder="供应商"
        />
      </el-form-item>
      <el-form-item label="业务日期">
        <ht-date-range v-model="formData.billDate" />
      </el-form-item>
      <el-form-item label="单据号">
        <ht-input
          v-if="setFoucs('billNo')"
          v-delay-focus="setFoucs('billNo')"
          v-model="formData.billNo"
          placeholder="单据号"
        />
        <ht-input v-else v-model="formData.billNo" placeholder="单据号" />
      </el-form-item>
      <el-form-item label="配件编码">
        <ht-input
          v-if="setFoucs('code')"
          v-delay-focus="setFoucs('code')"
          v-model="formData.code"
          class="input-with-select"
          placeholder="配件编码"
          size="mini"
        >
          <ht-select
            slot="append"
            v-model="formData.codePattern"
            :clearable="false"
            :options="PART_CODE_WAY"
            placeholder
            style="width: 100px"
          />
        </ht-input>
        <ht-input
          v-else
          v-model="formData.code"
          class="input-with-select"
          placeholder="配件编码"
          size="mini"
        >
          <ht-select
            slot="append"
            v-model="formData.codePattern"
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
          clearable
          highlight-first-item
        />
        <ht-autocomplete
          v-else
          v-model="formData.name"
          :fetch-suggestions="autocompleteSearchPartName"
          :trigger-on-focus="false"
          placeholder="配件名称"
          clearable
          highlight-first-item
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
          clearable
          highlight-first-item
        />
        <ht-autocomplete
          v-else
          v-model="formData.brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="配件品牌"
          clearable
          highlight-first-item
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
          clearable
          highlight-first-item
        />
        <ht-autocomplete
          v-else
          v-model="formData.productionPlace"
          :fetch-suggestions="autocompleteSearchProductionPlace"
          :trigger-on-focus="false"
          placeholder="产地"
          clearable
          highlight-first-item
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
          clearable
          highlight-first-item
        />
        <ht-autocomplete
          v-else
          v-model="formData.property"
          :fetch-suggestions="autocompleteSearchProperty"
          :trigger-on-focus="false"
          placeholder="配件性质"
          clearable
          highlight-first-item
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
      <el-form-item label="规格">
        <ht-input
          v-if="setFoucs('model')"
          v-delay-focus="setFoucs('model')"
          v-model="formData.model"
          placeholder="规格"
        />
        <ht-input v-else v-model="formData.model" placeholder="规格" />
      </el-form-item>
      <el-form-item label="单据类型">
        <ht-autoselect
          v-if="setFoucs('type')"
          v-delay-focus="setFoucs('type')"
          v-model="formData.type"
          :options="typeOptions"
          :trigger-on-focus="false"
          placeholder="单据类型"
          clearable
          highlight-first-item
        />
        <ht-autoselect
          v-else
          v-model="formData.type"
          :options="typeOptions"
          :trigger-on-focus="false"
          placeholder="单据类型"
          clearable
          highlight-first-item
        />
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
        <el-button type="primary" size="mini" plain @click.stop="sureHandle">
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
      :type="TYPE"
    />
    <set-default-warehouses-box
      :visible.sync="setDefaultWarehouseBoxVisible"
      v-model="defaultFormData.warehouseIds"
      :options="warehouseOptions"
      :type="TYPE"
      @change="handleDefaultWarehouseIdsChange"
    />
  </ht-dialog>
</template>

<script>
import { searchMixin } from "@/mixins";
import { STOCK_LIMITS_OPTINS, PART_CODE_WAY } from "@/constants";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import SetDefaultFoucusBox from "@/components/SetDefaultFoucusBox/index.vue";
import { getStaffSystemParamsDetail } from "@/api/base/base";
import SetDefaultWarehousesBox from "@/components/SetDefaultWarehousesBox/index.vue";

const topHotkeys = new TopHotkeys();
let lastKeyScope;

const TYPE_OPTIONS = [
  { id: 0, name: "全部" },
  { id: 1, name: "采购到货单" },
  { id: 2, name: "急件到货单" }
];
const defaultFormData = {
  hasHistory: true,
  cooperatorId: null,
  cooperatorName: "",
  billDate: [],
  billNo: "",
  code: "",
  codePattern: 0,
  name: "",
  vehModel: "",
  brand: "",
  productionPlace: "",
  property: "",
  warehouseIds: [],
  model: "",
  type: null,
  stockLimits: []
};
const SET_DEFAULT_FOCUS_OPTIONS = [
  { id: "hasHistory", name: "采购历史" },
  { id: "cooperatorId", name: "供应商" },
  { id: "billNo", name: "单据号" },
  { id: "code", name: "配件编码" },
  { id: "name", name: "配件名称" },
  { id: "vehModel", name: "车型/适用车型" },
  { id: "brand", name: "配件品牌" },
  { id: "productionPlace", name: "产地" },
  { id: "property", name: "配件性质" },
  { id: "model", name: "规格" },
  { id: "type", name: "单据类型" }
];
const defaultTab0Focus = "hasHistory";
const TYPE = "CT";

export default {
  name: "ReturnSearchBox",
  components: {
    SetDefaultFoucusBox,
    SetDefaultWarehousesBox
  },
  mixins: [searchMixin],
  props: {
    cooperator: {
      type: Object,
      default() {
        return {
          cooperatorName: "",
          cooperatorId: null
        };
      }
    },
    companyId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      defaultFormData,
      formData: {
        ...defaultFormData
      },
      PART_CODE_WAY,
      STOCK_LIMITS_OPTINS,
      typeOptions: TYPE_OPTIONS,
      focusItem: "",
      setDefaultFoucusBoxVisible: false,
      tab0Focus: "",
      SET_DEFAULT_FOCUS_OPTIONS,
      TYPE,
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
    initFormData() {
      let localFormData = {};
      try {
        if (localStorage.search) {
          localFormData = JSON.parse(localStorage.search)[TYPE] || {};
        }
      } catch (e) {
        console.log(e);
      }
      this.formData = {
        ...this.defaultFormData,
        ...localFormData,
        ...this.cooperator
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
      getStaffSystemParamsDetail({
        module: "webSetting",
        type: "defaultQueryWarehouse"
      }).then(res => {
        if (res.value && res.value[TYPE]) {
          this.defaultFormData.warehouseIds = res.value[TYPE];
        }
      });
    },
    shwoDefaultWarehouseBox() {
      this.setDefaultWarehouseBoxVisible = true;
    },
    handleDefaultWarehouseIdsChange(warehouseIds) {
      this.formData.warehouseIds = [...warehouseIds];
    },

    sureHandle() {
      const params = this.formData;
      params.billDateStart =
        this.formData.billDate && this.formData.billDate.length
          ? this.formData.billDate[0]
          : undefined;
      params.billDateEnd =
        this.formData.billDate && this.formData.billDate.length
          ? this.formData.billDate[1]
          : undefined;
      if (!params) return;
      this.$emit("on-search", { ...params, companyId: this.companyId });

      const localParams = {
        codePattern: this.formData.codePattern
      };
      localStorage.search = JSON.stringify({
        ...(localStorage.search ? JSON.parse(localStorage.search) : {}),
        [TYPE]: localParams
      });

      this.cancelHandle();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
