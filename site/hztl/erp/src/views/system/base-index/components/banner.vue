<template>
  <div class="banner-container">
    <swiper v-if="banners.length > 1" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <img
          class="banner-img"
          :src="banner.pic"
          @click="handleClick(banner)"
        />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <img
      v-if="banners.length === 1"
      class="banner-img"
      :src="banners[0].pic"
      @click="handleClick(banners[0])"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Swiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { BannerModel } from "../constant/interfaces";
import { getAdvertisements } from "../services";

@Component({
  name: "Banner",
  components: {
    Swiper: Swiper.swiper,
    SwiperSlide: Swiper.swiperSlide
  }
})
export default class Banner extends Vue {
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

  protected banners: BannerModel[] = [];

  private handleClick(banner: BannerModel) {
    switch (banner.type) {
      case "NewWindow":
        window.open(banner.value);
        break;
      case "Erp":
        this.$router.push({ path: banner.value });
        break;
      default:
        return;
    }
  }

  // 获取广告
  private getAdvertisements() {
    getAdvertisements().then((res: BannerModel[]) => {
      this.banners = res || [];
    });
  }

  created() {
    this.getAdvertisements();
  }
}
</script>

<style lang="scss" scoped>
.banner-container {
  height: 100%;
  width: 100%;
  .banner-img {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .swiper-container {
    height: 100%;
    ::v-deep .swiper-pagination-bullet {
      background-color: rgba(255, 255, 255, 0.6);
      opacity: 1;
    }
    ::v-deep .bullet-active {
      border: 1px solid #ffffff;
    }
    .swiper-pagination {
      background-color: rgba(#000000, 0.2);
    }
    .swiper-pagination {
      bottom: 0px;
    }
  }
}
</style>
