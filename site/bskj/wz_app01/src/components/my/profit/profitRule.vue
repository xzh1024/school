<template>
  <div class="earnings">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        收益规则
      </div>
      <div class="head_right"></div>
    </div>
    <div class="main">
      <div class="title center f_s2">规则说明</div>
      <div class="only">
        <div class="only-h1">收益说明</div>
        <div class="only-content">
          <p>好友通过您的邀请码注册成为会员后,Ta即永久成为您的会员，未来Ta在游戏里充值或者Ta的会员在游戏里充值您都可以获得相应佣金，佣金会立刻返到您的账户中。</p>
        </div>
      </div>

      <div class="only">
        <div class="only-h1">关于收益</div>
        <div class="only-content">
          <p>您的佣金=您自己的充值返还佣金+您会员的充值返还佣金+您所有会员不管直接还是间接的充值返还佣金</p>
          <p>1.您如果在游戏里充值，那么将会根据游戏的佣金奖励百分比来给您佣金，立刻返到您的账户，您可以在游戏里继续消费或者等到次月25日进行提现。</p>
          <p>2.您的会员如果在游戏里充值，那么将会根据您的会员等级来返还佣金，会员等级越高返还佣金百分比就越高，具体区间在20%-30%。</p>
          <p>3.您的会员的会员如果在游戏充值，那么您也可以得到返还的佣金，只要您的会员越多或者会员的会员越多，只要不停的有会员进来，他们发生充值，您都可以获得佣金。</p>
        </div>
      </div>

      <div class="only">
        <div class="only-h1">关于会员</div>
        <div class="only-h2">普通会员</div>
        <div class="only-content">
          <p><strong>条件：</strong>所有用户被邀请注册即是普通会员</p>
          <p><strong>会员权益：</strong>注册成功并且绑定微信和支付宝即赠送20元到账户</p>
        </div>
        <div class="only-h2">超级会员</div>
        <div class="only-content">
          <p><strong>升级条件：</strong>普通会员真实注册用户达到100并且总收入达到3000或者总收入达到5000以上条件只要达到，不计算时间即可升级。</p>
          <p><strong>降级条件：</strong>如果超级会员升级后累计2个月未能达到超级会员的基本条件，即降为普通会员。</p>
          <p><strong>会员权益：</strong>达到超级会员奖励500元奖励金（一个账户只发一次）1个有效注册用户佣金0.4元，一个月最多计算1000个注册用户，多的不再计算佣金次级玩家推广提成25%</p>
        </div>
        <div class="only-h2">钻石会员</div>
        <div class="only-content">
          <p><strong>升级条件：</strong>普通会员或者超级会员真实注册用户达到900人/月并且累计收入达到20000元/月或者收入达到30000元/月</p>
          <p><strong>降级条件：</strong>如果钻石会员升级后累计2个月未能达到钻石会员的基本条件，即降为超级会员。</p>
          <p><strong>会员权益：</strong>达到超级会员奖励5000元奖励金（一个账户只发一次）1个有效注册用户佣金0.8元，一个月最多计算1000个注册用户，多的不再计算佣金次级玩家推广提成30%</p>
          <p>达到钻石会员用户可随时到公司上班或者网上上班，公司现场上班底薪会比较高，网上上班工资相对下降部分，每月制定相关KPI，达成后还有更高奖励，如果同意公司上班公司购买五险，签订劳动合同。</p>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  export default {
  	data: function () {
      return {

      }
    },
    created() {

		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {

    }
  }
</script>

<style scoped lang="less">
  .earnings{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      .only{
        margin-top: 2em;
        .only-h1{
          font-weight: bold;
          font-size: 1.2rem;
          /*padding-top: 2em;*/
        }
        .only-h2{
          font-weight: bold;
          font-size: 1.1rem;
          padding-top: 1em;
        }
        .only-content{
          font-size: 1rem;
          line-height: 1.5rem;
          p{
            margin-top: .5em;
          }
        }
      }
    }
  }
</style>
