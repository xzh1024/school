<!--排行榜-->
<template>
  <div class="rankingList">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        排行榜
      </div>
      <div class="head_right"></div>
    </div>
    <!--列表-->
    <div class="list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="top_game" :class="topGameBg" v-if="topGame.length">
        <div class="top_game_only" v-if="topGame.length > 1" @click="goGameInfo(topGame[1].id)">
          <i class="icon_crown icon_crown2"></i>
          <img v-lazy="myType.domainName + topGame[1].logo" class="top_game_only_logo"></img>
          <div class="icon_ranking icon_ranking2"></div>
          <div class="top_game_only_name">{{topGame[1].gamename}}</div>
          <div class="top_game_btn" @click.stop="downloadGame(topGame[1].web_url)">下载</div>
        </div>
        <div class="top_game_only m_l2" v-if="topGame.length > 0" @click="goGameInfo(topGame[0].id)">
          <i class="icon_crown icon_crown1"></i>
          <img v-lazy="myType.domainName + topGame[0].logo" class="top_game_only_logo"></img>
          <div class="icon_ranking icon_ranking1"></div>
          <div class="top_game_only_name">{{topGame[0].gamename}}</div>
          <div class="top_game_btn" @click.stop="downloadGame(topGame[0].web_url)">下载</div>
        </div>
        <div class="top_game_only m_l2" v-if="topGame.length > 2" @click="goGameInfo(topGame[2].id)">
          <i class="icon_crown icon_crown3" v-if="topGame.length > 2"></i>
          <img v-lazy="myType.domainName + topGame[2].logo" class="top_game_only_logo"></img>
          <div class="icon_ranking icon_ranking3"></div>
          <div class="top_game_only_name">{{topGame[2].gamename}}</div>
          <div class="top_game_btn" @click.stop="downloadGame(topGame[2].web_url)">下载</div>
        </div>
      </div>
      <!--<List :list="list"></List>-->
      <div class="sy border_eee" v-for="(v,i) in list" @click="goGameInfo(v.id)">
        <img v-lazy="myType.domainName + v.logo" class="sy_l"></img>
        <div class="sy_c">
          <div class="sy_c_t">
            <span v-text="v.gamename" class="m_r"></span>
            <!--<span class="small3 color_black m_r">{{ v.size|F_size }}</span>-->
            <span class="sy_c_first m_l" v-if="v.operate == 2">联合</span>
            <span class="sy_c_operate1 m_l" v-if="v.operate == 1">独家</span>
            <span class="sy_c_t_first small3" v-if="v.first == 1">今日首发</span>
          </div>
          <div class="sy_c_c" v-if="v.label && v.label[0]">
            <span class="sy_c_c_label small3 m_r" v-for="item in v.label" v-text="item"></span>
          </div>
          <div class="sy_c_b">
            <span class="sy_c_b_weal small3" v-if="v.content" v-text="v.content"></span>
          </div>
        </div>
        <div class="sy_r">
          <!--<div class="sy_r_rk">-->
            <!--<i class="icon_one" v-if="i == 0"></i>-->
            <!--<i class="icon_two" v-else-if="i == 1"></i>-->
            <!--<i class="icon_three" v-else-if="i == 2"></i>-->
            <!--<span class="icon_rk" v-else>{{ i+1 }}</span>-->
          <!--</div>-->
          <span class="game_rk">No.{{ i+4 }}</span>
        </div>
      </div>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
      </div>
    </div>
  </div>
</template>

