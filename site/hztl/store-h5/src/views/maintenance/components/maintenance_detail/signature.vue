<template>
  <div class="sign">
    <div class="canvas_box" style="" ref="canvasBox">
      <canvas class="canvasId"/>
      <span v-show="showSignLabel" class="sign_label1">手写电子签名</span>
      <span v-show="showSignLabel" class="sign_label2">请书写姓名全称，并保持字迹清晰</span>
      <img src="@/assets/maintenance/撤回nor@3x.png" 
        alt="" class="clearImg" @click="clear">
    </div>
    <div class="btnBox">
      <van-button round 
      class="button" @click="save">提交</van-button>
    </div>
  </div>
</template>

<script>
  import SignaturePad from 'signature_pad';
  import {Button,Notify} from 'vant'
  export default {
    name: "signature",
    components: {
      [Button.name]:Button,
      [Notify.Component.name]: Notify.Component,
    },
    data () {
      return {
        SignaturePad:null,
        config:{
          penColor: "#000000",   //笔刷颜色
          backgroundColor: 'rgb(244, 244, 244)',
          minWidth:1,       //最小宽度
        },
        showSignLabel:true
      }
    },
    mounted() {
      
      this.getCanvas()
    },
    methods: {
      begin(){
        this.showSignLabel = false;
      },
      getCanvas() {
        var canvas = document.querySelector('.canvasId');

        this.signaturePad = new SignaturePad(canvas, this.config);
        canvas.height = this.$refs.canvasBox.clientWidth*9/22;
        canvas.width = this.$refs.canvasBox.clientWidth;
        //清除画布内容
        this.signaturePad.clear();
        // 添加事件,默认为所有,和 off()相反
        this.signaturePad.onBegin = this.begin;

      },
      //保存
      save(){
        //默认保存为png格式
        if(this.signaturePad.isEmpty()){
          Notify({ type: 'danger', message: '电子签名不能为空' });
        }else{
          this.$emit('setSign',this.signaturePad.toDataURL());
        }

      },
      //清除
      clear() {
        //清除画布内容
        this.signaturePad.clear();
      },
    }
  }
</script>

<style scoped lang="less">
  .canvas_box{
    margin:12px;
    box-sizing: border-box;
    border: 1px solid #eee;
    position: relative;
  }
  .sign_label1{
    position: absolute;
    top:20px;
    left:133px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    font-weight: 400;
  }
  .sign_label2{
    position: absolute;
    top:80px;
    left:85px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    font-weight: 400;
  }
  .clearImg{
    position: absolute;
    width:22px;
    height:22px;
    bottom: 12px;
    right: 12px;
  }
  .btnBox {
    padding: 7px 12px;
    text-align: center;
    .button{
      width: 100%;
      height: 36px;
      background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
      border-radius: 18px;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 500;
    }
  }
</style>