<template>
  <div class="container">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        玩粉
      </div>
      <div class="head_right"></div>
    </div>
    <div class="main" v-if="list.length > 0">
      <div class="list">
        <div class="item" v-for="item in list">
          <div class="item-l">
            <img class="item-logo" v-lazy="item.icon">
          </div>
          <div class="item-c">
            <div class="item-c-li f_s1">
              <span>{{ item.name }}</span>
              <i class="icon-membership icon-membership3" v-if="item.membership == 3"></i>
              <i class="icon-membership icon-membership2" v-else-if="item.membership == 2"></i>
              <i class="icon-membership icon-membership1" v-else></i>
            </div>
            <div class="item-c-li small1 color_888888">
              <span>{{ item.mobile }}</span>
              <span class="m_l3">{{ item.time }}</span>
            </div>
          </div>
          <div class="item-r">
            <div class="color_blue">累计贡献提成：</div>
            <div class="color_red m_t_0-2rem">{{ item.money }}</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div></div>
        <div class="f_s2">
          <span>超级会员：</span>
          <span>{{ superUsers }}位</span>
        </div>
        <div>
          <span>&emsp;钻石会员：</span>
          <span>{{ diamondUsers }}位</span>
        </div>
      </div>
    </div>
    <div v-else class="zero">
      <img src="../../../static/img/wz/bg/a_icon_wufengsi-.png">
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        time: '',
        page: 1,
        list: [],
        count: 0,
        superUsers: 0,
        diamondUsers: 0
      }
    },
    created() {
      this.getSettlement();
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
      getSettlement(){
//        this.time = new Date();
//        var time = Date.parse(new Date());
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
        this.$http.post('/api/index.php?g=api&m=userbox&a=fans_list',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
              if(datas.data){
                let data = datas.data;
                if(this.page === 1){
                  this.count = data.count; //"count": "1", //总条数
                  this.superUsers = data.super_users;//超级会员数量（only for page=1）
                  this.diamondUsers = data.diamond_users;//钻石会员数量（only for page=1）
                }

                if(Array.isArray(data.list) && data.list.length > 0){
                  let list = datas.data.list;
                  for(let i = 0; i < list.length; i++){
                    list[i].name = list[i].nick_name;
                    list[i].icon = list[i].icon_url;
                    list[i].money = list[i].invitation_money + '元';
                    list[i].time = this.myType.formatTimeD(list[i].create_time);
                  }
                  this.list = this.list.concat(list);

                }
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
    }
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .icon-notepad{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      background: url("../../../static/img/wz/settlement/a_icon_mingxi.png") no-repeat;
      background-size: contain;
    }
    .icon-question-black{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      background: url("../../../static/img/wz/settlement/a_icon_wenhao.png") no-repeat;
      background-size: contain;
      margin-left: 1em;
    }
    .zero{
      flex: 1;
      img{
        width: 100%;
      }
    }
    .main{
      flex: 1;
      display: flex;
      flex-direction: column;
      .list{
        flex: 1;
        overflow-y: auto;
        .item{
          display: flex;
          align-items: center;
          height: 5rem;
          padding: .5em;
          border-bottom: 1px solid #f3f3f3;
          overflow: hidden;
          .item-l{
            .item-logo{
              display: inline-block;
              width: 4rem;
              height: 4rem;
              border-radius: 50% 50%;
              margin-left: .2em;
            }
          }
          .item-c{
            flex: 1;
            height: 100%;
            padding-left: .5em;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            /*justify-content: space-between;*/
            justify-content: space-around;
            .item-c-li{
              display: flex;
              align-items: center;

              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              .icon-membership{
                width: 6.5rem;
                height: 1.8rem;
              }
            }
          }
          .item-r{
            display: flex;
            flex-direction: column;
            align-items: center;
            .item-btn{
              /*height: 2rem;*/
              /*line-height: 2rem;*/
              padding: .2em .4em;
              border-radius: 1rem;
              color: #fff;
              background-color: #2a9bf4;
              margin-left: .5em;
            }
          }
        }
      }
      .footer{
        /*height: 3rem;*/
        /*line-height: 3rem;*/
        /*text-align: center;*/
        /*font-size: 1.2rem;*/
        color: #fff;
        background-color: #f31;
        display: flex;
        align-items: flex-end;
        padding: .5em 0;
        &>div{
          flex: 1;
        }
      }
    }
  }
</style>
