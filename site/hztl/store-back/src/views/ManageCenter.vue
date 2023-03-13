<template>
  <div class="manage_center">
    <el-container>
      <el-aside style="max-width:140px;width:auto;">
        <Nav style="max-width:140px;width:auto;"/>
      </el-aside>
      
      <el-container >
        <el-header style="box-sizing: border-box;">
          <HeaderNav />
        </el-header>
        <el-main>
          <BreadCrumb class="bread-crumb" />
          <div class="main_content">
            <!-- <router-view /> -->
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <keep-alive>
                  <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/manageCom/HeaderNav";
import Nav from "@/components/manageCom/Nav";
import BreadCrumb from "@/components/manageCom/BreadCrumb";

export default {
  name: "ManageCenter",
  components: {
    HeaderNav,
    Nav,
    BreadCrumb
  },
  data() {
    return {
      isCollapse: true
    };
  }
};
</script>
<style lang="less" scoped>
.manage_center{
  height: 100vh;
  .el-container {
    height: 100vh;
    background-color: #f8f8f8;
    .el-header,
    .el-footer {
      background-color: #fff;
      color: #333;
      font-size: 16px;
      border-bottom: 1px solid #e6e6e6;
    }
    
    .el-aside {
      background-color: #262626;
      color: #333;
    }

    .el-main {
      background-color: #F5F5F5;
      color: #333;
      font-size: 14px;
      min-width: 800px;
      margin: 8px;
      padding: 0;
      display: flex;
      flex-direction: column;
      .bread-crumb{
        background: @bg-color-base;
      }
      .main_content {
        flex: 1;
        overflow: auto;
        background: #fff;
      }
    }
  }
  

  
}


</style>
