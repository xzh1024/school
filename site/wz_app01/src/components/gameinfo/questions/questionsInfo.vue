<!--问答详情-->
<template>
  <div class="questions">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        问答详情
      </div>
      <div class="head_right">
        <i class="icon_ask_black" @click="caseFlag = true;"></i>
      </div>
    </div>
    <div class="main">
      <div class="q">
        <img v-lazy="consult.icon_url" class="q_left"></img>
        <div class="q_right">
          <div class="q_right_name">
            <span class="color_888888">{{ consult.nick_name }}</span>
          </div>
          <div class="q_right_cont">
            <span class="ask">问</span>
            {{ consult.content }}
          </div>
          <div class="q_right_time">{{ consult.create_time }}</div>
        </div>
      </div>
      <div class="q_hint">温馨提示:点击满意答案,发放您悬赏的金币</div>
      <div class="a_title border_f0f0f0">
        <span class="extern m_r2">答</span>
        <span class="small1 color_888888">共<span class="color_red">{{ consultInfo.counts }}</span>条玩家回答</span>
      </div>
      <div v-if="consultInfo.counts">
        <!--<div class="a">-->
          <!--<div class="a_left">-->
            <!--<img src="">-->
          <!--</div>-->
          <!--<div class="a_right">-->
            <!--<div class="a_right_name">-->
              <!--<div class="flex1 color_888888">玩家名字</div>-->
              <!--<div class="small1">-->
                <!--<span class="color_blue">积分</span>-->
                <!--<span class="a_right_num">+50</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="a_right_cont">-->
              <!--荣誉兑换 荣誉兑换 荣誉兑换荣誉兑换荣誉兑换荣誉兑换荣誉兑换荣誉兑换-->
            <!--</div>-->
            <!--<div class="a_right_time">-->
              <!--09月11日-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="a" v-for="v in consultInfo.user_list">
          <div class="a_left">
            <img v-lazy="v.icon_url"></img>
          </div>
          <div class="a_right">
            <div class="a_right_name">
              <div class="flex1 color_888888">{{ v.nick_name }}</div>
              <i class="icon_best_answer" v-if="v.is_reward == 1"></i>
              <!--<div class="small1" v-if="v.is_task_bonus > 0">-->
                <!--<span class="color_blue">金币</span>-->
                <!--<span class="a_right_num">+{{ v.is_task_bonus }}</span>-->
              <!--</div>-->
              <div class="bonus" v-if="v.is_task_bonus == 1">
                <i class="icon_coin_y"></i>
                <span class="color_white m_l">+50</span>
              </div>
            </div>
            <div class="a_right_cont">
              {{ v.content }}
            </div>
            <div class="a_right_time">
              {{ v.create_time }}
            </div>
          </div>
        </div>
        <div class="a" v-for="v in consultInfo.list">
          <div class="a_left">
            <img v-lazy="v.icon_url"></img>
          </div>
          <div class="a_right">
            <div class="a_right_name">
              <div class="flex1 color_888888">{{ v.nick_name }}</div>
              <i class="icon_best_answer" v-if="v.is_reward == 1"></i>
              <!--<div class="small1" v-if="v.is_task_bonus > 0">-->
                <!--<span class="color_blue">金币</span>-->
                <!--<span class="a_right_num">+{{ v.is_task_bonus }}</span>-->
              <!--</div>-->
              <div class="bonus"  v-if="v.is_task_bonus == 1">
                <i class="icon_coin_y"></i>
                <span class="color_white m_l">+50</span>
              </div>
            </div>
            <div class="a_right_cont">
              {{ v.content }}
            </div>
            <div class="a_right_time">
              {{ v.create_time }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <input type="text" name="" class="input" placeholder="近期玩过该游戏的玩家才可回答哟" v-model="answerContent">
      <span class="btn_blue_ye" @click="userType">提交</span>
    </div>


    <div class="screen" v-show="caseFlag">
      <div class="case">
        <div class="case_title">
          <i class="icon_qa_notice m_r"></i>问答须知
        </div>
        <div class="case_main">
          <div class="color_999999 small2">想对新接触的游戏有更多的了解？游戏问答----让萌新有地方问，让大神来为您解答。</div>
          <div class="">
            <div class="flex_center"><i class="dot m_r"></i>问答礼仪</div>
            <div class="flex_center color_999999 small2">
              <i class="icon_qa_triangle m_r"></i>
              <p>理性提问，中肯发言；</p>
            </div>
            <div class="flex_center color_999999 small2">
              <i class="icon_qa_triangle m_r"></i>
              <p>问的清楚，答得明白。</p>
            </div>
          </div>
          <div class="">
            <div class="flex_center"><i class="dot m_r"></i>问答需知</div>
            <div class="flex_center color_999999 small2">
              <span>1.</span>
              <p>每日单个游戏最多发起两条提问；</p>
            </div>
            <div class="flex_center color_999999 small2">
              <span>2.</span>
              <p>每日前10条回复均可获得50积分奖励。</p>
            </div>
          </div>
        </div>
        <div class="case_footer" @click="caseFlag = false;">
          我知道了
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'nq_keep',
  	data() {
      return {
        page: 1,
        app:{},
        consult: {},
        consultInfo: {
          consult_info_counts: 0,
          list: [],
          user_list: []
        },
        answerContent: '',//回答内容
        type: '',
        caseFlag: false,
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getConsultInfo();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {
			    console.log(this.$route.query.id);
			    console.log(this.$route.query.consultId);
			});
		},
//    filters: {	//自定义局部过滤器
//      gameSize: (data) => {//过滤显示下载量
//        return data += 'M'
//      }
//    },
    methods: {
      toast (msg) {
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      userType(){
          if(this.type == 1){
              this.toast('请先登录');
          } else if(this.type == 2){
            this.toast('不能评论自己的问题');
          } else if(this.type == 3){
            this.toast('评论');
            this.doAnswer();
          } else if(this.type == 4){
            this.toast('你不是游戏活跃玩家');
          }
      },
      indicator () {
        Indicator.open({
          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      //游戏问答详情
      getConsultInfo(){
        let url = this.jointUrl({
          consult_id: this.$route.params.consultId, //提问ID
          uid: this.userInfo.id,
          page: this.page
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          consult_id: this.$route.params.consultId, //提问ID
          uid: this.userInfo.id,
          page: this.page,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=ConsultInfo&a=info',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              let data = datas.data;
              this.app = data.app;
              this.type = data.type;

              let consult = data.consult;
              consult.create_time = this.myType.formatTimeD(consult.create_time);
              this.consult = consult;

              let consultInfo = data.consult_info;
              this.consultInfo.counts = consultInfo.consult_info_counts;
              if(consultInfo.consult_info_counts > 0){

                let consultList = consultInfo.list;
                let consultUserList = consultInfo.user_list;
                for(let i = 0; i < consultList.length; i++){
                  consultList[i].create_time = this.myType.formatTimeD(consultList[i].create_time);
                  if(consultList[i].top == 1){
                    this.consultInfo.list.unshift(consultList[i]);
                  } else {
                    this.consultInfo.list.push(consultList[i]);
                  }
                }
                for(let i = 0; i < consultUserList.length; i++){
                  consultUserList[i].create_time = this.myType.formatTimeD(consultUserList[i].create_time);
                  if(consultUserList[i].top == 1){
                    this.consultInfo.user_list.unshift(consultUserList[i]);
                  } else {
                    this.consultInfo.user_list.push(consultUserList[i]);
                  }
                }
//                consultInfo.list = consultList;
//                consultInfo.user_list = consultUserList;
              }
//              this.consultInfo = consultInfo;
            } else if(datas.msg){
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //游戏问题回答
      doAnswer(){
        if(this.answerContent){
          this.indicator();
          let url = this.jointUrl({
            consult_id: this.$route.params.consultId, //提问ID
            uid: this.userInfo.id,
            content: this.answerContent  //回答内容
          });
          let mySign = md5(url + this.myType.key1).toLowerCase();
          let myUrl = this.jointUrl({
            consult_id: this.$route.params.consultId, //提问ID
            uid: this.userInfo.id,
            content: this.answerContent,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=ConsultInfo&a=do_answer',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                this.toast(datas.msg);
              } else if(datas.msg){
                this.toast(datas.msg);
              }
              this.endIndicator();
            })
            .catch(error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        } else {
          this.toast('内容不能为空');
        }
      },
    }
  }
</script>

<style scoped lang="less">

  .questions{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      .q{
        padding: 1rem 1rem 0;
        display: flex;
        /*border-bottom: .5rem solid #eeeeee;*/
        .q_left{
          width: 4rem;
          height: 4rem;
          border: 1px solid #29a1f7;
          border-radius: 50% 50%;
        }
        .q_right{
          padding-left: .8rem;
          flex: 1;
          .q_right_name{
            display: flex;
            align-items: center;
          }
          .q_right_cont{
            overflow: hidden;
            line-height: 1.3rem;
            margin: .5rem 0;
          }
          .q_right_time{
            text-align: right;
            color: #888888;
            font-size: .89rem;
          }
        }
      }
      .q_hint{
        border-bottom: .5rem solid #eeeeee;
        font-size: .85rem;
        padding: 0 1rem 1rem;
        color: #888888;
      }
      .a_title{
        height: 2.5rem;
        padding: 0 1rem;
        display: flex;
        align-items: center;
      }
      .a{
        padding: .6rem;
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        .a_left{
          img{
            width: 3rem;
            height: 3rem;
            border-radius: 50% 50%;
            border: 1px solid #29a1f7;
            margin-right: .6rem;
          }
        }
        .a_right{
          flex: 1;
          .a_right_name{
            display: flex;
            align-items: center;
            .a_right_num{
              height: 1.4rem;
              line-height: 1.4rem;
              padding: 0 .4rem;
              display: inline-block;
              color: #ffffff;
              background-color: #29a1f7;
              border-radius: .7rem;
            }
            .bonus{
              height: 1.6rem;
              padding: 0 .5rem;
              border-radius: .8rem;
              margin-left: .5rem;
              background-color: #29a1f7;
              display: flex;
              align-items: center;
            }
          }
          .a_right_cont{
            margin-top: .5rem;
            line-height: 1.3rem;
          }
          .a_right_time{
            text-align: right;
            color: #888888;
            font-size: .89rem;
            margin-top: .5rem;
          }
        }
      }
    }
    .footer{
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .input{
        flex: 1;
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 1rem;
        margin: 0 1rem;
        background-color: #f0f0f0;
        border-radius: 1.3rem;
        border: none;
      }
    }
    .screen{
      position: absolute;
      /*z-index: 10;*/
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      .case{
        width: 23rem;
        height: 20rem;
        background: #ffffff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: .5rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .case_title{
          height: 2.8rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background-color: #29a1f7;
        }
        .case_main{
          flex: 1;
          overflow-y: auto;
          padding: .5rem;
          .flex_center{
            margin-top: .5rem;
          }
          .dot{
            display: inline-block;
            width: .5rem;
            height: .5rem;
            border-radius: 50% 50%;
            background-color: #29a1f7;
            transform: scale(.6,.6);
          }
        }
        .case_footer{
          height: 3rem;
          color: #999999;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid #eeeeee;
        }
      }
    }
  }
</style>
