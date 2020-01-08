<!--找回交易密码-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        找回密码
      </div>
      <div class="head_right">
        <!--<span @click="$router.push({path:'/enroll'});">注册</span>-->
      </div>
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
            <input class="input_center" type="password" placeholder="请设置密码" v-model="newpwd" ref="newpwd"/>
            <i class="icon_clear" v-show="newpwd" @click="newpwd=''"></i>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="提交" @click="submit"/>
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
        newpwd: '',
        codeFlag: true,
        codeTime: '获取验证码',
        codeColor:'#29a1f7'
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
        {
          let code = this.$refs.code;
          if(!this.code){
            this.toast('请输入验证码');
            code.focus();
            return
          }
        }
        {
          let newpwd = this.$refs.newpwd;
          if(!newpwd.value){
            this.toast('请输入不少于6位的密码');
            newpwd.focus();
            return
          } else if(newpwd.value.length < 6){
            this.toast('请输入不少于6位的密码');
            newpwd.focus();
            return
          }
        }
        this.indicator();//开启加载提示动画
        var url = this.jointUrl({
          mobile: this.mobile,
          code: this.code,
          password: this.newpwd
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          mobile: this.mobile,
          code: this.code,
          password: this.newpwd,
          sign: mySign
        });
        //发起请求
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=forget_password',myUrl)
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 1){//1成功
              this.toast(datas.msg);
              this.$router.replace({path:'/tra_login',query:{traRedirect:'/index/transaction'}});
            } else if(datas.status == 0){//0失败
              this.toast(datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
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
            let mobileNum = mobile.value;//手机号码
            let flag = reg.test(mobileNum); //true
            if(!flag){
              this.toast('手机号不正确');
              mobile.focus();
              return
            }
          }
        }
        if(this.codeFlag) {
          this.codeFlag = false;
          var url = this.jointUrl({
            mobile: this.mobile,
            type: 2,  //1 注册 2 找回密码
            client: 2
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=businessplayer&a=send_message', {
            params:{
              mobile: this.mobile,
              type: 2,
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
              } else if(datas.status == 0){//0失败
                this.toast(datas.msg);
              }
              console.log(response);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });{
          }
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
          border: 1px solid #ddd;
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
