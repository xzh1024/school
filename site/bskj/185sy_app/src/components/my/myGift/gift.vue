<!--我的礼包-->
<template>
  <div class="gift">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        我的礼包
      </div>
      <div class="head_right">
        <!--<span @click="$router.push({path:'/enroll'});">注册</span>-->
      </div>
    </div>
    <div class="gift_list"
         v-infinite-scroll="getUserGift"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <GiftList :list="giftList"></GiftList>
      <!--加载动画-->
      <div v-show="loading">
        <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
      </div>
    </div>
  </div>
</template>
<script>
//  import { MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  import GiftList from '../../list/listGift.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        page: 1,
        giftList:[],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
//        loadAnimation: false//标记加载动画,false为隐藏
      }
    },
    components: { GiftList },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
        this.getUserGift();
		},
    methods: {
//      messageBox () {
//        MessageBox({
//          title: '礼包码已复制',
//          message: '领取后请尽快使用，以免过期！',
//          confirmButtonClass: 'm_confirm_btn'
//        });
//      },
      getUserGift() {
        if(this.status) {
          this.loading = true;
          //获取用户礼包
          this.$http.get('/www/api-packs-get_list_by_user',{
            params: {
              username: this.userInfo.username,
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
//                    list[i].pack_remnant = Math.ceil((pack_counts - pack_used_counts) / pack_counts * 100 );//剩余礼包
                    list[i].pack_remnant = pack_counts - pack_used_counts;//剩余礼包
                  }
                  this.giftList.push(list[i]);
                }
                this.page++;
              }
              if(datas.status == 1){//1失败
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => {//保证1s的动画效果
                this.loading = false;
              },1000);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        } else {
          this.loading = true;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .gift{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .gift_list{
      flex: 1;
      overflow-y: auto;
    }
  }
</style>
