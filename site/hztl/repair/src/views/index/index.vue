<template>
  <div class="index-container">
    <HeaderMain>
      <SortAddress
        slot="address"
        @areaCityChange="areaCityChange"
      ></SortAddress>
    </HeaderMain>
    <div class="ht-container">
      <!-- 轮播图 -->
      <div class="layout-banner m-t clearfix">
        <div class="layout-banner-left">
          <banner :banners="mediumBanners"></banner>
        </div>
        <div class="layout-banner-right">
          <div class="layout-banner-small">
            <banner :banners="smallBanners"></banner>
          </div>
          <div class="layout-banner-mini">
            <banner :banners="miniBanners"></banner>
          </div>
        </div>
      </div>
      <!-- 推荐商家 -->
      <CompanyTemplate
        class="floor m-t"
        ref="companyTemplate"
        :params="params"
      ></CompanyTemplate>
      <!-- 广告位1 -->
      <AdvertisementsTemplate
        class="advertisement"
        :list="advertisement1"
      ></AdvertisementsTemplate>
      <!-- 优质好货 -->
      <GoodsTemplate
        class="floor m-t"
        ref="goodsTemplate"
        :params="params"
      ></GoodsTemplate>
      <!-- 广告位2 -->
      <AdvertisementsTemplate
        class="advertisement"
        :list="advertisement2"
      ></AdvertisementsTemplate>
      <!-- 热门品牌 -->
      <BrandTemplate class="floor m-t"></BrandTemplate>
    </div>
    <div class="divider-end">
      <ht-divider>END</ht-divider>
    </div>
    <FooterMain></FooterMain>
    <!-- 右侧楼层菜单 -->
    <LayerScroll :floors="floors"></LayerScroll>
    <!-- 城市地址 -->
    <GuideShade></GuideShade>
    <!-- 浏览器兼容性弹框 -->
    <IeDialog></IeDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderMain from "@/components/headerMain/index";
import FooterMain from "@/components/footerMain/index";
import SortAddress from "./components/address/index.vue";
import Banner from "@/components/banner/index";
import LayerScroll from "@/components/layerScroll/index.vue";
import GuideShade from "@/components/guideShade/index.vue";
import { HtDivider } from "@/components/hztl";
import IeDialog from "./components/ieDialog/index.vue";
import {
  AreaModel,
  BannerModel,
  FloorModel,
  AreaParams
} from "@/common/interface/commonInterface";
import CompanyTemplate from "./components/companyTemplate/index.vue";
import GoodsTemplate from "./components/goodsTemplate/index.vue";
import BrandTemplate from "./components/brandTemplate/index.vue";
import AdvertisementsTemplate from "./components/advertisementsTemplate/index.vue";
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();

interface IndexParams {
  orderByAreas: AreaParams[];
}

@Component({
  name: "Index",
  components: {
    HeaderMain,
    FooterMain,
    SortAddress,
    Banner,
    LayerScroll,
    GuideShade,
    CompanyTemplate,
    GoodsTemplate,
    BrandTemplate,
    AdvertisementsTemplate,
    HtDivider,
    IeDialog
  }
})
export default class Index extends Vue {
  protected mediumBanners: BannerModel[] = [];
  protected smallBanners: BannerModel[] = [];
  protected miniBanners: BannerModel[] = [];

  protected floors: FloorModel[] = [
    {
      name: "推荐商家",
      value: "company"
    },
    {
      name: "优质好货",
      value: "goods"
    },
    {
      name: "热门品牌",
      value: "brand"
    }
  ];
  protected advertisement1: BannerModel[] = [];
  protected advertisement2: BannerModel[] = [];

  protected loadData() {
    commonService.getIndexInfo().then(res => {
      const { banners, advertisements } = res;
      // 轮播图
      if (Array.isArray(banners)) {
        banners.forEach((item: BannerModel[], index) => {
          if (index === 0) {
            this.mediumBanners = item || [];
          } else if (index === 1) {
            this.smallBanners = item || [];
          } else if (index === 2) {
            this.miniBanners = item || [];
          }
        });
      }
      // 广告位
      if (advertisements) {
        this.advertisement1 = advertisements.advertisement_1 || [];
        this.advertisement2 = advertisements.advertisement_2 || [];
      }
    });
  }

  protected params: IndexParams = {
    orderByAreas: []
  };

  get refCompanyTemplate(): CompanyTemplate {
    return this.$refs.companyTemplate as CompanyTemplate;
  }
  get refGoodsTemplate(): GoodsTemplate {
    return this.$refs.goodsTemplate as GoodsTemplate;
  }
  protected areaCityChange(value: AreaModel) {
    this.params.orderByAreas = [
      {
        type: "City",
        id: value.id
      }
    ];
    this.refCompanyTemplate.getDatas();
    // this.refGoodsTemplate.getDatas();
  }

  created() {
    this.loadData();
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  .ht-container {
    .layout-banner {
      .layout-banner-left {
        float: left;
        width: 752px;
        height: 322px;
      }
      .layout-banner-right {
        float: right;
        width: 440px;
        height: 322px;
        .layout-banner-small {
          height: 188px;
        }
        .layout-banner-mini {
          height: calc(100% - 188px);
          box-sizing: border-box;
          padding-top: 8px;
        }
      }
    }
    .advertisement {
      margin-top: $margin-size-main;
    }
    .floor {
      background: $color-white;
    }
  }
}
</style>
