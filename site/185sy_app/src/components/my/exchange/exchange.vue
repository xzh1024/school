<!--金币兑换-->
<template>
  <div class="exchange">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        平台币兑换
      </div>
      <div class="head_right"></div>
    </div>
    <div class="exchange_main">
      <div class="my_gold bd_t_06rem">
        <p>我的金币：<span v-text="userCoin.coin"></span></p>
        <p>可兑换平台币：<span v-text="userCoin.cash_count"></span></p>
        <p class="color_ababab"> <span v-text="userCoin.platform_coin_ratio"></span>金币=1平台币，小于<span v-text="userCoin.platform_start_count"></span>平台币不能兑换</p>
      </div>
      <div class="bd_t_03rem"></div>
      <div class="custom">
        <span class="f_s1 color_ababab">自定义：</span>
        <textarea class="custom_input" placeholder="请输入要兑换的平台币数量" ref="customInput" v-model="exchangeCount" v-on:keydown="onlyNum($event)"></textarea>
        <span>平台币</span>
      </div>
      <div class="custom_btn" @click="newExchange">立即兑换</div>
    </div>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  import Head from '../../header/head.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        message: "",
        head: {
          title:"平台币兑换",
          title_but: true
        },
        userCoin: {
          coin: "0", //用户金币数量
          platform_coin_ratio: "0", //平台币与金币兑换币 1平台币=10金币
          platform_start_count: "0",//平台币起兑数量
          cash_count: 0
        },
        exchangeCount: ""
      }
    },
    components: { Head },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getUserCoin();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {
        this.$refs.customInput.focus();
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
      getUserCoin() {
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        //获取签到信息
        this.$http.get('/api/index.php?g=api&m=coin&a=coin_info',{
          params: {
            uid: this.userInfo.id,
            channel: this.myType.channel,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                var data = datas.data;
                data.cash_count = Math.floor(Number(data.coin) / Number(data.platform_coin_ratio));
                this.userCoin = data;
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      onlyNum(event) {
        if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
          if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;
      },
      newExchange() {
        var exchangeCount = Number(this.exchangeCount);
        if(!exchangeCount) {
          this.message = '请输入要兑换的平台币数量';
          this.toast();
          this.$refs.customInput.focus();
        } else if(exchangeCount < 10) {
          this.message = '对不起，不足10平台币不能兑换，请重新输入';
          this.toast();
          this.$refs.customInput.focus();
        } else {
//            兑换平台币请求
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            platform_counts: exchangeCount,
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=platformmoney&a=exchange',{
            params: {
              uid: this.userInfo.id,
              channel: this.myType.channel,
              platform_counts: exchangeCount,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                this.exchangeCount = '';
                this.message = datas.msg;
                this.toast();
                this.getUserCoin();
                this.getUserCenter();
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      //获取用户中心
      getUserCenter(){
        let url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=user_center',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              if(datas.data){
                let data = datas.data;
                let money = {};
                money.coin = data.coin;
                money.platform_money = data.platform_money;
                this.$store.dispatch('setUserMoney',money);
              }
            } else if(datas.msg){
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<style scoped lang="less">
  .exchange{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .exchange_main{
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .my_gold{
        padding: 0 .8rem 1rem;
        & > p{
          padding-top: 1.5rem;
        }
      }
      .custom{
        margin-top: 2rem;
        height: 4rem;
        padding: 0 .8rem;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        & > span{
          height: 1.4rem;
        }
        .custom_input{
          flex: 1;
          resize: none;
          border: none;
          background-color: transparent;
          outline: none;
          height: 1.4rem;
        }
      }
      .custom_btn{
        margin: 3rem 1rem 0;
      }
    }
  }
</style>
