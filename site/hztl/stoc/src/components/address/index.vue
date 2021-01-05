<template>
  <div class="ht-address">
    <el-popover placement="bottom-start" width="426" v-model="addressVisible">
      <div class="address-body">
        <i class="icon-clear-circle-gray" @click="addressVisible = false"></i>
        <div class="address-search">
          <div class="search-wrap">
            <el-select
              v-model="areaCityValue"
              value-key="id"
              size="mini"
              filterable
              clearable
              placeholder="请输入城市名…"
            >
              <el-option
                v-for="city in cityOptions"
                :key="city.id"
                :label="city.name"
                :value="city"
              >
              </el-option>
            </el-select>
            <button class="search-button" @click="confirm">
              确定
            </button>
          </div>
          <div class="search-history-wrap">
            <div class="search-history">
              <span
                class="search-history-item"
                v-for="item in addressSearchHistory"
                :key="item.id"
                @click="handleCity(item)"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </div>
        <div class="address-letter">
          <span
            class="letter-item"
            v-for="letter in letterKeys"
            :key="letter.name"
            :class="{ 'is-active': letter.check }"
            @click="handleLetterCheck(letter)"
            >{{ letter.name }}</span
          >
        </div>
        <div class="address-list">
          <div
            class="address-mnemonic"
            v-for="(provinces, letterKey) in letterMap"
            :key="letterKey"
          >
            <div class="mnemonic-name">{{ letterKey }}</div>
            <div class="address-province-list">
              <div
                class="address-province"
                v-for="province in provinces"
                :key="province.id"
              >
                <div class="province-name">{{ province.name }}</div>
                <div class="address-city">
                  <span
                    class="city-name"
                    v-for="city in province.children"
                    :key="city.id"
                    @click="handleCity(city)"
                  >
                    {{ city.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="address-button" slot="reference">
        <i class="icon-site"></i>
        <span>{{ internalAreaCity ? internalAreaCity.name : "发货地" }}</span>
        <i :class="arrowClass"></i>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch } from "vue-property-decorator";
import { AreaModel } from "@/common/interface/commonInterface";
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();
import { namespace } from "vuex-class";
const CityStore = namespace("city");
import { BaseInfoModel } from "@/store/modules/base/interface";
const BaseStore = namespace("base");

interface LetterMapModel<T> {
  [key: string]: T[];
}
interface LetterKeyModel {
  name: string;
  check: boolean;
}

@Component({ name: "Address" })
export default class Address extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;
  @CityStore.Getter("activeAreaCity")
  protected activeAreaCity!: AreaModel;
  @CityStore.Mutation("setActiveAreaCity")
  protected setActiveAreaCity!: Function;

  protected internalAreaCity: AreaModel | "" = "";

  @Emit("areaCityChange")
  protected areaCityChange() {
    sessionStorage.activeAreaCity = JSON.stringify(this.internalAreaCity);
    this.setActiveAreaCity();
    const areaCity = this.internalAreaCity;
    // 记录地址
    if (areaCity) {
      this.updateAddressSearchHistory({
        id: areaCity.id,
        name: areaCity.name
      });
    }
    return areaCity;
  }
  protected addressVisible = false;

  protected areaCityValue: AreaModel | "" = "";
  // clear select value
  @Watch("addressVisible")
  protected addressVisibleChange(newVal: boolean) {
    if (newVal) {
      this.areaCityValue = "";
    }
  }

  get arrowClass() {
    return this.addressVisible ? "icon-up-gray" : "icon-down-gray";
  }

  protected handleCity(city: AreaModel) {
    this.internalAreaCity = city;
    this.$nextTick(() => {
      this.addressVisible = !this.addressVisible;
      this.areaCityChange();
    });
  }
  protected confirm() {
    this.handleCity(this.areaCityValue as AreaModel);
  }

  // 地址历史
  protected addressSearchHistory: AreaModel[] = [];

  protected baseLetterMap: LetterMapModel<AreaModel> = {};
  protected letterMap: LetterMapModel<AreaModel> = {};

  protected initLetterMap() {
    const letterProvinceMap: LetterMapModel<string> = this.letterProvinceMap;
    const map: LetterMapModel<AreaModel> = {};
    Object.keys(letterProvinceMap).forEach((key: string) => {
      if (letterProvinceMap[key]) {
        map[key] = [];
      }
    });
    this.letterMap = map;
  }

  protected letterProvinceMap: LetterMapModel<string> = {
    A: ["安"],
    B: ["北"],
    C: ["重"],
    // D: [],
    // E: [],
    F: ["福"],
    G: ["广", "贵", "甘"],
    H: ["河", "湖", "海", "黑"],
    // I: [],
    J: ["江", "吉"],
    // K: [],
    L: ["辽"],
    // M: [],
    N: ["宁", "内"],
    // O: [],
    // P: [],
    Q: ["青"],
    // R: [],
    S: ["陕", "山", "上", "四"],
    T: ["天"],
    // U: [],
    // V: [],
    // W: [],
    X: ["西", "新"],
    Y: ["云"],
    Z: ["浙"]
  };

  protected letterKeys: LetterKeyModel[] = Object.keys(
    this.letterProvinceMap
  ).map(item => {
    return {
      name: item,
      check: false
    };
  });

  protected checkProvinceCh(char: string) {
    const letterMap: LetterMapModel<string> = this.letterProvinceMap;
    let letter = "";
    Object.keys(letterMap).some((key: string) => {
      const result = letterMap[key].includes(char);
      if (result) {
        letter = key;
      }
      return result;
    });
    return letter;
  }

  protected cityOptions: AreaModel[] = [];

  protected getAreas() {
    commonService.getAreas().then((res: AreaModel[]) => {
      const list = res || [];
      if (list.length) {
        // 下拉搜索数据
        let cityOptions: AreaModel[] = [];
        // 助记符地区数据
        const letterMap: LetterMapModel<AreaModel> = this.letterMap;
        list.forEach((item: AreaModel) => {
          if (item.children) {
            cityOptions = [...cityOptions, ...item.children];
          }
          if (item.name.length) {
            const key = this.checkProvinceCh(item.name.charAt(0));
            letterMap[key] && letterMap[key].push(item);
          }
        });
        this.cityOptions = [...cityOptions];
        Object.assign(this.baseLetterMap, letterMap);
        this.letterMap = this.baseLetterMap;
      }
    });
  }

  protected handleLetterCheck(letter: LetterKeyModel) {
    const baseLetterMap = this.baseLetterMap;
    let now: LetterMapModel<AreaModel> = {};
    if (letter.check) {
      letter.check = false;
      now = baseLetterMap;
    } else {
      this.letterKeys.forEach((item: LetterKeyModel) => {
        item.check = false;
      });
      letter.check = true;
      now[letter.name] = baseLetterMap[letter.name];
    }
    this.letterMap = now;
  }

  protected updateAddressSearchHistory(data: AreaModel) {
    let list = [...this.addressSearchHistory];
    let deleteIndex = -1;
    list.some((item: AreaModel, index: number) => {
      const result = item.id === data.id;
      if (result) {
        deleteIndex = index;
      }
      return result;
    });
    if (deleteIndex > -1) {
      list.splice(deleteIndex, 1);
    }
    list.unshift(data);
    if (list.length > 10) {
      list = list.slice(0, 10);
    }
    this.addressSearchHistory = list;

    localStorage.addressSearchHistory = JSON.stringify(
      this.addressSearchHistory
    );
  }

  protected init() {
    const addressSearchHistory =
      localStorage.addressSearchHistory &&
      JSON.parse(localStorage.addressSearchHistory);
    if (Array.isArray(addressSearchHistory)) {
      this.addressSearchHistory = addressSearchHistory;
    }
    this.internalAreaCity = this.activeAreaCity;
    this.$nextTick(() => this.areaCityChange());
  }

  created() {
    this.initLetterMap();
    this.getAreas();
  }

  mounted() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.ht-address {
  display: inline-block;
  .address-button {
    display: flex;
    line-height: 18px;
    align-items: center;
    cursor: pointer;
    .icon-site {
      transform: translateY(-2px);
    }
  }
}
.el-scrollbar {
  .el-select-dropdown__item {
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
    font-size: $font-size-16;
  }
}
.el-popover {
  .address-body {
    position: relative;
    padding-top: 20px;
    .icon-clear-circle-gray {
      position: absolute;
      top: -2px;
      right: 0;
      cursor: pointer;
    }
    .address-search {
      display: flex;
      .search-wrap {
        width: 180px;
        height: 28px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: 28px;
        position: relative;
        ::v-deep .el-select {
          width: 140px;
          .el-input__inner {
            border-radius: 14px 0 0 14px;
          }
        }
        .search-button {
          display: inline-block;
          width: 40px;
          height: 100%;
          color: $color-white;
          background-color: transparent;
          background-image: $gradients-primary;
          border: none;
          border-left: $border-primary;
          outline: none;
          cursor: pointer;
          border-radius: 0 14px 14px 0;
        }
      }
      .search-history-wrap {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        .search-history {
          width: 100%;
          font-size: $font-size-12;
          color: $color-dim;
          @extend .lip-1;
          .search-history-item {
            margin-left: $margin-size-main;
            white-space: nowrap;
            cursor: pointer;
          }
        }
      }
    }
    .address-letter {
      margin: $margin-size-main 0;
      padding: $margin-size-main 0;
      border-top: 1px dashed $border-color-gray;
      border-bottom: 1px dashed $border-color-gray;
      .letter-item {
        margin-top: $margin-size-main;
        margin-right: $margin-size-main;
        padding: 0 8px;
        line-height: 22px;
        border-radius: 12px;
        font-size: $font-size-12;
        color: $color-gray;
        background-color: #f4f4f4;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: $color-primary;
        }
        &.is-active {
          color: $color-primary;
          background-color: rgba($color: $color-primary, $alpha: 0.2);
        }
      }
    }
    .address-list {
      max-height: 350px;
      overflow-x: hidden;
      overflow-y: auto;
      font-size: $font-size-12;
      line-height: 20px;
      .address-mnemonic {
        display: flex;
        margin-bottom: $margin-size-main;
        .mnemonic-name {
          width: 30px;
          color: $color-gray;
        }
        .address-province-list {
          flex: 1;
          .address-province {
            display: flex;
            .province-name {
              width: 56px;
              color: $color-dark;
            }
            .address-city {
              flex: 1;
              color: #2a2a2a;
              word-break: keep-all;
              .city-name {
                margin-right: $margin-size-main;
                font-weight: 300;
                cursor: pointer;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
