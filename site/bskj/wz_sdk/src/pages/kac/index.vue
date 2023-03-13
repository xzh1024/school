<template>
  <div class="container">
    <Header title="礼包">
      <div slot="right" class="right">
        <i class="icon-close" @click="app.closeUserCenter"></i>
      </div>
    </Header>
    <div class="main" :class="{'no-data':packageList.length === 0}"
         v-infinite-scroll="getPackageList"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="panel" v-for="(item, index) in packageList">
        <Panel>
          <div slot="content" class="content">
            <div class="top">
              <div class="icon-gift"></div>
              <!--<div class="m-l2">{{ item.pack_type === '1' ? '独家礼包':'新手礼包' }}</div>-->
              <div class="m-l2 pack_name">{{ item.pack_name }}</div>
              <div class="m-l3 blue">剩余：{{ item.pack_remnant|F_num }}</div>
            </div>
            <div class="center small">
              {{ item.pack_abstract }}
          </div>
            <div class="bottom small">
              已有{{ item.pack_used_counts ? item.pack_used_counts : '0'}}人领取
          </div>
          </div>
          <div slot="right" class="right">
            <!--<div class="panel-btn red" v-if="!item.card" @click.stop="getPackage(item.id, index)">领取</div>-->
            <!--<div class="panel-btn gray" >已领取</div>-->

            <div type="button" class="btn btn-red" v-if="item.card"
                 v-on:click="onErrorAndroid(item.card)"
               v-clipboard:copy="item.card"
               v-clipboard:success.stop="onCopy"
               v-clipboard:error.stop="onError">复制</div>

            <div class="panel-btn red" v-else @click.stop="getPackage(item.id)">领取</div>
          </div>
        </Panel>
      </div>




      <!--<Panel class="panel">-->
        <!--<div slot="content" class="content">-->
          <!--<div class="top">-->
            <!--<div class="icon-gift"></div>-->
            <!--<div class="m-l2">新手礼包</div>-->
            <!--<div class="m-l3 blue">剩余：75%</div>-->
          <!--</div>-->
          <!--<div class="center small">-->
            <!--绑定元宝*888，突破丹*10，绿精炼石*10，铜币*200000-->
          <!--</div>-->
          <!--<div class="bottom small">-->
            <!--已有123人领取-->
          <!--</div>-->
        <!--</div>-->
        <!--<div slot="right" class="right">-->
          <!--<div class="panel-btn red">领取</div>-->
        <!--</div>-->
      <!--</Panel>-->

      <mt-spinner type="triple-bounce" v-show="loadAnimation" class="loadingStyle"></mt-spinner>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  import Tabbar from '@/components/tabbar'
  import Header from '@/components/header'
  import Panel from '@/components/panel'
