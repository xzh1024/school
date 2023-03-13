<template>  <!--交易游戏列表-->
  <div>
    <!--<div class="goods">-->
      <!--<div class="goods_time small2 color_888888">2018-07-17 09:36</div>-->
      <!--<div class="goods_game">-->
        <!--<div class="goods_game_left">-->
          <!--<img src="" alt="">-->
        <!--</div>-->
        <!--<div class="goods_game_right">-->
          <!--<div>69压级6神号</div>-->
          <!--<div class="small2 color_888888">-->
            <!--<span class="m_r">区服:268</span>-->
            <!--<span class="m_l">平台:安卓</span>-->
          <!--</div>-->
          <!--<div class="goods_game_right_bottom">-->
            <!--<span class="small2 color_888888 goods_game_right_bottom_name">口袋有火影</span>-->
            <!--<span class="color_red">￥700.00</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="goods" v-for="v in list" @click="$router.push({path:'/tra_product_info/' + v.id})">
      <div class="goods_time small2 color_888888">{{ v.publish_time }}</div>
      <div class="goods_game">
        <div class="goods_game_left">
          <img v-lazy="v.imgs">
        </div>
        <div class="goods_game_right">
          <div>{{ v.title }}</div>
          <div class="small2 color_888888">
            <span>区服:</span>
            <span class="m_r">{{ v.server_name }}</span>
            <span class="m_l">平台:</span>
            <span>{{ v.system|F_system }}</span>
          </div>
          <div class="goods_game_right_bottom">
            <span class="small2 color_888888 goods_game_right_bottom_name">{{ v.game_name }}</span>
            <span class="color_red">{{ v.price|F_price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array
      }
    },
    filters: {	//自定义局部过滤器
      F_system:(system) => {
        if(system == 1){//平台: 1 安卓 2 IOS 3 双端
          system = '安卓';
        } else if(system == 2){
          system = 'IOS';
        } else if(system == 3){
          system = '双端';
        }
        return system;
      },
      F_price: (price) => {
        return '￥' + price;
      }
    },
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
    }
  }
</script>

<style scoped lang="less">
  .goods{
    padding: .6rem;
    border-bottom: 1px solid #f0f0f0;
    .goods_time{
      height: 1.3rem;
      line-height: 1rem;
    }
    .goods_game{
      display: flex;
      .goods_game_left{
        width: 9rem;
        height: 5rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .goods_game_right{
        margin-left: .6rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        & > div{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .goods_game_right_bottom{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .goods_game_right_bottom_name{
            padding: 0 .2rem;
            /*color: #29a1f7;*/
            border: 1px solid #eeeeee;
            border-radius: .6rem;
          }
        }
      }
    }
  }
</style>
