<template>
  <div class="goods-template">
    <ht-card title="商品">
      <template slot="after-title">
        <ht-pagination
          :total="pageInfo.totalSize"
          :current-page.sync="pageInfo.page"
          :page-count="pageInfo.totalPage"
          @current-change="getParts"
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
      <div class="goods-list">
        <GoodsSearch
          :queryParams="queryParams"
          @search="getParts"
          :visible="screenVisible"
        ></GoodsSearch>
        <el-table
          v-loading="loading"
          size="small"
          style="width: 100%"
          :header-cell-style="{
            color: '#FFFFFF',
            background: '#FF6E4C',
            fontWeight: 700
          }"
          border
          stripe
          :data="list"
          @row-click="showPartInfo"
        >
          <el-table-column
            label="商家名称"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.company && scope.row.company.name }}
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="编码/名称"
            min-width="210"
            show-overflow-tooltip
            class="color-primary"
          >
            <template slot-scope="scope">
              <span class="color-primary" v-if="scope.row.code">
                {{ scope.row.code }}
              </span>
              <span class="color-primary">/</span>
              <span class="color-primary" v-if="scope.row.name">
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="brand"
            label="配件品牌"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="property"
            label="性质"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.property === null ? "—" : scope.row.property }}
            </template>
          </el-table-column>
          <el-table-column
            prop="productionPlace"
            label="配件产地"
            min-width="80"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="name"
            label="图片"
            min-width="55"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div
                class="img-wrap"
                v-if="scope.row.imageUrls && scope.row.imageUrls.length"
              >
                <img
                  class="img-item"
                  :src="scope.row.imageUrls[0] || ''"
                  @error="defaultImgFn"
                />
                <span class="img-count">
                  共{{ scope.row.imageUrls.length }}张
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="vehModel"
            label="车型"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="适用车型" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              {{
                scope.row.factoryBrands && scope.row.factoryBrands.join("、")
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="qty"
            label="库存"
            width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.qty === null ? "无货" : scope.row.qty }}
            </template>
          </el-table-column>
          <el-table-column label="订货价" width="100">
            <template slot-scope="scope">
              <div class="strong" v-if="scope.row.price === null">
                请询价
              </div>
              <div class="strong" v-else>
                {{ scope.row.price }}
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
                  type="text"
                  size="small"
                  @click.native.stop="e => e.stopPropagation()"
                  >联系商家</el-button
                >
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagenation-wrap">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="getParts"
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

    <GoodsInfoDialog
      v-if="goodsInfoVisible"
      :info="partInfo"
      @hide="hidePartInfo"
    ></GoodsInfoDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HtCard, HtPagination, HtDivider } from "@/components/hztl";
import CompanyInfo from "@/views/company/components/companyInfo";
import GoodsSearch from "../goodsSearch/index.vue";
import GoodsInfoDialog from "../goodsInfoDialog/index.vue";
import { PageResponseResult } from "@/common/interface/commonInterface";
import { PageParams } from "@/common/interface/commonInterface";
import { PAGE_SIZES, DEFAULT_PAGE_SIZE } from "@/common/utils/config";
import { PartModel, PartParams } from "@/common/interface/goodsInterface";
import { GoodsService } from "@/common/services/goodsService";
const goodsService = new GoodsService();
import { defaultImgSquare } from "@/common/utils/defaultImg";

const queryParams = {
  keyword: "",
  vehBrands: [],
  partBrands: [],
  productionPlaces: [],
  areas: [],
  companyIds: []
};

@Component({
  name: "GoodsList",
  components: {
    HtCard,
    HtPagination,
    HtDivider,
    CompanyInfo,
    GoodsSearch,
    GoodsInfoDialog
  }
})
export default class GoodsList extends Vue {
  private loading = true;

  private screenVisible = true;

  private goodsInfoVisible = false;
  private defaultImgFn = defaultImgSquare;

  private pageSizes = PAGE_SIZES;
  private pageInfo: PageParams = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalSize: 0,
    totalPage: 1
  };
  private list: PartModel[] = [];
  private partInfo = {} as PartModel;

  private queryParams: PartParams = JSON.parse(JSON.stringify(queryParams));

  private handleSizeChange() {
    this.pageInfo.page = 1;
    this.getParts();
  }
  private getParts() {
    this.loading = true;
    const { page, pageSize } = this.pageInfo;
    const params = {
      ...this.queryParams,
      page,
      pageSize
    };
    goodsService
      .getParts(params)
      .then((res: PageResponseResult<PartModel[]>) => {
        if (res) {
          this.list = res.rows || [];
          this.pageInfo.totalSize = res.totalSize || 0;
          this.pageInfo.totalPage = res.totalPage || 1;
        }
        this.loading = false;
      })
      .catch(() => {
        this.list = [];
        this.pageInfo.page = 1;
        this.pageInfo.totalSize = 0;
        this.pageInfo.totalPage = 1;
        this.loading = false;
      });
  }

  private enquiry(companyId: string) {
    const { fullPath } = this.$route;
    this.$router.replace({
      path: "/redirect" + fullPath,
      query: {
        companyId
      }
    });
  }

  private showPartInfo(row: PartModel) {
    this.partInfo = row;
    this.goodsInfoVisible = true;
  }
  private hidePartInfo() {
    this.goodsInfoVisible = false;
  }

  private handleScreenVisible() {
    this.screenVisible = !this.screenVisible;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table {
  .sort-caret.ascending {
    top: -1px;
  }
  .sort-caret.descending {
    bottom: 1px;
  }
  .caret-wrapper {
    height: 22px;
  }
  .ascending {
    .sort-caret.ascending {
      border-bottom-color: #ffffff;
    }
    .sort-caret.descending {
      border-top-color: #c0c4cc;
    }
  }
  .descending {
    .sort-caret.ascending {
      border-bottom-color: #c0c4cc;
    }
    .sort-caret.descending {
      border-top-color: #ffffff;
    }
  }
}

.goods-template {
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
    .goods-list {
      padding: 16px;
      .pagenation-address-wrap {
        margin-bottom: $margin-size-main;
      }
      .pagenation-address-right {
        display: flex;
        align-items: center;
      }
      .el-table {
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        color: $color-base;
        .img-wrap {
          width: 36px;
          height: 36px;
          position: relative;
          .img-item {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: $border-primary;
            border-radius: 4px;
          }
          .img-count {
            display: block;
            width: 100%;
            height: 16px;
            line-height: 16px;
            font-size: $font-size-12;
            text-align: center;
            color: $color-white;
            background-color: rgba($color: #000000, $alpha: 0.2);
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
