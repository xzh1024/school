<template>
  <div class="error">
    <div class="err_box">
      <p class="title_404">404</p>
      <p class="err_desc1">抱歉，你访问的页面出错了</p>
      <p class="err_desc">你可能输错了网址，或该网页已删除</p>
    </div>
  </div>
</template>

<style lang='less' scoped>
.error{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items:center;
    .err_box{
      text-align: center;
      font-size: 14px;
    }
    .title_404{
      font-size: 60px;
      color: #999;
    }
    .err_desc1{
      font-size: 30px;
      font-weight:500;
      color: #333;
    }
    .err_desc{
      margin-top: 20px;
    }
}
</style>