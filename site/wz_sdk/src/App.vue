<template>
  <div id="app">
    <!--<router-view/>-->
    <transition :name="transitionName">
      <keep-alive exclude="no_keep">
        <router-view v-if="isRouterAlive"></router-view>
      </keep-alive>
    </transition>
    <div class="framework" v-if="!isRouterAlive">
      <Header :title="title">
        <!--<div slot="left">-->
        <!--<span class="icon-left" @click="$router.go(-1);"></span>-->
        <!--</div>-->
        <div slot="right" class="right">
          <i class="icon-close" @click="app.closeUserCenter"></i>
        </div>
      </Header>
      <div class="main">
        <img class="error_404" src="./static/img/noData/error_404.png" v-if="error_404">
      </div>
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
  import './static/css/reset.css'
  import './static/css/public.css'
  import Header from '@/components/header'
  import Tabbar from '@/components/tabbar'
export default {
  name: 'App',
  data(){
    return {
      title: '用户中心',
      transitionName: '',
      isRouterAlive: false,
      uid: 0,
      appid: 0,
      appkey: '',
      machine_code: '',
      error_404: false,
    }
  },
  components:{ Tabbar, Header},
  created(){
    //http://localhost:8080/user?uid=18&appid=1001&appkey=11b7c268b9d6907b20f8f9964ba1f3d9&machine_code=web1000&cuid=""
    if(this.$route.query.uid && this.$route.query.appid && this.$route.query.appkey && this.$route.query.machine_code && this.$route.query.cuid){
      this.uid = this.$route.query.uid;
      this.appid = this.$route.query.appid;
      this.appkey = this.$route.query.appkey;
      this.machine_code = this.$route.query.machine_code;
      this.getUserData();
    } else if(sessionStorage.getItem('wz_user_data') != null){
      this.$store.dispatch('getUser');
      this.isRouterAlive = true;
    } else {
        this.title = 'Error';
        this.error_404 = true;
//      console.log('uid undefined');
//      this.uid = 18;
//      this.machine_code = 'web1000';
//      this.appid = 1001;
////      this.appid = 1713;
//      this.appkey = '11b7c268b9d6907b20f8f9964ba1f3d9';
////      this.appkey = '0e162b270d1b848d3cc85d12962bc6d6';
//      this.getUserData();
    }

  },
  methods: {
    getUserData(){
      let options = {
        uid: this.uid
      };
      options.sign = this.util.getSign(options);
      let params = this.util.jointUrl(options);
      this.axios.post('/api/index.php?g=api&m=userbox&a=user_center',params)
        .then(response => {
          let datas = response.data;
          if(datas.status === 1){
            if(datas.data){
              let data = datas.data;
              data.uid = this.uid;
              data.appid = this.appid;
              data.appkey = this.appkey;
              data.machine_code = this.machine_code;

              this.$store.dispatch('getUser', datas.data);
              this.isRouterAlive = true;
            }
          }
          if(datas.status === 0){
            console.log(datas.msg);
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
html,body{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
#app .framework{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#app .framework .main{
  flex: 1;
}
#app .framework .main .error_404{
  width: 100%;
}
</style>
