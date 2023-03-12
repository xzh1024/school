<!--账号管理-->
<template>
  <div class="accountv">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        账号管理
      </div>
      <div class="head_right">
        <!--<span @click="$router.push({path:'/enroll'});">注册</span>-->
      </div>
    </div>
    <div class="accountv_main">
      <div class="accountv_title border_dcdcdc">当前登录账号</div>
      <div class="accountv_user border_dcdcdc">
        <img class="user_logo" :src="userInfo.icon_url"></img>
        <div class="user_data">
          <div class="user_name" v-text="userInfo.nick_name"></div>
          <div class="user_mobile">手机号：<span>{{ userData.mobile|mobile }}</span></div>
        </div>
      </div>
      <div class="a_list">
        <div class="op" @click="$router.push({path:pwdUrl});">
          <p class="op_t">修改密码</p>
          <i class="op_i"></i>
        </div>
        <div class="op" @click="$router.push({path:phoneUrl});">
          <p class="op_t">绑定手机</p>
          <i class="op_i"></i>
        </div>
      </div>
      <div class="footerNav">
        <div class="navBox" @click="$router.push({path:'/service'});">
          <i class="icon_feedback"></i>
          <span>意见反馈</span>
        </div>
        <div class="navBox" @click="openApp">
          <i class="icon_box"></i>
          <span>盒子客户端</span>
        </div>
        <div class="navBox" @click="outUser">
          <i class="icon_user2"></i>
          <span>退出登录</span>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
//  import { Toast } from 'mint-ui';
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        userData: {
          mobile: '', //未绑定手机为空字符串
        },
        username: '',
        pwd: ''
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      pwdUrl: function () { //账户管理
        return this.userInfo.id ? '/passwd' : '/login';
      },
      phoneUrl: function () { //账户管理
        let phoneUrl = '';
        if(this.userInfo.id){
          if(this.userData.mobile) {
            phoneUrl = '/untie_phone';
          } else {
            phoneUrl = '/bind_phone';
          }
        } else {
          phoneUrl = '/login';
        }
        return phoneUrl
      },
    },
    created() {
      this.getUserData();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
//      toast (msg) {
//        let msgs = msg || '提示';
//        Toast({
//          message: msgs,
//          position: 'bottom',
//          duration: 3000,
//          className: 'm_login_toast'
//        });
//      },
      getUserData() {
        //获取用户信息
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=user_center',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                this.userData = datas.data;
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      openApp(){
        var loadDateTime = new Date();
        setTimeout(function () {
          var timeOutDateTime = new Date();
          if (!loadDateTime || timeOutDateTime - loadDateTime < 1010) {
            window.location = 'http://www.185sy.com/box/';
          }
        },1000);
        window.location = 'sy185box://app.185sy.box/dynamic/details';
      },
      outUser() {
        //退出登录
        this.$http.post('/api/index.php?g=api&m=userbox&a=log_out')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
//              this.setToken(false);
              this.myType.delCookie('sy185_user_token');
              this.$store.dispatch('removeUser');

              this.$router.push({path:'/index/myMsg'});
//              window.location.reload(); //刷新整个页面
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    },
    directives: {//自定义指令
      focus: {
        // 指令的定义
        inserted: function (el) {//被绑定元素插入到DOM中时调用
          el.focus()
        }
      }
    },
    filters: {	//自定义局部过滤器
      mobile: (data) => {//过滤显示下载量
        return data ? data : '未绑定'
      }
    }
  }
</script>

<style scoped lang="less">
  .accountv{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .accountv_main{
      background-color: #f0f0f0;
      flex: 1;
      overflow-y: auto;
      .accountv_title{
        height: 2.6rem;
        line-height: 2.6rem;
        background-color: #fff;
        padding-left: .5rem;
      }
      .accountv_user{
        display: flex;
        align-items: center;
        background-color: #fff;
        .user_logo{
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          margin: 1.1rem 1rem;
        }
        .user_data{
          flex: 1;
          .user_name{

          }
          .user_mobile{
            margin-top: .2rem;
          }
        }
      }
      .a_list{
        .op{
          background-color: #fff;
          height: 3.4rem;
          padding: 0 .7rem;
          margin-bottom: 1px;
          display: flex;
          align-items: center;
          .op_t{
            flex: 1;
            font-size: 1.1rem;
          }
          .op_i{

          }
        }
        .op:active{ background-color: #e5e5e5;}
      }
      .footerNav{
        margin: 1rem .8rem 0;
        font-size: .85rem;
        display: flex;
        justify-content: space-between;
        .navBox{
          height: 2.5rem;
          background-color: #fff;
          width: 31%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .navBox:active{ background-color: #e5e5e5;}
      }


    }
  }
</style>
