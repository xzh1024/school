<!--我的提问-->
<template>
  <div class="question">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">我的提问</div>
      <div class="head_right">
        <i class="icon_ask_black" @click="$router.push({path:'/qa_norm'})"></i>
      </div>
    </div>
    <img src="../../../../static/img/x_icon_tu.png" class="question_zero" v-if="list.length == 0">
    <div class="question_main" v-else-if="list.length > 0">
      <div class="q">
        <div class="q_left"></div>
        <div class="q_right">
          <div class="q_right_name">
            <span class="color_888888">痞子大叔</span>
          </div>
          <div class="q_right_cont">
            <span class="ask">问</span>
            天梯可以开自动吗？我看到有人说可以开自动，但是我没找着！
          </div>
          <div class="q_right_time">
            <div class="flex1">08月21日</div>
            <div>查看全部<span class="color_blue">0</span>个回答</div>
          </div>
        </div>
      </div>
      <div class="q" v-for="v in list">
        <img class="q_left" v-lazy="v.logo"></img>
        <div class="q_right">
          <div class="q_right_name">
            <span class="small1 color_888888">{{ v.name }}</span>
          </div>
          <div class="q_right_cont">
            <span class="ask">问</span>
            {{ v.question }}
          </div>
          <div class="q_right_time">
            <div class="flex1">{{ v.time }}</div>
            <div>查看全部<span class="color_blue">{{ v.anwsers }}</span>个回答</div>
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
      this.getMyQuestions();
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {

      });
    },
    methods: {
      //我的提问
      getMyQuestions(){
        let url = this.jointUrl({
          uid: this.userInfo.id,
          page: this.page
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          uid: this.userInfo.id,
          page: this.page,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=Consult&a=myQuestions',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              console.log('成功')
              if(datas.data.list){
                let list = datas.data.list;
                for(let i = 0; i < list.length; i++){
                  list[i].time = this.myType.formatTimeD(list[i].time);
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
  .question{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .question_zero{
      flex: 1;
      width: 100%;
    }
    .question_main{
      flex: 1;
      width: 100%;
      overflow-y: auto;
      .q{
        padding: .7rem 1rem;
        display: flex;
        border-bottom: 1px solid #eeeeee;
        .q_left{
          width: 4rem;
          height: 4rem;
          border: 1px solid #29a1f7;
          border-radius: .5rem;
        }
        .q_right{
          padding-left: .8rem;
          flex: 1;
          .q_right_name{
            display: flex;
            align-items: center;
          }
          .q_right_cont{
            margin: .5rem 0;
            overflow: hidden;
            line-height: 1.3rem;
          }
          .q_right_time{
            color: #999999;
            font-size: .89rem;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
</style>
