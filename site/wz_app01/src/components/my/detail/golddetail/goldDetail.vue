<!--金币明细-->
<template>
  <div class="goldDetail">
    <div class="hint">
      <small class="color_ff7900">*温馨提示：签到，每日好评，金币抽奖都可获得金币</small>
    </div>
    <div class="table"
         v-infinite-scroll="getUserCoin"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="th border_dcdcdc">
        <div class="td">时间</div>
        <div class="td">收支类型</div>
        <div class="td">数量变更</div>
        <div class="td">余额</div>
      </div>
      <div class="tr border_dcdcdc" v-for="v in coinInfoList">
        <div class="td">
          <span v-text="v.create_time"></span>
        </div>
        <div class="td" v-text="v.type"></div>
        <div class="td" v-text="v.coin_change"></div>
        <div class="td color_ff0000" v-text="v.coin_counts"></div>
      </div>
      <!--加载动画-->
      <div v-show="loading">
        <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
      </div>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
  	data: function () {
      return {
        user: {
          icon_url: "",
          nick_name: "",
          user_id: 0
        },
        page: 1,
        coinInfoList: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getUserCoin();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {

			});
		},
    methods: {
      //获取金币详情
      getUserCoin() {
        if(this.status) {
          this.loading = true;
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          //获取签到信息
          this.$http.get('/api/index.php?g=api&m=coin&a=log', {
            params: {
              uid: this.userInfo.id,
              channel: this.myType.channel,
              page: this.page,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if (datas.status == 1) {//1成功
                if(this.page >= datas.data.count) {
                  this.status = false;
                } else {
                  this.page++;
                }
                if(datas.data.list){//收支类型： 1 签到 2 评论 3 好友推荐 4 金币兑换 5金币抽奖 6 后台补发
                  var list = datas.data.list;
                  for(let i=0,len=list.length; i < len; i++){
                    if(list[i].type == 1){
                      list[i].type = '签到';
                    } else if(list[i].type == 2) {
                      list[i].type = '评论';
                    } else if(list[i].type == 3) {
                      list[i].type = '好友推荐';
                    } else if(list[i].type == 4) {
                      list[i].type = '金币兑换';
                    } else if(list[i].type == 5) {
                      list[i].type = '金币抽奖';
                    } else if(list[i].type == 6) {
                      list[i].type = '后台补发';
                    }
                    this.coinInfoList.push(list[i]);
                  }
                }
              }
              if (datas.status == 0) {//0失败
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
  .goldDetail{
    flex: 1;
    display: flex;
    flex-direction: column;
    .table{
      flex: 1;
      overflow-y: auto;
      .tr,.th{
        height: 3rem;
        display: flex;
        align-items: center;
        .td{
          flex: 1;
          text-align: center;
        }
      }
      .th{
        height: 2.5rem;
      }
    }
  }
</style>
