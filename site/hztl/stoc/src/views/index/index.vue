<template>
  <div class="index-container">
    <header-main>
      <Address
        slot="address"
        :areaCity.sync="areaCity"
        @areaCityChange="areaCityChange"
      ></Address>
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
        <CompanyTemplate></CompanyTemplate>
      </div>
      <div class="floor m-t">
        <GoodsTemplate></GoodsTemplate>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HeaderMain from "@/components/headerMain/index";
import FooterMain from "@/components/footerMain/index";
import Address from "@/components/address/index";
import Banner from "@/components/banner/index";
import LayerScroll from "@/components/layerScroll/index";
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
import { Getter, namespace } from "vuex-class";
const CityStore = namespace("city");

@Component({
  name: "Index",
  components: {
    HeaderMain,
    FooterMain,
    Address,
    Banner,
    LayerScroll,
    CompanyTemplate,
    GoodsTemplate,
    BrandTemplate,
    HtDivider
  }
})
export default class Index extends Vue {
  @CityStore.Getter("activeAreaCity")
  protected activeAreaCity!: AreaModel;
  @CityStore.Mutation("setActiveAreaCity")
  protected setActiveAreaCity!: Function;

  protected areaCity: AreaModel | "" = "";
  @Watch("activeAreaCity", { deep: true, immediate: true })
  protected activeAreaCityChange(newVal: AreaModel) {
    if (newVal) {
      this.areaCity = newVal;
    }
  }
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
      // console.log(res);
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

  protected areaCityChange(value: AreaModel) {
    console.log(value);
    sessionStorage.activeAreaCity = JSON.stringify(value);
    this.setActiveAreaCity();
    // activeAreaCity
    // if (value && value.id) {
    //   this.queryParams.areas = `City:${value.id}`;
    // } else {
    //   this.queryParams.areas = "";
    // }
    // this.getParts();
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
