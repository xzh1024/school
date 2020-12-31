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
      <div class="floor m-t">
        <GoodsTemplate ref="goodsTemplate" :params="params"></GoodsTemplate>
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
  // protected areaCity: AreaModel | "" = {
  //   id: 3,
  //   name: "成都市"
  // };
  // @Watch("activeAreaCity", { deep: true, immediate: true })
  // protected activeAreaCityChange(newVal: AreaModel) {
  //   if (newVal) {
  //     this.areaCity = newVal;
  //   }
  // }
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

  protected banners: BannerModel[] = [
    {
      name: "name01",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3475570381,2768348736&fm=26&gp=0.jpg",
      url: ""
    },
    {
      name: "name02",
      pic:
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1486271666,307393547&fm=26&gp=0.jpg",
      url: ""
    },
    {
      name: "name03",
      pic:
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3936997076,709579838&fm=26&gp=0.jpg",
      url: ""
    }
  ];

  protected getInfoData() {
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
            // this.mediumBanners = this.banners;
          } else if (index === 1) {
            this.smallBanners = item || [];
          } else if (index === 2) {
            this.miniBanners = item || [];
          }
          this.smallBanners = this.banners;
          this.miniBanners = this.banners;
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
    // sessionStorage.activeAreaCity = JSON.stringify(value);
    // this.setActiveAreaCity();
    // activeAreaCity
    this.params.orderByAreas = value ? `City:${value.id}` : "";
    this.refCompanyTemplate.getDatas();
    this.refGoodsTemplate.getDatas();
  }

  created() {
    this.getInfoData();
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
  }
}
</style>
