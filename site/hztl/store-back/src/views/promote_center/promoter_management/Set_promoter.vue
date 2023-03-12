<template>
  <div class="promoter_set">

    <!-- 推广员招募计划 -->
    <div class="set_plan">
      <h2 class="set_title">推广员招募计划</h2>
      <div class="set_item">
        <div class="set_item_label">推广员招募</div>
        <el-radio-group v-model="planObj.recruitment" class="padding_item">
          <el-radio label="开启"></el-radio>
          <el-radio label="关闭"></el-radio>
        </el-radio-group>
        <div class="set_item_remark">开启招募：推广员招募页底部按钮文案为【申请成为推广员】按钮高亮且可点击；关闭招募：则推广员招募页底部按钮文案为【暂停招募】置灰且不可点击</div>
      </div>  
      
      <div class="set_item">
        <div class="set_item_label">推广员维度</div>
        <el-radio-group v-model="planObj.dimension" class="padding_item">
          <el-radio label="按公司"></el-radio>
          <el-radio label="按个人"></el-radio>
        </el-radio-group>
        <div class="set_item_remark">按公司：以公司为维度来记录推广数据，推广员的客户和推广员的下级若为企业用户则均是统计公司数量而不是公司下的员工数；按个人：以个人为维度来记录推广数据，推广员的客户和推广员的下级若为企业则均是统计用户数量而不是按公司来统计</div>
      </div>  

      <div class="set_item">
        <div class="set_item_label">推广员审核</div>
        <el-radio-group v-model="planObj.review" class="padding_item">
          <el-radio label="手动审核"></el-radio>
          <el-radio label="自动审核"></el-radio>
        </el-radio-group>
        <div class="set_item_remark">手动审核：则需商家手动审核通过；自动审核：发起申请后系统直接审核通过</div>
      </div>  

      <div class="set_item">
        <div class="set_item_label">邀请好友</div>
        <el-radio-group v-model="planObj.invite_friend" class="padding_item">
          <el-radio label="开启"></el-radio>
          <el-radio label="关闭"></el-radio>
        </el-radio-group>
        <div class="set_item_remark">开启：在推广员的推广中心可分享邀请链接给好友；关闭：不可分享邀请链接给好友，且之前分享的链接也会失效</div>
      </div> 

      <div class="set_item">
        <div class="set_item_label">发布推广员公告</div>
        <div class="padding_item" style="width:1000px;">
          <el-input
            type="text"
            placeholder=""
            v-model="planObj.announcements"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="set_item_remark">将滚动展示在推广员的推广中心页面</div>
      </div>
    </div>
    <!-- 奖励金发放设置 -->
    <div class="set_reward">
      <h2 class="set_title">奖励金发放设置</h2>

      <div class="set_item">
        <div class="set_item_label">推广商品奖励</div>
        <div class="sets_content">
          <div class="sets_row">
            <el-radio-group v-model="rewardObj.goods.isOpen" class="padding_item">
              <el-radio label="开启"></el-radio>
              <el-radio label="关闭"></el-radio>
            </el-radio-group>
            <span class="set_item_remark">开启：同一个推广员分享的同一个推广商品链接被同一个客户在保护期内点击无论多少次都只算1次；关闭：无奖励金</span>
          </div>
          <div class="sets_row padding_item">
            <span>分享推广活动链接且被点击一次获得</span>
            <el-input v-model="rewardObj.goods.funds" style="width:80px;margin:0 10px;" placeholder=""></el-input>
            <span>元</span>
          </div>
          <div class="sets_row " >
            <el-radio-group v-model="rewardObj.goods.period" class="padding_item">
              <el-radio label="1">
                链接保护期为
                <el-input v-model="rewardObj.goods.days" 
                :disabled="rewardObj.goods.period != '1'" style="width:80px;margin:0 10px;" placeholder=""></el-input>
                天
              </el-radio>
              <el-radio label="2">永久有效</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>  

      <!-- <div class="set_item">
        <div class="set_item_label">推广活动奖励</div>
        <div class="sets_content">
          <div class="sets_row">
            <el-radio-group v-model="rewardObj.awards.isOpen" class="padding_item">
              <el-radio label="开启"></el-radio>
              <el-radio label="关闭"></el-radio>
            </el-radio-group>
            <span class="set_item_remark">开启：同一个推广员分享的同一个活动链接被同一个客户在保护期内点击无论多少次都只算1次；关闭：无奖励金</span>
          </div>
          <div class="sets_row padding_item">
            <span>分享推广活动链接且被点击一次获得</span>
            <el-input v-model="rewardObj.awards.funds" style="width:80px;margin:0 10px;" placeholder=""></el-input>
            <span>元</span>
          </div>
          <div class="sets_row " >
            <el-radio-group v-model="rewardObj.awards.period" class="padding_item">
              <el-radio label="1">
                链接保护期为
                <el-input v-model="rewardObj.awards.days" 
                :disabled="rewardObj.awards.period != '1'" style="width:80px;margin:0 10px;" placeholder=""></el-input>
                天
              </el-radio>
              <el-radio label="2">永久有效</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>   -->

      <div class="set_item">
        <div class="set_item_label">邀请好友奖励</div>
        <div class="sets_content">
          <div class="sets_row">
            <el-radio-group v-model="rewardObj.inviting.isOpen" class="padding_item">
              <el-radio label="开启"></el-radio>
              <el-radio label="关闭"></el-radio>
            </el-radio-group>
            <span class="set_item_remark">开启：同一个推广员分享的邀请好友链接被同一个用户在保护期内点击无论多少次都只算1次；关闭：无奖励金</span>
          </div>
          <div class="sets_row padding_item">
            <span>分享推广活动链接且被点击一次获得</span>
            <el-input v-model="rewardObj.inviting.funds" style="width:80px;margin:0 10px;" placeholder=""></el-input>
            <span>元</span>
          </div>
          <div class="sets_row " >
            <el-radio-group v-model="rewardObj.inviting.period" class="padding_item">
              <el-radio label="1">
                链接保护期为
                <el-input v-model="rewardObj.inviting.days" 
                :disabled="rewardObj.inviting.period != '1'" style="width:80px;margin:0 10px;" placeholder=""></el-input>
                天
              </el-radio>
              <el-radio label="2">永久有效</el-radio>
            </el-radio-group>
          </div>
          <div class="sets_row padding_item">
            <span>邀请好友成为推广员获得</span>
            <el-input v-model="rewardObj.inviting.money" style="width:80px;margin:0 10px;" placeholder=""></el-input>
            <span>元</span>
          </div>
        </div>
      </div> 

    </div>
    <!-- 佣金发放设置 -->
    <div class="set_commission">
      <h2 class="set_title">
        佣金发放设置
        <span class="set_remark padding_item">佣金发放的前提是推广员推广的商品有客户成交，基于成交的金额来计算出各级推广人应得的佣金金额，再按照佣金发放时间系统紫宗将佣金下发到个推广员的余额账户</span>
      </h2>

      <div class="set_item">
        <div class="set_item_label">佣金发放</div>
        <el-radio-group v-model="commissionObj.isOpen" class="padding_item">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
        <div class="set_item_remark">开启：按下列设置进行佣金发放；关闭：关闭后成交的订单不在计算佣金</div>
      </div> 

      <div class="set_item">
        <div class="set_item_label">佣金级别</div>
        <el-radio-group v-model="commissionObj.level" class="padding_item">
          <el-radio label="1">1级</el-radio>
          <el-radio label="2">2级</el-radio>
        </el-radio-group>
        <div class="set_item_remark">设置的不同佣金级别对应的佣金情况不同，举例举例：推广员A的客户成交后，1级：仅推广员A获得佣金；2级：推广员A和推广员A的上级获得佣金</div>
      </div> 

      <div class="set_item">
        <div class="set_item_label">佣金计算</div>
        <div class="sets_content">
          
          <div class="set_row padding_item">
            <span>佣金占推广商品成交金额</span>
            <el-input v-model="commissionObj.calculate.percent1" style="width:80px;margin:0 10px;" placeholder=""></el-input>
            <span>%</span>
            <span class="set_remark padding_item" >风险提示：佣金占推广商品成交金额的比例太大可能会造成佣金亏损</span>
          </div>
          <div class="set_row padding_item" style="margin: 10px 0 0;">
            <span>上级获得下级佣金的比例</span>
            <el-input v-model="commissionObj.calculate.percent2" style="width:80px;margin:0 10px;" placeholder=""></el-input>
            <span>%</span>
            <span class="set_remark padding_item" style="max-width: 1000px;" >举例：现有关系链：推广员A->推广员B->推广员C；设置的佣金级别为3，佣金占推广商品成交金额的20%、二级推广员佣金占直接推广员佣金的10%、一级推广员佣金占二级推广员佣金的10%；若C的客户成交一笔订单其中推广商品成交金额为10000元，则佣金发放情况如下：推广员C实际获得佣金1000元；推广员B实际获得佣金500元；推广员C实际获得佣金500</span>
          </div>
        </div>
      </div>  

      <div class="set_item" >
        <div class="set_item_label">佣金发放时间</div>
        <div class="sets_content">
          <div class="sets_row">
            <el-radio-group v-model="commissionObj.publishTime" class="padding_item">
              <div style="margin-bottom:10px;">
                <el-radio label="1">订单完成后发放
                  <span class="set_item_remark padding_item">订单状态为完成时自动向推广员发放佣金到余额</span>
                </el-radio>
              </div>
              <div>
                <el-radio label="2">
                  订单完成
                  <el-input v-model="commissionObj.days" 
                  :disabled="commissionObj.publishTime != '2'" 
                  style="width:80px;margin:0 10px;" placeholder=""></el-input>
                  天后发放
                  <span class="set_item_remark padding_item">订单状态为完成N天后自动向推广员发放佣金到余额</span>
                </el-radio>
              </div>
              
            </el-radio-group>
          </div>
          
        </div>
      </div> 

    </div>
    <div class="remind">
      <span>风险提醒：若您选择订单完成后发放，则发放后客户退款或退货可能会造成佣金亏损</span>
    </div>
    <div class="save_btn" style="text-align:center;">
        <el-button type="primary" style="width:160px;height:32px;" @click="onSubmit">保存</el-button>
    </div>
  
  </div>
