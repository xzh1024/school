<!--账号交易-->
<template>
  <div class="transaction">
    <div class="head border_eee">
      <div class="head_left">
        <!--<a class="icon_left_black" @click="$router.go(-1);"></a>-->
      </div>
      <div class="head_center">
        账号交易
      </div>
      <div class="head_right">
        <span v-if="$store.getters.traUserInfo" @click="$router.push({path:'/tra_accounts'})">{{ $store.getters.traUserInfo.mobile|F_mobile }}</span>
        <span v-else @click="$router.push({path:'/tra_login'})">交易登录</span>
        <!--<span @click="$router.push({path:'/tra_login'})">交易登录</span>-->
      </div>
    </div>
    <div id="box1"></div>
    <!--<p>{{ $store.getters.traUserInfo }}</p>-->
    <div class="transaction_main"
         v-onScroll
         v-infinite-scroll="getGoodsList"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="flex1">
        <mt-loadmore class="LoadMore" :auto-fill="false" :top-method="loadTop" ref="loadmore">
          <div class="menu" id="menu">
            <div class="menu_a m_t_0_5rem" @click="$router.push({path:'/tra_notice'});">
              <img class="menu_a_img" src="../../static/img/c_icon_jiaoyixuzhi.png" alt="交易须知">
            </div>
            <div class="menu_a" @click="popout = true;">
              <img class="menu_a_img" src="../../static/img/c_icon_woyaomaihao-.png" alt="我要卖号">
            </div>
            <div class="menu_a" @click="$router.push({path:'/tra_product_status'});">
              <img class="menu_a_img" src="../../static/img/c_icon_jiaoyijilu.png" alt="交易记录">
            </div>
            <div class="menu_a" @click="$router.push({path:'/tra_service'});">
              <img class="menu_a_img" src="../../static/img/c_icon_lianxikefu.png" alt="联系客服">
            </div>
          </div>
          <div id="box2">
            <div id="cont">
              <div class="menu border_f0f0f0">
                <div class="menu_a" @click="$router.push({path:'/tra_notice'});">
                  <span class="menu_a_name">交易须知</span>
                </div>
                <div class="menu_a" @click="popout = true;">
                  <span class="menu_a_name">我要卖号</span>
                </div>
                <div class="menu_a" @click="$router.push({path:'/tra_product_status'});">
                  <span class="menu_a_name">交易记录</span>
                </div>
                <div class="menu_a" @click="$router.push({path:'/tra_service'});">
                  <span class="menu_a_name">联系客服</span>
                </div>
              </div>
              <div class="query">
                <div class="query_box border_eee">
                  <div class="criteria l" @click="screen == 'order' ? screen = '':screen = 'order';">
                    <span>{{ orderName }}</span>
                    <i class="icon_slide_down m_l" v-show="screen != 'order'"></i>
                    <i class="icon_slide_up m_l"  v-show="screen == 'order'"></i>
                    <div class="criterias" v-show="screen == 'order'">
                      <div @click.stop="orderType(1, 1);orderName = '最新发布';">最新发布</div>
                      <div @click.stop="orderType(2, 2);orderName = '价格最低';">价格最低</div>
                      <div @click.stop="orderType(2, 1);orderName = '价格最高';">价格最高</div>
                    </div>
                  </div>
                  <div class="criteria l" @click="screen == 'system' ? screen = '':screen = 'system';">
                    <span>{{ systemName }}</span>
                    <i class="icon_slide_down m_l" v-show="screen != 'system'"></i>
                    <i class="icon_slide_up m_l"  v-show="screen == 'system'"></i>
                    <div class="criterias" v-show="screen == 'system'">
                      <div @click.stop="systemType();">不限</div>
                      <div @click.stop="systemType(1);">安卓</div>
                      <div @click.stop="systemType(2);">ios</div>
                      <div @click.stop="systemType(3);">双端</div>
                    </div>
                  </div>
                  <div class="criteria" @click="searchFlag = !searchFlag">
                    <!--<div class="criteria" @click="$router.push({path:'/tra_search'})">-->
                    <span>选择游戏:</span>
                    <span class="criteria_gamename"><i class="icon_clear" @click.stop="gamenameType();criteria.game_name='';" v-show="criteria.game_name"></i>{{ criteria.game_name || '全部' }}</span>
                    <i class="icon_right_black"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <List :list="goodsList"></List>
          <!--加载动画-->
          <div v-show="loading">
            <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
          </div>
        </mt-loadmore>
      </div>
      <div class="screen" v-show="screen" @click="screen = '';"></div>
    </div>
    <div class="popout" v-show="popout">
      <div class="popout_box">
        <div class="popout_title">
          交易细则
        </div>
        <div class="popout_main">
          <div>
            <div class="t_title">出售流程</div>
            <div class="flow border_eee">
              <div class="flow_guide1">
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_only">
                  <div class="flow_guide1_point"></div>
                </div>
                <div class="flow_guide1_line"></div>
              </div>
              <div class="flow_guide2">
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../static/img/c_icon_tijiao-shangpiing.png" alt="">
                  <div class="flow_guide2_only_text">选择商品</div>
                </div>
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../static/img/c_icon_shenghedongjie.png" alt="">
                  <div class="flow_guide2_only_text">购买商品</div>
                </div>
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../static/img/c_icon_maijiagoumai.png" alt="">
                  <div class="flow_guide2_only_text">提取账号</div>
                </div>
                <div class="flow_guide2_only">
                  <img class="flow_guide2_only_icon" src="../../static/img/c_icon_huodeshouyi.png" alt="">
                  <div class="flow_guide2_only_text">交易成功</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="t_title">卖家须知</div>
            <div class="notes">
              <!--<div class="notes_only">-->
              <!--<p class="notes_only_num">1</p>-->
              <!--<p class="notes_only_text">角色信息已通过185官方平台审核，所传截图，账号信息为真实可靠，因时间因素造成排行榜变化·装备到期·军团解散等非主动因素，不视为账号信息不实。</p>-->
              <!--</div>-->
              <div class="notes_only" v-for="(v,i) in notesData.seller_notes">
                <p class="notes_only_num">{{ i+1 }}</p>
                <p class="notes_only_text">{{ v }}</p>
              </div>
            </div>
            <div class="t_title">如遇到以下情况，请警惕是骗子</div>
            <div class="notes">
              <!--<div class="notes_only">-->
              <!--<p class="notes_only_num">1</p>-->
              <!--<p class="notes_only_text">角色信息已通过185官方平台审核，所传截图，账号信息为真实可靠，因时间因素造成排行榜变化·装备到期·军团解散等非主动因素，不视为账号信息不实。</p>-->
              <!--</div>-->
              <div class="notes_only" v-for="(v,i) in notesData.business_notice">
                <p class="notes_only_num">{{ i+1 }}</p>
                <p class="notes_only_text">{{ v }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="popout_footer">
          <div class="user_agreement">
            <p v-if="agreement" @click="agreement = !agreement">
              <i class="icon_checked"></i>
              <span class="color_666666 m_l">我已经阅读并同意</span>
            </p>
            <p v-else-if="!agreement" @click="agreement = !agreement">
              <i class="icon_unchecked"></i>
              <span class="color_666666 m_l">我已经阅读并同意</span>
            </p>
            <!--<i class="icon_checked" v-if="agreement" @click="agreement = !agreement"></i>-->
            <!--<i class="icon_unchecked" v-else-if="!agreement" @click="agreement = !agreement"></i>-->
            <!--<span class="color_666666 m_l">我已经阅读并同意</span>-->
          </div>
          <div class="user_agreement_btn">
            <div class="btn_blue_ye" v-bind:style="{background:btnBgColor}" @click="onRouter">我记住了</div>
          </div>
        </div>
      </div>
    </div>
    <div class="search" v-show="searchFlag">
      <Search></Search>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import List from '../list/listTraGame.vue'
  import Search from './traSearch/traSearch.vue'
  export default {
    name: 'no_keep',
  	data(){
      return {
        popout: false,
        agreement: false,
        goodsList: [],
//        page: 1,
        screen: '',
        orderName: '最新发布',
        systemName: '不限',
        criteria: {
          game_name: '', //游戏名称
          system: '', //1安卓 2IOS 3双端
          order: 1, //1按时间排序 2按价格排序
          order_type: 1, //1降序 2升序
          page: 1,  //页数 从1开始 默认为1
        }, //搜索条件
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        searchFlag: false,
        notesData: {},
      }
    },
    components: { List, Search },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ]),
      btnBgColor: function () {
        return this.agreement ? '#29a1f7' : '#bbbbbb';
      },
    },
    created() {
      this.getGoodsList();
      this.getNotes();
		},
		mounted(){
			this.$nextTick(function () {
        document.getElementById('box2').style.height = document.getElementById('cont').offsetHeight + 'px';
			});
		},
    filters: {
      F_mobile: (data) => {
        let mobile = '';
        if(data){
          for(let i=0,len=data.length; i<len; i++){
            if(i>2 && i<7){
              mobile += '*';
            } else {
              mobile += data[i];
            }
          }
        }
        return mobile
      },
      F_system:(type) => {
          if(type == 1){
            type = '安卓';
          } else if(type == 2){
            type = 'ios';
          } else if(type == 3){
            type = '双端';
          } else {
            type = '不限';
          }
          return type;
      },
    },
    directives: {//自定义指令
      onScroll: {
        // 指令的定义
        inserted: function (event) {//被绑定元素插入到DOM中时调用
          var event = event || window.event;
          var flag = true;
          var menuHeight = document.getElementById('menu').offsetHeight;
          var box1 = document.getElementById('box1');
          var box2 = document.getElementById('box2');
          event.onscroll = function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var scrollTop = target.scrollTop;
            if(scrollTop > menuHeight) {
              if(flag) {
                let cont = document.getElementById('cont');
                box1.appendChild(cont);
                box1.style.display = 'block';
                flag = false;
              }
            } else {
              if(!flag) {
                let cont = document.getElementById('cont');
                box2.appendChild(cont);
                box1.style.display = 'none';
                flag = true;
              }
            }
          }
        }
      }
    },
    watch: {//使用watch 监听$router的变化
      $route(to, from) {
        console.log(to)
        if(document.querySelector('#box1>#cont')){
          document.getElementById('box2').appendChild(document.querySelector('#box1>#cont'));;
        }
      },
      criteria:{
        handler:function(val,oldval){
          console.log(val.system)
          if(val.system == 1){
            this.systemName = '安卓';
          } else if(val.system == 2){
            this.systemName = 'ios';
          } else if(val.system == 3){
            this.systemName = '双端';
          } else {
            this.systemName = '不限';
          }
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
    },
    methods: {
      loadTop(){
        setTimeout(() => {
          this.criteria.page = 1;
          this.status = true;
          this.getGoodsList();
          this.$refs.loadmore.onTopLoaded();
        },1500)
      },
      orderType(order,order_type){
        this.criteria.order = order;
        this.criteria.order_type = order_type;
        this.criteria.page = 1;
        this.status = true;
        this.getGoodsList();
        this.screen = '';
      },
      systemType(system){
        var system = system || '';
        this.criteria.game_name = '';
        this.criteria.system = system;
        this.criteria.page = 1;
        this.status = true;
        this.getGoodsList();
        this.screen = '';
      },
      gamenameType(gamename){
        var gamename = gamename || '';
        this.criteria.game_name = gamename;
        this.criteria.system = '';
        this.criteria.page = 1;
        this.status = true;
        this.getGoodsList();
        this.searchFlag = false;
      },
      onRouter(){
        if(this.agreement){
          this.popout = false;
          this.$router.push({path:'/tra_accounts'})
        }
      },
      getGoodsList(){
        if(this.status) {
          this.loading = true;
          let url = this.jointUrl({
            game_name: this.criteria.game_name,
            system: this.criteria.system,
            order: this.criteria.order, //1 按时间排序 2 按价格排序
            order_type: this.criteria.order_type, //1 降序 2 升序
            page: this.criteria.page
          });
          let mySign = md5(url + this.myType.key1).toLowerCase();
          let myUrl = this.jointUrl({
            game_name: this.criteria.game_name,
            system: this.criteria.system,
            order: this.criteria.order, //1 按时间排序 2 按价格排序
            order_type: this.criteria.order_type, //1 降序 2 升序
            page: this.criteria.page,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=Products&a=get_product_list',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(this.criteria.page);
              console.log(this.status);
              console.log(datas)
              if(datas.status == 1){//1成功
                if(this.criteria.page <= datas.data.count){
                  if(this.criteria.page == 1){
                    let list = datas.data.list;
                    for(let i = 0; i < list.length; i++){
                      list[i].publish_time = this.myType.formatTimeM(list[i].publish_time);
//                this.goodsList.push(list[i]);
                    }
                    this.goodsList = list;
                  } else {
                    let list = datas.data.list;
                    for(let i = 0; i < list.length; i++){
                      list[i].publish_time = this.myType.formatTimeM(list[i].publish_time);
                      this.goodsList.push(list[i]);
                    }
                  }
                  this.criteria.page++;
                } else if(datas.data.count == 0) {
                  this.goodsList = [];
                  this.status = false;
                } else {
                  this.status = false;
                }
                console.log(this.status);
              } else if(datas.status == 0){//0失败
                console.log(datas.msg);
              }
              setTimeout(() => this.loading = false,1000);
            })
            .catch(error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      //交易初始化
      getNotes(){
        this.$http.get('/api/index.php?g=api&m=Products&a=trade_notes')
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              this.notesData = datas.data;
            } else if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .transaction{
    width: 100%;
    flex: 1;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    #box1{
      display: none;
      width: 100%;
      position: absolute;
      /*z-index: 110;*/
      z-index: 5;
      top: 3.05rem;
      left: 0;
    }
    #box2{
      position: relative;
      z-index: 109;
    }
    #cont{
      position: relative;
      z-index: 111;
    }
    .popout{
      position: fixed;
      z-index: 1000000;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.3);
      display: flex;
      .popout_box{
        flex: 1;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .popout_title{
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          color: #ffffff;
          background-color: #29a1f7;
        }
        .popout_main{
          width: 100%;
          flex: 1;
          background-color: #ffffff;
          overflow-y: auto;
          .t_title{
            height: 1.4rem;
            line-height: 1.4rem;
            font-size: 1.1rem;
            color: #000000;
            padding: 0 .7rem;
            margin-top: 1rem;
          }
          .flow{
            padding: 0 .7rem 1rem;
            .flow_guide1{
              display: flex;
              align-items: center;
              position: relative;
              z-index: 1;
              .flow_guide1_only{
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .flow_guide1_point{
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                position: relative;
                z-index: 5;
                border: 1rem solid #ffffff;
                background: #ffffff url("../../static/img/c_icon_liuchengdian.png") no-repeat;
                background-size: 100% 100%;
              }
              .flow_guide1_line{
                display: inline-block;
                width: 70%;
                border-bottom: 1px dashed #2a9bf4;
                position: absolute;
                z-index: 2;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
              }
            }
            .flow_guide2{
              display: flex;
              align-items: center;
              .flow_guide2_only{
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .flow_guide2_only_icon{
                  width: 2.2rem;
                }
                .flow_guide2_only_text{
                  font-size: .85rem;
                  height: 1.8rem;
                  line-height: 1.8rem;
                }
              }
            }
          }
          .notes{
            padding: .7rem;
            .notes_only{
              display: flex;
              margin-bottom: 1rem;
              .notes_only_num{
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                font-size: .89rem;
                color: #ffffff;
                border-radius: .6rem;
                background-color: #d7d7d7;
                margin: 0 .5rem;
              }
              .notes_only_text{
                flex: 1;
                font-size: .89rem;
                line-height: 1.2rem;
                color: #666666;
              }
            }
          }
        }
        .popout_footer{
          background-color: #ffffff;
          .user_agreement{
            padding: 0 .6rem;
            display: flex;
            align-items: center;
            p{
              display: flex;
              align-items: center;
            }
          }
          .user_agreement_btn{
            margin: 1rem auto;
            display: flex;
            align-items: center;
            justify-content: center;
            .btn_blue_ye{
              border: none;
            }
          }
        }
      }
    }
    .search{
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #eeeeee;
    }
    .transaction_main{
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .menu{
      position: relative;
      z-index: 111;
      background-color: #ffffff;
      /*border-bottom: 1px solid #ccc;*/
      display: flex;
      /*padding-top: 1rem;*/
      /*padding-bottom: .4rem;*/
      /*padding: .6rem 0;*/
      .menu_a{
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .menu_a_img{
          width: 4rem;
          height: 4rem;
          /*margin-bottom: .4rem;*/
        }
        .menu_a_name{
          display: block;
          width: 100%;
          height: 1.8rem;
          line-height: 1.8rem;
          font-size: .85rem;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          /*padding: .6rem 0;*/
        }
      }
    }
    .query{
      position: relative;
      z-index: 101;
      /*background-color: #ffffff;*/
      /*padding: .6rem 0;*/
      /*display: flex;*/
      /*align-items: center;*/
      /*overflow-x: hidden;*/
      /*padding: 0 .6rem;*/
      .query_box{
        background-color: #ffffff;
        padding: .6rem 0;
        display: flex;
        align-items: center;
      }
      .criteria{
        display: flex;
        align-items: center;
        padding: 0 .6rem;
        .criteria_gamename{
          height: 1.2rem;
          line-height: 1.2rem;
          padding: 0 .2rem;
          font-size: .79rem;
          color: #29a1f7;
          border: 1px solid #29a1f7;
          border-radius: .6rem;
          margin: 0 1rem 0 .8rem;
          position: relative;
          .icon_clear{
            width: 1rem;
            height: 1rem;
            padding: 0;
            margin: 0;
            position: absolute;
            bottom: 100%;
            left: 100%;
            transform: translate3d(0, 50%, 0);
          }
        }
        .criterias{
          width: 100%;
          position: absolute;
          z-index: 101;
          left: 0;
          top: 100%;
          background-color: #ffffff;
          div{
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            border-bottom: 1px solid #f0f0f0;
          }
        }
      }
    }
    .screen{
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      z-index: 3;
      left: 0;
      top: 3.05rem;
    }
  }
</style>
