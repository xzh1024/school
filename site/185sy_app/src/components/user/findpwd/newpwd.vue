<!--找回密码-->
<template>
  <div class="enroll">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
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
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="新密码" v-model="newpwd" ref="newpwd"/>
            <i class="icon_clear" v-show="newpwd" @click="newpwd=''"></i>
          </li>
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="确认密码" v-model="confirmpwd" ref="confirmpwd"/>
            <i class="icon_clear" v-show="confirmpwd" @click="confirmpwd=''"></i>
          </li>
          <li>
            <input class="input_btn m_t_1rem" type="button" value="确 定" @click="submit"/>
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
        newpwd: '',
        confirmpwd: ''
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
          let newpwd = this.$refs.newpwd;
          if(!newpwd.value){
            this.toast('请输入新密码');
            newpwd.focus();
            return
          }else if(newpwd.value.length < 6){
            this.toast('密码长度为6-16位！');
            newpwd.focus();
            return
          }
          let confirmpwd = this.$refs.confirmpwd;
          if(!confirmpwd.value){
            this.toast('请输入确认密码');
            confirmpwd.focus();
            return
          }else if(confirmpwd.value.length < 6){
            this.toast('密码长度为6-16位！');
            confirmpwd.focus();
            return
          }
          if(newpwd.value != confirmpwd.value){
            this.toast('两次输入的密码不一样');
            newpwd.focus();
            return
          }
          this.indicator();//开启加载提示动画
//        var mySign = md5('username=' + this.username + '&password=' + this.pwd + '&channel=' + this.myType.channel + '&system=' + this.myType.system + '&machine_code=' + this.myType.key1).toLowerCase();
          var url = this.jointUrl({
            id: this.$route.params.id,
            password: this.newpwd,
            token: this.$route.params.token,
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            id: this.$route.params.id,
            password: this.newpwd,
            token: this.$route.params.token,
            sign: mySign
          });
          //发起请求
          this.$http.post('/api/index.php?g=api&m=userbox&a=forget_password',myUrl)
            .then(response => {
              var datas = response.data;
              this.endIndicator();
              if(datas.status == 1){//1成功
                this.toast(datas.msg);
                this.$router.push({path:'/login',query:{redirect:'/index/myMsg'}});
              } else if(datas.status == 0){//0失败
                this.toast(datas.msg);
              }
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
        .v_code{
          border: 1px solid #ddd;
          width: 100%;
          height: 3rem;
          margin-bottom: 1rem;
          border: none;
          display: flex;
          align-items: center;
          .import_code{
            flex: 1;
            height: 100%;
            border: 1px solid #ddd;
            border-radius: .2rem;
            display: flex;
            align-items: center;
            position: relative;
          }
          .get_code{
            white-space: nowrap;
            height: 100%;
            line-height: 100%;
            padding: 0 1rem;
            border-radius: .2rem;
            color: #fff;
            background-color: #ff7900;
            border: 1px solid #ff7900;
            margin-left: .6rem;
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
