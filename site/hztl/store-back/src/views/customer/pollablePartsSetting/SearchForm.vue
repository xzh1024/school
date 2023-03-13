<template>
  <div class="search-form">
    <div class="search-container">
      <el-input
        v-model="formData.code"
        clearable
        class="search-item-container"
      >
        <template slot="prepend">配件编码</template>
      </el-input>

      <el-input
        v-model="formData.name"
        clearable
        class="search-item-container"
      >
        <template slot="prepend">配件名称</template>
      </el-input>

      <div class="search-item-container select-container">
        <div class="select-label">配件品牌</div>
        <el-select
          v-model="formData.brand"
          :remote-method="remoteBrands"
          filterable
          remote
          clearable
          class="select-content"
        >
          <el-option
            v-for="(item, index) in brands"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <div class="search-item-container select-container">
        <div class="select-label">规格</div>
        <el-autocomplete
          v-model="formData.swSpec"
          :fetch-suggestions="fetchSwSpecs"
          clearable
          class="select-content"
        />
      </div>

      <el-input
        v-model="formData.vehModel"
        clearable
        class="search-item-container"
      >
        <template slot="prepend">车型/适用车型</template>
      </el-input>

      <el-input
        v-model="formData.swCategory"
        clearable
        class="search-item-container"
      >
        <template slot="prepend">配件分类</template>
      </el-input>

      <el-input
        v-model="formData.productionPlace"
        clearable
        class="search-item-container"
      >
        <template slot="prepend">产地</template>
      </el-input>

      <el-input
        v-model="formData.manuCode"
        clearable
        class="search-item-container"
      >
        <template slot="prepend">生产码</template>
      </el-input>

      <div class="search-item-container select-container">
        <div class="select-label">库存数量</div>
        <el-input
          v-model="formData.qtyValue"
          clearable
        >
          <template slot="prepend">
            <el-select
              v-model="formData.qtyType"
              style="margin-top: -4px; margin-left: -16px;margin-right: -11px; width: 75px;"
            >
              <el-option
                v-for="(item, index) in QTY_TYPES"
                :key="index"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </template>
        </el-input>
      </div>

      <div class="search-item-container select-container">
        <div class="select-label">价格是否为0</div>
        <el-select
          v-model="formData.zeroPrice"
          clearable
          class="select-content"
        >
          <el-option
            v-for="(item, index) in ZERO_PRICES"
            :key="index"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>

      <div class="search-item-container select-container">
        <div class="select-label">是否可查件</div>
        <el-select
          v-model="formData.searchType"
          clearable
          class="select-content"
        >
          <el-option
            v-for="(item, index) in SEARCH_TYPES"
            :key="index"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>

      <div class="search-item-container select-container">
        <div class="select-label">享受价格类型</div>
        <el-select
          v-model="formData.priceType"
          clearable
        >
          <el-option
            v-for="(item, index) in priceTypes"
            :key="index"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>

      <div class="search-item-container select-container" style="width: 252px;">
        <div class="select-label">限购日期</div>
        <el-date-picker
          v-model="deteRange"
          type="daterange"
          range-separator="/"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        />
      </div>

      <el-checkbox v-model="formData.onlyPromotion" class="checkbox-container">
        促销
      </el-checkbox>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 14px; font-weight: bold;">
        <span v-show="CustomerName || applyer || contacts">客户名称：</span>
        <span>{{ CustomerName }}</span>
        <span v-show="CustomerName && applyer">-</span>
        <span>{{ applyer }}{{ contacts ? `（${contacts}）` : "" }}</span>
      </div>
      <div style="margin-right: 10px; text-align: right;">
        <el-button type="primary" @click="searchHandle">查询</el-button>
        <el-button type="info" @click="resetHandle">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { get } from "@/utils/http";
import store from "./store";

const ZERO_PRICES = [
  { code: "0", name: "全部" },
  { code: "1", name: "价格为0" },
  { code: "2", name: "价格不为0" }
];
const SEARCH_TYPES = [
  { code: 0, name: "全部" },
  { code: 1, name: "是" },
  { code: 2, name: "否" }
];
const QTY_TYPES = [
  { code: "0", name: "全部" },
  { code: "1", name: "等于" },
  { code: "2", name: "大于" },
  { code: "3", name: "小于" }
];
const defaultFormData = {
  code: "",
  name: "",
  brand: "",
  swSpec: "",
  vehModel: "",
  swCategory: "",
  productionPlace: "",
  manuCode: "",
  qtyValue: "",
  qtyType: "0",
  zeroPrice: "0",
  searchType: 0,
  priceType: "",
  limitStartTime: "",
  limitEndTime: "",
  onlyPromotion: false
}

export default {
  name: "SearchForm",
  store,
  props: {
    CustomerName: {
      type: String,
      default: ""
    },
    applyer: {
      type: String,
      default: ""
    },
    contacts: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ZERO_PRICES,
      SEARCH_TYPES,
      QTY_TYPES,
      formData: { ...defaultFormData },
      deteRange: [],
      brands: []
    };
  },
  computed: {
    ...mapState(["priceTypes"])
  },
  mounted() {
    this.$store.dispatch("getPartTypes");
    this.$store.dispatch("getPriceTypes");
    this.searchHandle();
  },
  methods: {
    remoteBrands(query) {
      get('/company-skus/field-value', { field: "brand", value: query })
        .then(res => {
          this.brands = res || [];
        })
        .catch(() => {
          this.brands = []
        });
    },
    fetchSwSpecs(query, cb) {
      get('/company-skus/field-value', { field: "spec", value: query })
        .then(res => {
          cb(res.map(item => ({ value: item })) || []);
        })
        .catch(() => {
          cb([]);
        })
    },
    searchHandle() {
      this.$emit("search", {
        ...this.formData,
        priceType: this.formData.priceType === "全部" ? "" : this.formData.priceType,
        limitStartTime: this.deteRange && this.deteRange.length ? this.deteRange[0] : "",
        limitEndTime: this.deteRange && this.deteRange.length ? this.deteRange[1] : ""
      });
    },
    resetHandle() {
      this.deteRange = [];
      this.formData = { ...defaultFormData };
    }
  }
}
</script>

<style lang="less" scoped>
.search-form {
  font-size: 14px;
}
.search-container {
  display: flex;
  flex-wrap: wrap;

  .search-item-container {
    flex: none;
    width: 195px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  /deep/ .el-input-group__prepend {
    padding: 2px;
  }
}
.select-container {
  display: flex;
  align-items: center;

  .select-label {
    flex: none;
    padding: 5px 2px;
    height: 32px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    color: #909399;
    background-color: #F5F7FA;
  }
  .select-content {
    flex: 1;
  }
}
.checkbox-container {
  margin-bottom: -3px;
  padding: 5px 2px;
  height: 32px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  font-size: 12px;
  color: #909399;
  background-color: #F5F7FA;
}
</style>