<!--昨日佣金-->
<template>
  <div class="container">
    <ListRanking :list="list"></ListRanking>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ListRanking from '../../../list/listRanking.vue'
  export default {
  	data: function () {
      return {
        type: 4,//1昨日佣金  2上月佣金 3累计佣金 4累计粉丝
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
              if(datas.data){
                let data = datas.data;
                if(Array.isArray(data.list) && data.list.length > 0){
                  var list = data.list;
                  var first = list[0];
                  this.setData({
                    "first": {
                      "icon_url": first.icon_url ? first.icon_url : '',
                      "nick_name": first.nick_name ? first.nick_name : '',
                    },
                    "myLevel": data.myLevel
                  });

                  for(let i = 0; i < list.length; i++){
                    list[i].uid = list[i].uid ? list[i].uid : 0;
                    list[i].nick_name = list[i].nick_name ? list[i].nick_name : '木有昵称';
                    list[i].icon_url = list[i].icon_url ? list[i].icon_url : '';
                    list[i].membership = list[i].membership ? list[i].membership : 1;
                    list[i].counts = list[i].counts ? list[i].counts : 0;
                  }
                  this.list = list;
                }
              }
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
