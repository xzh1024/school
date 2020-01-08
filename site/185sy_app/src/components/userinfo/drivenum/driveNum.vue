<template> <!--全部-->
	<div class="driveNum">
    <div class="driveNum_main" v-if="driveList.length"
      v-infinite-scroll="getDriveList"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="3">
      <div class="flex1">
        <mt-loadmore class="LoadMore" :auto-fill="false" :top-method="loadTop" ref="loadmore">
          <!--<div class="only border_b_0-5rem">-->
          <!--<div class="o_t">-->
          <!--<img src="" alt="" class="user_logo">-->
          <!--<div class="o_t_c">-->
          <!--<div class="user_name">-->
          <!--<span>还是下雨</span>-->
          <!--&nbsp;-->
          <!--<i class="icon_men"></i>-->
          <!--</div>-->
          <!--<div class="color_ababab small3">2018-03-28 17:06</div>-->
          <!--</div>-->
          <!--<div class="o_t_r">-->
          <!--<p class="o_t_r_end m_b_0_5rem color_ff0000">删除</p>-->
          <!--<p class="o_t_r_end small2 color_4ca52f">审核成功</p>-->
          <!--<p class="o_t_r_end small1 color_837f7e">2018-03-28 17:07发布</p>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="o_c color_636363">-->
          <!--<p class="m_b_0_5rem">在路上</p>-->
          <!--</div>-->
          <!--<div class="o_b small2">-->
          <!--<div class="o_b_box flex1">-->
          <!--<i class="icon_like"></i>-->
          <!--&nbsp;-->
          <!--<span>0</span>-->
          <!--<span>赞</span>-->
          <!--</div>-->
          <!--<i class="line"></i>-->
          <!--<div class="o_b_box flex1">-->
          <!--<i class="icon_dislike"></i>-->
          <!--&nbsp;-->
          <!--<span>0</span>-->
          <!--<span>踩</span>-->
          <!--</div>-->
          <!--<i class="line"></i>-->
          <!--<div class="o_b_box flex1">-->
          <!--<i class="icon_share"></i>-->
          <!--&nbsp;-->
          <!--<span>0</span>-->
          <!--<span>分享</span>-->
          <!--</div>-->
          <!--<i class="line"></i>-->
          <!--<div class="o_b_box flex1">-->
          <!--<i class="icon_comment"></i>-->
          <!--&nbsp;-->
          <!--<span>0</span>-->
          <!--<span>评论</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <div class="only border_b_0-5rem" v-for="(v,i) in driveList" @click="$router.push({path:'/drive_info/'+ v.dynamics.id});">
            <div class="o_t">
              <img v-lazy="v.user.icon_url" alt="" class="user_logo">
              <div class="o_t_c">
                <div>
                  <div class="user_name">
                    <span v-text="v.user.nick_name"></span>
                    &nbsp;
                    <i class="icon_men" v-if="v.user.sex == 1"></i>
                    <i class="icon_women" v-else-if="v.user.sex == 2"></i>
                    <i class="icon_vip" v-if="v.user.vip == 1"></i>
                  </div>
                  <div class="color_ababab small3" v-text=" v.dynamics.publish_time"></div>
                </div>
              </div>
              <div class="o_t_r" v-if="userInfo.id == $route.params.buid">
                <p class="o_t_r_end m_b_0_5rem color_ff0000" @click.stop="delDynamic(v.dynamics.id, i)">删除</p>
                <p class="o_t_r_end small2 color_4ca52f">
                  <span class="color_4ca52f" v-if="v.dynamics.status == 1">审核成功</span>
                  <span class="color_3a88da" v-else-if="v.dynamics.status == 2">等待审核</span>
                  <span class="color_ff0000" v-else-if="v.dynamics.status == 3">审核失败</span>
                </p>
                <p class="o_t_r_end small1 color_837f7e" v-if="v.dynamics.status == 1">{{ v.dynamics.create_time }}发布</p>
              </div>
            </div>
            <div class="o_c">
              <div class="o_c_text">{{ v.dynamics.content }}</div>
              <div class="o_c_imgs" v-if="v.dynamics.imgs">
                <!--<img v-lazy="item" alt="" v-for="item in v.dynamics.imgs">-->
                <!--<img v-for="(imgUrl,index) in v.dynamics.imgs"-->
                     <!--v-preview="imgUrl"-->
                     <!--v-lazy="imgUrl"-->
                     <!--:alt="++index+'/'+v.dynamics.imgs.length"-->
                     <!--:key="index"-->
                     <!--preview-title-enable="true"-->
                     <!--preview-nav-enable="true">-->
                <img class="wc-preview-img" v-for="(url, key) in v.dynamics.imgs" :key="key" :src="url" @click.stop="$preview($event, v.dynamics.imgs, key)">
              </div>
              <div class="o_c_comment small1">
                <p class="o_c_comment_info" v-for="item in v.dynamics.comment_info">
                  <span>{{ item.username|F_username }}</span>
                  <span class="color_636363" v-text="item.content"></span>
                </p>
              </div>
            </div>
            <div class="o_b small2">
              <div class="o_b_box flex1" @click.stop="setLike(i)">
                <i class="icon_likes" v-if="v.user.operate == 1"></i> <!-- 已赞 -->
                <i class="icon_like" v-else></i>
                &nbsp;
                <span v-text="v.dynamics.likes">0</span>
                <span>赞</span>
              </div>
              <i class="line"></i>
              <div class="o_b_box flex1" @click.stop="setDislike(i)">
                <i class="icon_dislikes" v-if="v.user.operate == 0"></i> <!-- 已踩 -->
                <i class="icon_dislike" v-else></i>
                &nbsp;
                <span v-text="v.dynamics.dislike">0</span>
                <span>踩</span>
              </div>
              <i class="line"></i>
              <div class="o_b_box flex1" @click.stop="shareDynamics = v; payFlag = true">
                <i class="icon_share"></i>
                &nbsp;
                <span v-text="v.dynamics.share">0</span>
                <span>分享</span>
              </div>
              <i class="line"></i>
              <div class="o_b_box flex1">
                <i class="icon_comment"></i>
                &nbsp;
                <span v-text="v.dynamics.comment">0</span>
                <span>评论</span>
              </div>
            </div>
          </div>
          <!--加载动画-->
          <div v-show="loading">
            <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
          </div>
          <mt-popup
            v-model="payFlag"
            position="bottom">
            <div class="pay_nav">
              <div class="pay_list border_bdbdbb">
                <div class="pay_one" @click.stop="share('weixin')">
                  <i class="icon_wx"></i>
                  <span class="pay_name">微信</span>
                </div>
                <div class="pay_one" @click.stop="share('qq')">
                  <i class="icon_QQ"></i>
                  <span class="pay_name">QQ</span>
                </div>
                <div class="pay_one" @click.stop="share('qzone')">
                  <i class="icon_QQKJ"></i>
                  <span class="pay_name">QQ空间</span>
                </div>
              </div>
              <div class="pay_btn color_blue" @click.stop="payFlag = false">取&nbsp;消</div>
            </div>
          </mt-popup>
        </mt-loadmore>
      </div>
    </div>
    <div class="not" v-else>
      <img class="not_img" src="../../../static/img/31_icon_weidenglu.png">
      <div class="not_text f_s1 color_837f7e">
        暂无数据
      </div>
    </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Toast, MessageBox, Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        payFlag: false,
        shareDynamics:{},
        page: 1,
        driveList: [], //开车列表
        addLikeFlag: true,
        clearLikeFlag: true,
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created(){
      this.getDriveList();
    },
    filters: {	//自定义局部过滤器
      F_username: (data) => {
        return data ? data + '：' : data;
      }
    },
    methods: {
      loadTop(){
        setTimeout(() => {
          this.page = 1;
          this.status = true;
          this.getDriveList();
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
      //赞
      setLike(index){
//          this.$parent.setDynamicsLike();
        if(this.driveList[index].user.operate == 0){  //是否对该动态赞踩 0踩 1赞 2未赞踩
          //先取消踩，再赞
          this.setCancelDynamicsLike(index, 0, 1);
//            this.$nextTick(function () {
//              this.$parent.setDynamicsLike(index, 1);
//            });
        }
        if(this.driveList[index].user.operate == 1){ //已赞情况
          //取消赞
          this.setCancelDynamicsLike(index, 1);
        }
        if(this.driveList[index].user.operate == 2){
          //赞
          this.setDynamicsLike(index, 1);
        }
      },
      //踩
      setDislike(index){
//          this.$parent.setDynamicsLike();
        if(this.driveList[index].user.operate == 0){  //是否对该动态赞踩 0踩 1赞 2未赞踩
          //取消踩
          this.setCancelDynamicsLike(index, 0);
        }
        if(this.driveList[index].user.operate == 1){
          //先取消赞，再踩
          this.setCancelDynamicsLike(index, 1, 0);
//            this.$nextTick(function () {
//              this.$parent.setDynamicsLike(index, 0);
//            });
        }
        if(this.driveList[index].user.operate == 2){
          //踩
          this.setDynamicsLike(index, 0);
        }
      },
      //分享
      share(type) {
        mobShare.config({
          debug: true, // 开启调试，将在浏览器的控制台输出调试信息
          appkey: this.myType.sharekey, // appkey
          params: {
            url: 'http://across.185sy.com/drive_info/' + this.shareDynamics.dynamics.id, // 分享链接
            title: this.shareDynamics.user.nick_name, // 分享标题
            description: this.shareDynamics.dynamics.content, // 分享内容
            pic: this.shareDynamics.dynamics.imgs[0]?this.shareDynamics.dynamics.imgs[0]:'', // 分享图片，使用逗号,隔开
            reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
          },
          callback: function( plat, params ) {
            console.log('plat：' + plat);
            console.dir(params);
          }
        });
        mobShare(type).send();
      },
      //获取开车列表
      getDriveList(){
        if(this.status){
          this.loading = true;
          var url = this.jointUrl({
            type: 5, //类型，1热门2全部3穿越4关注5用户详情的开车数
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.userInfo.id,
            buid: this.$route.params.buid || this.userInfo.id ,//被查看开车动态的用户ID(不参与签名，type为5时有此值)
            type: 5,
            page: this.page,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=dynamics&a=getDynamics',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas);
              if(datas.status == 1){//1成功
                if(datas.data){
                  let data = datas.data;
                  for(let i=0,len=data.length; i < len; i++){
                    data[i].dynamics.create_time =  this.myType.formatTimeM(data[i].dynamics.create_time);
                    data[i].dynamics.publish_time =  this.myType.formatTimeM(data[i].dynamics.publish_time);
//                    if(this.page != 1){
//                      this.driveList.push(data[i]);
//                    }
                  }
                  if(this.page == 1){
                    this.driveList = data;
                  } else {
                    this.driveList = this.driveList.concat(data);
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              if(datas.status == 0){//0失败
                this.status = false;
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => this.loading = false,1000);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      //动态赞踩接口
      setDynamicsLike(index, type){
        if(this.addLikeFlag){
          this.addLikeFlag = false;
          var url = this.jointUrl({
            "uid": this.userInfo.id ,
            "channel": this.myType.channel,
            "dynamics_id": this.driveList[index].dynamics.id,//动态ID
            "type": type //赞踩类型 赞1 踩0
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=likeinfo&a=dynamics_like',{
            params:{
              "uid": this.userInfo.id ,
              "channel": this.myType.channel,
              "dynamics_id": this.driveList[index].dynamics.id,
              "type": type,
              "sign": mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                console.log(datas);
                this.driveList[index].user.operate = datas.data.operate;
                if(type == 0){
                  this.driveList[index].dynamics.dislike++;
                }
                if(type == 1){
                  this.driveList[index].dynamics.likes++;
                }
                if(datas.data.bonus){
                  this.toast('+' + datas.data.bonus + '金币');
                }
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
              this.addLikeFlag = true;
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }

      },
      //取消动态赞踩接口
      setCancelDynamicsLike(index, type, call){
        if(this.clearLikeFlag){
          this.clearLikeFlag = false;
          var url = this.jointUrl({
            "uid": this.userInfo.id ,
            "channel": this.myType.channel,
            "dynamics_id": this.driveList[index].dynamics.id,//动态ID
            "type": type //赞踩类型 赞1 踩0
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=likeinfo&a=cancel_dynamics_like',{
            params:{
              "uid": this.userInfo.id ,
              "channel": this.myType.channel,
              "dynamics_id": this.driveList[index].dynamics.id,
              "type": type,
              "sign": mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                console.log(datas);
                this.driveList[index].user.operate = datas.data.operate;
                if(type == 0){
                  this.driveList[index].dynamics.dislike--;
                }
                if(type == 1){
                  this.driveList[index].dynamics.likes--;
                }
                if(call == 0 || call == 1){
//                    let type = type == 0 ? 1:0;
                  this.setDynamicsLike(index, call);
                }
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
              this.clearLikeFlag = true;
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      //确认删除
      delDynamic(Did, index){
        MessageBox.confirm('确认删除此动态？').then(action => {
          this.indicator();
          this.delDynamics(Did, index);
        });
      },
      //删除动态
      delDynamics(Did, index){
        var url = this.jointUrl({
          uid: this.userInfo.id ,
          id: Did//动态id
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=dynamics&a=delDynamic',{
          params:{
            uid: this.userInfo.id ,
            id: Did,//动态id
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.driveList.splice(index, 1);
              this.toast(datas.msg);
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
            this.endIndicator();
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .driveNum{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    /*overflow-y: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
    .driveNum_main{
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    /*.only{*/
      /*background-color: #fff;*/
      /*border-bottom: 1px solid #f0f0f0;*/
      /*.o_t{*/
        /*padding: .6rem .5rem;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*.user_logo{*/
          /*display: inline-block;*/
          /*width: 4rem;*/
          /*height: 4rem;*/
          /*border-radius: 50% 50%;*/
          /*border: 1px solid #ffcf32;*/
          /*margin-left: .4rem;*/
          /*margin-right: .6rem;*/
        /*}*/
        /*.o_t_c{*/
          /*flex: 1;*/
        /*}*/
        /*.o_t_r{*/
          /*display: flex;*/
          /*flex-direction: column;*/
          /*align-items: flex-end;*/
        /*}*/
      /*}*/
      /*.o_c{*/
        /*padding: .6rem;*/
      /*}*/
      /*.o_b{*/
        /*height: 2.8rem;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*color: #ababab;*/
        /*border-top: 1px solid #f0f0f0;*/
        /*.o_b_box{*/
          /*display: flex;*/
          /*justify-content: center;*/
          /*align-items: center;*/
        /*}*/
        /*.line{*/
          /*width: 0;*/
          /*height: 80%;*/
          /*border-right: 1px solid #f0f0f0;*/
        /*}*/
      /*}*/
    /*}*/
  }
</style>