</template>

<script>
export default {
  data(){
    return{
      planObj: {
        recruitment: '',
        dimension: '按个人',
        review: '手动审核',
        invite_friend: '开启',
        announcements: '',
      },
      rewardObj:{
        goods:{
          isOpen:'关闭',
          funds:'0.1',
          period:'1',
          days:'3'//链接有效期
        },
        awards:{
          isOpen:'关闭',
          funds:'0.1',
          period:'1',
          days:'3'//链接有效期
        },
        inviting:{
          isOpen:'关闭',
          funds:'0.1',
          period:'1',
          days:'3',//链接有效期
          money:'5'
        }
      },
      commissionObj:{
        isOpen:'1',//佣金发放
        level:'2',//佣金级别
        calculate:{//佣金计算
          percent1:'20',
          percent2:'50',
        },
        publishTime:'2',//发放时间
        days:'7'//订单完成后 5 天发放
      }
    }
  },
  mounted(){

  },
  methods:{
    onSubmit() {
      let form = {
        ...this.planObj,
        ...this.rewardObj,
        ...this.commissionObj,
      }
      console.log('submit!',form);
    }
  }
}
</script>

<style lang="less" scoped>
.promoter_set{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  line-height: 22px;
  .set_plan,.set_reward{
    margin-bottom: 48px;
  }
  .set_commission{
    margin-bottom: 30px;
  }
  .set_title{
    font-family: PingFangSC-Medium;
    font-size: 14px;
  }
  .set_item{
    display: flex;
    margin: 20px 0;
    .set_item_label{
      width:104px;
      text-align: right;
    }
    
    .set_item_remark{
      max-width: 1000px;
      color: #999999;
    }
    .set_row,.sets_row{
      display: flex;
      margin:10px 0;
    }
    .sets_row{
      align-items: center;
    }
    .set_row:first-child,.sets_row:first-child{
      margin:0;
    }
  }
  /deep/.el-radio-group{
    margin-top: 4px;
  }
  /deep/.el-radio{
    margin-bottom: 0;
    color: #333333;
  }
  .remind{
    color: #FA8C16;
    padding: 0 20px;
  }
  .padding_item{
    padding:0 20px;
  }
  .set_remark{
    color: #999999;
  }
  /deep/.el-button{
    line-height: 0;
  }
  .save_btn{
    text-align: center;
    padding: 20px;
  }
}
</style>