<!--添加关联账号-->
<template>
  <div class="bind_sdk">
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        <span>添加关联账号</span>
      </div>
      <div class="head_right"></div>
    </div>
    <div class="bind_sdk_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="text" placeholder="请输入要关联的账号的用户名" v-model="username" ref="username" autofocus/>
            <i class="icon_clear" v-show="username" @click="username=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="请输入要关联的账号的密码" v-model="password" ref="password"/>
            <i class="icon_clear" v-show="password" @click="password=''"></i>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="关 联" @click="bindSdkuser"/>
          </li>
        </ul>
      </form>
      <div class="center color_939393 small3">注：后续可用此手机号密码登录您所购买及绑定的所有账号</div>
    </div>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        username: '',
        password: ''
      }
    },
    created() {

    },
    mounted(){
      this.$nextTick(function () {
          console.log(this.traUserInfo)
      });
    },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ]),
    },
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
      bindSdkuser (){
        var inputs = document.querySelectorAll('.input input');
        for (let i = 0, len = inputs.length; i < len; i++) {
          if (!inputs[i].value) {
            this.toast(inputs[i].getAttribute('placeholder'));
            inputs[i].focus();
            return
          }
        }
        var username = this.$refs.username;
        var password = this.$refs.password;
        if(this.username.length < 6 || this.username.length > 16){
          this.toast('用户名长度为6-16个字符！');
          username.focus();
          return
        }
        if(this.password.length < 6){
          this.toast('密码至少6位');
          password.focus();
          return
        }

        this.indicator();//开启加载提示动画
        let url = this.jointUrl({
          uid: this.traUserInfo.uid,
          sdk_username: this.username,
          sdk_password: this.password
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          uid: this.traUserInfo.uid,
          sdk_username: this.username,
          sdk_password: this.password,
          sign: mySign
        });
        //关联SDK账号
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=bind_sdkuser',myUrl)
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 1){//1成功
              this.toast('关联成功');
              this.$router.push({path:'/tra_accounts'})
            } else if(datas.status == 0){//0失败
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
  .bind_sdk{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .bind_sdk_main{
      flex: 1;
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
