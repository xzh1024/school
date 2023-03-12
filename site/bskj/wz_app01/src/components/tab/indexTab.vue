<template>
	<div class="index-tab" ref="mytab">
		<!--<a data-tabclass="game-on" @click="$router.push({path:'game'});">-->
    <a @click="$router.push({path:'/index/game'});">
			<i data-tabclass="menu1" :class="{'menu1': active === 1}"></i>
	    <span class="small3" :class="{'red': active === 1}">游戏</span>
		</a>
		<!--<a data-tabclass="list-on" @click="$router.push({path:'ranking_list'});">-->
			<!--<i></i>-->
	    <!--<small>排行榜</small>-->
		<!--</a>-->
    <a @click="$router.push({path:'/index/class_ify/1/玩转'});">
      <i data-tabclass="menu2" :class="{'menu2': active === 2}"></i>
      <span class="small3" :class="{'red': active === 2}">分类</span>
    </a>
    <a @click="$router.push({path:'/index/invite'});">
      <i data-tabclass="menu3" :class="{'menu3': active === 3}"></i>
      <span class="small3" :class="{'red': active === 3}">邀请</span>
    </a>
    <a @click="$router.push({path:'/index/drive'});">
      <i data-tabclass="menu4" :class="{'menu4': active === 4}"></i>
      <span class="small3" :class="{'red': active === 4}">冲电站</span>
    </a>
		<!--<a data-tabclass="open-on" @click="$router.push({path:'open_list'});">-->
			<!--<i></i>-->
	    <!--<small>开服表</small>-->
		<!--</a>-->
		<a @click="$router.push({path:'/index/my'});">
			<i data-tabclass="menu5" v-bind:class="{'menu5': active === 5}"></i>
	    <span class="small3" v-bind:class="{'red': active === 5}">我的</span>
		</a>
	</div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
    }
  },
  props: {
//    newTab: {
//    	type: Number,
//      required: true
//    }
  },
	mounted(){
		this.$nextTick(function () {
//      console.log(this.$route.name);
      this.active = this.$route.meta.index;
		});
	},
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      this.active = to.meta.index;
    }
  },
  methods: {
//    hopRouter(index, url){
////      this.active = index;
//      this.$router.push({path:url});
//    }
  }
}
</script>

<style lang="less">
	/*页脚标签栏*/
	.index-tab {
	  position: relative;
	  display: flex;
	  border-top: 1px solid #dedede;
    background-color: #fff;
	  & > a {
	    flex: 1;
	    display: flex;
	    /*改变主轴方向*/
	    flex-direction: column;
	    /*子元素侧轴居中*/
	    align-items: center;
      justify-content: center;
	    i {
	      display: inline-block;
	      width: 1.8rem;
	      height: 1.8rem;
	      margin: .2rem 0 .1rem;
	      background: url("../../static/img/wz/index/a_icon_youxi_an.png") no-repeat;
	      background-size: 100%;
	    }
	    /*游戏*/
	    &:nth-child(1) > i {
	      /*background-image: url("../static/img/07_icon_youxi_an.png");*/
	    }
	    .menu1{
	      background-image: url("../../static/img/wz/index/a_icon_youxi_hong.png")!important;
	    }
      /*分类*/
	    &:nth-child(2) > i {
	      background-image: url("../../static/img/wz/index/a_icon_fenlei_an.png");
	    }
      .menu2{
        background-image: url("../../static/img/wz/index/a_icon_fenlei_hong.png")!important;
      }

	    /*邀请好友*/
      &:nth-child(3) > i {
        background-image: url("../../static/img/wz/index/a_icon_yaoqing_an.png");
      }
      .menu3{
        background-image: url("../../static/img/wz/index/a_icon_yaoqing_hong.png")!important;
      }

	    /*车站*/
	    &:nth-child(4) > i {
	      background-image: url("../../static/img/wz/index/a_icon_chongdianzhan_an.png");
	    }
      .menu4{
        background-image: url("../../static/img/wz/index/a_icon_chongdianzhan_hong.png")!important;
      }

	    /*我的*/
	    &:nth-child(5) > i {
	      background-image: url("../../static/img/wz/index/a_icon_wode_an.png");
	    }
	    .menu5{
	      background-image: url("../../static/img/wz/index/a_icon_wode_hong.png")!important;
	    }
      span{
	      color: #929292;
	      margin-bottom: .2rem;
	    }
      .red{
        color: #d74d43;
      }
	  }
	}
</style>
