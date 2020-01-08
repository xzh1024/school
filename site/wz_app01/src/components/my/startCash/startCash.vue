<template>
  <div class="container">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        提现
      </div>
      <div class="head_right"></div>
    </div>
    <div class="main">
      <div class="logo">
        <img class="logo-user" src="../../../static/img/wz/a_icon_wan.png">
        <img class="logo-line" src="../../../static/img/wz/pay/a_icon_jiantou.png">
        <img class="logo-pay" src="../../../static/img/wz/pay/a_icon_zhifubao_xiao.png">
      </div>
      <form class="form">
        <div class="form-item">
          <div class="item-label">
            到账支付宝
          </div>
          <div class="item-input">
            {{ alipayAccount }}
          </div>
          <div class="item-aux">
            <div class="item-aux-btn" @click="$router.push({path:'/bind_alipay'})">修改</div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">
            真实姓名
          </div>
          <div class="item-input">
            {{ realName|F_name }}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">
            提现金额
          </div>
          <div class="item-input">
            <input type="text" v-model="drawMoney" placeholder="请输入提现金额">
          </div>
        </div>
        <div class="form-item color_999999">
          <div class="item-label">
            可提现金额
          </div>
          <div class="item-input">
            {{ money|F_money }}
          </div>
          <div class="item-aux">
              最低提现金额为{{ commissionCash }}元
          </div>
        </div>

        <div class="bonnie">*每月25号后可提现上个月内确认收货的订单佣金</div>
        <div class="form-button">提交申请</div>
        <div class="details" @click="$router.push({path:'/settlement'})">收益明细</div>
      </form>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        alipayAccount: '', //提现账号
        realName: '', //真实姓名
        drawMoney: '', //提现金额
        money: 0, //余额
        commissionCash: 50, //最低提现金额
      }
    },
    created() {
      this.alipayAccount = this.userInfo.alipay_account;
      this.realName = this.userInfo.real_name
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {

    },
    filters: {	//自定义局部过滤器
      F_name: (realName) => {
        var name = '';
        if(realName.length > 0){
          name = realName.charAt(0, 1);
          if(realName.length > 1){
            for(let i = 1; i < realName.length; i++){
              name += '*';
            }
          }
        }
        return name;
      },
      F_money: (money) => {
        return '￥'+money;
      },
    }
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      display: flex;
      flex-direction: column;
      .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        /*height: 6rem;*/
        padding: 2.5em 0;
        background-color: #f3f3f3;
        .logo-user{
          width: 3rem;
          height: 3rem;
          border-radius: .4rem;
        }
        .logo-line{
          width: 2rem;
          padding-left: 1em;
        }
        .logo-pay{
          width: 3rem;
          height: 3rem;
          border-radius: .4rem;
          padding-left: 1em;
        }
      }
      .form{
        margin: 0 1em;
        .form-item{
          display: flex;
          align-items: center;
          height: 4rem;
          border-bottom: 1px solid #f3f3f3;
          overflow: hidden;
          .item-label{
            width: 6rem;
            overflow: hidden;
          }
          .item-input{
            flex: 1;
            input{
              border: none;
            }
          }
          .item-aux{
            .item-aux-btn{
              height: 2rem;
              line-height: 2rem;
              padding: 0 1em;
              border-radius: 1rem;
              color: #ff3e3e;
              border: 1px solid ;
            }
          }
        }
        .bonnie{
          color: #ff3e3e;
          text-align: center;
          padding: 1em 0;
        }
        .form-button{
          height: 2.8rem;
          line-height: 2.8rem;
          margin: 1em 2em 0;
          font-size: 1.2rem;
          text-align: center;
          color: #ffffff;
          background-color: #ff3e3e;
          border-radius: 1.5rem;
        }
        .details{
          text-align: center;
          margin-top: 1.5em;
          font-size: 1.1rem;
          color: #94c3f4;
        }
      }
    }
  }
</style>
