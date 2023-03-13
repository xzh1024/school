<!--礼包中心-->
<template>
  <div class="KAC">
    <!--页头-->
    <div class="KAC_head">
      <p @click="goRouter">
        <i class="icon_left2"></i>
        <span>礼包</span>
      </p>
      <p class="myGift" @click="$router.push({path:'myGift'});">我的礼包</p>
    </div>
    <div class="KAC_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <!--轮播-->
      <Banner :banner="banner"></Banner>
      <div class="KAC_search">
        <div class="KAC_box">
          <!--搜索图标-->
          <i class="icon_soso"></i>
          <input type="text" placeholder="请输入搜索内容" onfocus="this.blur()" @click="$router.push({path:'searchKAC'});" />
        </div>
      </div>
      <kacList :list="list"></kacList>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
      </div>
    </div>
	</div>
</template>
<script>
  import Banner from '../banner/Banner.vue'
  import kacList from '../list/listGift.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        banner:[],
        user: {
          icon_url: "",
          nick_name: "",
          username: "",
          user_id: 0
        },
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation : false//标记加载动画,false为隐藏
      }
    },
    components: { Banner, kacList },
    created() {
      this.getUser();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      toast () {
        Toast({
          message: this.message,
          duration: 2000,
          className: 'm_toast'
        });
      },
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      getUser () {
        //获取登录状态
        this.$http.get('/api/index.php?g=api&m=userbox&a=get_user_info')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){//已登陆
                this.user = datas.data;
                this.getBanner();
                this.loadMore();
              } else {
                this.getBanner();
                this.loadMore();
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
      loadMore() {
        if(this.status) {
          this.loadAnimation = true;
          this.loading = true;
          //礼包列表接口
          this.$http.get("/www/api-packs-get_list", {
            params: {
              channel_id: this.myType.channel,
              page: this.page,
              terminal_type: 1,
              username: this.user.username
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){//0成功
                if(this.page > datas.data.count){
                  this.status = false;
                  setTimeout(() => {//保证1s的动画效果
                    this.loadAnimation = false;
                  },1000);
                  return
                }
                if(datas.data){
                  var list = datas.data.list;
                  for(let i=0,len=list.length; i < len; i++){
                    var pack_counts =  Number(list[i].pack_counts);
                    var pack_used_counts = Number(list[i].pack_used_counts);
                    if(pack_counts == 0){
                      list[i].pack_remnant = 0;
                    } else {
                      list[i].pack_remnant = Math.ceil((pack_counts - pack_used_counts) / pack_counts * 100 );//剩余礼包
                    }
                    this.list.push(list[i]);
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              if (datas.status == 1) {//1失败
                console.log('请求失败：' + datas.msg);
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
          this.loadAnimation = false;
        }
      },
      getBanner() {
        this.$http.get("/www/api-packs-get_slide", {
          params: {
            channel_id: this.myType.channel,
          }
        })
          .then(response => {
            var datas = response.data;
            if (datas.status == 0){
              if(datas.data) {
                this.banner = datas.data;
              }
            }
            if (datas.status == 1) {//1失败
              console.log('请求失败：' + datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      }
    }
  }
</script>

<style scoped lang="less">
  .KAC{
    flex: 1;
    display: flex;
    flex-direction: column;
    .KAC_head{
      /*width: 100%;*/
      height: 3rem;
      font-size: 1.2rem;
      /*line-height: 3rem;*/
      color: #fff;
      background-color: #3a3937;
      /*padding: 0 .8rem;*/
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .myGift{
        font-size: 1rem;
        padding-right: .8rem;
      }
    }
    .KAC_main{
      flex: 1;
      overflow-y: auto;
      .KAC_search{
        height: 4.5rem;
        background-color: #dbd8d3;
        display: flex;
        align-items: center;
        justify-content: center;
        .KAC_box{
          width: 94%;
          height: 3rem;
          background-color: #fff;
          border-radius: .2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          input{
            flex: 1;
            border: none;
            /*padding-left: 2.4rem;*/
            letter-spacing: 0.05rem
          }
        }
      }
    }
  }
</style>
