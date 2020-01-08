<!--已购买-->
<template>
  <div class="purchased">
    <div class="top">
      <div class="screen" v-show="iconType == 'icon_slide_up'" @click.stop="iconType = 'icon_slide_down'"></div>
      <div class="top_type border_f0f0f0" @click="iconType == 'icon_slide_down' ? iconType = 'icon_slide_up' : iconType = 'icon_slide_down';">
        <span>{{ type|F_type }}</span>
        <i class="m_l" v-bind:class="iconType"></i>
      </div>
      <div class="top_list" v-show="iconType == 'icon_slide_up'">
        <div @click="setStatus(true)">全部</div>
        <div @click="setStatus(1)">付款成功</div>
        <div @click="setStatus(4)">交易成功</div>
        <div @click="setStatus(3)">交易取消</div>
      </div>
    </div>
    <div class="main"
         v-infinite-scroll="getProduct"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <!--<div class="TIPS small3 color_888888">*温馨提示:交易成功后账号密码将会以短信的形式发送给您，请注意查收，如果长时间未收到请及时联系客服进行沟通</div>-->
      <div class="flex1">
        <mt-loadmore class="LoadMore" :auto-fill="false" :top-method="loadTop" ref="loadmore">
          <div class="TIPS small3 color_888888">*温馨提示:交易成功后账号密码将会以短信的形式发送给您，请注意查收，如果长时间未收到请及时联系客服进行沟通</div>
          <div class="tra" v-for="v in list" v-show="type == v.status || type === true">
            <div class="color_000000">{{ v.status|F_type }}</div>
            <div class="tra_top m_t_1rem">游戏名：{{ v.game_name }}</div>
            <div class="tra_center m_t_1rem">{{ v.title }}</div>
            <div class="tra_bottom m_t_1rem">
              <div class="flex1">金额：{{ v.price }}</div>
              <div class="color_999999">下单时间：{{ v.create_time }}</div>
            </div>
          </div>
          <!--加载动画-->
          <div v-show="loading">
            <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
          </div>
        </mt-loadmore>
      </div>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data: function () {
      return {
        iconType: 'icon_slide_down',
        list: [],
        page: 1,
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        type: true,
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
    filters: {
      F_type: (type) => {
        if (type === true) {//1支付成功， 3取消(退款)，4交易完成
          return '全部'
        } else if (type == 1) {
          return '付款成功'
        } else if(type == 2){
          return '等待打款'
        } else if (type == 3) {
          return '交易取消'
        } else if (type == 4) {
          return '交易成功'
        }
        return type
      }
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
      setStatus(type){
        this.type = type;
        this.iconType = 'icon_slide_down';
      },
      //我的商品
      getProduct() {
        if(this.status){
          this.loading = true;
          var url = this.jointUrl({
            uid: this.traUserInfo.uid,
            status: 3,  //状态 传0为全部 1 审核中 2 出售中 3 交易中 4已出售 5已下架
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=Products&a=get_product_by_user',{
            params: {
              uid: this.traUserInfo.uid,
              status: 3,
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
  .purchased{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    /*overflow-x: hidden;*/
    .screen{
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 9;
      top: 10rem;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .top{
      height: 2rem;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 10;
      .top_type{
        flex: 1;
        padding: 0 1rem;
        display: flex;
        align-items: center;
      }
      .top_list{
        width: 100%;
        position: absolute;
        z-index: 11;
        top: 100%;
        left: 0;
        background-color: #ffffff;
        div{
          height: 2.8rem;
          line-height: 2.8rem;
          text-align: center;
          border-bottom: 1px solid #f4f4f4;
        }
      }
    }
    .main{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      .TIPS{
        margin: .8rem 1rem;
      }
    }
  }
</style>
