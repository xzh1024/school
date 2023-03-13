<!--关于我们-->
<template>
  <div class="aboutUs">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        关于我们
      </div>
      <div class="head_right"></div>
    </div>
    <div class="aboutUs_main">
      <div class="trademark">
        <img src="../../../static/img/c_icon_hezi.png" alt="185手游">
        <div class="trademark_name">185手游</div>
      </div>
      <div class="contact color_636363">
        <div class="contact_li">
          <i class="icon_ie"></i>
          <div>官方地址:http://www.185sy.com</div>
        </div>
        <div class="contact_li">
          <i class="icon_weibo"></i>
          <div>官方微博:185sy@163.com</div>
        </div>
        <div class="contact_li">
          <i class="icon_wx2"></i>
          <div>微信公众号:185sy@163.com</div>
        </div>
      </div>
    </div>
    <div class="footer center small3 color_636363">
      <div>Copyright2017-2018</div>
      <div>www.185sy.com All rights reserved</div>
    </div>
	</div>
</template>

<style scoped lang="less">
  .aboutUs{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .aboutUs_main{
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .trademark{
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 3.5rem;
          height: 3.5rem;
        }
        .trademark_name{
          height: 2rem;
          line-height: 2rem;
        }
      }
      .contact{
        .contact_li{
          margin: .5rem 2rem;
          height: 3rem;
          line-height: 3rem;
          font-size: 1rem;
          border-radius: 1.5rem;
          background-color: #f0f0f0;
          display: flex;
          /*justify-content: center;*/
          align-items: center;
          i{ margin-left: 2rem; margin-right: .5rem}
        }
      }
    }
    .footer{
      margin-bottom: .4rem;
      div{
        height: 1.4rem;
        line-height: 1.4rem;
      }
    }
  }
</style>
