<!--平台币明细-->
<template>
  <div class="platcoinInfo">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        平台币明细
      </div>
      <div class="head_right"></div>
    </div>
    <FlatDetail></FlatDetail>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import FlatDetail from '../detail/flatdetail/flatDetail.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {

      }
    },
    components: { FlatDetail },
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
  .platcoinInfo{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
  }
</style>
