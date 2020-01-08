<!--仓库中-->
<template>
  <div class="warehouse"
       v-infinite-scroll="getProduct"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <!--<div class="tra">-->
    <!--<div class="tra_top">游戏名：别让我冒险</div>-->
    <!--<div class="tra_center">hahah</div>-->
    <!--<div class="tra_bottom">-->
    <!--<div class="flex1">金额：100.00</div>-->
    <!--<div class="color_999999">提交时间：2018-07-20 17:19</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="flex1">
      <mt-loadmore class="LoadMore" :auto-fill="false" :top-method="loadTop" ref="loadmore">
        <div class="tra" v-for="v in list">
          <div class="tra_top">游戏名：{{ v.game_name }}</div>
          <div class="tra_center m_t_1rem">{{ v.title }}</div>
          <div class="tra_bottom m_t_1rem">
            <div class="flex1">金额：{{ v.price }}</div>
            <div class="color_999999">提交时间：{{ v.create_time }}</div>
          </div>
        </div>
        <!--加载动画-->
        <div v-show="loading">
          <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data: function () {
      return {
        list: [],
        page: 1,
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
      }
    },
    props: {
      infoData: {
        type: Object
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ]),
    },
    created() {
      this.getProduct();
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {

      });
    },
    methods: {
      loadTop(){
        setTimeout(() => {
          this.page = 1;
          this.status = true;
          this.getProduct();
          this.$refs.loadmore.onTopLoaded();
        },1500)
      },
      //我的商品
      getProduct() {
        if(this.status){
          this.loading = true;
          var url = this.jointUrl({
            uid: this.traUserInfo.uid,
            status: 5,  //状态 传0为全部 1 审核中 2 出售中 3 交易中 4已出售 5已下架
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=Products&a=get_product_by_user',{
            params: {
              uid: this.traUserInfo.uid,
              status: 5,
              page: this.page,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                if(datas.data.count >= this.page){
                  let list = datas.data.list;
                  if(this.page == 1){
                    for(let i = 0; i< list.length; i++){
                      list[i].create_time = this.myType.formatTimeM(list[i].create_time);
                    }
                    this.list = list;
                  } else {
                    for(let i = 0; i< list.length; i++){
                      list[i].create_time = this.myType.formatTimeM(list[i].create_time);
                      this.list.push(list[i]);
                    }
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => this.loading = false,1000);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .warehouse{
    width: 100%;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .tra{
      height: 5rem;
      padding: .8rem;
      color: #636363;
      border-bottom: 1px solid #f3f3f3;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tra_bottom{
        display: flex;
        align-items: center;
        line-height: 1rem;
      }
    }
  }
</style>
