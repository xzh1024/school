<!--绑定支付宝账号-->
<template>
  <div class="alipay_account">
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        <span>{{ type }}支付宝账号</span>
      </div>
      <div class="head_right"></div>
    </div>
    <div class="alipay_account_main">
      <ul class="form">
        <li>
          <input type="text" placeholder="请输入正确的支付宝账号" v-model="alipayAccount" class="input"/>
        </li>
        <li>
          <input class="form_btn m_t_1rem" type="button" value="绑 定" @click="bindAlipay"/>
        </li>
      </ul>
      <div class="center color_939393 small3">注：后续可用此手机号密码登录您所购买及绑定的所有账号</div>
    </div>
  </div>
</template>
<script>
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        alipayAccount: '',
        type:''
      }
    },
    created() {

    },
    mounted(){
      this.$nextTick(function () {
          console.log(this.$route.params.type)
        if(this.$route.params.type == 0){
          this.type = '绑定';
        } else {
          this.type = '修改';
        }
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
      bindAlipay(){
        if (!this.alipayAccount) {
          this.toast('请输入支付宝账号');
//          inputs[i].focus();
          return
        } else {

        }
        MessageBox.confirm('此支付宝账号是交易成功后转账的账号，为了保证您的权益，请仔细核对','绑定支付宝').then(action => {
          this.bindAlipayGo();
        });
      },
      bindAlipayGo(){
        this.indicator();//开启加载提示动画
        let url = this.jointUrl({
          uid: this.traUserInfo.uid,
          qq: '',
          alipay_account: this.alipayAccount
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          uid: this.traUserInfo.uid,
          qq: '',
          alipay_account: this.alipayAccount,
          icon_url: '', //头像【不进入签名序列】
          real_name: '',  //真实姓名【不进入签名序列】
          sign: mySign
        });
        //编辑交易账号资料
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=edit_user',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.toast(datas.msg);
              console.log(datas)
              this.$router.replace({path:'/tra_accounts'});
            } else if(datas.status == 0){//0失败
              this.toast(datas.msg);
            }
            this.endIndicator();
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
  .alipay_account{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .alipay_account_main{
      flex: 1;
      .form{
        padding: 2rem 1.5rem;
        .input{
          width: 100%;
          height: 3rem;
          border: 1px solid #eee;
        }
        .form_btn{
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
      }
    }
  }
</style>
