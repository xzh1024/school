<template>
	<div class="listOpen">
    <div class="sy border_eee" v-if="data.future" v-for="v in data.future" v-on:click.sync="router(v.id)">
      <img v-lazy="myType.domainName + v.logo" class="sy_l"></img>
      <div class="sy_c">
        <div class="sy_c_t">
          <span v-text="v.gamename" class="m_r"></span>
          <!--<span class="small3 color_black m_r" v-if="type==2">{{ v.size|F_size }}</span>-->
          <span class="sy_c_t_first small3" v-if="type==1 && v.first==1">今日首发</span>
          <span class="sy_c_t_discount small3" v-else-if="type==2">{{ v.discount|F_dis }}</span>
        </div>
        <div class="sy_c_c" v-if="v.label && v.label[0]">
          <span class="sy_c_c_label small3 m_r" v-for="item in v.label" v-text="item"></span>
        </div>
        <div class="sy_c_b">
          <!--<span class="sy_c_b_weal small3" v-if="v.content" v-text="v.content"></span>-->
          <span class="small3 color_ababab" v-if="v.start_time">{{ v.start_time|F_time }}</span>
        </div>
      </div>
      <div class="sy_r">
        <!--<div class="sy_r_rebate small2">-->
          <!--<span>申请</span>-->
          <!--<span>返利</span>-->
        <!--</div>-->
        <div class="color_blue">未开服</div>
      </div>
    </div>
    <div class="sy border_eee" v-if="data.past" v-for="v in data.past" v-on:click.sync="router(v.id)">
      <img v-lazy="myType.domainName + v.logo" class="sy_l"></img>
      <div class="sy_c">
        <div class="sy_c_t">
          <span v-text="v.gamename" class="m_r"></span>
          <!--<span class="small3 color_black m_r">{{ v.size|F_size }}</span>-->
          <!--<span class="sy_c_t_first small3" v-if="v.first == 1">今日首发</span>-->
          <span class="sy_c_t_first small3" v-if="type==1 && v.first==1">今日首发</span>
          <span class="sy_c_t_discount small3" v-else-if="type==2">{{ v.discount|F_dis }}</span>
        </div>
        <div class="sy_c_c" v-if="v.label && v.label[0]">
          <span class="sy_c_c_label small3 m_r" v-for="item in v.label" v-text="item"></span>
        </div>
        <div class="sy_c_b">
          <!--<span class="sy_c_b_weal small3" v-if="v.content" v-text="v.content"></span>-->
          <div class="small3 color_ababab text_format" v-if="v.start_time">{{ v.start_time|F_time }}</div>
        </div>
      </div>
      <div class="sy_r">
        <!--<div class="sy_r_rebate small2">-->
          <!--<span>申请</span>-->
          <!--<span>返利</span>-->
        <!--</div>-->
        <div class="color_ababab">已开服</div>
      </div>
    </div>
    <!--<div class="sole" v-if="data.future" v-for="v in data.future" v-on:click.sync="router(v.id)">-->
      <!--<img v-lazy="myType.domainName + v.logo" class="sole-logo"></img>-->
      <!--<div class="sole-cont">-->
        <!--<p class="sole-cont-gamename">{{ v.gamename }}-{{ v.server_id }}</p>-->
        <!--<p class="sole-cont-weal" v-if="v.label">-->
          <!--<span class="sole-cont-label" v-for="v in v.label">{{ v }}</span>-->
        <!--</p>-->
        <!--<p class="color_837f7e"><small>开服时间：{{ v.start_time }}</small></p>-->
      <!--</div>-->
      <!--<div class="sole-cont-rebate color_blue">-->
        <!--未开服-->
      <!--</div>-->
    <!--</div>-->
		<!--<div class="sole" v-if="data.past" v-for="v in data.past" v-on:click.sync="router(v.id)">-->
			<!--<img :src="myType.domainName + v.logo" class="sole-logo"></img>-->
			<!--<div class="sole-cont">-->
				<!--<p class="sole-cont-gamename">{{ v.gamename }}-{{ v.server_id }}</p>-->
				<!--<p class="sole-cont-weal" v-if="v.label">-->
          <!--<span class="sole-cont-label" v-for="v in v.label">{{ v }}</span>-->
				<!--</p>-->
				<!--<p class="color_837f7e"><small>开服时间：{{ v.start_time }}</small></p>-->
			<!--</div>-->
			<!--<div class="sole-cont-rebate color_ababab">-->
				<!--已开服-->
			<!--</div>-->
		<!--</div>-->
	</div>
</template>

<script>
	export default {
//    props: {
//      data: {
//          type: Object
//      }
//    },
    props: ['data','type'],
    filters: {	//自定义局部过滤器
      F_time: (time) => {//过滤显示下载量
        return time ? '开服时间：' + time : '';
      },
      F_dis: (num) => {//过滤显示下载量
        return num ? num + '折' : '';
      }
    },
    methods: {
      router(id) {   //跳转路由
//        this.$router.push({path:'/game_info/'+id+'/'+this.type});
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: this.type,
          channel: this.myType.channel
        }});
      }
    }
	}
</script>

<style scoped lang='less'>
	.listOpen{

	}
</style>
