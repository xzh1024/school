import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

import Go from '../components/go.vue'
import Game from '../components/game/Game.vue'
import NewGame from '../components/game/newgame/newGame.vue' //新游-BT
import ClosedBeta from '../components/game/newgame/closedBeta/closedBeta.vue' //内测游戏-BT
import Reservation from '../components/game/newgame/reservation/reservation.vue' //预约游戏-BT
import RankingList from '../components/game/rankingList/rankingList.vue' //排行榜
import FullV from '../components/game/BT/fullV/fullV.vue' //满V游戏
import Activity from '../components/game/BT/activity/activity.vue' //活动中心
import ClassIfy from '../components/game/classify/classIfy.vue' //分类
import ClassInfo from '../components/game/classify/classinfo/classInfo.vue' //游戏分类详情
import GameInfo from '../components/gameinfo/gameInfo.vue'  //游戏详情
import PlayGames from '../components/gameinfo/playGames/playGames.vue'  //h5游戏
import Questions from '../components/gameinfo/questions/questions.vue' //游戏问答
import QuestionsInfo from '../components/gameinfo/questions/questionsInfo.vue' //游戏问答详情
import Search from '../components/search/search.vue' //搜索

import ActivityInfo from '../components/activityInfo/activityInfo.vue' //活动详情
import OpenList from '../components/openList/openList.vue' //开服表

// import NewGameDIS from '../components/game/DIS/newgame/newGameDIS.vue' //新游-折扣
// import ClosedBetaDIS from '../components/game/DIS/newgame/closedBeta/closedBetaDIS.vue' //内测游戏-折扣
// import ReservationDIS from '../components/game/DIS/newgame/reservation/reservationDIS.vue' //预约游戏-折扣
// import ActivityDIS from '../components/game/DIS/activity/activityDIS.vue' //活动中心-折扣
import LowDis from '../components/game/DIS/lowDis/lowDIS.vue' //超低折扣-折扣
// import RankingListDIS from '../components/game/DIS/rankingList/rankingListDIS.vue' //排行榜-折扣
// import OpenListDIS from '../components/game/DIS/openList/openListDIS.vue' //开服表-折扣
// import ClassIfyDIS from '../components/game/DIS/classify/classIfyDIS.vue' //游戏分类详情-折扣
// import ClassInfoDIS from '../components/game/DIS/classify/classinfo/classInfoDIS.vue' //游戏分类详情-折扣
// import SearchDIS from '../components/searchDIS/searchDIS.vue' //搜索-折扣

import Transaction from '../components/transaction/transaction.vue' //账号交易
import TraNotice from '../components/transaction/traNotice/traNotice.vue' //交易-须知
import TraLogin from '../components/transaction/traUser/traLogin.vue' //交易-登录
import TraEnroll from '../components/transaction/traUser/traEnroll.vue' //交易-注册
import TraFindPassword from '../components/transaction/traUser/traFindPassword.vue' //交易-忘记密码
import TraAccounts from '../components/transaction/traUser/traAccounts.vue' //交易-账号
import TraChangePassword from '../components/transaction/traUser/traChangePassword.vue' //交易-修改密码
import TraBindSdkuser from '../components/transaction/traBindSdkuser/traBindSdkuser.vue' //交易-添加关联账号
import TraService from '../components/transaction/traService/traService.vue' //交易-客服中心
import TraAlipayAccount from '../components/transaction/traUser/traAlipayAccount.vue' //交易-支付宝账号
import TraSellProduct from '../components/transaction/traSellProduct/traSellProduct.vue' //交易-我要卖号
import TraProductStatus from '../components/transaction/traProductStatus/traProductStatus.vue' //交易-交易记录
import TraProductInfo from '../components/transaction/traProductInfo/traProductInfo.vue' //交易-商品详情
import TraProductBuy from '../components/transaction/traProductBuy/traProductBuy.vue' //交易-购买商品
// import TraSearch from '../components/transaction/traSearch/traSearch.vue' //交易-商品搜索

// import RankingList from '../components/rankinglist/rankingListDIS.vue' //排行榜
import Invite from '../components/invite/invite.vue' //邀请好友
import InviteRankingList from '../components/invite/rankinglist/rankingList.vue' //邀请好友排行榜
import RankingListKnow from '../components/invite/rankinglist/rankingListKnow.vue' //邀请好友排行榜须知
// import OpenList from '../components/openlist/openList1.vue'  //开服表

import GameCommentList from '../components/gameinfo/gameCommentList/gameCommentList.vue'  //游戏评论列表
// import GameStrategy from '../components/gameinfo/strategyList/gameStrategy/gameStrategy.vue'//游戏攻略


