<template>
  <div class="settlement">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        提现记录
      </div>
      <div class="head_right"></div>
    </div>
    <div class="main">
      <table class="tab" v-if="list.length > 0">
        <thead>
          <tr>
            <th><span>申请时间</span></th>
            <th><span>用户名称</span></th>
            <th><span>金额</span></th>
            <th><span>提现渠道</span></th>
            <th><span>备注</span></th>
          </tr>
        </thead>
        <tbody>
          <!--<tr>-->
            <!--<td><span>2018-15-25 13:25:10</span></td>-->
            <!--<td><span>12345678945</span></td>-->
            <!--<td><span>105</span></td>-->
            <!--<td><span>支付宝</span></td>-->
            <!--<td><span>审核通过</span></td>-->
          <!--</tr>-->

          <tr v-for="item in list">
            <td><span>{{ item.time }}</span></td>
            <td><span>{{ item.account }}</span></td>
            <td><span>{{ item.money }}</span></td>
            <td><span>{{ item.type|F_type }}</span></td>
            <td>
              <span class="color_red" v-if="item.review === '0'">未通过</span>
              <span class="color_green" v-else-if="item.review === '1'">通过</span>
              <span class="color_yellow" v-else-if="item.review === '2'">审核中</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="zero" v-else="">
        <img src="../../../static/img/wz/profit/a_icon_meiyou-jilu.png">
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
        page: 1,
        list: []
      }
    },
    created() {
      this.getRecord();
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      getRecord(){
        var url = this.jointUrl({
          uid: this.userInfo.uid,
          page: this.page
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.uid,
          page: this.page,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=CommissionCash&a=record',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){
                if(Array.isArray(datas.data) || datas.data.length > 0){
                    let list = datas.data;
                    for(let i = 0; i < list.length; i++){
                        list[i].time = this.myType.formatTimeS(list[i].time);
                    }
                    this.list = this.list.concat(list);
                }
            }
            if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    },
    filters: {
      F_type: (type) => {//提现类型1支付宝2微信
        if(type === '1'){
          return '支付宝';
        } else if(type === '2'){
          return '微信';
        }
        return '';
      },
      F_review: (type) => {// 0未通过，1通过,2审核中
        if(type === '0'){
          return '未通过';
        } else if(type === '1'){
          return '通过';
        } else if(type === '2'){
          return '审核中';
        }
        return '';
      }
    }
  }
</script>

<style scoped lang="less">
  .settlement{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      width: 100%;
      table{
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
      }
      table td, table th{
        /*border: 1px solid #cad9ea;*/
        color: #666;
        height: 5rem;
      }
      table td{
        overflow: hidden;
      }
      table thead th{
        /*background-color: #CCE8EB;*/
        width: 100px;
        color: #2a9bf4;
      }
      table tbody tr{
        border-bottom: 1px solid #eee;
      }
    }
    .zero{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
      }
    }
  }
</style>
