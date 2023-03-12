<!--绑定手机号-->
<template>
  <div class="bindPhone">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        绑定手机号
      </div>
      <div class="head_right">
        <!--<span @click="$router.push({path:'/enroll'});">注册</span>-->
      </div>
    </div>
    <div class="untiePhone_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="text" placeholder="请输入要绑定的手机号" v-model="mobile" ref="mobile" v-focus/>
            <i class="icon_clear" v-show="mobile" @click="mobile=''"></i>
          </li>
          <!--<li class="v_code">-->
            <!--<div class="import_code">-->
              <!--<p class="input_left"><i class="icon_code"></i></p>-->
              <!--<input class="input_center" type="text" placeholder="请输入验证码" v-model="code" ref="code"/>-->
              <!--<i class="icon_clear" v-show="code" @click="code=''"></i>-->
            <!--</div>-->
            <!--<input type="button" v-model="codeTime" class="get_code" ref="getCode" v-on:click="getCodeinvitebind:style="{ backgroundColor: codeColor}"/>-->
          <!--</li>-->
          <li class="input">
            <p class="input_left"><i class="icon_code"></i></p>
            <input class="input_center" type="text" placeholder="请输入验证码" v-model="code" ref="code"/>
            <i class="icon_clear" v-show="code" @click="code=''"></i>
            <p class="input_code" ref="getCode" v-text="codeTime" v-on:click="getCode" v-bind:style="{ color: codeColor}"></p>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="立即绑定" @click="submit"/>
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
        mobile: '',
        code: '',
        codeFlag: true,
        codeTime: '获取验证码',
        codeColor: '#eb2000'
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getUser();
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
        this.indicator();//开启加载提示动画
        var url = this.jointUrl({
          uid: this.userInfo.id,
          mobile: this.mobile,
          appid: this.myType.appid,
          code: this.code
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          mobile: this.mobile,
          appid: this.myType.appid,
          code: this.code,
          sign: mySign
        });
        //绑定手机号
        this.$http.post('/api/index.php?g=api&m=user&a=bind_mobile',myUrl)
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 1){//1成功
              this.toast('手机号绑定成功');
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
            type: 3
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=userbox&a=send_message', {
            params:{
              mobile: this.mobile,
              type: 3,  //1 注册 2 找回密码 3绑定手机 4 解绑手机
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                this.toast('验证码已发送，请注意查收');
              }
              if(datas.status == 0){//0失败
                this.toast(datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
          {
            let time = 60;
            let timer = setInterval(() => {
              if (time > 0) {
                time--;
                this.codeColor = '#a8a2a2';
                this.codeTime = time + '秒后重试';
              } else{
                this.codeTime = '获取验证码';
                this.codeColor = '#eb2000';
                this.codeFlag = true;
                clearInterval(timer);
              }
            },1000);
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
  .bindPhone{
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .untiePhone_main{
      flex: 1;
      .login_form{
        margin: 2rem 1.5rem;
      }
    }
  }
</style>
