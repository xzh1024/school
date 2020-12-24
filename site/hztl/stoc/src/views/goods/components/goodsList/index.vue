<template>
  <div class="goods-template">
    <ht-card title="优质好货">
      <div slot="after-title">
        <ht-pagination
          :currentPage.sync="pageInfo.page"
          :total="pageInfo.totalSize"
          :pageCount="pageInfo.totalPage"
          @current-change="getParts"
        ></ht-pagination>
      </div>
      <div class="goods-list">
        <GoodsSearch
          :queryParams="queryParams"
          @search="getParts"
        ></GoodsSearch>

        <div class="pagenation-address-wrap">
          <Address
            :areaCity.sync="areaCity"
            @areaCityChange="areaCityChange"
          ></Address>
          <ht-pagination
            :total="pageInfo.totalSize"
            :current-page.sync="pageInfo.page"
            :page-count="pageInfo.totalPage"
            @current-change="getParts"
          ></ht-pagination>
        </div>

        <el-table
          size="small"
          style="width: 100%"
          :header-cell-style="{
            color: '#FFFFFF',
            background: '#FF6E4C',
            fontWeight: 700
          }"
          :data="list"
          @row-click="showPartInfo"
        >
          <el-table-column prop="name" label="编码/名称" width="180">
            <template slot-scope="scope">
              <div
                class="cell-li color-primary"
                title="编码"
                v-if="scope.row.code"
              >
                {{ scope.row.code }}
              </div>
              <div class="cell-li" title="名称" v-if="scope.row.name">
                {{ scope.row.name }}
              </div>
              <div
                class="cell-tag"
                title="保险认证分类"
                v-if="scope.row.insurCertType"
              >
                {{ scope.row.insurCertType }}
              </div>
              <div class="cell-li color-gray" v-if="scope.row.vehModel">
                车型：
                {{ scope.row.vehModel }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="配件图片" width="100">
            <template slot-scope="scope">
              <!-- <img
                :src="(scope.row.imageUrls && scope.row.imageUrls[0]) || ''"
              /> -->
              <el-popover
                placement="right"
                trigger="hover"
                v-if="scope.row.imageUrls && scope.row.imageUrls[0]"
              >
                <img
                  :src="(scope.row.imageUrls && scope.row.imageUrls[0]) || ''"
                  style="max-width: 360px; max-height: 360px;"
                />
                <img
                  :src="(scope.row.imageUrls && scope.row.imageUrls[0]) || ''"
                  width="48"
                  height="48"
                  slot="reference"
                  style="border-radius: 5px; border: 1px solid #cdcdcd;"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="category"
            label="配件分类"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="brand"
            label="配件品牌"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="property"
            label="配件性质"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="productionPlace"
            label="产地"
            width="120"
          ></el-table-column>
          <el-table-column prop="qty" label="库存" width="60"></el-table-column>
          <el-table-column
            prop="model"
            label="规格"
            width="80"
          ></el-table-column>
          <el-table-column prop="price" label="订货价" width="100">
            <template slot-scope="scope">
              <div class="cell-li color-primary">
                <span class="font-size-12">¥</span>
                <span class="cell-price">{{ scope.row.price }}</span>
                <span class="font-size-12">/个</span>
              </div>
              <!-- <div class="cell-li cell-promotion">
                <div class="font-size-12">促销价：</div>
                <span>￥10.00/个 买10赠3</span>
              </div> -->
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商家信息" width="150">
            <template slot-scope="scope">
              <div class="cell-flex">
                <i class="icon-house"></i>
                <div class="cell-flex-right">
                  <div>{{ scope.row.company.name }}</div>
                  <div>{{ scope.row.company.phone }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-popover placement="right" width="426" trigger="click">
                <company-info :info="scope.row.company">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="enquiry(scope.row.companyId)"
                    >查看全部商品</el-button
                  >
                </company-info>
                <el-button
                  slot="reference"
                  type="primary"
                  size="mini"
                  round
                  plain
                  @click.native.stop="e => e.stopPropagation()"
                  >快速询价</el-button
                >
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagenation-wrap">
        <el-pagination
          background
          @size-change="getParts"
          @current-change="getParts"
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

    <GoodsInfoDialog
      v-if="goodsInfoVisible"
      :info="partInfo"
      @hide="hidePartInfo"
    ></GoodsInfoDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Watch } from "vue-property-decorator";
import { HtCard, HtPagination, HtDivider } from "@/components/hztl";
import CompanyInfo from "@/views/company/components/companyInfo";
import GoodsSearch from "../goodsSearch/index.vue";
import GoodsInfoDialog from "../goodsInfoDialog/index.vue";
import Address from "@/components/address/index";
import {
  PageResponseResult,
  AreaModel
} from "@/common/interface/commonInterface";
import { PageParams } from "@/common/interface/commonInterface";
import { PAGE_SIZES } from "@/common/utils/config";
import { PartModel, PartParams } from "@/common/interface/goodsInterface";
import { PartFilterModel } from "@/common/interface/brandInterface";
import { GoodsService } from "@/common/services/goodsService";
const goodsService = new GoodsService();
import { Getter, namespace } from "vuex-class";
import { parse } from "qs";
const CityStore = namespace("city");

const queryParams = {
  keyword: "",
  areas: "",
  brands: [],
  companyIds: [],
  insurCertTypes: [],
  orderByAreas: ""
};

@Component({
  name: "GoodsList",
  components: {
    HtCard,
    HtPagination,
    HtDivider,
    CompanyInfo,
    GoodsSearch,
    GoodsInfoDialog,
    Address
  }
})
export default class GoodsList extends Vue {
  @Inject("reload") reload: any;
  @CityStore.Getter("activeAreaCity")
  protected activeAreaCity!: AreaModel;
  protected areaCity: AreaModel | "" = this.activeAreaCity;
  @Watch("activeAreaCity", { deep: true, immediate: true })
  protected activeAreaCityChange(newVal: AreaModel) {
    if (newVal) {
      this.areaCity = newVal;
    }
    this.getParts();
  }
  protected goodsInfoVisible = false;

  protected pageSizes = PAGE_SIZES;
  protected pageInfo: PageParams = {
    page: 1,
    pageSize: PAGE_SIZES[0],
    totalSize: 0,
    totalPage: 1
  };
  protected list: PartModel[] = [];
  protected partInfo = {} as PartModel;

  protected queryParams: PartParams = JSON.parse(JSON.stringify(queryParams));

  protected areaCityChange(value: AreaModel) {
    console.log(value);
    // console.log(this.areaCity);
    // if (value && value.id) {
    //   this.queryParams.areas = `City:${value.id}`;
    // } else {
    //   this.queryParams.areas = "";
    // }
    this.getParts();
  }

  protected getParts() {
    const { page, pageSize } = this.pageInfo;
    const params = {
      ...this.queryParams,
      page,
      pageSize
    };
    if(this.areaCity) {
      params.areas = `City:${this.areaCity.id}`;
    }
    goodsService
      .getParts(params)
      .then((res: PageResponseResult<PartModel[]>) => {
        console.log(res);
        if (res) {
          this.list = res.rows || [];
          this.pageInfo.totalSize = res.totalSize || 0;
          this.pageInfo.totalPage = res.totalPage || 1;
        }
      })
      .catch(() => {
        this.list = [];
        this.pageInfo.page = 1;
        this.pageInfo.totalSize = 0;
        this.pageInfo.totalPage = 1;
      });
  }

  protected enquiry(companyId: string) {
    this.$router.replace({ path: "/goods", query: { companyId } });
    this.reload();
  }

  protected showPartInfo(row: PartModel) {
    console.log(row);
    this.partInfo = row;
    this.goodsInfoVisible = true;
  }
  protected hidePartInfo() {
    this.goodsInfoVisible = false;
  }

  created() {
    Object.assign(this.queryParams, this.$route.query);
    const { companyId } = this.$route.query;
    if (companyId) {
      this.queryParams.companyIds = [Number(companyId)];
    }
    // this.getParts();
  }
}
</script>

<style lang="scss" scoped>
.goods-template {
  .ht-card {
    margin-top: $margin-size-main;
    background-color: $color-white;
    .goods-list {
      padding: 16px;
      .el-table {
        margin-top: $margin-size-main;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        color: $color-base;
        .cell-li {
          line-height: 18px;
        }
        .cell-tag {
          display: inline-block;
          color: $color-white;
          background-color: $color-primary;
          font-size: $font-size-12;
          border-radius: 18px;
          line-height: 18px;
          padding: 0 6px;
        }
        .cell-flex {
          display: flex;
          line-height: 18px;
          .cell-flex-right {
            flex: 1;
            padding-top: 2px;
            padding-left: 2px;
          }
        }
        .cell-price {
          margin-left: 2px;
          // font-size: $font-size-16;
          font-weight: 600;
        }
        .cell-promotion {
          color: $color-red;
        }
      }
    }
  }
}
</style>
