<!--交易账号注册-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        交易注册
      </div>
      <div class="head_right"></div>
    </div>
    <div class="enroll_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="text" placeholder="请输入手机号" v-model="mobile" ref="mobile" v-focus/>
            <i class="icon_clear" v-show="mobile" @click="mobile=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_code"></i></p>
            <input class="input_center" type="text" placeholder="请输入验证码" v-model="code" ref="code"/>
            <i class="icon_clear" v-show="code" @click="code=''"></i>
            <p class="input_code" ref="getCode" v-text="codeTime" v-on:click="getCode" v-bind:style="{ color: codeColor}"></p>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="请输入密码" v-model="pwd" ref="pwd"/>
            <i class="icon_clear" v-show="pwd" @click="pwd=''"></i>
          </li>
          <li class="agreement">
            <!--<i class="icon_checked" v-if="agreement" @click="agreement = !agreement"></i>-->
            <!--<i class="icon_unchecked" v-else-if="!agreement" @click="agreement = !agreement"></i>-->
            <!--<span class="color_666666 m_l">我已经阅读并同意</span>-->
            <!--<span class="color_blue" @click="$router.push({path:'/agreement'});">《用户协议》</span>-->
            <p v-if="agreement" @click="agreement = !agreement">
              <i class="icon_checked"></i>
              <span class="color_666666 m_l">我已经阅读并同意</span>
              <span class="color_blue" @click="$router.push({path:'/agreement'});">《用户协议》</span>
            </p>
            <p v-else-if="!agreement" @click="agreement = !agreement">
              <i class="icon_unchecked"></i>
              <span class="color_666666 m_l">我已经阅读并同意</span>
              <span class="color_blue" @click="$router.push({path:'/agreement'});">《用户协议》</span>
            </p>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="注 册" @click="submit"/>
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
        mobile: '',
        code: '',
        codeFlag: true,
        enrollFlag: true,
        pwd: '',
        codeTime: '获取验证码',
        codeColor: '#29a1f7',
        agreement: true, //是否阅读用户协议
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
        {
          let mobile = this.$refs.mobile;
          if(!this.mobile){
            this.toast('请输入手机号');
            mobile.focus();
            return
          } else {
            let reg = /^1[0-9]{10}$/;
            let mobileNum = mobile.value;//手机号码
            let flag = reg.test(mobileNum); //true
            if(!flag){
              this.toast('手机号不正确');
              mobile.focus();
              return
            }
          }
        }
        if(!this.code){
          this.toast('请输入验证码');
          code.focus();
          return
        }
        {
          let pwd = this.$refs.pwd;
          if(!this.pwd){
            this.toast('请输入密码');
            pwd.focus();
            return
          }else if(this.pwd.length < 6){
            this.toast('密码至少6位');
            pwd.focus();
            return
          }
        }
        {
          if(!this.agreement){
            this.toast('请阅读用户协议');
            return
          }
        }
        this.indicator();//开启加载提示动画
        var url = this.jointUrl({
          code: this.code,
          mobile: this.mobile,
          password: this.pwd,
          system: this.myType.system,
          maker: '',
          mobile_model: '',
          machine_code: '',
          system_version: '',
          client: 2 //客户端 1为手机端 2为web端
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          code: this.code,
          mobile: this.mobile,
          password: this.pwd,
          system: this.myType.system,
          maker: '',
          mobile_model: '',
          machine_code: '',
          system_version: '',
          client: 2,
          sign: mySign
        });
        if(this.enrollFlag){
          this.enrollFlag = false;
          //交易账号注册
          this.$http.post('/api/index.php?g=api&m=businessplayer&a=register',myUrl)
            .then(response => {
              var datas = response.data;
              this.endIndicator();
              if(datas.status == 1){//1成功
                this.toast(datas.msg);
                this.$router.push({path:'/tra_login'});
              } else if(datas.status == 0){//0失败
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
      },
      getCode(){
        {
          let mobile = this.$refs.mobile;
          if(!this.mobile){
            this.toast(mobile.getAttribute('placeholder'));
            mobile.focus();
            return
          } else {
            let reg = /^1[0-9]{10}$/;
            let flag = reg.test(this.mobile); ///手机号码
            if(!flag){
              this.toast('手机号不正确');
              mobile.focus();
              return
            }
          }
        }
        if(this.codeFlag) {
          this.codeFlag = false
          var url = this.jointUrl({
            mobile: this.mobile,
            type: 1,  //1 交易注册 2 找回密码
            client: 2 //客户端 1为手机端 2为web端
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=businessplayer&a=send_message', {
            params:{
              mobile: this.mobile,
              type: 1,//1 交易注册 2 找回密码
              client: 2,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                this.toast('验证码已发送，请注意查收');
                {
                  let time = 60;
                  let timer = setInterval(() => {
                    if (time > 0) {
                      time--;
                      this.codeColor = '#bcbcbc';
                      this.codeTime = time + '秒后重试';
                    } else{
                      this.codeTime = '获取验证码';
                      this.codeColor = '#29a1f7';
                      this.codeFlag = true;
                      clearInterval(timer);
                    }
                  },1000);
                }
              }
              if(datas.status == 0){//0失败
                this.toast(datas.msg);
              }
            })
            .catch(error => {
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
        .agreement{
          display: flex;
          align-items: center;
          p{
            display: flex;
            align-items: center;
          }
        }
        .login_input{
          flex: 1;
          border: none;
          height: 2.2rem;
        }
      }
    }
  }
</style>
