<!--游戏问答-->
<template>
  <div class="questions">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        游戏问答
      </div>
      <div class="head_right">
        <i class="icon_ask_black" @click="caseFlag = true;"></i>
      </div>
    </div>
    <div class="main">
      <div class="sy" v-if="JSON.stringify(gameData) != '{}'">
        <img v-lazy="gameData.gameinfo.logo" class="sy_l"></img>
        <div class="sy_c">
          <div class="sy_c_t">
            <span v-text="gameData.gameinfo.gamename"></span>
          </div>
          <div class="sy_c_b small2 color_888888">
            <p>有<small class="color_blue">{{ gameData.gameinfo.player }}</small>人玩过该游戏</p>
            <p>共<small class="color_blue">{{ gameData.gameinfo.question }}</small>条问题，收到<small class="color_blue">{{ gameData.gameinfo.answer }}</small>个回答</p>
          </div>
        </div>
      </div>
      <div class="questions_list">
        <!--<div class="q">-->
          <!--<div class="q_l">-->
            <!--<span class="ask">问</span>-->
          <!--</div>-->
          <!--<div class="q_r">-->
            <!--<div class="q_r_title">-->
              <!--<div class="flex1">天梯可以开自动吗？我看到有人说可以开我看到有人说可以开</div>-->
              <!--<div class="bonus">-->
                <!--<i class="icon_coin_y"></i>-->
                <!--<span class="color_white m_l">+50</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="q_r_cont">-->
              <!--<div class="q_r_cont_li">-->
                <!--<span class="extern">答</span>-->
                <!--<span class="q_r_cont_li_txt">没有</span>-->
              <!--</div>-->
              <!--<div class="q_r_cont_li m_t_0_5rem">-->
                <!--<span class="extern">答</span>-->
                <!--<span class="q_r_cont_li_txt">不可以自动</span>-->
              <!--</div>-->
              <!--<div class="q_r_cont_li small2 color_888888 m_t_0_5rem">-->
                <!--<div class="flex1">查看全部<span class="color_blue">6</span>个回答</div>-->
                <!--<div>08-21</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="q" v-for="v in userList" @click="$router.push({path:'/questions_info/'+v.id})">
          <div class="q_l">
            <span class="ask">问</span>
          </div>
          <div class="q_r">
            <div class="q_r_title">
              <div class="flex1 f_s1">{{ v.content }}</div>
              <div class="bonus" v-if="v.money > 0 && v.type == 1">
                <i class="icon_coin_y"></i>
                <span class="color_white m_l">+{{ v.money }}</span>
              </div>
              <div class="bonus" v-else-if="v.money > 0 && v.type == 2">
                <i class="icon_coin_n"></i>
                <span class="color_white m_l">已被领取</span>
              </div>
            </div>
            <div class="q_r_cont" v-if="v.answer.length > 1">
              <div class="q_r_cont_li m_b_0-5rem" v-for="item in v.answer">
                <span class="extern">答</span>
                <span class="q_r_cont_li_txt">{{ item.content }}</span>
              </div>
              <div class="q_r_cont_li small2 color_888888">
                <div class="flex1">查看全部<span class="color_blue">{{ v.answer_count }}</span>个回答</div>
                <div>{{ v.create_time }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="q" v-for="v in list" @click="$router.push({path:'/questions_info/'+v.id})">
          <div class="q_l">
            <span class="ask">问</span>
          </div>
          <div class="q_r">
            <div class="q_r_title">
              <div class="flex1 f_s1">{{ v.content }}</div>
              <div class="bonus" v-if="v.money > 0 && v.type == 1">
                <i class="icon_coin_y"></i>
                <span class="color_white m_l">+{{ v.money }}</span>
              </div>
              <div class="bonus" v-else-if="v.money > 0 && v.type == 2">
                <i class="icon_coin_n"></i>
                <span class="color_white m_l">已被领取</span>
              </div>
            </div>
            <div class="q_r_cont" v-if="v.answer.length">
              <div class="q_r_cont_li m_b_0-5rem" v-for="item in v.answer">
                <span class="extern">答</span>
                <span class="q_r_cont_li_txt">{{ item.content }}</span>
              </div>
              <div class="q_r_cont_li small2 color_888888">
                <div class="flex1">查看全部<span class="color_blue">{{ v.answer_count }}</span>个回答</div>
                <div>{{ v.create_time }}</div>
              </div>
            </div>
            <div class="q_r_cont" v-else>
              <div class="q_r_cont_li">

              </div>
              <div>暂无回答快来帮帮Ta吧~</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="questions_btn" @click="textareaFlag = true;">我要请教</div>
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
    <div class="screen" v-if="JSON.stringify(gameData) != '{}'" v-show="textareaFlag" v-on:click.self="textareaFlag = false;">
      <div class="textarea">
        <div class="textarea_title">
          <p class="color_999999 flex1">向<span class="color_blue">{{ gameData.gameinfo.player }}</span>位玩过该游戏的人请教</p>
          <span class="btn_blue_ye" @click="putQuestion">提交</span>
        </div>
        <div class="textarea_cont">
          <textarea minlength="5" maxlength="100" v-model="questionContent" placeholder="5-100字范围类,请描述您的问题吧~"></textarea>
        </div>
        <div class="textarea_footer">
          <div class="flex1" style="display: flex; align-items: center;">
            <div>悬赏金额：</div>
            <select ref="money">
              <!--<option value="0" selected>0</option>-->
              <option v-for="v in rewardConf" :value="v" >{{ v }}</option>
              <!--<optgroup label="German Cars">-->
              <!--<option value="mercedes">Mercedes</option>-->
              <!--<option value="audi">Audi</option>-->
              <!--</optgroup>-->
            </select>
          </div>
          <div class="color_999999">{{ questionContent.length }}/100</div>
        </div>
      </div>
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
        gameData: {},
        list: [],
        userList: [],
        caseFlag: false,
        textareaFlag: false,
        page: 1,
        questionContent: '',  //提问内容
        rewardConf: [], //悬赏金额参数
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getGameInfo();
      this.getConsultList();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {
			    console.log(this.$route.params.id);
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
      indicator () {
        Indicator.open({
          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      //游戏详情
      getGameInfo() {
        this.$http.get("/www/api-game-gameInfo", {
          params: {
            gid : this.$route.params.id,
            channel : this.myType.channel,
            system : this.myType.system,
            username : this.userInfo.username
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 0) {//返回的状态，0为成功
              let data = datas.data;
              if(this.myType.system == 1){//安卓
                data.gameinfo.web_url = data.gameinfo.android_url;//下载地址
                data.gameinfo.web_pack = data.gameinfo.android_pack;//包名
              }
              if(this.myType.system == 2){//苹果
                data.gameinfo.web_url = data.gameinfo.ios_url;
                data.gameinfo.web_pack = data.gameinfo.ios_pack;
              }
              data.gameinfo.logo = this.myType.domainName + data.gameinfo.logo;
              this.gameData = data;
//              this.loading = true;//显示内容
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //游戏问答列表
      getConsultList(){
        let url = this.jointUrl({
          appid: this.$route.params.id,
          page: this.page
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          appid: this.$route.params.id,
          page: this.page,
          uid: this.userInfo.id,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=Consult&a=consultList',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              if(this.page == 1){
                this.rewardConf = datas.data.conf;
              }
              if(datas.data.user){
                let userList = datas.data.user;
                if(userList.length > 0){
                  for(let i = 0; i < userList.length; i++){
                    userList[i].create_time = this.myType.formatTimeD(userList[i].create_time);
                  }
                }
                this.userList = userList;
              }
              if(datas.data.list){
                let list = datas.data.list;
                if(list.length > 0){
                  for(let i = 0; i < list.length; i++){
                    list[i].create_time = this.myType.formatTimeD(list[i].create_time);
                  }
                }
                this.list = list;
              }
            } else if(datas.msg){
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //游戏提问
      putQuestion(){
        if(this.questionContent){
          this.indicator();
          let url = this.jointUrl({
            uid: this.userInfo.id,
            appid: this.$route.params.id,
            content: this.questionContent,
            money: this.$refs.money.value,//悬赏金
          });
          let mySign = md5(url + this.myType.key1).toLowerCase();
          let myUrl = this.jointUrl({
            uid: this.userInfo.id,
            appid: this.$route.params.id,
            content: this.questionContent,
            money: this.$refs.money.value,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=Consult&a=putQuestion',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                this.toast('提问成功');
                this.textareaFlag = false;
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
    .screen{
      position: absolute;
      /*z-index: 11;*/
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
      .textarea{
        /*height: 12rem;*/
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        /*height: 12rem;*/
        background-color: #ffffff;
        .textarea_title{
          /*height: 3rem;*/
          padding: .8rem;
          display: flex;
          align-items: center;
        }
        .textarea_cont{
          display: flex;
          padding: 0 .6rem;
          textarea{
            flex: 1;
            height: 6rem;
            line-height: 1.3rem;
            padding: .5rem;
            background-color: #f0f0f0;
            border-radius: .8rem;
            border: none;
          }
        }
        .textarea_footer{
          display: flex;
          align-items: center;
          padding: .8rem;
        }
      }
    }
    .main{
      flex: 1;
      overflow-y: auto;
      .sy{
        height: 4rem;
        padding: 1rem;
        border-bottom: .5rem solid #eeeeee;
        .sy_c{
          .sy_c_b{
            height: 2rem;
            line-height: 1rem;
            display: block;
          }
        }
      }
      .q{
        display: flex;
        padding: .5rem 1rem;
        .q_l{
          margin-right: .5rem;
        }
        .q_r{
          flex: 1;
          overflow: hidden;
          .q_r_title{
            width: 100%;
            /*font-size: 1.1rem;*/
            /*white-space: nowrap;*/
            overflow: hidden;
            /*text-overflow: ellipsis;*/
            display: flex;
            /*flex-wrap: wrap;*/
            .flex1{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
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
          .q_r_cont{
            padding: .5rem;
            background-color: #f0f0f0;
            border-radius: .5rem;
            margin-top: .5rem;
            color: #555555;
            .q_r_cont_li{
              display: flex;
              /*align-items: center;*/
              overflow: hidden;
              .q_r_cont_li_txt{
                flex: 1;
                /*color: #555555;*/
                margin-left: .3rem;
                /*white-space: nowrap;*/
                /*overflow: hidden;*/
                /*text-overflow: ellipsis;*/
              }
            }
          }
        }
      }
    }
    .footer{
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .questions_btn{
        width: 90%;
        height: 2.2rem;
        line-height: 2.2rem;
        border-radius: 1.1rem;
        font-size: 1.1rem;
        text-align: center;
        background-color: #29a1f7;
        color: #ffffff;
      }
    }
  }
</style>
