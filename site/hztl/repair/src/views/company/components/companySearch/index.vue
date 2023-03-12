<template>
  <div class="company-search" v-loading="loading">
    <table class="search-table" v-show="visible">
      <tbody>
        <tr>
          <td>主营品牌</td>
          <td>
            <el-checkbox
              :indeterminate="brandIndeterminate"
              v-model="brandCheckAll"
              @change="brandCheckAllChange"
            >
              全选
            </el-checkbox>
          </td>
          <td>
            <div class="brand-wrap">
              <div class="brand-mnemonic">
                <div class="brand-mnemonic-label">
                  按品牌<span class="color-primary">拼音</span>首字母查找：
                  <i class="el-icon-search"></i>
                </div>
                <div class="brand-mnemonic-list">
                  <span
                    v-for="(item, index) in groupVehBrands"
                    :key="index"
                    :class="{
                      'brand-mnemonic-round': item.mnemonic !== '热门',
                      'brand-mnemonic-item': item.mnemonic === '热门',
                      'is-active': item.active
                    }"
                    @click="handleGroupVehBrands(item)"
                  >
                    {{ item.mnemonic }}
                  </span>
                </div>
              </div>
              <div class="brand-img-list">
                <el-checkbox-group size="mini" v-model="brandChecked">
                  <el-checkbox-button
                    v-for="brand in activeGroupBrandDatas"
                    :key="brand.name"
                    :label="brand.name"
                  >
                    <img
                      class="brand-img"
                      :src="brand.pic || ''"
                      @error="defaultImgFn"
                    />
                    <div
                      class="brand-name"
                      :title="
                        brand.name && brand.name.length > 5 ? brand.name : ''
                      "
                    >
                      {{ brand.name }}
                    </div>
                  </el-checkbox-button>
                </el-checkbox-group>
              </div>
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>发货城市</td>
          <td>
            <el-checkbox
              :indeterminate="cityIndeterminate"
              v-model="cityCheckAll"
              @change="cityCheckAllChange"
            >
              全选
            </el-checkbox>
          </td>
          <td>
            <div class="address-wrap">
              <el-checkbox-group
                class="checkbox-group-wrap"
                size="mini"
                v-model="cityChecked"
                @change="cityCheckedChange"
              >
                <template v-for="item in citys">
                  <el-checkbox-button
                    v-if="item.id === baseInfo.cityId"
                    :key="item.id"
                    :label="item"
                  >
                    同城：{{ item.name }}
                  </el-checkbox-button>
                </template>
              </el-checkbox-group>
              <Address
                :areaCitys.sync="areaCitys"
                @areaCityChange="areaCityChange"
                @noticeCityAll="noticeCityAll"
              ></Address>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="selected-wrap" v-show="selectedVisible">
      <div class="selected-title">已选择：</div>
      <div class="selected-list">
        <SearchSelected
          label="主营品牌："
          :list="brandChecked"
          @clearSelected="clearBrandChecked"
        ></SearchSelected>
        <SearchSelected
          label="发货城市："
          :list="areaCitys.map(item => item.name)"
          @clearSelected="clearAreaCitys"
        ></SearchSelected>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Address from "@/components/address/index";
import SearchSelected from "@/components/searchSelected/index";
import {
  AreaModel,
  GroupVehBrandModel,
  BrandPicModel
} from "@/common/interface/commonInterface";
import {
  CompanyParams,
  CompanyFilterParams,
  CompanyFilterModel
} from "@/common/interface/companyInterface";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { CompanyService } from "@/common/services/companyService";
const companyService = new CompanyService();
import { namespace } from "vuex-class";
const BaseStore = namespace("base");
import { defaultImgSquare } from "@/common/utils/defaultImg";

const filterQueryParams = {
  keyword: "", // 关键字
  vehBrands: [], // 主营品牌
  areas: [], // 区域
  orderByAreas: [] // 排序区域
};

@Component({
  name: "CompanySearch",
  components: {
    Address,
    SearchSelected
  }
})
export default class CompanySearch extends Vue {
  @BaseStore.Getter("baseInfo")
  private baseInfo!: BaseInfoModel;

  @Prop({ type: Boolean }) readonly visible!: boolean;
  @Prop() private queryParams!: CompanyParams;

  get selectedVisible(): boolean {
    return !!(this.brandChecked.length || this.areaCitys.length);
  }

  private defaultImgFn = defaultImgSquare;

  private loading = true;

  protected handleSearch() {
    this.$emit("search");
  }

