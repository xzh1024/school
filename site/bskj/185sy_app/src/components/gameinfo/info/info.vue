<template><!--游戏详情-详情-->
	<div class="info">
		<div class="intro" v-if="infoData.gameinfo.abstract">
			<div class="subtitle">
        <i class="icon_game_intro"></i>
        <span class="subtitle_name">游戏简介</span>
      </div>
      <InfoBanner :imgs="infoData.gameinfo.imgs"></InfoBanner>
			<div class="game_cont" ref="game_intro_cont">
				<p v-text="infoData.gameinfo.abstract"></p>
			</div>
			<div class="slide_toggle" v-slideToggle>
				<span class="color_blue">展开</span>
				<i class="icon_down"></i>
			</div>
		</div>
		<div class="feature" v-if="infoData.gameinfo.feature">
			<div class="subtitle">
        <i class="icon_game_feature"></i>
        <span class="subtitle_name">游戏特色</span>
      </div>
			<div class="game_cont">
				<p style="">{{ infoData.gameinfo.feature }}</p>
			</div>
			<div class="slide_toggle" v-slideToggle>
				<span class="color_blue">展开</span>
				<i class="icon_down"></i>
			</div>
		</div>
		<div class="rebate" v-if="infoData.gameinfo.rebate">
			<div class="subtitle">
        <i class="icon_game_rebate"></i>
        <span class="subtitle_name">游戏返利</span>
        <span class="infoBtn" @click="$router.push({path:'/rebate'});">申请返利</span>
      </div>
			<div class="game_cont">
        <p>{{ infoData.gameinfo.rebate }}</p>
      </div>
      <div class="slide_toggle" v-slideToggle>
        <span class="color_blue">展开</span>
        <i class="icon_down"></i>
      </div>
		</div>
		<div class="vip_price" v-if="infoData.gameinfo.vip">
			<div class="subtitle">
        <i class="icon_game_vip"></i>
        <span class="subtitle_name">VIP价格</span>
      </div>
      <div class="game_cont">
        <p>{{ infoData.gameinfo.vip }}</p>
      </div>
      <div class="slide_toggle" v-slideToggle>
        <span class="color_blue">展开</span>
        <i class="icon_down"></i>
      </div>
		</div>
		<div class="events" v-if="infoData.gameinfo.gif">
			<div class="subtitle">
        <i class="icon_game_events"></i>
        <span class="subtitle_name">精彩时刻</span>
      </div>
			<div class="game_tremendous">
        <!--<a class="icon_bofang" :href="myType.domainName + infoData.gameinfo.gif"></a>-->
        <img class="game_gif" :src="myType.domainName + infoData.gameinfo.gif" alt="" v-if="play">
        <img class="icon_bofang" src="../../../static/img/44_icon_bf.png" alt="" v-if="!play" @click="play = true">
      </div>
		</div>
    <div class="comment">
      <div class="subtitle">
        <i class="icon_game_comment"></i>
        <span class="subtitle_name">热门评论</span>
        <span class="infoBtn" @click="$parent.doComment();">我要评论</span>
      </div>
      <div class="comment_cont">
        <!--<div class="cl">-->
          <!--<i class="icon_order"></i>-->
          <!--<img src="" alt="" class="cl_l">-->
          <!--<div class="cl_r">-->
            <!--<div class="cl_r_t">-->
              <!--<div class="user_name color_636363">还是下雨</div>-->
              <!--<i class="icon_vip"></i>-->
            <!--</div>-->
            <!--<div class="user_comment">-->
              <!--雨停了-->
            <!--</div>-->
            <!--<div class="cl_r_b color_939393">-->
              <!--<div class="comment_time">2018-05-14 18:49</div>-->
              <!--<div class="do_comment">-->
                <!--<i class="icon_comment"></i>-->
                <!--<span class="do_comment_c">回复</span>-->
              <!--</div>-->
              <!--&lt;!&ndash;<div class="delete_comment" v-if="v.uid == user.user_id" @click="deleteComment(v.id, i)">删除</div>&ndash;&gt;-->
              <!--<div class="comment_like">-->
                <!--<i class="icon_like"></i>-->
                <!--&lt;!&ndash;<i class="icon_likes" v-if="v.like_type == 1"></i>&ndash;&gt;-->
                <!--<span class="comment_like_c">0</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="cl" v-for="(v,i) in commentHotList">
          <i class="icon_order" v-if="v.order == 1"></i>
          <img v-lazy="v.uid_iconurl" alt="" class="cl_l">
          <div class="cl_r">
            <div class="cl_r_t">
              <div class="user_name color_636363" v-text="v.uid_nickname">还是下雨</div>
              <i class="icon_vip" v-if="v.uid_vip == 1"></i>
            </div>
            <div class="user_comment">
              <span v-if="v.touid_nickname">回复</span>
              <span class="color_507daf">{{ v.touid_nickname|F_nickname }}</span>
              <span v-if="v.touid_nickname" style="">:</span>
              {{ v.content }}
          </div>
            <div class="cl_r_b color_939393">
              <div class="comment_time" v-text="v.create_time">2018-05-14 18:49</div>
              <!--<div class="do_comment">-->
                <!--<i class="icon_comment"></i>-->
                <!--<span class="do_comment_c">回复</span>-->
              <!--</div>-->
              <div class="do_comment" v-if="v.uid != userInfo.id" @click="$parent.doComment(v.uid, v.uid_nickname)">
                <i class="icon_comment"></i>
                <span class="do_comment_c">回复</span>
              </div>
              <div class="delete_comment" v-if="v.uid == userInfo.id" @click="deleteComment(v.id, i)">删除</div>
              <!--<div class="delete_comment" v-if="v.uid == user.user_id" @click="deleteComment(v.id, i)">删除</div>-->
              <div class="comment_like">
                <i class="icon_likes" v-if="v.like_type == 1" @click="toast('您已经赞过了');"></i>
                <i class="icon_like" v-else @click="setCommentLike(v.id, i);"></i>
                <span class="comment_like_c" v-text="v.likes">0</span>
              </div>
            </div>
          </div>
        </div>
        <div class="comment_list" @click="$router.push({path:'/game_comment_list/' + $route.params.id});">点击查看更多评论</div>
      </div>
    </div>
		<div class="like" v-if="infoData.like">
			<div class="subtitle">
        <i class="icon_game_like"></i>
        <span class="subtitle_name">猜你喜欢</span>
      </div>
			<div class="l_game">
        <p class="l_game_info" v-for="v in infoData.like" @click="router(v.id)">
          <img class="l_logo" v-lazy="myType.domainName + v.logo" alt="">
          <span class="l_name ">{{ v.gamename }}</span>
        </p>
      </div>
		</div>
		<!--<div class="user_comment">-->
			<!--<div class="subtitle">用户评论<span></span></div>-->
			<!--<div class="game_cont"></div>-->
		<!--</div>-->
	</div>
