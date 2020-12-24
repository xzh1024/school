<template>
  <div class="company-template">
    <ht-card title="商家">
      <div slot="after-title">
        <el-button type="primary" size="mini" round>收起筛选</el-button>
      </div>
      <div class="company-search">
        <div class="brand-list">
          <el-checkbox-group
            v-model="queryParams.vehBrands"
            size="small"
            @change="handleBrandChange"
          >
            <el-checkbox-button
              size="mini"
              v-for="brand in brands"
              :key="brand"
              :label="brand"
            ></el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <!-- <div class="pagenation-wrap" v-if="this.pageInfo.totalSize">
        <ht-pagination
          :total="pageInfo.totalSize"
          :current-page.sync="pageInfo.page"
          :page-count="pageInfo.totalPage"
          @current-change="getCompanies"
        ></ht-pagination>
      </div> -->
      <div class="pagenation-address-wrap">
        <Address
          :areaCity.sync="areaCity"
          @areaCityChange="areaCityChange"
        ></Address>
        <ht-pagination
          :total="pageInfo.totalSize"
          :current-page.sync="pageInfo.page"
          :page-count="pageInfo.totalPage"
          @current-change="getCompanies"
        ></ht-pagination>
      </div>
      <div class="company-list clearfix">
        <template v-for="item in list">
          <company-item :key="item.companyId" :info="item"></company-item>
        </template>
      </div>
      <div class="pagenation-wrap">
        <el-pagination
          @size-change="getCompanies"
          @current-change="getCompanies"
          :current-page.sync="pageInfo.page"
          :page-sizes="pageSizes"
          :page-size.sync="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.totalSize"
        >
        </el-pagination>
      </div>
    </ht-card>
    <div class="divider-end">
      <ht-divider>END</ht-divider>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { HtCard, HtPagination, HtDivider } from "@/components/hztl";
import CompanyItem from "@/views/company/components/companyItem/index";
import Address from "@/components/address/index";
import { PageResponseResult } from "@/common/interface/commonInterface";
import { PageParams, AreaModel } from "@/common/interface/commonInterface";
import { PAGE_SIZES } from "@/common/utils/config";
import {
  CompanyModel,
  CompanyParams
} from "@/common/interface/companyInterface";
import { BrandModel } from "@/common/interface/brandInterface";
import { CompanyService } from "@/common/services/companyService";
const companyService = new CompanyService();
import { BrandService } from "@/common/services/brandService";
const brandService = new BrandService();
import { Getter, namespace } from "vuex-class";
const CityStore = namespace("city");

@Component({
  name: "CompanyList",
  components: {
    HtCard,
    HtPagination,
    HtDivider,
    CompanyItem,
    Address
  }
})
export default class CompanyList extends Vue {
  @CityStore.Getter("activeAreaCity")
  protected activeAreaCity!: AreaModel;
  protected areaCity: AreaModel | "" = "";
  @Watch("activeAreaCity", { deep: true, immediate: true })
  protected activeAreaCityChange(newVal: AreaModel) {
    if (newVal) {
      this.areaCity = newVal;
    }
    this.getCompanies();
  }
  protected list: CompanyModel[] = [];
  protected pageSizes = PAGE_SIZES;
  protected pageInfo: PageParams = {
    page: 1,
    pageSize: PAGE_SIZES[0],
    totalSize: 0,
    totalPage: 1
  };
  protected queryParams: CompanyParams = {
    areas: "",
    vehBrands: []
  };
  protected brands: string[] = [];
  protected checkBrands: string[] = [];

  protected areaCityChange(value: AreaModel) {
    console.log(value);
    // if (value && value.id) {
    //   this.queryParams.areas = `City:${value.id}`;
    // } else {
    //   this.queryParams.areas = "";
    // }
    this.getCompanies();
  }

  protected handleBrandChange() {
    this.getCompanies();
  }

  protected getCompanies() {
    const { page, pageSize } = this.pageInfo;
    const params = {
      page,
      pageSize,
      ...this.queryParams
    };
    if (this.areaCity) {
      params.areas = `City:${this.areaCity.id}`;
    }
    companyService
      .getCompanies(params)
      .then((res: PageResponseResult<CompanyModel[]>) => {
        console.log(res);
        if (res) {
          this.list = res.rows || [];
          this.pageInfo.totalSize = res.totalSize || 0;
          this.pageInfo.totalPage = res.totalPage || 1;
        }
      });
  }

  protected getBrandAll() {
    brandService.getBrandAll().then((res: BrandModel[]) => {
      console.log(res);
      const list = res || [];
      this.brands = list.map(item => item.name);
    });
  }

  created() {
    // this.getCompanies();
    this.getBrandAll();
  }
}
</script>

<style lang="scss" scoped>
.company-template {
  .ht-card {
    margin-top: $margin-size-main;
    background-color: $color-white;
    ::v-deep .card-content {
      padding: 16px;
    }
    .pagenation-address-wrap {
      margin-top: 16px;
    }
    .company-search {
      // margin-top: 20px;
      .brand-list {
        ::v-deep .el-checkbox-group {
          .el-checkbox-button--small {
            margin-top: 8px;
            margin-right: 8px;
            .el-checkbox-button__inner {
              padding: 4px 10px;
              border: 1px solid transparent;
              border-radius: 12px;
            }
          }
          .el-checkbox-button.is-checked {
            .el-checkbox-button__inner {
              border-color: transparent;
              box-shadow: none;
            }
          }
        }
      }
    }
    .company-list {
      box-sizing: border-box;
      width: 100%;
      min-height: 582px;
      // padding: 16px 2px 8px 16px;
      margin-top: 16px;
      .company-item {
        float: left;
        margin-right: 14px;
        margin-bottom: $margin-size-main;
        &:nth-child(5n + 0) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
