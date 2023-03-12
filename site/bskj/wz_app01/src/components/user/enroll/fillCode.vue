<!--注册邀请码-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        填写邀请码
      </div>
      <div class="head_right"></div>
    </div>
    <div class="enroll_main">
      <div class="img-bind">
        <img class="logo-pay" src="../../../static/img/wz/invite/d_icon_tu.png">
      </div>
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <input class="input_center" type="text" placeholder="请输入邀请码" v-model="invitationCode" v-on:keyup="codeChange" v-focus maxlength="11"/>
            <i class="icon_clear" v-show="invitationCode" @click="invitationCode='';codeChange();"></i>
            <!--<p class="input_left"><i class="icon_mobile"></i></p>-->
          </li>
          <li v-if="inviterFlag">
            <div class="inviter">
              <img class="inviter-img" :src="inviter.icon_url">
              <div class="inviter-info">
                <p>{{ inviter.nick_name }}</p>
                <p class="color_999999">邀请您加入玩转盒子</p>
              </div>
            </div>
          </li>

          <li>
            <input class="m_t_1rem" v-bind:class="{input_btn:eBtn.flag == 0, 'input_btn2':eBtn.flag == 1}" type="button" v-model="eBtn.value" @click="enrollNext"/>
          </li>
          <!--<li><p class="enroll_way color_837f7e f_s1" @click="$router.push({path:'enrollUsername'});">用户名注册</p></li>-->
        </ul>
      </form>
      <dl class="rule">
        <dt>邀请码规则：</dt>
        <dd>1.可联系你的好友获取玩转邀请码：</dd>
        <dd>2.一个用户只能绑定一个邀请码，绑定后不得修改。</dd>
      </dl>
    </div>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui';
  export default {
    name: 'no_keep',
    data: function () {
      return {
        eBtn:{
          value: '立即绑定',
          flag : 0
        },
        inviterFlag: false,
        invitationCode: '', //邀请码 OR 邀请人手机号
        inviter: {}, //邀请人
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
      codeChange(){
//        if(this.invitationCode.length >= 11){
//          let reg = /^1[0-9]{10}$/;
//          let flag = reg.test(this.invitationCode); //true
//          if(flag){
////              ajax()
//            this.btnClass = 'input_btn2';
//            this.btnValue = '下一步';
//            this.inviter = true;
//            this.getInvitationInfo();
//          }
//        } else {
//          this.btnClass = 'input_btn';
//          this.btnValue = '请输入正确的邀请码';
//          this.inviter = false;
//        }
        let code = this.invitationCode;
        if(code.length == 6){
          this.getInvitationInfo();
        } else if(code.length == 11){
          let reg = /^1[0-9]{10}$/;
          let flag = reg.test(code); //true
          if(flag){
            this.getInvitationInfo();
          } else {
            this.btnStatus(0);
          }
        } else {
          this.btnStatus(0);
        }
      },
      btnStatus(status){
        status = status || 0;
        if(status === 0){
          this.inviterFlag = false;
          this.eBtn.flag = 0;
//          this.eBtn.value = '立即绑定';
        }
        if(status === 1){
          this.inviterFlag = true;
          this.eBtn.flag = 1;
//          this.eBtn.value = '下一步';
        }
      },
      getInvitationInfo(){
        var url = this.jointUrl({
          invitation_code: this.invitationCode
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          invitation_code: this.invitationCode,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=get_invitation_info',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
              this.inviter = datas.data;
              this.btnStatus(1);
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
              this.btnStatus(0);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      enrollNext(){
        if(this.eBtn.flag == 1){
//          this.$router.push({path: '/enroll/'+this.invitationCode});
        }
      },
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
  /*.input_btn{*/
  /*font-size: 1.1rem;*/
  /*}*/
  /*.input_btn2{*/
  /*font-size: 1.1rem;*/
  /*}*/
  .enroll{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .enroll_main{
      flex: 1;
      .img-bind{
        display: flex;
        justify-content: center;
        align-items: center;
        /*height: 6rem;*/
        padding: 2.5em 0;
        /*background-color: #f3f3f3;*/
        img{
          width: 90%;
        }
      }
      .rule{
        padding: 0 2rem;
        line-height: 1.5rem;
        font-size: 1.1rem;
        color: #aaa;
      }
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

    .inviter{
      border: 1px solid #ff3e3e;
      border-radius: .5rem;
      padding: .5rem 1rem;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      .inviter-img{
        display: inline-block;
        width: 4rem;
        height: 4rem;
        border-radius: 50% 50%;
      }
      .inviter-info{
        margin-left: .5rem;
        flex: 1;
        font-size: .85rem;
        line-height: 1.5rem;
      }
    }
  }
</style>
