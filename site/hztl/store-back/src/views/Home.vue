<template>
  <div class="home">
    <!-- 首页 -->
    
    <el-container>
      <el-header>
        <!-- <div style="display:flex;">
          <div class="menu_top_box">
            <div class="menu_title">卖家中心</div>
            <i class="el-icon-s-fold" v-if="isCollapse"></i>
            <i class="el-icon-s-unfold" v-else></i>
          </div> -->
          <HeaderNav/>
        <!-- </div> -->
        
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/manageCom/HeaderNav";

// import Nav from "@/components/manageCom/Nav'
// import BreadCrumb from "@/components/manageCom/BreadCrumb'

export default {
  name: 'Home',
  components:{
    HeaderNav,
    // Nav,
    // BreadCrumb
  },
  data(){
    return{
      isCollapse:true
    }
  },
  methods:{
    loginOut(){
      sessionStorage.removeItem('username');
      this.$router.push('/login');
    },
    isCollapseChange(data){
      this.$isCollapse = data;
      this.$store.commit('getCollapse',data);
    }
  }
  
}
</script>
<style lang="less" scoped>
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    border-bottom: 1px solid #e6e6e6;
  }
  .el-aside {
    background-color: #262626;
    color: #333;
    
  }
  .menu_top_box{
    width:240px;
    height: 60px;
    background: #262626;
    color: #fff;
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid  #e6e6e6;
    box-sizing: border-box;
    .menu_title{
      text-align: center;
      width: 164px;
    }
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    overflow: auto;
    font-size: 14px;
    min-width: 800px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>