<template> <!--开车详情-->
	<div class="driveInfo">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        详情
      </div>
      <div class="head_right"></div>
    </div>
    <div class="driveInfo_main"
         v-infinite-scroll="getDriveInfo"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div v-if="driveInfo.uid">
        <mt-loadmore class="LoadMore" :auto-fill="false" :top-method="loadTop" ref="loadmore">
          <div class="only border_b_0-5rem">
            <div class="o_t">
              <img v-lazy="driveInfo.icon_url" alt="" class="user_logo" @click.stop="onUserInfo(driveInfo.uid)">
              <div class="o_t_c">
                <div>
                  <div class="user_name">
                    <span v-text="driveInfo.nick_name"></span>
                    &nbsp;
                    <i class="icon_men" v-if="driveInfo.sex == 1"></i>
                    <i class="icon_women" v-else-if="driveInfo.sex == 2"></i>
                    <i class="icon_vip" v-if="driveInfo.vip == 1"></i>
                  </div>
                  <div class="color_ababab small3" v-text="driveInfo.create_time"></div>
                </div>
              </div>
              <!--关注状态 0 未关注 1 关注 2 互相关注-->
              <div class="o_t_r" v-if="userInfo.id != driveInfo.uid">
                <div class="o_t_r_follow" v-if="driveInfo.is_follow == 0" @click.stop="followOrCancel(driveInfo.uid, 1)">
                  <i class="icon_follow o_t_r_center"></i>
                  <span class="o_t_r_center small2 color_blue">加关注</span>
                </div>
                <div class="o_t_r_follow" v-else-if="driveInfo.is_follow == 1" @click.stop="followOrCancel(driveInfo.uid, 2)">
                  <i class="icon_cancel o_t_r_center"></i>
                  <span class="o_t_r_center small2 color_ababab">取消关注</span>
                </div>
                <div class="o_t_r_follow" v-else-if="driveInfo.is_follow == 2" @click.stop="followOrCancel(driveInfo.uid, 2)">
                  <i class="icon_mutual o_t_r_center"></i>
                </div>
              </div>
            </div>
            <div class="o_c">
              <div class="o_c_text2">{{ driveInfo.content }}</div>
              <div class="o_c_imgs" v-if="driveInfo.imgs">
                <!--<img v-for="(imgUrl,index) in driveInfo.imgs"-->
                     <!--v-preview="imgUrl"-->
                     <!--v-lazy="imgUrl"-->
                     <!--:alt="++index"-->
                     <!--:key="index"-->
                     <!--preview-title-enable="true"-->
                     <!--preview-nav-enable="true">-->
                <img class="wc-preview-img" v-for="(url, key) in driveInfo.imgs" :key="key" :src="url" @click.stop="$preview($event, driveInfo.imgs, key)">
              </div>
            </div>
          </div>
          <div class="" v-if="hotList.length > 0">
            <div class="title1 border_eee">热门评论</div>
            <div class="hot_list">
              <div class="cl border_eee" v-for="(v,i) in hotList">
                <i class="icon_order" v-if="v.order == 1"></i>
                <img :src="v.uid_iconurl" alt="" class="cl_l" @click.stop="onUserInfo(v.uid)">
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
                    <div class="do_comment" v-if="v.uid != userInfo.id" @click.stop="showComment(v.uid)">
                      <i class="icon_comment"></i>
                      <span class="do_comment_c">回复</span>
                    </div>
                    <div class="delete_comment" v-if="v.uid == userInfo.id" @click="deleteHotComment(v.id, i)">删除</div>
                    <div class="comment_like">
                      <i class="icon_like" v-if="v.like_type == 2" @click="setHotLike(v.id, i)"></i>
                      <i class="icon_likes" v-else-if="v.like_type == 1" @click="toast('您已经赞过了');"></i>
                      <span class="comment_like_c" v-text="v.likes"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="title1 border_eee">全部评论(<span v-text="driveInfo.comment"></span>)</div>
            <div class="list">
              <div class="cl border_eee" v-for="(v,i) in list">
                <i class="icon_order" v-if="v.order == 1"></i>
                <img :src="v.uid_iconurl" alt="" class="cl_l" @click.stop="onUserInfo(v.uid)">
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
                    <div class="do_comment" v-if="v.uid != userInfo.id" @click.stop="showComment(v.uid)">
                      <i class="icon_comment"></i>
                      <span class="do_comment_c">回复</span>
                    </div>
                    <div class="delete_comment" v-if="v.uid == userInfo.id" @click="deleteAllComment(v.id, i)">删除</div>
                    <div class="comment_like">
                      <i class="icon_like" v-if="v.like_type == 2" @click="setAllLike(v.id, i)"></i>
                      <i class="icon_likes" v-else-if="v.like_type == 1" @click="toast('您已经赞过了');"></i>
                      <span class="comment_like_c" v-text="v.likes"></span>
                    </div>
                  </div>
                </div>
              </div>
              <!--加载动画-->
              <div v-show="loadAnimation">
                <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
              </div>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <div class="o_b small2" v-show="!commentFlag">
      <div class="o_b_box flex1" @click.stop="setLike()">
        <i class="icon_likes" v-if="driveInfo.operate == 1"></i> <!-- 已赞 -->
        <i class="icon_like" v-else></i>
        &nbsp;
        <span v-text="driveInfo.likes">0</span>
        <span>赞</span>
      </div>
      <i class="line"></i>
      <div class="o_b_box flex1" @click.stop="setDislike()">
        <i class="icon_dislikes" v-if="driveInfo.operate == 0"></i> <!-- 已踩 -->
        <i class="icon_dislike" v-else></i>
        &nbsp;
        <span v-text="driveInfo.dislike">0</span>
        <span>踩</span>
      </div>
      <i class="line"></i>
      <div class="o_b_box flex1" @click.stop="shareFlag = true">
        <i class="icon_share"></i>
        &nbsp;
        <span v-text="driveInfo.share">0</span>
        <span>分享</span>
      </div>
      <i class="line"></i>
      <div class="o_b_box flex1" @click.stop="showComment(0)">
        <i class="icon_comment"></i>
        &nbsp;
        <span v-text="driveInfo.comment">0</span>
        <span>评论</span>
      </div>
    </div>
    <div class="o_b" v-show="commentFlag">
      <input class="o_b_comment" type="text" placeholder="说点什么吧..." v-model="commentContent" ref="inputComment" v-on:blur="commentFlag = false;"/>
      <span class="o_b_comment_btn" @click="onComment">发送</span>
    </div>
    <mt-popup
      v-model="shareFlag"
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
        <div class="pay_btn color_blue" @click="shareFlag = false">取&nbsp;消</div>
      </div>
    </mt-popup>
	</div>
