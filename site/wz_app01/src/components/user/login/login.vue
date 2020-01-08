<!--登录-->
<template>
  <div class="container">
    <!--页头-->
    <!--<Head :head="head"></Head>-->
    <div class="head">
      <div class="head_left">
        <!--<a class="icon_left_black" @click="$router.go(-1);"></a>-->
      </div>
      <div class="head_center">
        <!--登录-->
      </div>
      <div class="head_right">
        <i class="icon_clear" @click="$router.go(-1);"></i>
      </div>
    </div>
    <!--<P>通过属性访问：{{ getUserInfo }}</p>-->
    <div class="login_main">
      <div class="logo">
        <img src="../../../static/img/wz/login/g_icon_beiyingtu-.png">
      </div>
      <!--<div class="slogan">-->
        <!--<img src="../../../static/img/wz/login/c_icon_wenzi.png" style="width: 100%;">-->
      <!--</div>-->
      <div class="btns">
        <div class="input_btn2" @click="$router.push({path:'/enroll_invite_code'});">注册</div>
        <div class="btn-login-list">
          <div class="btn-login" @click="$router.push({path:'/login_pwd'});">
            <i class="icon-mobile-o"></i>
            <span>手机登录</span>
          </div>
          <div class="btn-login" @click="upWechat">
            <i class="icon-weixin-o"></i>
            <span>微信登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  export default {
    name: 'no_keep',
    data: function () {
      return {
        username: '',
        pwd: '',
        passwordType: 'password'
      }
    },
    created() {

    },
    mounted(){
      this.$nextTick(function () {

      });
    },
//    computed:{
//      todos () {  //通过方法访问
//        return this.$store.getters.doneTodos;
//      },
//      doneTodosCount () {
//        return this.$store.getters.doneTodosCount
//      }
//    },
    methods: {
      upWechat(){
        if(false){

        } else {
          this.messageBox();
        }
      },
      messageBox() {
        MessageBox.confirm('',{
          message: '你还没有注册或者未绑定微信哦！',
          title: '提示',
          confirmButtonText: '立即注册',
          confirmButtonClass: 'mint-msgbox-confirm-red',
          cancelButtonText: '知道了',
          cancelButtonClass: 'mint-msgbox-cancel-blue'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            console.log(1);
            this.$router.push({path:'/fill_code'});
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
        });
      },
      toast (msg) {
        let msgs = msg || '提示';
        Toast({
          message: msgs,
          duration: 2000,
          className: 'm_toast'
        });
      },
      indicator () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      submit (){
        var inputs = document.querySelectorAll('.input input');
        for (let i = 0, len = inputs.length; i < len; i++) {
          if (!inputs[i].value) {
            this.toast(inputs[i].getAttribute('placeholder'));
            inputs[i].focus();
            return
          }
        }
        var username = this.$refs.username;
        var pwd = this.$refs.pwd;
        if(this.username.length < 6 || this.username.length > 16){
          this.toast('用户名长度为6-16个字符！');
          username.focus();
          return
        }
        if(this.pwd.length < 6){
          this.toast('密码至少6位');
          pwd.focus();
          return
        }

        this.indicator();//开启加载提示动画
//        var mySign = md5('username=' + this.username + '&password=' + this.pwd + '&channel=' + this.myType.channel + '&system=' + this.myType.system + '&machine_code=' + this.myType.key1).toLowerCase();
        var url = this.jointUrl({
          username: this.username,
          password: this.pwd,
          channel: this.myType.channel,
          system: this.myType.system,
          machine_code: ""
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        //发起请求
        this.$http.post('/api/index.php?g=api&m=userbox&a=login',{
          username: this.username,
          password: this.pwd,
          channel: this.myType.channel,
          system: this.myType.system,
          machine_code: "",
          is_web: 1,
          sign: mySign
        },{
          transformRequest:[
            function (data) {
              let params = '';
              for(let index in data){
                params += index + '=' + data[index] + '&';
              }
              params = params.replace(/&{1}$/,'');
              return params;
            }
          ]
        })
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 1){//1成功
              console.log(datas.data);
              this.$store.dispatch('getUser');
//              console.log(this.$store);
//              console.log(this.$route.query.redirect);
              if(this.$route.query.redirect){
                this.$router.replace({path:this.$route.query.redirect});
              } else {
                this.$router.go(-1);
              }
//              window.location.reload(); //刷新整个页面
            }
            if(datas.status == 0){//0失败
              this.toast(datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<style scoped lang="less">
  /*input::-webkit-input-placeholder{ color:#bcbcbc;}*/
  /*input::-moz-placeholder{ color:#bcbcbc;}  !* Mozilla Firefox 19+ *!*/
  /*input:-moz-placeholder{ color:#bcbcbc;} !* Mozilla Firefox 4 to 18 *!*/
  /*input:-ms-input-placeholder{ color:#bcbcbc;} !* Internet Explorer 10-11 *!*/
  .container{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    background: url("../../../static/img/wz/d_icon_beijintu.png") no-repeat;
    background-size: 100% 100%;
    .logo{
      img{ width: 100%;}
    }
    /*.slogan{*/
      /*width: 70%;*/
      /*margin: 0 auto;*/
    /*}*/
    .btns{
      margin: 0 2rem;
      .input_btn2{
        margin-top: 2rem;
        font-size: 1.1rem;
      }
      .btn-login-list{
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn-login{
          display: flex;
          align-items: center;
          background-color: #f0f0f0;
          height: 3rem;
          border-radius: 1.5rem;
          padding: 0 1rem;
          color: #777777;
          font-size: 1.1rem;
          /*i{*/
            /*display: inline-block;*/
            /*width: 2rem;*/
            /*height: 2rem;*/
            /*border-radius: 50% 50%;*/
            /*background: url("../../../static/img/33_icon_weixin.png") no-repeat;*/
            /*background-size: 100% 100%;*/
          /*}*/
          span{
            margin-left: 1rem;
            margin-right: .5rem;
          }
        }
      }
    }
  }
</style>
