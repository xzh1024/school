<!--我来回答-->
<template>
  <div class="answering">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">我的回答</div>
      <div class="head_right">
        <i class="icon_ask_black" @click="$router.push({path:'/qa_norm'})"></i>
      </div>
    </div>
    <img src="../../../../static/img/x_icon_tu.png" class="answering_zero" v-if="list.length == 0">
    <div class="answering_main" v-else-if="list.length > 0">
      <!--<div class="q">-->
        <!--<div class="q_l"></div>-->
        <!--<div class="q_r">-->
          <!--<div class="q_r_name">游戏名称</div>-->
          <!--<div class="q_r_title">-->
            <!--<span class="ask">问</span>-->
            <!--礼包哪里换-->
          <!--</div>-->
          <!--<div class="q_r_cont">-->
            <!--<div class="q_r_cont_li">-->
              <!--<div class="extern">答</div>-->
              <!--<div class="q_r_cont_li_cont">-->
                <!--<div class="q_text">荣誉兑换</div>-->
                <!--<div class="q_coin">-->
                  <!--<i class="icon_coin_y"></i>-->
                  <!--<span class="color_white m_l">+50</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="q_r_cont_li m_t_0_5rem">-->
              <!--<div class="extern">答</div>-->
              <!--<div class="q_r_cont_li_cont">-->
                <!--<div class="q_text">13人物礼包或荣誉兑换</div>-->
                <!--<i class="icon_best_answer m_l"></i>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="q_r_cont_li small2 color_888888 m_t_0_5rem">-->
              <!--<div class="flex1">查看全部<span class="color_red">5</span>个回答</div>-->
              <!--<div>08-21</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <div class="q" v-for="v in list" @click="$router.push({path:'/questions_info/'+v.id})">
        <img class="q_l" v-lazy="v.logo"></img>
        <div class="q_r">
          <div class="q_r_name">{{ v.game_name }}</div>
          <div class="q_r_title">
            <span class="ask">问</span>
            {{ v.content }}
          </div>
          <div class="q_r_cont">
            <div class="q_r_cont_li">
              <div class="extern">答</div>
              <div class="q_r_cont_li_cont">
                <div class="q_text">荣誉兑换</div>
                <div class="q_coin" v-if="v.is_reward == 1">
                  <i class="icon_coin_y"></i>
                  <span class="color_white m_l">+{{ v.money }}</span>
                </div>
              </div>
            </div>
            <div class="q_r_cont_li m_t_0_5rem">
              <div class="extern">答</div>
              <div class="q_r_cont_li_cont">
                <div class="q_text">13人物礼包或荣誉兑换</div>
                <i class="icon_best_answer m_l"></i>
              </div>
            </div>
            <div class="q_r_cont_li small2 color_888888 m_t_0_5rem">
              <div class="flex1">查看全部<span class="color_red">{{ v.answer_counts }}</span>个回答</div>
              <div>{{ v.create_time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data: function () {
      return {
        list: [],
        page: 1,
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getAnswerGame();
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    methods: {
      //我的回答
      getAnswerGame(){
        let url = this.jointUrl({
          username: this.userInfo.username,
          page: this.page
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          username: this.userInfo.username,
          page: this.page,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=ConsultInfo&a=get_answer_game',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              console.log('成功')
              if(datas.data.count > 0){
                let list = datas.data.list;
                for(let i = 0; i < list.length; i++){
                  list[i].create_time = this.myType.formatTimeM(list[i].create_time);
                }
                this.list = list;
              }
              this.page++;
            } else if(datas.msg){
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
  .answering{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .answering_zero{
      width: 100%;
      flex: 1;
    }
    .answering_main{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      .q{
        display: flex;
        padding: .5rem .8rem;
        border-bottom: 1px solid #eeeeee;
        .q_l{
          width: 4rem;
          height: 4rem;
          border: 1px solid #29a1f7;
          border-radius: .5rem;
          margin-right: 1rem;
        }
        .q_r{
          flex: 1;
          overflow: hidden;
          .q_r_name{
            color: #888888;
          }
          .q_r_title{
            font-size: 1.1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .q_r_cont{
            padding: 1rem;
            background-color: #f0f0f0;
            border-radius: .5rem;
            margin-top: .5rem;
            .q_r_cont_li{
              display: flex;
              align-items: center;
              overflow: hidden;
              .q_r_cont_li_cont{
                flex: 1;
                /*color: #555555;*/
                margin-left: .3rem;
                /*white-space: nowrap;*/
                /*overflow: hidden;*/
                /*text-overflow: ellipsis;*/
                display: flex;
                align-items: center;
                .q_coin{
                  display: flex;
                  align-items: center;
                  background-color: #29a1f7;
                  height: 1.8rem;
                  padding: 0 .7rem;
                  border-radius: .9rem;
                  margin-left: .5rem;
                }
                .m_l{
                  margin-left: .2rem;
                }
                .q_text{
                  flex: 1;
                  height: 1.2rem;
                  overflow: hidden;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
