<template>
  <div style="height: 100%;">
    <ht-autocomplete
      v-model="vinCode"
      placeholder="请输入或选择VIN码"
      popper-class="vin-search-poper"
      class="search-btn-container"
      style="margin-left: calc(50% - 200px); width: 400px;"
      :fetch-suggestions="autocompleteSearch"
      :trigger-on-focus="false"
      highlight-first-item
      @select="searchByVin"
    >
      <el-button v-loading="btnLoading" slot="append" @click.stop="searchByVin">
        查 询
      </el-button>
      <template slot-scope="scope">
        <div>{{ scope.item.value }}（{{ scope.item.name }}）</div>
      </template>
    </ht-autocomplete>
    <div class="parts-list-title">
      已覆盖车辆品牌
    </div>
    <div v-loading="brandLoading" class="parts-list-content">
      <div class="parts-list-header">
        <div>
          <span
            v-for="(item, index) in letterList"
            :key="index"
            :underline="false"
            :class="
              item.isActived
                ? 'letter-item letter-item-active text-font-primary'
                : 'letter-item text-font'
            "
            @click.stop="handleLetterChange(item)"
          >
            {{ item.name }}
          </span>
        </div>
        <ht-input
          v-model="searchBrand"
          placeholder="示例：奥迪"
          size="mini"
          class="search-btn-container"
          style="width: 300px;"
        >
          <el-button
            slot="append"
            size="mini"
            icon="el-icon-search"
            @click.stop="searchByBrand"
          />
        </ht-input>
      </div>
      <div class="parts-list-main">
        <span
          v-for="(item, index) in brandList"
          :key="index"
          :class="item.isActived ? 'part-item part-item-active' : 'part-item'"
          @click.stop="handleBrandChange(item)"
        >
          <img :src="item.photoLink" alt="LOGO" class="logo-content" />
          <div class="logo-title">{{ item.name }}</div>
        </span>
        <span class="more-item">
          <span class="more-item-content">更多品牌陆续更新…</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getEpcVehBrands, getVinModelData } from "@/api/epc";
import { mnemonicSearch } from "@/utils/filterData";

const vinLocalKey = "vinSearchedList";
let localData = [];
try {
  localData = JSON.parse(localStorage.getItem(vinLocalKey)) || [];
} catch (e) {
  localData = [];
}
const LETTERS = [
  { name: "全部:", isActived: true },
  { name: "A", isActived: false },
  { name: "B", isActived: false },
  { name: "C", isActived: false },
  { name: "D", isActived: false },
  { name: "E", isActived: false },
  { name: "F", isActived: false },
  { name: "G", isActived: false },
  { name: "H", isActived: false },
  { name: "I", isActived: false },
  { name: "J", isActived: false },
  { name: "K", isActived: false },
  { name: "L", isActived: false },
  { name: "M", isActived: false },
  { name: "N", isActived: false },
  { name: "O", isActived: false },
  { name: "P", isActived: false },
  { name: "Q", isActived: false },
  { name: "R", isActived: false },
  { name: "S", isActived: false },
  { name: "T", isActived: false },
  { name: "U", isActived: false },
  { name: "V", isActived: false },
  { name: "W", isActived: false },
  { name: "X", isActived: false },
  { name: "Y", isActived: false },
  { name: "Z", isActived: false }
];

