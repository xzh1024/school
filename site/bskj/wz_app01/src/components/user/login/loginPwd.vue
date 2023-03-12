<!--登录-->
<template>
  <div class="login">
    <!--页头-->
    <!--<Head :head="head"></Head>-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        <!--登录-->
      </div>
      <div class="head_right">
        <!--<span @click="$router.push({path:'/enroll'});">注册</span>-->
      </div>
    </div>
    <!--<P>通过属性访问：{{ getUserInfo }}</p>-->
    <div class="login_main">
      <div class="app">
        <img class="app-logo" src="../../../static/img/wz/a_icon_wan.png" alt="185sy">
        <p class="app-name">玩转游戏</p>
      </div>
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="number" placeholder="请输入手机号" v-model="mobile" ref="mobile" v-on:keyup="valChange" autofocus/>
            <i class="icon_clear" v-show="mobile" @click="mobile=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" v-bind:type="passwordType" placeholder="请输入密码" v-model="password" ref="password" v-on:keyup="valChange"/>
            <i class="icon_clear" v-show="password" @click="password=''"></i>
            <!--<p class="color_red" @click="$router.push({path:'/findpwd'});">忘记密码？</p>-->
            <i class="icon-eye-up" v-show="eyeFlag" @click="togglePasswordType"></i>
            <i class="icon-eye-down" v-show="!eyeFlag" @click="togglePasswordType"></i>
          </li>
          <li class="login_operation color_blue">
            <span class="findpwd flex1" @click="$router.push({path:'/findpwd'});">忘记密码</span>
            <span @click="$router.push({path:'/login_mobile'});">短信验证码登录</span>
          </li>
          <li>
            <input class="m_t_1rem" type="button" value="登 录" v-bind:class="{input_btn:!btnFlag, 'input_btn2':btnFlag}" @click="submit"/>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui';
  export default {
    name: 'no_keep',
    data: function () {
      return {
        mobile: '',
        password: '',
        passwordType: 'password',
        eyeFlag: false,
        btnFlag: false,
        submitFlag: false,
        type: 1, //1 密码登陆 2 短信验证码登陆 3 临时密码登陆
      }
    },
    created() {

    },
    mounted(){
      this.$nextTick(function () {
//        if(localStorage.getItem('sy185_user') != null){
//          let userData = JSON.parse(Base64.decode(localStorage.getItem('sy185_user')));
//          if(userData.mobile){
//            this.mobile = userData.mobile;
//          }
//        }
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
      togglePasswordType(){
        this.eyeFlag = !this.eyeFlag;
        if(this.passwordType == 'password'){
          this.passwordType = 'text';
        } else {
          this.passwordType = 'password';
        }
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
      valChange(){
        if(!this.mobile){
          this.btnFlag = false;
          return
        } else {
          let reg = /^1[0-9]{10}$/;
          let flag = reg.test(this.mobile);
          if(!flag){
            this.btnFlag = false;
            return
          }
        }
        if(this.password.length < 6 || this.password.length > 16){
          this.btnFlag = false;
          return
        }
        this.btnFlag = true;
      },
      submit (){
        if(this.btnFlag){
          if(!this.submitFlag){
            this.submitFlag = true;
            this.indicator();//开启加载提示动画
            var url = this.jointUrl({
              mobile: this.mobile,
              password: this.password,
              system: this.myType.system,
              machine_code: this.myType.machineCode,
              type: this.type
            });
            var mySign = md5(url + this.myType.key1).toLowerCase();
            var myUrl = this.jointUrl({
              mobile: this.mobile,
              password: this.password,
              system: this.myType.system,
              machine_code: this.myType.machineCode,
              type: this.type,
              sign: mySign
            });
            this.$http.post('/api/index.php?g=api&m=userbox&a=mobile_login',myUrl)
              .then(response => {
                var datas = response.data;
                console.log(datas);
                if(datas.status == 1){//1成功
                  this.$store.dispatch('getUser',datas.data);
                  this.$router.push({path: '/index/my'});
//                  this.$router.go(-1);
                }
                if(datas.status == 0){//0失败
                  this.toast(datas.msg);
                }
                this.endIndicator();
                this.submitFlag = false;
              })
              .catch(error => {
                this.endIndicator();
                this.submitFlag = false;
                console.log('请求失败：' + error.status + '，' + error.statusText);
              });
          }
        }
      },
    }
  }
</script>

<style scoped lang="less">
  /*input::-webkit-input-placeholder{ color:#bcbcbc;}*/
  /*input::-moz-placeholder{ color:#bcbcbc;}  !* Mozilla Firefox 19+ *!*/
  /*input:-moz-placeholder{ color:#bcbcbc;} !* Mozilla Firefox 4 to 18 *!*/
  /*input:-ms-input-placeholder{ color:#bcbcbc;} !* Internet Explorer 10-11 *!*/
  .login{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    background: url("../../../static/img/wz/a_icon_beijingtu.png") no-repeat;
    background-size: 100% 100%;
    .head{
      position: fixed;
      top: 0;
      left: 0;
    }
    .login_main{
      /*flex: 1;*/
      width: 90%;
      background-color: #ffffff;
      position: relative;
      border-radius: .5rem;
      box-shadow: 0 0 8px 3px rgba(100, 100, 100, 0.1);
      .app{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
        .app-logo{
          /*display: block;*/
          width: 5.5rem;
          height: 5.5rem;
          border-radius: .5rem;
          /*margin: 2rem auto;*/
        }
        .app-name{
          font-size: 1.4rem;
          font-weight: bold;
        }
      }
      .login_form{
        padding: 5rem 1.5rem;
        .input{
          border-bottom: 1px solid #eee;
          height: 3rem;
          /*line-height: 3rem;*/
          margin-bottom: 1.2rem;
          /*border-radius: .2rem;*/
          display: flex;
          align-items: center;
          position: relative;
          .input_left{
            width: 2.4rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .input_center{
            flex: 1;
            border: none;
            height: 2.2rem;
          }
        }

        .login_btn{
          font-size: 1.2rem;
          /*margin-top: .8rem;*/
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          color: #fff;
          background-color: #29a1f7;
          border: none;
          border-radius: 1.5rem;
          text-align: center;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        }
        .login_operation{
          margin-top: 1.7rem;
          display: flex;
          justify-content: center;
          height: 1.2rem;
          line-height: 1.2rem;
          /*.findpwd{*/
          /*padding-right: 1rem;*/
          /*margin-right: 1rem;*/
          /*border-right: 2px solid #837f7e;*/
          /*}*/
        }
      }
    }
  }
</style>
