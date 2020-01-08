<!--修改密码-->
<template>
  <div class="passwd">
    <!--页头-->
    <!--<div class="passwd_head">-->
      <!--<p @click="goRouter">-->
        <!--<i class="icon_left2"></i>-->
        <!--<span>修改密码</span>-->
      <!--</p>-->
    <!--</div>-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        修改密码
      </div>
      <div class="head_right">
        <!--<span @click="$router.push({path:'/enroll'});">注册</span>-->
      </div>
    </div>
    <div class="oldpwd_main">
      <form action="" method="post">
        <ul class="login_form">
          <li class="input">
            <p class="input_left"><i class="icon_pwd"></i></p>
            <input class="input_center" type="password" placeholder="原密码" autofocus v-model="oldpwd" ref="oldpwd"/>
            <i class="icon_clear" v-show="oldpwd" @click="oldpwd=''"></i>
          </li>
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
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        oldpwd: '',
        newpwd: '',
        confirmpwd: ''
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
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      getUser () {
        //获取登录状态
        this.$http.get('/api/index.php?g=api&m=userbox&a=get_user_info')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                this.user = datas.data;
              } else {
                this.$router.push({path:'/login',query:{redirect:'/accounts'}});
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      submit(){
        let oldpwd = this.$refs.oldpwd;
        if(!oldpwd.value){
          this.toast('请输入原密码');
          oldpwd.focus();
          return
        }else if(oldpwd.value.length < 6){
          this.toast('密码长度为6-16位！');
          oldpwd.focus();
          return
        }
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
          id: this.userInfo.id,
          password: this.oldpwd,
          newpassword: this.newpwd,
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          id: this.userInfo.id,
          password: this.oldpwd,
          newpassword: this.newpwd,
          sign: mySign
        });
        //修改密码
        this.$http.post('/api/index.php?g=api&m=userbox&a=modify_password',myUrl)
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 1){//1成功
              this.$router.push({path:'/index/myMsg'});
            }
            if(datas.status == 0){//0失败
              this.toast(datas.msg);
            }
            console.log(response);
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });


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
  .passwd{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .passwd_head{
      /*width: 100%;*/
      height: 3rem;
      font-size: 1.2rem;
      /*line-height: 3rem;*/
      color: #fff;
      background-color: #3a3937;
      /*padding: 0 .8rem;*/
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .oldpwd_main{
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
