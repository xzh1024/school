<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in imgs" :key="index"><img :src="myType.domainName + item"></swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css'
  export default{
//    name: 'test2',
    data(){
      return {
        //轮播config
        swiperOption: {
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          //autoplay: 3000,
          initialSlide:2,
          direction:'horizontal',
          slidesPerView: "auto",//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
          centeredSlides: true//<span style="color:rgb(68,68,68);font-family:'microsoft yahei';font-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>
        }
      }
    },
    props: {
      imgs: {
        type: Array
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less" scoped>
  .swiper{
    margin: .3rem auto;
    width: 100%;
    height: 20rem;
    overflow: hidden;
    .swiper-container{
      height: 100%;
      .swiper-wrapper{
        height: 100%;
      }
    }
    .swiper-slide{
      width: 12rem;
      height: 20rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &.swiper-slide-active{
        /*height: 100%;*/
        img{
          width: 100%;
          height: 100%;
        }
      }
      img{
        display: block;
        margin: 0 auto;
        width: 88%;
        height: 88%;
        vertical-align: middle;
        -webkit-transition: all .5s ease 0s;
        -moz-transition: all .5s ease 0s;
        -ms-transition: all .5s ease 0s;
        -o-transition: all .5s ease 0s;
        transition: all .5s ease 0s;
      }
    }
  }
</style>
