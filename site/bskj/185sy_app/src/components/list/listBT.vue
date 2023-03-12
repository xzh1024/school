<template>
	<div>
    <div class="sy border_eee" v-for="v in list" @click="$router.push({path:'/game_info/'+v.id+'/'+1})">
      <img v-lazy="myType.domainName + v.logo" class="sy_l"></img>
      <div class="sy_c">
        <div class="sy_c_t">
          <span v-text="v.gamename" class="m_r"></span>
          <span class="small3 color_black m_r">{{ v.size|F_size }}</span>
          <span class="sy_c_t_first small3" v-if="v.first == 1">今日首发</span>
        </div>
        <div class="sy_c_c" v-if="v.label && v.label[0]">
          <span class="sy_c_c_label small3 m_r" v-for="item in v.label" v-text="item"></span>
        </div>
        <div class="sy_c_b">
          <span class="sy_c_b_weal small3" v-if="v.content" v-text="v.content"></span>
        </div>
      </div>
      <div class="sy_r">
        <div class="sy_r_rebate small2">
          <span>申请</span>
          <span>返利</span>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array
      }
    },
    filters: {	//自定义局部过滤器
      F_size: (size) => {//过滤显示下载量
        return size += 'M';
      }
    }
  }
</script>

<style scoped lang="less">
  /*.sy{*/
    /*height: 4.5rem;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*padding: .8rem;*/
    /*.sy_l{*/
      /*width: 4rem;*/
      /*height: 4rem;*/
      /*border-radius: .6rem;*/
    /*}*/
    /*.sy_c{*/
      /*height: 100%;*/
      /*padding-left: .8rem;*/
      /*flex: 1;*/
      /*display: flex;*/
      /*flex-direction: column;*/
      /*justify-content: space-between;*/
      /*overflow: hidden;*/
      /*.sy_c_t{*/
        /*width: 100%;*/
        /*!*padding: .2rem 0;*!*/
        /*display: flex;*/
        /*align-items: flex-end;*/
        /*white-space: nowrap;*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*.sy_c_t_first{*/
          /*height: 1.2rem;*/
          /*line-height: 1.2rem;*/
          /*padding: 0 .3rem;*/
          /*color: #d200ff;*/
          /*border: 1px solid #d200ff;*/
          /*border-radius: .7rem;*/
        /*}*/
      /*}*/
      /*.sy_c_c{*/
        /*width: 100%;*/
        /*!*padding: .2rem 0;*!*/
        /*display: flex;*/
        /*white-space: nowrap;*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*.sy_c_c_label{*/
          /*color: #fff;*/
          /*padding: 0 .2rem;*/
          /*border-radius: .2rem;*/
        /*}*/
        /*.sy_c_c_label:nth-child(1){*/
          /*background-color: #ffaa1c;*/
        /*}*/
        /*.sy_c_c_label:nth-child(2){*/
          /*background-color: #59bcf7;*/
        /*}*/
        /*.sy_c_c_label:nth-child(3){*/
          /*background-color: #ff7c7a;*/
        /*}*/
      /*}*/
      /*.sy_c_b{*/
        /*width: 100%;*/
        /*!*padding: .2rem 0;*!*/
        /*display: flex;*/
        /*overflow: hidden;*/
        /*.sy_c_b_weal{*/
          /*color: #fff;*/
          /*background-color: #ff8838;*/
          /*padding: 0 .3rem;*/
          /*border-radius: .2rem;*/
          /*white-space: nowrap;*/
          /*overflow: hidden;*/
          /*text-overflow: ellipsis;*/
        /*}*/
      /*}*/
    /*}*/
    /*.sy_r{*/
      /*.sy_r_rebate{*/
        /*width: 3.4rem;*/
        /*height: 3.4rem;*/
        /*color: #29a1f7;*/
        /*border-radius: 50%;*/
        /*border: 1px solid;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        /*align-items: center;*/
      /*}*/
    /*}*/
  /*}*/
</style>
