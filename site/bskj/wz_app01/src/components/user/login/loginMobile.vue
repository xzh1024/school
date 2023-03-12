<!--登录-->
<template>
  <div class="login">
    <!--页头-->
    <!--<Head :head="head"></Head>-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        手机号
      </div>
      <div class="head_right">
        <!--<span @click="$router.push({path:'/enroll'});">注册</span>-->
      </div>
    </div>
    <!--<P>通过属性访问：{{ getUserInfo }}</p>-->
    <div class="login_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="number" placeholder="请输入手机号" v-model="mobile" v-on:keyup="mobileChange" ref="mobile" autofocus/>
            <i class="icon_clear" v-show="mobile" @click="mobile='';btnClass='input_btn';"></i>
          </li>
          <li>
            <input class="m_t_1rem" v-bind:class="btnClass" type="button" value="下一步" @click="loginNext"/>
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
        btnClass: 'input_btn',
        type: 2, //1 注册 2 其他
      }
    },
    created() {

    },
    mounted(){
      this.$nextTick(function () {
//        if(localStorage.getItem('sy185_user') != null){
//          let userData = JSON.parse(Base64.decode(localStorage.getItem('sy185_user')));
//          if(userData.username){
//            this.username = userData.username;
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
      mobileChange(){
          if(this.mobile.length === 11){
            let reg = /^1[0-9]{10}$/;
            let flag = reg.test(this.mobile); //true
            if(flag){
//              ajax()
              this.btnClass = 'input_btn2';
            } else {
              this.btnClass = 'input_btn';
            }
          } else {
            this.btnClass = 'input_btn';
          }
      },
      toast (msg) {
        msg = msg || '提示';
        Toast({
          message: msg,
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
      loginNext (){
//        var inputs = document.querySelectorAll('.input input');
//        for (let i = 0, len = inputs.length; i < len; i++) {
//          if (!inputs[i].value) {
//            this.toast(inputs[i].getAttribute('placeholder'));
//            inputs[i].focus();
//            return
//          }
//        }
//        if(this.mobile.length != 11){
//          this.toast('手机号长度为11个字符！');
//          return
//        }
        if(this.btnClass == 'input_btn2'){
          this.indicator();
          var url = this.jointUrl({
            mobile: this.mobile,
            type: this.type,
            appid: this.myType.appid
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            mobile: this.mobile,
            type: this.type,
            appid: this.myType.appid,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=userbox&a=send_message',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas);
              if(datas.status == 1){//1成功
                this.$router.push({path:'/login_verification_code/'+ this.mobile});
              }
              if(datas.status == 0){//0失败
                this.toast(datas.msg);
              }
              this.endIndicator();
            })
            .catch(error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
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
    .login_main{
      flex: 1;
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
