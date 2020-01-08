<!--忘记密码-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        忘记密码
      </div>
      <div class="head_right"></div>
    </div>
    <div class="enroll_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="text" placeholder="请输入手机号" v-model="mobile" ref="mobile" v-on:keyup="valChange" v-focus/>
            <i class="icon_clear" v-show="mobile" @click="mobile=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_code"></i></p>
            <input class="input_center" type="text" placeholder="请输入验证码" v-model="code" v-on:keyup="valChange"/>
            <i class="icon_clear" v-show="code" @click="code=''"></i>
            <p class="input_code" ref="getCode" v-text="codeTime" v-on:click="getCode" v-bind:style="{ color: codeColor}"></p>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" v-bind:type="passwordType" placeholder="请输入密码" v-model="password" v-on:keyup="valChange"/>
            <i class="icon_clear" v-show="password" @click="password=''"></i>
            <i class="icon-eye-up" v-show="eyeFlag" @click="togglePasswordType"></i>
            <i class="icon-eye-down" v-show="!eyeFlag" @click="togglePasswordType"></i>
          </li>
          <li>
            <input class="m_t_1rem" type="button" value="完成" @click="submit" v-bind:class="{input_btn:!btnFlag, 'input_btn2':btnFlag}"/>
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
        code: '',
        password: '',
        passwordType: 'password',
        codeFlag: true,
        codeTime: '获取验证码',
//        codeColor:'#eb2000'
        codeColor:'#333',
        btnFlag: false,
        eyeFlag: false,
      }
    },
    created() {

		},
		mounted(){
			this.$nextTick(function () {

			});
		},
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
          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      submit(){
        if(this.btnFlag){
          this.indicator();//开启加载提示动画
          var url = this.jointUrl({
            mobile: this.mobile,
            code: this.code,
            password: this.password
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            mobile: this.mobile,
            code: this.code,
            password: this.password,
            sign: mySign
          });
          //发起请求
          this.$http.post('/api/index.php?g=api&m=userbox&a=modify_password',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas);
              this.endIndicator();
              if(datas.status == 1){//1成功
//                this.$router.push({path:'/newpwd/' + datas.data.id + '/' +datas.data.token});
                this.$router.go(-1);
              }
              if(datas.status == 0){//0失败
                this.toast(datas.msg);
              }
            })
            .catch(error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
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
        if(this.code.length != 6){
          this.btnFlag = false;
          return
        }
        if(this.password.length < 6 || this.password.length > 16){
          this.btnFlag = false;
          return
        }
        this.btnFlag = true;
      },
      //获取验证码
      getCode(){
        {
          let mobile = this.$refs.mobile;
          if(!this.mobile){
            this.toast(mobile.getAttribute('placeholder'));
            mobile.focus();
            return
          } else {
            let reg = /^1[0-9]{10}$/;
            let flag = reg.test(this.mobile); //true
            if(!flag){
              this.toast('手机号格式不正确');
              mobile.focus();
              return
            }
          }
        }
        if(this.codeFlag) {
          this.codeFlag = false;
          var url = this.jointUrl({
            mobile: this.mobile,
            type: 2,  //1 注册 2 其他
            appid: this.myType.appid
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=userbox&a=send_message', {
            params:{
              mobile: this.mobile,
              type: 2,  //1 注册 2 其他
              appid: this.myType.appid,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas);
              if(datas.status == 1){//1成功
                this.toast('验证码已发送，请注意查收');
                let time = 60;
                let timer = setInterval(() => {
                  if (time > 0) {
                    time--;
                    this.codeColor = '#bcbcbc';
                    this.codeTime = time + '秒后重试';
                  } else{
                    this.codeTime = '获取验证码';
//                      this.codeColor = '#eb2000';
                    this.codeColor = '#333';
                    this.codeFlag = true;
                    clearInterval(timer);
                  }
                },1000);
              } else if(datas.status == 0){//0失败
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
        .v_code{
          width: 100%;
          height: 3rem;
          margin-bottom: 1rem;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .import_code{
            /*flex: 1;*/
            width: 67%;
            height: 100%;
            border-bottom: 1px solid #eeeeee;
            /*border-radius: .2rem;*/
            display: flex;
            align-items: center;
            position: relative;
          }
          .get_code{
            white-space: nowrap;
            width: 29%;
            height: 100%;
            line-height: 100%;
            /*padding: 0 1rem;*/
            border-radius: .2rem;
            color: #fff;
            /*background-color: #ff7900;*/
            border: none;
            /*margin-left: .6rem;*/
            margin-left: 3%;
          }
        }
        .login_li{
          border: 1px solid #ddd;
          height: 3rem;
          margin-bottom: 1.2rem;
          border-radius: .2rem;
          display: flex;
          align-items: center;
          position: relative;

        }
        .login_input{
          flex: 1;
          border: none;
          height: 2.2rem;
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
      }
    }
  }
</style>