</template>

<script>
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data(){
      return {
        page: 1,
        driveInfo: {},
        list: [],
        hotList: [],
        shareFlag: false,
        followFlag: false,
        addLikeFlag: false,
        clearLikeFlag: false,
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation : false, //标记加载动画,false为隐藏
        commentFlag: false,
        toUid: 0,//回复用户ID 为0无回复用户
        commentContent: '', //评论内容
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created(){
      console.log(this.$route.params.id)
      this.getDriveInfo();
      this.indicator();
      console.log(window.location.href)
    },
    filters: {	//自定义局部过滤器
      F_nickname: (data) => {
        return data ? '@'+ data : data;
      }
    },
    methods: {
      showComment(id){
        if(this.userInfo.id){
          this.commentContent = '';
          this.toUid = id;
          console.log(this.toUid);
          this.commentFlag = true;
          this.$nextTick(function () {
            this.$refs.inputComment.focus();
          });
        } else {
          this.$router.push({path:'/login'});
        }
      },
      //发布评论
      onComment(){
        if(this.commentContent){
          var url = this.jointUrl({
            uid: this.userInfo.id,
            to_uid: this.toUid,
            channel: this.myType.channel,
            dynamics_id: this.$route.params.id,//动态id
            content: this.commentContent,//评论内容
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.userInfo.id,
            to_uid: this.toUid,
            channel: this.myType.channel,
            dynamics_id: this.$route.params.id,//动态id
            content: this.commentContent,//评论内容
            comment_type: 1, //默认为1，评论类型 1 动态 2游戏（兼容旧版，不进入签名序列）
//            is_fake: '',//被回复的评论的是否是灌水评论（兼容旧版，不进入签名序列）
//            is_game_id: '',//是否是SDK游戏ID 1 是 0 不是 默认为0（兼容旧版，不进入签名序列）
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=comment&a=do_comment',myUrl)
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                console.log(datas);
                if(datas.data){
                  this.toast(datas.data);
                } else {
                  this.toast(datas.msg);
                }
                this.page = 1;
                this.status = true;
                this.getDriveInfo();
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        } else {
          this.toast('说点什么吧...');
        }
      },
      loadTop(){
        setTimeout(() => {
          this.page = 1;
          this.status = true;
          this.getDriveInfo();
          this.$refs.loadmore.onTopLoaded();
        },1500)
      },
      toast (mes) {
        var mes = mes ? mes:'';
        Toast({
          message: mes,
          duration: 2000,
          className: 'm_toast'
        });
      },
      indicator () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      onUserInfo(buid){
        if(this.userInfo.id){
          this.$router.push({path:'/user_info/'+ buid});
//        this.$router.replace()
        } else {
          this.$router.push({path:'/login'});
        }
      },
      //获取开车详情
      getDriveInfo(){
        if(this.status){
          this.loadAnimation = true;
          this.loading = true;
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            dynamics_id: this.$route.params.id,//动态id
            type: 2, //排序类型1为按热度 2为按时间
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            dynamics_id: this.$route.params.id,//动态id
            type: 2, //排序类型1为按热度 2为按时间
            comment_type: 1,//默认为1，评论类型 1 动态 2游戏（兼容旧版，不进入签名序列）
            page: this.page,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=comment&a=comment_list',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                let data = datas.data;
                if(data.count == 0){
                  data.dynamics_info.create_time = this.myType.formatTimeM(data.dynamics_info.create_time);
                  this.driveInfo = data.dynamics_info;  //动态详情
                  this.status = false;
                  this.endIndicator(); //关闭加载动画
                } else if(this.page <= data.count){
                  if(this.page == 1){
                    data.dynamics_info.create_time = this.myType.formatTimeM(data.dynamics_info.create_time);
                    this.driveInfo = data.dynamics_info;  //动态详情
                    console.log(this.driveInfo)
                    let hot_list = data.hot_list; //热门评论只有请求第一页的时候会下发数据
                    for(let i=0,len=hot_list.length; i < len; i++){
                      hot_list[i].create_time = this.myType.formatTimeM(hot_list[i].create_time);
                    }
                    let list = data.list; //评论列表
                    for(let i=0,len=list.length; i < len; i++){
                      list[i].create_time = this.myType.formatTimeM(list[i].create_time);
                    }
                    this.hotList = hot_list;
                    this.list = list;
                    this.endIndicator(); //关闭加载动画
                  } else {
                    let list = data.list; //评论列表
                    for(let i=0,len=list.length; i < len; i++){
                      list[i].create_time = this.myType.formatTimeM(list[i].create_time);
                    }
//                  this.list = this.list.concat(list);//合并数组
                    this.list.push.apply(this.list,list);
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              if(datas.status == 0){//0失败
                this.status = false;
                this.endIndicator();
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              },1000);
            })
            .catch(error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      onUserInfo(buid){
        if(this.userInfo.id){
          this.$router.push({path:'/user_info/'+ buid});
        } else {
          this.$router.push({path:'/login'});
        }
      },
      //关注\取关
      followOrCancel(buid, type){
        if(!this.userInfo.id){
          this.$router.push({path:'/login'});
        } else {
          if(!this.followFlag){
            this.followFlag = true;
            var url = this.jointUrl({
              "uid": this.userInfo.id,
              "buid": buid, //被关注用户ID
              "type": type //1关注 2取关
            });
            var mySign = md5(url + this.myType.key1).toLowerCase();
            this.$http.get('/api/index.php?g=api&m=dynamics&a=followOrCancel',{
              params:{
                "uid": this.userInfo.id,
                "buid": buid, //被关注用户ID
                "type": type,
                "sign": mySign
              }
            })
              .then(response => {
                var datas = response.data;
                if(datas.status == 1){//1成功
                  console.log(datas);
                  this.toast('操作成功');
                  if(type == 1){
                    this.driveInfo.is_follow = 1;
                  } else if(type == 2){
                    this.driveInfo.is_follow = 0;
                  }
                }
                if(datas.status == 0){//0失败
                  this.toast('操作失败');
                  console.log('请求失败：' + datas.msg);
                }
                this.followFlag = false;
              })
              .catch(error => {
                this.followFlag = false;
                console.log('请求失败：' + error.status + '，' + error.statusText);
              });
          }
        }

      },
      //赞
      setLike(){
        if(!this.userInfo.id){
          this.$router.push({path:'/login'});
        } else {
          if(this.driveInfo.operate == 0){  //是否对该动态赞踩 0踩 1赞 2未赞踩
            //先取消踩，再赞
            this.setCancelDynamicsLike(0, 1);
          }
          if(this.driveInfo.operate == 1){ //已赞情况
            //取消赞
            this.setCancelDynamicsLike(1);
          }
          if(this.driveInfo.operate == 2){
            //赞
            this.setDynamicsLike(1);
          }
        }
      },
      //踩
      setDislike(){
        if(!this.userInfo.id){
          this.$router.push({path:'/login'});
        } else {
          if(this.driveInfo.operate == 0){  //是否对该动态赞踩 0踩 1赞 2未赞踩
            //取消踩
            this.setCancelDynamicsLike(0);
          }
          if(this.driveInfo.operate == 1){
            //先取消赞，再踩
            this.setCancelDynamicsLike(1, 0);
          }
          if(this.driveInfo.operate == 2){
            //踩
            this.setDynamicsLike(0);
          }
        }
      },
      //动态赞踩接口
      setDynamicsLike(type){
        if(!this.addLikeFlag){
          this.addLikeFlag = true;
          var url = this.jointUrl({
            "uid": this.userInfo.id,
            "channel": this.myType.channel,
            "dynamics_id": this.driveInfo.id,//动态ID
            "type": type //赞踩类型 赞1 踩0
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=likeinfo&a=dynamics_like',{
            params:{
              "uid": this.userInfo.id,
              "channel": this.myType.channel,
              "dynamics_id": this.driveInfo.id,
              "type": type,
              "sign": mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                console.log(datas);
                this.driveInfo.operate = datas.data.operate;
                if(type == 0){
                  this.driveInfo.dislike++;
                }
                if(type == 1){
                  this.driveInfo.likes++;
                }
                if(datas.data.bonus){
                  this.toast('+' + datas.data.bonus + '金币');
                }
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
              this.addLikeFlag = false;
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }

      },
      //取消动态赞踩接口
      setCancelDynamicsLike(type, call){
        if(!this.clearLikeFlag){
          this.clearLikeFlag = true;
          var url = this.jointUrl({
            "uid": this.userInfo.id,
            "channel": this.myType.channel,
            "dynamics_id": this.driveInfo.id,//动态ID
            "type": type //赞踩类型 赞1 踩0
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=likeinfo&a=cancel_dynamics_like',{
            params:{
              "uid": this.userInfo.id,
              "channel": this.myType.channel,
              "dynamics_id": this.driveInfo.id,
              "type": type,
              "sign": mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                console.log(datas);
                this.driveInfo.operate = datas.data.operate;
                if(type == 0){
                  this.driveInfo.dislike--;
                }
                if(type == 1){
                  this.driveInfo.likes--;
                }
                if(call == 0 || call == 1){
//                    let type = type == 0 ? 1:0;
                  this.setDynamicsLike(call);
                }
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
              this.clearLikeFlag = false;
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      //删除评论
      deleteComment(cid, index){
        MessageBox.confirm('确定删除此评论?').then(action => {
          if(!this.userInfo.id) {
            this.$router.push({path:'/login'});
          }
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
                this.hotList.splice(index,1);
              }
              if (datas.status == 0) {//0失败
                console.log('请求失败：' + datas.msg);
              }
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        });
      },
      //分享
      share(type) {
        mobShare.config({
          debug: true, // 开启调试，将在浏览器的控制台输出调试信息
          appkey: this.myType.sharekey, // appkey
          params: {
            url: 'http://across.185sy.com/drive_info/' + this.$route.params.id, // 分享链接
            title: '【分享】', // 分享标题
            description: '123', // 分享内容
            pic: this.driveInfo.imgs?this.driveInfo.imgs[0]:'', // 分享图片，使用逗号,隔开
            reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
          },
          callback: function( plat, params ) {
            console.log('plat：' + plat);
            console.dir(params);
          }
        });
        mobShare(type).send();
      },
      //点赞
      setHotLike(cid, index){
        if(this.userInfo.id) {
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
                this.hotList[index].like_type = 1;
                this.hotList[index].likes++;
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
      },
      //点赞
      setAllLike(cid, index){
        if(this.userInfo.id) {
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
                this.list[index].like_type = 1;
                this.list[index].likes++;
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
      },
      //删除评论
      deleteHotComment(cid, index){
        MessageBox.confirm('确定删除此评论?').then(action => {
          if(this.userInfo.id) {
            this.indicator();
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
                  this.hotList.splice(index,1);
                }
                if (datas.status == 0) {//0失败
                  console.log('请求失败：' + datas.msg);
                }
                this.endIndicator();
              }, error => {
                this.endIndicator();
                console.log('请求失败：' + error.status + '，' + error.statusText);
              })
          } else {
            this.$router.push({path:'/login'});
          }
        });
      },
      deleteAllComment(cid, index){
        MessageBox.confirm('确定删除此评论?').then(action => {
          if(this.userInfo.id) {
            this.indicator();
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
                  this.list.splice(index,1);
                }
                if (datas.status == 0) {//0失败
                  console.log('请求失败：' + datas.msg);
                }
                this.endIndicator();
              }, error => {
                this.endIndicator();
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
  input::-webkit-input-placeholder{ color:#ababab;}
  input::-moz-placeholder{ color:#ababab;}  /* Mozilla Firefox 19+ */
  input:-moz-placeholder{ color:#ababab;} /* Mozilla Firefox 4 to 18 */
  input:-ms-input-placeholder{ color:#ababab;} /* Internet Explorer 10-11 */
  .driveInfo{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .driveInfo_main{
      flex: 1;
      overflow-y: auto;
      background: #f0f0f0;
      .only .o_c .o_c_text2{
        margin-bottom: .5rem;
        font-size: 1rem;
        line-height: 1.4rem;
      }
    }
  }
</style>

