<template> <!--用户详情-->
	<div class="userInfo">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_white" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center color_white" v-text="title">
        <!--司机信息-->
      </div>
      <div class="head_right">
        <span class="color_white" @click="$router.push({path:'/edit'});" v-if="userInfo.id == $route.params.buid">编辑</span>
        <span class="color_white" @click="$router.push({path:'/edit_static/'+ $route.params.buid});" v-else-if="userInfo.id != $route.params.buid">更多</span>
      </div>
    </div>
    <div id="tabTop"></div>
    <div class="main" @scroll.passive="onScroll($event)">
      <div class="user_info color_fff" ref="userBox">
        <img v-lazy="userDesc.icon_url" alt="" class="user_logo">
        <div class="user_name">
          <span>昵称：<span v-text="userDesc.nick_name"></span></span>
          &nbsp;
          <i class="icon_men" v-if="userDesc.sex == 1"></i>
          <i class="icon_women" v-else-if="userDesc.sex == 2"></i>
          <i class="icon_vip" v-if="userDesc.vip == 1"></i>
        </div>
        <div class="user_index">
          <span>老司机指数：</span>
          &nbsp;
          <span v-if="userDesc.driver_level == 1">
            <i class="icon_lit"></i><i class="icon_dim"></i><i class="icon_dim"></i><i class="icon_dim"></i><i class="icon_dim"></i>
          </span>
          <span v-else-if="userDesc.driver_level == 2">
            <i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_dim"></i><i class="icon_dim"></i><i class="icon_dim"></i>
          </span>
          <span v-else-if="userDesc.driver_level == 3">
            <i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_dim"></i><i class="icon_dim"></i>
          </span>
          <span v-else-if="userDesc.driver_level == 4">
            <i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_dim"></i>
          </span>
          <span v-else-if="userDesc.driver_level == 5">
            <i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_lit"></i><i class="icon_lit"></i>
          </span>
          <span v-else>
            <i class="icon_dim"></i><i class="icon_dim"></i><i class="icon_dim"></i><i class="icon_dim"></i><i class="icon_dim"></i>
          </span>
        </div>
        <!--<div class="m_b_0_5rem small3">简介：键盘有始有终，你确切知道 88 个键就在那儿，错不了。</div>-->
        <div class="m_b_0_5rem small3">{{ userDesc.desc|F_desc }}</div>
      </div>
      <div id="tabCont">
        <div class="used-tab border_f0f0f0" v-active>
          <div class="flex1 tab-item">
            <a @click="component_name='DriveNum'" class="active">开车数</a>
          </div>
          <div class="flex1 tab-item">
            <a @click="component_name='Fans'">粉丝</a>
          </div>
          <div class="flex1 tab-item">
            <a @click="component_name='Focus'">关注</a>
          </div>
        </div>
      </div>
      <keep-alive>	<!--缓存组件-->
        <component :is="component_name"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
      </keep-alive>
    </div>
	</div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
	import DriveNum from './drivenum/driveNum.vue' //全部
  import Fans from './fans/fans.vue' //粉丝
  import Focus from './focus/focus.vue' //关注
  	export default {
      name: 'no_keep',
	    data: function () {
	      	return {
            tabTransitionName:'',
            userDesc:{},//用户信息
            component_name:'DriveNum',
            tabTop: '',
            tabCont: '',
            userBoxHeight: 0,
            tabFlag: true,
            title: ''
	      	}
	    },
	    components:{ DriveNum, Fans, Focus },
      computed: { //计算属性
        ...mapGetters([
          'userInfo'
        ]),
      },
      created(){
        this.getUserDesc();
        console.log(this.$route.params.buid)
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
      filters: {	//自定义局部过滤器
        F_desc: (data) => {//过滤显示下载量
          return data ? '简介：' + data : '';
        },
//        F_drive_num: (num) => {
//          return num > 0 ? '('+num+')' : '';
//        }
      },
      methods: {
        toast (msg) {
          var msg = msg || '';
          Toast({
            message: msg,
            duration: 2000,
            className: 'm_toast'
          });
        },
//        indicator (msg) {
//          var msg = msg || '加载中...';
//          Indicator.open({
//            text: msg,
//            spinnerType: 'fading-circle'
//          })
//        },
//        endIndicator () {
//          Indicator.close();
//        },
        onScroll(e){
          if(this.tabTop){
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var scrollTop = target.scrollTop;
//            console.log(scrollTop)
            if(scrollTop >= this.userBoxHeight) {
              if(this.tabFlag) {
                let newTab = document.querySelector('#tabCont>.used-tab');
                this.tabTop.appendChild(newTab);
                this.title = '司机信息';
                this.tabTop.style.display = "block";
                this.tabFlag = false;
              }
            } else {
              if(!this.tabFlag) {
                let newTab = document.querySelector('#tabTop>.used-tab');
                this.tabCont.appendChild(newTab);
                this.title = '';
                this.tabTop.style.display = "none";
                this.tabFlag = true;
              }
            }
          } else {
            this.tabTop = document.getElementById('tabTop');
            this.tabCont = document.getElementById('tabCont');
            this.userBoxHeight = this.$refs.userBox.offsetHeight;
            console.log('userBox:'+this.userBoxHeight);
          }
        },
        //获取用户详情
        getUserDesc(){
          console.log(this.$route.params.buid)
          var url = this.jointUrl({
            uid: this.$route.params.buid,
            visit_uid: this.userInfo.id,
            channel: this.myType.channel,
            field_type: 2 //1 精简版 2用户详情页版
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.$route.params.buid,
            visit_uid: this.userInfo.id,
            channel: this.myType.channel,
            field_type: 2,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=userbox&a=user_desc',myUrl)
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                this.userDesc = datas.data;
                console.log(this.userDesc)
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        },
      }
  	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .userInfo{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .head{
      background-color: #1e81d2;
    }
    .main{
      flex: 1;
      /*overflow-y: auto;*/
      display: flex;
      flex-direction: column;
      #tabTop{
        width: 100%;
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
      }
      #tabCont{
        /*height: 2.9rem;*/
      }
    }
    .user_info{
      background-color: #1e81d2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 .6rem;
      .user_logo{
        display: inline-block;
        width: 4rem;
        height: 4rem;
        border-radius: 50% 50%;
        border: 1px solid #fff;
        margin-bottom: .9rem;
      }
      .user_name,.user_index{
        line-height: 1rem;
        margin-bottom: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .user_name{
        margin-bottom: .2rem;
      }
    }
  }
</style>

