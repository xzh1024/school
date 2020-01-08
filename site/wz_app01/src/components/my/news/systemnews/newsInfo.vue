<!--消息详情-->
<template>
  <div class="newsInfo" v-if="data.id">
    <!--页头-->
    <Head :head="head"></Head>
    <div class="ni_c">
      <div class="ni_title" v-text="data.title"></div>
      <div class="ni_time color_ababab" v-text="data.create_time"></div>
      <div class="ni_cont color_837f7e" v-text="data.desc"></div>
    </div>
    <div class="ni_b">
      <img class="ni_b_img" v-if="this.$route.params.action == 1" :src="data.image" alt="">
    </div>
    <div v-if="this.$route.params.action == 2">
      <a class="ni_b_not" v-if="data.is_get == 0" :src="data.api_url" @click="getReigsterBonus">领取</a>
      <a class="ni_b_yet" v-if="data.is_get == 1">已领取</a>
    </div>
	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import Head from '../../../header/head.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        head: {
          title:'消息详情',
          title_but: true
        },
        user: {
          icon_url: "",
          nick_name: "",
          user_id: 0
        },
        message: '',
        data: {}
      }
    },
    components: { Head },
    created() {
      this.getUser();
    },
    methods: {
      toast () {
        Toast({
          message: this.message,
          duration: 2000,
          className: 'm_toast'
        });
      },
      getUser() {
        //获取登录状态
        this.$http.get('/api/index.php?g=api&m=userbox&a=get_user_info')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){//已登陆
                this.user = datas.data;
                this.getMessageInfo();
              }else {
                this.$router.push({path:'login'});
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },

      //消息详情
      getMessageInfo() {
        var url = this.jointUrl({
          uid: this.user.user_id,
          channel: this.myType.channel,
          user_message_id: this.$route.params.mid
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=message&a=get_message_info',{
          params: {
            uid: this.user.user_id,
            channel: this.myType.channel,
            user_message_id: this.$route.params.mid,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              datas.data.create_time = this.myType.formatTimeS(datas.data.create_time);
              this.data = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //领取手机注册奖励
      getReigsterBonus() {
        var url = this.jointUrl({
          uid: this.user.user_id,
          channel: this.myType.channel,
          user_message_id: this.$route.params.mid
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=platformmoney&a=get_reigster_bonus',{
          params: {
            uid: this.user.user_id,
            channel: this.myType.channel,
            user_message_id: this.$route.params.mid,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.message = datas.msg;
              this.toast();
              this.getMessageInfo();
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
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
  .newsInfo{
    flex: 1;
    display: flex;
    flex-direction: column;
    .ni_c{
      /*flex: 1;*/
      /*overflow-y: auto;*/
      .ni_title{
        font-size: 1.1rem;
        text-align: center;
        margin-top: 1rem;
      }
      .ni_time{
        text-align: center;
        margin-top: .6rem;
        font-size: .89rem;
      }
      .ni_cont{
        margin-top: .1rem;
        padding: .6rem;
        line-height: 1.4rem;
      }
    }
    .ni_b{
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      .ni_b_img{
        max-width: 94%;
        margin: 3%;
      }
    }
    .ni_b_not{
      width: 10rem;
      height: 2.3rem;
      line-height: 2.3rem;
      font-size: 1.1rem;
      color: #fff;
      background-color: #ff7900;
      border-radius: .4rem;
      text-align: center;
      position: fixed;
      bottom: 1rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      z-index: 10;
    }
    .ni_b_yet{
      width: 10rem;
      height: 2.3rem;
      line-height: 2.3rem;
      font-size: 1.1rem;
      color: #fff;
      background-color: #a8a2a2;
      border-radius: .4rem;
      text-align: center;
      position: fixed;
      bottom: 1rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      z-index: 10;
    }
  }
</style>
