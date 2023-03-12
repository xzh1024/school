<template><!--游戏详情-开服-->
	<div class="infoOpen">
    <div class="o_li" v-for="v in openList.future">
      <div class="o_mes">
        <p><span v-text="$parent.infoData.gameinfo.gamename"></span>- <span v-text="v.server_id"></span> 服</p>
        <small class="color_757575">开服时间: <span v-text="v.start_time"></span></small>
      </div>
      <div class="o_not">未开服</div>
    </div>

    <div class="o_li" v-for="v in openList.past">
      <div class="o_mes">
        <p><span v-text="$parent.infoData.gameinfo.gamename"></span>- <span v-text="v.server_id"></span> 服</p>
        <small class="color_757575">开服时间: <span v-text="v.start_time"></span></small>
      </div>
      <div class="o_have">已开服</div>
    </div>
	</div>
</template>

<script>
  export default {
    props: {
      openList: {
        type: Object
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.infoOpen{
    .o_li{
      height: 3.5rem;
      padding: .8rem;
      display: flex;
      align-items: center;
      .o_mes{
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: flex-start;
      }
      .o_not{
        color: #f89d19;
        margin-right: .5rem;
        width: 4.5rem;
        padding: .2rem 0;
        text-align: center;
      }
      .o_have{
        color: #ababab;
        margin-right: .5rem;
        width: 4.5rem;
        padding: .2rem 0;
        text-align: center;
      }
    }
	}
</style>
