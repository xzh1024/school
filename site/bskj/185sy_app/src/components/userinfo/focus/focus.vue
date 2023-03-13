<template> <!--关注-->
	<div class="focus"
       v-infinite-scroll="getFollowList"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <div class="flex1">
      <mt-loadmore class="LoadMore" :auto-fill="true" :top-method="loadTop" ref="loadmore">
        <div class="only border_eee" v-for="v in followList" @click="onUserInfo(v.uid)">
          <div class="o_t">
            <img v-lazy="v.icon_url" alt="" class="user_logo">
            <div class="o_t_c">
              <div>
                <div class="user_name">
                  <span v-text="v.nickname"></span>
                  &nbsp;
                  <i class="icon_men" v-if="v.sex == 1"></i>
                  <i class="icon_women" v-else-if="v.sex == 2"></i>
                  <i class="icon_vip" v-if="v.vip == 1"></i>
                </div>
                <div class="color_ababab small2">
                  <span v-text="v.fans_counts">0</span>
                  <span>粉丝</span>
                </div>
              </div>
            </div>
            <!--关注状态 0 未关注 1 关注 2 互相关注-->
            <div v-if="userInfo.id != v.uid">
              <div class="o_t_r" v-if="v.follow_status == 0" @click.stop="followOrCancel(v.uid, 1)">
                <i class="icon_follow o_t_r_center"></i>
                <span class="o_t_r_center small2 color_blue">加关注</span>
              </div>
              <div class="o_t_r" v-else-if="v.follow_status == 1" @click.stop="followOrCancel(v.uid, 2)">
                <i class="icon_cancel o_t_r_center"></i>
                <span class="o_t_r_center small2 color_ababab">取消关注</span>
              </div>
              <div class="o_t_r" v-else-if="v.follow_status == 2" @click.stop="followOrCancel(v.uid, 2)">
                <i class="icon_mutual o_t_r_center"></i>
              </div>
            </div>
          </div>
        </div>
        <!--加载动画-->
        <div v-show="loadAnimation">
          <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
        </div>
      </mt-loadmore>
    </div>
	</div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    inject:['reload'],
    data: function () {
        return {
          page: 1,
          followList: [],
          followFlag: true,
          status: true,//标记是否继续请求数据 true为继续
          loading: true,//若为真，则无限滚动不会被触发
          loadAnimation : false, //标记加载动画,false为隐藏
        }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created(){
      this.getFollowList();
    },
    methods: {
      loadTop(){
        setTimeout(() => {
          this.page = 1;
          this.status = true;
          this.getFollowList();
          this.$refs.loadmore.onTopLoaded();
        },1500)
      },
      toast (msg) {
        var msg = msg || '';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      //获取关注列表
      getFollowList(){
        if(this.status) {
          this.loadAnimation = true;
          this.loading = true;
          var url = this.jointUrl({
            uid: this.$route.params.buid,
            visit_uid: this.userInfo.id,
            channel: this.myType.channel,
            type: 1, //1关注 2粉丝
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=userbox&a=follow_list',{
            params:{
              uid: this.$route.params.buid,
              visit_uid: this.userInfo.id,
              channel: this.myType.channel,
              type: 1,
              page: this.page,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                console.log(datas);
                if(datas.data.list.length > 0) {
//                  this.followList = datas.data.list;
                  if(this.page == 1){
                    this.followList = datas.data.list
                  } else {
                    this.followList.push.apply(this.followList, datas.data.list);
                  }
                  this.page++;
                } else {
                  if(this.page == 1){
                    this.followList = {};
                  }
                  this.status = false;
                }
              }
              if(datas.status == 0){//0失败
                this.status = false;
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              },1000);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      ///关注\取关
      followOrCancel(buid, type){
        if(this.followFlag){
          this.followFlag = false;
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
                this.page = 1;
                this.status = true;
                this.getFollowList();
              }
              if(datas.status == 0){//0失败
                this.toast('操作失败');
                console.log('请求失败：' + datas.msg);
              }
              this.followFlag = true;
            })
            .catch(error => {
              this.followFlag = true;
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }

      },
      //跳转用户详情页
      onUserInfo(buid){
        this.$router.replace({path:'/user_info/'+ buid});
        this.reload();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .focus{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

