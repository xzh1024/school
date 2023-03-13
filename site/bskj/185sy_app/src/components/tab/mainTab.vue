<template>
	<div class="main-tab" ref="mytab">
		<a data-tabclass="game-on" @click="$router.push({path:'game'});">
			<i></i>
	    <span class="small2">游戏</span>
		</a>
		<!--<a data-tabclass="list-on" @click="$router.push({path:'ranking_list'});">-->
			<!--<i></i>-->
	    <!--<small>排行榜</small>-->
		<!--</a>-->
    <a data-tabclass="open-on" @click="$router.push({path:'open_list'});">
      <i></i>
      <span class="small2">开服表</span>
    </a>
		<a @click="$router.push({path:'invite'});">
			<small></small>
		    <i></i>
		    <span class="small2"></span>
		</a>
    <a data-tabclass="drive-on" @click="$router.push({path:'drive'});">
    <i></i>
    <span class="small2">车站</span>
    </a>
		<!--<a data-tabclass="open-on" @click="$router.push({path:'open_list'});">-->
			<!--<i></i>-->
	    <!--<small>开服表</small>-->
		<!--</a>-->
		<a data-tabclass="my-on"  @click="$router.push({path:'my'});">
			<i></i>
	    <span class="small2">我的</span>
		</a>
	</div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    newTab: {
    	type: Number,
      required: true
    }
  },
	mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
		this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
		    let icons = document.querySelectorAll(".main-tab>a>i");
        let name = document.querySelectorAll(".main-tab>a>span");
		    if(this.newTab != 2) {
		    	for(let i = 0, len = icons.length; i < len; i++) {
            if(i == this.newTab){
              icons[i].className = icons[i].parentNode.dataset.tabclass;
              name[i].style.color = '#1993e9';
            }
          }
		    }
		});
	}
}
</script>

<style lang="less">
	/*页脚标签栏*/
	.main-tab {
	  position: relative;
	  display: flex;
	  border-top: 1px solid #ccc;
    background-color: #fff;
	  & > a {
	    flex: 1;
	    display: flex;
	    /*改变主轴方向*/
	    flex-direction: column;
	    /*子元素侧轴居中*/
	    align-items: center;
	    i {
	      display: inline-block;
	      width: 1.8rem;
	      height: 1.8rem;
	      margin: .2rem 0 .1rem;
	      background: url("../../static/img/07_icon_youxi.png") no-repeat;
	      background-size: contain;
	    }
	    /*游戏*/
	    &:nth-child(1) > i {
        height: 1.4rem;
        margin-top: .6rem;
	      /*background-image: url("../static/img/07_icon_youxi_an.png");*/
	    }
	    .game-on{
	      background-image: url("../../static/img/07_icon_youxi_liang.png")!important;
	    }
	    /*开服表*/
	    &:nth-child(2) > i {
        height: 1.6rem;
        margin-top: .4rem;
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
        width: 1.6rem;
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
