<template><!--游戏攻略-->
  <div class="strategyList">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="true"
                 @bottom-status-change="handleBottomChange" ref="loadmore">
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus === 'pull'" :class="{'rotate':bottomStatus==='drop'}">↑</span>
        <span v-show="bottomStatus === 'loading'">Loading...</span>
        <span v-show="bottomStatus === 'drop'">释放更新</span>
      </div>

      <div class="s border_eee" v-for="v in strategyList" @click="activityRouter(v.tid);">
        <div class="s_t">
          <div class="s_t_l">
            <img v-lazy="myType.domainName + v.pic" class="s_t_l_gamelogo"></img>
          </div>
          <div class="s_t_r">
            <div class="s_t_r_title" v-text="v.title"></div>
            <div class="s_t_r_author small3 color_939393">{{ v.author|F_author }}</div>
            <div class="s_t_r_time small3 color_939393" v-text="v.release_time"></div>
          </div>
        </div>
        <!--<div class="s_b">-->
          <!--<div class="s_b_gamename small1" v-text="v.gamename"></div>-->
          <!--<div class="s_b_time small2 color_939393" v-text="v.release_time"></div>-->
        <!--</div>-->
      </div>
    </mt-loadmore>
  </div>

	<!--<div class="strategyList"-->
       <!--v-infinite-scroll="getStrategyList"-->
       <!--infinite-scroll-disabled="loading"-->
       <!--infinite-scroll-distance="3">-->
    <!--&lt;!&ndash;<div class="s border_eee">&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="s_t">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="s_t_l">&ndash;&gt;-->
          <!--&lt;!&ndash;<img src="" alt="" class="s_t_l_gamelogo">&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="s_t_r">&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="s_t_r_title">像素小精灵大全变态版手游公益服《像素小精灵》宝可梦攻略</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="s_t_r_author small3 color_939393">作者：像素小精灵大全变态版手游公益服</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="s_b">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="s_b_gamename small1">像素小精灵</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="s_b_time small2 color_939393">2018-01-11 12:13:17</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="s border_eee" v-for="v in strategyList" @click="show(v.info_url);">&ndash;&gt;-->
    <!--<div class="s border_eee" v-for="v in strategyList" @click="activityRouter(v.tid);">-->
      <!--<div class="s_t">-->
        <!--<div class="s_t_l">-->
          <!--<img v-lazy="myType.domainName + v.pic" class="s_t_l_gamelogo"></img>-->
        <!--</div>-->
        <!--<div class="s_t_r">-->
          <!--<div class="s_t_r_title" v-text="v.title"></div>-->
          <!--<div class="s_t_r_author small3 color_939393">{{ v.author|F_author }}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="s_b">-->
        <!--<div class="s_b_gamename small1" v-text="v.gamename"></div>-->
        <!--<div class="s_b_time small2 color_939393" v-text="v.release_time"></div>-->
      <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;加载动画&ndash;&gt;-->
    <!--<div v-show="loadAnimation">-->
      <!--<mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
  import { Indicator } from 'mint-ui';
  export default {
    data: function () {
      return {
        strategyList: [],
        page: 1,
//        status: true,//标记是否继续请求数据 true为继续
//        loading: true,//若为真，则无限滚动不会被触发
//        loadAnimation: false,//标记加载动画,false为隐藏
        allLoaded: false,
        bottomStatus: '',
      }
    },
    props: {
      infoData: {
        type: Object
      }
    },
    created() {
      this.getStrategyList();
    },
    mounted(){
      this.$nextTick(function () {
//          this.makeComment.gid = this.$route.query.id;//游戏id
      });
    },
    filters: {	//自定义局部过滤器
      F_author: (name) => {
        return name ? '作者：'+ name : name;
      }
    },
    methods:{
      loadBottom(){
        setTimeout(() => {
//          this.allLoaded = true;  //数据全部加载完毕
          this.getStrategyList();
          this.$refs.loadmore.onBottomLoaded();
        },1500)
      },
      handleBottomChange(status){
        this.bottomStatus = status;
      },
      activityRouter(tid){
        this.$router.push({path:'/activity_info/'+tid+ '/' +'攻略详情'})
      },
      //游戏攻略列表
      getStrategyList(){
        this.$http.get('/www/api-article-get_list_by_game',{
          params: {
            type: 1, //1表示攻略
            channel_id: this.myType.channel,
            game_id: this.$route.query.id,
            page: this.page,
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(this.page > datas.data.count){
              this.allLoaded = true;  //数据全部加载完毕
            } else {
              if(datas.status == 0){//0成功
                console.log(datas);
                this.strategyList.push.apply(this.strategyList,datas.data.list);
                console.log(this.strategyList)
                this.page++;
              } else if(datas.status == 1){//1失败
                console.log('请求失败！');
              }
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .strategyList{
    flex: 1;
    .s{
      display: flex;
      padding: .8rem;
      flex-direction: column;
      .s_t{
        display: flex;
        .s_t_l{
          margin-right: .5rem;
          .s_t_l_gamelogo{
            display: inline-block;
            width: 4rem;
            height: 4rem;
            border-radius: .6rem;
          }
        }
        .s_t_r{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          .s_t_r_title{
            height: 1.2rem;
            line-height: 1.2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .s_t_r_author{
            height: 1.2rem;
            line-height: 1.2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      /*.s_b{*/
        /*margin-top: .5rem;*/
        /*display: flex;*/
        /*.s_b_gamename{*/
          /*flex: 1;*/
        /*}*/
      /*}*/
    }
  }

</style>
