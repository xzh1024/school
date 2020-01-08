<!--登录-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        用户名注册
      </div>
      <div class="head_right">
        <span @click="$router.push({path:'/enroll'});">手机号注册</span>
      </div>
    </div>
    <div class="enroll_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_user"></i></p>
            <input class="input_center" type="text" placeholder="请输入用户名" v-model="username" ref="username" v-focus/>
            <i class="icon_clear" v-show="username" @click="username=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="请输入密码" v-model="pwd" id="password" ref="pwd"/>
            <i class="icon_clear" v-show="pwd" @click="pwd=''"></i>
          </li>
          <li class="agreement">
            <i class="icon_checked" v-show="agreement" @click="agreement = false;"></i>
            <i class="icon_unchecked" v-show="!agreement" @click="agreement = true;"></i>
            <span class="color_666666 m_l">我已经阅读并同意</span>
            <span class="color_red" @click="$router.push({path:'/agreement'});">《用户协议》</span>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="注 册" @click="submit"/>
          </li>
          <!--<li><p class="enroll_way color_837f7e f_s1" @click="$router.push({path:'enroll'});">手机号注册</p></li>-->
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
        username: '',
        pwd: '',
        enrollFlag: true,
        agreement: true,
      }
    },
    created() {

		},
		mounted(){
			this.$nextTick(function () {

			});
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
          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      submit(){
        var inputs = document.querySelectorAll('.login_li input');
        for (let i = 0, len = inputs.length; i < len; i++) {
          if (!inputs[i].value) {
            this.toast(inputs[i].getAttribute('placeholder'));
            inputs[i].focus();
            return
          }
        }
        var username =this.$refs.username;
        var pwd = this.$refs.pwd;
        if(username.value.length < 6 || username.value.length > 16){
          this.toast('用户名长度为6-16个字符！');
          username.focus();
          return
        }
        if(pwd.value.length < 6){
          this.toast('密码至少6位');
          pwd.focus();
          return
        }
        {
          if(!this.agreement){
            this.toast('请阅读用户协议');
            return
          }
        }
        this.indicator();//开启加载提示动画
        var url = this.jointUrl({
          username: this.username,
          code: '',
          mobile: '',
          password: this.pwd,
          channel: this.myType.channel,
          system: this.myType.system,
          maker: '',
          mobile_model: '',
          machine_code: '',
          system_version: '',
          type: 1
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          username: this.username,
          code: '',
          mobile: '',
          password: this.pwd,
          channel: this.myType.channel,
          system: this.myType.system,
          maker: '',
          mobile_model: '',
          machine_code: '',
          system_version: '',
          type: 1,
          is_web: 1,
          sign: mySign
        });
        if(this.enrollFlag){
          this.enrollFlag = false;
          //用户注册
          this.$http.post('/api/index.php?g=api&m=userbox&a=register',myUrl)
            .then(response => {
              var datas = response.data;
              this.endIndicator();
              if(datas.status == 1){//1成功
                this.$router.push({path:'/login'});
              }
              if(datas.status == 0){//0失败
                this.toast(datas.msg);
              }
              this.enrollFlag = true;
            })
            .catch(error => {
              this.endIndicator();
              this.enrollFlag = true;
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }

      }
    },
    directives: {//自定义指令
      focus: {
        // 指令的定义
        inserted: function (el) {//被绑定元素插入到DOM中时调用
          el.focus()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .enroll{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .enroll_main{
      flex: 1;
      .login_form{
        margin: 2rem 1.5rem;
        .login_li{
          border: 1px solid #ddd;
          height: 3rem;
          /*line-height: 3rem;*/
          margin-bottom: 1.2rem;
          border-radius: .2rem;
          display: flex;
          align-items: center;
          position: relative;
          .login_input{
            flex: 1;
            border: none;
            height: 2.2rem;
          }
        }
        .agreement{
          display: flex;
          align-items: center;
          p{
            display: flex;
            align-items: center;
          }
        }
        .login_btn{
          margin-top: .8rem;
          width: 100%;
          height: 3.2rem;
          line-height: 3.2rem;
          color: #fff;
          background-color: #ff7900;
          border: 1px solid #ff7900;
          border-radius: .2rem;
          text-align: center;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        }
        .enroll_way{
          margin-top: 1rem;
        }
      }
    }
  }
</style>
