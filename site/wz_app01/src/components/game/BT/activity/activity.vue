<!--活动中心-->
<template>
  <div class="activity">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        活动
      </div>
      <div class="head_right"></div>
    </div>
    <div class="activity_main">
      <div class="ac_one" v-for="v in data" @click="activityRouter(v.article_id)">
        <div class="ac_one_title">{{ v.title }}</div>
        <img :src="v.slide_pic" alt="">
      </div>
    </div>
	</div>
</template>
<script>
  export default {
  	data: function () {
      return {
          data: []
      }
    },
    created() {
      this.getActivity();
    },
		mounted(){
			this.$nextTick(function () {
//        this.loadMore();
			});
		},
    methods: {
      activityRouter(tid){
        this.$router.push({path:'/activity_info/'+tid+ '/' +'活动详情'})
      },
      getActivity(){
        var url = this.jointUrl({
          platform: 1 //1 BT 2 折扣
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get("/api/index.php?g=api&m=article&a=exclusive_list",{
          params: {
            platform: 1,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){
              this.data = datas.data;
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      }
    }
  }
</script>

<style scoped lang="less">
  .activity{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .activity_main{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .ac_one{
        margin-bottom: 1rem;
        .ac_one_title{
          height: 2.6rem;
          line-height: 2.6rem;
          font-size: 1.1rem;
          color: #29a1f7;
        }
        img{ width: 100%;}
      }
    }
  }
</style>
