<!--商品详情-->
<template>
  <div class="product_info">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">商品详情</div>
      <div class="head_right"></div>
    </div>
    <div class="main">
      <div class="sy border_f0f0f0">
        <img v-lazy="data.game_logo" class="sy_l"></img>
        <div class="sy_c">
          <div class="sy_c_t">
            <span v-text="data.game_name"></span>
          </div>
          <div class="sy_c_b">
            <span>161.68M</span>
          </div>
        </div>
        <div class="sy_r">
          <span class="sy_r_rebate small2" @click.stop="$router.push({path:'/game_info/'+data.box_gameid})">
            下载
          </span>
        </div>
      </div>
      <div class="blurb border_f0f0f0">
        <div class="blurb_li m_t_1rem">
          <div class="flex1"><span>所在区服：</span><span>{{ data.server_name }}</span></div>
          <div>售价</div>
        </div>
        <div class="blurb_li m_t_1rem">
          <div class="flex1"><span>平台：</span><span>{{ data.system|F_system }}</span></div>
          <div class="color_red">{{ data.price|F_price }}</div>
        </div>
        <div class="small3 m_t_1rem">
          <p class="color_black">此账号创建于2018年03月23日，当前游戏已充值{{ data.pay_money }}元</p>
          <p class="color_blue m_t_0_5rem">*此账号已经经过185官方审核，请放心购买</p>
        </div>
      </div>
      <div class="notice border_f0f0f0">
        <div>详细描述<span class="small3 color_888888">(如描述与截图有出入请以截图为准)</span></div>
        <div class="small1 color_black m_t_0_5rem">{{ data.desc }}</div>
      </div>
      <div class="screenshots border_f0f0f0">
        <div>游戏截图<span class="small3 color_888888">(点击可看大图)</span></div>
        <div class="imgs">
          <!--<img v-for="v in data.imgs" :src="v">-->
          <img class="wc-preview-img" v-for="(url, key) in data.imgs" :key="key" :src="url" @click.stop="$preview($event, data.imgs, key)">
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_btn" @click="popout = true;">立即购买</div>
    </div>

    <div class="popout" v-show="popout">
      <div class="popout_box">
        <div class="popout_title">
          交易细则
        </div>
        <div class="popout_main">
          <div>
            <div class="t_title">出售流程</div>
            <div class="flow border_eee">
              <div class="flow_guide1">
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_line"></div>
              </div>
              <div class="flow_guide2">
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_tijiao-shangpiing.png" alt="">
                  <div class="flow_guide2_only_text">选择商品</div>
                </div>
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_shenghedongjie.png" alt="">
                  <div class="flow_guide2_only_text">购买商品</div>
                </div>
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_maijiagoumai.png" alt="">
                  <div class="flow_guide2_only_text">提取账号</div>
                </div>
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_huodeshouyi.png" alt="">
                  <div class="flow_guide2_only_text">交易成功</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="t_title">买家须知</div>
            <div class="notes">
              <div class="notes_only" v-for="(v,i) in notesData.buyer_notes">
                <p class="notes_only_num">{{ i+1 }}</p>
                <p class="notes_only_text">{{ v }}</p>
              </div>
            </div>
            <div class="t_title">如遇到以下情况，请警惕是骗子</div>
            <div class="notes">
              <div class="notes_only" v-for="(v,i) in notesData.business_notice">
                <p class="notes_only_num">{{ i+1 }}</p>
                <p class="notes_only_text">{{ v }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="popout_footer">
          <div class="user_agreement">
            <p v-if="agreement" @click="agreement = !agreement">
              <i class="icon_checked"></i>
              <span class="color_666666 m_l">我已阅读交易细则</span>
            </p>
            <p v-else-if="!agreement" @click="agreement = !agreement">
              <i class="icon_unchecked"></i>
              <span class="color_666666 m_l">我已阅读交易细则</span>
            </p>
          </div>
          <div class="user_agreement_btn">
            <div class="btn_blue_ye" v-bind:style="{background:btnBgColor}" @click="onRouter">我记住了</div>
          </div>
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
        data: {},
        popout: false,
        agreement: false,
        notesData: {},
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ]),
      btnBgColor: function () {
        return this.agreement ? '#29a1f7' : '#bbbbbb';
      },
    },
    created() {
      this.getProductInfo();
      this.getNotes();
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
      onRouter(){
        if(this.agreement){
//          this.popout = false;
          this.$router.push({path:'/tra_product_buy/'+ this.$route.params.id});
        }
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
      //交易初始化
      getNotes(){
        this.$http.get('/api/index.php?g=api&m=Products&a=trade_notes')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.notesData = datas.data;
            } else if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
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

    .popout{
      position: fixed;
      z-index: 1000000;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.3);
      display: flex;
      .popout_box{
        flex: 1;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .popout_title{
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          color: #ffffff;
          background-color: #29a1f7;
        }
        .popout_main{
          width: 100%;
          flex: 1;
          background-color: #ffffff;
          overflow-y: auto;
          .t_title{
            height: 1.4rem;
            line-height: 1.4rem;
            font-size: 1.1rem;
            color: #000000;
            padding: 0 .7rem;
            margin-top: 1rem;
          }
          .flow{
            padding: 0 .7rem 1rem;
            .flow_guide1{
              display: flex;
              align-items: center;
              position: relative;
              z-index: 1;
              .flow_guide1_only{
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .flow_guide1_point{
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                position: relative;
                z-index: 5;
                border: 1rem solid #ffffff;
                background: #ffffff url("../../../static/img/c_icon_liuchengdian.png") no-repeat;
                background-size: 100% 100%;
              }
              .flow_guide1_line{
                display: inline-block;
                width: 70%;
                border-bottom: 1px dashed #2a9bf4;
                position: absolute;
                z-index: 2;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
              }
            }
            .flow_guide2{
              display: flex;
              align-items: center;
              .flow_guide2_only{
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .flow_guide2_only_icon{
                  width: 2.2rem;
                }
                .flow_guide2_only_text{
                  font-size: .85rem;
                  height: 1.8rem;
                  line-height: 1.8rem;
                }
              }
            }
          }
          .notes{
            padding: .7rem;
            .notes_only{
              display: flex;
              margin-bottom: 1rem;
              .notes_only_num{
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                font-size: .89rem;
                color: #ffffff;
                border-radius: .6rem;
                background-color: #d7d7d7;
                margin: 0 .5rem;
              }
              .notes_only_text{
                flex: 1;
                font-size: .89rem;
                line-height: 1.2rem;
                color: #666666;
              }
            }
          }
        }
        .popout_footer{
          background-color: #ffffff;
          .user_agreement{
            padding: 0 .6rem;
            display: flex;
            align-items: center;
            p{
              display: flex;
              align-items: center;
            }
          }
          .user_agreement_btn{
            margin: 1rem auto;
            display: flex;
            align-items: center;
            justify-content: center;
            .btn_blue_ye{
              border: none;
            }
          }
        }
      }
    }
  }
</style>
