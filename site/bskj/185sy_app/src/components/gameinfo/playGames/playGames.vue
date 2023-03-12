<template><!--游戏详情-详情-->
  <div class="playGames">
    <!--<iframe v-if="url" :src="url" frameborder="0" name="h5Game" id="h5Game" class="h5Game" ref="h5Game"></iframe>-->
    <iframe src="../../../../static/demo.html" frameborder="0" name="h5Game" id="h5Game" class="h5Game" ref="h5Game"></iframe>
    <div v-show="userSwitch == 'icon'" @click="userSwitch = 'box'">
      <img src="../../../static/img/22_ic_sdk_fubiao.png" id="floatIcon" v-onDrag>
    </div>
    <transition name="fade">
      <div class="screen" v-show="userSwitch == 'box'" @click.self="userSwitch = 'icon'">
      <div class="h5_box user">
        <div class="h5_main user_main">
          <div class="user_account" v-show="pick == 'user'">
            <div class="user_account_top">
              <img src="../../../static/img/18_ic_dltx.png" class="user_logo">
              <span class="user_name">ID:{{ userData.username }}</span>
              <div class="user_coin">
                <i class="icon_ptb"></i>
                <span>平台币:</span>
                <span>{{ userData.platform_money }}</span>
                <span>个</span>
              </div>
              <i class="h5_icon_set" @click.once="options.once = false;" @click="showOptions"></i>
            </div>
            <div class="user_account_bottom">
              <div class="user_account_bottom_li" @click.once="payRank.once = false;" @click="showPayRank">
                <div class="user_account_bottom_li_icon"><i class="h5_icon_record"></i></div>
                <span>充值记录</span>
              </div>
              <div class="user_account_bottom_li" @click.once="activity.once = false;" @click="showActivity">
                <div class="user_account_bottom_li_icon"><i class="h5_icon_notice"></i></div>
                <span>活动</span>
              </div>
              <div class="user_account_bottom_li" @click.once="questionList.once = false;" @click="showQuestionList">
                <div class="user_account_bottom_li_icon"><i class="h5_icon_mail"></i></div>
                <span>问题反馈</span>
              </div>
            </div>
          </div>
          <div class="user_gift small2" v-if="!gift.once" v-show="pick == 'gift'">
            <div class="no_gift" v-if="!gift.data.length"></div>
            <div class="gift_list"
                 v-infinite-scroll="getGift"
                 infinite-scroll-disabled="gift.loading"
                 infinite-scroll-distance="3">
              <!--<div class="gift_li">-->
              <!--<div class="gift_li_left"></div>-->
              <!--<div class="gift_li_center flex1 m_l2">-->
              <!--<span style="line-height: 1rem;">充值返利礼包</span>-->
              <!--<span class="gift_surplus">-->
              <!--<i></i>-->
              <!--</span>-->
              <!--</div>-->
              <!--<div class="gift_li_right">领取</div>-->
              <!--</div>-->
              <div class="gift_li" v-for="(v,i) in gift.data">
                <div class="gift_li_left"></div>
                <div class="gift_li_center flex1 m_l2">
                  <span class="gift_name">{{ v.pack_name }}</span>
                  <span class="gift_surplus">
                  <i :style="{width:v.pack_residual+'%'}"></i>
                </span>
                </div>
                <div class="gift_li_right" v-if="v.card"
                     v-clipboard:copy="v.card"
                     v-clipboard:success.stop="onCopy"
                     v-clipboard:error.stop="onError">复制</div>
                <div class="gift_li_right" v-else @click.stop="getCard(v.id, i)">领取</div>
              </div>
              <!--加载动画-->
              <div v-show="gift.loading">
                <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
              </div>
            </div>
          </div>
        </div>
        <div class="user_footer">
          <div class="user_footer_li" @click="pick = 'user'">
            <div v-show="pick != 'user'">
              <div class="user_footer_li_icon"><i class="h5_icon_user"></i></div>
              <div>账号</div>
            </div>
            <div v-show="pick == 'user'">
              <div class="user_footer_li_icon"><i class="h5_icon_user_on"></i></div>
              <div class="color_green">账号</div>
            </div>
          </div>
          <div class="user_footer_li" @click.once="gift.once = false;" @click="pick = 'gift'">
            <div v-show="pick != 'gift'">
              <div class="user_footer_li_icon"><div class="h5_icon_gift"></div></div>
              <div>礼包</div>
            </div>
            <div v-show="pick == 'gift'">
              <div class="user_footer_li_icon"><div class="h5_icon_gift_on"></div></div>
              <div class="color_green">礼包</div>
            </div>
          </div>
          <div class="user_footer_li" @click="$router.go(-1)">
            <div class="user_footer_li_icon"><div class="h5_icon_back"></div></div>
            <div>注销</div>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!pay.once" v-show="pay.switch">
      <div class="pay">
        <!--<img src="../../../static/img/ic_close.png" alt="x" class="h5_icon_x" @click="pay.switch = false">-->
        <i class="h5_icon_x" @click="pay.switch = false"></i>
        <div class="pay_left">
          <div class="pay_type border_dcdcdc" @click="pay.name='zfb';" v-bind:class="{bg_e0e0e0:pay.name == 'zfb'}">
            <div class="pay_icon">
              <i class="icon_zfb"></i>
            </div>
            <div class="pay_name">支付宝</div>
          </div>
          <div class="pay_type border_dcdcdc" @click="pay.name='wx';" v-bind:class="{bg_e0e0e0:pay.name == 'wx'}">
            <div class="pay_icon">
              <i class="icon_wx"></i>
            </div>
            <div class="pay_name">微信</div>
          </div>
          <div class="pay_type border_dcdcdc" @click="pay.name='czk';" v-bind:class="{bg_e0e0e0:pay.name == 'czk'}">
            <div class="pay_icon">
              <i class="icon_czk"></i>
            </div>
            <div class="pay_name">充值卡</div>
          </div>
          <div class="pay_type" @click="pay.name='ptb';" v-bind:class="{bg_e0e0e0:pay.name == 'ptb'}">
            <div class="pay_icon">
              <i class="icon_ptb"></i>
            </div>
            <div class="pay_name">平台币</div>
          </div>
        </div>
        <div class="pay_right">
          <div class="pay_box pay_box1" v-show="pay.name == 'zfb'">
            <div class="pay_msg">
              <div class="f_s"><span>充值账号:</span><span>{{ userInfo.username }}</span></div>
              <div class="f_s m_t_1rem"><span>充值金额:</span><span class="color_red">{{ pay.payInfo.price }}</span><span>元</span></div>
            </div>
            <div>
              <span class="btn_01" @click="payReady({
              payType: 2,  //支付方式：1支付宝扫码 2支付宝手机 3微信扫码 4微信手机 5财付通网页版 保留值,现在不使用 6财付通手机版 7移动充值卡 8电信充值卡 9联通充值卡 10平台币
              payMode: 1,  //充值类型：1正常充值 2GM权限充值
              cardID: '',  //充值卡号(可选)：支付方式选择7、8、9
              cardPass: '',  //充值密码(可选)：支付方式选择7、8、9
              cardMoney: ''  //充值卡金额(可选)：支付方式选择7、8、9，必须整数
              })">支付宝支付</span>
              <span class="btn_02 m_l3" @click="payReady({
              payType: 1,
              payMode: 1,
              cardID: '',
              cardPass: '',
              cardMoney: ''})">扫码支付</span>
            </div>
          </div>
          <div class="pay_box pay_box1" v-show="pay.name == 'wx'">
            <div class="pay_msg">
              <div class="f_s"><span>充值账号:</span><span>{{ userInfo.username }}</span></div>
              <div class="f_s m_t_1rem"><span>充值金额:</span><span class="color_red">{{ pay.payInfo.price }}</span><span>元</span></div>
            </div>
            <div>
              <span class="btn_01" @click="payReady({
              payType: 4,
              payMode: 1,
              cardID: '',
              cardPass: '',
              cardMoney: ''})">微信支付</span>
              <!--<span class="btn_02 m_l3" @click="payReady({-->
              <span class="btn_02 m_l3" @click="payReady({
              payType: 3,
              payMode: 1,
              cardID: '',
              cardPass: '',
              cardMoney: ''})">扫码支付</span>
            </div>
          </div>
          <div class="pay_box" v-show="pay.name == 'czk'">
            <div class="pay_box_btns">
              <div class="btn_03" :class="{btn_03_on:cardPay.payType == 7}" @click="cardPay.payType = 7;cardPay.cardMoney = 10;">中国移动</div>
              <div class="btn_03" :class="{btn_03_on:cardPay.payType == 9}" @click="cardPay.payType = 9;cardPay.cardMoney = 10;">中国联通</div>
              <div class="btn_03" :class="{btn_03_on:cardPay.payType == 8}" @click="cardPay.payType = 8;cardPay.cardMoney = 10;">中国电信</div>
            </div>
            <div><span>充值账号:</span><span>{{ userInfo.username }}</span></div>
            <div><span>充值金额:</span><span class="color_red">{{ pay.payInfo.price }}</span><span>元</span></div>
            <div class="color_888888">充值面额:</div>
            <div class="pay_sums">
              <span :class="{pay_sum_on:cardPay.cardMoney == 10}" @click="cardPay.cardMoney = 10;">10</span>
              <span :class="{pay_sum_on:cardPay.cardMoney == 20}" @click="cardPay.cardMoney = 20;">20</span>
              <span :class="{pay_sum_on:cardPay.cardMoney == 30}" @click="cardPay.cardMoney = 30;">30</span>
              <span :class="{pay_sum_on:cardPay.cardMoney == 50}" @click="cardPay.cardMoney = 50;">50</span>
            </div>
            <div class="pay_sums">
              <span :class="{pay_sum_on:cardPay.cardMoney == 100}" @click="cardPay.cardMoney = 100;">100</span>
              <span :class="{pay_sum_on:cardPay.cardMoney == 200}" @click="cardPay.cardMoney = 200;">200</span>
              <span :class="{pay_sum_on:cardPay.cardMoney == 300}" @click="cardPay.cardMoney = 300;">300</span>
              <span :class="{pay_sum_on:cardPay.cardMoney == 500}" @click="cardPay.cardMoney = 500;" v-show="cardPay.payType != '8'">500</span>
            </div>
            <div class="pay_inputs">
              <div class="pay_input"><input type="text" v-model="cardPay.cardID" placeholder="充值卡号:"/></div>
              <div class="pay_input"><input type="text" v-model="cardPay.cardPass" placeholder="充值卡密码:"/></div>
              <div class="btn_05" @click="goCardPay">立即充值</div>
            </div>
          </div>
          <div class="pay_box pay_box1" v-show="pay.name == 'ptb'">
            <div class="pay_msg">
              <div class="f_s"><span>您的平台币:</span><span>{{ userInfo.platform_money }}个</span></div>
              <div class="color_red">温馨提示:10个平台币兑换1元</div>
              <div class="f_s m_t_1rem"><span>充值账号:</span><span>{{ userInfo.username }}</span></div>
              <div class="f_s m_t_0_5rem"><span>充值金额:</span><span class="color_red">{{ pay.payInfo.price }}</span><span>元</span></div>
            </div>
            <div>
              <span class="btn_04" v-show="userInfo.platform_money/10 < pay.payInfo.price">平台币不足</span>
              <span class="btn_04_on" v-show="userInfo.platform_money/10 >= pay.payInfo.price" @click="payReady({
              payType: 10,
              payMode: 1,
              cardID: '',
              cardPass: '',
              cardMoney: ''})">平台币支付</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!payRank.once"  v-show="payRank.switch">
      <div class="h5_box pay_rank">
        <i class="h5_icon_x" @click="hidePayRank"></i>
        <div class="h5_title">
          <span class="h5_title_left" @click="$router.push({path:'/rebate'})">申请返利</span>
          <span>充值记录</span>
        </div>
        <div class="h5_main small2"
             v-infinite-scroll="getPayRank"
             infinite-scroll-disabled="payRank.loading"
             infinite-scroll-distance="3">
          <div class="h5_tr">
            <div class="h5_td flex1 strong">充值时间</div>
            <div class="h5_td flex1 strong border_l_dbdbdd">充值金额</div>
            <div class="h5_td flex1 strong border_l_dbdbdd">充值状态</div>
          </div>
          <div class="h5_tr" v-for="v in payRank.data">
            <div class="h5_td flex1">{{ v.create_time }}</div>
            <div class="h5_td flex1 border_l_dbdbdd">{{ v.money }}</div>
            <div class="h5_td flex1 border_l_dbdbdd">{{ v.status|F_status }}</div>
          </div>
          <!--加载动画-->
          <div v-show="payRank.loading">
            <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!activity.once" v-show="activity.switch">
      <div class="h5_box activity">
        <i class="h5_icon_x" @click="hideActivity"></i>
        <div class="h5_title">
          活动
        </div>
        <div class="h5_main"
             v-infinite-scroll="getActivity"
             infinite-scroll-disabled="activity.loading"
             infinite-scroll-distance="3">
          <div class="h5_li" v-for="v in activity.data" @click="getActivityInfo(v.id)">
            <span class="h5_li_title">{{ v.title }}</span>
            <i class="icon_clock"></i>
          </div>
          <!--加载动画-->
          <div v-show="activity.loading">
            <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!activityInfo.once" v-show="activityInfo.switch">
      <div class="h5_box activity_info">
        <i class="h5_icon_x" @click="hideActivityInfo"></i>
        <div class="h5_title">活动</div>
        <div class="h5_main">
          <div class="activity_info_title f_s1 center m_t_0_5rem">{{ activityInfo.data.title }}</div>
          <div class="small2 center m_t_0_5rem">{{ activityInfo.data.add_time }}</div>
          <div class="m_t_0_5rem">{{ activityInfo.data.desc }}</div>
          <div class="small2 m_t_0_5rem" style="white-space: pre-line;">{{ activityInfo.data.content }}</div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!questionList.once" v-show="questionList.switch">
        <div class="h5_box question_list">
          <i class="h5_icon_x" @click="hidequestionList"></i>
          <div class="h5_title">
            <span class="h5_title_left" @click.once="getQuestionType();" @click="showAddQuestion">提交反馈</span>
            <span>问题反馈</span>
          </div>
          <div class="h5_main small2"
               v-infinite-scroll="getQuestionList"
               infinite-scroll-disabled="questionList.loading"
               infinite-scroll-distance="3">
            <div class="h5_tr">
              <div class="h5_td flex3 strong">标题</div>
              <div class="h5_td flex2 strong border_l_dbdbdd">更新时间</div>
              <div class="h5_td flex1 strong border_l_dbdbdd">状态</div>
            </div>
            <div class="h5_tr" v-for="v in questionList.data" @click="getQuestionInfo(v.id)">
              <div class="h5_td flex3">{{ v.title }}</div>
              <div class="h5_td flex2 border_l_dbdbdd">{{ v.modify_time }}</div>
              <div class="h5_td flex1 border_l_dbdbdd">
                <span v-if="v.status == 1" class="color_blue">处理中</span>
                <span v-else-if="v.status == 2">已处理</span>
                <span v-else-if="v.status == 3">关闭</span>
              </div>
            </div>
            <!--加载动画-->
            <div v-show="questionList.loading">
              <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="questionInfo.switch">
        <div class="h5_box question_info">
          <!--<i class="h5_icon_x" @click=""></i>-->
          <div class="h5_title">
            <span class="h5_title_left" @click="hideQuestionInfo">&lt;&lt;返回</span>
            <span>问题详情</span>
          </div>
          <div class="h5_main small2">
            <div><span>标题：</span><span>{{ questionInfo.data.question.title }}</span></div>
            <div class="m_t_0_5rem"><span>类型：</span><span>{{ questionInfo.data.question.type }}</span></div>
            <div class="m_t_0_5rem">详情：</div>
            <div class="qi_info m_t_0_5rem">
              {{ questionInfo.data.question.desc }}
            </div>
            <div class="reply_list">
              <div v-for="v in questionInfo.data.question_list.list" class="m_t_0_5rem">
                <div class="reply_my" v-if="v.type==1">
                  <span>{{ v.comment }}</span>
                  <span>{{ v.type|F_replyType }}</span>
                </div>
                <div v-else>
                  <span>{{ v.type|F_replyType }}</span>
                  <span>{{ v.comment }}</span>
                </div>
              </div>
            </div>
            <div class="add_comment">
              <input type="text" id="addComment" v-model="questionInfo.comment">
              <label for="addComment" class="m_l2" @click="addComment(questionInfo.data.question.id)">提交</label>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!addQuestion.once" v-show="addQuestion.switch">
        <div class="h5_box add_question">
          <!--<i class="h5_icon_x" @click=""></i>-->
          <div class="h5_title">
            <span class="h5_title_left" @click="hideAddQuestion">&lt;&lt;返回</span>
            <span>提交反馈</span>
          </div>
          <div class="h5_main">
            <div class="small2 color_red m_l2">每个玩家每天最多提交<span>{{addQuestion.limit}}</span>次工单</div>
            <div class="m_t_0_5rem aq_input"><span>标题：</span><input type="text" maxlength="15" placeholder="在这里输入标题,最多15个字" v-model="addQuestion.title"/></div>
            <div class="m_t_0_5rem aq_input"><span>联系方式：</span><input type="text" maxlength="15" placeholder="QQ或电话" v-model="addQuestion.contract"/></div>
            <div class="m_t_0_5rem aq_type">
              <mt-picker :slots="addQuestion.slots" @change="getAddQuestionType"></mt-picker>
            </div>
            <div class="m_t_0_5rem small2 color_888888">问题描述：</div>
            <textarea class="aq_desc m_t_0_5rem" id="addQuestionDesc" v-model="addQuestion.desc"></textarea>
            <div class="aq_desc_btn" @click="setAddQuestion">提交</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!options.once" v-show="options.switch">
      <div class="h5_box options">
        <i class="h5_icon_x" @click="hideOptions"></i>
        <div class="h5_title">
          <span>设置</span>
        </div>
        <div class="h5_main">
          <div class="h5_li" @click.once="bindMobile.once = false;" @click="options.switch = false; bindMobile.switch = true;">
            <span class="h5_li_title">绑定手机号</span>
            <i class="icon_clock"></i>
          </div>
          <div class="h5_li" @click.once="modifyPass.once = false;" @click="options.switch = false; modifyPass.switch = true;">
            <span class="h5_li_title">更改密码</span>
            <i class="icon_clock"></i>
          </div>
          <div class="h5_li" @click.once="idAuth.once = false;" @click="options.switch = false; idAuth.switch = true;">
            <span class="h5_li_title">实名认证</span>
            <i class="icon_clock"></i>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="!bindMobile.once" v-show="bindMobile.switch">
      <div class="h5_box bind_mobile">
        <i class="h5_icon_x" @click="options.switch = true; bindMobile.switch = false;"></i>
        <div class="h5_title">
          <span class="h5_title_left" @click="getBindMobileCode">下一步</span>
          <span>绑定手机号</span>
        </div>
        <div class="h5_main">
          <div class="m_t_1-5rem">目前只支持中国大陆手机号码</div>
          <div class="bm_input">
            <div class="bm_input_text">+86</div>
            <input class="bm_input_cont" type="number" v-model="bindMobile.mobile">
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <div class="screen" v-if="bindMobile2.switch">
      <div class="h5_box bind_mobile bind_mobile2">
        <i class="h5_icon_x" @click="bindMobile.switch = true; bindMobile2.switch = false;"></i>
        <div class="h5_title">
          <span class="h5_title_left" @click="onBindMobile">确定</span>
          <span>绑定手机号</span>
        </div>
        <div class="h5_main">
          <div class="m_t_1-5rem">已发送验证码至:{{ bindMobile.mobile }},请注意查收</div>
          <div class="bm_input">
            <input class="bm_input_cont" type="number" v-model="bindMobile2.code">
            <div class="bm_input_btn">
              <div v-show="bindMobile2.codeTime != 60"><span>({{ bindMobile2.codeTime }})</span><span>重新获取</span></div>
              <div v-show="bindMobile2.codeTime == 60" @click="getBindMobileCode">获取验证码</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <div class="screen" v-if="!modifyPass.once" v-show="modifyPass.switch">
      <div class="h5_box modify_pass">
        <i class="h5_icon_x" @click="options.switch = true; modifyPass.switch = false;"></i>
        <div class="h5_title">
          <span class="h5_title_left" @click="modifyPassword">确定</span>
          <span>更改密码</span>
        </div>
        <div class="h5_main">
          <div class="h5_input">
            <div class="h5_input_icon"><i class="icon_pwd"></i></div>
            <input type="password" class="h5_input_cont" placeholder="请输入旧密码" v-model="modifyPass.password">
          </div>
          <div class="h5_input m_t_0_5rem">
            <div class="h5_input_icon"><i class="icon_pwd"></i></div>
            <input type="password" class="h5_input_cont" placeholder="请输入新密码" v-model="modifyPass.newpassword">
          </div>
          <div class="h5_input m_t_0_5rem">
            <div class="h5_input_icon"><i class="icon_pwd"></i></div>
            <input type="password" class="h5_input_cont" placeholder="请再次输入新密码" v-model="modifyPass.newpasswords">
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="screen" v-if="!idAuth.once" v-show="idAuth.switch">
        <div class="h5_box id_auth">
          <i class="h5_icon_x" @click="options.switch = true; idAuth.switch = false;"></i>
          <div class="h5_title">
            <span class="h5_title_left" @click="setIdAuth">确定</span>
            <span>实名认证</span>
          </div>
          <div class="h5_main">
            <div v-if="userData.id_name">
              <div class="auth_state">
                <i class="h5_icon_yes"></i>
                <span class="m_l2">已实名认证</span>
              </div>
              <div class="auth_info">
                <div>
                  <span>姓名:</span>
                  <span>{{ userData.id_name }}</span>
                </div>
                <div class="m_t_0_5rem">
                  <span>证件号:</span>
                  <span>{{ userData.id_card }}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="small2">
                实名认证资料是您的身份的重要资料,可保证您的账号安全性,我们会对您的信息做加密处理,认证成功后,不可更改
              </div>
              <div class="h5_input m_t_1rem">
                <!--<div class="h5_input_icon"><i class="icon_pwd"></i></div>-->
                <input type="text" class="h5_input_cont" placeholder="请输入真实姓名" v-model="idAuth.name">
              </div>
              <div class="h5_input m_t_0_5rem">
                <!--<div class="h5_input_icon"><i class="icon_pwd"></i></div>-->
                <input type="text" class="h5_input_cont" placeholder="请输入证件号码" v-model="idAuth.id">
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import { Toast, Indicator, MessageBox, Picker } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data() {
      return {
        url:'',
        userData:{}, //用户
        userSwitch: 'icon',
        pick: 'user',
        password: '',
        active: 'bg_e0e0e0',
        //充值
        pay:{
          switch: false,
          once: true,
          name: 'zfb',
          payInfo: {},
        },
        //充值卡
        cardPay:{
          payType: 7,  //支付方式：1支付宝扫码 2支付宝手机 3微信扫码 4微信手机 5财付通网页版 保留值,现在不使用 6财付通手机版 7移动充值卡 8电信充值卡 9联通充值卡 10平台币
          payMode: 1,  //充值类型：1正常充值 2GM权限充值
          cardID: '',  //充值卡号(可选)：支付方式选择7、8、9
          cardPass: '',  //充值密码(可选)：支付方式选择7、8、9
          cardMoney: 10,  //充值卡金额(可选)：支付方式选择7、8、9，必须整数
        },
        //充值记录
        payRank:{
          switch: false,
          once: true,
          page: 1,
          data: [],
          status: false,//标记是否继续请求数据 true为继续
          loading: false, //若为真，则无限滚动不会被触发
        },
        //活动
        activity:{
          switch: false,
          once: true,
          page: 1,
          data: [],
          status: true,//标记是否继续请求数据 true为继续
          loading: false, //若为真，则无限滚动不会被触发
        },
        //活动详情
        activityInfo:{
          switch: false,
          once: true,
          data: {},
        },
        //问题反馈
        questionList:{
          switch: false,
          once: true,
          page: 1,
          data: [],
          status: true,//标记是否继续请求数据 true为继续
          loading: false, //若为真，则无限滚动不会被触发
        },
        //问题详情
        questionInfo:{
          switch: false,
          once: true,
          data: {},
          comment: '',//工单回复
        },
        addQuestion:{
          switch: false,
          once: true,
          title: '',
          contract: '',//联系方式
          desc: '',//问题描述
          limit: 0,
          type: 1,
          types: [],
          slots: [
            {
              flex: 1,
              values: ['选择问题'],
              className: 'slot1',
              textAlign: 'right'
            }, {
              divider: true,
              content: '：',
              className: 'slot2'
            }, {
              flex: 1,
              values: [],
              className: 'slot3',
              textAlign: 'left'
            }
          ],
        },
        gift:{
          once: true,
          page: 1,
          data: [],
          status: true,//标记是否继续请求数据 true为继续
          loading: false, //若为真，则无限滚动不会被触发
        },
        //设置
        options:{
          switch: false,
          once: true,
        },
        //绑定手机号
        bindMobile:{
          switch: false,
          once: true,
          mobile: '',
        },
        bindMobile2:{
          switch: false,
          codeTime: 60,
          code: ''
        },
        modifyPass:{
          switch: false,
          once: true,
          password: '',
          newpassword: '',
          newpasswords: '',
        },
        //实名认证
        idAuth:{
          switch: false,
          once: true,
          name: '',
          id: '',
        },

      }
    },
