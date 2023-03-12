<!--交易登录-->
<template>
  <div class="login">
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        <span>交易登录</span>
      </div>
      <div class="head_right">
        <span @click="$router.push({path:'/tra_enroll'});">交易注册</span>
      </div>
    </div>
    <div class="login_main">
      <img src="../../../static/img/c_icon_denglutu-.png" alt="185sy" class="logo">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="text" placeholder="请输入手机号" v-model="username" ref="username" autofocus/>
            <i class="icon_clear" v-show="username" @click="username=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="请输入密码" v-model="pwd" ref="pwd"/>
            <i class="icon_clear" v-show="pwd" @click="pwd=''"></i>
            <p class="color_blue" @click="$router.push({path:'/tra_find_password'});">忘记密码？</p>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="登 录" @click="submit"/>
          </li>
        </ul>
      </form>
      <div class="center color_939393 small3">注：后续可用此手机号密码登录您所购买及绑定的所有账号</div>
    </div>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui';
  export default {
    name: 'no_keep',
    data: function () {
      return {
        username: '',
        pwd: ''
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
        var url = this.jointUrl({
          username: this.username,
          password: this.pwd,
          system: this.myType.system,
          machine_code: "",
          client: 2 //客户端 1为手机端 2为web端
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        //发起请求
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=login',{
          username: this.username,
          password: this.pwd,
          system: this.myType.system,
          machine_code: "",
          client: 2,
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
              console.log(datas)
//              document.cookie = "sy185_tra_user=" + encodeURIComponent(this.myType.sy185_tra_user_token) + ";path=/";
//              this.myType.setCookie('sy185_tra_user', this.myType.sy185_tra_user_token);
//              let data = escape(this.jointUrl(datas.data)); //处理明文
//              localStorage.setItem("sy185_tra_user", JSON.stringify(data));
//              this.$store.dispatch('getTraUser');

              this.myType.setCookie('sy185_tra_user_token', Base64.encode(this.myType.sy185_tra_user_token));
              let data = Base64.encode(JSON.stringify(datas.data)); //处理明文/
              localStorage.setItem("sy185_tra_user", data);
              this.$store.dispatch('getTraUser');
              console.log(this.$route.query.traRedirect)
              if(this.$route.query.traRedirect){
                this.$router.replace({path:this.$route.query.traRedirect});
              } else {
                this.$router.go(-1);
              }
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
  .login{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .login_main{
      flex: 1;
      .logo{
        width: 94%;
        margin: 3%;
      }
      .login_form{
        padding: 2rem 1.5rem;
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
          .findpwd{
            padding-right: 1rem;
            margin-right: 1rem;
            border-right: 2px solid #837f7e;
          }
        }
      }
    }
  }
</style>
