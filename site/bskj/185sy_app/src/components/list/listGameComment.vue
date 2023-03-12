<template><!--游戏详情-评论-->
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="true"
               @bottom-status-change="handleBottomChange" ref="loadmore">
    <div slot="bottom" class="mint-loadmore-bottom">
      <span v-show="bottomStatus === 'pull'" :class="{'rotate':bottomStatus==='drop'}">↑</span>
      <span v-show="bottomStatus === 'loading'">Loading...</span>
      <span v-show="bottomStatus === 'drop'">释放更新</span>
    </div>

    <div class="cl border_eee" v-for="(v,i) in commentList">
      <i class="icon_order" v-if="v.order == 1"></i>
      <img v-lazy="v.uid_iconurl" alt="" class="cl_l">
      <div class="cl_r">
        <div class="cl_r_t">
          <div class="user_name color_636363" v-text="v.uid_nickname"></div>
          <i class="icon_vip" v-if="v.uid_vip == 1"></i>
        </div>
        <div class="user_comment">
          <span v-if="v.touid_nickname">回复</span>
          <span class="color_507daf">{{ v.touid_nickname|F_nickname }}</span>
          <span v-if="v.touid_nickname" style="">:</span>{{ v.content }}
        </div>
        <div class="cl_r_b color_939393">
          <div class="comment_time" v-text="v.create_time"></div>
          <div class="do_comment" v-if="v.uid != userInfo.id" @click="doComment(v.uid, v.uid_nickname)">
            <i class="icon_comment"></i>
            <span class="do_comment_c">回复</span>
          </div>
          <div class="delete_comment" v-if="v.uid == userInfo.id" @click="deleteComment(v.id, i)">删除</div>
          <div class="comment_like">
            <i class="icon_like" v-if="v.like_type == 2" @click="setCommentLike(v.id, i);"></i>
            <i class="icon_likes" v-else-if="v.like_type == 1" @click="toast('您已经赞过了');"></i>
            <span class="comment_like_c" v-text="v.likes"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="make" :style="{right:descRight}">
      <MakeComment :makeComment="makeComment"></MakeComment>
    </div>
  </mt-loadmore>
</template>

<script>
//  import { Toast, MessageBox } from 'mint-ui';
  import { Toast, MessageBox, Indicator } from 'mint-ui';
  import { mapGetters } from 'vuex'
	import MakeComment from '../makecomment/makeComment.vue'
  export default {
    data(){
      return {
        userLoginApp: false,
        page: 1,
        commentList: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
//        makeCommentFlag: false,
        makeComment:{
          gid: 0, //游戏ID
          isGameID: 0,  //是否是SDK游戏ID 1 是 0 不是 默认为0（兼容旧版，不进入签名序列）
          reply_id: 0,  //回复用户ID
          reply_nickname: ''  //回复用户昵称
        },
        descRight: '-100%',
        allLoaded: false,
        bottomStatus: '',
      }
    },
    components:{ MakeComment },
    props: ['gid'],
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getCommentList();
      this.getUserLoginApp();//获取用户是否登陆过此游戏
    },
    mounted(){
      this.$nextTick(function () {
//          this.makeComment.gid = this.$route.query.id;//游戏id
      });
    },
    filters: {	//自定义局部过滤器
      F_nickname: (data) => {
        return data ? '@'+ data : data;
      }
    },
    methods:{
      loadBottom(){
        setTimeout(() => {
//          this.allLoaded = true;  //数据全部加载完毕
          this.getCommentList();
          this.$refs.loadmore.onBottomLoaded();
        },1500)
      },
      handleBottomChange(status){
        this.bottomStatus = status;
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
      getCommentList(init) {
        if(init){
          this.status = true;
          this.page = 1;
          this.commentList = []
        }
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          dynamics_id: this.$route.query.id,
          type: 2,
          page: this.page
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=comment&a=comment_list',{
          params: {
            uid: this.userInfo.id,
            channel: this.myType.channel,
            dynamics_id: this.$route.query.id,
            type: 2,//排序类型： 1为按热度 2为按时间
            page: this.page,
            comment_type: 2,//默认为1，评论类型 1 动态 2游戏（兼容旧版，不进入签名序列）
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(this.page > datas.data.count){
              this.allLoaded = true;  //数据全部加载完毕
            } else {
              if(datas.status == 1){//1成功
                let list = datas.data.list;
                for(let i=0,len=list.length; i < len; i++) {
                  list[i].create_time = this.myType.formatTimeM(list[i].create_time);
                  if(list[i].order == 1){
                    this.commentList.unshift(list[i]);//是否置顶
                  } else {
                    this.commentList.push(list[i]);
                  }
                }
                this.page++;
              }
              if (datas.status == 0) {//0失败
                console.log('请求失败：' + datas.msg);
              }
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
              this.commentList[index].like_type = 1;
              this.commentList[index].likes++;
            }
            if (datas.status == 0) {//0失败
              console.log('请求失败：' + datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //发表评论前置接口
      getUserLoginApp(){
        var url = this.jointUrl({
          username: this.userInfo.id,
          appid: this.$route.query.id
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=comment&a=user_login_app',{
          params: {
            username: this.userInfo.id,
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
          this.makeComment.gid = this.gid;
          this.makeComment.isGameID = 0;
          this.makeComment.reply_id = reply_id;
          this.makeComment.reply_nickname = reply_nickname;
//          this.makeCommentFlag = true;
          this.descRight = '0';
        } else {
          this.toast('安装登录后才可评论');
        }
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
                  this.commentList.splice(index,1);
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
  .commentList{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
