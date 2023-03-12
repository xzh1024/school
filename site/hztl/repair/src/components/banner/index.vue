<template>
  <div class="banner-container">
    <swiper v-if="banners.length > 1" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <a
          class="banner-img"
          target="_blank"
          v-if="banner.url"
          :href="banner.url"
        >
          <img :src="banner.pic || ''" @error="defaultImgFn" />
        </a>
        <img
          class="banner-img"
          v-else
          :src="banner.pic || ''"
          @error="defaultImgFn"
        />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <template v-if="banners.length === 1">
      <a
        class="banner-img"
        target="_blank"
        v-if="banners[0].url"
        :href="banners[0].url"
      >
        <img :src="banners[0].pic || ''" @error="defaultImgFn" />
      </a>
      <img
        class="banner-img"
        v-else
        :src="banners[0].pic || ''"
        @error="defaultImgFn"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Swiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { BannerModel } from "@/common/interface/commonInterface";
import { defaultImgRectangle } from "@/common/utils/defaultImg";

@Component({
  name: "Banner",
  components: {
    Swiper: Swiper.swiper,
    SwiperSlide: Swiper.swiperSlide
  }
})
export default class Banner extends Vue {
  @Prop() protected banners!: BannerModel[];

  @Prop({
    default: () => {
      return {
        // 分页器配置
        pagination: {
          el: ".swiper-pagination",
          // bulletClass : "bullet",
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
        // 箭头配置
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        // 环状轮播
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 3
        // loopAdditionalSlides: 0,
      };
    }
  })
  protected swiperOption!: any;

  protected defaultImgFn = defaultImgRectangle;
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
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-container {
    height: 100%;
    .swiper-button-prev,
    .swiper-button-next {
      transition: all 0.15s ease-in 0.05s;
      opacity: 0;
      color: $color-primary;
      width: 24px;
      height: 24px;
      margin-top: 0;
      transform: translateY(-50%);
    }
    .swiper-button-prev {
      left: 0;
      background: url("~@/assets/img/icon/icon-prev.png") no-repeat;
      background-size: 100% 100%;
    }
    .swiper-button-next {
      right: 0;
      background: url("~@/assets/img/icon/icon-next.png") no-repeat;
      background-size: 100% 100%;
    }
    &:hover .swiper-button-prev {
      opacity: 1;
    }
    &:hover .swiper-button-next {
      opacity: 1;
    }
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
      text-align: left;
      text-indent: 16px;
    }
  }
}
</style>
