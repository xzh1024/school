<template> <!--我的-->
  <div class="my">
    <!--<div clamyMsg="my" v-if="userData.sign_day_bonus">-->
    <!--<div class="my_head" v-show="head">-->
      <!--<p class="head_title">我的<i class="icon_set" @click="$router.push({path:setUrl});"></i></p>-->
    <!--</div>-->
    <div class="main" @scroll.passive="onScroll($event)">
      <div class="headBox" ref="headBox" :style="{opacity:headBoxOpacity}"></div>
      <div class="head" ref="head">
        <div class="head_left"></div>
        <div class="head_center">
          <span class="color_white">{{ headTitle }}</span>
        </div>
        <div class="head_right">
          <!--<i v-bind:class="isShareClass" @click=""></i>-->
          <i class="icon_set" @click="$router.push({path:'/accounts'});"></i>
        </div>
      </div>
      <div id="treasureTop">

      </div>
      <div class="user" ref="userBox">
        <div class="user_box" v-if="userInfo.id">
          <div class="user_yes" @click="$router.push({path:userUrl});">
            <div class="user_img">
              <img v-lazy="userInfo.icon_url" class="user_logo yes_margin">
              <i class="icon_VIPS" v-if="userInfo.is_vip == 1"></i>
              <i class="icon_VIP" v-else></i>
            </div>
            <p class="user_name color_white" v-text="userInfo.nick_name"></p>
          </div>
          <!--<i class="icon_set" @click="$router.push({path:'/accounts'});"></i>-->
        </div>
        <div class="user_box" v-else-if="!userInfo.id">
          <img src="../../static/img/c_icon_wodetouxiang.png" alt="" class="user_logo not_margin">
          <div class="user_operate">
            <div>
              <span @click="$router.push({path:'/enroll'});">注册</span>
              <span>/</span>
              <span @click="$router.push({path:'/login'});">登录</span>
            </div>
            <!--<div class="user_name">{{ user.nick_name }}</div>-->
            <!--<div class="n_vip" v-if="!userData.is_vip" @click="$router.push({path:'/vips'});"></div>-->
            <!--<div class="y_vip" v-if="userData.is_vip"></div>-->
          </div>
        </div>
      </div>
      <div id="treasureCont">
        <div class="treasure color_black">
          <div @click="$router.push({path:goldCoinUrl});">
            <span v-text="userData.coin"></span>
            <span class="small1">金币</span>
          </div>
          <div @click="$router.push({path:platcoinInfoUrl});">
            <span v-text="userData.platform_money"></span>
            <span class="small1">平台币</span>
          </div>
          <div>
            <span v-text="userData.recom_bonus"></span>
            <span class="small1">邀请奖励</span>
          </div>
          <div>
            <span class="BBS color_white small1" @click="$router.push({path:vipsUrl});">开通会员</span>
          </div>
        </div>
      </div>
      <div class="list">
        <!--<div class="one" @click="$router.push({path:'/task'});">-->
          <!--<div class="one_left"><i class="one_icon_signin"></i></div>-->
          <!--<div class="one_center">任务中心</div>-->
          <!--<div class="one_hint color_ababab">-->
            <!--<p></p>-->
          <!--</div>-->
          <!--<div class="one_right"><i class="icon_right_black"></i></div>-->
        <!--</div>-->
        <div class="one" @click="$router.push({path:signingUrl});" style="border-top: 1px solid #f0f0f0;">
          <div class="one_left"><i class="one_icon_signin"></i></div>
          <div class="one_center">每日签到</div>
          <div class="one_hint color_ababab">
            <p>+<span class="color_ff7900 strong" v-text="userData.sign_day_bonus.normal"></span>(vip额外奖励<span class="color_ff7900 strong" v-text="userData.sign_day_bonus.vip_extra"></span>)金币，坚持有惊喜</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:gameInfoUrl});">
          <div class="one_left"><i class="one_icon_comment"></i></div>
          <div class="one_center">每日评论</div>
          <div class="one_hint color_ababab">
            <p>每日首次评论奖励<span class="color_ff7900 strong" v-text="userData.pl_coin"></span>金币</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:inviteUrl});">
          <div class="one_left"><i class="one_icon_invite"></i></div>
          <div class="one_center">邀请好友</div>
          <div class="one_hint color_ababab">
            <p>最高奖励<span class="color_ff7900 strong" v-text="userData.recom_top"></span>金币/人</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:inviteRankingUrl});">
          <div class="one_left"><i class="one_icon_trophy"></i></div>
          <div class="one_center">邀请排行</div>
          <div class="one_hint color_ababab">
            <p></p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:driveUrl});" style="border-bottom: 3px solid #f0f0f0;">
          <div class="one_left"><i class="one_icon_drive"></i></div>
          <div class="one_center">每日发车</div>
          <div class="one_hint color_ababab">
            <p>每日首次评论奖励<span class="color_ff7900 strong" v-text="userData.pl_coin"></span>金币</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <!--<div class="one" @click="$router.push({path:qaUrl});">-->
          <!--<div class="one_left"><i class="one_icon_questions"></i></div>-->
          <!--<div class="one_center">我的问答</div>-->
          <!--<div class="one_hint color_ababab"></div>-->
          <!--<div class="one_right"><i class="icon_right_black"></i></div>-->
        <!--</div>-->
        <div class="one" @click="$router.push({path:myAnsweringUrl});">
          <div class="one_left"><i class="one_icon_questions"></i></div>
          <div class="one_center">我来回答</div>
          <div class="one_hint color_ababab"></div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:myQuestionsUrl});">
          <div class="one_left"><i class="one_icon_questions"></i></div>
          <div class="one_center">我的提问</div>
          <div class="one_hint color_ababab"></div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>

        <div class="one" @click="$router.push({path:exchangeUrl});">
          <div class="one_left"><i class="one_icon_exchange"></i></div>
          <div class="one_center">金币兑换</div>
          <div class="one_hint color_ababab">
            <p><span class="color_ff7900 strong" v-text="userData.platform_coin_ratio"></span>金币=<span class="color_ff7900 strong">1</span>平台币，<span class="color_ff7900 strong">10</span>平台币=<span class="color_ff7900 strong">1</span>RMB</p>
            <p>（平台币可以在游戏里面充值）</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:goldLotteryUrl});">
          <div class="one_left"><i class="one_icon_draw"></i></div>
          <div class="one_center">金币抽奖</div>
          <div class="one_hint color_ababab">
            <p>更多奖励在这里，每次抽奖消耗<span class="color_ff7900 strong" v-text="userData.deplete_coin"></span>金币</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>

        <div class="one" @click="$router.push({path:detailUrl});" style="border-bottom: 3px solid #f0f0f0;">
          <div class="one_left"><i class="one_icon_detail"></i></div>
          <div class="one_center">货币明细</div>
          <div class="one_hint color_ababab"></div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:rebateUrl});">
          <div class="one_left"><i class="one_icon_rebate"></i></div>
          <div class="one_center">返利申请</div>
          <div class="one_hint color_ababab">
            <p>充值有奖，元宝返还</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:turnUrl});" style="border-bottom: 3px solid #f0f0f0;">
          <div class="one_left"><i class="one_icon_turn"></i></div>
          <div class="one_center">申请转游</div>
          <div class="one_hint color_ababab"></div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <!--<div class="one">-->
          <!--<i class="one_icon one_icon_manage"></i>-->
          <!--<div class="one_center">应用管理</div>-->
          <!--<div class="one_hint color_ababab"></div>-->
          <!--<i class="icon_right_black"></i>-->
        <!--</div>-->
        <div class="one" @click="$router.push({path:giftUrl});">
          <div class="one_left"><i class="one_icon_gift"></i></div>
          <div class="one_center">我的礼包</div>
          <div class="one_hint color_ababab"></div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:collectUrl});">
          <div class="one_left"><i class="one_icon_collect"></i></div>
          <div class="one_center">我的收藏</div>
          <div class="one_hint color_ababab"></div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <!--<div class="one" @click="$router.push({path:activityUrl});">-->
          <!--<div class="one_left"><i class="one_icon_activity"></i></div>-->
          <!--<div class="one_center">活动中心</div>-->
          <!--<div class="one_hint color_ababab"></div>-->
          <!--<div class="one_right"><i class="icon_right_black"></i></div>-->
        <!--</div>-->
        <div class="one" @click="$router.push({path:newsUrl});" style="border-bottom: 3px solid #f0f0f0;">
          <div class="one_left"><i class="one_icon_news"></i></div>
          <div class="one_center">我的消息</div>
          <div class="one_hint color_ababab"></div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <div class="one" @click="$router.push({path:serviceUrl});">
          <div class="one_left"><i class="one_icon_service"></i></div>
          <div class="one_center">客服中心</div>
          <div class="one_hint color_ababab">
            <p>寻求帮助，问题反馈</p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
        <!--<div class="one">-->
          <!--<i class="one_icon one_icon_pwd"></i>-->
          <!--<div class="one_center">修改密码</div>-->
          <!--<div class="one_hint color_ababab"></div>-->
          <!--<i class="icon_right_black"></i>-->
        <!--</div>-->
        <!--<div class="one">-->
          <!--<i class="one_icon one_icon_mobile"></i>-->
          <!--<div class="one_center">绑定手机</div>-->
          <!--<div class="one_hint color_ababab">-->
            <!--<p>{{ userData.mobile|mobile }}</p>-->
          <!--</div>-->
          <!--<i class="icon_right_black"></i>-->
        <!--</div>-->
        <div class="one" @click="$router.push({path:aboutUsUrl});">
          <div class="one_left"><i class="one_icon_aboutUs"></i></div>
          <div class="one_center">关于我们</div>
          <div class="one_hint color_ababab">
            <p></p>
          </div>
          <div class="one_right"><i class="icon_right_black"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        userData: {
          platform_money: 0,//平台币
          coin: 0, //金币
          recom_bonus: 0, //邀请收益
          is_vip: 0, //是否是VIP 1是 0 不是
          mobile: "", //未绑定手机为空字符串
          recom_top: 0, //好有推荐最高奖励2000./人
          sign_day_bonus: {
            "normal": 0, //每日签到一天5金币
            "vip_extra": 0 //每日签到VIP额外赠送66金币
          },
          platform_coin_ratio: "0",//1平台币=10金币
          pl_coin: "0", //每日首次评论奖励3-10金币
          deplete_coin: "0"//每次抽奖消耗金币
        },
        gid: 0,
        newTab: 4,
