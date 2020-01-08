<!--修改密码-->
<template>
  <div class="change_password">
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        <span>修改密码</span>
      </div>
      <div class="head_right"></div>
    </div>
    <div class="change_password_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="请输入旧密码" v-model="oldpwd" ref="username" autofocus/>
            <i class="icon_clear" v-show="oldpwd" @click="oldpwd=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="请输入新密码" v-model="newpwd" ref="pwd"/>
            <i class="icon_clear" v-show="newpwd" @click="newpwd=''"></i>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="提 交" @click="submit"/>
          </li>
        </ul>
      </form>
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
        oldpwd: '',
        newpwd: '',
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
    watch: {//使用watch 监听$router的变化
      traUserInfo(to, from) {
        console.log(to)
      }
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
      submit (){
        var inputs = document.querySelectorAll('.input input');
        for (let i = 0, len = inputs.length; i < len; i++) {
          if (!inputs[i].value) {
            this.toast(inputs[i].getAttribute('placeholder'));
            inputs[i].focus();
            return
          }
        }
        var oldpwd = this.$refs.oldpwd;
        var newpwd = this.$refs.newpwd;
        if(this.oldpwd.length < 6){
          this.toast('密码至少6位');
          oldpwd.focus();
          return
        }
        if(this.newpwd.length < 6){
          this.toast('密码至少6位');
          newpwd.focus();
          return
        }

        this.indicator();//开启加载提示动画
        var url = this.jointUrl({
          uid: this.traUserInfo.uid,
          password: this.oldpwd,
          newpassword: this.newpwd
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.traUserInfo.uid,
          password: this.oldpwd,
          newpassword: this.newpwd,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=modify_password',myUrl)
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 1){//1成功
              console.log(datas);
              this.toast(datas.msg);
              this.logout();  //退出登录
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
      logout(){
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=log_out')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.$store.dispatch('removeTraUser');
              this.$router.replace({path:'/tra_login',query:{traRedirect:'/tra_accounts'}});
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  /*input::-webkit-input-placeholder{ color:#bcbcbc;}*/
  /*input::-moz-placeholder{ color:#bcbcbc;}  !* Mozilla Firefox 19+ *!*/
  /*input:-moz-placeholder{ color:#bcbcbc;} !* Mozilla Firefox 4 to 18 *!*/
  /*input:-ms-input-placeholder{ color:#bcbcbc;} !* Internet Explorer 10-11 *!*/
  .change_password{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .change_password_main{
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