export default {
  data () {
    return {
      page: 1,
      packageList: [],
      type: 2,
      status: true,//标记是否继续请求数据 true为继续
      loading: true,//若为真，则无限滚动不会被触发
      loadAnimation: false//标记加载动画,false为隐藏
    }
  },
  components:{ Tabbar, Header, Panel },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  created() {
      this.getPackageList();
  },
  mounted(){
    this.$nextTick(function () {

    });
  },
  filters: {	//自定义局部过滤器
    F_num: (num) => {//过滤显示下载量
      return num + '%';
    }
  },
  methods:{
    toast (msg) {
      Toast({
        message: msg || 'null',
        duration: 2000
//        className: 'm_toast'
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
    messageBox() {
      MessageBox({
        title: '礼包码已复制',
        message: '领取后请尽快使用，以免过期！',
        showCancelButton: false
      });
    },
    onCopy: function (e) {
      if(e && e.stopPropagation){
        e.stopPropagation();
      }else{
        window.event.cancelBubble = true;
      }
      this.messageBox();
    },
    onError(e) {
      this.toast('Failed to copy texts');
    },
    onErrorAndroid(content){
      if(this.config.system === 1){
          this.app.copy(content);
          this.messageBox();
      }
    },
    initParams(){
        this.page = 1;
        this.status = true;
        this.getPackageList();
    },
    getPackageList() {
      if(this.status) {
        this.loading = true;
        this.loadAnimation = true;

        let params = {
          game_id: this.userData.appid,
          page: this.page,
          Page_size: 10,
          device_id: this.userData.machine_code,
//          terminal_type: 1, //默认为2手机端 1为web端
          is_sdk: 1 //默认为0  1为是SDK
//          channel: this.config.channel,
//          uid: this.userData.uid,
//          system: this.config.system,
        };
        //礼包列表接口
        this.axios.get("/www/api-packs-get_list_by_game", {
          params: params
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 0){
              if(datas.data && datas.data.list && datas.data.list.length > 0){
                let list = datas.data.list;
                for(let i=0,len=list.length; i < len; i++){
                  var pack_counts =  Number(list[i].pack_counts);
                  var pack_used_counts = Number(list[i].pack_used_counts);
                  if(pack_counts === 0){
                    list[i].pack_remnant = 0;
                  } else {
                    list[i].pack_remnant = Math.ceil((pack_counts - pack_used_counts) / pack_counts * 100);//剩余礼包
                  }
                }
                if(this.page === 1){
                  this.packageList = list;
                } else {
                  this.packageList.push.apply(this.packageList, list);
                }
                this.page++;
              } else {
                this.status = false;
              }
            } else {
              this.status = false;
            }
            if (datas.status == 1) {
              console.log(datas.msg);
            }
            this.loading = false;
            this.loadAnimation = false;
          }, error => {
            this.status = false;
            console.log('请求失败：' + error);
          })
      } else {
        this.loading = true;
        this.loadAnimation = false;
      }
    },
    getPackage(pid) {
      this.indicator();//开启加载提示动画
      var url = {
        username: this.userData.username,
        ip: "",
        terminal_type: this.type,
        pid: pid,
        device_id: this.userData.machine_code,
      };
      var urlKey = [];
      for(let k in url){
        urlKey.push(k);
      }
      urlKey.sort();
      function joint(data) {
        let params = '';
        data.forEach(function (key) {
          params += key + url[key];
        });
        return params;
      }
      url = joint(urlKey);
      var mySign = this.util.SHA1(url);
      var myUrl = this.util.jointUrl({
        username: this.userData.username,
        ip: "",
        terminal_type: this.type,
        pid: pid,
        device_id: this.userData.machine_code,
        sign: mySign
      });
      //发起请求
      this.$http.post('/www/api-packs-get_pack',myUrl)
        .then(response => {
          var datas = response.data;
          this.endIndicator();
          if(datas.status == 0){//0成功
            if(datas.data) {
              this.initParams();
              this.toast('领取礼包码成功');
            } else {
              this.toast('领取礼包码失败');
            }
          } else if(datas.msg){
            this.toast(datas.msg);
          }
        })
        .catch(error => {
          this.endIndicator();
          console.log('请求失败：' + error);
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
    .no-data{
      background: url("../../static/img/noData/a_meiyou-gengduoneirong-.png") no-repeat;
      background-size: 100%;
    }
    .main{
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      .panel{
        .content{
          flex: 1;
          height: 6rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          /*overflow: hidden;*/
          .top{
            width: 100%;
            display: flex;
            align-items: center;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .icon-gift{
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              background: url("../../static/img/kac/a_icon_libao.png") no-repeat;
              background-size: contain;
            }
            .pack_name{
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .center{
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #666;
          }
          .bottom{
            width: 100%;
            display: flex;
            align-items: center;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #aaa;
          }
        }
        .right{
          margin-left: 1em;
          .panel-btn, .btn{
            display: inline-block;
            width: 5rem;
            height: 2rem;
            margin: 0;
            padding: 0;
            line-height: 2rem;
            border-radius: 1.1rem;
            border: 1px solid ;
            text-align: center;
          }
        }
      }
    }
  }
</style>
