<template>
    <el-popover
      placement="bottom"
      width="500"
      class="color_select"
      trigger="click"
      :title="title"
      v-model="colorVisible">
      <div class="body">
        <template v-for="(item,index) in colorList">
          <div :class="['bg_div',item.selected?'selected':'',item.used?'used':'']" 
            :style="{background:item.color,border:`1px solid ${item.color}`}"
            :key="index"
            @click="itemClick(item,index)"></div>
        </template>
      </div>
      <div style="text-align: right; margin-top:8px; ">
        <el-button size="small"  @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="sure">确定</el-button>
      </div>
      <div slot="reference"
        class="bg_div margin_a" :style="{background:selectColor,border:`1px solid ${selectColor}`}"
        ></div>
    </el-popover>
</template>

<script>
import { MemberGradeApi } from '../services'
const memberGradeApi = new MemberGradeApi();
export default {
  name:"colorList",
  data(){
    return{
      // colorList:[
      //   {color:'#FF4D4F',selected:false},
      //   {color:'#389E0D',selected:false},
      //   {color:'#FA8C16',selected:false},
      //   {color:'#6589F8',selected:false},
      //   {color:'#333333',selected:false},
      //   {color:'#666666',selected:false},
      //   {color:'#999999',selected:false},
      //   {color:'#BABABA',selected:false},
      // ],
      title:"选择等级背景",
      colorVisible:false,
      selectColor:"#FA8C16"
    }
  },
  props:{
    bgColor:String,
    colorList:Array
  },
  watch:{
    bgColor(){
      this.init();
    },
    colorList(){
      this.init();
    },
  },
  mounted(){
    this.init();
  },
  methods:{
    
    init(){
      let _this = this;
      _this.selectColor = _this.bgColor;
      _this.colorList.forEach((p,i) =>{
        if(_this.bgColor == p.color){
          p.selected = true;
          p.used = false;
        }else{
          p.selected = false;
        }
      })
    },
    itemClick(item,index){
      let _this = this;
      if(item.used)return;
      _this.colorList.forEach((p,i) =>{
        if(index == i){
          p.selected = true;
          _this.selectColor = p.color;
        }else{
          p.selected = false;
        }
      })
    },
    cancel(){
      this.selectColor = this.bgColor;
      this.colorVisible = false;
    },
    sure(){
      this.colorVisible = false;
      this.$emit('change',this.selectColor);
    },
  }
}
</script>

<style lang="less" scoped>
  .body{
    display: flex;
    flex-wrap: wrap;
  }
  .bg_div{
    width:60px;
    height:20px;
    margin: 8px;
    border: 1px solid @border-color-base;
    &:hover{
      // box-shadow: 0px 2px 7px 3px #FF4D4F;
      box-shadow: inset 0px 0px 2px 2px #ffffff;
    }
    &:active{
      box-shadow: inset 0px 0px 2px 3px #ffffff;
    }
  }
  .margin_a{
    margin:auto;
  }
  .selected{
    // border: 1px solid  @border-color-base;
    box-shadow: inset 0px 0px 2px 3px #ffffff;
  }
  .used{
    opacity: .5;
    cursor: not-allowed;
  }
</style>