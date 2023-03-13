<!--商品状态-->
<template>
  <div class="ProductStatus">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        交易记录
      </div>
      <div class="head_right"></div>
    </div>
    <div class="used-tab border_eee" v-active>
      <div class="flex1 tab-item">
        <a @click="component_name='Purchased'" class="active">已购买</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='Audit'">审核中</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='OnOffer'">出售中</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='BeSold'">已出售</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='Warehouse'">仓库中</a>
      </div>
    </div>
    <div class="ps_main">
      <keep-alive>	<!--缓存组件-->
        <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import Purchased from './purchased/purchased.vue' //已购买
  import Audit from './audit/audit.vue' //审核中
  import OnOffer from './onOffer/onOffer.vue' //出售中
  import BeSold from './beSold/beSold.vue' //已出售
  import Warehouse from './warehouse/warehouse.vue' //仓库中
  export default {
    name: 'no_keep',
    data: function () {
      return {
        component_name:'Purchased'
      }
    },
    components: { Purchased, Audit, OnOffer, BeSold, Warehouse },
    mounted(){
      this.$nextTick(function () {
//        this.handleSubmit();
      });
    },
    methods: {
      handleSubmit () {
        Toast({
          message: '只能查看最近7天的记录哦！',
          duration: 2000,
          className: 'm_toast'
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
  .ProductStatus{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    .ps_main{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
  }
</style>
