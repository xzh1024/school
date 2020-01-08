<!--游戏详情-->
<template>
    <div class="gameinfo">
  <!--<div class="gameinfo" v-soleScroll>-->
    <!--页头-->
    <!--<HeadTitle :head="head"></HeadTitle>-->
    <!--<div id="tabTop"></div>-->
      <div id="tabTop"></div>
      <div class="gameinfo_main" v-on:scroll.passive="onScroll($event)">
        <div class="topBox" ref="topBox" v-bind:class="topBoxBg">
          <!--<div class="head" ref="head">-->
          <!--&lt;!&ndash;<i class="icon_left_black" @click="goRouter"></i>&ndash;&gt;-->
          <!--<i class="icon_left_white" @click="goRouter"></i>-->
          <!--&lt;!&ndash;{{infoData.gameinfo.gamename}}&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="icon_download" :href="infoData.gameinfo.web_url" :download="infoData.gameinfo.web_pack"></i>&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="icon_game_share"  @click="isInvite"></i>&ndash;&gt;-->
          <!--<i class="icon_game_share2" @click="isInvite"></i>-->
          <!--</div>-->
          <div class="headBox" ref="headBox" :style="{opacity:headBoxOpacity}"></div>
          <div class="head" ref="head">
            <div class="head_left">
              <!--<invitebind:class="isLeftClass" @click="$router.go(-1);"></i>-->
              <i v-bind:class="isLeftClass" @click="$router.push({path:'/index/game'});"></i>
            </div>
            <div class="head_center">
              {{ gamename }}
            </div>
            <div class="head_right">
              <i v-bind:class="isShareClass" @click="isInvite"></i>
            </div>
          </div>
          <div class="gameBox" ref="gameBox">
            <div class="game" ref="game">
              <div class="game_l">
                <div class="game_l_qq" v-if="data.gameinfo.qq_group">
                  <a class="QQgroup" :href="data.gameinfo.qq_group">
                    <i class="icon_QQ"></i>
                    <span class="">玩家QQ群</span>
                  </a>
                </div>
                <!--<div class="game_r_time small3 color_blue" v-if="data.gameinfo.newgame == 1">-->
                  <!--<p>内测时间:</p>-->
                  <!--<p>{{ data.gameinfo.newgame_time }}</p>-->
                <!--</div>-->
                <!--<div class="game_r_time small3 color_blue" v-else-if="data.gameinfo.newgame == 2">-->
                  <!--<p>上线时间:</p>-->
                  <!--<p>{{ data.gameinfo.newgame_time }}</p>-->
                <!--</div>-->
              </div>
              <div class="game_c">
                <img v-lazy="data.gameinfo.logo" class="game_logo"></img>
                <div class="">
                  <!--<span class="icon_operate1" v-if="data.gameinfo.platform == 1"></span>-->
                  <!--<span class="icon_operate2" v-else-if="data.gameinfo.platform == 2"></span>-->
                  <div class="icon_red_bg">预计推广佣金{{ data.gameinfo.float_commission }}%</div>
                </div>
                <div class="game_name">{{ data.gameinfo.gamename }}</div>
                <div class="game_c_keyword">
                  <span class="game_c_keyword1 m_t_0_5rem" v-for="(v,i) in data.gameinfo.types" :class="'game_c_keyword'+(i+1)">{{ v }}</span>
                </div>
                <div class="game_c_mes color_black small2">
                  <div class="game_size" v-cloak>
                    {{ data.gameinfo.size|F_size }}
                  </div>
                  <!--<i class="game_split"></i>-->
                  <div class="gane_download" v-cloak>
                    {{ data.gameinfo.download|F_download }}
                  </div>
                </div>
                <!--<div class="rk" style="width: 100%;" v-if="data.gameinfo.top > 0" @click="$router.push({path:'/ranking_list'+'/'+$route.params.type})">-->
                  <!--<img src="../../static/img/e_icon_fengexianshang.png">-->
                  <!--<div class="rk_cont">-->
                    <!--<span class="flex1">185平台最火游戏</span>-->
                    <!--<span class="color_blue m_r">top{{ data.gameinfo.top }}</span>-->
                    <!--<i class="icon_medal"></i>-->
                  <!--</div>-->
                  <!--<img src="../../static/img/e_icon_fengexianshang.png" class="rk_bottom">-->
                <!--</div>-->
                <div class="rk" style="width: 100%;">
                  <img src="../../static/img/e_icon_fengexianshang.png">
                  <div class="rk_cont" v-if="data.gameinfo.top > 0" @click="$router.push({path:'/ranking_list'+'/'+$route.params.type})">
                    <span class="flex1">185平台最火游戏</span>
                    <span class="color_blue m_r">top{{ data.gameinfo.top }}</span>
                    <i class="icon_medal"></i>
                  </div>
                  <div class="qa" @click="$router.push({path:'/questions/'+data.gameinfo.id})">
                    <div class="qa_left">
                      <p class="small1">有<span class="color_blue" v-text="data.gameinfo.player"></span>人玩过该游戏</p>
                      <p class="small3 m_t">共<span class="color_blue">{{ data.gameinfo.question }}</span>条问题，收到<span class="color_blue">{{ data.gameinfo.answer }}</span>个回答，去逛逛吧！</p>
                    </div>
                    <div class="qa_right">
                      <span class="btn_blue_ye">向Ta请教</span>
                    </div>
                  </div>
                  <img src="../../static/img/e_icon_fengexianshang.png" class="rk_bottom">
                </div>
              </div>
              <div class="game_r" v-if="$route.query.type == 2 && data.gameinfo.discount">
                <div class="game_r_discount" v-if="data.gameinfo.discount">
                  {{ data.gameinfo.discount|F_dis }}
                </div>
                <div class="game_r_time small3 color_blue" v-if="data.gameinfo.newgame == 1">
                  <p>内测时间:</p>
                  <p>{{ data.gameinfo.newgame_time }}</p>
                </div>
                <div class="game_r_time small3 color_blue" v-else-if="data.gameinfo.newgame == 2">
                  <p>上线时间:</p>
                  <p>{{ data.gameinfo.newgame_time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tabCont" v-soleScroll>
          <div class="tab">
            <!--<div class="tab">-->
            <a class="tab-item active" @click="componentName = 'Info'">详情</a>
            <a class="tab-item" @click="componentName = 'GameComment'">
              <span class="tab-item-type">评论<span class="game_comment">{{ commentCounts }}</span> </span>
              <!--<span>({{ commentCounts }})</span>-->
            </a>
            <a class="tab-item" @click="componentName = 'GameGift'">
              <span class="tab-item-type">礼包<span class="game_comment">{{ giftCounts }}</span> </span>
              <!--<span>({{ kacListData.length }})</span>-->
            </a>
            <a class="tab-item" @click="componentName = 'Open'">
              <span>开服</span>
              <!--<span>({{ openList.future.length + openList.past.length }})</span>-->
            </a>
            <a class="tab-item" @click="componentName = 'StrategyList'">
              <span class="tab-item-type">攻略<span class="game_comment">{{ articleCounts }}</span> </span>
            </a>
          </div>
        </div>
        <keep-alive>
          <component :is="componentName" :infoData="data"></component>
        </keep-alive>
      </div>

      <div class="footer">
        <div class="footer_l">
          <a :class="isCollect" @click="gameCollect"></a><!--收藏-->
          <span class="color_d74d43 small2">收藏</span>
        </div>
        <div class="footer_c">
          <!--<a class="download_btn" v-if="$route.query.type == 3" @click="goGameH5(data.gameinfo.h5_url, data.gameinfo.appid, data.gameinfo.app_clientkey)">开始游戏</a>   &lt;!&ndash;:href="data.gameinfo.h5_url"&ndash;&gt;-->
          <!--<a class="download_btn" v-else-if="myType.channel == 185" :href="data.gameinfo.web_url" :download="data.gameinfo.web_pack" @click="downloadGame(event)">立即下载</a>-->
          <a class="download_btn" :href="data.gameinfo.web_url" :download="data.gameinfo.web_pack" @click="downloadGame(event);">
            <div>下载游戏</div>
            <div class="small">预计固定推广佣金{{ data.gameinfo.fixed_commission }}%</div>
          </a>
          <!--<a class="download_btn" type="button" v-else-if="JSON.stringify(data.clipboard) != '{}'" :href="data.clipboard.download_url"-->
             <!--v-clipboard:copy="data.clipboard.clipboard_data"-->
             <!--v-clipboard:success.stop="onCopy"-->
             <!--v-clipboard:error.stop="onError">立即下载</a>-->
        </div>
        <div class="footer_r" @click="doComment">
          <!--<i class="share"  @click="isInvite"></i>&lt;!&ndash;分享&ndash;&gt;-->
          <i class="icon_game_comment"></i>
          <span class="color_d74d43 small2">评论</span>
        </div>
      </div>
      <mt-popup
        v-model="payFlag"
        position="bottom">
        <div class="pay_nav">
          <div class="pay_list border_bdbdbb">
            <div class="pay_one" @click="share('weixin')">
              <i class="icon_wx"></i>
              <span class="pay_name">微信</span>
            </div>
            <div class="pay_one" @click="share('qq')">
              <i class="icon_QQ"></i>
              <span class="pay_name">QQ</span>
            </div>
            <div class="pay_one" @click="share('qzone')">
              <i class="icon_QQKJ"></i>
              <span class="pay_name">QQ空间</span>
            </div>
          </div>
          <div class="pay_btn color_blue" @click="payFlag = false">取&nbsp;消</div>
        </div>
      </mt-popup>
      <div class="make" :style="{right:descRight}">
        <!--<MakeComment :makeComment="makeComment" v-show="makeCommentFlag"></MakeComment>-->
        <MakeComment :makeComment="makeComment"></MakeComment>
      </div>
      <div class="screen" v-show="QqWxImg" @click="QqWxImg = false;">
        <img src="../../static/img/mengb-android.png">
      </div>
    </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
	import Info from './info/info.vue'
  import GameComment from './gameComment/gameComment.vue'
  import GameGift from './gameGift/gameGift.vue'
  import Open from './open/open.vue'
  import StrategyList from './strategyList/strategyList.vue'
  import MakeComment from '../makecomment/makeComment.vue'
  export default {
  	name: 'no_keep',
  	data(){
      return {
        componentName: 'Info',
      	data: {
          gameinfo: {
            collect: 0
          },
          like:[],
          clipboard: {},
        },
        makeComment:{
          gid: 0, //游戏ID
          isGameID: 0,  //是否是SDK游戏ID 1 是 0 不是 默认为0（兼容旧版，不进入签名序列）
          reply_id: 0,  //回复用户ID
          reply_nickname: ''  //回复用户昵称
        },
//        makeCommentFlag: false,
        commentCounts: 0,
        giftCounts: 0,
        articleCounts: 0,
        collectFlag: true,
        payFlag: false,
        userLoginApp: false, //标记是否有评论资格
        isLeftClass: 'icon_left_white',
        isShareClass: 'icon_game_share2',
        gamename: '',
        tabFlag: true,
        tabCont: '',
        tabTop: '',
//        commentHotList: [],//热门评论
        descRight: '-100%',
        headBoxOpacity: 0,
        topBoxBg: '',
        QqWx: false,
        QqWxImg: false,
      }
    },
    components: { Info, GameComment, GameGift, Open, StrategyList, MakeComment },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      isCollect: function () { //账户管理
        return this.data.gameinfo.collect == 1 ? 'y_collect' : 'n_collect';
      }
    },
    created() {
  	    console.log(this.$route.query)
      this.QqWx = this.is_weixn_qq();
      console.log(this.$route.query.channel);
//      if(location.search){
//        let url = location.search; //获取url中"?"符后的字串
//        let theRequest = new Object();
//        if (url.indexOf("?") != -1) {
//          let str = url.substr(1);
//          let strs = str.split("&");
//          for(let i = 0; i < strs.length; i++) {
//            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
//          }
//        }
//        if(!theRequest.channel){
//          location.href = location.href + '?channel='+ this.myType.channel;
//        }
//      } else {
//        location.href = location.href + '?channel='+ this.myType.channel;
//      }
    	this.getGameData();
//    	this.makeComment.gid = this.$route.params.id;
//      console.log(this.$store.dispatch)
      console.log(this.$route.query)
      if(this.$route.query.type == 1){
        this.topBoxBg = 'bg1';
      } else if(this.$route.query.type == 2) {
        this.topBoxBg = 'bg2';
      }
		},
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
//        this.getCommentCounts();//游戏评论数
        this.tabCont = document.getElementById('tabCont');
        this.tabTop = document.getElementById('tabTop');
      });
    },
    filters: {	//自定义局部过滤器
      F_size: (size) => {//过滤显示下载量
        return size ? size + 'M' : '';
      },
      F_download: (downloads) => {//过滤显示下载量
        if(downloads){
          var data = parseInt(downloads);
          if(data >= 10000) {
            data = parseInt(data/10000) + '万+下载';
          } else {
            data = data + '下载';
          }
          return data
        }
      },
      F_dis: (num) => {//过滤显示下载量
        return num ? num + '折' : '';
      }
    },
    directives: {//自定义指令
		  soleScroll: {
		    // 指令的定义
		    inserted: function (el) {//被绑定元素插入到DOM中时调用
		      //菜单添加事件
		      let tabs = document.querySelectorAll(".tab>a");
					for(let i = 0, len = tabs.length; i < len; i++) {
						tabs[i].addEventListener('click',function() {
							for(let n = 0, len = tabs.length; n < len; n++) {
								tabs[n].className = 'tab-item';
							}
							this.className = 'tab-item active';
						});
					}
		    }
		  }
		},
		methods:{
      is_weixn_qq(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger\/[0-9]/i)){
          return "WX";
        } else if (ua.match(/QQ\/[0-9]/i)){
          return "QQ";
        } else {
          return false;
        }
      },
      downloadGame(event){
        var e = event || window.event;
        if(this.QqWx){
          this.QqWxImg = true;
          if (e.preventDefault){
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
          return false;
        }
      },
      onCopy: function (e) {
          console.log(e)
        console.log(this.QqWx)
        if(this.QqWx){
          this.QqWxImg = true;
          if (e.preventDefault){
            e.preventDefault();
          } else {
            window.event.returnValue = false;
          }
          return false;
        }
//        if(e && e.stopPropagation){
//          e.stopPropagation();
//        }else{
//          window.event.cancelBubble = true;
//        }
        console.log('复制成功')
//        alert('You just copied: ' + e.text)
      },
      onError: function (e) {
        if(this.QqWx){
          this.QqWxImg = true;
          var event = e || window.event;
          if (e.preventDefault){
            e.preventDefault();
          } else {
            window.event.returnValue = false;
          }
          return false;
        }
        this.toast('Failed to copy texts');
      },
      goGameH5(url, appid, key){
//        this.$store.dispatch('setGameUrl',url);
        if(this.userInfo.id){
          let data = Base64.encode(JSON.stringify({
            url: url,
            appid: appid,
            key: key
          })); //处理明文
          localStorage.setItem("sy185_h5game", data);
//        this.$store.dispatch('getGameUrl',{
//          url: url,
//          appid: appid,
//          key: key
//        });
          this.$store.dispatch('getGameUrl');
          this.$router.push({path:'/play_games'})
        } else {
          this.$router.push({path:'/login'})
        }
      },
      onScroll(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var scrollTop = target.scrollTop;
        if(scrollTop > 0){
//          console.log(scrollTop);
          this.isLeftClass = 'icon_left_black';
          this.isShareClass = 'icon_game_share';
          this.gamename = this.data.gameinfo.gamename;
          if(scrollTop >= (this.$refs.gameBox.offsetHeight - this.$refs.head.offsetHeight)){
            this.headBoxOpacity = 1;
            if(this.tabFlag) {
              let newTab = document.querySelector('#tabCont>.tab');
              this.tabTop.appendChild(newTab);
              this.tabTop.style.display = "block";
              this.tabFlag = false;
            }
          } else {
            this.headBoxOpacity = 1 / (this.$refs.gameBox.offsetHeight - this.$refs.head.offsetHeight) * scrollTop;
            if(!this.tabFlag) {
              let newTab = document.querySelector('#tabTop>.tab');
              this.tabCont.appendChild(newTab);
              this.tabTop.style.display = "none";
              this.tabFlag = true;
            }
          }
        } else {
          this.headBoxOpacity = 0;
          this.isLeftClass = 'icon_left_white';
          this.isShareClass = 'icon_game_share2';
          this.gamename = '';
          let newTab = document.querySelector('#tabTop>.tab');
          if(newTab){
            this.tabCont.appendChild(newTab);
            this.tabTop.style.display = "none";
            this.tabFlag = true;
          }
        }
      },
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
			getChannelDownload(tag){
          console.log('no185')
        this.$http.get('/www/api-game-channelDownload',{
          params: {
            system: this.myType.system,
            tag: tag,
            channel: this.myType.channel
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 0){//0成功
              console.log('成功');
              this.data.clipboard = datas.data;
              console.log(this.data);
            }
            if(datas.status == 1) {//1失败
              console.log('请求失败：' + datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
			getGameData() {//获取游戏详情数据
        this.$http.get("/www/api-game-gameInfo", {
          params: {
            gid : this.$route.query.id,
            channel : this.myType.channel,
            system : this.myType.system,
            username : this.userInfo.username
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 0) {//返回的状态，0为成功
              let data = datas.data;
              this.commentCounts = data.gameinfo.comment_counts;
              this.giftCounts = data.gameinfo.pack_counts;
              this.articleCounts = data.gameinfo.article_counts;
              console.log('operate:',data.gameinfo.platform)
              if(data.gameinfo.platform == 1){
                this.topBoxBg = 'bg1';
              } else if(data.gameinfo.platform == 2){
                this.topBoxBg = 'bg2';
              }
              if(this.myType.channel == 185){

              }
              if(this.myType.system == 1){//安卓
                data.gameinfo.web_url = data.gameinfo.android_url;//下载地址
                data.gameinfo.web_pack = data.gameinfo.android_pack;//包名
              }
              if(this.myType.system == 2){//苹果
                data.gameinfo.web_url = data.gameinfo.ios_url;
                data.gameinfo.web_pack = data.gameinfo.ios_pack;
              }
              if(data.gameinfo.types){
                data.gameinfo.types = data.gameinfo.types.split(" ");
                data.gameinfo.types.length = data.gameinfo.types.length > 3 ? 3 : data.gameinfo.types.length;
              }
              if(data.gameinfo.newgame == 1 || data.gameinfo.newgame == 2){ //新游类型，0正常1内测2预约
                if(data.gameinfo.newgame_time == 0){
                  data.gameinfo.newgame_time = '敬请期待';
                } else {
                  data.gameinfo.newgame_time = this.myType.formatTimeD(data.gameinfo.newgame_time);
                }
              }
              data.gameinfo.logo = this.myType.domainName + data.gameinfo.logo;
              this.data.gameinfo = data.gameinfo;
              this.data.like = data.like;
              this.commentCounts = data.gameinfo.comment_counts; //评论数量
              if(this.myType.channel != 185){
                  console.log(data.gameinfo.tag)
                 this.getChannelDownload(this.data.gameinfo.tag);
              }
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
			},
      //获取评论数量
//      getCommentCounts() {
//        var url = this.jointUrl({
//          channel: this.myType.channel,
//          comment_type: 2,//评论类型： 1 动态 2 游戏
//          dynamics_id: this.$route.query.id
//        });
//        var mySign = md5(url + this.myType.key1).toLowerCase();
//        this.$http.get('/api/index.php?g=api&m=comment&a=get_comment_counts',{
//          params: {
//            channel: this.myType.channel,
//            comment_type: 2,//评论类型： 1 动态 2 游戏
//            dynamics_id: this.$route.query.id,
//            sign: mySign
//          }
//        })
//          .then(response => {
//            var datas = response.data;
//            if(datas.status == 1){//1成功
//              this.commentCounts = datas.data;
//            }
//            if (datas.status == 0) {//0失败
//              console.log('请求失败：' + datas.msg);
//            }
//          }, error => {
//            console.log('请求失败：' + error.status + '，' + error.statusText);
//          })
//      },
      //收藏、取消游戏
      gameCollect() {
        if(this.userInfo.id){//是否登录
          this.$router.push({path:'/login'});
        } else {
          if (this.collectFlag) {
            this.collectFlag = false;
            var isType = this.data.gameinfo.collect == 0 ? 1 : 2;
            this.$http.get('/www/api-game-collect', {
              params: {
                gid: this.$route.query.id,
                username: this.userInfo.username,
                system: this.myType.system,
                type: isType // 1收藏，2取消
              }
            })
              .then(response => {
                var datas = response.data;
                if (datas.status == 0) {//0成功
                  if (datas.msg == 'success') {
                    if (this.data.gameinfo.collect == 0) {
                      this.data.gameinfo.collect = 1;
                      this.toast('收藏成功');
                    } else {
                      this.data.gameinfo.collect = 0;
                      this.toast('取消成功');
                    }
                  } else {
                    this.toast(datas.msg);
                  }
                }
                if (datas.status == 1) {//1失败
                  this.toast(datas.msg);
                }
                this.collectFlag = true;
              })
              .catch(error => {
                this.collectFlag = true;
                console.log('请求失败：' + error.status + '，' + error.statusText);
              });
          }
        }
      },
      isInvite() {
        if(this.userInfo.id){
          this.payFlag = true;
        } else {
          this.$router.push({path:'/login'});
        }
      },
      //分享
      share(type) {
        mobShare.config({
          debug: true, // 开启调试，将在浏览器的控制台输出调试信息
          appkey: this.myType.sharekey, // appkey
          params: {
            url: 'http://across.185sy.com/game_info/' + this.$route.query.id, // 分享链接
            title: this.data.gameinfo.gamename, // 分享标题
            description: this.data.gameinfo.abstract, // 分享内容
            pic: this.myType.domainName + this.data.gameinfo.logo, // 分享图片，使用逗号,隔开
            reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
          },
          callback: function( plat, params ) {
            console.log('plat：' + plat);
            console.dir(params);
          }
        });
        mobShare(type).send();
      },
      //发表评论前置接口
      getUserLoginApp(){
        var url = this.jointUrl({
          username: this.userInfo.username,
          appid: this.$route.query.id
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=comment&a=user_login_app',{
          params: {
            username: this.userInfo.username,
            appid: this.$route.query.id,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.userLoginApp = true;
            } else {
              this.userLoginApp = false;
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //评论
      doComment(reply_id, reply_nickname){
        if(this.userLoginApp){
          var reply_id = reply_id || 0;
          var reply_nickname = reply_nickname || '';
          this.makeComment.gid = this.$route.query.id;
          this.makeComment.isGameID = 0;
          this.makeComment.reply_id = reply_id;
          this.makeComment.reply_nickname = reply_nickname;
          this.descRight = '0';
//          this.makeCommentFlag = true;
        } else {
          this.toast('安装并登录游戏后才可评论');
        }
      },
		}
  }
</script>

<style scoped lang="less">
  [v-cloak]{
    display:none;
  }
  .screen{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    /*z-index: 3;*/
    left: 0;
    top: 0;
    img{ max-width: 100%; max-height: 100%;}
  }
  .rk{
    margin-top: .5rem;
    display: flex;
    flex-direction: column;
    img{ width: 100%;}
    .rk_bottom{ transform: rotatez(180deg)}
    .rk_cont{
      padding: 0 .6rem;
      line-height: 1rem;
      display: flex;
      align-items: center;
      margin-bottom: .5rem;
    }
    .qa{
      display: flex;
      align-items: center;
      padding: 0 .6rem;
      .qa_left{
        flex: 1;
        .m_t{
          margin-top: .2rem;
        }
      }
      .qa_right{
        .btn_blue_ye{
          padding: 0 .8rem;
          margin-left: .5rem;
        }
      }
    }
  }
  .make{
    position: fixed;
    top: 0;
    z-index: 999;
    /*right: -100%;*/
    width: 100%;
    height: 100%;
    background: #ffffff;
    will-change: transform;
    transition: all 500ms;
    display: flex;
    flex-direction: column;
  }
  .gameinfo{
    width: 100%;
    /*height: 100%;*/
    flex: 1;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    .bg1{
      background: url("../../static/img/54_icon_beijing2.png") no-repeat;
      background-size: 100% 100%;
    }
    .bg2{
      background: url("../../static/img/a_icon_beijing2.png") no-repeat;
      background-size: 100% 100%;
    }
    .topBox{
      width: 100%;
      /*height: 15rem;*/
      /*background: url("../../static/img/54_icon_beijing2.png") no-repeat;*/
      /*background: url("../../static/img/a_icon_beijing.png") no-repeat;*/
      /*background-size: 100% 100%;*/
      .gameBox{
        width: 100%;
        overflow: hidden;
        padding-top: 3rem;
      }
      .game{
        background-color: #ffffff;
        margin: 1rem;
        padding: .5rem;
        display: flex;
        border-radius: .6rem;
        position: relative;
        .game_l{
          .game_l_qq{
            position: absolute;
            top: 1rem;
            left: 1rem;
            .QQgroup{
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
        }
        .game_c{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon_red_bg{
            height: 2rem;
            line-height: 2rem;
            padding: 0 1.5em;
            margin: .3em 0 .5em;
            text-align: center;
            color: #ffffff;
            background: url("../../static/img/wz/gameinfo/a_icon_di.png") no-repeat;
            background-size: 100% 100%;
          }
          .game_logo{
            display: inline-block;
            width: 4.2rem;
            height: 4.2rem;
            border-radius: .5rem;
          }
          .game_name{
            height: 1.1rem;
            line-height: 1.1rem;
            font-size: 1.1rem;
            /*margin: .5rem 0;*/
          }
          .game_quality{
            height: 1rem;
            line-height: 1rem;
          }
          .game_c_keyword{
            margin: .5rem 0;
            font-size: .85rem;
            color: #ffffff;
            display: flex;
            align-items: center;
            .game_c_keyword1{
              display: inline-block;
              height: 1.2rem;
              line-height: 1.2rem;
              padding: 0 .5rem;
              /*background-color: #59bcf5;*/
              background-color: #ffaa1c;
              border-radius: .6rem;
            }
            .game_c_keyword2{
              display: inline-block;
              height: 1.2rem;
              line-height: 1.2rem;
              padding: 0 .5rem;
              background-color: #ffaa1c;
              border-radius: .6rem;
              margin-left: .3rem;
            }
            .game_c_keyword3{
              display: inline-block;
              height: 1.2rem;
              line-height: 1.2rem;
              padding: 0 .5rem;
              background-color: #ff7b7c;
              border-radius: .6rem;
              margin-left: .3rem;
            }
          }
          .game_c_mes{
            display: flex;
            align-items: center;
            .game_size{
              padding-right: .7rem;
            }
            /*.game_split{*/
              /*width: 2px;*/
              /*height: 100%;*/
              /*background-color: #878787;*/
              /*margin: 0 .7rem;*/
            /*}*/
            .gane_download{
              padding-left: .7rem;
              border-left: 2px solid #878787;
            }
          }
        }
        .game_r{
          .game_r_discount{
            position: absolute;
            top: .1rem;
            right: 1rem;
            width: 4.5rem;
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            background: url("../../static/img/32_icon__z.png") no-repeat;
            background-size: 100% 100%;
            color: #ffffff;
            font-size: 1.2rem;
            /*font-weight: bold;*/
          }
          .game_r_time{
            position: absolute;
            bottom: 2rem;
            right: 1rem;
          }
        }
      }
    }
    .tab{
      position: relative;
      z-index: 4;
      display: flex;
      justify-content: center;
      /*子元素侧轴居中*/
      align-items: center;
      border-top: 1px solid #eeeeee;
      box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
      background-color: #fff;
      & > a{
        color: #837f7e;
        flex: 1;
        display: flex;
        flex-wrap: wrap;/*可多行*/
        justify-content: center;
        /*子元素侧轴居中*/
        align-items: center;/*单行*/
        align-content: center;/*多行*/
        /*text-align: center;*/
        font-size: 1.1rem;
        /*padding: .3rem 0;*/
        height: 3rem;
        border-top: 0.125rem solid transparent;
        border-bottom: 0.125rem solid transparent;
        &.active{
          color: #29a1f7;
          border-bottom: 0.125rem solid ;
        }
      }
    }
    #tabCont{
      height: 3.25rem;
    }
    #tabTop{
      width: 100%;
      display: none;
      position: absolute;
      top: 3rem;
      left: 0;
      z-index: 6;
    }
    .headBox{
      width: 100%;
      height: 3rem;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5;
      background-color: #ffffff;
    }
    .head{
      color: #666;
      background-color: transparent;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 6;
      /*分享*/
      .icon_game_share{
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background: url("../../static/img/37_icon_fx.png") no-repeat;
        background-size: contain;
      }
      .icon_game_share2{
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background: url("../../static/img/28_icon_fx.png") no-repeat;
        background-size: contain;
        /*position: absolute;*/
        /*top: 0.7rem;*/
        /*right: 1rem;*/
      }
    }
    .gameinfo_main{
      flex: 1;
      width: 100%;
      /*overflow: hidden;*/
      overflow-y: auto;
      .sole{
        border-bottom: 1px solid #ddd;
        padding: .8rem 1.4rem .8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .sole-logo{
          display: inline-block;
          width: 4rem;
          height: 4rem;
          border-radius: .5rem;
          margin-right: .7rem;
        }
        .sc{
          flex: 1;
          overflow-x: hidden;
          .sc_t{
            white-space:nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
          .sc_c{
            white-space:nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
            .sc_c_li{
              font-size: .85rem;
              line-height: .85rem;
              display: inline-block;
              padding: 0 .5rem;
              margin-right: .3rem;
              border-radius: .2rem;
              color: #f89d19;
              border: 1px solid #f89d19;
            }
          }
          .sc_b{
            .download{
              margin-right: 1rem;
            }
          }
        }
        /*QQ群*/
        .QQgroup{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
		.footer{
			background-color: #fff;
			border-top: 1px solid #eeeeee;
			width: 100%;
			height: 3.4rem;
			display: flex;
			/*justify-content: space-around;*/
			align-items: center;
      .footer_l,.footer_r{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 1rem;
      }
      .footer_c{
        flex: 1;
      }
			/*收藏*/
			.n_collect,.y_collect{
        /*margin-left: 2%;*/
        display: inline-block;
        width: 1.7rem;
        height: 1.7rem;
	    }
      .n_collect{
        background: url("../../static/img/34_icon_sc.png") no-repeat;
        background-size: contain;
      }
      .y_collect{
        background: url("../../static/img/55_icon_sc.png") no-repeat;
        background-size: contain;
      }
      /*下载*/
      .download_btn{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        /*height: 2.6rem;*/
        /*line-height: 2.6rem;*/
        padding: .2em 0;
        text-align: center;
        font-size: 1.1rem;
        border-radius: 2rem;
        color: #fff;
        background-color: #29a1f7;
      }
      .download_btn:link{ color: #fff; background-color: #29a1f7;}
      .download_btn:visited{ color: #fff; background-color: #29a1f7;}
      .download_btn:hover{ color: #fff; background-color: #29a1f7;}
      /*评论*/
      .icon_game_comment{
        /*margin-right: 2%;*/
        display: inline-block;
        width: 1.7rem;
        height: 1.7rem;
        background: url("../../static/img/wz/gameinfo/35_icon_plun_hong.png") no-repeat;
        background-size: contain;
      }
		}
  }
</style>
