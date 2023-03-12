<template>
  <div id="promoter_description" :class="$store.state.paddingLeft">
    
    <div class="desc_contain">

      <div class="bg_contain">
        <h2>推广员</h2>
        <p>推广员功能承载的是裂变推广模式，客户/员工即为推广员，通过推广商品或邀请好友来获得奖励或佣金，同时商家获得更多的客户和订单，实现共赢。</p>
      </div>
      <!-- 二级裂变推广 -->
      <div class="fission_content">
        <h3 class="t_center"><span>二级裂变推广，</span>快速拓宽销售渠道</h3>
      </div>
      <!-- 功能优点 -->
      <div class="function">
        <h3 class="t_center">功能优点</h3>
        <div class="border_bottom">
          <span class="border_c2"></span>
        </div>
        <div class="fun_content">
          <div class="fun_item">
            <div class="fun_item_img">
              <img src="" alt="图1">
            </div>
            <div class="fun_remark">
              <p>拓展分销渠道，</p>
              <p>快速实现销量爆发增长</p>
            </div>
          </div>

          <div class="fun_item">
            <div class="fun_item_img">
              <img src="" alt="图2">
            </div>
            <div class="fun_remark">
              <p>适用于各种推广模式</p>
              <p>不管业务多百变，都能轻松支持</p>
            </div>
          </div>

          <div class="fun_item">
            <div class="fun_item_img">
              <img src="" alt="图3">
            </div>
            <div class="fun_remark">
              <p>超低门槛，客户即推广员</p>
              <p>人人可推广，人人可获奖金</p>
            </div>
          </div>

          <div class="fun_item">
            <div class="fun_item_img">
              <img src="" alt="图4">
            </div>
            <div class="fun_remark">
              <p>全链路追踪，自动结算分佣</p>
              <p>客户成交，系统自动核算发佣金</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 核心功能 -->
      <div class="core">
        <h3 class="t_center">核心功能</h3>
        <div class="border_bottom">
          <span class="border_c3"></span>
        </div>
        <div class="core_item">
          <div class="core_item_word">
            <div>
              <div class="core_title"> 
                <span class="core_num">01</span>
                <span>商家设置规则</span>
              </div>
              <div style="padding: 10px 0 0 36px;">
                <p>商家在推广中心打开推广招募计划</p>
                <p>设置推广参数，奖励金规则，佣金规则</p>
                <p>管理推广员、管理推广商品、查看推广业绩</p>
              </div>
              
            </div>
            
          </div>
          <div class="core_item_img">
            <img src="" alt="图1">
          </div>
        </div>

        <div class="core_item">
          <div class="core_item_img">
            <img src="" alt="图2">
          </div>
          <div class="core_item_word">
            <div>
              <div class="core_title"> 
                <span class="core_num">02</span>
                <span>推广商品</span>
              </div>
              <div style="padding: 10px 0 0 36px;">
                <p>店铺客户或员工进入推广中心申请成为推广员</p>
                <p> 分享参与推广的商品链接到微信朋友圈或微信好友</p>
                <p>朋友点击商品链接登录店铺推广员获得推广奖励金</p>
                <p>好友购买推广商品成交后推广员获得佣金提成</p>
              </div>
              
            </div>
            
          </div>
          
        </div>

        <div class="core_item">
          <div class="core_item_word">
            <div>
              <div class="core_title"> 
                <span class="core_num">03</span>
                <span>邀请好友</span>
              </div>
              <div style="padding: 10px 0 0 36px;">
                <p> 店铺老推广员在推广中心分享邀请好友的链接或名片到微信朋友圈或微信好友，</p>
                <p> 朋友点击邀请好友的链接登录店铺申请为推广员，老推广员做为邀请人获得邀请奖励金</p>
                <p>新推广员向朋友推广商品成交后，新推广员和老推广员都将获得佣金提成</p>
              </div>
              
            </div>
            
          </div>
          <div class="core_item_img">
            <img src="" alt="图3">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
    
  },
  name: "promoter_description",
  data() {
    return {
      activeName: "first",
      theme: ""
    };
  },
  created() {
    this.theme = window.theme;
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>
<style lang="less" scoped>
#promoter_description {
  
  background: #ffffff;
  overflow: auto;
  .desc_contain{
    font-size: 14px;
    height: calc(100vh - 134px);
    overflow: auto;
    .bg_contain{
      width: 100%;
      height: 400px;
      padding: 20px;
      background: #00a8ea;
      color:#ffffff;
      box-sizing: border-box;
      p{
        font-size: 18px;
      }
    }
    .fission_content{
      background: #ffffff;
      width: 1000px;
      height:400px;
      border-radius: 20px;
      padding:10px;
      margin:-200px auto 0;
      .content_title{
        text-align: center;
      }
    }
    .function{
      margin:50px 0;
    }
    .fun_content{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .fun_item{
        border: 1px solid #f00;
        width:300px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .fun_item_img{
          width:100%;
          height:200px;
          border: 1px solid green;
          img{
            width:100%;
            height:100%;
          }
        }
        .fun_remark{
          text-align: center;
        }
      }
    }
    .core_item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 60px;
      .core_item_word{
        display: flex;
        justify-content: center;
        align-items: center;
        width:600px;
        height:400px;
        border: 1px solid blue;
        .core_title{
          font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC';
          font-weight: 500;
          font-size: 20px;
          text-decoration: none;
          color: #F6922B;
          .core_num{
            font-size: 28px;
          }
        }
      }
      .core_item_img{
        width:600px;
        height:400px;
        border: 1px solid pink;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width:500px;
          height:338px;
          border: 1px solid blue;
        }
      }
    }
    .border_bottom{
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      span{
        width: 50px;
        height: 10px;
      }
      .border_c1{
        border-bottom: 2px solid #00a8ea;
      }
      .border_c2{
        border-bottom: 2px solid #00a8ea;
      }
      .border_c3{
        border-bottom: 2px solid #00a8ea;
      }
    }
  }
  
  .t_center{
    text-align: center;
  }
}

</style>


