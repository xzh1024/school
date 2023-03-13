<template>
  <div class="tabbar">
    <div class="tabbar-content">
      <div class="tarbar-item" :class="{'active':index === 0}" @click="$router.push({path:'/user'})">
        <div class="iconfont icon-yonghu"></div>
        <div class="tarbar-item-text">用户中心</div>
      </div>
      <div class="tarbar-item" :class="{'active':index === 1}" @click="$router.push({path:'/rebate'})">
        <div class="iconfont icon-fanlishangcheng"></div>
        <div class="tarbar-item-text">返利</div>
      </div>
      <div class="tarbar-item" :class="{'active':index === 2}" @click="$router.push({path:'/kac'})">
        <div class="iconfont icon-huiyuanlibao"></div>
        <div class="tarbar-item-text">礼包</div>
      </div>
      <div class="tarbar-item" :class="{'active':index === 3}" @click="$router.push({path:'/message'})">
        <div class="iconfont icon-xiaoxi"></div>
        <div class="tarbar-item-text">消息</div>
      </div>
      <div class="tarbar-item" :class="{'active':index === 4}" @click="$router.push({path:'/psp'})">
        <div class="iconfont icon-ibooks"></div>
        <div class="tarbar-item-text">攻略</div>
      </div>
      <div class="tarbar-item" :class="{'active':index === 5}" @click="$router.push({path:'/service'})">
        <div class="iconfont icon-kefu"></div>
        <div class="tarbar-item-text">客服</div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../static/iconfont/iconfont.css';
export default {
  data () {
    return {
        index: parseInt(this.$route.meta.index, 10)
    }
  },
//  props:{
//    index: Number
//  },
  created(){

  },
  mounted(){
    this.$nextTick(function () {

    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tabbar{
    /*border-top: 1px solid #d6d6d6;*/
    border-top: 1px solid #ddd;
    .tabbar-content{
      display: flex;
      padding: .5em 0;
      .tarbar-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        color: #666;
        .iconfont{
          font-size: 1.5rem;
        }
        .tarbar-item-text{
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: .85rem;
          text-align: center;
        }
      }
      .active{
        color: #D74D43;
      }
    }
  }
</style>
