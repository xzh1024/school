<!--金币抽奖-->
<template>
  <div class="lottery">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        金币抽奖
      </div>
      <div class="head_right">
        <span @click="$router.push({path:isPrize})">我的奖品</span>
      </div>
    </div>
    <div class="lottery_main" v-if="needcoin">
      <div class="exhibitors">
        <div class="e_hint">*每次抽奖消耗<span>{{ needcoin }}</span>金币</div>
        <div class="e_title">中奖名单</div>
        <div class="e_list" id="prizerList">
          <ul id="prizerList1">
            <li v-for="v in luckyList">恭喜<span>{{ v.username }}</span>刚刚抽到了<span>{{ v.name }}</span></li>
          </ul>
          <ul id="prizerList2"></ul>
        </div>
      </div>
      <div class="dial">
        <div id="blink" class="shanDeng" ref="blink">
          <table v-if="prizeList[1]">
            <tbody>
            <tr>
              <td class="luck-unit" :id="prizeList[1].place">
                <img :src="prizeList[1].url">
              </td>
              <td class="luck-unit" :id="prizeList[2].place">
                <img :src="prizeList[2].url">
              </td>
              <td class="luck-unit" :id="prizeList[3].place">
                <img :src="prizeList[3].url">
              </td>
              <td class="luck-unit" :id="prizeList[4].place">
                <img :src="prizeList[4].url">
              </td>
            </tr>
            <tr>
              <td class="luck-unit" :id="prizeList[12].place">
                <img :src="prizeList[12].url">
              </td>
              <td rowspan="2" colspan="2" class="cjBtn" @click="lottery($event)"></td>
              <!--<td>7</td>-->
              <td class="luck-unit" :id="prizeList[5].place">
                <img :src="prizeList[5].url">
              </td>
            </tr>
            <tr>
              <td class="luck-unit" :id="prizeList[11].place">
                <img :src="prizeList[11].url">
              </td>
              <!--<td>10</td>-->
              <!--<td>11</td>-->
              <td class="luck-unit" :id="prizeList[6].place">
                <img :src="prizeList[6].url">
              </td>
            </tr>
            <tr>
              <td class="luck-unit" :id="prizeList[10].place">
                <img :src="prizeList[10].url">
              </td>
              <td class="luck-unit" :id="prizeList[9].place">
                <img :src="prizeList[9].url">
              </td>
              <td class="luck-unit" :id="prizeList[8].place">
                <img :src="prizeList[8].url">
              </td>
              <td class="luck-unit" :id="prizeList[7].place">
                <img :src="prizeList[7].url">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        user: {
          icon_url: '',
          nick_name: '',
          username: '',
          user_id: 0
        },
        lotteryFlag: false,
        messageBoxMessage: '',
        needcoin: 0,
        prizeList: {}, //奖品列表
        lukUnit: [],
        luckyList: [], //中奖列表
        timer1: '',
        timer2: ''
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      isPrize: function() { //账户管理
        return this.userInfo.id == 0 ? 'login' : 'prize';
      }
    },
    created() {
      this.getLuckydraw();//获取抽奖信息
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      messageBox() {
        MessageBox({
          title: '提示',
          message: this.messageBoxMessage,
          showCancelButton: false
        });
      },
      //获取抽奖信息
      getLuckydraw() {
        this.$http.get('/api/index.php?g=api&m=luckydraw&a=testLD')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                this.needcoin = datas.data.needcoin;
                this.luckyList = datas.data.luckydraw_info;
                if(this.luckyList.length > 3){
                  this.prizerListScroll();//大于3时中奖名单滚动
                }
                this.prizeList = datas.data.luckydraw_data;
                this.$nextTick(function () {
                  //闪灯效果
                  let blink = this.$refs.blink;
                  setInterval(()=>{
                    blink.className == 'shanDeng' ? blink.className='shanDeng2':blink.className='shanDeng';
                  },500);
                  //转动顺序
                  this.lukUnit[0] = document.getElementById(this.prizeList[1].place);
                  this.lukUnit[1] = document.getElementById(this.prizeList[2].place);
                  this.lukUnit[2] = document.getElementById(this.prizeList[3].place);
                  this.lukUnit[3] = document.getElementById(this.prizeList[4].place);
                  this.lukUnit[4] = document.getElementById(this.prizeList[5].place);
                  this.lukUnit[5] = document.getElementById(this.prizeList[6].place);
                  this.lukUnit[6] = document.getElementById(this.prizeList[7].place);
                  this.lukUnit[7] = document.getElementById(this.prizeList[8].place);
                  this.lukUnit[8] = document.getElementById(this.prizeList[9].place);
                  this.lukUnit[9] = document.getElementById(this.prizeList[10].place);
                  this.lukUnit[10] = document.getElementById(this.prizeList[11].place);
                  this.lukUnit[11] = document.getElementById(this.prizeList[12].place);
                  this.lotteryFlag = true;//准备完毕
                });
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
      // 获奖名单滚动
      prizerListScroll () {
        this.$nextTick(() => {
          var prizerList2 = document.getElementById('prizerList2')
          var prizerList1 = document.getElementById('prizerList1')
          var prizerList = document.getElementById('prizerList')
          prizerList2.innerHTML = prizerList1.innerHTML;
          setInterval(() => {
            // if (this.prizerList.scrollTop >= (this.prizerList1.offsetHeight - this.prizerList.offsetHeight)) {
            if (prizerList.scrollTop >= prizerList1.offsetHeight) {
              prizerList.scrollTop = 0
            } else {
              prizerList.scrollTop++
            }
          }, 30)
        })
      },
      //抽奖
      lottery(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        target.className = 'cjBtnDom';
        setTimeout(()=>{
          target.className = 'cjBtn';
        },200);
        if(this.lotteryFlag){
          this.lotteryFlag = false;
          if(this.userInfo.coin-100 >= 0){
            let lukUnit = this.lukUnit;
//            let speed = 100; //转动速度
            let active = 0; //选中项
            let CNT = 0; // 计数器
            let place = ''; //中奖项

            //获取中奖结果
            var url = this.jointUrl({
              uid: this.userInfo.id
            });
            this.$http.post('/api/index.php?g=api&m=luckydraw&a=luckydraw','uid='+this.userInfo.id)
              .then(response => {
                var datas = response.data;
                console.log(datas)
                if(datas.status == 1){//1成功
                  if(datas.data){
                    place = parseInt(datas.data.place);
                    this.messageBoxMessage = datas.msg;
                    this.getUserCenter();
                  }
                } else if(datas.msg){//0失败
                  console.log('请求失败：' + datas.msg);
                }
              })
              .catch(error => {
                console.log('请求失败：' + error.status + '，' + error.statusText);
              });
//            setTimeout(() => {
//              function RandomNum(Min,Max){
//                var Range = Max - Min;
//                var Rand = Math.random();
//                var num = Min + Math.round(Rand * Range);
//                return num;
//              }
//              place = RandomNum(0,11);
//              this.messageBoxMessage = place;
//            },3000);
            // 降速
            var lowSpeed = ()=>{
              clearInterval(this.timer1)
              this.timer2 = setInterval(() => {

                if(active == place){//停止在中奖项
                  var timer3 = setTimeout(() => {
                    for(let i=0,len=lukUnit.length; i < len; i++){
                      lukUnit[i].className = '';
                    }
                    lukUnit[place].className = 'active';
                    this.messageBox();
                    this.lotteryFlag = true; //继续抽奖
                    clearTimeout(timer3);
                  }, 500);
                  clearInterval(this.timer2);
                }

                for(let i=0,len=lukUnit.length; i < len; i++){
                  lukUnit[i].className = '';
                }
                lukUnit[active].className = 'active';

                if(active < lukUnit.length-1){
                  ++active;
                } else {
                  active = 0;
                }
                console.log('active:'+active+' '+'place:'+place)
              }, 500);
            };
            this.timer1 = setInterval(() => {
              for(let i=0,len=lukUnit.length; i < len; i++){
                lukUnit[i].className = '';
              }
              lukUnit[active].className = 'active';
              if(active < lukUnit.length-1){
                active++;
              } else {
                active = 0;
              }
              console.log(active)
              if(CNT >= 49){ //保证转动4圈
                if(place >= 0){
                  lowSpeed();//降速
                }
              } else {
                ++CNT;
              }
            },100);
            this.getUserCenter();
          } else {
            this.messageBoxMessage = '抽奖金币不足';
            this.messageBox();
            this.lotteryFlag = true;
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .lottery{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .cancel_all{
      display: inline-block;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 1rem;
      color: #fff;
      background-size: contain;
      position: absolute;
      top:0.78rem;
      right: 1rem;
    }
    .lottery_main{
      flex: 1;
      overflow-y: auto;
      background: url("../../../static/img/cjbg.jpg");
      background-size: 100% 100%;
      .exhibitors{
        margin: 1.5rem 1rem;
        padding: .5rem 0 1rem;
        border-radius: .4rem;
        background-color: #f7f8e5;
        font-size: 1.1rem;
        .e_hint,.e_title{
          color: #d32833;
          text-align: center;
        }
        .e_list{
          height: 6rem;
          line-height: 2rem;
          margin: .6rem 1.6rem 0;
          color: #b9925b;
          overflow: hidden;
        }
      }
      .dial{
        width: 23rem;
        height: 23.3rem;
        margin: 10% auto 0;
        background: url("../../../static/img/case.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 1rem;
      }
      #blink{
        border: 1px solid transparent;
        width: 23rem;
        height: 23rem;
        table{
          width: 20rem;
          height: 2rem;
          margin: 1.5rem;
          tbody{
            width: 20rem;
            height: 20rem;
            border: 1px solid transparent;
            tr{
              width: 20rem;
              height: 5rem;
              td{
                width: 5rem;
                height: 5rem;
                text-align: center;
                vertical-align: middle;
                background: url("../../../static/img/proBj.png") no-repeat;
                background-size: 100% 100%;
                img{
                  width: 80%;
                }
              }
              .active{
                background: url("../../../static/img/active.png") no-repeat;
                background-size: 100% 100%;
              }
              .cjBtn{
                background: url("../../../static/img/buttonUp.png") no-repeat;
                background-size: 100% 100%;
              }
              .cjBtnDom{
                background: url(../../../static/img/buttonDown.png) no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .shanDeng{
        background-image: url(../../../static/img/shandeng1.png);
        background-size: 100% 100%;
      }
      .shanDeng2{
        background-image: url(../../../static/img/shandeng2.png);
        background-size: 100% 100%;
      }
    }
  }
</style>
