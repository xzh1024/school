<template>
  <div id="promoter_management" :class="$store.state.paddingLeft">
    
    <div class="description">
      <span><i class="el-icon-warning"></i>推广员：通过招募老客户或员工加入推广队伍，并在推广成功后给予一定的奖励，以此给店铺带来更多的传播实现客户增长提升销量，点这里教你如何玩转推广员功能</span>
      <a  @click="toLookDesc">点击查看玩法</a>
      <!-- <el-button type="danger" size="mini" style="margin-left:20px;" round @click="toLookDesc">点击查看玩法<i class="el-icon-arrow-right el-icon--right"></i></el-button> -->
    </div>
    <el-tabs v-model="activeName" type="card" :class="[theme]" @tab-click="handleClick">
      <el-tab-pane label="待审核推广员" name="first">
        <ReviewedPromoter/>
      </el-tab-pane>
      <el-tab-pane label="推广员管理" name="second">
        <ManagePromoter/>
      </el-tab-pane>
      <el-tab-pane label="设置" name="third">
        <SetPromoter/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ReviewedPromoter from './promoter_management/Reviewed_promoter'
import ManagePromoter from './promoter_management/Manage_promoter'
import SetPromoter from './promoter_management/Set_promoter'
export default {
  components: {
    ReviewedPromoter,
    ManagePromoter,
    SetPromoter
  },
  name: "promoter_management",
  data() {
    return {
      activeName: "first",
      theme: ""
    };
  },
  created() {
    this.theme = window.theme;
  },
  methods: {
    handleClick(tab, event) {},
    toLookDesc(){
      window.location.replace('#/promoter_description');
      // this.$router.push('promoter_description');
    }
  }
};
</script>
<style lang="less" scoped>
#promoter_management {
  padding-right: 20px;
  text-align: left;
  background: #ffffff;
  overflow: auto;
  .description{
    // width: 99%;
    padding: 0 16px;
    margin:10px 0;
    // background: linear-gradient(270deg,
    //  rgba(251, 223, 184, 1) 0%,
    //  rgba(248, 198, 126, 1) 100%);
    // border: none;
    // border-radius: 637px;
    background: #FAEEE1;
    border: 1px solid #FA8C16;
    border-radius: 2px;
    height: 40px;
    line-height: 40px;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-size: 14px;
    color: #FA8C16;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
        color: #6589F8;
        text-decoration: underline;
        cursor: pointer;
    }
  }
}
/deep/.el-tabs__content{
  font-size: 14px;
  height: calc(100vh - 232px);
  overflow: auto;
}

</style>


