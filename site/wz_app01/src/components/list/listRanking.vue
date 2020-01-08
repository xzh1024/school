<template>
  <div class="list">
    <div class="item" v-for="(item,index) in list">
      <div class="item-left">
        <i class="icon-medal1" v-if="index === 0"></i>
        <i class="icon-medal2" v-else-if="index === 1"></i>
        <i class="icon-medal3" v-else-if="index === 2"></i>
        <span class="icon-medal" v-else>{{ index + 1 }}</span>
      </div>
      <div class="item-center">
        <div class="item-logo">
          <i class="icon-crown icon-crown1" v-if="index === 0"></i>
          <i class="icon-crown icon-crown2" v-else-if="index === 1"></i>
          <i class="icon-crown icon-crown3" v-else-if="index === 2"></i>
          <img class="item-user-logo" v-lazy="item.icon_url" v-if="item.icon_url">
          <i class="item-user-logo icon-touxiang-m" v-else></i>
        </div>
        <div class="item-content">
          <div class="item-username">{{ item.nick_name }}</div>
          <div>
            <i class="icon-membership3" v-if="item.membership == 3"></i>
            <i class="icon-membership2" v-else-if="item.membership == 2"></i>
            <i class="icon-membership1" v-else></i>
          </div>
        </div>
      </div>
      <div class="item-right">
        <span class="color_blue">{{ item.counts }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array
      },
    },
    filters: {	//自定义局部过滤器
      F_size: (size) => {//过滤显示下载量
        return size += 'M';
      },
      F_dis: (num) => {//过滤显示下载量
        return num ? num + '折' : '';
      }
    },
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: this.type,
          channel: this.myType.channel
        }});
      },
    }
  }
</script>

<style scoped lang="less">
  .item{
    display: flex;
    align-items: center;
    padding: 1em 1em 1em 0;
    border-bottom: 1px solid #f0f0f0;
    .item-left{
      width: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-medal{
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        color: #999;
        border-radius: 50%;
        border: 1px solid #cccccc;
      }
    }
    .item-center{
      flex: 1;
      display: flex;
      align-items: center;
      /*margin-left: .5em;*/
      .item-logo{
        position: relative;
        .item-user-logo{
          display: inline-block;
          width: 4rem;
          height: 4rem;
          border-radius: 50% 50%;
        }
        .icon-crown{
          display: inline-block;
          width: 2rem;
          height: 2rem;
          position: absolute;
          z-index: 1;
          right: 0;
          top: 0;
          transform: translate(-4%, -42%);
        }
      }
      .item-content{
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: .5em;
        .item-username{
          font-size: 1.1rem;
          padding-bottom: .5em;
        }
      }
    }
  }
</style>
