<template><!--游戏详情-开服-->
	<div class="infoOpen">
    <div class="o_li" v-for="v in openList.future">
      <div class="o_mes">
        <p><span v-text="$parent.data.gameinfo.gamename"></span>- <span v-text="v.server_id"></span> 服</p>
        <small class="color_757575">开服时间: <span v-text="v.start_time"></span></small>
      </div>
      <div class="o_not">未开服</div>
    </div>
    <div class="o_li" v-for="v in openList.past">
      <div class="o_mes">
        <p><span v-text="$parent.data.gameinfo.gamename"></span>- <span v-text="v.server_id"></span> 服</p>
        <small class="color_757575">开服时间: <span v-text="v.start_time"></span></small>
      </div>
      <div class="o_have">已开服</div>
    </div>
	</div>
</template>

<script>
  export default {
    data(){
      return {
        openList: {
          future: [],
          past: []
        },
      }
    },
    created() {
      this.getOpenList();
    },
    methods:{
      //开服列表接口
      getOpenList() {
        //单一游戏开服接口
        this.$http.get("/www/api-game-gameOpenServer", {
          params: {
            gid: this.$route.query.id
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 0){//0成功
              let data = datas.data;
              let time = parseInt((new Date().getTime())/1000);
              for(let i=0,len=data.length; i < len; i++) {
                if(data[i].start_time < time){//已开服
                  data[i].start_time = this.myType.formatTimeM(data[i].start_time);
                  this.openList.past.push(data[i]);
                } else {//即将开服
                  data[i].start_time = this.myType.formatTimeM(data[i].start_time);
                  this.openList.future.push(data[i]);
                }
              }
            }
            if (datas.status == 1) {//1失败
              console.log('请求失败：' + datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.infoOpen{
    .o_li{
      height: 3.5rem;
      padding: .8rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .o_mes{
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: flex-start;
      }
      .o_not{
        color: #29a1f7;
        margin-right: .5rem;
        width: 4.5rem;
        padding: .2rem 0;
        text-align: center;
      }
      .o_have{
        color: #ababab;
        margin-right: .5rem;
        width: 4.5rem;
        padding: .2rem 0;
        text-align: center;
      }
    }
	}
</style>
