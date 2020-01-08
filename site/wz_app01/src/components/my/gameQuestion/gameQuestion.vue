<!--&lt;!&ndash;游戏问答&ndash;&gt;-->
<!--<template>-->
  <!--<div class="question">-->
    <!--&lt;!&ndash;页头&ndash;&gt;-->
    <!--<div class="head">-->
      <!--<div class="head_left">-->
        <!--<a class="icon_left_white" @click="$router.go(-1);"></a>-->
      <!--</div>-->
      <!--<div class="head_center color_white"></div>-->
      <!--<div class="head_right">-->
        <!--<i class="icon_ask_white" @click="$router.push({path:'/qa_norm'})"></i>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="top">-->
      <!--<img src="" alt="" class="top_img">-->
    <!--</div>-->
    <!--<div class="center border_eee">-->
      <!--<div style="margin-bottom: .5rem;">手机用户<span>12345678901</span></div>-->
      <!--<div style="margin-bottom: .5rem;" class="color_888888">乐于助人的人，运气都不会太差哟~</div>-->
    <!--</div>-->
    <!--<div class="used-tab border_dcdcdc" v-active>-->
      <!--<div class="flex1 tab-item">-->
        <!--<a @click="componentName='Answering'">我来回答</a>-->
      <!--</div>-->
      <!--<div class="flex1 tab-item">-->
        <!--<a @click="componentName='Question'" class="active">我的提问</a>-->
      <!--</div>-->
    <!--</div>-->
    <!--<keep-alive>	&lt;!&ndash;缓存组件&ndash;&gt;-->
      <!--<component :is="componentName"></component>  &lt;!&ndash; component动态组件由 vm 实例的属性值 `component_name` 控制 &ndash;&gt;-->
    <!--</keep-alive>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import { Toast } from 'mint-ui';-->
  <!--import { mapGetters } from 'vuex'-->
  <!--import Answering from './myAnswering/myAnswering.vue' //回答-->
  <!--import Question from './myQuestion/myQuestion.vue'  //问题-->
  <!--export default {-->
    <!--name: 'no_keep',-->
    <!--data: function () {-->
      <!--return {-->
        <!--componentName: 'Question',-->
      <!--}-->
    <!--},-->
    <!--components: { Answering, Question },-->
    <!--computed: { //计算属性-->
      <!--...mapGetters([-->
        <!--'userInfo'-->
      <!--]),-->
    <!--},-->
    <!--created() {-->

    <!--},-->
    <!--mounted(){-->
      <!--this.$nextTick(function () {-->
<!--//        console.log(this.$store.getters.userInfo.id);-->
      <!--});-->
    <!--},-->
    <!--directives: {//自定义指令-->
      <!--active: {-->
        <!--// 指令的定义-->
        <!--inserted: function (el) {-->
          <!--var el = el || window.event;-->
          <!--el.onclick=function(e) {-->
            <!--var e = e || window.event;-->
            <!--var target = e.target || e.srcElement;-->
            <!--if(target.nodeName.toLowerCase() == 'a'){-->
              <!--var tabs = document.querySelectorAll(".tab-item>a");-->
              <!--for(let i=0,len=tabs.length; i < len; i++){-->
                <!--tabs[i].className = '';-->
              <!--}-->
              <!--target.className = 'active';-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--toast (msg) {-->
        <!--var msg = msg || '提示';-->
        <!--Toast({-->
          <!--message: msg,-->
          <!--duration: 2000,-->
          <!--className: 'm_toast'-->
        <!--});-->
      <!--},-->
      <!--//获取用户中心-->
      <!--getUserCenter(){-->
        <!--let url = this.jointUrl({-->
          <!--uid: this.userInfo.id,-->
          <!--channel: this.myType.channel-->
        <!--});-->
        <!--let mySign = md5(url + this.myType.key1).toLowerCase();-->
        <!--let myUrl = this.jointUrl({-->
          <!--uid: this.userInfo.id,-->
          <!--channel: this.myType.channel,-->
          <!--sign: mySign-->
        <!--});-->
        <!--this.$http.post('/api/index.php?g=api&m=userbox&a=user_center',myUrl)-->
          <!--.then(response => {-->
            <!--var datas = response.data;-->
            <!--console.log(datas)-->
            <!--if(datas.status == 1){//1成功-->
              <!--if(datas.data){-->
                <!--let data = datas.data;-->
                <!--let money = {};-->
                <!--money.coin = data.coin;-->
                <!--money.platform_money = data.platform_money;-->
                <!--this.$store.dispatch('setUserMoney',money);-->
              <!--}-->
            <!--} else if(datas.msg){-->
              <!--console.log(datas.msg);-->
            <!--}-->
          <!--})-->
          <!--.catch(error => {-->
            <!--console.log('请求失败：' + error.status + '，' + error.statusText);-->
          <!--});-->
      <!--},-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped lang="less">-->
  <!--.question{-->
    <!--height: 100%;-->
    <!--width: 100%;-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--/*overflow-y: auto;*/-->
    <!--overflow: hidden;-->
    <!--.top{-->
      <!--height: 12rem;-->
      <!--background: url("../../../static/img/h_icon_beijng.png") no-repeat;-->
      <!--background-size: 100% 100%;-->
      <!--position: relative;-->
      <!--.top_img{-->
        <!--width: 4rem;-->
        <!--height: 4rem;-->
        <!--border: 2px solid #ffffff;-->
        <!--border-radius: 50% 50%;-->
        <!--background-color: #894d8b;-->
        <!--position: absolute;-->
        <!--left: 50%;-->
        <!--top: 50%;-->
        <!--transform: translate(-50%, 0);-->
      <!--}-->
    <!--}-->
    <!--.head {-->
      <!--position: fixed;-->
      <!--z-index: 11;-->
      <!--top: 0;-->
      <!--left: 0;-->
    <!--}-->
    <!--.question_main{-->
      <!--position: relative;-->
      <!--.explain{-->
        <!--position: absolute;-->
        <!--z-index: 1;-->
        <!--top: -2rem;-->
        <!--left: 0;-->
        <!--margin: 0 1rem 2rem;-->
        <!--padding: .5rem;-->
        <!--background: #ffffff;-->
        <!--border-radius: .5rem;-->
        <!--box-shadow: 0 2px 4px 2px rgba(0,0,0,.12);-->
        <!--.explain_list{-->
          <!--p{-->
            <!--margin-top: .5rem;-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--.sign_btn,.sign_btn_on{-->
        <!--position: absolute;-->
        <!--z-index: 2;-->
        <!--top: -4.5rem;-->
        <!--right: 3rem;-->
        <!--width: 4rem;-->
        <!--height: 4rem;-->
        <!--background: url("../../../static/img/h_icon_qiandao.png") no-repeat;-->
        <!--background-size: contain;-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
