<template>
  <div class="company-template">
    <ht-card title="商家">
      <div slot="after-title">
        <el-button
          type="primary"
          size="mini"
          round
          @click="handleScreenVisible"
        >
          {{ screenVisible ? "收起筛选" : "展开筛选" }}
          <i
            style="color: #FFFFFF"
            :class="screenVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i>
        </el-button>
      </div>
      <div class="company-search" v-show="screenVisible">
        <div class="brand-list" :class="{ 'max-height-30': !brandVisible }">
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
        <div class="button-plus" @click="handleBrandVisible">
          <span>{{ brandVisible ? "收起" : "更多" }}</span>
          <i
            :class="brandVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i>
        </div>
      </div>
      <div class="pagenation-address-wrap">
        <Address @areaCityChange="areaCityChange"></Address>
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
import { Component, Vue } from "vue-property-decorator";
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
  protected screenVisible = true;
  protected brandVisible = true;
  protected list: CompanyModel[] = [];
  protected pageSizes = PAGE_SIZES;
  protected pageInfo: PageParams = {
    page: 1,
    pageSize: PAGE_SIZES[0],
    totalSize: 0,
    totalPage: 1
  };
  protected queryParams: CompanyParams = {
    keyword: "",
    areas: "",
    vehBrands: []
  };
  protected brands: string[] = [];
  protected checkBrands: string[] = [];

  protected areaCityChange(value: AreaModel) {
    this.queryParams.areas = value ? `City:${value.id}` : "";
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
    companyService
      .getCompanies(params)
      .then((res: PageResponseResult<CompanyModel[]>) => {
        if (res) {
          this.list = res.rows || [];
          this.pageInfo.totalSize = res.totalSize || 0;
          this.pageInfo.totalPage = res.totalPage || 1;
        }
      });
  }

  protected getBrandAll() {
    brandService.getBrandAll().then((res: BrandModel[]) => {
      const list = res || [];
      this.brands = list.map(item => item.name);
    });
  }

  protected handleScreenVisible() {
    this.screenVisible = !this.screenVisible;
  }
  protected handleBrandVisible() {
    this.brandVisible = !this.brandVisible;
  }

  created() {
    const { keyword } = this.$route.query;
    if (keyword) {
      this.queryParams.keyword = keyword as string;
    }
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
      margin-bottom: 16px;
    }
    .company-search {
      margin-bottom: 16px;
      display: flex;
      align-items: flex-start;
      .brand-list {
        flex: 1;
        box-sizing: border-box;
        ::v-deep .el-checkbox-group {
          .el-checkbox-button--small {
            margin: 4px 8px 4px 0;
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
      .max-height-30 {
        max-height: 30px;
        overflow: hidden;
      }
      .button-plus {
        height: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
    .company-list {
      box-sizing: border-box;
      width: 100%;
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