  // 发货城市
  protected areaCitys: AreaModel[] = [];
  protected cityCheckAll = false;
  protected cityIndeterminate = false;
  protected cityChecked: AreaModel[] = [];
  protected citys: AreaModel[] = [];
  clearAreaCitys() {
    this.areaCitys = [];
    this.cityChecked = [];
    this.cityCheckAll = false;
    this.cityIndeterminate = false;
  }
  @Watch("areaCitys")
  protected watchAreaCitys(newVal: AreaModel[]) {
    this.queryParams.areas = newVal.map(item => {
      return {
        type: "City",
        id: item.id
      };
    });
    this.handleSearch();
  }
  cityCheckAllChange(val: AreaModel[]) {
    this.areaCitys = val ? this.citys : [];
    if (this.areaCitys.length) {
      if (!this.cityChecked.length && this.local) {
        this.cityChecked.push(this.local);
      }
    } else {
      if (this.cityChecked.length) {
        this.cityChecked = [];
      }
    }
    this.cityIndeterminate = false;
  }
  areaCityChange(value: AreaModel[]) {
    const checkedCount = value.length;
    if (checkedCount) {
      if (this.cityChecked.length) {
        const cityItem = this.cityChecked[0];
        const cityIndex = this.areaCitys.findIndex(
          (item: AreaModel) => item.id === cityItem.id
        );
        if (cityIndex === -1) {
          this.cityChecked = [];
        }
      } else if (this.local) {
        const cityItem = this.local;
        const cityIndex = this.areaCitys.findIndex(
          (item: AreaModel) => item.id === cityItem.id
        );
        if (cityIndex !== -1) {
          this.cityChecked = [cityItem];
        }
      }
    } else {
      this.cityChecked = [];
    }
    this.cityCheckAll = checkedCount === this.citys.length;
    this.cityIndeterminate =
      checkedCount > 0 && checkedCount < this.citys.length;
  }
  cityCheckedChange(value: AreaModel[]) {
    if (value.length) {
      const cityItem = value[0];
      const cityIndex = this.areaCitys.findIndex(
        (item: AreaModel) => item.id === cityItem.id
      );
      if (cityIndex === -1) {
        this.areaCitys.push(cityItem);
      }
    } else if (this.local) {
      const cityItem = this.local;
      const cityIndex = this.areaCitys.findIndex(
        (item: AreaModel) => item.id === cityItem.id
      );
      if (cityIndex !== -1) {
        this.areaCitys.splice(cityIndex, 1);
      }
    }
    const checkedCount = this.areaCitys.length;
    this.cityCheckAll = checkedCount === this.citys.length;
    this.cityIndeterminate =
      checkedCount > 0 && checkedCount < this.citys.length;
  }

  protected local: AreaModel | undefined = undefined;
  // 获取包含所有城市的列表
  noticeCityAll(citys: AreaModel[]) {
    this.citys = citys;
    // 找出同城数据
    if (this.baseInfo.cityId) {
      this.local = citys.find((item: AreaModel) => {
        return this.baseInfo.cityId === item.id;
      });
    }
  }

  // 汽车品牌
  protected brandCheckAll = false;
  protected brandIndeterminate = false;
  protected brandChecked: string[] = [];
  protected brands: string[] = [];
  brandCheckAllChange(val: string[]) {
    this.brandChecked = val ? this.brands : [];
  }
  // 清除已选择的汽车品牌
  clearBrandChecked() {
    this.brandChecked = [];
    this.brandCheckAll = false;
    this.brandIndeterminate = false;
  }
  @Watch("brandChecked", { deep: true })
  protected watchBrandChecked(newVal: string[]) {
    const checkedCount = newVal.length;
    this.brandCheckAll = checkedCount === this.brands.length;
    this.brandIndeterminate =
      checkedCount > 0 && checkedCount < this.brands.length;

    this.queryParams.vehBrands = newVal;
    this.handleSearch();
  }
  protected groupVehBrands: GroupVehBrandModel[] = [];
  protected activeGroupBrandDatas: BrandPicModel[] = [];

  protected filterQueryParams: CompanyFilterParams = JSON.parse(
    JSON.stringify(filterQueryParams)
  );
  protected getPartFilter() {
    this.loading = true;
    let mark = true;
    companyService
      .getCompaniesFilter(this.filterQueryParams)
      .then((res: CompanyFilterModel) => {
        if (res) {
          const { groupVehBrands } = res;

          // 遍历获取到所有的汽车品牌
          let brands: string[] = [];
          groupVehBrands.forEach((item: GroupVehBrandModel) => {
            if (item.mnemonic !== "热门") {
              const groupBrands = item.datas || [];
              brands = [
                ...brands,
                ...groupBrands.map((brand: BrandPicModel) => brand.name)
              ];
            }
          });
          this.brands = brands;
          const vehBrand = this.$route.query.vehBrand;
          // 汽车品牌
          let brandActive = 0;
          this.groupVehBrands = groupVehBrands.map(
            (item: GroupVehBrandModel, index: number) => {
              const brands = item.datas || [];
              if (vehBrand) {
                const activeVehBrand = brands.find(
                  item => item.name === vehBrand
                );
                if (activeVehBrand) {
                  mark = false;
                  this.brandChecked = [activeVehBrand.name];
                  brandActive = index;
                }
              }
              return {
                ...item,
                active: false
              };
            }
          );
          this.groupVehBrands[brandActive].active = true;
          this.activeGroupBrandDatas =
            this.groupVehBrands[brandActive].datas || [];
        }
        if (mark) {
          this.handleSearch();
        }
        this.loading = false;
      })
      .catch(() => {
        this.handleSearch();
        this.loading = false;
      });
  }
  // 汽车品牌 点击助记符所做处理
  protected handleGroupVehBrands(data: GroupVehBrandModel) {
    if (data.active) return;
    this.groupVehBrands.forEach(item => (item.active = false));
    data.active = true;
    this.activeGroupBrandDatas = data.datas || [];
  }

