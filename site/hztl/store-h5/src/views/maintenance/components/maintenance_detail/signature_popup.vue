<template>
  <van-action-sheet v-model="showSign" title="签字确认">
  
    <div class="sign_content">
      <Signature @setSign="setSign" ref="sign"/>
    </div>
  </van-action-sheet>
</template>

<script>
  import Vue from "vue";
  import Signature from "./signature.vue";
  import { Popup,ActionSheet } from 'vant';
  Vue.use(Popup).use(ActionSheet);
  export default {
    name: "signature",
    components: {
      Signature
    },
    data () {
      return {
        showSign:false,
      }
    },
    mounted() {
      
    },
    methods: {
      show(){
        this.showSign = true;
      },
      close(){
        this.showSign = false;
      },
      setSign(data){
        this.$emit('setSign',data);
      },
    }
  }
</script>

<style scoped lang="less">
  .sign_title{
    padding:14px 0 ;
    font-size: 18px;
    font-weight: 500;
    background: #fff;
  }
  .sign_content{
    background: #fff;
  }
 
</style>