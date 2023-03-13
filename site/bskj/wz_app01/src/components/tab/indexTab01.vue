<template>
	<div class="index-tab" ref="mytab">
		<!--<a data-tabclass="game-on" @click="$router.push({path:'game'});">-->
    <a @click="hopRouter(0, 'game')">
			<i data-tabclass="game-on"></i>
	    <span class="small3">游戏</span>
		</a>
		<!--<a data-tabclass="list-on" @click="$router.push({path:'ranking_list'});">-->
			<!--<i></i>-->
	    <!--<small>排行榜</small>-->
		<!--</a>-->
    <a @click="hopRouter(1, 'open_list')">
    <!--<a data-tabclass="open-on" @click="$router.push({path:'open_list'});">-->
      <i data-tabclass="open-on"></i>
      <span class="small3">开服表</span>
    </a>
		<a @click="$router.push({path:'/invite'});">
			<small></small>
		    <i></i>
		    <span class="small3"></span>
		</a>
    <a @click="hopRouter(3, 'drive')">
    <!--<a data-tabclass="drive-on" @click="$router.push({path:'drive'});">-->
    <i data-tabclass="drive-on"></i>
    <span class="small3">车站</span>
    </a>
		<!--<a data-tabclass="open-on" @click="$router.push({path:'open_list'});">-->
			<!--<i></i>-->
	    <!--<small>开服表</small>-->
		<!--</a>-->
		<a @click="hopRouter(4, 'myMsg')">
		<!--<a data-tabclamyMsg="my-on"  @click="$router.push({pamyMsg:'my'});">-->
			<i data-tabclass="my-on"></i>
	    <span class="small3">我的</span>
		</a>
	</div>
</template>
<script>
export default {
  data() {
    return {
      tabIcon: [],
      tabIconName: []
    }
  },
  props: {
//    newTab: {
//    	type: Number,
//      required: true
//    }
  },
	mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
		this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      this.tabIcon = document.querySelectorAll(".index-tab>a>i");
      this.tabIconName = document.querySelectorAll(".index-tab>a>span");
      console.log(this.$route.name);
      if(this.$route.name == 'game'){
        this.tabIcon[0].className = this.tabIcon[0].dataset.tabclass;
        this.tabIconName[0].style.color = '#1993e9';
      } else if(this.$route.name == 'openList'){
        this.tabIcon[1].className = this.tabIcon[1].dataset.tabclass;
        this.tabIconName[1].style.color = '#1993e9';
      } else if(this.$route.name == 'drive'){
        this.tabIcon[3].className = this.tabIcon[3].dataset.tabclass;
        this.tabIconName[3].style.color = '#1993e9';
      } else if(this.$route.name == 'myMsg'){
        this.tabIcon[4].className = this.tabIcon[4].dataset.tabclass;
        this.tabIconName[4].style.color = '#1993e9';
      }
		});
	},
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      for(let i = 0, len = this.tabIcon.length; i < len; i++) {
        this.tabIcon[i].className = '';
        this.tabIconName[i].style.color = '#929292';
      }
      if(to.name == 'game'){
        this.tabIcon[0].className = this.tabIcon[0].dataset.tabclass;
        this.tabIconName[0].style.color = '#1993e9';
      } else if(to.name == 'openList'){
        this.tabIcon[1].className = this.tabIcon[1].dataset.tabclass;
        this.tabIconName[1].style.color = '#1993e9';
      } else if(to.name == 'drive'){
        this.tabIcon[3].className = this.tabIcon[3].dataset.tabclass;
        this.tabIconName[3].style.color = '#1993e9';
      } else if(to.name == 'myMsg'){
        this.tabIcon[4].className = this.tabIcon[4].dataset.tabclass;
        this.tabIconName[4].style.color = '#1993e9';
      }
    }
  },
  methods: {
    hopRouter(index, url){
      for(let i = 0, len = this.tabIcon.length; i < len; i++) {
        this.tabIcon[i].className = '';
        this.tabIconName[i].style.color = '#929292';
      }
      this.tabIcon[index].className = this.tabIcon[index].dataset.tabclass;
      this.tabIconName[index].style.color = '#1993e9';
      this.$router.push({path:url});
    }
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
	      background: url("../../static/img/07_icon_youxi.png") no-repeat;
	      background-size: 100%;
	    }
	    /*游戏*/
	    &:nth-child(1) > i {
	      /*background-image: url("../static/img/07_icon_youxi_an.png");*/
	    }
	    .game-on{
	      background-image: url("../../static/img/07_icon_youxi_liang.png")!important;
	    }
	    /*开服表*/
	    &:nth-child(2) > i {
	      background-image: url("../../static/img/08_icon_kaifubiao.png");
	    }
      .open-on{
        background-image: url("../../static/img/08_icon_kaifubiao_liang.png")!important;
      }
	    /*.list-on{*/
	      /*background-image: url("../../../static/img/08_icon_paihangbang_liang.png")!important;*/
	    /*}*/

	    /*邀请好友*/
	    &:nth-child(3) > i {
	      background-image: none;
	    }
	    &:nth-child(3) > small {
	      display: inline-block;
	      width: 4rem;
	      height: 4rem;
	      position: absolute;
	      top: -0.9rem;
        left: 0;
        right: 0;
        margin: 0 auto;
	      background: url("../../static/img/09_icon_jiahaoyou.png") no-repeat;
	      background-size: contain;
	      border-radius: 50%;
	    }
	    /*车站*/
	    &:nth-child(4) > i {
	      background-image: url("../../static/img/10_icon_chezhan.png");
	    }
      .drive-on{
        background-image: url("../../static/img/10_icon_chezhan_liang.png")!important;
      }

	    /*我的*/
	    &:nth-child(5) > i {
	      background-image: url("../../static/img/11_icon_wode-.png");
	    }
	    .my-on{
	      background-image: url("../../static/img/11_icon_wode-_liang.png")!important;
	    }
      span{
	      color: #929292;
	      margin-bottom: .2rem;
	    }
	  }
	}
</style>