  created() {
    const { keyword } = this.$route.query;
    if (keyword) {
      this.queryParams.keyword = keyword as string;
      this.filterQueryParams.keyword = keyword as string;
    }
    this.getPartFilter();
  }
}
</script>

<style lang="scss" scoped>
.company-search {
  margin-bottom: $margin-size-main;
  .search-table {
    width: 100%;
    border-collapse: collapse;
    border: $border-gray;
    margin-bottom: $margin-size-main;
    tr {
      td {
        padding: 0 5px;
        border-bottom: 1px dashed $border-color-gray;
        &:nth-child(1) {
          vertical-align: top;
          padding-top: 10px;
          padding-bottom: 4px;
          width: 80px;
        }
        &:nth-child(2) {
          vertical-align: top;
          padding-top: 10px;
          padding-bottom: 4px;
          width: 60px;
        }
        &:nth-child(3) {
          padding-top: 5px;
          padding-bottom: 5px;
          height: 30px;
        }
        &:nth-child(4) {
          vertical-align: top;
          padding-top: 10px;
          padding-bottom: 4px;
          text-align: center;
          width: 60px;
        }
        .checkbox-group-tailor {
          max-height: 30px;
          overflow: hidden;
          box-sizing: border-box;
        }
        .address-wrap {
          display: flex;
          align-items: center;
        }
        ::v-deep .checkbox-group-wrap {
          .el-checkbox-button--mini {
            margin: 4px 8px 4px 0;
            .el-checkbox-button__inner {
              color: $color-gray;
              padding: 4px 10px;
              border: $border-gray;
              border-radius: 12px;
            }
          }
          .el-checkbox-button.is-checked {
            .el-checkbox-button__inner {
              color: $color-primary;
              border-color: $color-primary;
              background-color: $color-white;
              box-shadow: none;
            }
          }
        }
        .brand-wrap {
          width: 100%;
          // height: 246px;
          border: $border-primary;
          .brand-mnemonic {
            height: 40px;
            display: flex;
            align-items: center;
            .brand-mnemonic-label {
              margin: 0 $margin-size-main;
            }
            .brand-mnemonic-list {
              flex: 1;
              user-select: none;
              .brand-mnemonic-round {
                display: inline-block;
                width: 22px;
                height: 22px;
                line-height: 22px;
                font-size: $font-size-14;
                text-align: center;
                border-radius: 50% 50%;
                cursor: pointer;
                margin-right: 4px;
                &.is-active {
                  color: $color-white;
                  background-color: $color-primary;
                }
              }
              .brand-mnemonic-item {
                display: inline-block;
                font-size: $font-size-14;
                cursor: pointer;
                margin-right: 4px;
                &.is-active {
                  color: $color-primary;
                }
              }
            }
          }
          .brand-img-list {
            width: 100%;
            max-height: 172px;
            overflow-x: hidden;
            overflow-y: auto;
            ::v-deep .el-checkbox-group {
              .el-checkbox-button--mini {
                .el-checkbox-button__inner {
                  width: 64px;
                  height: 86px;
                  display: flex;
                  flex-direction: column;
                  padding: 0;
                  border: none;
                  .brand-img {
                    display: inline-block;
                    width: 48px;
                    height: 48px;
                    margin: $margin-size-main;
                  }
                  .brand-name {
                    @extend .lip-1;
                    text-align: center;
                    line-height: 1;
                  }
                }
              }
              .el-checkbox-button.is-checked {
                .el-checkbox-button__inner {
                  color: $color-primary;
                  background-color: $color-white;
                  box-shadow: none;
                }
              }
            }
          }
        }
      }
      &:last-child td {
        border-bottom: none;
      }
    }
  }
  .selected-wrap {
    width: 100%;
    height: 50px;
    border: $border-gray;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .selected-title {
      margin-left: 5px;
    }
    .selected-list {
      flex: 1;
      display: flex;
      .search-selected {
        margin-right: $margin-size-main;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
