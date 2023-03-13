<template>
<div class="header_box">
    
    <div class="version">
      <span>{{versionName}}</span>
      <el-button type="text"  style="margin-left:20px;"
        @click="switchFn" >版本切换</el-button>
    </div>
    <NavBar></NavBar>
    <HeaderUserInfo @onVersionSet="versionSetFn"/>
    <el-dialog
      title="版本设置"
      :visible.sync="switchDialog"
      width="30%"
      @close="onClose">
      <div>
        <span style="margin-right:20px;">选择版本</span>
        <el-radio-group v-model="version" size="small">
          <el-radio label="标准版" border>标准版</el-radio>
          <el-radio label="完整版" border>完整版</el-radio>
        </el-radio-group>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="onClose" >取 消</el-button>
        <el-button size="small" type="primary" @click="onSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeaderUserInfo from "./HeaderUserInfo"
import NavBar from "./NavBar"

export default {
  name:"HeaderNav",
  components:{
    HeaderUserInfo,
    NavBar
  },
  data(){
    return{
      activeIndex:'',
      menuList:[],
      switchDialog:false,
      versionName:'完整版',
      version:'',
      notices: [],
      pageData: {
        page: 1,
        totalPage: 0,
        totalSize: 0
      },
      addLoading: false,
      deleteLoading: false
    }
  },
  created(){
    this.initMenu();
    this.activeIndex = '/' + this.$route.path.split('/')[1];
  },
  methods:{
    initMenu(){
      this.menuList = [];
      let list = this.$router.options.routes;
      for(let k of list){
        if(k.path != "/" && k.path != '/login'){
          this.menuList.push(k);
        }
      }
    },
    // handleSelect(val){
    //   this.$router.push(val);
    // },
    versionSetFn(){
      this.switchFn();
    },
    switchFn(){
      this.switchDialog = true;
      this.version = this.versionName;
    },
    onClose(){
      this.switchDialog = false;
    },
    onSure(){
      this.versionName = this.version;
      this.switchDialog = false;
      this.$store.commit('setVersion',this.version);
    }
  }
}
</script>

<style lang="less" scoped>
.header_box{
  display: flex;
  // justify-content:  space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 14px;
  .version {
    flex: 1;
  }
  .header-menu {
    .icon-wrap {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon-bell, .el-icon-chat-dot-round {
        margin-right: 0;
        font-size: 22px;
        &.news-unread::after {
          content: " ";
          width: 0;
          height: 0;
          border: 3px solid red;
          border-radius: 50% 50%;
          position: absolute;
        }
      }
    }
    & > .el-menu-item {
      height: 58px;
      line-height: 58px;
      &.is-active {
        border-bottom-color: transparent;
      }
    }
  }
  a{
    text-decoration: none;
  }
  // .el-menu-item{
  //   background: #fff!important;
  // }
}
</style>