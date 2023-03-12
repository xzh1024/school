<template>
  <div class="rechargeCalculator">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        佣金计算器
      </div>
      <div class="head_right"></div>
    </div>
    <div class="main">
      <ul class="calculator">
        <li>
          我是手游玩家
        </li>
        <li>
          <label>我要充值的游戏</label>
          <input type="text" placeholder="选择需要充值的游戏">
        </li>
        <li>
          <label>我要充值的金额</label>
          <input type="text" placeholder="输入需要充值的金额">
        </li>
        <li>
          <label>我的佣金</label>
          <input type="text" placeholder="">
        </li>
        <li>
          <div class="calculator-btn">计算</div>
        </li>
      </ul>

      <ul class="calculator">
        <li>
          我是推广员
        </li>
        <li>
          <label>我的粉丝要充值的游戏</label>
          <input type="text" placeholder="选择需要充值的游戏">
        </li>
        <li>
          <label>我的粉丝要充值的金额</label>
          <input type="text" placeholder="输入需要充值的金额">
        </li>
        <li>
          <label>我的佣金</label>
          <input type="text" placeholder="">
        </li>
        <li>
          <div class="calculator-btn">计算</div>
        </li>
      </ul>
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
  .rechargeCalculator{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      .calculator{
        background-color: #f0f0f0;
        padding: 1rem;
        margin-top: 1rem;
        li{
          padding: .5rem 0;
          display: flex;
          align-items: center;
          label{
            display: inline-block;
            width: 8rem;
            margin-right: 1rem;
            text-align: center;
          }
          input{
            text-align: center;
            flex: 1;
          }
          .calculator-btn{
            width: 3rem;
            text-align: center;
            padding: .3rem 1rem;
            border-radius: .5rem;
            background-color: #ffffff;
            border: 1px solid #ffffff;
            margin: 1rem auto 0;
          }
        }
      }
    }
  }
</style>