import Gift from '../components/gift/gift.vue'  //礼包中心
import SearchKAC from '../components/searchKAC/searchKAC.vue' //搜索礼包
import GiftInfo from '../components/giftinfo/giftInfo.vue'  //礼包详情
import Drive from '../components/drive/drive.vue' //开车
import DriveInfo from '../components/drive/driveInfo/driveInfo.vue' //开车详情
import DriveGo from '../components/drive/driveGo/driveGo.vue' //发表
import Thru from '../components/drive/thru/thru.vue' //穿越

import My from '../components/my/my.vue' //我的

import Task from '../components/my/task/task.vue' //任务中心
import UserInfo from '../components/userinfo/userInfo.vue' //用户信息
import Edit from '../components/userinfo/edit/edit.vue' //编辑资料
import EditStatic from '../components/userinfo/edit/editStatic.vue' //司机资料

import Goldcoin from '../components/my/goldcoin/goldCoin.vue' //金币中心
import GoldInfo from '../components/my/goldinfo/goldInfo.vue' //金币明细
import GoldLottery from '../components/my/goldlottery/goldLottery.vue' //金币抽奖
import Prize from '../components/my/goldlottery/prize/prize.vue' //我的奖品


import PlatcoinInfo from '../components/my/platcoininfo/platcoinInfo.vue' //平台币明细
import News from '../components/my/news/news.vue' //我的消息
import NewsInfo from '../components/my/news/newsInfo.vue' //消息详情
import Service from '../components/my/service/service.vue' //客服中心
import Signing from '../components/my/signing/signing.vue' //签到
import GameQuestion from '../components/my/gameQuestion/gameQuestion.vue' //游戏问答
import MyAnswering from '../components/my/gameQuestion/myAnswering/myAnswering.vue' //我的回答
import MyQuestions from '../components/my/gameQuestion/myQuestions/myQuestions.vue' //我的提问
import QaNorm from '../components/my/gameQuestion/qaNorm.vue' //问答规范
import Exchange from '../components/my/exchange/exchange.vue' //平台币兑换

import Detail from '../components/my/detail/detail.vue' //货币明细
import Rebate from '../components/my/rebate/rebate.vue' //申请返利
import RebateKnow from '../components/my/rebate/rebateKnow.vue' //返利须知
import Turn from '../components/my/turn/turn.vue' //转游申请
import TurnKnow from '../components/my/turn/turnKnow.vue' //转游须知

import MyGift from '../components/my/myGift/gift.vue' //我的礼包
import Collect from '../components/my/collect/collect.vue' //我的收藏
import AboutUs from '../components/my/aboutUs/aboutUs.vue' //关于我们


import Vips from '../components/my/vips/vips.vue' //会员充值

import Login from '../components/user/login/login.vue' //用户登录
import Agreement from '../components/user/agreement.vue' //用户协议
import Enroll from '../components/user/enroll/enroll.vue'  //手机号注册
import EnrollUsername from '../components/user/enroll/enrollUsername.vue' //用户名注册
import Findpwd from '../components/user/findpwd/findpwd.vue' //找回密码
import Newpwd from '../components/user/findpwd/newpwd.vue' //找回密码-新密码
import Passwd from '../components/user/findpwd/passwd.vue' //修改密码
import Accounts from '../components/user/accounts/accounts.vue' //账号管理
import BindPhone from '../components/user/accounts/bindPhone.vue' //绑定手机号
import UntiePhone from '../components/user/accounts/untiePhone.vue' //解绑手机号