<script>
//  import List from '../../../list/listBT.vue'
  export default {
    name: 'no_keep',
    data(){
      return {
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false,//若为真，则无限滚动不会被触发
        topGame: [],
        topGameBg: '',
      }
    },
//    components:{ List },
    filters: {	//自定义局部过滤器
      F_size: (size) => {//过滤显示下载量
        return size += 'M';
      }
    },
    created(){
      this.loadMore();
      if(this.$route.params.type == 1){
        this.topGameBg = 'top_game1';
      } else if(this.$route.params.type == 2){
        this.topGameBg = 'top_game2';
      } else if(this.$route.params.type == 3){
        this.topGameBg = 'top_game3';
      }
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

      });
    },
    methods: {
      goGameInfo(id){
//        this.$router.push({path:'/game_info/'+id+'/'+this.$route.params.type});
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: this.$route.params.type,
          channel: this.myType.channel
        }});
      },
      downloadGame(url){
        window.location.href = url;
      },
      loadMore() {
        if(this.status){
          this.loading = true;
          this.loadAnimation = true;
          this.$http.get("/www/api-game-newGameType", {
            params: {
              page : this.page,
              channel : this.myType.channel,
              system : this.myType.system,
              platform : this.$route.params.type, //游戏平台,1BT服，2折扣服
              type : 3  //1新游,2热门,3排行,4满V,5最低折扣
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 0){
                if(datas.data.list.length > 0){
                  let data = datas.data.list;
                  if(this.myType.system == 1){//1为Android
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;//下载地址
                      data[i].web_pack = data[i].android_pack;//包名
                      data[i].label = data[i].label.split(",");
                      if(i < 3){
                        this.topGame.push(data[i]);
                      } else {
                        this.list.push(data[i]);
                      }
                    }
                  }
                  if(this.myType.system == 2){//2为IOS
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;//下载地址
                      data[i].web_pack = data[i].ios_pack;//包名
                      data[i].label = data[i].label.split(",");
                      if(i < 3){
                        this.topGame.push(data[i]);
                      } else {
                        this.list.push(data[i]);
                      }
                    }
                  }
                  this.page++;
                  console.log(this.list);
                } else {
                  this.status = false;
                }
              }
              setTimeout(() => {
                this.loading = false;
                this.loadAnimation = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .rankingList{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .top_game1{ background: url("../../../static/img/h_icon_beijing.png") no-repeat; background-size: 100% 100%;}
    .top_game2{ background: url("../../../static/img/i_icon_beijing.png") no-repeat; background-size: 100% 100%;}
    .top_game3{ background: url("../../../static/img/g_icon_beijing.png") no-repeat; background-size: 100% 100%;}
    .top_game{
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 1rem 0;
      .top_game_only{
        width: 6.5rem;
        padding: .5rem;
        background: #ffffff;
        border-radius: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top_game_only_name{
          width: 100%;
          height: 1.1rem;
          line-height: 1.1rem;
          text-align: center;
          font-size: 1.1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: .2rem;
        }
        .top_game_only_logo{
          width: 4rem;
          height: 4rem;
          border-radius: .5rem;
          margin-top: .2rem;
        }
        .top_game_btn{
          display: inline-block;
          height: 1.4rem;
          line-height: 1.4rem;
          text-align: center;
          font-size: .89rem;
          padding: 0 .8rem;
          color: #29a1f7;
          background-color: #ffffff;
          border-radius: 1rem;
          border: 1px solid #29a1f7;
          margin-top: .2rem;
        }
        .icon_crown{ display: block; width: 3rem; height: 2rem;}
        .icon_crown1{ background: url("../../../static/img/a_icon_diyi.png") no-repeat; background-size: contain;}
        .icon_crown2{ background: url("../../../static/img/a_icon_disan.png") no-repeat; background-size: contain;}
        .icon_crown3{ background: url("../../../static/img/c_icon_dier.png") no-repeat; background-size: contain;}
        .icon_ranking{ display: block; width: 5rem; height: 1.5rem; margin-top: .2rem;}
        .icon_ranking1{ width: 6rem; height: 2.5rem; background: url("../../../static/img/d_icon_diyi.png") no-repeat; background-size: contain;}
        .icon_ranking2{ background: url("../../../static/img/e_icon_dier.png") no-repeat; background-size: contain;}
        .icon_ranking3{ background: url("../../../static/img/f_icon_disan.png") no-repeat; background-size: contain;}
      }
    }
    .list{
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .sy{
        padding-right: 0;
        .sy_r{
          .sy_r_rk{
            width: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .game_rk{
            display: inline-block;
            width: 3.5rem;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            color: #888;
            background-color: #eeeeee;
            border-radius: 1.5rem 0 0 1.5rem;
          }
        }
      }

    }
  }
</style>


