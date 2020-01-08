<template> <!--新游(内测、预约)-->
  <div class="listFuture"
       v-infinite-scroll="getFutureGame"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <div class="sy border_eee" v-for="v in list" @click="router(v.id)">
      <img v-lazy="myType.domainName + v.logo" class="sy_l"></img>
      <div class="sy_c">
        <div class="sy_c_t">
          <span v-text="v.gamename" class="m_r"></span>
          <!--<span class="small3 color_black m_r">{{ v.size|F_size }}</span>-->
          <span class="small3 color_blue m_r">{{ typeName + v.newgame_time }}</span>
          <!--<span class="sy_c_t_first small3" v-if="v.first == 1">今日首发</span>-->
        </div>
        <div class="sy_c_c" v-if="v.label && v.label[0]">
          <span class="sy_c_c_label small3 m_r" v-for="item in v.label" v-text="item"></span>
        </div>
        <div class="sy_c_b">
          <span class="sy_c_b_weal small3" v-if="v.content" v-text="v.content"></span>
        </div>
      </div>
      <div class="sy_r">
        <div class="sy_r_rebate small2">
          <span>申请</span>
          <span>返利</span>
        </div>
      </div>
    </div>
    <!--加载动画-->
    <div v-show="loading">
      <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        page: 1,
        list: [],
        addLikeFlag: true,
        clearLikeFlag: true,
        followFlag: true,
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        typeName: '',
      }
    },
    props:['gameType','futureType'],
//      {
//      gameType: { //BT还是折扣
//        type: Number
//      },
//      futureType: { //内测还是预约
//        type: Number
//      }
//    },
    created(){
      this.getFutureGame();
      console.log(this.gameType)
    },
    mounted(){
      this.$nextTick(function () {
        if(this.futureType == 1){
          this.typeName = '内测时间:';
        } else if(this.futureType == 2){
          this.typeName = '上线时间:';
        }
      })
    },
    methods: {
      router(id){
        this.$router.push({path:'/game_info/' + id + '/' + this.gameType});
//        if(this.gameType == 1){
//          this.$router.push({path:'/game_info/' + id});
//        } else if(this.gameType == 2){
//          this.$router.push({path:'/game_info_dis/' + id});
//        }
      },
      //获取内测/预约游戏
      getFutureGame(){
        if(this.status){
          this.loading = true;
          this.$http.get('/www/api-game-newgameList',{
            params: {
              page: this.page,
              channel: this.myType.channel,
              system: this.myType.system,
              type: this.futureType //1内测2预约
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 0){  //0成功
                if(datas.data.length > 0){
                  let data = datas.data;
                  for(let i=0,len=data.length; i < len; i++){
                    if(data[i].newgame_time == 0){
                      data[i].newgame_time = '敬请期待';
                    } else {
                      data[i].newgame_time = this.myType.formatTimeD(data[i].newgame_time);
                    }
                    data[i].label = data[i].label.split(",");
                    this.list.push(data[i]);
                  }
                  console.log(this.page)
                  this.page++;
                } else {
                  this.status = false;
                }
              } else if(datas.status == 1){  //1失败
                this.status = false;
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => this.loading = false,1000);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .listFuture{
    width: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
