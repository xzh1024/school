<!--申请转游-->
<template>
  <div class="turn">
    <!--页头-->
    <!--<div class="head">-->
      <!--<a class="icon_left" @click="goRouter"></a>-->
      <!--转游申请-->
      <!--<a class="icon_ask" @click="$router.push({path:'turn_know'});"></a>-->
    <!--</div>-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        转游申请
      </div>
      <div class="head_right"><i class="icon_ask" @click="$router.push({path:'/turn_know'});"></i></div>
    </div>
    <div class="hint">
      <span class="small3 color_ff7900">*申请转游请先点右上角查看转游帮助或者联系客服</span>
    </div>
    <div class="used-tab border_bdbdbb" v-active>
      <div class="flex1 tab-item">
        <a @click="componentName='TurnApply'" class="active">转游申请</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="componentName='TurnRecord'" ref="record">转游记录</a>
      </div>
    </div>
    <keep-alive>	<!--缓存组件-->
      <component :is="componentName"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    </keep-alive>
	</div>
</template>
<script>
  import TurnApply from './turnapply/turnApply.vue'
  import TurnRecord from './turnrecord/turnRecord.vue'
  export default {
  	data: function () {
      return {
        componentName:'TurnApply'
      }
    },
    created() {
//      this.head.title = this.$route.params.name;
		},
    components: { TurnApply, TurnRecord },
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {

			});
		},
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      setComponentName(arg){
        this.componentName = arg;
        this.$refs.record.click();
      }
    },
    directives: {//自定义指令
      active: {
        // 指令的定义
        inserted: function (el) {
          var el = el || window.event;
          el.onclick = function(e) {
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
  .turn{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .hint{
      background-color: #f0f0f0;
      height: 1.8rem;
      line-height: 1.8rem;
      text-align: center;
    }
  }
</style>
