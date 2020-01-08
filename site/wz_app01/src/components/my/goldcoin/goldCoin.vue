<!--金币中心-->
<template>
  <div class="goldCoin">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        金币中心
      </div>
      <div class="head_right">
        <span @click="$router.push({path:'/gold_info'});">金币明细</span>
      </div>
    </div>
    <div class="goldcoin_main">
      <div class="hint">
        <small class="color_ff7900">*温馨提示：签到，每日好评，金币抽奖都可获得金币</small>
      </div>
      <div class="my_gold border_f0f0f0">
        <div class="my_gold_t">我的金币：</div>
        <div class="gold_li">
          <span class="flex1">余额：</span>
          <span class="color_ff7900" v-text="userGold.user_counts"></span>
        </div>
        <div class="gold_li">
          <span class="flex1">今日收益</span>
          <span class="color_ff7900" v-text="userGold.today_coin"></span>
        </div>
        <div class="gold_li">
          <span class="flex1">本月收益</span>
          <span class="color_ff7900" v-text="userGold.month_coin">10</span>
        </div>
      </div>
      <div class="gold_title">马上有钱</div>
      <div class="gold_box">
        <div>金币抽奖</div>
        <div>金币抽奖可以获取高额平台币和话费等奖励</div>
        <div class="custom_btn" @click="$router.push({path:goldLotteryUrl});">立即抽奖</div>
      </div>
      <div class="gold_box m_t_1-5rem">
        <div>平台币兑换</div>
        <div>兑换平台币可以在游戏充值使用平台币支付</div>
        <div class="custom_btn" @click="$router.push({path:platformCoinUrl});">立即兑换</div>
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
        userGold: {
          user_counts: 0,   //用户金币余额
          today_coin: 0,  //今日金币收益
          month_coin: 0  //本月金币收益
        }
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      goldLotteryUrl:function () {
        return this.userInfo.id == 0 ? 'login' : 'gold_lottery';
      },
      platformCoinUrl:function () {
        return this.userInfo.id == 0 ? 'login' : 'exchange';
      }
    },
    created() {
      this.getGold()
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      getGold(){
          //获取用户金币
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=coin&a=my_coin',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.userGold = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .goldCoin{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .goldcoin_main{
      .my_gold{
        padding: .6rem;
        .my_gold_t{
          height: 2rem;
          line-height: 2rem;
          font-size: 1.1rem;
        }
        .gold_li{
          height: 3.2rem;
          margin: .4rem;
          padding: 0 .7rem;
          background-color: #f0f0f0;
          border-radius: .35rem;
          display: flex;
          align-items: center;
        }
      }
      .gold_title{
        height: 3rem;
        line-height: 3rem;
        padding: 0 .6rem;
        font-size: 1.1rem;
      }
      .gold_box{
        background-color: #f0f0f0;
        text-align: center;
        padding: .7rem 1rem .4rem;
        & > div{
          margin-bottom: .7rem;
        }
      }
    }
  }
</style>
