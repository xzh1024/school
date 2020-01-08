<template> <!--我的-->
  <div class="my" v-if="JSON.stringify(userData) != '{}'">
    <div class="header">
      <div class="operate">
        <i class="icon_set" @click="$router.push({path:'/accounts'})"></i>
      </div>
      <div class="user">
        <div>
          <img :src="userData.icon_url" class="user-img">
        </div>
        <ul class="user-info">
          <li class="user-li">{{ userData.nick_name }}<span class="membership" :class="{membership1:userData.membership == 1, membership2:userData.membership == 2, membership3:userData.membership == 3}" @click="$router.push({path:'/profit_rule'})"></span></li>
          <li class="user-li m_t_0_5rem">邀请码：<span>{{ userInfo.invitation_code }}</span><span class="btn-copy"
                                                                                              v-clipboard:copy="userInfo.invitation_code"
                                                                                              v-clipboard:success.stop="onCopy"
                                                                                              v-clipboard:error.stop="onError">复制</span></li>
        </ul>
      </div>
      <div class="fans">玩粉&nbsp;<span>{{ userData.fans_number }}</span></div>
      <div class="wallet">
        <div class="wallet-info">
          <div>余额&nbsp;￥<span>{{ userData.money }}</span></div>
          <div @click="$router.push({path:'/settlement'})">每月25号结算上月收入&nbsp;&gt;</div>
        </div>
        <div class="wallet-btn" @click="$router.push({path:'/start_cash'})">立即提现</div>
      </div>
    </div>
    <div class="main">
      <div class="wrap wrap-earnings">
        <ul class="earnings">
          <li>
            <div>￥<span>{{ userData.month_commission }}</span></div>
            <div>本月收益</div>
          </li>
          <li>
            <div>￥<span>{{ userData.today_commission }}</span></div>
            <div>今日收益</div>
          </li>
        </ul>
        <ul class="earnings">
          <li>上月结算￥<span>{{ userData.lastmonth_withdraw }}</span></li>
          <li>上月收益￥<span>{{ userData.lastmonth_commission }}</span></li>
        </ul>
      </div>
      <div class="wrap" v-if="userData.ad_one && userData.ad_one.length > 0" v-for="(item, index) in userData.ad_one">
        <img class="img" :src="item.slide_pic">
      </div>
      <div class="wrap">
        <ul class="nav">
          <li @click="$router.push({path: '/profit'})">
            <i class="menu-icon icon-money-earnings"></i>
            <span class="nav-text">收益</span>
          </li>
          <li>
            <i class="menu-icon icon-order"></i>
            <span class="nav-text">订单</span>
          </li>
          <li @click="$router.push({path: '/fans_list'})">
            <i class="menu-icon icon-user-fans"></i>
            <span class="nav-text">玩粉</span>
          </li>
          <li>
            <i class="menu-icon icon-users"></i>
            <span class="nav-text">邀请</span>
          </li>
        </ul>
      </div>
      <div class="wrap">
        <div class="nav-title">后台支持</div>
        <ul class="nav">
          <li>
            <i class="nav-icon icon-purse"></i>
            <span class="nav-text">返利申请</span>
          </li>
          <li @click="$router.push({path: '/recharge_calculator'})">
            <i class="nav-icon icon-money-calculator"></i>
            <span class="nav-text">佣金计算器</span>
          </li>
          <li @click="$router.push({path: '/ranklist'})">
            <i class="nav-icon icon-ranking"></i>
            <span class="nav-text">排行榜</span>
          </li>
          <li @click="$router.push({path: '/service'})">
            <i class="nav-icon icon-service"></i>
            <span class="nav-text">客户服务</span>
          </li>
        </ul>
      </div>
      <div class="wrap">
        <div class="nav-title">我的工具</div>
        <ul class="nav">
          <li @click="$router.push({path: '/faq'})">
            <i class="nav-icon icon-question"></i>
            <span class="nav-text">常见问题</span>
          </li>
          <li @click="$router.push({path: '/official_announce'})">
            <i class="nav-icon icon-announcement"></i>
            <span class="nav-text">官方公告</span>
          </li>
          <li @click="$router.push({path: '/opinion'})">
            <i class="nav-icon icon-feedback"></i>
            <span class="nav-text">意见反馈</span>
          </li>
          <li>
            <i class="nav-icon icon-exclamatory-mark"></i>
            <span class="nav-text">关于我们</span>
          </li>
        </ul>
      </div>
      <div class="wrap" v-if="userData.ad_two && userData.ad_two.length > 0" v-for="(item, index) in userData.ad_two">
        <img class="img" :src="item.slide_pic">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Toast } from 'mint-ui';
  export default {
    name: 'no_keep',
    data: function () {
      return {
        userData:{}// v-if="JSON.stringify(userData) != '{}';"
      }
    },
//    components:{ MainTab },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      setUrl: function() { //账户管理
        return this.userInfo.uid ? '/accounts' : '/login';
      }
    },
    created(){
        console.log(this.userInfo);
      if(!this.userInfo.uid){
          this.$router.push({path: '/login'});
      } else {
          this.getUserContent();
      }
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    watch: {//使用watch 监听$router的变化
//      $route( to , from ){
//        if(!this.userInfo.uid){
//            console.log('hhh哈哈啊')
//          this.$router.push({path: '/index/game'});
//        }
//      }
    },
    methods: {
      toast (msg) {
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      onCopy: function (e) {
        this.toast('复制成功');
      },
      onError: function (e) {
        this.toast('Failed to copy texts');
      },
      getUserContent(){
        var url = this.jointUrl({
          uid: this.userInfo.uid
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.uid,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=user_center',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
              this.userData = datas.data;
            }
            if(datas.status == 0){//0失败
              this.toast(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    },
    filters: {	//自定义局部过滤器
      F_membership: (data) => {
        ////会员级别 1 普通会员 2 超级会员 3 钻石会员 4顶级代理
        if(data == 1) return '普通会员';
        if(data == 2) return '超级会员';
        if(data == 3) return '钻石会员';
        if(data == 4) return '顶级代理';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .my{
    flex: 1;
    color: #555555;
    /*overflow-y: auto;*/
    display: flex;
    flex-direction: column;
    .header{
      color: #ffffff;
      background-color: #ff5244;
      padding: 2rem 1rem 0;
      position: relative;
      .operate{
        position: absolute;
        right: 1rem;
        top: 1rem;
      }
      .user{
        display: flex;
        align-items: center;
        .user-img{
          width: 4rem;
          height: 4rem;
          border-radius: 50% 50%;
          border: 1px solid #ffffff;
        }
        .user-info{
          margin-left: .5rem;
          li{
            display: flex;
            align-items: center;
            .btn-copy{
              height: 1.5rem;
              line-height: 1.5rem;
              border-radius: 0.75rem;
              padding: 0 1rem;
              color: #eeeeee;
              background-color: rgba(255, 255, 255, 0.2);
              margin-left: 1rem;
            }
            .membership{
              display: inline-block;
              width: 7.5rem;
              height: 2rem;
              margin-left: 1rem;
            }
            .membership1{ background: url("../../static/img/wz/a_icon_putonghuiyuan.png"); background-size: 100% 100%;}
            .membership2{ background: url("../../static/img/wz/a_icon_chaojihuiyuan.png"); background-size: 100% 100%;}
            .membership3{ background: url("../../static/img/wz/a_icon_zhuanshihuiyuan.png"); background-size: 100% 100%;}
          }
        }
      }
      .fans{
        margin-top: 1rem;
        padding: 0 1rem;
      }
      .wallet{
        margin-top: 1rem;
        background: #5a5a5a;
        padding: .5rem 2rem;
        border-radius: 1rem 1rem 0 0;
        display: flex;
        align-items: center;
        .wallet-info{
          flex: 1;
        }
        .wallet-btn{
          background-color: #ffe9a5;
          padding: .3rem .6rem;
          color: #555555;
          border-radius: .5rem;
          font-size: 1.1rem;
        }
      }
    }
    .main{
      flex: 1;
      overflow-y: auto;
      background-color: #f0f0f0;
      padding: 0 1rem;
      .wrap{
        background-color: #ffffff;
        border-radius: .6rem;
        margin-bottom: 1rem;
        overflow: hidden;
      }
      .wrap-earnings{
        border-radius: 0 0 .6rem .6rem;
      }
      .earnings{
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        li{
          flex: 1;
          line-height: 2.5rem;
          text-align: center;
        }
      }
      /*.clearing{*/
        /*border-bottom: 1px solid #f0f0f0;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*li{*/
          /*flex: 1;*/
        /*}*/
      /*}*/
      .img{
        width: 100%;
        height: 6rem;
      }
      .nav-title{
        font-size: 1.1rem;
        border-bottom: 1px solid #f0f0f0;
        padding: .5rem 1rem;
      }
      .nav{
        display: flex;
        align-items: center;
        padding: 1rem 0;
        li{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .nav-icon,.menu-icon{
            display: inline-block;
            width: 3rem;
            height: 3rem;
            position: relative;
          }
          .nav-icon:after{
            content: ' ';
            width: 3rem;
            height: .5rem;
            background: url("../../static/img/wz/a_icon_tubiaodi.png") no-repeat;
            background-size: contain;
            position: absolute;
            left: 50%;
            top: 100%;
            transform: translate(-50%, 100%);
          }
          .nav-text,.menu-text{
            margin-top: 1rem;
          }
          .icon-reflection{
            margin-top: 1rem;
          }
        }
      }
    }
  }
</style>

