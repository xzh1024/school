<!--任务中心-->
<template>
  <div class="task" v-on:scroll.passive="onScroll($event)">
    <!--页头-->
    <!--<div class="task_bg">-->
      <img class="head_bg" src="../../../static/img/01_icon_tu-.png" alt="">
      <div class="head_box" ref="headBox" :style="{opacity:headBoxOpacity}"></div>
      <div class="head">
        <div class="head_left">
          <!--<i class="icon_left_white" @click="$router.go(-1);"></i>-->
          <i v-bind:class="isLeftClass" @click="$router.go(-1);"></i>
        </div>
        <div class="head_center color_white" v-bind:class="isColorClass">
          任务中心
        </div>
        <div class="head_right"></div>
      </div>
    <!--</div>-->
    <div class="task_main" v-if="taskData.recom_top">
      <div class="list">
        <div class="one" @click="$router.push({path:signingUrl});">
          <div class="one_left"><i class="one_icon_signin2"></i></div>
          <div class="one_center">
            <div class="one_center_title">每日签到</div>
            <div class="color_999999 small2">签到+<span v-text="taskData.sign_day_bonus.normal">0</span>金币，VIP额外+<span v-text="taskData.sign_day_bonus.vip_extra">0</span>金币</div>
          </div>
          <div class="one_right color_black">
            <span v-if="taskData.task[1] == 0">未完成</span>
            <span v-else-if="taskData.task[1] == 1">已完成</span>
            <i class="remind" v-if="taskData.task[1] == 0"></i>
          </div>
          <i class="icon_right_black"></i>
        </div>
        <div class="one" @click="$router.push({path:gameInfoUrl});">
          <div class="one_left"><i class="one_icon_comment"></i></div>
          <div class="one_center">
            <div class="one_center_title">每日评论</div>
            <div class="color_999999 small2">每日首次评论奖励<span v-text="taskData.pl_coin">0</span>金币</div>
          </div>
          <div class="one_right color_black">
            <span v-if="taskData.task[2] == 0">未完成</span>
            <span v-else-if="taskData.task[2] == 1">已完成</span>
            <i class="remind" v-if="taskData.task[2] == 0"></i>
          </div>
          <i class="icon_right_black"></i>
        </div>
        <div class="one" @click="$router.push({path:driveUrl});">
          <div class="one_left"><i class="one_icon_drive"></i></div>
          <div class="one_center">
            <div class="one_center_title">每日发车</div>
            <div class="color_999999 small2">每日首次发车可获得<span v-text="taskData.drive_bonus">0</span>金币</div>
          </div>
          <div class="one_right color_black">
            <span v-if="taskData.task[3] == 0">未完成</span>
            <span v-else-if="taskData.task[3] == 1">已完成</span>
            <i class="remind" v-if="taskData.task[3] == 0"></i>
          </div>
          <i class="icon_right_black"></i>
        </div>
        <div class="one" @click="$router.push({path:inviteUrl});">
          <div class="one_left"><i class="one_icon_invite"></i></div>
          <div class="one_center">
            <div class="one_center_title">邀请好友</div>
            <div class="color_999999 small2">最高奖励<span v-text="taskData.recom_top">0</span>金币/人</div>
          </div>
          <div class="one_right color_black">
            <span v-if="taskData.task[4] == 0">未完成</span>
            <span v-else-if="taskData.task[4] == 1">已完成</span>
            <i class="remind" v-if="taskData.task[4] == 0"></i>
          </div>
          <i class="icon_right_black"></i>
        </div>
        <div class="one" @click="$router.push({path:inviteRankingUrl});">
          <div class="one_left"><i class="one_icon_crown"></i></div>
          <div class="one_center">
            <div class="one_center_title">邀请排行榜</div>
            <div class="color_999999 small2">最高奖励<span v-text="taskData.rank_recom_top">0</span>金币</div>
          </div>
          <div class="one_right color_black">
            <span v-if="taskData.task[7] == 0">未完成</span>
            <span v-else-if="taskData.task[7] == 1">已完成</span>
            <i class="remind" v-if="taskData.task[7] == 0"></i>
          </div>
          <i class="icon_right_black"></i>
        </div>
        <div class="one" @click="$router.push({path:goldLotteryUrl});">
          <div class="one_left"><i class="one_icon_wallet"></i></div>
          <div class="one_center">
            <div class="one_center_title">金币抽奖</div>
            <div class="color_999999 small2">最高得到<span v-text="taskData.lottery_bonus">0</span>金币</div>
          </div>
          <!--<div class="one_right color_black">-->
            <!--<span v-if="taskData.task[5] == 0">未完成</span>-->
            <!--<span v-else-if="taskData.task[5] == 1">已完成</span>-->
            <!--<i class="remind" v-if="taskData.task[5] == 0"></i>-->
          <!--</div>-->
          <!--<i class="icon_right_black"></i>-->
        </div>
        <div class="one" @click="$router.push({path:exchangeUrl});">
          <div class="one_left"><i class="one_icon_exchange"></i></div>
          <div class="one_center">
            <div class="one_center_title">金币兑换</div>
            <div class="color_999999 small2">赶紧换平台币来玩游戏吧</div>
          </div>
          <!--<div class="one_right color_black">-->
            <!--<span v-if="taskData.task[6] == 0">未完成</span>-->
            <!--<span v-else-if="taskData.task[6] == 1">已完成</span>-->
            <!--<i class="remind" v-if="taskData.task[6] == 0"></i>-->
          <!--</div>-->
          <!--<i class="icon_right_black"></i>-->
        </div>
        <div class="one" @click="$router.push({path:'/vips'});">
          <div class="one_left"><i class="one_icon_vip"></i></div>
          <div class="one_center">
            <div class="one_center_title">成为VIP</div>
            <div class="color_999999 small2">成为VIP每日可获得更多金币</div>
          </div>
          <!--<div class="one_right color_black">-->
            <!--<span v-if="taskData.task[7] == 0">未完成</span>-->
            <!--<span v-else-if="taskData.task[7] == 1">已完成</span>-->
            <!--<i class="remind" v-if="taskData.task[7] == 0"></i>-->
          <!--</div>-->
          <!--<i class="icon_right_black"></i>-->
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
        gid: 0,
        taskData:{
//          "recom_top": "2000",//邀请好友最高奖励
//          "sign_day_bonus": {
//            "normal": 5, //每日签到一天5金币
//            "vip_extra": 66,//每日签到VIP额外赠送66金币
//          },
//          "pl_coin": "3-10",//每日首次评论奖励3-10金币
//          "lottery_bonus": 500,//金币抽奖最高可得500金币
//          "rank_recom_top": "1000",//邀请排行榜最高奖励
//          "drive_bonus": "5-30", //开车奖励5-30金币
//          "task": {
//            "1": 0, //签到 0未完成 1完成
//            "2": 0, //每日评论 0未完成 1完成
//            "3": 0, //每人发车 0未完成 1完成
//            "4": 0, //邀请好友 0未完成 1完成
//            "5": 0,//金币抽奖 0未完成 1完成
//            "6": 0,//金币兑换 0未完成 1完成
//            "7": 0,//成为VIP 0未完成 1完成
//            "8": 0,//邀请排行榜 0未完成 1完成
//          }
        },
        headBoxHeight: 0,
        headBoxOpacity: 0,//背景透明度
        isLeftClass: 'icon_left_white',
        isColorClass: 'color_white'
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      signingUrl: function () {  //每日签到
        return this.userInfo.id ? '/signing' : '/login';
      },
      driveUrl: function () {  //开车
        return this.userInfo.id ? '/index/drive' : '/login';
      },
      gameInfoUrl: function () {  //每日评论
        return this.userInfo.id ? '/game_info/'+ this.gid +'/1' : '/login';
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
    },
    created() {
//      this.getUser();
      console.log(this.userInfo)
      this.getGameIndex();
      this.getTaskCenter();
		},
		mounted(){
			this.$nextTick(function () {
        this.headBoxHeight = this.$refs.headBox.offsetHeight;
        console.log(this.headBoxHeight)
			});
		},
    methods: {
      onScroll(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        var scrollTop = target.scrollTop;
//        console.log(scrollTop);
        if(scrollTop > 0){
          this.isLeftClass = 'icon_left_black';
          this.isColorClass = 'color_black';
          if(scrollTop < this.headBoxHeight){
            this.headBoxOpacity = scrollTop * (1 / this.headBoxHeight);
          }
        } else {
          this.isLeftClass = 'icon_left_white';
          this.isColorClass = 'color_white';
        }
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
      },
      //获取任务中心
      getTaskCenter() {
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=userbox&a=task_center', {
          params:{
            uid: this.userInfo.id,
            channel: this.myType.channel,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log(datas)
              this.taskData = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log('status == 0 ：'+ datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      openLink(link) {
        window.open(link);
      }
    },
    filters: {	//自定义局部过滤器
      serviceName: (data) => {//过滤显示下载量
        return data + '：'
      }
    }
  }
</script>

<style scoped lang="less">
  .task{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    overflow-y: auto;
    /*.task_bg{*/
      /*height: 16.3rem;*/
      /*background: url("../../../../static/img/c_icon_renwuzhongxin.png") no-repeat;*/
      /*background-size: 100% 100%;*/
      .head_bg{
        width: 100%;
      }
      .head_box{
        width: 100%;
        height: 3rem;
        background: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        /*opacity: 0;*/
      }
      .head{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 11;
      }
    /*}*/
    .task_main{
      /*flex: 1;*/
      /*display: flex;*/
      /*flex-direction: column;*/
      /*overflow-y: auto;*/
      .one {
        /*background-color: #fff;*/
        height: 3.8rem;
        padding: 0 .7rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        .one_left {
          width: 2rem;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .one_center {
          /*margin-left: .5rem;*/
          flex: 1;
        }
        .one_right{
          font-size: 1rem;
          line-height: 1rem;
          padding-right: 1rem;
          position: relative;
          .remind{
            position: absolute;
            right: .3rem;
            top: -0.3rem;
            display: inline-block;
            width: .5rem;
            height: .5rem;
            background: red;
            border-radius: 50%;
          }
        }
        /*.one_right::before {*/
          /*content: "";*/
          /*position: absolute;*/
          /*right: .3rem;*/
          /*top: -0.3rem;*/
          /*width: .5rem;*/
          /*height: .5rem;*/
          /*background: red;*/
          /*border-radius: 50%;*/
          /*transition: transform .5s;*/
          /*transform: scaleX(0);*/
          /*transform-origin: 100% 0;*/
        /*}*/
      }
    }
  }
</style>
