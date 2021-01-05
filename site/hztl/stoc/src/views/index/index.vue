<template>
  <div class="index-container">
    <header-main>
      <Address slot="address" @areaCityChange="areaCityChange"></Address>
    </header-main>
    <div class="ht-container">
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
      <div class="floor m-t">
        <CompanyTemplate
          ref="companyTemplate"
          :params="params"
        ></CompanyTemplate>
      </div>
      <div class="advertisement-wrap">
        <a class="advertisement">
          <img src="../../assets/img/advertisement01.png" />
        </a>
      </div>
      <div class="floor m-t">
        <GoodsTemplate ref="goodsTemplate" :params="params"></GoodsTemplate>
      </div>
      <div class="advertisement-wrap">
        <a class="advertisement">
          <img src="../../assets/img/advertisement02.png" />
        </a>
      </div>
      <div class="floor m-t">
        <BrandTemplate></BrandTemplate>
      </div>
    </div>
    <div class="divider-end">
      <ht-divider>END</ht-divider>
    </div>
    <footer-main></footer-main>
    <LayerScroll :floors="floors"></LayerScroll>

    <GuideShade></GuideShade>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderMain from "@/components/headerMain/index";
import FooterMain from "@/components/footerMain/index";
import Address from "@/components/address/index";
import Banner from "@/components/banner/index";
import LayerScroll from "@/components/layerScroll/index";
import GuideShade from "@/components/guideShade/index";
import { HtDivider } from "@/components/hztl";
import {
  AreaModel,
  BannerModel,
  FloorModel
} from "@/common/interface/commonInterface";
import CompanyTemplate from "./components/companyTemplate/index.vue";
import GoodsTemplate from "./components/goodsTemplate/index.vue";
import BrandTemplate from "./components/brandTemplate/index.vue";
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();

@Component({
  name: "Index",
  components: {
    HeaderMain,
    FooterMain,
    Address,
    Banner,
    LayerScroll,
    GuideShade,
    CompanyTemplate,
    GoodsTemplate,
    BrandTemplate,
    HtDivider
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

  protected loadData() {
    commonService.getIndexInfo().then(res => {
      const {
        banners
        // copyright,
        // customerService,
        // logoUrl
      } = res;
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
    });
  }

  protected params = {
    orderByAreas: ""
  };

  get refCompanyTemplate(): CompanyTemplate {
    return this.$refs.companyTemplate as CompanyTemplate;
  }
  get refGoodsTemplate(): GoodsTemplate {
    return this.$refs.goodsTemplate as GoodsTemplate;
  }
  protected areaCityChange(value: AreaModel) {
    this.params.orderByAreas = value ? `City:${value.id}` : "";
    this.refCompanyTemplate.getDatas();
    this.refGoodsTemplate.getDatas();
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
    .floor {
      background: $color-white;
    }
    .advertisement-wrap {
      margin-top: $margin-size-main;
      .advertisement {
        display: block;
        width: $width-main;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
