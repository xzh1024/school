<!--申请返利-->
<template>
  <div class="rebate">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        申请返利
      </div>
      <div class="head_right">
        <i class="icon_ask" @click="$router.push({path:'/rebate_know'});"></i>
      </div>
    </div>
    <!--<div class="head">-->
      <!--<a class="icon_left" @click="goRouter"></a>-->
      <!--申请返利-->
      <!--<a class="icon_ask" @click="$router.push({path:'rebate_know'});"></a>-->
    <!--</div>-->
    <div class="SM color_888888">
      <!--<small>1024申请了220元返利</small>-->
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(v, index) in rnData" :key="index"><span v-text="v.rolename"></span>申请了<span v-text="v.amount"></span>元返利</swiper-slide>
      </swiper>
      <!--<swiper :options="swiperOption">-->
        <!--<swiper-slide v-for="(item, index) in imgs" :key="index"><img :src="myType.domainName + item"></swiper-slide>-->
      <!--</swiper>-->
    </div>
    <div class="used-tab" v-active>
      <div class="flex1 tab-item">
        <a @click="component_name='ApplyRebate'" class="active">申请返利</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='RebateRecord'">返利记录</a>
      </div>
    </div>
    <div class="rebate_hint small2 color_888888">
      *温馨提示：多角色名游戏，请点击角色名选择角色
    </div>
    <keep-alive>	<!--缓存组件-->
      <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    </keep-alive>
	</div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ApplyRebate from './applyrebate/applyRebate.vue'
  import RebateRecord from './rebaterecord/rebateRecord.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        component_name: 'ApplyRebate',
        rnData: [],
        swiperOption: {
          loop : true,//实现环路
          initialSlide :1,//初始索引
          direction : 'vertical',//滑动方向
          speed:300,
//          autoplay:true,//等同于以下设置
          autoplay: {
           delay: 4000,
           stopOnLastSlide: false,
           disableOnInteraction: true,
           },
        }
      }
    },
    components: { ApplyRebate, RebateRecord },
    created() {
      this.getRebateNotice();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      //返利滚动通知
      getRebateNotice(){
        this.$http.get('/api/index.php?g=api&m=selfRebate&a=rebateNotice')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.rnData = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    },
    directives: {//自定义指令
      active: {
        // 指令的定义
        inserted: function (el) {
          el.onclick=function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName.toLowerCase() == 'a'){
              var tabs = document.querySelectorAll(".tab-item>a");
              for(let i=0,len=tabs.length; i < len; i++){
                tabs[i].className = '';
              }
              target.className = 'active';
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .rebate{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .SM{
      height: 1.4rem;
      line-height: 1.4rem;
      overflow: hidden;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .6rem 0;
    }
    .used-tab{
      border-bottom: 1px solid #eeeeee;
      .tab-item > a{
        width: 100%;
        text-align: center;
      }
    }
    .rebate_hint{
      height: 1.8rem;
      line-height: 1.8rem;
      overflow: hidden;
      border-bottom: .5rem solid #f0f0f0;
      background-color: #ffffff;
    }
  }
  /*.re_time{*/
    /*padding: 0 .8rem;*/
    /*height: 2.2rem;*/
    /*line-height: 2.2rem;*/
  /*}*/
  /*.re_t{*/
    /*background-color: #fff;*/
    /*height: 2.8rem;*/
    /*padding: 0 4.8rem 0 .8rem;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*.re_th{*/
      /*white-space:nowrap;*/
      /*overflow: hidden;*/
      /*text-overflow:ellipsis;*/
      /*font-weight: bold;*/
      /*!*display: flex;*!*/
      /*!*text-align: center;*!*/
      /*!*justify-content: center;*!*/
    /*}*/
  /*}*/
  /*.re_c{*/
    /*background-color: #fff;*/
    /*height: 4rem;*/
    /*padding: 0 .8rem;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*position: relative;*/
    /*.re_li{*/
      /*white-space:nowrap;*/
      /*overflow: hidden;*/
      /*text-overflow:ellipsis;*/
    /*}*/
    /*.btn_apply{*/
      /*width: 4rem;*/
      /*height: 1.8rem;*/
      /*line-height: 1.8rem;*/
      /*text-align: center;*/
      /*color: #29a1f7;*/
      /*border: 1px solid #29a1f7;*/
      /*border-radius: .9rem;*/
    /*}*/
  /*}*/
  .swiper-container{
    width: 100%;
    height: 1.4rem;
    .swiper-slide{
      text-align: center;
    }
  }
</style>