</template>

<script>
  import { Toast, MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
	import InfoBanner from '../../banner/infoBanner.vue'
  export default {
    inject:['reload'],
    data: function () {
      return {
        play: false,
        commentHotList: [],//热门评论
      }
    },
    components:{ InfoBanner },
    props: {
  		infoData: {
    		type: Object
  		}
	  },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created(){
      this.getCommentList();
    },
  	mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

      });
	  },
    filters: {	//自定义局部过滤器
      F_nickname: (data) => {
        return data ? '@'+ data : data;
      }
    },
    methods:{
      router(id) {
//        this.$router.replace({path: '/game_info/' + id + '/' + this.$route.params.type});
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: this.$route.query.type,
          channel: this.myType.channel
        }});
        this.reload();
      },
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      //评论列表
      getCommentList() {
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          dynamics_id: this.$route.query.id,
          type: 1,
          page: 1
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=comment&a=comment_list',{
          params: {
            uid: this.userInfo.id,
            channel: this.myType.channel,
            dynamics_id: this.$route.query.id,
            type: 1,//排序类型： 1为按热度 2为按时间
            page: 1,
            comment_type: 2,//默认为1，评论类型 1 动态 2游戏（兼容旧版，不进入签名序列）
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log(datas);
              let hotList = datas.data.hot_list;
              for(let i=0,len=hotList.length; i < len; i++) {
                hotList[i].create_time = this.myType.formatTimeM(hotList[i].create_time);
                if(hotList[i].order == 1){
                  this.commentHotList.unshift(hotList[i]);//是否置顶
                } else {
                  this.commentHotList.push(hotList[i]);
                }
              }
//              console.log(this.commentHotList)
            }
            if (datas.status == 0) {//0失败
              console.log('请求失败：' + datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //点赞
      setCommentLike(cid, index){
        if(!this.userInfo.id) {
          this.$router.push({path:'/login'});
        }
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          comment_id: cid,
          type: 1
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=likeinfo&a=comment_like',{
          params: {
            uid: this.userInfo.id,
            channel: this.myType.channel,
            comment_id: cid,
            type: 1,//赞踩类型赞 1 踩 0
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.toast(datas.msg);
              this.commentHotList[index].like_type = 1;
              this.commentHotList[index].likes++;
            }
            if (datas.status == 0) {//0失败
              console.log('请求失败：' + datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //删除评论
      deleteComment(cid, index){
        MessageBox.confirm('确定删除此评论?').then(action => {
          if(this.userInfo.id) {
            var url = this.jointUrl({
              uid: this.userInfo.id,
              channel: this.myType.channel,
              comment_id: cid
            });
            var mySign = md5(url + this.myType.key1).toLowerCase();
            this.$http.get('/api/index.php?g=api&m=comment&a=delete_comment',{
              params: {
                uid: this.userInfo.id,
                channel: this.myType.channel,
                comment_id: cid,
                sign: mySign
              }
            })
              .then(response => {
                var datas = response.data;
                if(datas.status == 1){//1成功
                  this.toast(datas.msg);
                  this.commentHotList.splice(index,1);
                }
                if (datas.status == 0) {//0失败
                  console.log('请求失败：' + datas.msg);
                }
              }, error => {
                console.log('请求失败：' + error.status + '，' + error.statusText);
              })
          } else {
            this.$router.push({path:'/login'});
          }
        });
      }
	  },
    directives: {//自定义指令
      slideToggle: {
        // 指令的定义
        inserted: function (el) {
          var el = el || window.event;
    //        let slide_toggle_btn = el.lastElementChild || el.lastChild;
          el.addEventListener('click',function () {
              let game_cont = this.previousElementSibling;
              if(this.firstElementChild.innerText == '展开'){
                game_cont.style.height = game_cont.firstElementChild.offsetHeight + 'px';
                this.lastElementChild.classList.add('icon_down_toggle');
                this.firstElementChild.innerText = '收起';
              } else {
                game_cont.style.height = '4.5rem';
                this.lastElementChild.classList.remove('icon_down_toggle');
                this.firstElementChild.innerText = '展开';
              }
          });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  pre{ white-space: pre-line;}
	.info{
		.subtitle{/*小标题*/
      height: 3rem;
      /*line-height: 3rem;*/
			padding: 0 1.5rem;
			border-top: 1px solid #eee;
			/*border-bottom: 1px solid #eee;*/
      display: flex;
      align-items: center;
      .subtitle_name{
        flex: 1;
        margin-left: .5rem;
        font-size: 1.2rem;
        color: #333333;
        font-weight: bold;
      }
      .infoBtn{
        display: inline-block;
        height: 2rem;
        line-height: 2rem;
        padding: 0 .4rem;
        color: #29a1f7;
        border: 1px solid #29a1f7;
        border-radius: 1rem;
      }
		}
		.game_cont{
      height: 4.5rem;
      line-height: 1.5rem;
			overflow: hidden;
      color: #666666;
      background-color: #fff;
			-webkit-transition: height .5s;
			-moz-transition: height .5s;
			-o-transition: height .5s;
			-ms-transition: height .5s;
			transition: height .5s;
      & > p{
        padding: 0rem .8rem .5rem;
        /*padding-top: 0;*/
        font-size: 1rem;
        white-space: pre-line;
      }
		}
    .comment{
      .comment_cont{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 1rem;
        .comment_list{
          display: inline-block;
          height: 2.6rem;
          line-height: 2.6rem;
          font-size: 1.1rem;
          padding: 0 5rem;
          color: #29a1f7;
          border: 1px solid #29a1f7;
          border-radius: 1.3rem;
        }
      }
    }
    .game_tremendous{
      background-color: #eeeeee;
      overflow: hidden;
      min-height: 8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: .5rem;
      border-radius: .4rem;
      .game_gif{
        max-width: 100%;
        max-height: 18rem;
      }
    }
		.slide_toggle{/*开关*/
			/*padding: .8rem 0;*/
      height: 2.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon_down{
				margin-left: 1rem;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -o-transition: all .5s;
        -ms-transition: all .5s;
        transition: all .5s;
			}
      .icon_down_toggle{ transform:rotateZ(180deg);}
		}
	}
  .cl{
    width: 94%;
    display: flex;
    padding: 1rem 2% 1rem 4%;
    position: relative;
    .icon_order{
      display: inline-block;
      width: 1.7rem;
      height: 1.6rem;
      background: url("../../../static/img/44_icon_zhiding.png") no-repeat;
      background-size: contain;
      position: absolute;
      top: .5rem;
      right: .5rem;
    }
    .cl_l{
      display: inline-block;
      width: 3.2rem;
      height: 3.2rem;
      margin-right: .5rem;
      border-radius: 50%;
      border: 1px solid #29a1f7;
    }
    .cl_r{
      flex: 1;
      .cl_r_t{
        margin-bottom: .6rem;
        display: flex;
        align-items: center;
        .user_name{
          font-size: .89rem;
          line-height: .89rem;
          margin-right: .3rem;
        }
      }
      .user_comment{
        line-height: 1.3rem;
        margin: 1.2rem 0 .8rem;
      }
      .cl_r_b{
        margin-top: .5rem;
        display: flex;
        align-items: center;
        .comment_time{
          flex: 1;
          font-size: .85rem;
          height: .85rem;
          line-height: .85rem;
        }
        .do_comment{
          margin-right: 1.5rem;
          display: flex;
          align-items: center;
          .do_comment_c{
            font-size: .89rem;
            margin-left: .2rem;
          }
        }
        .delete_comment{
          margin-right: 1rem;
          font-size: .89rem;
          line-height: .89rem;
          padding: .2rem .3rem;
          margin-left: .2rem;
          border: 1px solid #cccccc;
          border-radius: .2rem;
        }
        .comment_like{
          display: flex;
          align-items: center;
          .comment_like_c{
            font-size: .89rem;
            margin-left: .2rem;
            width: 2.2rem;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
