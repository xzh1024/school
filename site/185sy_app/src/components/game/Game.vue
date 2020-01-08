<!--游戏-->
<template>
  <div class="Game">
    <i class="icon_task" @click="$router.push({path:'/task'});"></i>
    <!--<Header></Header>-->
    <div class="used-tab border_eee" v-active>
      <div class="tab-item">
        <a @click="component_name='BT'" class="active">BT版</a>
      </div>
      <div class="tab-item">
        <a @click="component_name='DIS'">折扣</a>
      </div>
      <!--<div class="tab-item">-->
        <!--<a @click="component_name='H5'">H5</a>-->
      <!--</div>-->
      <div class="tab-item">
        <a @click="component_name='Promise'">承诺</a>
      </div>
      <!--<div class="tab-item">-->
      	<!--<a @click="component_name='NewGame'">新游</a>-->
      <!--</div>-->
      <!--<div class="tab-item">-->
      	<!--<a @click="component_name='Hot'">热门</a>-->
      <!--</div>-->
      <!--<div class="tab-item">-->
      	<!--<a @click="component_name='ClassIfy'">分类</a>-->
      <!--</div>-->
      <div class="flex1">
        <i class="icon_xinxi" @click="$router.push({path:'/news'});"></i>
      </div>
    </div>
    <keep-alive>	<!--缓存组件-->
      <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    </keep-alive>
  </div>
</template>
<script>
  import BT from './BT/BT.vue'//BT
  import DIS from './DIS/DIS.vue'//折扣
//  import H5 from './H5/H5.vue'//H5
  import Promise from './promise/promise.vue'//承诺
  export default {
  	data: function () {
      return {
      		newTab: 0,//标记tab的状态
					component_name:'BT'
      }
    },
    created() {

		},
    components:{ BT, DIS, Promise },
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
  .Game{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .used-tab{
      align-items: center;
      .tab-item{
        padding: 0 1rem;
      }
      .flex1{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
