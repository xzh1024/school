<!--签到-->
<template>
  <div class="signing">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_white" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center color_white">
        签到
      </div>
      <div class="head_right">
        <!--<i class="icon_ask" @click="$router.push({path:'/service'})"></i>-->
      </div>
    </div>
    <div class="theme">
      <i></i>
      <span class="color_white">每日签到</span>
    </div>
    <div class="plan">
      <img class="signing_bg" src="../../../static/img/a_icon_beijin.png">
      <div class="plan_info">
        <div class="plan_course">
          <p class="plan_node" v-for="v in signingData.accum_bonus">
            {{ v.num }}天
          </p>
        </div>
        <div class="plan_course plan_count">
          <p class="plan_node" v-for="v in signingData.accum_bonus">
              {{ v.bonus }}
          </p>
        </div>
      </div>
    </div>

    <div class="signing_main">
      <div class="sign_btn" @click="getSign" v-if="signingData.today_is_sign == 0"></div>
      <div class="sign_btn_on" v-if="signingData.today_is_sign != 0"></div>
      <div class="explain small2">
        <div class="m_t_1rem">本月已累计签到<span class="color_blue strong">{{ signingData.sign_counts }}</span>天，继续签到<span class="color_blue strong">{{ isTarget }}</span>天可获得额外奖励</div>
        <div class="m_t_1rem f_s">签到说明：</div>
        <div class="explain_list m_t_0_5rem">
          <p>1.每日签到</p>
          <p class="color_837f7e">普通用户每日签到获取<span v-text="signingData.day_bonus.normal"></span>金币，vip用户额外获得<span v-text="signingData.day_bonus.vip_extra"></span>金币。</p>
          <p>2.累计签到奖励</p>
          <p class="color_837f7e">
            累计签到<span v-text="signingData.accum_bonus[0].num"></span>天，额外获取<span v-text="signingData.accum_bonus[0].bonus"></span>金币，
            累计签到<span v-text="signingData.accum_bonus[1].num"></span>天，额外获取<span v-text="signingData.accum_bonus[1].bonus"></span>金币，
            累计签到<span v-text="signingData.accum_bonus[2].num"></span>天，额外获取<span v-text="signingData.accum_bonus[2].bonus"></span>金币，
            本月全部签到，额获取<span v-text="signingData.accum_bonus[3].bonus"></span>金币。
          </p>
          <p>3.签到规则</p>
          <p class="color_837f7e">签到界面展示本月内累计签到天数，本月签到天数只在本月有效，下个月累计签到天数清零，并重新计数。</p>
          <p>4.签到金币未到账</p>
          <p class="color_837f7e">请在24小时之内练习客服，客服确认信息后，后台给您补发金币。</p>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
//        signRecordBg : 'sign_record_bg0',
        signingData: {
          "day_bonus": { //每日奖金
            "normal": 0, //随机奖金3-10金币
            "vip_extra": 0 //VIP额外66金币
          },
          "accum_bonus": [ //累计奖励
            {
              "num": 3,
              "bonus": 0 //3天20金币
            },
            {
              "num": 7,
              "bonus": 0 //7天50金币
            },
            {
              "num": 15,
              "bonus": 0 //15天100金币
            },
            {
              "num": 31,
              "bonus": 0 //全部签到200金币
            }
          ],
          "sign_counts": 0, //累计签到次数
          "today_is_sign": 0, //今天是否已签到
          "days": 31 //本月天数
        }
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      isTarget: function() { //账户管理
        var sign_counts = Number(this.signingData.sign_counts);
        var accum_bonus_num0 = Number(this.signingData.accum_bonus[0].num),
          accum_bonus_num1 = Number(this.signingData.accum_bonus[1].num),
          accum_bonus_num2 = Number(this.signingData.accum_bonus[2].num),
          accum_bonus_num3 = Number(this.signingData.accum_bonus[3].num);
        if(sign_counts >= accum_bonus_num3){
          sign_counts = 0;
        } else if(sign_counts >= accum_bonus_num2){
          sign_counts = accum_bonus_num3 - sign_counts;
        } else if(sign_counts >= accum_bonus_num1){
          sign_counts = accum_bonus_num2 - sign_counts;
        } else if(sign_counts >= accum_bonus_num0){
          sign_counts = accum_bonus_num1 - sign_counts;
        } else {
          sign_counts = accum_bonus_num0 - sign_counts;
        }
        return sign_counts
      }
    },
    created() {
      this.getSigning();
		},
		mounted(){
			this.$nextTick(function () {
//        console.log(this.$store.getters.userInfo.id);
			});
		},
    methods: {
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
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
            if(datas.status == 1){//1成功
              if(datas.data){
                let data = datas.data;
                let money = {};
                money.coin = data.coin;
                money.platform_money = data.platform_money;
                console.log(money)
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
      //签到信息
      getSigning() {
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=sign&a=sign_init',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.signingData = datas.data;
            } else if(datas.msg){
                this.toast(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //签到
      getSign() {
        if(this.userInfo.id){//是否登录
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=sign&a=do_sign',myUrl)
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                this.getUserCenter();
                this.signingData.today_is_sign = 1;
                this.toast('+' + datas.data + '金币');
                this.getSigning();
              } else if(datas.msg){
                this.toast(datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .signing{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    /*background: url("../../../static/img/a_icon_beijin.png") no-repeat;*/
    /*background-size: contain;*/
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .head{
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
    }
    .theme{
      position: fixed;
      z-index: 10;
      left: 0;
      top: 4.5rem;
      width: 7.5rem;
      height: 2rem;
      background: #44aae1;
      border-radius: 0 1rem 1rem 0;
      display: flex;
      align-items: center;
      i{
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 .5rem;
        background: url("../../../static/img/c_icon_meiriqiandao.png") no-repeat;
        background-size: contain;
      }
      .color_white{
        line-height: 1rem;
      }
    }
    .plan{
      position: relative;
      .signing_bg{
        width: 100%;
      }
      .plan_info{
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        width: 90%;
        height: 5rem;
        margin: 0 5%;
        color: #ffffff;
        .plan_course{
          display: flex;
          justify-content: space-around;
          align-items: center;
          .plan_node{
            width: 4rem;
            height: 1.8rem;
            line-height: 1.8rem;
            border-radius: 0.9rem;
            text-align: center;
            overflow: hidden;
            background-color: transparent;
          }
        }
        .plan_count{
          overflow: hidden;
          margin-top: .5rem;
          background: url("../../../static/img/f_icon_xuxian.png") no-repeat scroll 0/10px;
          background-size: contain;
          .plan_node{
            background-color: #b0caff;
          }
        }
      }
    }
    .signing_main{
      position: relative;
      .explain{
        position: absolute;
        z-index: 1;
        top: -2rem;
        left: 0;
        margin: 0 1rem 2rem;
        padding: .5rem;
        background: #ffffff;
        border-radius: .5rem;
        box-shadow: 0 2px 4px 2px rgba(0,0,0,.12);
        .explain_list{
          p{
            margin-top: .5rem;
          }
        }
      }
      .sign_btn,.sign_btn_on{
        position: absolute;
        z-index: 2;
        top: -4.5rem;
        right: 3rem;
        width: 4rem;
        height: 4rem;
        background: url("../../../static/img/h_icon_qiandao.png") no-repeat;
        background-size: contain;
      }
      .sign_btn_on{
        background: url("../../../static/img/i_icon_yiqian.png") no-repeat;
        background-size: contain;
      }
    }
  }
</style>
