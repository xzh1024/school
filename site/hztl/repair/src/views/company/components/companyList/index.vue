<template>
  <div class="company-template">
    <ht-card title="商家">
      <template slot="after-title">
        <ht-pagination
          :total="pageInfo.totalSize"
          :current-page.sync="pageInfo.page"
          :page-count="pageInfo.totalPage"
          @current-change="getCompanies"
        ></ht-pagination>
        <el-button
          type="primary"
          size="mini"
          round
          class="gradients-button"
          @click="handleScreenVisible"
        >
          {{ screenVisible ? "收起筛选" : "展开筛选" }}
          <i
            style="color: #FFFFFF"
            :class="screenVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i>
        </el-button>
      </template>
      <CompanySearch
        :visible="screenVisible"
        :queryParams="queryParams"
        @search="getCompanies"
      ></CompanySearch>
      <div v-loading="loading">
        <div class="company-list clearfix">
          <company-item
            v-for="(item, index) in list"
            :key="index"
            :info="item"
          ></company-item>
        </div>
      </div>
      <div class="pagenation-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getCompanies"
          :current-page.sync="pageInfo.page"
          :page-sizes="pageSizes"
          :page-size.sync="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-count="pageInfo.totalPage"
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
import CompanySearch from "../companySearch/index.vue";
import { PageResponseResult } from "@/common/interface/commonInterface";
import { PageParams, AreaModel } from "@/common/interface/commonInterface";
import { PAGE_SIZES, DEFAULT_PAGE_SIZE } from "@/common/utils/config";
import {
  CompanyModel,
  CompanyParams
} from "@/common/interface/companyInterface";
import { CompanyService } from "@/common/services/companyService";
const companyService = new CompanyService();

@Component({
  name: "CompanyList",
  components: {
    HtCard,
    HtPagination,
    HtDivider,
    CompanyItem,
    CompanySearch
  }
})
export default class CompanyList extends Vue {
  private loading = true;
  private screenVisible = true;
  private brandVisible = false;
  private list: CompanyModel[] = [];
  private pageSizes = PAGE_SIZES;
  private pageInfo: PageParams = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalSize: 0,
    totalPage: 1
  };
  private queryParams: CompanyParams = {
    keyword: "",
    areas: [],
    vehBrands: []
  };
  private brands: string[] = [];
  private checkBrands: string[] = [];

  protected areaCitys: AreaModel[] = [];

  private handleSizeChange() {
    this.pageInfo.page = 1;
    this.getCompanies();
  }
  private getCompanies() {
    this.loading = true;
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
        this.loading = false;
      })
      .catch(() => {
        this.list = [];
        this.pageInfo.totalSize = 0;
        this.pageInfo.totalPage = 1;
        this.loading = false;
      });
  }

  private handleScreenVisible() {
    this.screenVisible = !this.screenVisible;
  }
  private handleBrandVisible() {
    this.brandVisible = !this.brandVisible;
  }
}
</script>

<style lang="scss" scoped>
.company-template {
  .ht-card {
    margin-top: $margin-size-main;
    background-color: $color-white;
    ::v-deep .after-title {
      display: flex;
      align-items: center;
      .gradients-button {
        margin-left: $margin-size-main;
      }
    }
    ::v-deep .card-content {
      padding: 16px;
    }
    .pagenation-address-wrap {
      margin-bottom: 16px;
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