Vue.use(Router)
const $router = new Router({
  mode:"history",
  routes: [
	  {
      path: '/',  // 默认进入路由
      redirect: '/index/game'   //重定向
	 	},
    {
      path: '/index',
      name: 'index',
      redirect: '/index/game',   //重定向
      component: Go,
      meta:{
        title: 'index',
        index: 0
      },
      children: [
        {
          path: 'game',
          name: 'game',
          component: Game,
          meta:{
            title: '首页',
            index: 1
          }
        },
        {
          path: 'transaction',
          name: 'transaction',
          component: Transaction,
          meta:{
            title: '账号交易',
            index: 2
          }
        },
        {
          path: 'drive',
          name: 'drive',
          component: Drive,
          meta:{
            title: '开车',
            index: 4
          }
        },
        {
          path: 'myMsg',
          name: 'myMsg',
          component: My,
          meta:{
            title: '我的',
            index: 5,
            keepAlive: true,
          }
        },
      ]
    },
    {
      path: '/thru',
      name: 'thru',
      component: Thru,
      meta:{
        title: '穿越',
        index: 10
      }
    },
    // {
    //   path: '/game',
    //   name: 'game',
    //   component: Game,
    //   meta:{
    //     title: '首页',
    //     index: 2
    //   }
    // },
    {
      path: '/open_list/:type',
      name: 'openList',
      component: OpenList,
      meta:{
        title: '开服表',
        index: 10
      }
    },
    {
      path: '/fullV',
      name: 'fullV',
      component: FullV,
      meta:{
        title: '满V游戏',
        index: 10
      }
    },
    {
      path: '/low_dis',
      name: 'lowDis',
      component: LowDis,
      meta:{
        title: '超低折扣',
        index: 10
      }
    },
    {
      path: '/new_game/:type',
      name: 'newGame',
      component: NewGame,
      meta:{
        title: '新游',
        index: 10
      }
    },
    {
      path: '/closed_beta',
      name: 'closedBeta',
      component: ClosedBeta,
      meta:{
        title: '内测游戏-BT',
        index: 11
      }
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation,
      meta:{
        title: '预约游戏-BT',
        index: 11
      }
    },
    {
      path: '/class_ify/:type/:topgame',
      name: 'classIfy',
      component: ClassIfy,
      meta:{
        title: '分类-BT',
        index: 10
      }
    },
	  {
      path: '/ranking_list/:type',
      name: 'rankingList',
      component: RankingList,
      meta:{
        title: '排行榜',
        // index: 10
        index: 80
      }
	  },
    {
      path: '/class_info/:id/:name/:type',
      name: 'classInfo',
      component: ClassInfo,
      meta:{
        title: '分类详情-BT',
        index: 11
      }
    },
    {
      path: '/drive_info/:id',
      name: 'driveInfo',
      component: DriveInfo,
      meta:{
        title: '开车详情',
        index: 12
      }
    },
    {
      path: '/drive_go',
      name: 'driveGo',
      component: DriveGo,
      meta:{
        title: '发表',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite,
      meta:{
        title: '邀请好友',
        // index: 101
        index: 201
      }
    },
    {
      path: '/invite_ranking_list',
      name: 'inviteRankingList',
      component: InviteRankingList,
      meta:{
        title: '邀请好友排行',
        // index: 102,
        index: 202,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/ranking_list_know',
      name: 'rankingListKnow',
      component: RankingListKnow,
      meta:{
        title: '邀请好友排行须知',
        index: 103,
      }
    },
	  {
      path: '/game_info',
      name: 'game_info',
      component: GameInfo,
      meta:{
        title: '游戏详情',
        // index: 110
        index: 90
      }
	  },
    {
      path: '/play_games',
      name: 'playGames',
      component: PlayGames,
      meta:{
        title: 'H5游戏',
        index: 120,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        customer: true
      }
	  },
    {
      path: '/questions/:id',
      name: 'questions',
      component: Questions,
      meta:{
        title: '游戏问答',
        index: 115,
        // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
	  },
    {
      path: '/questions_info/:consultId',
      name: 'questionsInfo',
      component: QuestionsInfo,
      meta:{
        title: '游戏问答详情',
        index: 116,
        // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
	  },
    {
      path: '/game_comment_list/:id',
      name: 'gameCommentList',
      component: GameCommentList,
      meta:{
        title: '游戏评论列表',
        index: 111
      }
    },
    {
      path: '/search/:type/:topgame',
      name: 'search',
      component: Search,
      meta:{
        title: '搜索游戏-BT',
        index: 30
      }
    },
    {
      path: '/searchKAC',
      name: 'searchKAC',
      component: SearchKAC,
      meta:{
        title: '搜索游戏礼包',
        index: 30
      }
    },
    {
      path: '/gift_info/:pid',
      name: 'giftInfo',
      component: GiftInfo,
      meta:{
        title: '礼包详情',
        index: 111,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/gift',
      name: 'gift',
      component: Gift,
      meta:{
        title: '礼包中心',
        index: 29
      }
    },
    {
      path: '/user_info/:buid',
      name: 'userInfo',
      component: UserInfo,
        meta:{
          title: '个人详情',
          index: 100,
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
      meta:{
        title: '编辑资料',
        index: 101,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/edit_static/:id',
      name: 'editStatic',
      component: EditStatic,
      meta:{
        title: '司机资料',
        index: 101,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      meta:{
        title: '任务中心',
        index: 99,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/gold_coin',
      name: 'goldCoin',
      component: Goldcoin,
      meta:{
        title: '金币中心',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/gold_info',
      name: 'goldInfo',
      component: GoldInfo,
      meta:{
        title: '金币明细',
        index: 102,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/gold_lottery',
      name: 'goldLottery',
      component: GoldLottery,
      meta:{
        title: '金币抽奖',
        index: 101,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/prize',
      name: 'prize',
      component: Prize,
      meta:{
        title: '我的奖品',
        index: 102,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/platcoin_info',
      name: 'platcoinInfo',
      component: PlatcoinInfo,
      meta:{
        title: '平台币明细',
        index: 102,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta:{
        title: '我的消息',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/news_info/:msgid/:action',
      name: 'newsInfo',
      component: NewsInfo,
      meta:{
        title: '消息详情',
        index: 101,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/service',
      name: 'service',
      component: Service,
      meta:{
        title: '客服中心',
        index: 210
      }
    },
    {
      path: '/signing',
      name: 'signing',
      component: Signing,
      meta:{
        title: '签到',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/game_question',
      name: 'gameQuestion',
      component: GameQuestion,
      meta:{
        title: '游戏问答',
        index: 113,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/my_answering',
      name: 'myAnswering',
      component: MyAnswering,
      meta:{
        title: '我的回答',
        index: 114,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/my_questions',
      name: 'myQuestions',
      component: MyQuestions,
      meta:{
        title: '我的提问',
        index: 113,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/qa_norm',
      name: 'qaNorm',
      component: QaNorm,
      meta:{
        title: '问答规范',
        index: 114,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: Exchange,
      meta:{
        title: '平台币兑换',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta:{
        title: '货币明细',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/rebate',
      name: 'rebate',
      component: Rebate,
      meta:{
        title: '申请返利',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/rebate_know',
      name: 'rebateKnow',
      component: RebateKnow,
      meta:{
        title: '返利须知',
        index: 101
      }
    },
    {
      path: '/turn',
      name: 'turn',
      component: Turn,
      meta:{
        title: '申请转游',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/turn_know',
      name: 'turnKnow',
      component: TurnKnow,
      meta:{
        title: '转游须知',
        index: 101
      }
    },
    {
      path: '/my_gift',
      name: 'myGift',
      component: MyGift,
      meta:{
        title: '我的礼包',
        index: 30,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/collect',
      name: 'collect',
      component: Collect,
      meta:{
        title: '我的收藏',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/about_us',
      name: 'aboutUs',
      component: AboutUs,
      meta:{
        title: '关于我们',
        index: 100
      }
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity,
      meta:{
        title: '活动中心-BT',
        index: 10
      }
    },
    // {
    //   path: '/activity_dis',
    //   name: 'activityDIS',
    //   component: ActivityDIS,
    //   meta:{
    //     title: '活动中心-折扣',
    //     index: 10
    //   }
    // },
    {
      path: '/activity_info/:tid/:title',
      name: 'activityInfo',
      component: ActivityInfo,
      meta:{
        title: '活动详情',
        index: 115
      }
    },
    {
      path: '/vips',
      name: 'vips',
      component: Vips,
      meta:{
        title: 'vip',
        index: 100,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title: '登录',
        index: 200
      }
    },
    {
      path: '/enroll',
      name: 'enroll',
      component: Enroll,
      meta:{
        title: '手机号注册',
        index: 201
      }
    },
    {
      path: '/enrollUsername',
      name: 'enrollUsername',
      component: EnrollUsername,
      meta:{
        title: '用户名注册',
        index: 202
      }
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: Agreement,
      meta:{
        title: '用户协议',
        index: 203
      }
    },
    {
      path: '/findpwd',
      name: 'findpwd',
      component: Findpwd,
      meta:{
        title: '找回密码',
        index: 201
      }
    },
    {
      path: '/newpwd/:id/:token',
      name: 'newpwd',
      component: Newpwd,
      meta:{
        title: '找回密码-新密码',
        index: 202
      }
    },
    {
      path: '/passwd',
      name: 'passwd',
      component: Passwd,
      meta:{
        title: '修改密码',
        index: 201,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts,
      meta:{
        title: '账号管理',
        index: 199,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/bind_phone',
      name: 'bindPhone',
      component: BindPhone,
      meta:{
        title: '绑定手机号',
        index: 201,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/untie_phone',
      name: 'untiePhone',
      component: UntiePhone,
      meta:{
        title: '解绑手机号',
        index: 201,
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/tra_notice',
      name: 'traNotice',
      component: TraNotice,
      meta:{
        title: '交易-须知',
        index: 101
      }
    },
    {
      path: '/tra_login',
      name: 'traLogin',
      component: TraLogin,
      meta:{
        title: '交易-登录',
        index: 200
      }
    },
    {
      path: '/tra_enroll',
      name: 'traEnroll',
      component: TraEnroll,
      meta:{
        title: '交易-注册',
        index: 201
      }
    },
    {
      path: '/tra_find_password',
      name: 'traFindPassword',
      component: TraFindPassword,
      meta:{
        title: '交易-忘记密码',
        index: 210
      }
    },
    {
      path: '/tra_accounts',
      name: 'traAccounts',
      component: TraAccounts,
      meta:{
        title: '交易-账号',
        index: 199,
        tarAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      }
    },
    {
      path: '/tra_change_password',
      name: 'traChangePassword',
      component: TraChangePassword,
      meta:{
        title: '交易-修改密码',
        index: 210,
        tarAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/tra_bind_sdkuser',
      name: 'traBindSdkuser',
      component: TraBindSdkuser,
      meta:{
        title: '交易-添加关联账号',
        index: 202,
        tarAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/tra_service',
      name: 'traService',
      component: TraService,
      meta:{
        title: '交易-客服中心',
        index: 210,
        tarAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/tra_alipay_account/:type',
      name: 'traAlipayAccount',
      component: TraAlipayAccount,
      meta:{
        title: '交易-支付宝账号',
        index: 202,
        tarAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/tra_sell_product/:gamename/:sdkUsername/:system/:appid',
      name: 'traSellProduct',
      component: TraSellProduct,
      meta:{
        title: '交易-支付宝账号',
        index: 203,
        tarAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/tra_product_status',
      name: 'traProductStatus',
      component: TraProductStatus,
      meta:{
        title: '交易-交易记录',
        index: 203,
        tarAuth: true,
      }
    },
    {
      path: '/tra_product_info/:id',
      name: 'traProductInfo',
      component: TraProductInfo,
      meta:{
        title: '交易-商品详情',
        index: 108,
        tarAuth: true,
      }
    },
    {
      path: '/tra_product_buy/:id',
      name: 'traProductBuy',
      component: TraProductBuy,
      meta:{
        title: '交易-购买商品',
        index: 109,
        tarAuth: true,
      }
    },
    // {
    //   path: '/tra_search',
    //   name: 'traSearch',
    //   component: TraSearch,
    //   meta:{
    //     title: '交易-商品搜索',
    //     index: 202,
    //   }
    // },
    {
      path: '**',   // 错误路由
      redirect: '/index/game'   //重定向
    }
  ],
  linkActiveClass:'active',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keep) {
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // }
});
$router.beforeEach((to, from, next) => {
  // console.log(to.query);
  if(to.meta.requireAuth){  // 判断该路由是否需要登录权限
    // console.log(store)
    // store.dispatch('getUser');
    // next();
    // console.log(Vue.prototype.getToken('sy185_user'))
    // console.log(Vue.prototype);
    //获取登录状态
    // Vue.prototype.$http.get('/api/index.php?g=api&m=userbox&a=get_user_info')
    //   .then(response => {
    //     var datas = response.data;
    //     if(datas.status == 1){//1成功
    //       if(datas.data){//已登陆
    //         store.dispatch('getUser');
    //         next();
    //       } else {
    //         store.dispatch('removeUser');
    //         next({
    //           path: '/login',
    //           // params: {redirect: to.fullPath},
    //           query: {redirect: to.fullPath},  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //           // replace: true
    //         })
    //       }
    //     } else if(datas.status == 0){//0失败
    //       store.dispatch('removeUser');
    //       next({
    //         path: '/login',
    //         // params: {redirect: to.fullPath},
    //         query: {redirect: to.fullPath},  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //         // replace: true
    //       })
    //       console.log('请求失败：' + datas.msg);
    //     }
    //   })
    //   .catch(error => {
    //     console.log('请求失败：' + error.status + '，' + error.statusText);
    //   });

    if (Base64.decode(Vue.prototype.myType.getCookie('sy185_user_token')) == Vue.prototype.myType.sy185_user_token) {  // 通过vuex state获取当前的token是否存在
      // Vue.prototype.myType.setCookie('sy185_user', Vue.prototype.myType.sy185_user_token);
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath},  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // replace: true
      })
    }
  }
  if(to.meta.tarAuth){
    if (Vue.prototype.myType.getCookie('sy185_tra_user_token') && Base64.decode(Vue.prototype.myType.getCookie('sy185_tra_user_token')) == Vue.prototype.myType.sy185_tra_user_token){
      next();
    } else {
      next({
        path: '/tra_login',
        query: {redirect: to.fullPath},  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // replace: true
      })
    }
  }
  next();
});
export default $router


