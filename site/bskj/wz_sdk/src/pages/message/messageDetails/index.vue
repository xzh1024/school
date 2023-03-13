<template>
  <div class="container">
    <Header title="消息详情">
      <div slot="left">
        <span class="icon-left" @click="$router.go(-1);"></span>
      </div>
    </Header>
    <div class="ni_c">
      <div class="ni_title" v-text="msgData.title"></div>
      <div class="ni_time" v-text="msgData.create_time"></div>
      <div class="ni_cont" v-text="msgData.desc"></div>
    </div>
    <div class="ni_b">
      <img class="ni_b_img" v-if="this.$route.params.action == 1" :src="msgData.image">
    </div>
    <div v-if="this.$route.params.action == 2">
      <a class="ni_b_not" v-if="msgData.is_get == 0" :src="msgData.api_url" @click="getReigsterBonus">领取</a>
      <a class="ni_b_yet" v-if="msgData.is_get == 1">已领取</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Toast } from 'mint-ui';
  import Header from '@/components/header'
  export default {
    data () {
      return {
        msgData: {}
      }
    },
    components:{ Header },
    computed: {
      ...mapGetters([
        'userData'
      ]),
    },
    created() {
      this.getMessageInfo();
    },
    methods: {
      toast (msg) {
        Toast({
          message: msg || '',
          duration: 2000,
          className: 'm_toast'
        });
      },
      //消息详情
      getMessageInfo() {
        let options = {
          uid: this.userData.uid,
          user_message_id: this.$route.params.msgid
        };
        options.sign = this.util.getSign(options);
        this.axios.get('/api/index.php?g=api&m=message&a=get_message_info',{
          params: options
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){
              datas.data.create_time = this.util.formatTime(datas.data.create_time, 's');
              this.msgData = datas.data;
            }
            if(datas.status == 0){
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //领取手机注册奖励
      getReigsterBonus() {
        let options = {
          uid: this.userData.uid,
          channel: this.config.channel,
          user_message_id: this.$route.params.msgid
        };
        options.sign = this.util.getSign(options);
        this.axios.get('/api/index.php?g=api&m=platformmoney&a=get_reigster_bonus',{
          params: options
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.toast(datas.msg);
              this.getMessageInfo();
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .ni_c{
      flex: 1;
      overflow-y: auto;
      .ni_title{
        font-size: 1.1rem;
        text-align: center;
        margin-top: 1em;
      }
      .ni_time{
        text-align: center;
        margin-top: .6em;
        font-size: .85rem;
        color: #ababab;
      }
      .ni_cont{
        margin-top: .1em;
        padding: .6em 1em;
        line-height: 1.4rem;
        color: #837f7e;
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

