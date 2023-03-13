<template> <!--开车-->
	<div class="drive">
    <i class="icon_drive" @click="driveGo"></i>
    <div class="head border_eee">
      <div class="head_left">
        <!--<a class="icon_left_black" @click="$router.go(-1);"></a>-->
      </div>
      <div class="head_center">
        开车
      </div>
      <div class="head_right">
        <span @click="$router.push({path:'/thru'});">穿越</span>
      </div>
    </div>
    <div class="used-tab border_eee" v-active>
      <div class="flex1 tab-item">
        <a @click="component_name='All'" class="active">全部</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='Hot'">热门</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='Concern'">关注</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='My'">我的</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='Message'">消息</a>
      </div>
    </div>
    <keep-alive>	<!--缓存组件-->
      <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    </keep-alive>
		<!--<mainTab :newTab="newTab"></mainTab>-->
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import All from './all/all.vue' //全部
  import Hot from './hot/hot.vue' //热门
  import Concern from './concern/concern.vue' //关注
  import My from './myMsg/myMsg.vue' //我的
  import Message from './message/message.vue' //消息

  export default {
    name: 'no_keep',
    data(){
      return {
        component_name:'All',
      }
    },
    components:{ All, Hot, Concern, My, Message },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created(){
//      this.getUser();
//      console.log(this.$store.getters.userInfo.id)
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
    },
    methods: {
      driveGo(){
        if(this.userInfo.id){
          this.$router.push({path:'/drive_go'});
        } else {
          this.$router.push({path:'/login'});
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .drive{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

