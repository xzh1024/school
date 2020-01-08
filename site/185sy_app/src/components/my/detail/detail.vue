<!--货币明细-->
<template>
  <div class="detail">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        货币明细
      </div>
      <div class="head_right"></div>
    </div>
    <div class="used-tab border_bdbdbb" v-active>
      <div class="flex1 tab-item">
        <a @click="component_name='GoldDetail'" class="active">金币明细</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='FlatDetail'">平台币明细</a>
      </div>
    </div>
    <keep-alive>	<!--缓存组件-->
      <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    </keep-alive>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import GoldDetail from './golddetail/goldDetail.vue'
  import FlatDetail from './flatdetail/flatDetail.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        component_name:'GoldDetail'
      }
    },
    components: { GoldDetail, FlatDetail },
		mounted(){
			this.$nextTick(function () {
        this.handleSubmit();
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
          var el = el || window.event;
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
  .detail{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
