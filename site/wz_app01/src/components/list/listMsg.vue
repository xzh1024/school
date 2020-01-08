<template>
	<div class="msgList"
       v-infinite-scroll="getMsg"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <!--1评论 2被赞的评论 3被赞得微博-->
    <!--{{ msgType }}-->
    <!--<div class="m border_eee">-->
      <!--<div class="m_t">-->
        <!--<div class="m_t_l"><img src="" alt="" class="m_t_l_logo"></div>-->
        <!--<div class="m_t_r">-->
          <!--<div>tjjstar</div>-->
          <!--<div class="m_t_0_5rem color_999999 small3">2018-05-31 19:07</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="m_c">-->
        <!--好玩-->
      <!--</div>-->
      <!--<div class="m_b">-->
        <!--<div class="m_b_box">-->
          <!--<div>尼泊尔</div>-->
          <!--<div class="m_b_box_cont color_999999 small1">刀塔传奇好玩吗？</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div v-if="msgType == 1">
      <div class="m border_eee" v-for="v in msgList" @click="onDriveInfo(v.dynamics_id)">
        <div class="m_t">
          <div class="m_t_l"><img v-lazy="v.c_uid_iconurl" alt="" class="m_t_l_logo" @click.stop="onUserInfo(v.d_uid)"></div>
          <div class="m_t_r">
            <div class="m_t_r_name">
              <span v-text="v.c_uid_nickname"></span>
              <i class="icon_vip m_l" v-if="v.c_uid_vip == 1"></i>
            </div>
            <div class="m_t_0_5rem color_999999 small3" v-text="v.create_time"></div>
          </div>
        </div>
        <div class="m_c" v-text="v.c_content"></div>
        <div class="m_b">
          <div class="m_b_box">
            <div v-text="v.d_uid_nickname"></div>
            <div class="m_b_box_cont color_999999 small1" v-text="v.d_content"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="msgType == 2">
      <div class="m border_eee" v-for="v in msgList" @click="onDriveInfo(v.dynamics_id)">
        <div class="m_t">
          <div class="m_t_l"><img v-lazy="v.cl_uid_iconurl" alt="" class="m_t_l_logo" @click.stop="onUserInfo(v.cl_uid)"></div>
          <div class="m_t_r">
            <div class="m_t_r_name">
              <span v-text="v.cl_uid_nickname"></span>
              <i class="icon_vip m_l" v-if="v.cl_uid_vip == 1"></i>
            </div>
            <div class="m_t_0_5rem color_888888 small3" v-text="v.create_time"></div>
          </div>
        </div>
        <div class="m_c">{{ v.type|F_type }}</div>
        <div class="m_b">
          <div>
            <span>{{ v.c_uid_nickname }}:</span>
            <span v-text="v.c_content"></span>
          </div>
          <div class="m_b_bottom">
            <img v-lazy="v.d_img" alt="" class="m_b_bottom_img">
            <div class="m_b_bottom_cont">
              <div class="m_b_bottom_cont_name" v-text="v.d_uid_nickname"></div>
              <div class="m_b_bottom_cont_text small1 color_888888" v-text="v.d_content"></div>
            </div>
          </div>
          <!--<div class="m_b_box">-->
            <!--<div v-text="v.c_content"></div>-->
            <!--<div class="m_b_box_cont color_999999 small1" v-text="v.d_content"></div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div v-else-if="msgType == 3">
      <div class="m border_eee" v-for="v in msgList" @click="onDriveInfo(v.dynamics_id)">
        <div class="m_t">
          <div class="m_t_l"><img v-lazy="v.dl_uid_iconurl" alt="" class="m_t_l_logo" @click.stop="onUserInfo(v.dl_uid)"></div>
          <div class="m_t_r">
            <div class="m_t_r_name">
              <span v-text="v.dl_uid_nickname"></span>
              <i class="icon_vip m_l" v-if="v.dl_uid_vip == 1"></i>
            </div>
            <div class="m_t_0_5rem color_999999 small3" v-text="v.create_time"></div>
          </div>
        </div>
        <div class="m_c">{{ v.type|F_type }}</div>
        <div class="m_b">
          <div class="m_b_box">
            <div v-text="v.d_uid_nickname"></div>
            <div class="m_b_box_cont color_999999 small1" v-text="v.d_content"></div>
          </div>
        </div>
      </div>
    </div>
    <!--加载动画-->
    <div v-show="loading">
      <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
    </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        msgList:[],
        page: 1,
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
      }
    },
    props: ['msgType'],
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created(){
      this.getMsg();
    },
    mounted() {
      this.$nextTick(function () {
        console.log(this.msgType);
      });
    },
    watch:{
      msgType(val, oldVal){
//        this.page = 1;
//        this.getMsg();
        console.log(val);
      }
    },
    filters: {	//自定义局部过滤器
      F_type: (type) => {
        let msg = '';
        if(type == 1){
          msg = '赞了这条动态';
        } else if(type == 0){
          msg = '踩了这条动态';
        }
        return msg;
      }
    },
    methods: {
      //我的赞踩评论
      getMsg(){
//        if(this.status){
//          this.loadAnimation = true;
//          this.loading = true;
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            type: this.msgType,//1评论 2被赞的评论 3被赞得微博
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            type: this.msgType,
            page: this.page,
            sign: mySign
          });
          console.log(myUrl)
          this.$http.post('/api/index.php?g=api&m=userbox&a=my_comment_zan',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas);
              if(datas.status == 1){//1成功
                if(this.page <= datas.data.count){
                  let list = datas.data.list;
                  for(let i=0,len=list.length; i < len; i++){
                    list[i].create_time =  this.myType.formatTimeM(list[i].create_time);
                  }
                  if(this.page == 1){
                    this.msgList = list;
                  } else {
                    this.msgList = this.msgList.concat(list);
                  }
                  console.log(this.msgList);
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
//        }
      },
      onDriveInfo(id){
        this.$router.push({path:'/drive_info/'+ id});
      },
      onUserInfo(buid){
        this.$router.push({path:'/user_info/'+ buid});
      },
    }
  }