//    components:{ InfoBanner },
//    props: ['url'],
    computed: { //计算属性
      ...mapGetters([
        'userInfo',
        'gameH5'
      ]),
      // 计算属性的 getter
      getPayResult: function () {
        // `this` 指向 vm 实例
        return this.payQuery();
      }
    },
    created(){
        console.log(this.userInfo)
      if(this.myType.getCookie('sy185_user_token') != 0){
        if(Base64.decode(this.myType.getCookie('sy185_user_token')) == this.myType.sy185_user_token){
          this.$store.dispatch('getGameUrl');
        }else {
          this.$router.push({path:'/login'});
        }
      } else {
        this.$router.push({path:'/login'});
      }
      if(localStorage.getItem('sy185_password') != null){
        this.password = Base64.decode(localStorage.getItem('sy185_password'));
      } else {
        this.$router.push({path:'/login'});
      }
      this.loginGame(true);
    },
    mounted(){
      this.$nextTick(function () {
        // 将backToday方法绑定到window下面，提供给外部调用
        window['PC'] = {};
        window['PC'].submitExtraData = (roleInfo) => {
          console.log(roleInfo)
          this.reportData(JSON.parse(roleInfo));
          alert('PC提交角色信息')
        };
        window['PC'].pay = (payInfo) => {
          if(this.pay.once){
              this.pay.once = false;
          }
          this.pay.payInfo = JSON.parse(payInfo);
          console.log(this.pay.payInfo)
          this.showPay();
//          this.pay(pay.payInfo);
//          alert('PC发起支付')
        };
        window['PC'].onPayResult = (roleInfo) => {
          console.log(roleInfo)
          this.reportData(JSON.parse(roleInfo));
          alert('PC提交角色信息')
        };
//        window.Android.pay(JSON.stringify(orderInfo));
        console.log(this.userInfo)
//        console.log(this.gameH5)
//        this.getGameUrl()
        console.log('this.gameH5.appid:',this.gameH5.appid)
      });
    },
    directives: {//自定义指令
      onDrag: {
        // 指令的定义
        inserted: function () {//被绑定元素插入到DOM中时调用
          var flag = 0; //标记是拖曳还是点击
          var icon = document.getElementById('floatIcon');
          var disX, disY, moveX, moveY, L, T, starX, starY, starXEnd, starYEnd;
          var timer;
          function startTimer() {
            timer = setTimeout(()=>{icon.style.opacity = 0.6;},3000);
          }
//          var iconW = icon.offsetWidth,
//            iconH = icon.offsetHeight;
          icon.addEventListener('touchstart', function(e) {
//              console.log(timer)
            icon.className = '';
            icon.style.opacity = 1;
            clearTimeout(timer,0);
            startTimer();
            var e = e || window.event;
            flag = 0;
//            e.preventDefault(); //阻止触摸时页面的滚动，缩放
            disX = e.touches[0].clientX - this.offsetLeft;
            disY = e.touches[0].clientY - this.offsetTop;
            //手指按下时的坐标
            starX = e.touches[0].clientX;
            starY = e.touches[0].clientY;
            //console.log(disX);
          });
          icon.addEventListener('touchmove', function(e) {
            var e = e || window.event;
            flag = 1;
            L = e.touches[0].clientX - disX;
            T = e.touches[0].clientY - disY;
            //移动时 当前位置与起始位置之间的差值
            starXEnd = e.touches[0].clientX - starX;
            starYEnd = e.touches[0].clientY - starY;
            //console.log(L);
//            if(L < 0 && L > -(iconW/2)) { //限制拖拽的X范围，不能拖出屏幕
//              L = 0;
//            } else if(L < -(iconW/2)) {
//              L = -(iconW/2);
//            } else if(L > document.documentElement.clientWidth - this.offsetWidth && L < document.documentElement.clientWidth - this.offsetWidth + (iconW/2)) {
//              L = document.documentElement.clientWidth - this.offsetWidth;
//            } else if(L > document.documentElement.clientWidth - this.offsetWidth + (iconW/2)) {
//              L = document.documentElement.clientWidth - this.offsetWidth + (iconW/2);
//            }
//            if(T < 0 && T > -(iconH/2)) { //限制拖拽的Y范围，不能拖出屏幕
//              T = 0;
//            } else if(T < -(iconH/2)) {
//              T = -(iconH/2);
//            } else if(T > document.documentElement.clientHeight - this.offsetHeight && T < document.documentElement.clientHeight - this.offsetHeight + (iconH/2)) {
//              T = document.documentElement.clientHeight - this.offsetHeight;
//            } else if(T > document.documentElement.clientHeight - this.offsetHeight + (iconH/2)) {
//              T = document.documentElement.clientHeight - this.offsetHeight + (iconH/2);
//            }

            if(L<0){//限制拖拽的X范围，不能拖出屏幕
              L = 0;
            }else if(L > document.documentElement.clientWidth - this.offsetWidth){
              L=document.documentElement.clientWidth - this.offsetWidth;
            }
            if(T<0){//限制拖拽的Y范围，不能拖出屏幕
              T=0;
            }else if(T > document.documentElement.clientHeight - this.offsetHeight){
              T = document.documentElement.clientHeight - this.offsetHeight;
            }

            moveX = L + 'px';
            moveY = T + 'px';
            //console.log(moveX);
            this.style.left = moveX;
            this.style.top = moveY;
          });
          window.addEventListener('touchend', function(e) {
            //alert(parseInt(moveX))
            //判断滑动方向
            if(flag === 0) { //点击
//              icon.style.display = 'none';
//              document.getElementById('userBox').style.display = 'block';
              return
              console.log('点击')
//              window.location.href = 'http://www.baidu.com';
            }
            var floatIcon = document.getElementById('floatIcon');
            var floatIconLeft = parseInt(floatIcon.style.left.substring(0, floatIcon.style.left.length-2));
            if(floatIconLeft == 0){
              floatIcon.className = 'floatIconL';
            } else if(floatIconLeft + floatIcon.offsetWidth == document.documentElement.clientWidth){
              floatIcon.className = 'floatIconR';
            } else {

            }
          });
        }
      },
    },
    filters: {	//自定义局部过滤器
      F_status: (status) => {
        //1 是成功 2 是发货 3 是未支付
        if(status == 1){
          return '成功'
        } else if(status == 2){
          return '发货中'
        } else if(status == 3){
          return '未支付'
        } else {
          return status
        }
      },
//      F_questionListStatus: (status) => {
//        // 状态，1处理中 2 已处理 3 关闭
//        if(status == 1){
//          return '处理中'
//        } else if(status == 2){
//          return '已处理'
//        } else if(status == 3){
//          return '关闭'
//        } else {
//          return status
//        }
//      },
      F_replyType: (type) => {
        // 状态，1处理中 2 已处理 3 关闭
        if(type == 1){
          return '：我'
        } else if(type == 2){
          return '客服：'
        } else {
          return status
        }
      },
    },
    methods:{
      getAddQuestionType(picker, values) {
        let types = this.addQuestion.types
        for(let i=0; i < types.length; i++){
          if(types[i].name == picker.getSlotValue(1)){
            this.addQuestion.type = types[i].id;
            return
          }
        }
      },
      goCardPay(){
        if(!this.cardPay.cardID){
          this.toast('请输入充值卡账号');
          return
        } else if(!this.cardPay.cardPass){
          this.toast('请输入充值卡密码');
          return
        }
        this.payReady(this.cardPay);
      },
      onCopy(e) {
        if(e && e.stopPropagation){
          e.stopPropagation();
        }else{
          window.event.cancelBubble = true;
        }
        this.messageBox();
      },
      onError(e) {
        this.toast('Failed to copy texts');
      },
      messageBox() {
        MessageBox({
          title: '礼包码已复制',
          message: '领取后请尽快使用，以免过期！',
          showCancelButton: false
        });
      },
      toast (msg) {
        let msgs = msg || '提示';
        Toast({
          message: msgs,
          duration: 2000,
          position: 'bottom',
          className: 'm_toast'
        });
      },
      indicator () {
        Indicator.open({
//          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      loginGame(once){
        let url = this.jointUrl({
          username: this.userInfo.mobile || this.userInfo.username,  //用户账号或手机号
          type: this.userInfo.mobile ? 2 : 1, //1.用户账号 2.手机登录
          password: this.password,
          appid: this.gameH5.appid, //应用ID
          channel: this.myType.channel,
          system: this.myType.system, //1 安卓 2 IOS
          machine_code: '', //;安卓是设备号（32位）IOS随机生成（36）
        });
        console.log(url + this.gameH5.key)
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          username: this.userInfo.mobile || this.userInfo.username,  //用户账号或手机号
          type: this.userInfo.mobile ? 2 : 1, //1.用户账号 2.手机登录
          password: this.password,
          appid: this.gameH5.appid, //应用ID
          channel: this.myType.channel,
          system: this.myType.system, //1 安卓 2 IOS
          machine_code: '', //;安卓是设备号（32位）IOS随机生成（36）
          is_web: 1,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=user&a=login',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              let data = datas.data;
              this.userData = data;
              console.log('成功')
              if(once){
                this.pinGameUrl();
              }
            } else if(datas.msg){
              this.toast(datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      pinGameUrl(){
        let url = this.jointUrl({
          userID: this.userData.username,  //用户账号或手机号
          token: this.userData.token, //1.用户账号 2.手机登录
          deviceType: this.myType.system, //设备类型 1-安卓 2-苹果
          platform: this.gameH5.appid //应用ID
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          userID: this.userData.username,  //用户账号或手机号
          token: this.userData.token, //1.用户账号 2.手机登录
          deviceType: this.myType.system, //设备类型 1-安卓 2-苹果
          platform: this.gameH5.appid, //应用ID
          sign: mySign
        });
        this.url = this.gameH5.url + '?' + myUrl;

        this.$nextTick(function () {
          console.log('h5Game:')
          console.log(this.$refs.h5Game.contentWindow)
        });
      },
      showPay(){
        this.pay.switch = true;
      },
      //查看手机是否存在
      exsitsMobile(){
        this.indicator();
        let url = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          mobile: this.userInfo.mobile
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          mobile: this.userInfo.mobile,
          sign: mySign
        });
        this.$http.post('/api/index.php? g=api&m=user&a=exsits_mobile',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log('手机号存在');
            } else if(datas.msg){
              this.endIndicator();
              this.toast(datas.msg);
            }
          }, error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //支付前检测
      payReady(payment){
        this.indicator();
        let url = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          uid: this.userInfo.id  //用户id
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          uid: this.userInfo.id,  //用户id
          sign: mySign
        });
        this.$http.post('/api/index.php? g=api&m=pay&a=payReady',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              console.log('支付前检测成功');
              this.payStart(payment);
            } else if(datas.msg){
              this.endIndicator();
              this.toast(datas.msg);
            }
          }, error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //支付
      payStart(payment){
        let url = this.jointUrl({
          deviceType: this.myType.system == 1 ? 2 : 1,  //系统类型 1苹果，2安卓
          appid: this.gameH5.appid,  //应用ID
          channel: this.myType.channel, //渠道ID  185
          uid: this.userInfo.id,  //用户id
          serverID: this.pay.payInfo.serverId, //区服ID
          serverNAME: this.pay.payInfo.serverName, //区服名称
          roleID: this.pay.payInfo.roleId, //角色ID
          roleNAME: this.pay.payInfo.roleName, //角色名称
          productID: this.pay.payInfo.productId,  //产品ID：为GM权限充值时值为权限档位ID
          productNAME: this.pay.payInfo.productName,  //产品名：为GM权限充值时值为权限档位名称
          payType: payment.payType,  //支付方式：1支付宝扫码 2支付宝手机 3微信扫码 4微信手机 5财付通网页版 保留值,现在不使用 6财付通手机版 7移动充值卡 8电信充值卡 9联通充值卡 10平台币
          payMode: payment.payMode,  //充值类型：1正常充值 2GM权限充值
          cardID: payment.cardID,  //充值卡号(可选)：支付方式选择7、8、9
          cardPass: payment.cardPass,  //充值密码(可选)：支付方式选择7、8、9
          cardMoney: payment.cardMoney,  //充值卡金额(可选)：支付方式选择7、8、9，必须整数
          amount: this.pay.payInfo.price,  //充值金额：单位元，必须整数
          extend: '123'  //扩展字段
        });
        console.log(url + this.gameH5.key)
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          deviceType: this.myType.system == 1 ? 2 : 1,  //系统类型 1苹果，2安卓
          appid: this.gameH5.appid,  //应用ID
          channel: this.myType.channel, //渠道ID  185
          uid: this.userInfo.id,  //用户id
          serverID: this.pay.payInfo.serverId, //区服ID
          serverNAME: this.pay.payInfo.serverName, //区服名称
          roleID: this.pay.payInfo.roleId, //角色ID
          roleNAME: this.pay.payInfo.roleName, //角色名称
          productID: this.pay.payInfo.productId,  //产品ID：为GM权限充值时值为权限档位ID
          productNAME: this.pay.payInfo.productName,  //产品名：为GM权限充值时值为权限档位名称
          payType: payment.payType,  //支付方式：1支付宝扫码 2支付宝手机 3微信扫码 4微信手机 5财付通网页版 保留值,现在不使用 6财付通手机版 7移动充值卡 8电信充值卡 9联通充值卡 10平台币
          payMode: payment.payMode,  //充值类型：1正常充值 2GM权限充值
          cardID: payment.cardID,  //充值卡号(可选)：支付方式选择7、8、9
          cardPass: payment.cardPass,  //充值密码(可选)：支付方式选择7、8、9
          cardMoney: payment.cardMoney,  //充值卡金额(可选)：支付方式选择7、8、9，必须整数
          amount: this.pay.payInfo.price,  //充值金额：单位元，必须整数
          origPrice: 0,  //原价：从研发获取,折扣服才有值,没有传0
          extend: '123',  //扩展字段
          sign: mySign
        });
        console.log(mySign)
        this.$http.post('/api/index.php?g=api&m=pay&a=payStart',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
              console.log('发起支付成功');
//              window.open(datas.data.url);
              window.open(datas.data.url);
//              this.payQuery(datas.data.orderID, 0);  //查询支付状态
//              let pay = new Promise((resolve, reject)=>{
//
//              })
              setTimeout(() => {
                this.payQuery(datas.data.orderID, 1);
              }, 5000);
            } else if(datas.msg){
              this.toast(datas.msg);
            }
            this.endIndicator();
          }, error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //查询支付接口
      payQuery(orderID, querySum){
          console.log(querySum)
        if(querySum > 3){
//          window.onPayResult(false);
          if(this.$refs.h5Game.contentWindow.onPayResult){
            console.log('111111111');
            this.$refs.h5Game.contentWindow.onPayResult(true);
          } else if(window.onPayResult){
            console.log('2222222');
            window.onPayResult(true);
          } else if(window.top.onPayResult){
            console.log('3333333');
            window.top.onPayResult(true);
          }
          return
        }
        let _this = this;
        let payResult = new Promise((resolve, reject)=>{
          let url = this.jointUrl({
            orderID: orderID  //订单号
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            orderID: orderID,  //订单号
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=pay&a=payQuery',myUrl)
            .then(response => {
              resolve(response)
            }, error => {
              reject(error)
            })
        });
        payResult.then(function (arr) {
          var datas = arr.data;
          console.log(datas)
          if(datas.status == 1){//1成功
            console.log(datas.data.order_status)
            console.log('支付结果');
            if(datas.data.order_status == 1){ //1 成功
//              window.onPayResult(true);
              this.$refs.h5Game.contentWindow.onPayResult(true)
            } else if(datas.data.order_status == 2){  //2 发货中
              console.log('发货中');
              setTimeout(() => {
                _this.payQuery(orderID, ++querySum);
              }, 5000);
            } else if(datas.data.order_status == 3){  //3 未支付
              console.log('未支付');
              setTimeout(() => {
                _this.payQuery(orderID, ++querySum);
              }, 5000);
            } else {
              setTimeout(() => {
                _this.payQuery(orderID, ++querySum);
              }, 5000);
            }
          }
          if (datas.status == 0) {//0失败
            _this.toast(datas.msg);
          }
        },function (err) {
          console.log('请求失败：' + err.status + '，' + err.statusText);
        })
      },
      //上报玩家数据
      reportData(roleInfo){
        let url = this.jointUrl({
          type: roleInfo.dataType,  //应用ID
          channel: this.myType.channel, //渠道ID  185
          appid: this.gameH5.appid,  //游戏ID
          deviceID: 'webapp', //设备号
          userID: this.userInfo.id,  //SDK账号的uid
          serverID: roleInfo.serverID, //区服ID
          serverName: roleInfo.serverName, //区服名称
          roleID: roleInfo.roleID, //角色ID
          roleName: roleInfo.roleName, //角色名称
          roleLevel: roleInfo.roleLevel, //角色等级
          money: roleInfo.moneyNum, //角色拥有游戏币数量
          vip: roleInfo.vip //vip等级
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          type: roleInfo.dataType,  //应用ID
          channel: this.myType.channel, //渠道ID  185
          appid: this.gameH5.appid,  //游戏ID
          deviceID: 'webapp', //设备号
          userID: this.userInfo.id,  //SDK账号的uid
          serverID: roleInfo.serverID, //区服ID
          serverName: roleInfo.serverName, //区服名称
          roleID: roleInfo.roleID, //角色ID
          roleName: roleInfo.roleName, //角色名称
          roleLevel: roleInfo.roleLevel, //角色等级
          money: roleInfo.moneyNum, //角色拥有游戏币数量
          vip: roleInfo.vip, //vip等级
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=user&a=report_data',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
              console.log('上报玩家数据成功');
            } else if(datas.msg){
              this.toast(datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //充值记录
      showPayRank(){
        this.payRank.status = true;
        this.payRank.page = 1;
        this.getPayRank();
        this.userSwitch = '';
        this.payRank.switch = true;

      },
      hidePayRank(){
        this.payRank.switch = false;
        this.userSwitch = 'box';
        //初始化
        this.payRank.status = false;
//        this.payRank.page = 1;
        this.payRank.data = [];
      },
      getPayRank(){
        if(this.payRank.status) {
          this.payRank.loading = true;
          let url = this.jointUrl({
            appid: this.gameH5.appid,  //游戏ID
            uid: this.userInfo.id,  //SDK账号的uid
            page: this.payRank.page
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            appid: this.gameH5.appid,  //游戏ID
            uid: this.userInfo.id,  //SDK账号的uid
            page: this.payRank.page,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=user&a=pay_list_by_user',myUrl)
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                if(datas.data.count >= this.payRank.page){
                  let list = datas.data.list;
                  if(this.payRank.page == 1){
                    this.payRank.data = list;
                  } else {
//                    this.payRank.data.push.apply(this.payRank.data, list);
                    this.payRank.data = this.payRank.data.concat(list);
                  }
                  this.payRank.page++;
                } else {
                  this.payRank.status = false;
                }
              } else if(datas.msg){
                this.toast(datas.msg);
              }
              setTimeout(() => this.payRank.loading = false,1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      },
      //活动公告列表
      showActivity(){
        this.getActivity();
        this.userSwitch = '';
        this.activity.switch = true;
      },
      hideActivity(){
        this.activity.switch = false;
        this.userSwitch = 'box';
//        this.activity.status = false;
      },
      getActivity(){
        if(this.activity.status){
          this.activity.loading = true;

          let url = this.jointUrl({
            appid: this.gameH5.appid,
            channel: this.myType.channel,
            uid: this.userInfo.id,
            page: this.activity.page
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            appid: this.gameH5.appid,
            channel: this.myType.channel,
            uid: this.userInfo.id,
            page: this.activity.page,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=notice&a=notice_list',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                console.log('活动列表成功');
                if(datas.data.count >= this.activity.page){
                  let list = datas.data.list;
                  if(this.activity.page == 1){
                    this.activity.data = list;
                  } else {
                    this.activity.data = this.activity.data.concat(list);
                  }
                  this.activity.page++;
                } else {
                  this.activity.status = false;
                }
              } else if(datas.msg){
                this.activity.status = false;
                this.toast(datas.msg);
              }
              setTimeout(() => this.activity.loading = false,1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      },
      //活动公告详情
      getActivityInfo(id){
        if(this.activityInfo.once){
          this.activityInfo.once = false;
        }
        this.indicator();
//        this.activityInfoID = id;
        let url = this.jointUrl({
          appid: this.gameH5.appid,
          id: id
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          appid: this.gameH5.appid,
          id: id,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=notice&a=notice_info',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              console.log('活动详情成功');
              datas.data.add_time = this.myType.formatTimeM(datas.data.add_time);
              this.activityInfo.data = datas.data;
              this.activityInfo.switch = true;
            } else if(datas.msg){
              this.toast(datas.msg);
            }
            this.endIndicator();
          }, error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })

      },
      hideActivityInfo(){
        this.activityInfo.switch = false;
      },
      //问题反馈列表(工单接口)
      showQuestionList(){
        this.questionList.status = true;
        this.questionList.page = 1;
        this.getQuestionList();

        this.userSwitch = '';
        this.questionList.switch = true;
      },
      hidequestionList(){
        this.questionList.switch = false;
        this.userSwitch = 'box';

        //初始化
//        this.questionList.status = false;
        this.questionList.data = [];
      },
      //反馈列表
      getQuestionList(){
        if(this.questionList.status) {
          this.questionList.loading = true;
          let url = this.jointUrl({
            appid: this.gameH5.appid,  //游戏ID
            uid: this.userInfo.id,  //SDK账号的uid
            channel: this.myType.channel,
            page: this.questionList.page
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            appid: this.gameH5.appid,  //游戏ID
            uid: this.userInfo.id,  //SDK账号的uid
            channel: this.myType.channel,
            page: this.questionList.page,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=question&a=get_list',myUrl)
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                if(datas.data.count >= this.questionList.page){
                  let list = datas.data.list;
                  for(let i = 0; i < list.length; i++){
                    list[i].modify_time = this.myType.formatTimeM(list[i].modify_time);
                  }
                  if(this.questionList.page == 1){
                    this.questionList.data = list;
                  } else {
//                    this.payRank.data.push.apply(this.payRank.data, list);
                    this.questionList.data = this.questionList.data.concat(list);
                  }
                  this.questionList.page++;
                } else {
                  this.questionList.status = false;
                }
              } else if(datas.msg){
                this.questionList.status = false;
                this.toast(datas.msg);
              }
              setTimeout(() => this.questionList.loading = false,1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      },
      hideQuestionInfo(){
        this.questionInfo.switch = false;
        this.questionList.switch = true;
      },
      //反馈详情
      getQuestionInfo(id){
          console.log(id)
        this.indicator();
        let url = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          uid: this.userInfo.id,  //用户id
          channel: this.myType.channel,
          question_id: id,
          page: 1
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          uid: this.userInfo.id,  //用户id
          channel: this.myType.channel,
          question_id: id,
          page: 1,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=question&a=get_question_info',myUrl)
          .then(response => {
            var datas = response.data;
//            console.log(datas)
            if(datas.status == 1){//1成功
              console.log('工单详情');
              this.questionInfo.data = datas.data;
              console.log(this.questionInfo.data)
              this.questionInfo.switch = true;
              this.questionList.switch = false;
            } else if(datas.msg){
              this.toast(datas.msg);
            }
            this.endIndicator();
          }, error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //提交回复
      addComment(id){
        if(this.questionInfo.comment){
          this.indicator();
          let url = this.jointUrl({
            appid: this.gameH5.appid,  //应用ID
            uid: this.userInfo.id,  //用户id
            channel: this.myType.channel,
            question_id: id,
            comment: this.questionInfo.comment
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            appid: this.gameH5.appid,  //应用ID
            uid: this.userInfo.id,  //用户id
            channel: this.myType.channel,
            question_id: id,
            comment: this.questionInfo.comment,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=question&a=add_comment',myUrl)
            .then(response => {
              var datas = response.data;
            console.log(datas)
              if(datas.status == 1){//1成功
                console.log('回复成功');
                this.questionInfo.comment = '';
                this.getQuestionInfo(id);
              } else if(datas.msg){
                this.toast(datas.msg);
              }
              this.endIndicator();
            }, error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
            this.toast('参数不能为空');
        }
      },
      //提交问题工单
      setAddQuestion(){
        let title = this.addQuestion.title,
          contract = this.addQuestion.contract,
          desc = this.addQuestion.desc,
          type = this.addQuestion.type;
        if(!title){
          this.toast('请填写标题');
        } else if(!contract){
          this.toast('请填写联系方式');
        } else if(!desc){
          this.toast('请填写问题描述');
        } else {
          this.indicator();
          let url = this.jointUrl({
            appid: this.gameH5.appid,  //应用ID
            uid: this.userInfo.id,  //用户id
            channel: this.myType.channel,
            title: title,
            type: type,
            desc: desc,
            contract: contract
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            appid: this.gameH5.appid,  //应用ID
            uid: this.userInfo.id,  //用户id
            channel: this.myType.channel,
            title: title,
            type: type,
            desc: desc,
            contract: contract,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=question&a=add_question',myUrl)
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                this.showQuestionList();
                this.addQuestion.switch = false;
              } else if(datas.msg){
                this.toast(datas.msg);
              }
              this.endIndicator();
            }, error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }

      },
      //工单动态数据
      getQuestionType(){
        let url = this.jointUrl({
          appid: this.gameH5.appid,
          channel: this.myType.channel
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          appid: this.gameH5.appid,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=question&a=get_type',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              let types = datas.data.type;
              this.addQuestion.limit = datas.data.question_limit;
              this.addQuestion.types = types;
              for(let i=0; i < types.length; i++){
                this.addQuestion.slots[2].values.push(types[i].name)
              }
              this.addQuestion.once = false;
            } else if(datas.msg){
              this.toast(datas.msg);
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      showAddQuestion(){
        this.questionList.switch = false;
        this.addQuestion.switch = true;
      },
      hideAddQuestion(){
        this.addQuestion.switch = false;
        this.questionList.switch = true;
      },
      //礼包列表
      getGift(){
        if(this.gift.status) {
          this.gift.loading = true;
          let url = this.jointUrl({
            appid: this.gameH5.appid,  //游戏ID
            channel: this.myType.channel,
            uid: this.userInfo.id,  //SDK账号的uid
            system: this.myType.system,
            page: this.gift.page
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            appid: this.gameH5.appid,  //游戏ID
            channel: this.myType.channel,
            uid: this.userInfo.id,  //SDK账号的uid
            system: this.myType.system,
            page: this.gift.page,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=package&a=package_list',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                if(datas.data.count >= this.gift.page){
                  let list = datas.data.list;
                  for(let i = 0; i < list.length; i++){
                    if(list[i].pack_get_counts){
                      list[i].pack_residual = (Number(list[i].pack_get_counts) - Number(list[i].pack_counts))/list[i].pack_get_counts*100;
                    } else {
                      list[i].pack_residual = 0;
                    }
                    console.log(list[i].card)
                  }
                  if(this.gift.page == 1){
                    this.gift.data = list;
                  } else {
//                    this.payRank.data.push.apply(this.payRank.data, list);
                    this.gift.data = this.gift.data.concat(list);
                  }
                  this.gift.page++;
                } else {
                  this.gift.status = false;
                }
              } else if(datas.msg){
                this.gift.status = false;
                this.toast(datas.msg);
              }
              setTimeout(() => this.gift.loading = false,1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      },
      //领取礼包
      getCard(pid,index) {
        this.indicator();//开启加载提示动画
        let url = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          channel: this.myType.channel,
          uid: this.userInfo.id,  //用户id
          pid: pid,
          machine_code: ''  //设备号
        });
        let mySign = md5(url + this.gameH5.key).toLowerCase();
        let myUrl = this.jointUrl({
          appid: this.gameH5.appid,  //应用ID
          channel: this.myType.channel,
          uid: this.userInfo.id,  //用户id
          pid: pid,
          machine_code: '',  //设备号
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=package&a=get_package_code',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              this.gift.data[index].card = datas.data.card;
            } else if(datas.msg){
              this.toast(datas.msg);
            }
            this.endIndicator();
          }, error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      //设置
      showOptions(){
        this.userSwitch = '';
        this.options.switch = true;
      },
      hideOptions(){
        this.options.switch = false;
        this.userSwitch = 'box';
      },
      //获取绑定手机号验证码
      getBindMobileCode(){
        if(!this.bindMobile.mobile){
          this.toast('请输入手机号');
        } else if(this.bindMobile.mobile.length != 11){
          this.toast('请输入正确的手机号');
        } else {
          let url = this.jointUrl({
            appid: this.gameH5.appid,  //应用ID
            mobile: this.bindMobile.mobile,
            type: 2,  //类型：1 注册 2绑定 3解绑 4 找回密码
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            appid: this.gameH5.appid,  //应用ID
            mobile: this.bindMobile.mobile,
            type: 2,  //类型：1 注册 2绑定 3解绑 4 找回密码
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=user&a=send_message',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                this.bindMobile.switch = false;
                this.bindMobile2.switch = true;
                let time = 60;
                let timer = setInterval(()=>{
                    if(time > 0){
                      --time;
                      this.bindMobile2.codeTime = time;
                    } else {
                      clearInterval(timer);
                      this.bindMobile2.codeTime = 60;
                    }
                }, 1000);
              } else if(datas.msg){
                this.toast(datas.msg);
              }
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      },
      //绑定手机
      onBindMobile(){
        if(this.bindMobile2.code){
          this.indicator();
          let url = this.jointUrl({
            uid: this.userInfo.id,
            mobile: this.bindMobile.mobile,
            appid: this.gameH5.appid,  //应用ID
            code: this.bindMobile2.code
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            uid: this.userInfo.id,
            mobile: this.bindMobile.mobile,
            appid: this.gameH5.appid,  //应用ID
            code: this.bindMobile2.code,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=user&a=bind_mobile',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                this.toast('绑定手机号成功');
                this.bindMobile2.switch = false;
                this.options.switch = true;
              } else if(datas.msg){
                this.toast(datas.msg);
              }
              this.endIndicator();
            }, error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.toast('请输入验证码');
        }
      },
      //修改密码
      modifyPassword(){
        let password = this.modifyPass.password,
          newpassword = this.modifyPass.newpassword,
          newpasswords = this.modifyPass.newpasswords;
        if(!password){
          this.toast('请输入原密码')
        } else if(password.length<6 || password.length>16) {
          this.toast('请输入6~16位原密码')
        } else if(!newpassword){
          this.toast('请输入新密码')
        } else if(newpassword.length<6 || newpassword.length>16){
          this.toast('请设置6~16位的密码')
        } else if(!newpasswords){
          this.toast('请再次输入新密码')
        } else if(newpassword != newpasswords){
          this.toast('两次输入的密码不一致')
        } else {
          this.indicator();
          let url = this.jointUrl({
            id: this.userInfo.id,
            appid: this.gameH5.appid,  //应用ID
            password: password,
            newpassword: newpassword
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            id: this.userInfo.id,
            appid: this.gameH5.appid,  //应用ID
            password: password,
            newpassword: newpassword,
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=user&a=modify_password',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                localStorage.setItem("sy185_password", Base64.encode(newpassword));
                this.toast('修改成功');
                this.modifyPass.switch = false;
                this.options.switch = true;
                this.modifyPass.password = '';
                this.modifyPass.newpassword = '';
                this.modifyPass.newpasswords = '';
              } else if(datas.msg){
                this.toast(datas.msg);
              }
              this.endIndicator();
            }, error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      },
      //实名认证
      setIdAuth(){
        let name = this.idAuth.name,
          id = this.idAuth.id;
        if(!name){
          this.toast('请输入真实名字')
        } else if(!id){
          this.toast('请输入身份证号码')
        } else {
          this.indicator();
          let url = this.jointUrl({
            uid: this.userInfo.id,
            real_name: name,
            id_card: id,
            appid: this.gameH5.appid
          });
          let mySign = md5(url + this.gameH5.key).toLowerCase();
          let myUrl = this.jointUrl({
            uid: this.userInfo.id,
            real_name: name,
            id_card: id,
            appid: this.gameH5.appid,  //应用ID
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=user&a=id_auth',myUrl)
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                this.toast('认证成功');
                this.loginGame();//重新获取信息
                this.idAuth.switch = false;
                this.options.switch = true;
                this.idAuth.name = '';
                this.idAuth.id = '';
              } else if(datas.msg){
                this.toast(datas.msg);
              }
              this.endIndicator();
            }, error => {
              this.endIndicator();
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      },
    }
  }
//  window.submiteRole= function(){
//    var roleInfo = {};
//    roleInfo.dataType = 1;                  //1.选择服务器;2.创建角色;3.登录游戏;4.角色升级;5.退出游戏
//    roleInfo.moneyNum = 100;                //游戏币数量（充值代币）
//    roleInfo.roleCreateTime = Date.parse(new Date())/1000; //角色创建时间戳(秒)
//    roleInfo.roleID = "role_100";           //角色ID
//    roleInfo.roleName = "测试角色名";       //角色名称
//    roleInfo.roleLevel = 10;              //角色等级
//    roleInfo.roleLevelUpTime = Date.parse(new Date())/1000; //角色升级时间戳(秒)
//    roleInfo.serverID = 10;                 //服务器ID
//    roleInfo.serverName = "10服";           //服务器名称
//    roleInfo.vip = 1;                       //vip等级
//
//    SuperSYSDK.submitExtraData(roleInfo);
//  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .fade-enter-active, .fade-leave-active { transition: opacity .5s;}
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ { opacity: 0;}
  @color-green: #55BC44;
  @color-orange: #FFBB44;

  .btn_01,.btn_02{
    display: inline-block;
    width: 6rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: .83rem;
    color: #ffffff;
    border-radius: 1rem;
    background-color: @color-orange;
  }
  .btn_02{
    background-color: @color-green;
  }
  .btn_03{
    display: inline-block;
    width: 5rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .83rem;
    color: #ffffff;
    border-radius: .9rem;
    background-color: #dbdbdd;
  }
  .btn_03_on{ background-color: @color-green;}
  .btn_04,.btn_04_on{
    display: inline-block;
    width: 10rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: .83rem;
    color: #ffffff;
    border-radius: 1rem;
    background-color: #cccccc;
  }
  .btn_04_on{
    background-color: @color-orange;
  }
  .btn_05{
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 1rem;
    font-size: .83rem;
    color: #ffffff;
    background-color: @color-green;
  }
  .h5_icon_x{
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background: url("../../../static/img/ic_close.png") no-repeat;
    background-size: contain;
    border-radius: 50% 50%;
    position: absolute;
    top: .2rem;
    right: .2rem;
    z-index: 150;
  }
  .h5_icon_yes{
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background: url("../../../static/img/ic_gou.png") no-repeat;
    background-size: contain;
  }
  .playGames{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .h5Game{
      width: 100%;
      flex: 1;
      overflow-y: auto;
    }
    #floatIcon{
      width: 4rem;
      height: 4rem;
      /*line-height: 3rem;*/
      /*text-align: center;*/
      /*border: 1px solid #29a1f7;*/
      border-radius: 50% 50%;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 9;
      /*transition: all .5s ease;*/
    }
    .floatIconL{
      transition: all .4s ease;
      transform: translatex(-50%);
    }
    .floatIconR{
      transition: all .4s ease;
      transform: translatex(50%);
    }
    .screen{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 11;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      transition: .2s ease-out;
      .h5_box{
        position: fixed;
        background-color: #ffffff;
        top: 50%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        width: 23rem;
        /*height: 20rem;*/
        border-radius: .5rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .h5_title{
          height: 2.8rem;
          line-height: 2.8rem;
          text-align: center;
          font-size: 1.1rem;
          background-color: #f0f0f0;
          border-bottom: 1px solid #ccc;
          position: relative;
          .h5_title_left{
            font-size: 1rem;
            line-height: 1rem;
            position: absolute;
            left: .5rem;
            top: 50%;
            transform: translate(0, -50%);
          }
          .h5_title_right{
            font-size: 1rem;
            line-height: 1rem;
            position: absolute;
            right: .5rem;
            top: 50%;
            transform: translate(0, -50%);
          }
        }
        .h5_main{
          flex: 1;
          /*font-size: .83rem;*/
          overflow-y: auto;
          .h5_tr{
            height: 3rem;
            border-bottom: 1px solid #dbdbdd;
            display: flex;
            .h5_td{
              /*flex: 1;*/
              height: 100%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .h5_li{
            height: 2.5rem;
            padding: 0 .8rem;
            border-bottom: 1px solid #dbdbdd;
            display: flex;
            align-items: center;
            .h5_li_title{
              flex: 1;
            }
          }
          .h5_input{
            height: 3rem;
            background: #ffffff;
            border-radius: .5rem;
            display: flex;
            align-items: center;
            overflow: hidden;
            .h5_input_icon{
              width: 2.5rem;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .h5_input_cont{
              flex: 1;
              border: none;
            }
          }
        }
        .h5_footer{

        }
      }
      .user{
        /*position: fixed;*/
        /*background: #ffffff;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*-webkit-transform: translate3d(-50%, -50%, 0);*/
        /*transform: translate3d(-50%, -50%, 0);*/
        /*!*background-color: #ffffff;*!*/
        /*width: 23rem;*/
        /*height: 20rem;*/
        /*border-radius: .5rem;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        .user_main{
          /*width: 100%;*/
          /*flex: 1;*/
          height: 15rem;
          display: flex;
          flex-direction: column;
          .user_gift{
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            .no_gift{
              width: 100%;
              height: 100%;
              background: url("../../../static/img/27_ic_zwlb.png") no-repeat;
              background-size: cover;
            }
            .gift_list{
              width: 100%;
              flex: 1;
              display: flex;
              flex-direction: column;
              overflow-y: auto;
              .gift_li{
                height: 3rem;
                margin: 0 1rem;
                border-bottom: 1px solid #dbdbdd;
                display: flex;
                align-items: center;
                .gift_li_left{
                  display: inline-block;
                  width: 2rem;
                  height: 1.9rem;
                  background: url("../../../static/img/20_ic_libao.png") no-repeat;
                  background-size: contain;
                  border-radius: .5rem;
                }
                .gift_li_center{
                  display: flex;
                  flex-direction: column;
                  .gift_name{
                    line-height: 1rem;
                  }
                  .gift_surplus{
                    margin-top: .5rem;
                    width: 8rem;
                    height: .3rem;
                    border: 1px solid @color-green;
                    border-radius: .3rem;
                    overflow: hidden;
                    i{
                      display: block;
                      width: 0;
                      height: 100%;
                      background: @color-green;
                    }
                  }
                }
                .gift_li_right{
                  display: inline-block;
                  width: 4rem;
                  height: 1.6rem;
                  line-height: 1.6rem;
                  text-align: center;
                  font-size: .83rem;
                  color: #ffffff;
                  border-radius: .8rem;
                  background-color: @color-green;
                }
              }
            }
          }
          .user_account{
            width: 100%;
            flex: 1;
            .user_account_top{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              .user_logo{
                margin-top: 2.5rem;
                width: 4rem;
                height: 4rem;
                border-radius: 50% 50%;
              }
              .user_name{
                margin: .7rem 0;
                font-weight: 600;
              }
              .user_coin{
                height: 1.8rem;
                line-height: 1rem;
                border-radius: .5rem;
                padding: 0 .5rem;
                color: #ffffff;
                background-color: #5ebb44;
                position: absolute;
                left: 1rem;
                top: 1rem;
                display: flex;
                align-items: center;
                .icon_ptb{
                  width: 1rem;
                  height: 1rem;
                }
              }
              .h5_icon_set{
                display: inline-block;
                width: 1.5rem;
                height: 1.5rem;
                background: url("../../../static/img/19_ic_shezhi.png") no-repeat;
                background-size: contain;
                position: absolute;
                right: 1rem;
                top: 1rem;
              }
            }
            .user_account_bottom{
              margin: 1rem 0 0;
              display: flex;
              align-items: center;
              justify-content: space-around;
              .user_account_bottom_li{
                width: 33%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .user_account_bottom_li_icon{
                  width: 100%;
                  height: 2rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  .h5_icon_record{
                    display: inline-block;
                    width: 1rem;
                    height: 1.4rem;
                    background: url("../../../static/img/07_czjl.png") no-repeat;
                    background-size: contain;
                  }
                  .h5_icon_notice{
                    display: inline-block;
                    width: 1.2rem;
                    height: 1.2rem;
                    background: url("../../../static/img/08_ic_zxgg.png") no-repeat;
                    background-size: contain;
                  }
                  .h5_icon_mail{
                    display: inline-block;
                    width: 1.2rem;
                    height: 1.2rem;
                    background: url("../../../static/img/09_ic_wtfk.png") no-repeat;
                    background-size: contain;
                  }
                }
              }
            }
          }
        }
        .user_footer{
          height: 4rem;
          /*padding: 0 .5rem;*/
          border-top: 1px solid #dddddd;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .user_footer_li{
            width: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .user_footer_li_icon{
              width: 100%;
              height: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              .h5_icon_user,.h5_icon_user_on{
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                background: url("../../../static/img/11_ic_zh_an.png") no-repeat;
                background-size: contain;
              }
              .h5_icon_user_on{
                background: url("../../../static/img/10_ic_zh.png") no-repeat;
                background-size: contain;
              }
              .h5_icon_gift,.h5_icon_gift_on{
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                background: url("../../../static/img/13_ic_libao_an.png") no-repeat;
                background-size: contain;
              }
              .h5_icon_gift_on{
                background: url("../../../static/img/12_ic_libao.png") no-repeat;
                background-size: contain;
              }
              .h5_icon_back{
                display: inline-block;
                width: 1.2rem;
                height: 1rem;
                background: url("../../../static/img/17_ic_dengchu_an.png") no-repeat;
                background-size: contain;
              }
            }
          }
        }
      }
      .pay{
        position: fixed;
        background-color: #f0f0f0;
        top: 50%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        padding: .2rem;
        width: 23rem;
        height: 19rem;
        border-radius: .5rem;
        overflow: hidden;
        display: flex;
        /*position: relative;*/
        .pay_left{
          background-color: #ffffff;
          width: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .pay_type{
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .pay_icon{
              width: 100%;
              height: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .pay_name{
              font-size: .83rem;
              line-height: 1.5rem;
            }
          }
        }
        .pay_right{
          flex: 1;
          height: 100%;
          /*background-color: #f0f0f0;*/
          overflow-y: auto;
          .pay_box{
            padding: .5rem;
            font-size: .83rem;
            line-height: 1.4rem;
            /*width: 100%;*/
            /*display: flex;*/
            /*flex-direction: column;*/
            /*justify-content: center;*/
            /*align-items: center;*/
            .pay_box_btns{
              margin: 1rem 0 .2rem;
              display: flex;
              justify-content: space-between;
            }
            .pay_sums{
              display: flex;
              /*flex-wrap: wrap;*/
              margin-bottom: .5rem;
              span{
                display: inline-block;
                width: 3.3rem;
                height: 2rem;
                text-align: center;
                line-height: 2rem;
                border-radius: .5rem;
                border: 1px solid #999;
                margin-left: 1rem;
              }
              span:first-child{
                margin-left: 0;
              }
              .pay_sum_on{
                border-radius: 1rem;
                color: #ffffff;
                background-color: @color-green;
                border: 1px solid @color-green;
              }
            }
            .pay_inputs{
              .pay_input{
                display: flex;
                background-color: #ffffff;
                border-radius: .3rem;
                margin-bottom: .5rem;
                overflow: hidden;
                input{
                  flex: 1;
                  height: 2rem;
                  border: none;
                  margin-left: .2rem;
                }
              }
            }
          }
          .pay_box1{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .pay_msg{
              margin: 2.5rem 0;
            }
          }
        }
      }
      .pay_rank{
        .h5_main{
          height: 16rem;
        }
      }
      .activity{
        .h5_main{
          height: 16rem;
        }
      }
      .activity_info{
        height: 35rem;
        .h5_title{
          background: #ffffff;
        }
        .h5_main{
          padding: 0 .5rem;
          .activity_info_title{
            /*text-align: center;*/
          }
        }
      }
      .question_list{
        .h5_main{
          height: 16rem;
        }
      }
      .question_info{
        width: 100%;
        height: 100%;
        border-radius: 0;
        .h5_main{
          /*height: 30rem;*/
          margin: .5rem;
          display: flex;
          flex-direction: column;
          .qi_info{
            height: 7rem;
            line-height: 1.2rem;
            padding: .2rem .3rem;
            border: 1px solid #bbbbbb;
            border-radius: .5rem;
            overflow-y: auto;
          }
          .reply_list{
            flex: 1;
            margin: .5rem 0;
            height: 6rem;
            line-height: 1.2rem;
            padding: .2rem .3rem;
            border: 1px solid #bbbbbb;
            border-radius: .5rem;
            overflow-y: auto;
            .reply_my{
              text-align: right;
            }
          }
          .add_comment{
            /*height: 3rem;*/
            display: flex;
            align-items: center;
            font-size: 1rem;
            input{
              height: 1.8rem;
              flex: 1;
              border: 1px solid #cccccc;
              border-radius: .3rem;
              padding-left: .3rem;
            }
          }
        }
      }
      .add_question{
        width: 100%;
        height: 100%;
        border-radius: 0;
        .h5_main{
          margin: .5rem;
          display: flex;
          flex-direction: column;
          .aq_input{
            /*height: 2.5rem;*/
            display: flex;
            align-items: center;
            input{
              flex: 1;
              height: 2rem;
              padding-left: .3rem;
              border: 1px solid #cccccc;
              border-radius: .3rem;
            }
          }
          .aq_type{
            border: 1px solid #cccccc;
            border-radius: .5rem;
          }
          .aq_desc{
            flex: 1;
            border: 1px solid #cccccc;
            border-radius: .5rem;
            padding-left: .3rem;
          }
          .aq_desc_btn{
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            border-radius: .5rem;
            color: #ffffff;
            background-color: @color-green;
            margin: .5rem 1.5rem 0;
          }
        }
      }
      .options{
        .h5_main{
          height: 16rem;
          .h5_li{
            height: 3rem;
          }
        }
      }
      .bind_mobile{
        background-color: #f0f0f0;
        .h5_main{
          height: 9rem;
          padding: 0 1rem;
          .bm_input{
            height: 2rem;
            background-color: #ffffff;
            border: 1px solid #bbbbbb;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            overflow: hidden;
            margin-top: .5rem;
            .bm_input_text{
              width: 3rem;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              border-right: 1px solid #bbbbbb;
              margin-right: .3rem;
            }
            .bm_input_cont{
              flex: 1;
              border: none;
            }
            .bm_input_btn{
              width: 7.5rem;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              border-left: 1px solid #bbbbbb;
            }
          }
        }
      }
      .bind_mobile2{
        .bm_input_cont{
          margin-left: .5rem;
        }
      }
      .modify_pass{
        background-color: #f0f0f0;
        .h5_main{
          padding: 1rem;
        }
      }
      .id_auth{
        background-color: #f0f0f0;
        .h5_main{
          padding: 1rem;
          .h5_input_cont{
            padding-left: .5rem;
          }
          .auth_state{
            display: flex;
            align-items: center;
          }
          .auth_info{
            margin: 1rem 0;
            padding: 1rem;
            border: 1px solid #bbbbbb;
            border-radius: .5rem;
          }
        }
        .h5_footer{
          display: flex;
          align-items: center;
          height: 3rem;
        }
      }
    }
  }
</style>
