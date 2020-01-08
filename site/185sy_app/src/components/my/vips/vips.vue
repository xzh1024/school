<!--超级会员-->
<template>
  <div class="vips">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        超级会员
      </div>
      <div class="head_right"></div>
    </div>
    <div class="vips_main">
      <div class="vips_title">
        <p class="icon_vip_gift"></p>
        <p>超级会员享受更多福利特权</p>
      </div>
      <div class="">
        <div class="option_date">
          <div class="od" v-for="(v,i) in vipOption">
            <div class="od_btn" v-if="i == 0" style="color: #29a1f7;" @click="onClearing(v,i)"><span v-text="v.month"></span>个月</div>
            <div class="od_btn" v-else @click="onClearing(v,i)"><span v-text="v.month"></span>个月</div>
          </div>
        </div>
        <div class="privilege">
          <p>1.购买超级会员立即返还<span class="color_blue" v-text="clearing.ptb"></span>平台币.</p>
          <p>2.超级会员每日签到额外领取<span class="color_blue" v-text="clearing.coin"></span>金币.</p>
          <p>3.开通超级会员，每日游戏好评享三倍奖励.</p>
          <p>4.超级会员更多福利敬请期待</p>
        </div>
      </div>
      <div class="pay_mode bd_t_06rem">
        <!--1支付宝扫码 2支付宝手机 3微信扫码 4微信手机 5财付通网页版保留值,现在不使用 6财付通手机版 7移动充值卡 8电信充值卡 9联通充值卡 10平台币(VIP充值没有平台币选项)-->
        <div class="pay_mode_li border_f0f0f0" @click="onPay(2)">
          <i class="icon_zfb"></i>
          <p class="pay_mode_name">支付宝支付</p>
          <i class="icon_unselected" v-show="payType == 2"></i>
        </div>
        <div class="pay_mode_li border_f0f0f0" @click="onPay(1)">
          <i class="icon_zfb"></i>
          <p class="pay_mode_name">支付宝扫码支付</p>
          <i class="icon_unselected" v-show="payType == 1"></i>
        </div>
        <div class="pay_mode_li border_f0f0f0" @click="onPay(4)">
          <i class="icon_wx"></i>
          <p class="pay_mode_name">微信支付</p>
          <i class="icon_unselected" v-show="payType == 4"></i>
        </div>
        <div class="pay_mode_li border_f0f0f0" @click="onPay(3)">
          <i class="icon_wx"></i>
          <p class="pay_mode_name">微信扫码支付</p>
          <i class="icon_unselected" v-show="payType == 3"></i>
        </div>
        <div class="pay_mode_li border_f0f0f0" @click="onPay(6)">
          <i class="icon_cft"></i>
          <p class="pay_mode_name">财付通支付</p>
          <i class="icon_unselected" v-show="payType == 6"></i>
        </div>
      </div>
    </div>
    <div class="vips_footer">
      <i class="icon_RMB"></i>
      <p class="v_price color_ff7900"><span v-text="clearing.money"></span>元</p>
      <p class="v_regular_price">原价<span v-text="clearing.costMoney"></span>元</p>
      <button class="v_btn" @click="payStart">立即开通</button>
    </div>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
  	data: function () {
      return {
        vipOption: [], //VIP充值配置
        clearing:{
          "month": 0,//充值月数
          "costMoney": 0,//现价
          "money": 0,//所需金额,元
          "ptb": 0,//返还平台币
          "productID": "",//产品ID
          "coin" : 0
        },
        payType: 2,
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getVipOption();
		},
		mounted(){
			this.$nextTick(function () {
//			    console.log(document.querySelectorAll(".od>.od_btn"));
//        document.querySelector(".od>.od_btn").style.color = '#cbb00e';
			});
		},
    methods: {
      //获取VIP充值配置
      getVipOption() {
        this.$http.get('/api/index.php?g=api&m=pay&a=getVipOption')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.vipOption = datas.data;
              this.clearing = datas.data[0];
              this.$nextTick(function(){
//                document.querySelector(".od>.od_btn").style.color = '#cbb00e';
              });
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      onClearing(coll, i){
        this.clearing = coll;
        var btns = document.querySelectorAll(".od>.od_btn");
        for(let i=0,len=btns.length; i < len; i++){
          btns[i].style.color = '';
        }
        btns[i].style.color = '#29a1f7';
      },
      onPay(payType){
        this.payType = payType;
      },
      //VIP发起支付
      payStart(){
          console.log(this.myType.channel)
        var url = this.jointUrl({
          deviceType: this.myType.system,
          appid: this.myType.appid,
          channel: this.myType.channel,
          uid: this.userInfo.id,
          serverID: this.myType.channel,
          serverNAME: "游戏盒子",
          roleID: this.userInfo.id,//角色ID
          roleNAME: this.userInfo.nick_name,//角色名
          productID: this.clearing.productID,
          productNAME: "VIP充值",
          payType: this.payType,
          payMode: 3, //充值类型：1正常充值，2GM权限充值，3VIP充值
          cardID: "",
          cardPass: "",
          cardMoney: "",
          amount: this.clearing.money,//充值金额：单位元，必须整数
          extend: "VIP充值"
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          deviceType: this.myType.system,
          appid: this.myType.appid,
          channel: this.myType.channel,
          uid: this.userInfo.id,
          serverID: this.myType.channel,
          serverNAME: "游戏盒子",
          roleID: this.userInfo.id,//角色ID
          roleNAME: this.userInfo.nick_name,//角色名
          productID: this.clearing.productID,
          productNAME: "VIP充值",
          payType: this.payType,
          payMode: 3, //充值类型：1正常充值，2GM权限充值，3VIP充值
          cardID: "",
          cardPass: "",
          cardMoney: "",
          amount: this.clearing.money,//充值金额：单位元，必须整数
          extend: "VIP充值",
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=pay&a=payStart',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
//                window.open(datas.data.url);
                window.location.href = datas.data.url;
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
      }
    }
  }
</script>

<style scoped lang="less">
  .vips{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .vips_main{
      flex: 1;
      overflow-y: auto;
      .vips_title{
        height: 2.6rem;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
      }
      .option_date{
        padding: 1rem 0 0;
        font-size: 1.1rem;

        display: flex;
        flex-wrap: wrap;//多行
        justify-content: flex-start;
        .od{
          width: 33%;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .od_btn{
            width: 4.5rem;
            height: 2.2rem;
            line-height: 2rem;
            text-align: center;
            border: 1px solid;
            border-radius: .2rem;
          }
        }
      }
      .privilege{
        margin: 0 1.2rem .6rem;
        line-height: 1.6rem;
      }
      .pay_mode{
        .pay_mode_li{
          height: 3rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          padding: 0 .8rem;
          .pay_mode_name{
            flex: 1;
            margin-left: .8rem;
          }
        }
      }
    }
    .vips_footer{
      height: 3.2rem;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      .v_price{
        font-size: 1.2rem;
        font-weight: bold;
      }
      .v_regular_price{
        flex: 1;
        color: #ababab;
        text-decoration: line-through;
        padding-left: 1.5rem;
      }
      .v_btn{
        padding: 0 1.8rem;
        height: 3rem;
        line-height: 3rem;
        color: #fff;
        background-color: #29a1f7;
        border: none;
        border-radius: .2rem;
        margin-right: .6rem;
      }
    }
  }
</style>
