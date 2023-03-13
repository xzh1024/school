<!--交易账户-->
<template>
  <div class="accounts">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        我的账号
      </div>
      <div class="head_right">
        <span @click="$router.push({path:'/tra_bind_sdkuser'});">新增</span>
      </div>
    </div>
    <div class="accounts_main">
      <div class="relate">
        <div class="relate_btn color_888888" v-if="userData.alipay_account" @click="$router.push({path:'/tra_alipay_account/1'})">{{ userData.alipay_account|F_alipayAccount }}</div>
        <div class="relate_btn color_888888" v-else @click="$router.push({path:'/tra_alipay_account/0'})">还未关联支付宝账号，点击去关联</div>
      </div>
      <div>此账号下绑定的游戏账号</div>
      <div class="accounts_list">
        <div class="one" v-for="(v,i) in gameList">
          <div class="one_head">
            <div class="one_head_left flex1" @click="v.flag = !v.flag">
              <i class="icon_circle"></i>
              <div>账号{{ i+1 }}：</div>
              <div class="m_r">{{ v.sdk_username }}</div>
              <i class="icon_slide_up" v-show="v.flag"></i>
              <i class="icon_slide_down" v-show="!v.flag"></i>
            </div>
            <div class="one_head_right color_blue" @click="out(i)" v-if="v.selling == 0">取消关联</div>
            <div class="one_head_right color_blue" v-else-if="v.selling == 1">交易中</div>
          </div>
          <div class="one_game_list">
            <div class="one_game" v-for="(item, index) in v.game_list" v-show="v.flag" @click="v.selling == 0 ? $router.push({path:'/tra_sell_product/' + item.game_name + '/' + v.sdk_username + '/' + item.system[0] + '/' + item.appid}) : toast('账号正在交易中，已被冻结');">
              <img v-lazy="item.logo" class="one_game_logo">
              <div class="one_game_name">{{ item.game_name }}</div>
            </div>
          </div>
        </div>

      </div>
      <div class="notes">
        <div class="notes_only">
          <p class="notes_only_num">1</p>
          <p class="notes_only_text color_black">第一次买卖账号请先关联自己的支付宝账号，关联完支付宝账号请关联自己的游戏账号</p>
        </div>
        <div class="notes_only">
          <p class="notes_only_num">2</p>
          <p class="notes_only_text color_black">选择游戏账号下的游戏选项，填写相关具体信息后提交审核</p>
        </div>
        <div class="notes_only">
          <p class="notes_only_num">3</p>
          <p class="notes_only_text color_black">只可出售有充值金额的游戏</p>
        </div>
        <div class="notes_only">
          <p class="notes_only_num">4</p>
          <p class="notes_only_text color_black">提交信息后，当前游戏账号将会被冻结，无法登录当前游戏账号下的所有游戏</p>
        </div>
      </div>
    </div>
    <div class="accounts_footer">
      <div class="btn_blue_ye" @click="$router.push({path:'/tra_change_password'})">修改密码</div>
      <div class="btn_blue_not" @click="outlog">退出登录</div>
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
        userData: {},
        gameList:[],
      }
    },
    created() {
      this.getUserInfo();
      this.getSdkuserList();
		},
		mounted(){
			this.$nextTick(function () {
        console.log(this.traUserInfo)
			});
		},
    filters: {	//自定义局部过滤器
      F_alipayAccount: (data) => {
        return '已关联支付宝账号:' + data.substr(0,1) + '*******' + data.substr(-1,1);
      }
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
          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      outlog(){
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=log_out')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
//              this.$store.dispatch('removeTraUser');
              this.myType.delCookie('sy185_tra_user_token');
              this.$store.dispatch('removeTraUser');

              this.$router.push({path:'/tra_login'});
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //获取交易账号资料
      getUserInfo(){
        var url = this.jointUrl({
          uid: this.traUserInfo.uid
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.traUserInfo.uid,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=user_info',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log(datas);
              this.userData = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //关联账号列表
      getSdkuserList(){
        var url = this.jointUrl({
          uid: this.traUserInfo.uid
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.traUserInfo.uid,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=sdkuser_list',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log(datas);
              let list = datas.data.list;
              for(let i = 0,len = list.length; i < len; i++){
                list[i].flag = true;
              }
              this.gameList = list;
            }
            if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //确认取消关联
      out(index){
        MessageBox.confirm('取消关联将删除此账号下所有出售中的游戏账号，是否取消关联?','取消关联').then(action => {
          console.log(this.gameList[index]);
          this.unbindSdkuser(index)
        });
      },
      //取消关联
      unbindSdkuser(index){
        this.indicator();
        var url = this.jointUrl({
          uid: this.traUserInfo.uid,
          sdk_username: this.gameList[index].sdk_username
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.traUserInfo.uid,
          sdk_username: this.gameList[index].sdk_username,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=businessplayer&a=unbind_sdkuser',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log(datas);
              this.toast(datas.msg);
              this.gameList.splice(index, 1);
            }
            if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
            this.endIndicator();
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    },
  }
</script>

<style scoped lang="less">
  .accounts{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .accounts_main{
      /*width: 100%;*/
      flex: 1;
      padding: 0 .6rem;
      .accounts_list{
        .one{
          .one_head{
            margin-top: 1rem;
            display: flex;
            align-items: center;
            .one_head_left{
              flex: 1;
              display: flex;
              align-items: center;
            }
            .one_head_right{

            }
          }
          .one_game_list{
            .one_game{
              margin-top: 1rem;
              display: flex;
              align-items: center;
              .one_game_logo{
                width: 2.6rem;
                height: 2.6rem;
                border-radius: .5rem;
              }
              .one_game_name{
                margin-left: .6rem;
                flex: 1;
              }
            }
          }
        }
      }
      .relate{
        margin: 2rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .relate_btn{
          display: inline-block;
          height: 2.4rem;
          line-height: 2.4rem;
          overflow: hidden;
          padding: 0 1rem;
          border-radius: .4rem;
          background-color: #eeeeee;
        }
      }
      .notes{
        /*padding: .5rem;*/
        /*border-bottom: 1px solid #eeeeee;*/
        margin-top: 1rem;
        .notes_only{
          display: flex;
          margin-bottom: .4rem;
          .notes_only_num{
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            font-size: 1rem;
            color: #ffffff;
            border-radius: .75rem;
            background-color: #d7d7d7;
            margin: 0 .3rem 0 0;
            transform: scale(0.85,0.85);
          }
          .notes_only_text{
            flex: 1;
            font-size: .89rem;
            line-height: 1.3rem;
          }
        }
      }
    }
    .accounts_footer{
      height: 3rem;
      margin: 0 1rem;
      display: flex;
      align-items: flex-start;
      .btn_blue_ye,.btn_blue_not{
        flex: 1;
        margin: 0 1rem;
        height: 2.4rem;
        line-height: 2.4rem;
        border-radius: 1.2rem;
      }
    }
  }
</style>
