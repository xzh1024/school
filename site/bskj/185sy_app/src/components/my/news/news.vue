<!--消息管理-->
<template>
  <div class="news">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        消息管理
      </div>
      <div class="head_right"></div>
    </div>
    <div class="used-tab border_eee" v-active>
      <div class="flex1 tab-item">
        <a @click="component_name='SystemNews'" class="active">系统消息</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="component_name='CommentReply'">评论回复</a>
      </div>
    </div>
    <keep-alive>	<!--缓存组件-->
      <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
    </keep-alive>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import SystemNews from './systemnews/systemNews.vue'
  import CommentReply from './commentreply/commentReply.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        component_name:'SystemNews'
      }
    },
    components: { SystemNews, CommentReply },
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
  .news{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
  }
</style>
