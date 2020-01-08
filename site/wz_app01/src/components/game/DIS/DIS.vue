<template> <!--BT-->
  <div class="DIS" v-on:scroll.passive="onScroll($event)"
       v-infinite-scroll="getGameDIS"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <i class="icon_search" @click="$router.push({path:'/class_ify/'+1+'/'+topgame})" v-show="searchIcon"></i>
    <!--搜索框-->
    <div class="search_box">
      <div class="soso_bg" @click="$router.push({path:'/class_ify/'+2+'/'+topgame});">
        <i class="icon_sousuo"></i>
        <p class="soso_input color_999999">{{ topgame }}</p>
      </div>
    </div>
    <!--活动菜单-->
    <Banner :banner="banner" :type="2"></Banner>
    <div class="menu border_eee">
      <div class="menu_a" @click="$router.push({path:'/new_game/'+2});">
        <img class="menu_a_img" src="../../../static/img/02_icon_xinyou.png" alt="新游">
        <span class="menu_a_name color_black">新游</span>
      </div>
      <!--<div class="menu_a" @click="$router.push({path:'/activity_dis'});">-->
        <!--<img class="menu_a_img" src="../../../../static/img/05_icon_hd.png" alt="活动">-->
        <!--<span class="menu_a_name color_black">活动</span>-->
      <!--</div>-->
      <div class="menu_a" @click="$router.push({path:'/ranking_list/'+2});">
        <img class="menu_a_img" src="../../../static/img/02_icon_phb.png" alt="排行榜">
        <span class="menu_a_name color_black">排行榜</span>
      </div>
      <div class="menu_a" @click="$router.push({path:'/low_dis'});">
        <img class="menu_a_img" src="../../../static/img/03_icon_cdzk.png" alt="超低折扣">
        <span class="menu_a_name color_black">超低折扣</span>
      </div>
      <!--<div class="menu_a" @click="$router.push({path:'/class_ify_dis'});">-->
        <!--<img class="menu_a_img" src="../../../../static/img/04_icon_fenlei.png" alt="分类">-->
        <!--<span class="menu_a_name color_black">分类</span>-->
      <!--</div>-->
      <div class="menu_a" @click="$router.push({path:'/open_list/'+2});">
        <img class="menu_a_img" src="../../../static/img/03_icon_fenlei.png" alt="开服表">
        <span class="menu_a_name color_black">开服表</span>
      </div>
    </div>
    <div class="game_class" @click.stop="$router.push({path:'/class_ify/'+2+'/'+topgame});"><i class="icon_classify"></i><span class="color_blue m_l">游戏分类</span></div>
    <div class="recommendList" v-if="finetop.game.length">
      <div class="sy_title">精品推荐</div>
      <div class="re_c border_eee">
        <!--<div class="re_c_box" :style="{width:25*finetop.game.length+'%'}">-->
        <div class="re_c_box" :style="{width:re_c_box_width}">
          <div class="re_c_game small2" v-for="v in finetop.game" @click.stop="router(v.id, 2, myType.channel)">
            <img v-lazy="myType.domainName + v.logo" alt="" class="re_c_game_logo">
            <p class="re_c_game_name color_black" v-text="v.gamename"></p>
            <p class="re_c_game_weal" v-if="v.finetopstr" v-text="v.finetopstr">50万金币</p>
          </div>
        </div>
      </div>
      <div v-if="finetop.slide">
        <img class="sy_slide" v-if="finetop.slide.gid != 0" v-lazy="myType.domainName + finetop.slide.pic" @click.stop="router(finetop.slide.gid, 2, myType.channel)">
        <img class="sy_slide" v-if="finetop.slide.gid == 0" v-lazy="myType.domainName + finetop.slide.pic">
      </div>
    </div>
    <div v-if="newtop.game.length">
      <div class="sy_title">最新上架</div>
      <List :list="newtop.game" :type="2"></List>
      <div v-if="newtop.slide">
        <img class="sy_slide" v-if="newtop.slide.gid != 0" v-lazy="myType.domainName + newtop.slide.pic" @click.stop="router(newtop.slide.gid, 2, myType.channel)"></img>
        <img class="sy_slide" v-if="newtop.slide.gid == 0" v-lazy="myType.domainName + newtop.slide.pic"></img>
      </div>
    </div>

    <div v-if="weektop.game.length">
      <div class="sy_title">每周热门</div>
      <List :list="weektop.game" :type="2"></List>
      <div v-if="weektop.slide">
        <img class="sy_slide" v-if="weektop.slide.gid == 0" v-lazy="myType.domainName + weektop.slide.pic"></img>
        <img class="sy_slide" v-if="weektop.slide.gid != 0" v-lazy="myType.domainName + weektop.slide.pic" @click.stop="router(weektop.slide.gid, 2, myType.channel)"></img>
      </div>
    </div>

    <div v-if="list.length">
      <div class="sy_title">推荐游戏</div>
      <List :list="list" :type="2"></List>
    </div>

    <!--加载动画-->
    <div v-show="loadAnimation">
      <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
    </div>

  </div>
