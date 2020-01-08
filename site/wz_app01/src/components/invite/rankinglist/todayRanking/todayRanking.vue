<!--今日排行-->
<template>
  <div class="todayRanking">
    <div class="tab border_f0f0f0">
      <div class="tab_td flex2">排名</div>
      <div class="tab_td flex5">用户信息</div>
      <div class="tab_td flex3">邀请人数</div>
      <div class="tab_td flex3">奖励<span class="small3">(金币)</span></div>
    </div>
    <!--<div class="tab small2 border_f0f0f0">-->
      <!--<div class="tab_td flex2">-->
        <!--<i class="icon_one"></i>-->
      <!--</div>-->
      <!--<div class="tab_td flex5 tab_username">-->
        <!--<i class="tab_td_logo"></i>-->
        <!--<span class="tab_td_name">a100***</span>-->
        <!--<i class="icon_men"></i>-->
        <!--<i class="icon_vip"></i>-->
      <!--</div>-->
      <!--<div class="tab_td flex3">2</div>-->
      <!--<div class="tab_td flex3">1000</div>-->
    <!--</div>-->
    <div class="tab small2 border_f0f0f0" v-for="v in todayList">
      <div class="tab_td flex2">
        <i class="icon_one" v-if="v.ranking == 1"></i>
        <i class="icon_two" v-else-if="v.ranking == 2"></i>
        <i class="icon_three" v-else-if="v.ranking == 3"></i>
        <span class="icon_rk" v-else v-text="v.ranking"></span>
      </div>
      <div class="tab_td flex5 tab_username">
        <img v-lazy="v.icon_url" class="tab_td_logo"></img>
        <span class="tab_td_name">{{ v.username|F_username }}</span>
        <i class="icon_men" v-if="v.sex == 1"></i>
        <i class="icon_women" v-else-if="v.sex == 2"></i>
        <i class="icon_vip" v-if="v.vip == 1"></i>
      </div>
      <div class="tab_td flex3" v-text="v.count"></div>
      <div class="tab_td flex3" v-text="v.coin"></div>
    </div>
  </div>
</template>
<script>
  export default {
  	data: function () {
      return {

      }
    },
    props: {
      todayList: {
        type: Array
      }
    },
    filters: {
      F_username: (name) => {
        return name.substr(0,4) + '****';
      }
    }
  }
</script>

<style scoped lang="less">
  .todayRanking{
    flex: 1;
    overflow-y: auto;
    .tab{
      height: 3.4rem;
      display: flex;
      .tab_td{
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        .tab_td_logo{
          width: 2.4rem;
          height: 2.4rem;
          border: 1px solid #f56f00;
          border-radius: 50%;
        }
        .tab_td_name{
          margin: 0 .2rem;
        }
      }
      .tab_username{
        justify-content: flex-start;
      }
    }
  }
</style>
