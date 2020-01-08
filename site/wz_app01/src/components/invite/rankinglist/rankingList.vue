<!--申请转游-->
<template>
  <div class="rankingList">
    <i class="icon_nowInvite" @click.stop="payFlag = true"></i>
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        排行榜
      </div>
      <div class="head_right"><i class="icon_ask" @click="$router.push({path:'/ranking_list_know'});"></i></div>
    </div>
    <div class="hint">
      <span class="small3 color_ff7900">您今日邀请人数:<em v-text="userRanking"></em></span>
    </div>
    <div class="used-tab border_eee" v-active>
      <div class="flex1 tab-item">
        <a @click="componentName='TodayRanking'" class="active">今日排行</a>
      </div>
      <div class="flex1 tab-item">
        <a @click="componentName='YesterdayRanking'" ref="record">昨日排行</a>
      </div>
    </div>
    <div class="rankingList_main">
      <keep-alive>	<!--缓存组件-->
        <component :is="componentName" :todayList="list.today" :yesterdayList="list.yesterday"></component>  <!-- component动态组件由 vm 实例的属性值 `component_name` 控制 -->
      </keep-alive>
    </div>
    <mt-popup
      v-model="payFlag"
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
        <div class="pay_btn color_f89d19" @click="payFlag = false">取&nbsp;消</div>
      </div>
    </mt-popup>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import TodayRanking from './todayRanking/todayRanking.vue'
  import YesterdayRanking from './yesterdayRanking/yesterdayRanking.vue'
  export default {
  	data: function () {
      return {
        componentName:'TodayRanking',
        payFlag: false,
        list:{},
        userRanking: 0,//用户今日邀请人数
      }
    },
    components: { TodayRanking, YesterdayRanking },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getUserRanking();
      this.getRankingList();
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      //获取邀请好友排行
      getRankingList(){
        this.$http.post('/api/index.php?g=api&m=userbox&a=rankingList')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log(datas)
              this.list = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //用户自己邀请排行
      getUserRanking(){
        var url = this.jointUrl({
          uid: this.userInfo.id,
          type: 1 //1今日 2昨日
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          type: 1,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=userRanking',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log(datas)
              this.userRanking = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      share(type) {
        mobShare.config({
          debug: true, // 开启调试，将在浏览器的控制台输出调试信息
          appkey: this.myType.sharekey, // appkey
          params: {
            url: 'http://p.185sy.com/friend_recom_register.html?c=' + this.myType.channel + '&u=' + this.userInfo.id, // 分享链接
            title: '最专业的手游变态公益服', // 分享标题
            description: '上线满V，送99999999元宝，海量BT手游，秒变土豪 下载游戏盒子，更多礼包等着你', // 分享内容
            pic: 'http://www.185sy.com/themes/template/Public/img/new_logo.png', // 分享图片，使用逗号,隔开
            reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
          },
          callback: function( plat, params ) {
            console.log('plat：' + plat);
            console.dir(params);
          }
        });
        mobShare(type).send();
      }
    },
    directives: {//自定义指令
      active: {
        // 指令的定义
        inserted: function (el) {
          var el = el || window.event;
          el.onclick = function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName.toLowerCase() == 'a'){
              var tabs = document.querySelectorAll(".tab-item>a");
              for(let i=0,len=tabs.length; i < len; i++){
                tabs[i].className = '';
              }
              target.className = 'active';
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .rankingList{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .rankingList_main{
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .hint{
      background-color: #f0f0f0;
      height: 1.8rem;
      line-height: 1.8rem;
      text-align: center;
    }
  }
</style>
