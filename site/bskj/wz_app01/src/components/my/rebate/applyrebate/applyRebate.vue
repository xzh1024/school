<!--申请返利-->
<template>
  <div class="applyRebate" :class="isBg">
    <div class="re_t border_f0f0f0" v-if="this.rebateList.length>0">
      <div class="re_th flex4">游戏名</div>
      <div class="re_th flex2">区服</div>
      <div class="re_th flex4">角色名</div>
      <div class="re_th flex3">返利元宝</div>
    </div>
    <!--<div class="re_c border_f0f0f0">-->
      <!--<div class="re_li flex4">武侠大宗师</div>-->
      <!--<div class="re_li flex2">1区</div>-->
      <!--<div class="re_li flex4">成王败寇A</div>-->
      <!--<div class="re_li flex3">4410</div>-->
      <!--<div class="btn_apply">申请</div>-->
    <!--</div>-->
    <!--<div class="re_c border_f0f0f0">-->
      <!--<div class="re_li flex4">三国群英传</div>-->
      <!--<div class="re_li flex2">1区</div>-->
      <!--<div class="re_li flex4">成王败寇A</div>-->
      <!--<div class="re_li flex3">105</div>-->
      <!--<div class="btn_apply">申请</div>-->
    <!--</div>-->
    <div class="re_c border_f0f0f0" v-for="(v,i) in rebateList" @click="show(v.user, i)">
      <div class="re_li flex4" v-text="v.gamename">武侠大宗师</div>  <!--游戏名-->
      <div class="re_li flex2" v-text="v.isServerID">1区</div>  <!--区服-->
      <div class="re_li flex4" v-text="v.isRolename">成王败寇A</div>  <!--角色名，如果有多个以逗号隔开-->
      <div class="re_li flex3" v-text="v.game_coin">105</div>  <!--可返利元宝数量-->
      <div class="btn_apply" @click.stop="rebateApply({'appid':v.appid, 'serverID':v.isServerID, 'roleid':v.isRoleid, 'rolename':v.isRolename})">申请</div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="picker">
        <!--<div class="p_one" @click="">-->
          <!--<div class="p_one_l">1区</div>-->
          <!--<div class="p_one_r">成王败寇A</div>-->
        <!--</div>-->
        <div class="p_one" v-for="v in gameUser" @click="setRebateApply(v)">
          <div class="p_one_l">{{ v.serverID }}</div>
          <div class="p_one_r">{{ v.rolename }}</div>
        </div>
      </div>
    </mt-popup>

	</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
  	data: function () {
      return {
//        index:'val01',
        message: '555',
        rebateList:[],
//        isBg: 'ar_bg'
        gameUser:[],
        popupVisible:false
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
      isBg: function() { //账户管理
        return this.rebateList.length>0 ? '' : 'ar_bg';
      }
    },
    created() {
      this.getRebateInfo();
		},
		mounted(){
			this.$nextTick(function () {

      });
		},
    methods: {
      show(user, index){
        this.gameUser = user;
        this.gameIndex = index;
        this.popupVisible = true;
      },
      setRebateApply(key){
        this.rebateList[this.gameIndex].isServerID = key.serverID;
        this.rebateList[this.gameIndex].isRoleid = key.roleid;
        this.rebateList[this.gameIndex].isRolename = key.rolename;
        this.popupVisible = false;
      },
      toast() {
        Toast({
          message: this.message,
          duration: 2000,
          className: 'm_toast'
        });
      },
      //用户可返利列表
      getRebateInfo(){
        var url = this.jointUrl({
          uid: this.userInfo.id
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=selfRebate&a=rebateInfo',{
          params: {
            uid: this.userInfo.id,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                let data = datas.data;
                for(let i=0,len=data.length; i < len; i++){
                  data[i].isServerID = data[i].user[0].serverID;
                  data[i].isRolename = data[i].user[0].rolename;
                  data[i].isRoleid = data[i].user[0].roleid;
                }
                this.rebateList = data;
              } else {//没有可返利的

              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //申请返利
      rebateApply(req){
        var url = this.jointUrl({
          uid: this.userInfo.id,
          appid: req.appid,
          rolename: req.rolename,
          roleid: req.roleid,
          serverID: req.serverID
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=selfRebate&a=rebateApply',{
          params: {
            uid: this.userInfo.id,
            appid: req.appid,
            rolename: req.rolename,
            roleid: req.roleid,
            serverID: req.serverID,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.message = datas.msg;
              this.toast();
              this.getRebateInfo();
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
  .applyRebate{
    width: 100%;
    flex: 1;
    overflow-y: auto;
    .ar_bg{
      background: url("../../../../static/img/26_icon_zwfl.png") no-repeat;
      background-size: 100% 100%;
    }
    .picker{
      /*width: 100%;*/
      /*display: flex;*/
      .p_one{
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        .p_one_l{
          width: 50%;
        }
        .p_one_r{
          width: 50%;
        }
      }
    }
    .re_t{
      background-color: #fff;
      height: 2.8rem;
      padding: 0 4.8rem 0 .8rem;
      display: flex;
      align-items: center;
      .re_th{
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        font-weight: bold;
        /*display: flex;*/
        /*text-align: center;*/
        /*justify-content: center;*/
      }
    }
    .re_c{
      background-color: #fff;
      height: 4rem;
      padding: 0 .8rem;
      display: flex;
      align-items: center;
      position: relative;
      .re_li{
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      .btn_apply{
        width: 4rem;
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        color: #29a1f7;
        border: 1px solid #29a1f7;
        border-radius: .9rem;
      }
    }
  }

</style>