</template>

<script>
	import Banner from '../../banner/Banner.vue'
	import List from '../../list/list2.vue'
  export default {
    data: function () {
      return {
        banner:[],
        head: {
          title:"",
          title_but: true
        },
        page: 1,
        list: [],
        topgame: '',
        finetop:{ game: []},//精品推荐
        newtop: { game: []},//最新上线
        weektop: { game: []},//每周热门
        recommendList:[],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false,
        re_c_box_width : '100%',
        searchIcon: false,
      }
    },
    components: { Banner, List },
    created(){
      this.getGameDIS();
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

      });
    },
    methods: {
      onScroll(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var scrollTop = target.scrollTop;
        if(scrollTop > 0){
          this.searchIcon = true;
        } else {
          this.searchIcon = false;
        }
      },
      router(id, type, channel) {   //跳转路由
//        this.$router.push({path:'/game_info/'+id+'/'+2})
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: type,
          channel: channel
        }});
      },
      //推荐接口
      getGameDIS() {
        if(this.status){
          this.loading = true;
          this.loadAnimation = true;
          this.$http.get("/www/api-game-newIndex", {
              params: {
                page : this.page,
                channel : this.myType.channel,
                platform: 2,//游戏平台,1BT服，2折扣服
                system : this.myType.system
              }
            })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
//                  console.log(datas)
                if(this.page == 1){
                  this.topgame = datas.data.topgame;
                  this.banner = datas.data.banner;
                  this.finetop = datas.data.finetop;
//                  console.log(this.finetop)
                  let newtop = datas.data.newtop;
                  let weektop = datas.data.weektop;
                  for(let i=0,len=newtop.game.length; i < len; i++){
                    newtop.game[i].label = newtop.game[i].label.split(",");
                  }
                  for(let i=0,len=weektop.game.length; i < len; i++){
                    weektop.game[i].label = weektop.game[i].label.split(",");
                  }
                  this.newtop = newtop;
                  this.weektop = weektop;
//                  console.log(this.newtop);
//                  console.log(this.weektop);
                  this.re_c_box_width = 25 * this.finetop.game.length + '%';
                }
                if(datas.data.gamelist.length > 0){
                  let data = datas.data.gamelist;
                  if(this.myType.system == 1){
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  if(this.myType.system == 2){
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              setTimeout(() => {
                this.loading = false;
                this.loadAnimation = false
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
          }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .DIS{
    width: 100%;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    /*搜索框*/
    .search_box{
      width: 100%;
      height: 3.2rem;
      display: flex;
      align-items: center;
      .soso_bg{
        flex: 1;
        height: 2.2rem;
        border-radius: .6rem;
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 1.5rem;
        .soso_input{
          margin-left: .4rem;
        }
      }
    }
    /*活动菜单*/
    .menu{
      /*border-bottom: 1px solid #ccc;*/
      display: flex;
      padding: .8rem 0 .5rem;
      .menu_a{
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .menu_a_img{
          width: 4rem;
          height: 4rem;
          margin-bottom: .4rem;
        }
        .menu_a_name{
          display: inline-block;
          width: 100%;
          height: 1.2rem;
          line-height: 1.2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }
    }
    .game_class{
      height: 2rem;
      line-height: 1rem;
      padding: 0 .8rem;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
    .recommendList{
      ::-webkit-scrollbar { width: 0; height: 0;}
      .re_c{
        width: 100%;
        height: 8rem;
        overflow-x: auto;
        padding-top: .8rem;
        padding-bottom: 1.2rem;
        .re_c_box{
          height: 8rem;
          display: flex;
          overflow: hidden;
          .re_c_game{
            flex: 1;
            height: 8rem;;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            .re_c_game_logo{
              width: 4rem;
              height: 4rem;
              border-radius: .6rem;
              border: 1px solid #3a88da;
            }
            .re_c_game_name{
              width: 100%;
              height: 2.2rem;
              line-height: 2.2rem;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .re_c_game_weal{
              height: 1.4rem;
              line-height: 1.4rem;
              padding: 0 .4rem;
              color: #29a1f7;
              border: 1px solid #29a1f7;
              border-radius: .7rem;
              font-weight: lighter;
            }
          }
        }
      }
    }
    .sy_slide{
      display: block;
      width: 100%;
      height: 9rem;
      background-color: #3a88da;
      /*margin-bottom: .5rem;*/
    }
  }

</style>
