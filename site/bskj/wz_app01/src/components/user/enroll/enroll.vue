<!--手机号注册-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        手机号
      </div>
      <div class="head_right"></div>
    </div>
    <div class="enroll_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_mobile"></i></p>
            <input class="input_center" type="number" maxlength="11" placeholder="请输入手机号" v-model="mobile" v-on:keyup="codeChange" ref="mobile" v-focus/>
            <i class="icon_clear" v-show="mobile" @click="mobile='';btnClass='input_btn';"></i>
          </li>
          <li>
            <input class="m_t_1rem" v-bind:class="btnClass" type="button" value="下一步" @click="enrollNext"/>
          </li>
          <li class="agreement">
            <span class="color_636363 m_l">注册代表您已经同意</span>
            <span class="color_red" @click="$router.push({path:'/agreement'});">《玩转用户协议》</span>
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
        btnClass: 'input_btn',
        type: 1, //1 注册 2 其他
      }
    },
    created() {
      console.log(this.$route.params.invitationCode)
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
//          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      codeChange(){
        if(this.mobile.length === 11){
          let reg = /^1[0-9]{10}$/;
          let flag = reg.test(this.mobile); //true
          if(flag){
//              ajax()
            this.btnClass = 'input_btn2';
          }
        } else {
          this.btnClass = 'input_btn';
        }
      },
      enrollNext(){
        if(this.btnClass == 'input_btn2'){
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
                this.$router.push({path:'/enroll_verification_code/'+ this.$route.params.invitationCode + '/' + this.mobile});
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
      .login_form{
        margin: 2rem 1.5rem;
        .agreement{
          margin-top: 1rem;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
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
