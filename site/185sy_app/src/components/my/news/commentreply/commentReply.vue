<!--评论回复-->
<template>
  <div class="commentReply"
       v-infinite-scroll="getReplayComment"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <div class="cr border_f0f0f0" v-for="v in replayCommentList">
      <div class="cr_t">
        <span class="strong" v-text="v.nick_name"></span>
        <span class="color_507daf">&nbsp;回复&nbsp;</span>
        <span>你</span>
      </div>
      <div class="cr_c" v-html="v.content"></div>
      <div class="cr_b color_939393">
        <span class="flex1" v-text="v.create_time"></span>
        <i class="icon_do_comment" @click="doComment(v.dynamics_id, v.uid, v.nick_name)"></i>
        <span class="btn_do_comment" @click="doComment(v.dynamics_id, v.uid, v.nick_name)">回复</span>
      </div>
    </div>
    <!--加载动画-->
    <div v-show="loading">
      <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
    </div>
    <MakeComment :makeComment="makeComment" v-show="makeCommentFlag"></MakeComment>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  import MakeComment from '../../../makecomment/makeComment.vue'
  export default {
  	data: function () {
      return {
        userLoginApp: false,
        message: "",
        makeCommentFlag: false,
        makeComment: {
          gid: 0,
          isGameID: 0,
          reply_id: 0,
          reply_nickname: ""
        },
        page: 1,
        replayCommentList: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
      }
    },
    components:{ MakeComment },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getReplayComment();
      this.getUserLoginApp();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      toast () {
        Toast({
          message: this.message,
          duration: 2000,
          className: 'm_toast'
        });
      },
      //发表评论前置接口
      getUserLoginApp(){
        var url = this.jointUrl({
          username: this.userInfo.id,
          appid: this.$route.params.id
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=comment&a=user_login_app',{
          params: {
            username: this.userInfo.id,
            appid: this.$route.params.id,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.userLoginApp = true;
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //评论回复列表
      getReplayComment() {
        if(this.status) {
          this.loading = true;
          var url = this.jointUrl({
            uid: this.userInfo.id,
            comment_type: 2,//评论类型 1 动态 2 游戏
            channel: this.myType.channel,
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=comment&a=get_replay_comment',{
            params: {
              uid: this.userInfo.id,
              comment_type: 2,//评论类型 1 动态 2 游戏
              channel: this.myType.channel,
              page: this.page,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(this.page >= datas.data.count){
                this.status = false;
              }
              if(datas.status == 1){//1成功
                let list = datas.data.list;
                for(let i=0,len=list.length; i < len; i++) {
                  list[i].create_time = this.myType.formatTimeM(list[i].create_time);
                  this.replayCommentList.push(list[i]);
                }
                this.page++;
              }
              if (datas.status == 0) {//0失败
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => {//保证1s的动画效果
                this.loading = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.loading = true;
        }
      },
      //回复
      doComment(dynamics_id, reply_id, reply_nickname){
        if(this.userLoginApp){
          var reply_id = reply_id || 0;
          var reply_nickname = reply_nickname || '';
          this.makeComment.gid = dynamics_id;
          this.makeComment.isGameID = 1;
          this.makeComment.reply_id = reply_id;
          this.makeComment.reply_nickname = reply_nickname;
          this.makeCommentFlag = true;
        } else {
          this.message = '安装登录后才可评论';
          this.toast();
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .commentReply{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .cr{
      padding: .8rem;
      .cr_t{
        display: flex;
        line-height: 1rem;
      }
      .cr_c{
        margin-top: .6rem;
        margin-left: .4rem;
        line-height: 1.4rem;
      }
      .cr_b{
        margin-top: .6rem;
        display: flex;
        align-items: center;
        font-size: .85rem;
        .btn_do_comment{
          padding-left: .2rem;
        }
      }
    }
  }
</style>
