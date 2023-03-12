<template>
  <div class="container">
    <Header title="修改密码">
      <div slot="left">
        <span class="icon-left" @click="$router.go(-1);"></span>
      </div>
    </Header>
    <div class="main">
      <div class="form">
        <Field class="field"
               :placeholder="'请输入手机号'"
               :value="filtersMobile"
               ref="mobile"
               :disabled="true"
               @input="filtersMobile = $event; inputChange()">
          <div slot="left" class="slot-left"><span class="icon-mobile"></span></div>
        </Field>
        <Field class="field"
               :placeholder="'请输入验证码'"
               :value="code"
               @input="code = $event; inputChange()">
          <!--@update="updateCode"-->
          <div slot="left" class="slot-left"><span class="icon-code"></span></div>
          <div slot="right" class="slot-right">
            <div class="input-code" ref="getCode" v-text="codeText" v-on:click="getCode" v-bind:class="codeClass"></div>
          </div>
        </Field>
        <Field class="field"
               :type="'password'"
               :placeholder="'请输入6-16位密码'"
               :value="password"
               @input="password = $event; inputChange()">
          <!--@update="updatePassword"-->
          <div slot="left" class="slot-left"><span class="icon-password"></span></div>
        </Field>
        <input class="input-btn" type="button" value="提交" @click="submit" v-bind:class="{'input-btn-red':btnFlag}"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Toast, Indicator } from 'mint-ui';
  import Header from '@/components/header'
  import Field from '@/components/field'
export default {
  data () {
    return {
      mobile: '',
      filtersMobile: '',
      code: '',
      password: '',

//      passwordType: 'password',
      codeFlag: true,
      codeText: '获取验证码',
      codeClass: '',
      btnFlag: false,
      eyeFlag: false,
    }
  },
  components:{ Header, Field },
  created(){
    this.mobile = this.userData.mobile;
    this.filtersMobile = this.userData.mobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
  },
  computed: { //计算属性
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
//    updateMobile(value){
//      this.mobile = value;
//      console.log(this.mobile)
//    },
    updateCode(value){
      this.code = value;
//      console.log(this.code)
      this.inputChange();
    },
    updatePassword(value){
      this.password = value;
//      console.log(this.password)
      this.inputChange();
    },


//    togglePasswordType(){
//      this.eyeFlag = !this.eyeFlag;
//      if(this.passwordType == 'password'){
//        this.passwordType = 'text';
//      } else {
//        this.passwordType = 'password';
//      }
//    },
    toast (msg) {
      Toast({
        message: msg || 'Error',
        duration: 2000,
//        className: 'm_toast'
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

        let options = {
          mobile: this.mobile,
          code: this.code,
          password: this.password,
          appid: this.userData.appid
        };
        options.sign = this.util.getSign(options, this.userData.appkey);
        let params = this.util.jointUrl(options);
        this.$http.post('/api/index.php?g=api&m=userbox&a=modify_password',params)
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 1){
//                this.$router.push({path:'/newpwd/' + datas.data.id + '/' +datas.data.token});
              this.$router.go(-1);
            } else if(datas.msg) {
              this.toast(datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error);
          });
      }
    },
    inputChange(){
        console.log(this.filtersMobile);
        console.log(this.code);
        console.log(this.password);
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

        let options = {
          mobile: this.mobile,
          type: 2,  //1 注册 2 其他
          appid: this.userData.appid
        };
        options.sign = this.util.getSign(options, this.userData.appkey);
        let params = this.util.jointUrl(options);
        this.axios.post('/api/index.php?g=api&m=userbox&a=send_message',params)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.toast('验证码已发送，请注意查收');
              let time = 60;
              let timer = setInterval(() => {
                if (time > 0) {
                  time--;
                  this.codeClass = 'gray';
                  this.codeText = time + '秒后重试';
                } else{
                  this.codeText = '获取验证码';
                  this.codeClass = '';
                  this.codeFlag = true;
                  clearInterval(timer);
                }
              },1000);
            } else if(datas.status == 0){//0失败
              this.toast(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error);
          });
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      .form{
        margin: 1em;
        .field{
          overflow: hidden;
          /*margin: 1em 1em 0;*/
          margin-top: 1em;
          border-radius: .5rem;
          border-bottom: 1px solid #f0f0f0;
          .slot-left{
            width: 2.4rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .slot-right{
            .input-code{
              margin-left: .5em;
            }
          }
        }
        .input-btn {
          font-size: 1.2rem;
          margin-top: 2rem;
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          /* color: #fff; */
          color: #333333;
          /* background-color: #29a1f7; */
          /* background-color: #eb2000; */
          background-color: #f0f0f0;
          border: none;
          border-radius: 1.5rem;
          text-align: center;
          -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
        }
        .input-btn-red{
          color: #fff;
          background-color: #FF6666;
        }
      }



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


<!--忘记密码-->
<!--<template>-->
  <!--<div class="enroll">-->
    <!--&lt;!&ndash;页头&ndash;&gt;-->
    <!--<div class="head border_eee">-->
      <!--<div class="head_left">-->
        <!--<a class="icon_left_black" @click="$router.go(-1);"></a>-->
      <!--</div>-->
      <!--<div class="head_center">-->
        <!--忘记密码-->
      <!--</div>-->
      <!--<div class="head_right"></div>-->
    <!--</div>-->
    <!--<div class="enroll_main">-->
      <!--<form action="" method="post">-->
        <!--<ul class="login_form">-->
          <!--<li class="input">-->
            <!--<p class="input_left"><i class="icon_mobile"></i></p>-->
            <!--<input class="input_center" type="text" placeholder="请输入手机号" v-model="mobile" ref="mobile" v-on:keyup="valChange" v-focus/>-->
            <!--<i class="icon_clear" v-show="mobile" @click="mobile=''"></i>-->
          <!--</li>-->
          <!--<li class="input">-->
            <!--<p class="input_left"><i class="icon_code"></i></p>-->
            <!--<input class="input_center" type="text" placeholder="请输入验证码" v-model="code" v-on:keyup="valChange"/>-->
            <!--<i class="icon_clear" v-show="code" @click="code=''"></i>-->
            <!--<p class="input_code" ref="getCode" v-text="codeText" v-on:click="getCode" v-bind:style="{ color: codeColor}"></p>-->
          <!--</li>-->
          <!--<li class="input">-->
            <!--<p class="input_left"><i class="icon_pwd"></i></p>-->
            <!--<input class="input_center" v-bind:type="passwordType" placeholder="请输入密码" v-model="password" v-on:keyup="valChange"/>-->
            <!--<i class="icon_clear" v-show="password" @click="password=''"></i>-->
            <!--<i class="icon-eye-up" v-show="eyeFlag" @click="togglePasswordType"></i>-->
            <!--<i class="icon-eye-down" v-show="!eyeFlag" @click="togglePasswordType"></i>-->
          <!--</li>-->
          <!--<li>-->
            <!--<input class="m_t_1rem" type="button" value="完成" @click="submit" v-bind:class="{input_btn:!btnFlag, 'input_btn2':btnFlag}"/>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</form>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
