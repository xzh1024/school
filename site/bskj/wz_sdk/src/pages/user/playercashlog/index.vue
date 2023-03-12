<template>
  <div class="container">
    <Header title="消费记录">
      <div slot="left">
        <span class="icon-left" @click="$router.go(-1);"></span>
      </div>
    </Header>
    <div class="main" :class="{'no-data':list.length === 0}"
         v-infinite-scroll="getPayList"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <table class="table">
        <thead>
          <tr>
            <th>消费时间</th>
            <th>消费金额</th>
            <th>消费状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" v-bind:key="index">
            <td>{{ item.create_time }}</td>
            <td>{{ item.money }}</td>
            <td :class="{'red':item.status == 3,'yellow':item.status == 2,'green':item.status == 1}">{{ item.status|F_status }}</td>
          </tr>
        </tbody>
      </table>
      <mt-spinner type="triple-bounce" v-show="loadAnimation" class="loadingStyle"></mt-spinner>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Header from '@/components/header'
  export default {
    data () {
      return {
        list: [],
        page: 1,
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false//标记加载动画,false为隐藏
      }
    },
    components:{ Header },
    computed: {
      ...mapGetters([
        'userData'
      ]),
    },
    filters: {
      F_status: (status) => {
          if(status == 1) return '成功';
          if(status == 2) return '发货';
          if(status == 3) return '未支付';
      }
    },
    created() {
      this.getPayList();
    },
    methods: {
      getPayList() {
        if(this.status){
          this.loading = true;
          this.loadAnimation = true;

          let options = {
            appid: this.userData.appid,
            uid: this.userData.uid,
            page: this.page
          };
          options.sign = this.util.getSign(options, this.userData.appkey);
          let params = this.util.jointUrl(options);
          this.axios.post('/api/index.php?g=api&m=user&a=pay_list_by_user', params)
            .then(response => {
              var datas = response.data;
              console.log(datas);
              if(datas.status == 1){
//              datas.data.create_time = this.util.formatTime(datas.data.create_time, 's');
//              this.msgData = datas.data;
                if(datas.data && datas.data.list && datas.data.list.length > 0){
                  let list = datas.data.list;
                  this.list.push.apply(this.list, list);
                  this.page++;
                } else {
                  this.status = false;
                }
              } else {
                this.status = false;
              }
              if(datas.status == 0){
                this.status = false;
                console.log(datas.msg);
              }
              this.loading = false;
              this.loadAnimation = false;
            })
            .catch(error => {
              this.status = false;
              this.loading = false;
              this.loadAnimation = false;
              console.log(error);
            });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .no-data{
      background: url("../../../static/img/noData/a_icon_wuxiaoxi.png") no-repeat;
      background-size: 100%;
    }
    .main{
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      .table{
        border-collapse: collapse;
        /*margin: 1em auto;*/
        text-align: center;
        thead{
          th{
            width: 12rem;
          }
        }
        td, th{
          height: 2.5rem;
          border: 1px solid #e9e9e9;
          /*color: #666;*/
          color: #444;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .red{ color: #D74D43;}
        .yellow{ color: #FFFF66;}
        .green{ color: #009966;}
      }
    }
  }
</style>

