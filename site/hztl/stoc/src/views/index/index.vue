<template>
  <div class="index-container">
    <header-main />
    <div class="ht-container">
      <div class="layout-banner m-t clearfix">
        <div class="layout-banner-left">
          <banner :banners="mediumBanners" name="medium" key="medium"></banner>
        </div>
        <div class="layout-banner-right">
          <div class="layout-banner-small">
            <banner :banners="smallBanners" name="small" key="small"></banner>
          </div>
          <div class="layout-banner-mini">
            <banner :banners="miniBanners" name="mini" key="mini"></banner>
          </div>
        </div>
      </div>
      <div class="container company m-t">
        <CompanyTemplate></CompanyTemplate>
      </div>
      <div class="container goods m-t">
        <GoodsTemplate></GoodsTemplate>
      </div>
      <div class="container brand m-t">
        <BrandTemplate></BrandTemplate>
      </div>
    </div>
    <div class="divider-end">
      <ht-divider>END</ht-divider>
    </div>
    <FooterMain></FooterMain>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderMain from "@/components/headerMain/index";
import FooterMain from "@/components/footerMain/index";
import Banner from "@/components/banner/index";
import { HtDivider } from "@/components/hztl";
import { BannerModel } from "@/common/interface/commonInterface";
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
    Banner,
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
      console.log(res);
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
    .container {
      // height: 300px;
      // margin-top: 50px;
      background: $color-white;
    }
    .company {
      // background: #66ffff;
      // height: 582px;
      overflow: hidden;
    }
    // .goods {
    //   background: #ff66ff;
    // }
    // .brand {
    //   background: #ffff66;
    // }
  }
  .divider-end {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
