<!--商品购买-->
<template>
  <div class="product_info">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">购买商品</div>
      <div class="head_right"></div>
    </div>
    <div class="main">
      <div class="color_888888" style="padding: .8rem .8rem 0;">商品信息</div>
      <div class="sy border_f0f0f0">
        <div class="sy_l"><img v-if="data.imgs" v-lazy="data.imgs[0]"></img></div>
        <div class="sy_c flex1">
          <div class="sy_c_t">
            <span>{{ data.desc }}</span>
          </div>
          <div class="sy_c_c color_636363 m_t_0_5rem">
            <span class="m_r">{{ data.server_name }}</span>
            <span class="m_l">{{ data.game_name }}</span>
          </div>
          <div class="sy_c_b color_636363 m_t_0_5rem">
            <span class="flex1">{{ data.system|F_system }}</span>
            <span class="color_red">{{ data.price|F_price }}</span>
          </div>
        </div>
      </div>
      <div class="pay border_f0f0f0">
        <div class="color_red f_s1">订单有效支付时间15分钟</div>
        <div class="pay_list">
          <div class="pay_type" @click="payType = 1">
            <div class="pay_type_icon"><i class="icon_zfb"></i></div>
            <span class="flex1">支付宝支付</span>
            <i class="icon_unselected" v-show="payType == 1"></i>
          </div>
          <div class="pay_type" @click="payType = 2">
            <div class="pay_type_icon"><i class="icon_wx"></i></div>
            <div class="flex1">微信支付</div>
            <i class="icon_unselected" v-show="payType == 2"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_btn" @click="startPayment">确认支付</div>
    </div>
	</div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        data: {},
        payType: 1, //支付类型1支付宝，2微信
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ])
    },
    created() {
      console.log(this.traUserInfo);
      this.getProductInfo();
		},
    mounted(){
      this.$nextTick(function () {

      });
    },
    filters: {
      F_system: (type) => {
        if(type == 1){
          type = '安卓';
        } else if(type == 2){
          type = 'ios';
        } else if(type == 3){
          type = '双端';
        } else {
          type = '不限';
        }
        return type;
      },
      F_price: (price) => {
        return price ? '￥' + price : '';
      }
    },
    methods: {
      toast (msg) {
        let msgs = msg || '提示';
        Toast({
          message: msgs,
          duration: 2000,
          className: 'm_toast'
        });
      },
      indicator () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      getProductInfo(){
        let url = this.jointUrl({
          product_id: this.$route.params.id,
          system: this.myType.system,
          uid: 0, //用户ID （重新上架页面必传，商品详情页传0）
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=Products&a=product_info',{
          params: {
            product_id: this.$route.params.id,
            system: this.myType.system,
            uid: 0,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              this.data = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //发起支付
      startPayment(){
        this.indicator();
        var url = this.jointUrl({
          proid: this.$route.params.id,
          buy_id: this.traUserInfo.uid,
          type: this.payType
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          proid: this.$route.params.id,
          buy_id: this.traUserInfo.uid,
          type: this.payType,
          sign: mySign,
          request_type: 2 //请求来源，APP支付可不传，H5支付传2，不参与签名
        });
        this.$http.post('/api/index.php?g=api&m=AccountTrade&a=startPayment',myUrl)
          .then(response => {
            this.endIndicator();
            var datas = response.data;
//            console.log(datas);
            if(datas.status == 1){//1成功
//              console.log('成功');
              window.location.href = datas.data.token;
//              window.open(datas.data.token);
            }
            if(datas.status == 0){//0失败
              this.toast(datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<style scoped lang="less">
  .product_info{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    .main{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      .blurb{
        padding: 0 .7rem .7rem;
        .blurb_li{
          display: flex;
          align-items: center;
        }
      }
      .notice{
        padding: 1rem .7rem;
      }
      .screenshots{
        padding: 1rem .7rem;
        .imgs{
          padding: .5rem .3rem 0;
          img{
            max-width: 100%;
            margin-bottom: 1rem;
          }
        }
      }
      .sy{
        padding-bottom: 1.5rem;
        .sy_l{
          min-width: 8.5rem;
          height: 5rem;
          border-radius: 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .sy_c{
          .sy_c_b{
            display: flex;
          }
        }
      }
      .pay{
        padding: 1rem .8rem;
        .pay_list{
          padding: .5rem;
          .pay_type{
            height: 3rem;
            display: flex;
            align-items: center;
            .pay_type_icon{
              width: 2.5rem;
              display: flex;
              align-items: center;
            }
            .flex1{
              line-height: 1rem;
            }
          }
        }
      }
    }
    .footer{
      padding: .5rem 2rem;
      background-color: #ffffff;
      .footer_btn{
        display: block;
        width: 100%;
        height: 2rem;
        font-size: 1.1rem;
        text-align: center;
        line-height: 2rem;
        border-radius: 1rem;
        color: #ffffff;
        background-color: #29a1f7;
      }
    }
  }
</style>
