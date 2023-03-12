<template>
  <div class="settlement">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        佣金结算明细
      </div>
      <div class="head_right">
        <i class="icon-notepad"  @click="openDatetime('picker1')"></i>
        <i class="icon-question-black" @click="messageBox({
          title: '什么是结算佣金',
          message: '这里的结算佣金是当月所拥有的订单'
        })"></i></div>
    </div>
    <div v-if="list.length > 0" class="main">
      <div class="list">
        <!--<div class="item">-->
          <!--<div class="item-l">-->
            <!--<img class="item-logo" src="../../../static/img/wz/settlement/a_icon_yaoqing.png">-->
          <!--</div>-->
          <!--<div class="item-c">-->
            <!--<div class="f_s1">武侠大宗师</div>-->
            <!--<div class="small1 color_888888">2018/06/20 11:37:20</div>-->
          <!--</div>-->
          <!--<div class="item-r">-->
            <!--<div class="color_blue">佣金</div>-->
            <!--<div class="item-btn">￥+50</div>-->
          <!--</div>-->
        <!--</div>-->

        <div class="item" v-for="item in list">
          <div class="item-l">
            <img class="item-logo" v-lazy="item.icon">
            <!--<span v-else class="item-logo" :class="item.icon"></span>-->
          </div>
          <div class="item-c">
            <div class="f_s1">{{ item.name }}</div>
            <div class="small1 color_888888">{{ item.time }}</div>
          </div>
          <div class="item-r">
            <div class="color_blue">佣金</div>
            <div class="item-btn">￥+{{ item.money }}</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <span>{{yeae}}</span>年<span>{{month}}</span>月佣金收入&nbsp;￥+{{ count }}
      </div>
    </div>
    <div v-else class="zero">
      <img src="../../../static/img/wz/bg/a_meiyou-gengduoneirong-.png">
    </div>

    <mt-datetime-picker
      ref="picker1"
      type="date"
      v-model="birthdayValue"
      year-format="{value} 年"
      month-format="{value} 月"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="setDatetime">
    </mt-datetime-picker>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { Toast, MessageBox, Picker, DatetimePicker } from 'mint-ui';
  export default {
    name: 'no_keep',
    data: function () {
      return {
        activeTime: Date.parse(new Date())/1000,
        page: 1,
        list: [],
        count: 0,
        birthdayValue: new Date(),//日期初始值
        startDate: new Date('2018-12'),
        endDate: new Date(),
        yeae: new Date().getFullYear(),
        month: (new Date().getMonth())+1,
      }
    },
    created() {
      this.getSettlement();
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
      messageBox(msgObj){
        MessageBox({
          title: msgObj.title,
          message: msgObj.message,
          confirmButtonText: '知道了',
          confirmButtonClass: 'mint-msgbox-confirm-red',
          closeOnClickModal: false
        });
      },
      openDatetime(picker) {
        this.$refs[picker].open();//显示日期表
      },
      //生日
      setDatetime(value){
//          var date = Date.parse(new Date(value))/1000;
//        this.activeTime = Date.parse(new Date(value))/1000;
        var time = new Date(value);
        this.activeTime = Date.parse(time)/1000;
        this.page = 1;
        this.list = [];
        this.getSettlement();
        this.yeae = time.getFullYear();
        this.month = (time.getMonth())+1;

//        console.log(this.myType.formatTime(Date.parse(value), 'M'));
//        this.userDesc.birth = this.myType.formatTimeD(Date.parse(value));
//        this.editDescFlag = true;
//        console.log(this.userDesc.birth);
      },
      getSettlement(){
//        this.time = new Date();
//        var time = Date.parse(new Date());
        var url = this.jointUrl({
          uid: this.userInfo.uid,
          time: this.activeTime,
          page: this.page
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.uid,
          time: this.activeTime,
          page: this.page,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=Commission&a=settlement',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
//              this.userData = datas.data;
//              this.profitData = datas.data;
//              var list = [ //明细
//                {
//                  "money": "0.20",
//                  "type": "1",// 1注册2充值，3普通会员，4超级会员，5钻石会员，6评论;充值类型会返回游戏图标,其他类型用本地图标
//                  "time": "1544411075",
//                  "icon": "",//type为2是返回游戏图标
//                  "name": "注册奖励"
//                },
//                {
//                  "money": "10.00",
//                  "type": "2",
//                  "time": "1544410908",
//                  "icon": "xx.jpg",
//                  "name": "玩转"
//                }
//              ];
//              for(let i = 0; i < list.length; i++){
//                list[i].time = this.myType.formatTimeS(list[i].time);
//                if(list[i].type === '1'){
////                    list[i].icon = '../../../static/img/wz/settlement/a_icon_yaoqing.png';
//                    list[i].icon = 'item-logo-1';
//                } else if(list[i].type === '2'){
//
//                } else if(list[i].type === '3'){
//                  list[i].icon = 'item-logo-3';
//                } else if(list[i].type === '4'){
//                  list[i].icon = 'item-logo-4';
//                } else if(list[i].type === '5'){
//                  list[i].icon = 'item-logo-5';
//                } else if(list[i].type === '6'){
//                  list[i].icon = 'item-logo-6';
//                }
//              }
//              this.list = this.list.concat(list);
//              this.list.push(list);
//              this.list.push.apply(this.list, list);
//              console.log(this.list);
              if(datas.data && datas.data.list.length > 0){
                let list = datas.data.list;
                for(let i = 0; i < list.length; i++){
                  list[i].time = this.myType.formatTimeS(list[i].time);
//                  if(list[i].type === '1'){
//                    list[i].icon = 'item-logo-1';
//                  } else if(list[i].type === '2'){
//
//                  } else if(list[i].type === '3'){
//                    list[i].icon = 'item-logo-3';
//                  } else if(list[i].type === '4'){
//                    list[i].icon = 'item-logo-4';
//                  } else if(list[i].type === '5'){
//                    list[i].icon = 'item-logo-5';
//                  } else if(list[i].type === '6'){
//                    list[i].icon = 'item-logo-6';
//                  }
                }
                this.list = this.list.concat(list);

                this.count = datas.data.count; //总佣金
              }
            }
            if(datas.status == 0){//0失败
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
  .settlement{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .icon-notepad{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      background: url("../../../static/img/wz/settlement/a_icon_mingxi.png") no-repeat;
      background-size: contain;
    }
    .icon-question-black{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      background: url("../../../static/img/wz/settlement/a_icon_wenhao.png") no-repeat;
      background-size: contain;
      margin-left: 1em;
    }
    .zero{
      flex: 1;
      img{
        width: 100%;
      }
    }
    .main{
      flex: 1;
      display: flex;
      flex-direction: column;
      .list{
        flex: 1;
        overflow-y: auto;
        .item{
          display: flex;
          align-items: center;
          height: 5rem;
          padding: .5em;
          border-bottom: 1px solid #f3f3f3;
          overflow: hidden;
          .item-l{
            .item-logo{
              display: inline-block;
              width: 4rem;
              height: 4rem;
              border-radius: 50% 50%;
            }
            .item-logo-1{
              background: url("../../../static/img/wz/settlement/a_icon_yaoqing.png") no-repeat;
              background-size: 100% 100%;
            }
            .item-logo-3{
              background: url("../../../static/img/wz/settlement/a_icon_yaoqing.png") no-repeat;
              background-size: 100% 100%;
            }
            .item-logo-4{
              background: url("../../../static/img/wz/settlement/a_icon_yaoqing.png") no-repeat;
              background-size: 100% 100%;
            }
            .item-logo-5{
              background: url("../../../static/img/wz/settlement/a_icon_yaoqing.png") no-repeat;
              background-size: 100% 100%;
            }
            .item-logo-6{
              background: url("../../../static/img/wz/settlement/a_icon_yaoqing.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .item-c{
            flex: 1;
            height: 100%;
            padding-left: .5em;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            &>div{
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .item-r{
            display: flex;
            align-items: center;
            .item-btn{
              /*height: 2rem;*/
              /*line-height: 2rem;*/
              padding: .2em .4em;
              border-radius: 1rem;
              color: #fff;
              background-color: #2a9bf4;
              margin-left: .5em;
            }
          }
        }
      }
      .footer{
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 1.2rem;
        color: #fff;
        background-color: #f31;
      }
    }
  }
</style>
