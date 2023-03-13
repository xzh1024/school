<template>
  <div class="goods-search" v-loading="loading">
    <table class="search-table" v-show="visible">
      <tbody>
        <tr>
          <td>汽车品牌</td>
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
                <el-checkbox-group
                  size="mini"
                  v-model="brandChecked"
                  @change="brandCheckedChange"
                >
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
          <td>配件品牌</td>
          <td>
            <el-checkbox
              :indeterminate="partBrandIndeterminate"
              v-model="partBrandCheckAll"
              @change="partBrandCheckAllChange"
            >
              全选
            </el-checkbox>
          </td>
          <td>
            <div :class="{ 'checkbox-group-tailor': !partBrandVisible }">
              <el-checkbox-group
                class="checkbox-group-wrap"
                size="mini"
                v-model="partBrandChecked"
                @change="partBrandCheckedChange"
              >
                <el-checkbox-button
                  v-for="item in partBrands"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </div>
          </td>
          <td>
            <div
              class="cursor-pointer"
              @click="partBrandVisible = !partBrandVisible"
            >
              <span>{{ partBrandVisible ? "收起" : "更多" }}</span>
              <i
                :class="
                  partBrandVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
              ></i>
            </div>
          </td>
        </tr>
        <tr>
          <td>配件产地</td>
          <td>
            <el-checkbox
              :indeterminate="partPlaceIndeterminate"
              v-model="partPlaceCheckAll"
              @change="partPlaceCheckAllChange"
            >
              全选
            </el-checkbox>
          </td>
          <td>
            <div :class="{ 'checkbox-group-tailor': !partPlaceVisible }">
              <el-checkbox-group
                class="checkbox-group-wrap"
                size="mini"
                v-model="partPlaceChecked"
                @change="partPlaceCheckedChange"
              >
                <el-checkbox-button
                  v-for="item in partPlaces"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </div>
          </td>
          <td>
            <div
              class="cursor-pointer"
              @click="partPlaceVisible = !partPlaceVisible"
            >
              <span>{{ partPlaceVisible ? "收起" : "更多" }}</span>
              <i
                :class="
                  partPlaceVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
              ></i>
            </div>
          </td>
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
        <tr>
          <td>商家名称</td>
          <td>
            <el-checkbox
              :indeterminate="companyIndeterminate"
              v-model="companyCheckAll"
              @change="companyCheckAllChange"
            >
              全选
            </el-checkbox>
          </td>
          <td>
            <el-select
              v-model="companyChecked"
              style="width: 320px;"
              size="mini"
              value-key="name"
              filterable
              clearable
              multiple
              collapse-tags
              placeholder="请选择供应商"
            >
              <el-option
                v-for="item in companys"
                :key="item.id"
                :label="item.name"
                :value="item"
              >
              </el-option>
            </el-select>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="selected-wrap" v-show="selectedVisible">
      <div class="selected-title">已选择：</div>
      <div class="selected-list">
        <SearchSelected
          label="汽车品牌："
          :list="brandChecked"
          @clearSelected="clearBrandChecked"
        ></SearchSelected>
        <SearchSelected
          label="配件品牌："
          :list="partBrandChecked"
          @clearSelected="clearPartBrandChecked"
        ></SearchSelected>
        <SearchSelected
          label="配件产地："
          :list="partPlaceChecked"
          @clearSelected="clearPartPlaceChecked"
        ></SearchSelected>
        <SearchSelected
          label="发货城市："
          :list="areaCitys.map(item => item.name)"
          @clearSelected="clearAreaCitys"
        ></SearchSelected>
        <SearchSelected
          label="商家名称："
          :list="companyChecked.map(item => item.name)"
          @clearSelected="clearCompanyChecked"
        ></SearchSelected>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  NameModel,
  AreaModel,
  BrandPicModel,
  GroupVehBrandModel
} from "@/common/interface/commonInterface";
import {
  PartFilterModel,
  PartFilterParams
} from "@/common/interface/brandInterface";
import Address from "@/components/address/index";
import SearchSelected from "@/components/searchSelected/index";
import { BrandService } from "@/common/services/brandService";
const brandService = new BrandService();
import { PartParams } from "@/common/interface/goodsInterface";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");
import { defaultImgSquare } from "@/common/utils/defaultImg";

const filterQueryParams = {
  keyword: "",
  vehBrands: [],
  partBrands: [],
  productionPlaces: [],
  areas: [],
  companyIds: []
};

@Component({
  name: "GoodsSearch",
  components: {
    Address,
    SearchSelected
  }
})
export default class GoodsSearch extends Vue {
  @BaseStore.Getter("baseInfo")
  private baseInfo!: BaseInfoModel;

  @Prop({ type: Boolean }) readonly visible!: boolean;
  @Prop() private queryParams!: PartParams;

  get selectedVisible(): boolean {
    return !!(
      this.brandChecked.length ||
      this.partBrandChecked.length ||
      this.partPlaceChecked.length ||
      this.areaCitys.length ||
      this.companyChecked.length
    );
  }

  private loading = true;

  // 图片加载失败时显示默认图
  private defaultImgFn = defaultImgSquare;

  protected brandVisible = false;
  protected partBrandVisible = false;
  protected partPlaceVisible = false;

