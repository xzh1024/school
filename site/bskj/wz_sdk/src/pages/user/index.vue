<template>
  <div class="container">
    <Header title="用户中心">
      <!--<div slot="left">-->
        <!--<span class="icon-left" @click="$router.go(-1);"></span>-->
      <!--</div>-->
      <div slot="right" class="right">
        <i class="icon-close" @click="app.closeUserCenter"></i>
      </div>
    </Header>
    <div class="main">
      <div class="user">
        <div class="user-icon">
          <img :src=userData.icon_url>
        </div>
        <div class="">
          <div class="user-name">用户名：{{ userData.nick_name ? userData.nick_name : '木有昵称' }}</div>
          <div class="user-mobile">
            <i class="icon-mobile-red"></i>
            <span class="gray">{{ userData.mobile|F_mobile }}</span>
          </div>
        </div>
      </div>
      <Cell :title=money>
        <div slot="left" class="slot-left"><span class="icon icon-coin"></span></div>
        <!--<div slot="right" class="slot-right">-->
        <!--<span class="gray">充值</span>-->
        <!--<span class="icon-right"></span>-->
        <!--</div>-->
      </Cell>
      <Cell title="消费记录" @click.native="$router.push({path: '/playercashlog'})">
        <div slot="left" class="slot-left"><span class="icon icon-money"></span></div>
        <div slot="right" class="slot-right"><span class="icon-right"></span></div>
      </Cell>
      <Cell title="修改密码" @click.native="$router.push({path: '/passwd'})">
        <div slot="left" class="slot-left"><span class="icon icon-password"></span></div>
        <div slot="right" class="slot-right"><span class="icon-right"></span></div>
      </Cell>
      <Cell title="隐藏浮标" @click.native="hideDrogue">
        <div slot="left" class="slot-left"><span class="icon icon-hide"></span></div>
        <div slot="right" class="slot-right"><span class="icon-right"></span></div>
      </Cell>
      <Cell title="退出登录" @click.native="logout">
        <div slot="left" class="slot-left"><span class="icon icon-logout"></span></div>
        <div slot="right" class="slot-right"><span class="icon-right"></span></div>
      </Cell>
      <Cell title="玩转游戏APP" @click.native="openApp">
        <div slot="left" class="slot-left"><span class="icon-logo"></span></div>
        <div slot="right" class="slot-right">
          <span class="red">打开</span>
          <span class="icon-right"></span>
        </div>
      </Cell>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { MessageBox } from 'mint-ui';
  import Header from '@/components/header'
  import Tabbar from '@/components/tabbar'
  import Cell from '@/components/cell'
export default {
  data () {
    return {
      money: '余额：0'
    }
  },
  components:{ Tabbar, Header, Cell },
  created(){
    this.money = '余额：' + this.userData.money
  },
  mounted(){
    this.$nextTick(function () {

    });
  },
  computed: { //计算属性
    ...mapGetters([
      'userData'
    ])
  },
  filters: {
    F_mobile: (mobile) => {
      return mobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
    }
  },
  methods: {
      messageBox () {
        MessageBox({
          title: '浮标隐藏',
          message: '游戏内将不再显示浮标，退出游戏登录可恢复显示'
        });
      },
//      closeUserCenter(){
//        this.app.closeUserCenter();
//      },
      hideDrogue(){
        MessageBox.confirm('游戏内将不再显示浮标，退出游戏登录可恢复显示', '浮标隐藏',{
          confirmButtonText: '隐藏',
//          confirmButtonHighlight: true,
          confirmButtonClass: 'red',
//          cancelButtonHighlight: true,
          cancelButtonClass: 'blue'
        }).then(({ value, action }) => {
//          this.userDesc.qq = value;
//          this.editDescFlag = true;
          this.app.hideFloat();
        });
      },
    getUserData(){
      let options = {
        uid: 18
      };
      options.sign = this.util.getSign(options);
      let params = this.util.jointUrl(options);
      this.axios.post('/api/index.php?g=api&m=userbox&a=user_center',params)
        .then(response => {
          var datas = response.data;
          if(datas.status === 1){
            if(datas.data){
                var data = datas.data;
              data.money = '余额：' + data.money;
                this.userData = data;
            }
          }
          if(datas.status === 0){
            console.log(datas.msg);
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openApp(){
      this.app.openBox();
    },
    logout(){
      this.app.logout();
    }
  },
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
      .user{
        height: 6rem;
        /*padding: 0 1em;*/
        display: flex;
        align-items: center;
        border-bottom: 3px solid #f0f0f0;
        .user-icon{
          display: inline-block;
          width: 3.5rem;
          height: 3.5rem;
          /*padding: 0 1em 0 .5em;*/
          margin: 0 1em 0 .5em;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50% 50%;
          }
        }
        .user-name{

        }
        .user-mobile{
          display: flex;
          align-items: center;
          margin-top: .5em;
          .icon-mobile-red{
            display: inline-block;
            width: 1rem;
            height: 1.2rem;
            background: url("../../static/img/user/a_icon_shouji.png") no-repeat;
            background-size: contain;
          }
        }
      }


      .slot-left{
        padding-right: 1em;
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .slot-right{
        display: flex;
        align-items: center;
        .icon-right{
          margin-left: 1em;
        }
      }
      .icon{
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
      }
      .icon:after{
        content: ' ';
        width: 2rem;
        height: .5rem;
        background: url("../../static/img/a_icon_tuoyuan.png") no-repeat;
        background-size: contain;
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translate(-50%, 80%);
      }
      .icon-coin{
        background: url("../../static/img/user/a_icon_jinbi.png") no-repeat;
        background-size: contain;
      }
      .icon-money{
        height: 1.1rem;
        background: url("../../static/img/user/a_icon_xiaofeijilu.png") no-repeat;
        background-size: contain;
      }
      .icon-password{
        width: 1.3rem;
        background: url("../../static/img/user/a_icon_xiugaimima.png") no-repeat;
        background-size: contain;
      }
      .icon-hide{
        height: 1.2rem;
        background: url("../../static/img/user/a_icon_yingcangfubiao.png") no-repeat;
        background-size: contain;
      }
      .icon-logo{
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url("../../static/img/a_icon_wanzhuan.png") no-repeat;
        background-size: contain;
      }
      .icon-logout{
        display: inline-block;
        width: 1.5rem;
        height: 1.3rem;
        background: url("../../static/img/user/a_icon_tuichu.png") no-repeat;
        background-size: contain;
      }
    }
  }
</style>
