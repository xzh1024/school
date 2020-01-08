<!--我的奖品-->
<template>
  <div class="prize">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        我的奖品
      </div>
      <div class="head_right"></div>
    </div>
    <div class="prize_list">
      <div class="p_li border_f0f0f0">
        <div class="flex1">时间</div>
        <div class="flex1">奖品类型</div>
      </div>
      <div class="p_li border_f0f0f0" v-for="v in prizeList">
        <div class="flex1">{{ v.create_time }}</div>
        <div class="flex1">{{ v.name }}</div>
      </div>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        user: {
          icon_url: '',
          nick_name: '',
          username: '',
          user_id: 0
        },
        prizeList: []
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      this.getPrizeList();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {

			});
		},
    methods: {
      router(id){   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
      getPrizeList(){
        var url = this.jointUrl({
          uid: this.userInfo.id
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=luckydraw&a=myPrize',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                var list = datas.data;
                for(let i=0,len=list.length; i < len; i++){
                  list[i].create_time = this.myType.formatTimeS(list[i].create_time);
                }
                this.prizeList = list;
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .prize{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .prize_list{
      flex: 1;
      background-color: #f0f0f0;
      overflow-y: auto;
      .p_li{
        background-color: #fff;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        display: flex;
        overflow: hidden;
      }
    }
  }
</style>
