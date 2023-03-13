<template>
  <div class="container">
    <Header title="攻略">
      <!--<div slot="left">-->
      <!--<span class="icon-left" @click="$router.go(-1);"></span>-->
      <!--</div>-->
      <div slot="right" class="right">
        <i class="icon-close" @click="app.closeUserCenter"></i>
      </div>
    </Header>
    <div class="main" :class="{'no-data':list.length === 0}"
         v-infinite-scroll="getData"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <!--<Panel class="panel">-->
      <!--<div slot="content" class="content">-->
      <!--<div class="title">-->
      <!--<i class="icon-dot"></i>-->
      <!--<p class="title-text">3733游戏，周末活动总汇版（活动时间11月16日-11月18日）</p>-->
      <!--</div>-->
      <!--<div class="time small">-->
      <!--2019-01-23 15:20-->
      <!--</div>-->
      <!--</div>-->
      <!--<div slot="right" class="right">-->
      <!--<i class="icon-right"></i>-->
      <!--</div>-->
      <!--</Panel>-->

      <Panel class="panel" v-for="(item, index) in list" v-bind:key="index" @click.native="$router.push({path: './pspDetail/'+item.tid})">
        <div slot="content" class="content">
          <div class="title">
            <p class="title-text">{{ item.title }}</p>
          </div>
          <div class="time small">
            {{ item.release_time }}
          </div>
        </div>
        <div slot="right" class="right">
          <i class="icon-right"></i>
        </div>
      </Panel>
      <mt-spinner type="triple-bounce" v-show="loadAnimation" class="loadingStyle"></mt-spinner>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Tabbar from '@/components/tabbar'
  import Header from '@/components/header'
  import Panel from '@/components/panel'
  export default {
    data () {
      return {
        type: 1, //1表示攻略 2 表示活动
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false//标记加载动画,false为隐藏
      }
    },
    components:{ Tabbar, Header, Panel },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    created(){
      this.getData();
    },
    methods: {
      getData(){
        if(this.status){
          this.loading = true;
          this.loadAnimation = true;
          let options = {
            type: this.type,
            channel_id: this.config.channel,
            game_id: this.userData.appid,
            page: this.page,
            uid: this.userData.uid,
            is_sdk: 1  //是否是SDK 默认0
          };
//          options.sign = this.util.getSign(options, this.userData.appkey);
          let params = this.util.jointUrl(options);
          this.axios.post('/www/api-article-get_list_by_game', params)
            .then(response => {
              let datas = response.data;
              if(datas.status === 0){
                let data = datas.data;
                if(data.list && data.list.length > 0){
                  let list = data.list;
//                  for(let i = 0; i < list.length; i++){
//                    list[i].create_time = this.util.formatTime(list[i].create_time, 'm')
//                  }
                  this.list.push.apply(this.list, list);
                  this.page++;
                } else {
                  this.status = false;
                }
              } else {
                this.status = false;
              }
              if(datas.status === 1){
                console.log(datas.msg);
              }
              this.loading = false;
              this.loadAnimation = false;
            })
            .catch(function (error) {
              console.log(error);
              this.loading = false;
              this.loadAnimation = false;
            })
        }
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
    .no-data{
      background: url("../../static/img/noData/a_meiyou-gengduoneirong-.png") no-repeat;
      background-size: 100%;
    }
    .main{
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      .panel{
        .content{
          flex: 1;
          height: 6rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          .title{
            width: 100%;
            display: flex;
            line-height: 1.5rem;
            padding-top: .5em;
            overflow: hidden;
            .icon-dot{
              margin: .5rem .5em 0 0;
              transform: scale(.6, .6);
            }
            .title-text{
              white-space: normal;
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .time{
            width: 100%;
            display: flex;
            align-items: center;

            overflow: hidden;
            color: #aaa;
          }
        }
        .right{
          margin-left: 1em;
        }
      }
    }
  }
</style>

