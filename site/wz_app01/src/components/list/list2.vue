<template>
  <div>
    <!--<div class="sy border_eee" v-for="v in list" @click="$router.push({path:'/game_info/'+v.id+'/'+type})">-->
    <div class="sy border_eee" v-for="v in list" @click="router(v.id, type, myType.channel)">
      <img v-lazy="myType.domainName + v.logo" class="sy_l"></img>
      <div class="sy_c">
        <div class="sy_c_t">
          <span v-text="v.gamename"></span>
          <!--<span class="small3 color_black m_l">{{ v.size|F_size }}</span>-->
          <span class="sy_c_first m_l" v-if="v.operate==2">联合</span>
          <span class="sy_c_operate1 m_l" v-if="v.operate==1">独家</span>
        </div>
        <div class="color_888888 small2">
          <span>{{ v.types }}</span>
          <span class="sy_c_first m_l" v-if="type==1 && v.first==1">今日首发</span>
          <span class="sy_c_discount small3 m_l" v-else-if="type==2">{{ v.discount|F_dis }}</span>
        </div>
        <div class="sy_c_c" v-if="v.label && v.label[0]">
          <span class="sy_c_c_label small3 m_r" v-for="item in v.label">{{ item }}</span>
        </div>
        <div class="sy_c_b">
          <span class="sy_c_b_weal small3" v-if="v.content">{{ v.content }}</span>
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
    props: ['list','type'],
    filters: {	//自定义局部过滤器
      F_size: (size) => {//过滤显示下载量
        return size += 'M';
      },
      F_dis: (num) => {//过滤显示下载量
        return num ? num + '折' : '';
      }
    },
    methods: {
      router(id, type, channel) {   //跳转路由
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: type,
          channel: channel
        }});
      },
    }
  }
</script>

<style scoped lang="less">
  .sy{
    height: 5rem;
    display: flex;
    align-items: center;
    padding: .5rem .8rem;
    .sy_l{
      width: 4.5rem;
      height: 4.5rem;
      border-radius: .5rem;
    }
  }
</style>
