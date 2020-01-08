<template> <!--开服表-->
	<div class="openList">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        开服表
      </div>
      <div class="head_right"></div>
    </div>
    <div class="used-tab border_eee" v-active>
      <div class="tab-item flex1">
        <a @click="component_name='TodayOpen'" class="active">今日开服</a>
      </div>
      <div class="tab-item flex1">
        <a @click="component_name='FutureOpen'">即将开服</a>
      </div>
      <div class="tab-item flex1">
        <a @click="component_name='PastOpen'">已开新服</a>
      </div>
    </div>
    <keep-alive>	<!--缓存组件-->
      <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    </keep-alive>
	</div>
</template>

<script>
	import TodayOpen from './todayopen/todayOpen.vue' //今日开服
  import FutureOpen from './futureopen/futureOpen.vue' //即将开服
  import PastOpen from './pastopen/pastOpen.vue' //已开新服
  	export default {
      name: 'no_keep',
	    data: function () {
	      	return {
            component_name:'TodayOpen'
	      	}
	    },
	    components:{ TodayOpen, FutureOpen, PastOpen },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .openList{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

