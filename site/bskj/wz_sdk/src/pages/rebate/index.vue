<template>
  <div class="container">
    <Header title="返利">
      <!--<div slot="left">-->
        <!--<span class="icon-left" @click="$router.go(-1);"></span>-->
      <!--</div>-->
      <div slot="right" class="right">
        <i class="icon-close" @click="app.closeUserCenter"></i>
      </div>
    </Header>
    <div class="main">
      <div class="card border-b">
        <div class="header">
          <span class="icon-dot"></span>
          <h1 class="strong">充值返利</h1>
          <!--<span class="btn btn-blue" @click="app.openRebate();">提交返利申请</span>-->
          <span class="btn btn-blue" @click="$router.push({path:'/service'})">提交返利申请</span>
        </div>
        <div class="red">请在充值后24小时内向客服提交返利申请哦！</div>
        <div class="content" v-html="rebate"></div>
        <!--<div class="section">-->
          <!--<p>返利仅限单日累计充值，每日24点清零，第二天重新计算累计：</p>-->
          <!--<p>单日累计充值100-599元返利50%</p>-->
          <!--<p>单日累计充值600-1099元返利70%</p>-->
          <!--<p>单日累计充值1100-3099元返利100%</p>-->
          <!--<p>单日累计充值3100-5099元返利140%</p>-->
          <!--<p>单日累计充值5100-9999元返利200%</p>-->
          <!--<p style="margin-bottom: 1.5rem">单日累计充值10000元返利300%</p>-->

          <!--<p>1.单日累积充值达到额度即可返利！只限一日累积，不能多日累积。</p>-->
          <!--<p>2.达到充值返利条件的玩家请联系客服，登记领取奖励.</p>-->
          <!--<p>3.游戏内不送任何装备和道具！</p>-->
        <!--</div>-->
      </div>

      <div class="card">
        <div class="header">
          <span class="dot"></span>
          <h1>VIP价格表</h1>
        </div>
        <div class="red">*部分游戏月卡·基金·理财·礼包不算VIP经验和充值*</div>
        <div class="content" v-html="vip"></div>
        <!--<table class="table">-->
          <!--<thead>-->
          <!--<tr>-->
            <!--<th>VIP等级</th>-->
            <!--<th>RMB</th>-->
          <!--</tr>-->
          <!--</thead>-->
          <!--<tbody>-->
          <!--<tr>-->
            <!--<td>VIP13</td>-->
            <!--<td>10元</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td>VIP14</td>-->
            <!--<td>30元</td>-->
          <!--</tr>-->
          <!--</tbody>-->
        <!--</table>-->
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Tabbar from '@/components/tabbar'
  import Header from '@/components/header'
export default {
  data () {
    return {
      rebate: '',
      vip: ''
    }
  },
  components:{ Tabbar, Header },
  computed: { //计算属性
    ...mapGetters([
      'userData'
    ])
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let options = {
        appid: this.userData.appid
      };
      options.sign = this.util.getSign(options, this.userData.appkey);
      let params = this.util.jointUrl(options);
      this.axios.post('/api/index.php?g=api&m=SelfRebate&a=gameRebate', params)
        .then(response => {
          var datas = response.data;
          if(datas.status == 1){
            if(datas.data){
                let data = datas.data;
                if(data.rebate){
                    this.rebate = data.rebate;
                }
                if(data.vip){
                  this.vip = data.vip;
                }
            }

            this.$nextTick(function () {
              document.querySelectorAll('.content img').forEach(function(item) {
                item.style.maxWidth = '100%';
              });
            });
          }
          if(datas.status == 0){
            console.log(datas.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      .card{
        padding: 1em;
        /*border-bottom: 1px solid #e9e9e9;*/
        .header{
          display: flex;
          align-items: center;
          overflow: hidden;
          margin-bottom: .5em;
          .icon-dot{
            margin-right: .5em;
          }
          h1{
            flex: 1;
            font-size: 1.2rem;
            font-weight: bold;
          }
        }

        .content{
          margin: 1em 0;
          white-space: pre-line;
          img{
            max-width: 100%!important;
          }
        }

        .section{
          margin-top: 1em;
          p{
            line-height: 1.5rem;
            margin-bottom: .4em;
          }
        }

        .table{
          border-collapse: collapse;
          margin: 1em auto;
          text-align: center;
          thead{
            th{
              width: 12rem;
            }
          }
          td, th{
            height: 2.5rem;
            border: 1px solid #e9e9e9;
            /*color: #666;*/
            color: #444;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
