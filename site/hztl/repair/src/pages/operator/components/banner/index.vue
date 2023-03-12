<template>
  <div class="banner-container">
    <swiper v-if="banners.length > 1" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <img class="banner-img" :src="banner.pic" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <img v-if="banners.length === 1" class="banner-img" :src="banners[0].pic" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Swiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { BannerModel } from "@/common/interface/commonInterface";
import banner01 from "@/assets/img/operator/banner01.png";
import banner02 from "@/assets/img/operator/banner02.png";
import banner03 from "@/assets/img/operator/banner03.png";

@Component({
  name: "OperatorBanner",
  components: {
    Swiper: Swiper.swiper,
    SwiperSlide: Swiper.swiperSlide
  }
})
export default class OperatorBanner extends Vue {
  protected banners: BannerModel[] = [
    {
      pic: banner01,
      name: "banner01",
      url: ""
    },
    {
      pic: banner02,
      name: "banner02",
      url: ""
    },
    {
      pic: banner03,
      name: "banner03",
      url: ""
    }
  ];

  @Prop({
    default: () => {
      return {
        // 分页器配置
        pagination: {
          el: ".swiper-pagination",
          bulletActiveClass: "bullet-active",
          clickable: true
        },
        // 设定初始化时slide的索引
        initialSlide: 0,
        //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
        direction: "horizontal",
        // 自动切换图配置
        autoplay: {
          delay: 10000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 环状轮播
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 3
      };
    }
  })
  protected swiperOption!: any;
}
</script>

<style lang="scss" scoped>
.banner-container {
  height: 100%;
  width: 100%;
  .banner-img {
    display: block;
    height: 100%;
    width: 100%;
  }
  .swiper-container {
    height: 100%;
    ::v-deep .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: rgba(255, 255, 255, 0.6);
      opacity: 1;
    }
    ::v-deep .bullet-active {
      width: 8px;
      height: 8px;
      border: 1px solid $color-white;
    }
    .swiper-pagination {
      bottom: 0px;
    }
  }
}
</style>
