<template>
  <div class="profit" v-on:scroll.passive="onScroll($event)">
    <div class="head_wrap" ref="headWrap">
      <!--页头-->
      <div class="headBox" ref="headBox" :style="{opacity:headOpacity}"></div>
      <div class="head_title head" ref="head">
        <div class="head_left">
          <a class="icon_left_white" @click="$router.go(-1);"></a>
        </div>
        <div class="head_center">
          我的收益
        </div>
        <div class="head_right">
          <i class="icon-question" @click="$router.push({path:'/profit_rule'})"></i>
        </div>
      </div>

      <div class="head_content">
        <div class="m_t_2rem f_s3">￥{{ profitData.total }}</div>
        <div class="m_t_1rem color_bcbcbc">累计结算收益</div>
        <div class="m_t_1rem f_s1">账户余额(元)：￥{{ profitData.balance }}</div>
      </div>
    </div>
    <div class="main">
      <div class="card">
        <div class="card-item">
          <div class="card-item-row">
            <span class="color_1e81d2">上月收入</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '上月收入',
            message: '上个月内确认收货的订单收益，每月25日结算后，将转入到余额中'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>￥{{ profitData.last_month_commission?profitData.last_month_commission:0 }}</span>
          </div>
          <div class="card-item-row">
            上月佣金
          </div>
        </div>
        <div class="l"></div>
        <div class="card-item">
          <div class="card-item-row">
            <span class="color_1e81d2">上月笔数</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '上月笔数',
            message: '上个月整个月的佣金总笔数'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>{{ profitData.last_month_count }}</span>
          </div>
          <div class="card-item-row">
            <span class="color_1e81d2">上月佣金笔数</span>
          </div>
        </div>
        <div class="l"></div>
        <div class="card-item">
          <div class="card-item-row">
            <span class="color_1e81d2">本月收入</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '本月收入',
            message: '本月到目前截至的佣金收入'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>￥{{ profitData.this_month_commission?profitData.this_month_commission:0 }}</span>
          </div>
          <div class="card-item-row">
            <span class="color_1e81d2">本月佣金</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="card-item-row card-item-head">
            <i class="card-icon card-icon-now"></i>
            <span>今日</span>
          </div>
          <div class="card-item-row">
            <span>付款笔数</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '付款笔数',
            message: '今日内所有付款的订单数量，包含有效订单和失效订单'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>{{ profitData.today_count }}</span>
          </div>
        </div>
        <div class="l"></div>
        <div class="card-item">
          <div class="card-item-row"></div>
          <div class="card-item-row">
            <span>今日充值佣金</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '今日充值佣金',
            message: '今天到目前截至的充值佣金总数'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>￥{{ profitData.today_pay }}</span>
          </div>
        </div>
        <div class="l"></div>
        <div class="card-item">
          <div class="card-item-row"></div>
          <div class="card-item-row">
            <span>今日注册佣金</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '今日注册佣金',
            message: '今天到目前截至的注册佣金总数'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>￥{{ profitData.today_reg }}</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="card-item-row card-item-head">
            <i class="card-icon card-icon-then"></i>
            <span>昨日</span>
          </div>
          <div class="card-item-row">
            <span>付款笔数</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '付款笔数',
            message: '昨日所有付款的订单数量，包含有效订单和失效订单'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>{{ profitData.yesterday_count }}</span>
          </div>
        </div>
        <div class="l"></div>
        <div class="card-item">
          <div class="card-item-row"></div>
          <div class="card-item-row">
            <span>昨日充值佣金</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '昨日充值佣金',
            message: '昨天一整天的充值佣金总数'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>￥{{ profitData.yesterday_pay }}</span>
          </div>
        </div>
        <div class="l"></div>
        <div class="card-item">
          <div class="card-item-row"></div>
          <div class="card-item-row">
            <span>昨日注册佣金</span>
            <i class="card-icon card-icon-q" @click="messageBox({
            title: '昨日注册佣金',
            message: '昨天一整天的注册佣金总数'
            })"></i>
          </div>
          <div class="card-item-row">
            <span>￥{{ profitData.yesterday_reg }}</span>
          </div>
        </div>
      </div>

      <div class="tabs">
        <div class="tab" @click="$router.push({path:'/settlement'})">
          <div class="tab-content">
            <div class="tab-text">佣金结算明细</div>
          </div>
          <i class="icon_right_black"></i>
        </div>
        <div class="tab" @click="$router.push({path:'/extract_record'})">
          <div class="tab-content">
            <div class="tab-text">提现记录</div>
          </div>
          <i class="icon_right_black"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { MessageBox } from 'mint-ui'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        scrollFlag: true,
        headOpacity: 0,
        headFlag: true,
        profitData: {}
      }
    },
    created() {
      this.getProfit();
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
      onScroll(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var scrollTop = target.scrollTop;
        if(scrollTop > 0){
          if(scrollTop >= (this.$refs.headWrap.offsetHeight - this.$refs.head.offsetHeight)){
            this.headOpacity = 1;
          } else {
            this.headOpacity = 1 / (this.$refs.headWrap.offsetHeight - this.$refs.head.offsetHeight) * scrollTop;
          }
        } else {
          this.headOpacity = 0;
        }
      },
      getProfit(){
        var url = this.jointUrl({
          uid: this.userInfo.uid
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.uid,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=Commission&a=profit',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
//              this.userData = datas.data;
              this.profitData = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      messageBox(msgObj){
        MessageBox({
          title: msgObj.title,
          message: msgObj.message,
          confirmButtonText: '知道了',
          confirmButtonClass: 'mint-msgbox-confirm-red',
          closeOnClickModal: false
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .profit{
    width: 100%;
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    overflow-y: auto;
    background-color: #f3f3f3;
    .head_wrap{
      padding-bottom: 1em;
      text-align: center;
      color: #ffffff;
      background: url("../../../static/img/wz/profit/a_icon_beijing.png") no-repeat;
      background-size: 100% 100%;
      .head_title{
        position: fixed;
      }
      .head_content{
        padding-top: 3rem;
      }
      .headBox{
        position: fixed;
        width: 100%;
        height: 3rem;
        background-color: #df5450;
      }
    }
    .icon-question{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      background: url("../../../static/img/wz/profit/a_icon_wenhao.png") no-repeat;
      background-size: contain;
    }
    .main{
      .card{
        display: flex;
        background-color: #fff;
        margin-bottom: .6em;
        align-items: center;
        .l{
          height: 4rem;
        }
        .card-item{
          flex: 1;
          text-align: center;
          padding-bottom: 1em;
          .card-item-row{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.5rem;
            line-height: 1.5rem;
            padding-top: 1em;
            /*font-size: 1.2rem;*/
            overflow: hidden;
          }
          .card-item-head{
            justify-content: flex-start;
          }
          .card-icon{
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
          }
          .card-icon-q{
            background: url("../../../static/img/wz/profit/a_icon_wenhaoxiao.png") no-repeat;
            background-size: contain;
            margin-left: .5em;
          }
          .card-icon-now{
            background: url("../../../static/img/wz/profit/a_icon_jinri.png") no-repeat;
            background-size: contain;
            margin: 0 .5em;
          }
          .card-icon-then{
            background: url("../../../static/img/wz/profit/a_icon_zuori.png") no-repeat;
            background-size: contain;
            margin: 0 .5em;
          }
        }
      }
      .tabs{
        background-color: #fff;
        .tab{
          display: flex;
          align-items: center;
          padding: 0 1em;
          height: 3rem;
          line-height: 3rem;
          overflow: hidden;
          border-bottom: 1px solid #f3f3f3;
          .tab-content{
            flex: 1;
            overflow: hidden;
            .tab-text{
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>
