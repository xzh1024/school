<!--我的礼包-->
<template>
  <div class="gift">
    <!--页头-->
    <Head :head="head"></Head>
    <div class="gift_list"
         v-infinite-scroll="getUserGift"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <GiftList :list="giftList"></GiftList>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
      </div>
    </div>
  </div>
</template>
<script>
//  import { MessageBox } from 'mint-ui';
  import Head from '../../header/head.vue'
  import GiftList from '../../list/listGift.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        user: {
          icon_url: "",
          nick_name: "",
          user_id: 0,
          username:""
        },
        head: {
          title:"我的礼包",
          title_but: true
        },
        page: 1,
        giftList:[],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false//标记加载动画,false为隐藏
      }
    },
    components: { Head, GiftList },
    created() {
        this.getUser();
		},
    methods: {
//      messageBox () {
//        MessageBox({
//          title: '礼包码已复制',
//          message: '领取后请尽快使用，以免过期！',
//          confirmButtonClass: 'm_confirm_btn'
//        });
//      },
      getUser () {
        //获取登录状态
        this.$http.get('/api/index.php?g=api&m=userbox&a=get_user_info')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                this.user = datas.data;
                this.getUserGift();
              } else {
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
      getUserGift() {
        if(this.status) {
          this.loadAnimation = true;
          this.loading = true;
          //获取用户礼包
          this.$http.get('/www/api-packs-get_list_by_user',{
            params: {
              username: this.user.username,
              channel_id: this.myType.channel,
              page: this.page
            }
          })
            .then(response => {
              var datas = response.data;
              if(this.page >= datas.data.count){
                this.status = false;
              }
              if(datas.status == 0){//0成功
                var list = datas.data.list;
                for(let i=0,len=list.length; i < len; i++){
                  var pack_counts =  Number(list[i].pack_counts);
                  var pack_used_counts = Number(list[i].pack_used_counts);
                  list[i].id = list[i].pid;
                  if(pack_counts == 0){
                    list[i].pack_remnant = 0;
                  } else {
                    list[i].pack_remnant = Math.ceil((pack_counts - pack_used_counts) / pack_counts * 100 );//剩余礼包
                  }
                  this.giftList.push(list[i]);
                }
                this.page++;
              }
              if(datas.status == 1){//1失败
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              },1000);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        } else {
          this.loading = true;
          this.loadAnimation = false;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .gift{
    flex: 1;
    display: flex;
    flex-direction: column;
    .gift_list{
      overflow-y: auto;
    }
  }
</style>
