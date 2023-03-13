<template><!--游戏详情-礼包-->
	<div class="gameGift">
    <GiftList :list="giftListData"></GiftList>
	</div>
</template>

<script>
  import GiftList from '../../list/listGift.vue'
  export default {
    data: function () {
      return {
        giftListData:[]
      }
    },
    components:{ GiftList },
    created() {
      this.getGiftList();
    },
    methods:{
      //礼包列表接口
      getGiftList() {
        this.$http.get("/www/api-packs-get_list_by_game", {
          params: {
            game_id: this.$route.query.id,
            terminal_type: 1
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 0){//0成功
              var list = datas.data.list;
              for(let i=0,len=list.length; i < len; i++){
                var pack_counts =  Number(list[i].pack_counts);
                var pack_used_counts = Number(list[i].pack_used_counts);
                if(pack_counts == 0){
                  list[i].pack_remnant = 0;
                } else {
//                  list[i].pack_remnant = Math.ceil((pack_counts - pack_used_counts) / pack_counts * 100 );//剩余礼包
                  list[i].pack_remnant = pack_counts - pack_used_counts;//剩余礼包
                }
                this.giftListData.push(list[i]);
              }
              console.log(this.giftListData)
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
	.gameGift{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
	}
</style>