  // 汽车品牌
  protected brandCheckAll = false;
  protected brandIndeterminate = false;
  protected brandChecked: string[] = [];
  protected brands: string[] = [];
  brandCheckAllChange(val: string[]) {
    this.brandChecked = val ? this.brands : [];
    this.brandIndeterminate = false;
  }
  brandCheckedChange(value: string[]) {
    const checkedCount = value.length;
    this.brandCheckAll = checkedCount === this.brands.length;
    this.brandIndeterminate =
      checkedCount > 0 && checkedCount < this.brands.length;
  }
  // 清除已选择的汽车品牌
  clearBrandChecked() {
    this.brandChecked = [];
    this.brandCheckAll = false;
    this.brandIndeterminate = false;
  }
  @Watch("brandChecked")
  protected watchBrandChecked(newVal: string[]) {
    this.queryParams.vehBrands = newVal;
    this.handleSearch();
  }
  // 配件品牌
  protected partBrandCheckAll = false;
  protected partBrandIndeterminate = false;
  protected partBrandChecked: string[] = [];
  protected partBrands: string[] = [];
  partBrandCheckAllChange(val: string[]) {
    this.partBrandChecked = val ? this.partBrands : [];
    this.partBrandIndeterminate = false;
  }
  partBrandCheckedChange(value: string[]) {
    const checkedCount = value.length;
    this.partBrandCheckAll = checkedCount === this.partBrands.length;
    this.partBrandIndeterminate =
      checkedCount > 0 && checkedCount < this.partBrands.length;
  }
  clearPartBrandChecked() {
    this.partBrandChecked = [];
    this.partBrandCheckAll = false;
    this.partBrandIndeterminate = false;
  }
  @Watch("partBrandChecked")
  protected watchPartBrandChecked(newVal: string[]) {
    this.queryParams.partBrands = newVal;
    this.handleSearch();
  }
  // 配件产地
  protected partPlaceCheckAll = false;
  protected partPlaceIndeterminate = false;
  protected partPlaceChecked: string[] = [];
  protected partPlaces: string[] = [];
  partPlaceCheckAllChange(val: string[]) {
    this.partPlaceChecked = val ? this.partPlaces : [];
    this.partPlaceIndeterminate = false;
  }
  partPlaceCheckedChange(value: string[]) {
    const checkedCount = value.length;
    this.partPlaceCheckAll = checkedCount === this.partPlaces.length;
    this.partPlaceIndeterminate =
      checkedCount > 0 && checkedCount < this.partPlaces.length;
  }
  clearPartPlaceChecked() {
    this.partPlaceChecked = [];
    this.partPlaceCheckAll = false;
    this.partPlaceIndeterminate = false;
  }
  @Watch("partPlaceChecked")
  protected watchPartPlaceChecked(newVal: string[]) {
    this.queryParams.productionPlaces = newVal;
    this.handleSearch();
  }

  // 公司列表
  protected companyCheckAll = false;
  protected companyIndeterminate = false;
  protected companyChecked: NameModel[] = [];
  protected companys: NameModel[] = [];
  companyCheckAllChange(val: NameModel[]) {
    this.companyChecked = val ? this.companys : [];
  }
  clearCompanyChecked() {
    this.companyChecked = [];
    this.companyCheckAll = false;
    this.companyIndeterminate = false;
  }
  @Watch("companyChecked")
  protected watchCompanyChecked(newVal: NameModel[]) {
    const checkedCount = newVal.length;
    this.companyCheckAll = checkedCount === this.companys.length;
    this.companyIndeterminate =
      checkedCount > 0 && checkedCount < this.companys.length;

    this.queryParams.companyIds = newVal.map(item => item.id);
    this.handleSearch();
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

  // 助记符
  protected groupVehBrands: GroupVehBrandModel[] = [];

  protected filterQueryParams: PartFilterParams = JSON.parse(
    JSON.stringify(filterQueryParams)
  );
  protected getPartFilter() {
    this.loading = true;
    let mark = true;
    brandService
      .getPartFilter(this.filterQueryParams)
      .then((res: PartFilterModel) => {
        if (res) {
          const {
            groupVehBrands,
            partBrands,
            productionPlaces,
            companies
          } = res;
          // 公司
          this.companys = companies || [];
          const companyId = this.$route.query.companyId;
          if (companyId) {
            const activeCompany = companies.find(item => {
              return item.id === Number(companyId);
            }) as NameModel;
            if (activeCompany) {
              mark = false;
              this.companyChecked = [activeCompany];
            }
          }
          // 配件产地
          this.partPlaces = productionPlaces || [];
          // 配件品牌
          this.partBrands = partBrands || [];
          // 汽车品牌
          this.groupVehBrands = groupVehBrands.map(
            (item: GroupVehBrandModel, index: number) => {
              const brands = item.datas || [];
              const active = index === 0;
              // 默认选中第一个助记符
              if (active) {
                this.activeGroupBrandDatas = brands || [];
              }
              return {
                ...item,
                active
              };
            }
          );
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

  protected activeGroupBrandDatas: BrandPicModel[] = [];
  // 汽车品牌 点击助记符所做处理
  protected handleGroupVehBrands(data: GroupVehBrandModel) {
    if (data.active) return;
    this.groupVehBrands.forEach(item => (item.active = false));
    data.active = true;
    this.activeGroupBrandDatas = data.datas || [];
  }

  protected handleSearch() {
    this.$emit("search");
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
.goods-search {
  margin-bottom: $margin-size-main;
  .search-table {
    width: 100%;
    margin-bottom: $margin-size-main;
    border-collapse: collapse;
    border: $border-gray;
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
