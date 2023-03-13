<template>
  <div class="title">
    <span>{{titleName}}</span>
    <div class="dashed"></div>
  </div>
</template>

<script>
export default {
  props:{
    titleName:String
  }
}
</script>

<style lang="less" scoped>
.title{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dashed{
    height: 1px;
    margin: 16px;
    flex: 1;
    border-bottom: 1px dashed @border-color-base;
  }
}
</style>