<!--昨日佣金-->
<template>
  <div class="container">
    <!--<div class="list">-->
      <!--<div class="item">-->
        <!--<div class="item-left">-->
          <!--<i class="icon-medal1"></i>-->
        <!--</div>-->
        <!--<div class="item-center">-->
          <!--<div class="item-logo">-->
            <!--<i class="icon-crown icon-crown1"></i>-->
            <!--<i class="icon-touxiang-m"></i>-->
          <!--</div>-->
          <!--<div class="item-content">-->
            <!--<div class="item-username">玩家123456</div>-->
            <!--<div><i class="icon-membership3"></i></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="item-right">-->
          <!--<span class="color_blue">116</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <ListRanking :list="list"></ListRanking>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ListRanking from '../../../list/listRanking.vue'
  export default {
  	data: function () {
      return {
        type: 1,//1昨日佣金  2上月佣金 3累计佣金 4累计粉丝
        list: []
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    components: { ListRanking },
    created() {
      this.getData();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      setData(data){
//        this.$parent.setRanklistData(data);
        if(data){
          this.$emit('setRanklistData', data);
        } else {
          this.$emit('setRanklistData', {
            "first": {
              "icon_url": '',
              "nick_name": '',
            },
            "myLevel": ''
          });
        }
      },
      getData(){
        this.setData();
//        var url = this.jointUrl({
//          type: this.type,
//          uid: this.userInfo.uid
//        });
//        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          type: this.type,
          uid: this.userInfo.uid
        });
        this.$http.post('/www/api-RankList-rankList',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 0){//0成功
//              this.userData = datas.data;

            }
            if(datas.status == 1){//1失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<style scoped lang="less">
  .container{
    /*flex: 1;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*overflow-y: auto;*/
  }
</style>
