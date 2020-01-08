<template>
  <div class="ranklist" v-on:scroll.passive="onScroll($event)">
    <!--页头-->
    <div class="head" v-show="headMark" ref="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        排行榜
      </div>
      <div class="head_right"></div>
    </div>
    <div class="header" ref="header">
      <div class="nav">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
        <div class="nav-item" :class="{'black':type == 1}" @click="toggleType(1)">昨日佣金</div>
        <div class="nav-item" :class="{'black':type == 2}" @click="toggleType(2)">月佣金</div>
        <div class="nav-item" :class="{'black':type == 3}" @click="toggleType(3)">累计佣金</div>
        <div class="nav-item" :class="{'black':type == 4}" @click="toggleType(4)">累计粉丝</div>
      </div>
      <div class="header-title">恭喜玩家“<span>{{ranklistData.first.nick_name}}</span>”占领了封面</div>
      <div class="header-logo">
        <img v-if="ranklistData.first.icon_url" v-lazy="ranklistData.first.icon_url">
        <img src="../../../static/img/wz/ranklist/t_icon_touxiang.png" v-else>
      </div>
    </div>
    <!--<keep-alive>	&lt;!&ndash;缓存组件&ndash;&gt;-->
      <component :is="component_name" @setRanklistData="setRanklistData"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    <!--</keep-alive>-->



    <div class="footer">
      <div class="user-item">
        <div class="user-left">
          <i class="icon-touxiang-s"></i>
        </div>
        <div class="user-right">
          <div class="user-row">
            <p class="f_s2 strong m_r2">我的排名：{{ ranklistData.myLevel ? ranklistData.myLevel:'未上榜' }}</p>
            <i class="icon-ranklist-question"></i>
          </div>
          <div class="user-row color_999999">请再接再厉哦~</div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';

  import YesterdayCommission from './yesterdayCommission/yesterdayCommission.vue' //昨日佣金
  import lastMonthCommission from './lastMonthCommission/lastMonthCommission.vue' //月佣金
  import AccumulatedCommission from './accumulatedCommission/accumulatedCommission.vue' //累计佣金
  import AccumulatedFans from './accumulatedFans/accumulatedFans.vue' //累计粉丝
  export default {
    name: 'no_keep',
  	data() {
      return {
        component_name: 'YesterdayCommission',
        type: 1,
        headMark: false,
        ranklistData: {
          first: {
            icon_url: "",
            nick_name: "",
          },
          myLevel: ''
        }
      }
    },
    components: { YesterdayCommission, lastMonthCommission, AccumulatedCommission, AccumulatedFans },
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      setRanklistData(data){
        this.ranklistData = data;
        console.log(this.ranklistData);
      },
      onScroll(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var scrollTop = target.scrollTop;
        if(scrollTop > 0){
          if(scrollTop >= (this.$refs.header.offsetHeight - this.$refs.head.offsetHeight)){
            this.headMark = true;
          } else {
            this.headOpacity = false;
          }
        } else {
          this.headMark = false;
        }
      },
      toggleType(type){
        this.type = type;
        if(type == 1){
          this.component_name = 'YesterdayCommission';
        } else if(type == 2){
          this.component_name = 'lastMonthCommission';
        } else if(type == 3){
          this.component_name = 'AccumulatedCommission';
        } else if(type == 4){
          this.component_name = 'AccumulatedFans';
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .ranklist{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    .head{
      position: fixed;
      z-index: 3;
      top: 0;
      left: 0;
      width: 100%;
      height: 3rem;
      background-color: #ffffff;
    }
    .header{
      /*height: 15rem;*/
      background: url("../../../static/img/wz/ranklist/t_icon_beijing.png") no-repeat;
      background-size: 100% 80%;
      /*border-bottom: 1px solid #cccccc;*/
      .nav{
        display: flex;
        align-items: center;
        height: 3rem;
        .icon_left_black{
          margin: 0 1em;
        }
        .nav-item{
          flex: 1;
          display: flex;
          justify-content: center;
          font-size: 1.1rem;
          align-items: center;
          color: #777;
        }
        .black{
          color: black;
        }
      }
      .header-title{
        margin-top: 2.5em;
        font-size: 1.1rem;
        text-align: center;
        color: #fff;
      }
      .header-logo{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 1em;
        img{
          width: 6rem;
          height: 6rem;
          margin-top: .5em;
          border-radius: 50% 50%;
        }
      }
    }
    .footer{
      position: fixed;
      z-index: 3;
      bottom: 0;
      left: 0;
      width: 100%;
      /*height: 5rem;*/

      .user-item{
        display: flex;
        align-items: center;
        padding: .5em 1em;
        background-color: rgba(255, 255, 255, 0.8);
        .user-left{
          /*.user-logo{*/
          /*width: 3rem;*/
          /*height: 3rem;*/
          /*border-radius: 50% 50%;*/
          /*}*/
        }
        .user-right{
          flex: 1;
          margin-left: .6em;
          overflow: hidden;
          .user-row{
            width: 100%;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
