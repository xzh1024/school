<!--发表评论-->
<template>
	<div class="makeComment">
    <!--页头-->
    <!--<div class="head">-->
      <!--<i class="icon_left" @click="setCommentFlag"></i>-->
      <!--发表评论-->
      <!--<div class="head_right" @click="doComment">发表</div>-->
    <!--</div>-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="setCommentFlag"></a>
      </div>
      <div class="head_center">
        发表评论
      </div>
      <div class="head_right">
        <span @click="doComment">发表</span>
      </div>
    </div>
    <div class="makeComment_main">
      <textarea name="" class="editBox" v-model="comment" :placeholder="isReplyNickname"></textarea>
    </div>
	</div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        comment: "",//评论内容
        reply: { //回复用户
          reply_id: 0,
          reply_nickname: ""
        },
        commentType: 2, //默认为1，评论类型 1 动态 2游戏（兼容旧版，不进入签名序列）
      }
    },
    props: {
      makeComment: {
        type: Object
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      isReplyNickname: function () { //账户管理
        var nickname = '';
        if(this.makeComment.reply_nickname){
          nickname = '@'+ this.makeComment.reply_nickname;
        }
        return nickname;
      }
    },
    created(){
//      this.getUser();
//      console.log(this.makeComment)
    },
    mounted(){
//      this.$nextTick(function () {
//        this.reply.reply_id = this.$route.params.reply_id;
//        this.isGameID = this.$route.params.isGameID;
//        if(this.$route.params.reply_nickname != ' '){
//          this.reply.reply_nickname = '@' + this.$route.params.reply_nickname;
//        } else {
//          this.reply.reply_nickname = '';
//        }
//        console.dir(this.$router);
//      });
    },
    methods: {
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
//      goRouter(){//返回上一个页面
//        this.$router.go(-1);
//      },
      setCommentFlag(){
//        this.$parent.makeCommentFlag = false;
        this.$parent.descRight = '-100%';
      },
      //发布评论
      doComment(){
        if(this.userInfo.id) {
          if(this.comment){
              console.log(this.comment)
            var url = this.jointUrl({
              uid: this.userInfo.id,
              to_uid: this.makeComment.reply_id,//回复用户ID 为0无回复用户
              channel: this.myType.channel,
              dynamics_id: this.makeComment.gid,//评论类型为1时 动态ID   评论类型为2时 游戏ID
              content: this.comment
            });
            var mySign = md5(url + this.myType.key1).toLowerCase();
            this.$http.get('/api/index.php?g=api&m=comment&a=do_comment',{
              params: {
                uid: this.userInfo.id,
                to_uid: this.makeComment.reply_id,//回复用户ID 为0无回复用户
                channel: this.myType.channel,
                dynamics_id: this.makeComment.gid,//评论类型为1时 动态ID   评论类型为2时 游戏ID
                content: this.comment,
                comment_type: this.commentType,
                is_fake: "",
                is_game_id: this.makeComment.isGameID,
                sign: mySign
              }
            })
              .then(response => {
                var datas = response.data;
                if(datas.status == 1){//1成功
                  this.toast(datas.msg);
                  this.comment = '';
                  this.setCommentFlag();
                  this.getUserCenter();
                }
                if (datas.status == 0) {//0失败
                  console.log('请求失败：' + datas.msg);
                }
              }, error => {
                console.log('请求失败：' + error.status + '，' + error.statusText);
              })
          } else {
            this.toast('写点什么吧');
          }
        } else {
          this.$router.push({path:'/login'});
        }
      },
      //获取用户中心
      getUserCenter(){
        let url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=user_center',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              if(datas.data){
                let data = datas.data;
                let money = {};
                money.coin = data.coin;
                money.platform_money = data.platform_money;
                this.$store.dispatch('setUserMoney',money);
              }
            } else if(datas.msg){
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<style scoped lang="less">
  .makeComment{
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    /*will-change: transform;*/
    /*transition: all 500ms;*/
    .makeComment_main{
      .editBox{
        outline: none;
        resize: none;
        width: 96%;
        height: 10rem;
        margin: 2%;
        border: 1px solid #ccc;
        border-radius: .2rem;
      }
    }
  }
</style>