//        head: false,
        headFlag: true,
        headTitle: '',
        headBoxOpacity: 0,
        treasureCont: '',
        treasureTop: '',
      }
    },
//    components:{ MainTab },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      setUrl: function() { //账户管理
        return this.userInfo.id ? '/accounts' : '/login';
      },
      userUrl: function() { //用户信息
        return this.userInfo.id ? '/user_info/'+ this.userInfo.id : '/login';
      },
      vipsUrl: function() { //账户管理
        return this.userInfo.id ? '/vips' : '/login';
      },
      goldCoinUrl:function () { //金币中心
        return this.userInfo.id ? '/gold_coin' : '';
      },
      platcoinInfoUrl:function () { //平台币中心
        return this.userInfo.id ? '/platcoin_info' : '';
      },
      signingUrl: function () {  //每日签到
        return this.userInfo.id ? '/signing' : '/login';
      },
      driveUrl: function () {  //开车
        return this.userInfo.id ? '/index/drive' : '/login';
      },
      qaUrl: function () {  //我的问答
        return this.userInfo.id ? '/game_question' : '/login';
      },
      myAnsweringUrl: function () {  //我的回答
        return this.userInfo.id ? '/my_answering' : '/login';
      },
      myQuestionsUrl: function () {  //我的提问
        return this.userInfo.id ? '/my_questions' : '/login';
      },
      gameInfoUrl: function () {  //每日评论
        return this.userInfo.id ? '/game_info/'+this.gid+'/1' : '/login';
      },
      inviteUrl: function () {  //邀请好友
        return this.userInfo.id ? '/invite' : '/login';
      },
      exchangeUrl: function () {  //金币兑换
        return this.userInfo.id ? '/exchange' : '/login';
      },
      goldLotteryUrl: function () {  //金币抽奖
        return this.userInfo.id ? '/gold_lottery' : '/login';
      },
      inviteRankingUrl: function () {  //邀请排行榜
        return this.userInfo.id ? '/invite_ranking_list' : '/login';
      },
      detailUrl: function () {  //货币明细
        return this.userInfo.id ? '/detail' : '/login';
      },
      rebateUrl: function () {  //返利申请
        return this.userInfo.id ? '/rebate' : '/login';
      },
      turnUrl: function () {  //申请转游
        return this.userInfo.id ? '/turn' : '/login';
      },
      //service
      giftUrl: function () {  //我的礼包
        return this.userInfo.id ? '/my_gift' : '/login';
      },
      collectUrl: function () {  //我的收藏
        return this.userInfo.id ? '/collect' : '/login';
      },
      activityUrl: function () {  //活动中心
        return this.userInfo.id ? '/activity' : '/login';
      },
      newsUrl: function () {
        return this.userInfo.id ? '/news' : '/login';
      },
      serviceUrl: function () {  //客服中心
        return this.userInfo.id ? '/service' : '/login';
      },
      aboutUsUrl: function () {  //关于我们
        return this.userInfo.id ? '/about_us' : '/login';
      },
    },
    created(){
//      this.getUser();
      this.getUserData();
      this.getGameIndex();
    },
    mounted(){
      this.$nextTick(function () {
        console.log(this.userInfo)
        this.treasureCont = document.getElementById('treasureCont');
        this.treasureTop = document.getElementById('treasureTop');
      });
    },
    watch: {//使用watch 监听$router的变化
      userInfo(to, from) {
        console.log(to)
        this.getUserData();
        this.getGameIndex();
      }
    },
    methods: {
      onScroll(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var scrollTop = target.scrollTop;
        if(scrollTop > 0){
          this.headTitle = '个人中心';
          if(scrollTop >= (this.$refs.userBox.offsetHeight - this.$refs.head.offsetHeight)){
            this.headBoxOpacity = 1;
            if(this.headFlag) {
              let newTreasure = document.querySelector('#treasureCont>.treasure');
              this.treasureTop.appendChild(newTreasure);
              this.treasureTop.style.display = "block";
              this.headFlag = false;
            }
          } else {
            this.headBoxOpacity = 1 / (this.$refs.userBox.offsetHeight - this.$refs.head.offsetHeight) * scrollTop;
            if(!this.headFlag) {
              let newTreasure = document.querySelector('#treasureTop>.treasure');
              this.treasureCont.appendChild(newTreasure);
              this.treasureTop.style.display = "none";
              this.headFlag = true;
            }
          }
        } else {
          this.headBoxOpacity = 0;
          this.headTitle = '';
          let newTreasure = document.querySelector('#treasureTop>.treasure');
          if(newTreasure){
            this.treasureCont.appendChild(newTreasure);
            this.treasureTop.style.display = "none";
            this.headFlag = true;
          }
        }
      },
      //获取用户信息
      getUserData() {
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http({
          url: '/api/index.php?g=api&m=userbox&a=user_center',
          method: 'post',
          data: myUrl,
//          headers: {'Content-Type': 'multipart/form-data'}
        })
//        .post('/api/index.php?g=api&m=userbox&a=user_center',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                this.userData = datas.data;
                console.log(this.userData)
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      getGameIndex() {
        this.$http.get("/www/api-game-index", {
          params: {
            page : 1,
            channel : this.myType.channel,
            system : this.myType.system
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 0){
              let gamelist = datas.data.gamelist;
              gamelist.length = 3;
              let index = new Date().getDate()%gamelist.length
              this.gid = gamelist[index].id;
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      }
    },
//    filters: {	//自定义局部过滤器
//      mobile: (data) => {
//        if(data){
//          var mobile = '';
//          for(let i=0,len=data.length; i<len; i++){
//            if(i>2 && i<7){
//              mobile += '*';
//            } else {
//              mobile += data[i];
//            }
//          }
//        }
//        return mobile
//      }
//    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .my{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    /*background-color: #f0f0f0;*/
    .my_head{
      width: 100%;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      font-size: 1.2rem;
      color: #fff;
      background-color: #1e81d2;
      position: fixed;
      z-index: 999;
      .head_title{
        width: 100%;
        height: 100%;
        position: relative;
      }
    }
    .main{
      flex: 1;
      overflow-y: auto;
      .headBox{
        width: 100%;
        height: 3rem;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 300;
        background-color: #29a1f7;
      }
      .head{
        background-color: transparent;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 301;
        /*分享*/
        .icon_game_share{
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
          background: url("../../static/img/37_icon_fx.png") no-repeat;
          background-size: contain;
        }
      }
      .user{
        height: 11rem;
        /*background-color: #1e81d2;*/
        background: url("../../static/img/a_icon_beijing.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        /*.icon_now_login{ !*立即登录*!*/
          /*display: block;*/
          /*width: 3.9rem;*/
          /*height: 3.9rem;*/
          /*background: url("../../../static/img/c_icon_wodetouxiang.png") no-repeat;*/
          /*background-size: 100% 100%;*/
          /*border-radius: 50%;*/
          /*border: 2px solid #fff;*/
        /*}*/

        .user_box{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .user_yes{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .user_name{
              margin-top: .6rem;
            }
          }
          .user_logo{
            display: block;
            width: 4.5rem;
            height: 4.5rem;
            border-radius: 50%;
            /*margin: 0 1.5rem;*/
            border: 2px solid #fff;
          }
          .user_img{
            position: relative;
            .icon_VIP{
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              background: url("../../static/img/c_icon_VIP_an-.png") no-repeat;
              background-size: 100% 100%;
              position: absolute;
              bottom: 0;
              right: 0;
              z-index: 1;
            }
            .icon_VIPS{
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              background: url("../../static/img/c_icon_VIP_liang.png") no-repeat;
              background-size: 100% 100%;
              position: absolute;
              bottom: 0;
              right: 0;
              z-index: 2;
            }
          }

          /*.yes_margin{*/
            /*margin: 0 .6rem .5rem 1.2rem;*/
          /*}*/
          .not_margin{
            margin: 0 .6rem 0 1.2rem;
          }
          .user_operate{
            flex: 1;
            color: #fff;
            .user_name{
              font-size: 1.2rem;
              color: #f6dca4;
            }
          }
          .icon_set{
            margin-top: .5rem;
            margin-right: .5rem;
          }
        }
      }
      #treasureTop{
        display: block;
        width: 100%;
        position: absolute;
        left: 0;
        top: 3rem;
        z-index: 301;
      }
      #treasureCont{
        min-height: 4rem;
      }
      .treasure{
        height: 4rem;
        background-color: #fff;
        /*border-bottom: 1px solid #eee;*/
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        display: flex;
        div{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .BBS{
            display: inline-block;
            height: 1.8rem;
            line-height: 1.8rem;
            padding: 0 .7rem;
            background-color: #29a1f7;
            border-radius: .9rem;
          }
        }
      }
      .list{
        /*margin-top: 2.2rem;*/
        .one{
          background-color: #fff;
          height: 3.6rem;
          padding: 0 .7rem;
          /*margin-bottom: 1px;*/
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          .one_left{
            width: 2rem;
            height: 100%;
            display: flex;
            align-items: center;
          }
          .one_center{
            /*margin-left: .5rem;*/
          }
          .one_right{
            width: 1rem;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          /*.one_icon{ display: inline-block; width: 1.4rem; height: 1.4rem;}*/
          /*.one_icon_signin{ background: url("../../../static/img/c_icon_qiandao.png") no-repeat; background-size: contain;}//签到图标*/
          /*.one_icon_comment{ background: url("../../../static/img/c_icon_meiripinglun.png") no-repeat; background-size: contain;}//评论图标*/
          /*.one_icon_drive{ background: url("../../../static/img/c_icon_meirifache.png") no-repeat; background-size: contain; height: 1rem;}//开车*/
          /*.one_icon_invite{ background: url("../../../static/img/c_icon_yaoqinghaoyou.png") no-repeat; background-size: contain;}//邀请好友图标*/

          /*.one_icon_draw{ background: url("../../../static/img/c_icon_jinbichoujiang.png") no-repeat; background-size: contain;}//金币抽奖图标*/
          /*.one_icon_inviteRanking{ background: url("../../../static/img/c_icon_yqohb.png") no-repeat; background-size: contain; height: 1.2rem;}//邀请排行榜*/
          /*.one_icon_exchange{ background: url("../../../static/img/c_icon_jinbiduihuan.png") no-repeat; background-size: contain;}//金币兑换图标*/
          /*.one_icon_detail{ background: url("../../../static/img/c_icon_huobimingxi.png") no-repeat; background-size: contain;}//货币明细图标*/
          /*.one_icon_rebate{ background: url("../../../static/img/c_icon_flsq.png") no-repeat; background-size: contain;}//返利申请图标*/
          /*.one_icon_turn{ background: url("../../../static/img/c_icon_sqzy.png") no-repeat; background-size: contain; height: 1rem;}//申请转游图标*/
          /*!*.one_icon_manage{ background: url("../../../static/img/c_icon_yygl.png") no-repeat;}//应用管理图标*!*/
          /*.one_icon_gift{ background: url("../../../static/img/c_icon_wdlb.png") no-repeat; background-size: contain;}//我的礼包图标*/
          /*.one_icon_collect{ background: url("../../../static/img/c_icon_wdsc.png") no-repeat; background-size: contain;}//我的收藏图标*/
          /*.one_icon_activity{ background: url("../../../static/img/c_icon_hdzx.png") no-repeat; background-size: contain;}//活动中心图标*/
          /*.one_icon_news{ background: url("../../../static/img/c_icon_meiripinglun.png") no-repeat; background-size: contain;}//我的消息图标*/
          /*.one_icon_service{ background: url("../../../static/img/c_icon_kfzx.png") no-repeat; background-size: contain;}//服务中心图标*/
          /*.one_icon_pwd{ background: url("../../../static/img/c_icon_xiugaimima.png") no-repeat;}//修改密码图标*/
          /*.one_icon_mobile{ background: url("../../../static/img/c_icon_bangdinshouji.png") no-repeat;}//手机图标*/
          /*.one_icon_aboutUs{ background: url("../../../static/img/c_icon_guyuwomen.png") no-repeat; background-size: contain;}//关于我们*/
          .one_hint{
            font-size: .85rem;
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: flex-end;
          }
          /*.icon_right_black{*/
            /*display: inline-block;*/
            /*width: .8rem;*/
            /*height: 1.2rem;*/
            /*background: url("../../../static/img/57_icon_you-.png") no-repeat;*/
            /*background-size: contain;*/
            /*border-radius: 50%;*/
            /*margin-left: .3rem;*/
          /*}*/

        }
      }
    }
  }
</style>

