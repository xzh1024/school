<template> <!--新游-->
  <div class="newGame">
    <!--页头-->
    <Head :head="head"></Head>
    <div class="newGameList"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="sole_game" v-for="item in data">
        <div class="sole_time">{{ item.time }}</div>
        <div class="sole" v-for="v in item.list" :id="v.id" @click="router(v.id)">
          <img v-lazy="myType.domainName + v.logo" class="sole-logo"></img>
          <div class="sole-cont">
            <p class="sole-cont-gamename">{{ v.gamename }}<span class="gane-size color_837f7e">{{ v.size }}M</span></p>
            <p class="sole-cont-weal" v-if="v.label && v.label[0]">
              <span class="sole-cont-label" v-for="v in v.label">{{ v }}</span>
            </p>
            <p class="sole-cont-content color_837f7e"><small>{{ v.content }}</small></p>
          </div>
          <div class="sole-cont-rebate color_16adc4">
            <small>申请</small>
            <small>返利</small>
          </div>
        </div>
      </div>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
      </div>
    </div>
  </div>

</template>

<script>
  import Head from '../../../header/head.vue'
  export default {
    data: function () {
      return {
        head: {
          title:'新游',
          title_but: true
        },
        page: 1,
        data: [],
        status: true,//标记数据是否全部加载 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation : false//标记加载动画,false为隐藏
      }
    },
    components: { Head },
    created() {
//			this.$store.dispatch('getSuggestList');
    },
    methods: {
      router(id) {  //跳转路由
        this.$router.push({path:'game_info/'+id})
      },
      formatTime(nows) {  //格式化时间
        var now=new Date(nows * 1000);
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        if(month < 10) {
          month = '0' + month;
        }
        var date=now.getDate();
        if(date < 10) {
          date = '0' + date;
        }
        return year+"-"+month+"-"+date;
      },
      loadMore() {  //获取数据
        //新游接口
        if(this.status){
            console.log(this.page)
          this.loadAnimation = true;
          this.loading = true;
          this.$http.get("/www/api-game-gameType", {
            params: {
              page : this.page,
              channel : 185,
              system : this.myType.system,
              type : 1
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                if(datas.data.length){
                  var data = datas.data;
                  var temp;
                  var times = [];
                  var wiseData = [];
                  for(let i=0, len=data.length; i < len-1; i++){
                    for(let j=i+1; j < len; j++){
                      if(data[j].addtime > data[i].addtime){
                        temp = data[j].addtime;
                        data[j].addtime = data[i].addtime;
                        data[i].addtime = temp;
                      }
                    }
                  }
                  if(this.myType.system == 1){//1为Android
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;//下载地址
                      data[i].web_pack = data[i].android_pack;//包名
                      data[i].label = data[i].label.split(",");
                      data[i].addtime = this.formatTime(data[i].addtime);
//                      this.list.push(data[i]);
                    }
                  }
                  if(this.myType.system == 2){//2为IOS
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;
                      data[i].web_pack = data[i].ios_pack;
                      data[i].label = data[i].label.split(",");
                      data[i].addtime = this.formatTime(data[i].addtime);
//                      this.list.push(data[i]);
                    }
                  }
                  for(let i=0, len=data.length;i < len;i++){
                    if(times.indexOf(data[i].addtime) == -1){
                      times.push(data[i].addtime);
                    }
                  }
                  for(let i=0, len=times.length;i < len;i++){
                    wiseData[i] = {
                      time: times[i],
                      list:[]
                    }
                  }
                  for(let i=0, len=data.length;i < len;i++){
                    for(let j=0, len=wiseData.length;j < len;j++){
                      if(data[i].addtime == wiseData[j].time){
                        wiseData[j].list.push(data[i]);
                      }
                    }
                  }
                  for(let k=0, len=wiseData.length;k < len;k++){
                    this.data.push(wiseData[k]);
                  }
//                  [
//                      {
//                          time:"2018.2.8",
//                          list:[1,2,3]
//                      }
//                  ]
                  this.page++;
                } else {
                  this.status = false;//数据已全部加载，不在发送请求
                }
              }
              setTimeout(() => {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.loading = true;
        }
      }
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        this.loadMore();
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .newGame{
    flex: 1;
    display: flex;
    flex-direction: column;
    .newGameList{
      flex: 1;
      overflow-y: auto;
      .sole_game{
        .sole_time{
          border-top: 3px solid #dcdcdc;
          border-bottom: 1px solid #dcdcdc;
          padding: .5rem 1.2rem;
        }
      }
    }

  }
</style>
