<!--折扣-->
<template>
	<div>
    <div class="sy border_eee" v-for="v in list" @click="$router.push({path:'/game_info/'+v.id+'/'+2});">
      <img v-lazy="myType.domainName + v.logo" class="sy_l"></img>
      <div class="sy_c">
        <div class="sy_c_t">
          <span v-text="v.gamename" class="m_r"></span>
          <span class="small3 color_black m_r">{{ v.size|F_size }}</span>
          <!--<span class="sy_c_t_first small3" v-if="v.first == 1">今日首发</span>-->
          <span class="sy_c_t_discount small3">{{ v.discount|F_dis }}</span>
        </div>
        <div class="sy_c_c" v-if="v.label && v.label[0]">
          <span class="sy_c_c_label small3 m_r" v-for="item in v.label" v-text="item"></span>
        </div>
        <div class="sy_c_b">
          <span class="sy_c_b_weal small3" v-if="v.content" v-text="v.content"></span>
        </div>
      </div>
      <div class="sy_r">
        <span class="sy_r_rebate small2" @click.stop="downloadGame(v.web_url)">
          下载
        </span>
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
    methods: {
      downloadGame(url){
        window.location.href = url;
      }
    },
    filters: {	//自定义局部过滤器
      F_size: (size) => {//过滤显示下载量
        return size += 'M';
      },
      F_dis: (num) => {//过滤显示下载量
        return num ? num + '折' : '';
      }
    }
  }
</script>

<style scoped lang="less">

</style>
