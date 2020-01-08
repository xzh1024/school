<!--转游申请-->
<template>
  <div class="turnApply">
    <div class="credits">
      <div class="credits_one">
        <div class="credits_one_input">
          <input type="text" placeholder="旧游戏名称" v-model="oldAppname" autofocus/>
          <i class="icon_clear" v-show="oldAppname" @click="oldAppname=''"></i>
        </div>
        <div class="credits_one_input">
          <input type="text" placeholder="旧游戏区服" v-model="oldServername"/>
          <i class="icon_clear" v-show="oldServername" @click="oldServername=''"></i>
        </div>
        <div class="credits_one_input">
          <input type="text" placeholder="旧游戏角色名" v-model="oldRolename"/>
          <i class="icon_clear" v-show="oldRolename" @click="oldRolename=''"></i>
        </div>
      </div>
      <div class="credits_one">
        <div class="credits_one_empty">
          <i class="icon_arrow_d"></i>
        </div>
        <div class="credits_one_empty"></div>
        <div class="credits_one_empty"></div>
      </div>
      <div class="credits_one">
        <div class="credits_one_input">
          <input type="text" placeholder="新游戏名称" v-model="newAppname"/>
          <i class="icon_clear" v-show="newAppname" @click="newAppname=''"></i>
        </div>
        <div class="credits_one_input">
          <input type="text" placeholder="新游戏区服" v-model="newServername"/>
          <i class="icon_clear" v-show="newServername" @click="newServername=''"></i>
        </div>
        <div class="credits_one_input">
          <input type="text" placeholder="新游戏角色名" v-model="newRolename"/>
          <i class="icon_clear" v-show="newRolename" @click="newRolename=''"></i>
        </div>
      </div>
    </div>
    <div class="contact_way">
      <div class="contact_way_hint color_ababab">请至少输入一项联系方式！</div>
      <div class="contact_way_input">
        <input type="text" placeholder="请输入手机号码" v-model="mobile"/>
        <i class="icon_clear" v-show="mobile" @click="mobile=''"></i>
      </div>
      <div class="contact_way_input">
        <input type="text" placeholder="请输入QQ号码" v-model="QQ"/>
        <i class="icon_clear" v-show="QQ" @click="QQ=''"></i>
      </div>
      <div class="custom_btn m_t_2rem" @click="submit">确&nbsp;定</div>
    </div>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
  	data: function () {
      return {
        message:'',
        oldAppname: '', //原游戏名称
        oldServername: '', //原游戏区服
        oldRolename: '',  //原角色名称
        newAppname: '',
        newServername: '',
        newRolename: '',
        QQ: '',
        mobile: ''
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {

		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      toast () {
        Toast({
          message: this.message,
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
        var inputs = document.querySelectorAll('.credits input');
        var flag = true;
        for(let i=0, len=inputs.length; i < len; i++){
          if(!inputs[i].value){
            this.message = '请输入' + inputs[i].getAttribute('placeholder');
            this.toast();
            return
          }
        }
        inputs = document.querySelectorAll('.contact_way input');
        for(let i=0, len=inputs.length; i < len; i++){
          if(inputs[i].value){
            flag = false;
          }
        }
        if(flag){
          this.message = '请至少输入一种联系方式';
          this.toast();
        }else {
          if(inputs[0].value) {
            let phoneNum = inputs[0].value;//手机号码
            let reg = /^1[0-9]{10}$/; //验证规则
            if(!reg.test(phoneNum)){
              this.message = '手机号码格式有误';
              this.toast();
              return
            }
          }
          if(inputs[1].value) {
            let qqNum = inputs[1].value;
            let reg = /^[1-9]\d{4,10}$/;
            if(!reg.test(qqNum)){
              this.message = 'QQ号码格式有误';
              this.toast();
              return
            }
          }
          this.indicator();//开启加载提示动画
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            origin_appname: this.oldAppname,
            origin_servername: this.oldServername,
            origin_rolename: this.oldRolename,
            new_appname: this.newAppname,
            new_servername: this.newServername,
            new_rolename: this.newRolename,
            qq: this.QQ,
            mobile: this.mobile
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            origin_appname: this.oldAppname,
            origin_servername: this.oldServername,
            origin_rolename: this.oldRolename,
            new_appname: this.newAppname,
            new_servername: this.newServername,
            new_rolename: this.newRolename,
            qq: this.QQ,
            mobile: this.mobile,
            sign: mySign
          });
          //申请转游
          this.$http.post('/api/index.php?g=api&m=changegame&a=apply',myUrl)
            .then(response => {
              var datas = response.data;
              this.endIndicator();
              if(datas.status == 1){//1成功
                this.message = datas.msg;
                this.toast();
                this.$parent.setComponentName('TurnRecord');
                this.oldAppname = '';
                this.oldServername = '';
                this.oldRolename = '';
                this.newAppname = '';
                this.newServername = '';
                this.newRolename = '';
                this.QQ = '';
                this.mobile = '';
              }
              if(datas.status == 0){//0失败
                this.message = datas.msg;
                this.toast();
              }
            })
            .catch(error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });


        }
      }
    }
  }
</script>

<style scoped lang="less">
  .turnApply{
    flex: 1;
    overflow-y: auto;
    .credits{
      padding: .8em .8rem 1.2rem;
      border-top: .8rem solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      .credits_one{
        width: 100%;
        height: 2.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .credits_one_input{
          width: 30.5%;
          height: 100%;
          border: 1px solid #dcdcdc;
          border-radius: .2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          input{
            width: 100%;
            height: 100%;
            text-align: center;
            border: none;
            /*border-radius: .2rem;*/
          }
        }
        .credits_one_empty{
          width: 30.5%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .contact_way{
      padding: 1.5rem 1rem 0;
      .contact_way_hint{
        font-size: 1.1rem;
      }
      .contact_way_input{
        margin-top: 1rem;
        width: 100%;
        height: 3rem;
        border-radius: .4rem;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        input{
          flex: 1;
          margin-left: .5rem;
          height: 3rem;
          border: none;
          border-radius: .4rem;
          background-color: #f0f0f0;
        }
      }
      /*.contact_way_btn{*/
        /*margin-top: 2rem;*/
        /*width: 100%;*/
        /*height: 3rem;*/
        /*line-height: 3rem;*/
        /*text-align: center;*/
        /*border-radius: .4rem;*/
        /*color: #fff;*/
        /*background-color: #f89d19;*/
        /*box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .25);*/
      /*}*/
    }
  }
</style>
