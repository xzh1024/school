<!--手机号注册-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        验证码
      </div>
      <div class="head_right"></div>
    </div>
    <div class="enroll_main">
      <div class="enroll_hint color_999999">
        验证码已发送至：{{ mobile }}
      </div>
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_code"></i></p>
            <input class="input_center" type="text" placeholder="请输入验证码" v-model="code.value" v-on:keyup="codeChange" v-focus/>
            <i class="icon_clear" v-show="code.value" @click="code.value='';codeChange();"></i>
          </li>
          <li>
            <p class="input_code" v-on:click="getCode" v-bind:style="{ color: code.color}">{{ code.time }}</p>
          </li>
          <li>
            <input class="m_t_3rem" v-bind:class="btnClass" type="button" value="注册" @click="enrollSubmit"/>
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
        code: {
          value: '',
          time: '重新发送',
//          time: '60秒后重新发送',
//          color: '#eb2000'
          color: '#29a1f7'
        },
        btnClass: 'input_btn',
        mobile: '',
        type: 1
      }
    },
    created() {
      console.log(this.$route.params.mobile);
      this.mobile = this.$route.params.mobile;
		},
		mounted(){
      this.$nextTick(function () {
//        this.setTimer();
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
//          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      codeChange(){
        if(this.code.value.length === 6){
          this.btnClass = 'input_btn2';
        } else {
          this.btnClass = 'input_btn';
        }
      },
      setTimer(){
        let time = 60;
        let timer = setInterval(() => {
          if (time > 0) {
            time--;
            this.code.color = '#eb2000';
            this.code.time = time + '秒后重新发送';
          } else{
            this.code.time = '重新发送';
            this.code.color = '#29a1f7';
            clearInterval(timer);
          }
        },1000);
      },
      getCode(){
        if(this.code.time == '重新发送'){
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
                this.setTimer();
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
      enrollSubmit(){
        //注册
        if(this.code.value.length === 6){
          this.indicator();
          var url = this.jointUrl({
            mobile: this.mobile,
            invitation_code: this.$route.params.invitationCode,
            code: this.code.value,
            system: this.myType.system,
            maker: '',
            mobile_model: '',
            machine_code: this.myType.machineCode, //设备号
            system_version: ''
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            mobile: this.mobile,
            invitation_code: this.$route.params.invitationCode,
            code: this.code.value,
            system: this.myType.system,
            maker: '',
            mobile_model: '',
            machine_code: this.myType.machineCode, //设备号
            system_version: '',
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=userbox&a=register',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas);
              if(datas.status == 1){//1成功
                this.toast(datas.msg);
                let data = datas.data;
//                this.myType.setCookie('wz_user_token', Base64.encode(this.myType.wz_user_token));
//                localStorage.setItem("wz_user", Base64.encode(JSON.stringify(data)));
//                localStorage.setItem("sy185_password", Base64.encode(this.pwd));
                this.$store.dispatch('getUser',data);
//                this.$router.push({path: '/index/my'});
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
      .enroll_hint{
        margin: 2rem 1.5rem;
      }
      .login_form{
        margin: 2rem 1.5rem;
        .login_input{
          flex: 1;
          border: none;
          height: 2.2rem;
        }
      }
    }
  }
</style>