</script>

<style scoped lang="less">
  .msgList{
    width: 100%;
    flex: 1;
    overflow-y: auto;
    .m{
      padding: .6rem;
      /*border: 1px solid #29a1f7;*/
      .m_t{
        display: flex;
        align-items: center;
        .m_t_l{
          .m_t_l_logo{
            display: inline-block;
            width: 3.3rem;
            height: 3.3rem;
            border-radius: 50% 50%;
            border: 1px solid #29a1f7;
            /*margin-left: .4rem;*/
            margin-right: .6rem;
          }
        }
        .m_t_r{
          flex: 1;
          .m_t_r_name{
            display: flex;
            align-items: center;
          }
        }
      }
      .m_c{
        margin: .5rem 0;
      }
      .m_b{
        background-color: #f0f0f0;
        /*padding: 1.2rem .7rem .7rem 1.2rem;*/
        padding: .7rem;
        border-radius: .3rem;
        .m_b_bottom{
          display: flex;
          align-items: flex-end;
          margin-top: .5rem;
          .m_b_bottom_img{
            width: 4rem;
            height: 4rem;
          }
          .m_b_bottom_cont{
            background-color: #ffffff;
            margin-left: 1rem;
            padding: .3rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            .m_b_bottom_cont_name{
              flex: 1;
              height: 1.4rem;
              line-height: 1.4rem;
              overflow: hidden;
            }
            .m_b_bottom_cont_text{
              flex: 1;
              height: 1.4rem;
              line-height: 1.4rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .m_b_box{
          background-color: #ffffff;
          /*border: 1.2rem .7rem .7rem 1.2rem;*/
          padding: .3rem;
          border-top: .6rem solid #f0f0f0;
          /*border-right: .7rem solid #f0f0f0;*/
          /*border-bottom: .7rem solid #f0f0f0;*/
          border-left: .6rem solid #f0f0f0;
          /*border-radius: .3rem;*/
          .m_b_box_cont{
            margin-top: .2rem;
          }
        }
      }
    }
  }

</style>