export default {
  name: "Main",
  data() {
    return {
      vinCode: "",
      btnLoading: false,
      vehModelData: {},
      searchBrand: "",
      brandLoading: false,
      epcVehBrands: [],
      letterList: [],
      brandList: []
    };
  },
  mounted() {
    this.loadEpcVehBrands();
  },
  methods: {
    autocompleteSearch(query, cb) {
      const options = mnemonicSearch(localData, query, "value");
      cb(options.slice(0, 20));
    },
    searchByVin() {
      if (!this.vinCode) {
        this.$message.warning({
          message: "请输入VIN码！",
          showClose: true
        });
        return;
      }
      this.btnLoading = true;
      getVinModelData({ vin: this.vinCode })
        .then(res => {
          this.vehModelData = res || {};
          if (
            !localData.find(
              item => item.value === this.vehModelData.vinCode || this.vinCode
            )
          ) {
            localData.unshift({
              value: this.vehModelData.vinCode || this.vinCode,
              // 品牌-厂牌
              name: `${this.vehModelData.brand}-${this.vehModelData.subBrand}`
            });
            localStorage.setItem(vinLocalKey, JSON.stringify(localData));
          }
          this.btnLoading = false;
          this.$emit("change", this.vehModelData, {
            name: this.vehModelData.brand,
            photoLink: this.vehModelData.logoUrl
          });
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
    loadEpcVehBrands() {
      this.brandLoading = true;
      getEpcVehBrands()
        .then(res => {
          this.epcVehBrands =
            res && res.length ? res.filter(item => item.photoLink) : [];
          this.brandList = this.epcVehBrands.map((item, index) => ({
            ...item,
            id: index + 1,
            isActived: false
          }));
          if (this.epcVehBrands.length) {
            const firstLetters = this.epcVehBrands.map(item =>
              item.mnemonic.substr(0, 1)
            );
            this.letterList = LETTERS.filter(
              item => firstLetters.includes(item.name) || item.name === "全部:"
            );
          } else {
            this.letterList = [];
          }
          this.brandLoading = false;
        })
        .catch(() => {
          this.brandLoading = false;
        });
    },
    searchByBrand() {
      this.searchBrand = this.searchBrand.replace(/\s*/g, "");
      if (this.searchBrand) {
        this.brandList = this.epcVehBrands.filter(
          item =>
            item.name.indexOf(this.searchBrand) > -1 ||
            item.mnemonic.indexOf(this.searchBrand.toUpperCase()) > -1
        );
      } else {
        this.brandList = this.epcVehBrands;
      }
      this.letterList = this.letterList.map(item => ({
        ...item,
        isActived: item.name === "全部:"
      }));
    },
    handleLetterChange(letter) {
      if (letter.isActived) {
        return;
      }
      this.letterList = this.letterList.map(item => ({
        ...item,
        isActived: item.name === letter.name
      }));
      this.getBrandList(letter, true);
    },
    getBrandList(letter) {
      if (letter.name && letter.name !== "全部:") {
        this.brandList = this.epcVehBrands
          .filter(item => letter.name === item.mnemonic.substr(0, 1))
          .map((item, index) => ({
            ...item,
            id: index + 1,
            isActived: false
          }));
      } else {
        this.brandList = this.epcVehBrands.map((item, index) => ({
          ...item,
          id: index + 1,
          isActived: false
        }));
      }
    },
    handleBrandChange(brand) {
      this.brandList = this.brandList.map(item => ({
        ...item,
        isActived: brand.id === item.id
      }));
      this.$emit("brand-change", brand);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.vin-search-poper {
  &::v-deep .el-autocomplete-suggestion {
    li {
      line-height: 20px;
      padding: 5px 20px;
    }
  }
}
.search-btn-container {
  &::v-deep .el-button {
    border-radius: 0;
    color: rgba(255, 255, 255);
    background: #409eff;
    @include background_color("color-light");
  }
}

.parts-list-title {
  margin: 10px 0 0 0;
  padding-bottom: 5px;
  font-size: 16px;
}
.parts-list-content {
  height: calc(100% - 65px);
  padding: 10px;
  border: solid 1px #dcdfe6;

  .parts-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .letter-item {
      font-weight: 500;
      cursor: pointer;

      & + .letter-item {
        margin-left: 10px;
      }
    }
    .letter-item-active {
      font-weight: 500;
      cursor: default;
    }
  }
  .parts-list-main {
    height: calc(100% - 38px);
    overflow: auto;

    .part-item {
      display: inline-block;
      width: 116px;
      height: 166px;
      border: solid 1px rgba(222, 225, 231, 1);
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      vertical-align: bottom;

      .logo-content {
        width: 100%;
        height: calc(100% - 50px);
        display: block;
      }

      .logo-title {
        padding: 0 5px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #f9f9f9;
        border-top: solid 1px rgba(222, 225, 231, 1);
      }

      &:hover {
        border: solid 1px $color-primary;
        @include border_color("color-primary");

        .logo-title {
          color: $color-primary;
          @include font_color("color-primary");
          background: rgba(0, 155, 242, 0.156862745098039);
          border-top: solid 1px $color-primary;
          @include border_top_color("color-primary");
        }
      }
    }

    .part-item-active {
      border: solid 1px $color-primary;
      @include border_color("color-primary");

      .logo-title {
        color: $color-primary;
        @include font_color("color-primary");
        background: rgba(0, 155, 242, 0.156862745098039);
        border-top: solid 1px $color-primary;
        @include border_top_color("color-primary");
      }
    }

    .more-item {
      display: inline-block;
      width: 116px;
      height: 166px;
      vertical-align: bottom;
      text-align: center;
      background: #f9f9f9;
      border: solid 1px rgba(222, 225, 231, 1);
      font-size: 12px;

      .more-item-content {
        display: inline-block;
        padding-top: calc(50% + 12px);
      }
    }
  }
}
</style>
