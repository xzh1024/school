<template>
  <div class="pay_note_manage">
    <!-- 支付单管理 -->
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="待审核">
        <WaitCheckNote v-if="activeName == '0'"/>
      </el-tab-pane>
      <el-tab-pane label="全部支付单">
        <AllPayNote v-if="activeName == '1'"/>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
import WaitCheckNote from './components/WaitCheckNote.vue'
import AllPayNote from './components/AllPayNote.vue'

export default {
  name:"payNoteManage",
  components:{
    WaitCheckNote,
    AllPayNote
  },
  data(){
    return{
      activeName:'0'
    }
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
.pay_note_manage{
  height:100%;
  padding: 0 10px;
  /deep/.el-tabs--card{
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  /deep/.el-tabs__content{
    flex:1;
    padding: 0 16px;
    .el-tab-pane{
      height:100%;
    }
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
    color: @color-link;
    background-color: #fff;
  }
}
</style>