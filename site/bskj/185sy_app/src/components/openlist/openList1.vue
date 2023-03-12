<!--游戏-->
<template>
  <div class="openList">
    <div class="used-tab border_eee" v-active>
      <div class="tab-item">
        <a @click="component_name='OpenListBT'" class="active">BT版</a>
      </div>
      <div class="tab-item">
        <a @click="component_name='OpenListDIS'">折扣</a>
      </div>
    </div>
    <keep-alive>
      <component :is="component_name"></component>
    </keep-alive>
  </div>
</template>
<script>
  import OpenListBT from './BT/openListBT.vue'
  import OpenListDIS from './DIS/openListDIS.vue'
  export default {
    data: function () {
      return {
        newTab: 1,//标记tab的状态
        component_name: 'OpenListBT'
      }
    },
    created() {

    },
    components:{ OpenListBT, OpenListDIS },
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
  .openList{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .used-tab {
      .tab-item {
        padding: 0 1.5rem;
      }
    }
  }
</style>
