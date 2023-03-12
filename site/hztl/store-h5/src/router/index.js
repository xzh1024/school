import Vue from "vue";
import Vconsole from "vconsole";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import wx from "weixin-js-sdk";
import axios from "axios";
import * as envConfig from "envConfigPath";
import { getDomainParse } from "@/api/common";
import { wxSign } from "@/api/wx";

import { JSAPIList, ToURL } from "../common/wechat";

Vue.use(VueRouter);

getInfo();
const router = new VueRouter({
  mode: "history",
  base: envConfig.routerPrefix,
  routes: []
});
let count = 0;
router.beforeEach((to, from, next) => {
  if (from.path) {
    //存储from.path，返回按钮时调用该path
    Vue.prototype.fromPath = from.path;
  }
  if (to.query && to.query.withVConsole) {
    let vConsole = new Vconsole();
    Vue.use(vConsole);
  }

  // 登录状态
  Vue.prototype.hasCookie = localStorage.hasCookie;
  
  if (IsPC()) {
    //IsPC()
    if (location.hostname.includes("hztl3.com")) {
      window.open("https://my.qa.hztl3.com/#/Building", "_self");
    } else if (location.hostname.includes("srgou.com")) {
      window.open("https://my.srgou.com/#/Building", "_self");
    } else {
      next();
    }
  } else {
    // 配置微信JSSDK
    setWXConfig(to);
    count++;
    //在这里添加一个路由守卫，判断登录状态，没有登录状态强制跳转到登录页面
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //   XXX: 修复iOS版微信HTML5 History兼容性问题
    if (
      isiOS &&
      to.path == "/issueFriendCircle" &&
      to.path !== location.pathname && 
      count == 1
    ) {
      // 此处不可使用location.replace
      if (location.href.split("?").length > 1) {
        location.assign(to.path + "?" + location.href.split("?")[1]);
      } else {
        let pathUrl = envConfig.routerPrefix+to.path;
        history.pushState(null,'朋友圈',pathUrl);
        // location.assign(location.pathname);
      }
    }

    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      if (axios.prototype.defaultTitle) {
        document.title = axios.prototype.defaultTitle;
      } else {
        document.title = to.meta.title;
      }
    }
    // if ((to.name == "bindPhone" || to.name == "bindInfomation") && Vue.prototype.hasCookie) {
    //   next({
    //     path: '/home',
    //   });
    // }
    if (to.name == "login") {
      if (localStorage.getItem("remenberUrl")) {
        next();
      } else {
        if (from.name == "home") {
          if (typeof WeixinJSBridge != "undefined") {
            WeixinJSBridge.call("closeWindow");
          } else {
            if (navigator.userAgent.indexOf("MSIE") > 0) {
              if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                window.opener = null;
                window.close();
              } else {
                window.open("", "_top");
                window.top.close();
              }
            } else if (navigator.userAgent.indexOf("Firefox") > 0) {
              window.location.href = "about:blank ";
            } else {
              window.opener = null;
              window.open("", "_self", "");
              window.close();
            }
          }
        } else if (from.name) {
          next({
            path: "/home"
          });
        } else {
          next();
        }
      }
    } else {
      if (to.meta.requireAuth) {
        if (Vue.prototype.hasCookie) {
          next();
        } else {
          next({ name: "passwordLogin" });
        }
      } else {
        next();
      }
    }
  }
});

function setWXConfig(to) {
  let jsapiList = JSAPIList(to.path);
  if (jsapiList.length) {
    wxSign({
      url: ToURL(to.fullPath)
    }).then(res => {
      wx.config({
        debug: false, // 开启调试模式,
        appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: jsapiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
  }
}

function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function addRoutes(infoObj) {
  const routes = [
    // 登陆注册
    {
      path: "*",
      redirect: infoObj.firstPage
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/Login.vue"),
      meta: {
        title: "微信授权"
      }
    },
    {
      path: "/bindPhone",
      name: "bindPhone",
      component: () => import("../views/register/BindPhone.vue"),
      meta: {
        title: "注册账号"
      }
    },
    {
      path: "/bindInfomation",
      name: "bindInfomation",
      component: () => import("../views/register/BindInfomation.vue"),
      meta: {
        title: "完善资料"
      }
    },
    {
      path: "/Managementverification",
      name: "Managementverification",
      component: () => import("../views/register/Managementverification.vue"),
      meta: {
        title: "管理验证",
        keepAlive: true
      }
    },
    {
      path: "/acountSell",
      name: "acountSell",
      component: () => import("../views/register/acountSell.vue"),
      meta: {
        title: "注册企业",
        keepAlive: true
      }
    },
    {
      path: "/corporateInfor",
      name: "corporateInfor",
      component: () =>
        import("../views/mine/corporateInfor/corporateInfor.vue"),
      meta: {
        title: "企业资料"
      }
    },
    {
      path: "/picCard",
      name: "picCard",
      component: () => import("../views/register/picCard.vue"),
      meta: {
        title: "我的"
      }
    },
    {
      path: "/brandManage",
      name: "brandManage",
      component: () => import("../views/mine/brandManage/brandManage.vue"),
      meta: {
        title: "经营范围"
      }
    },
    {
      path: "/brandManageAdd",
      name: "brandManageAdd",
      component: () => import("../views/mine/brandManage/brandManageAdd.vue"),
      meta: {
        title: "选择添加的品牌"
      }
    },
    {
      path: "/registerRegulation",
      name: "registerRegulation",
      component: () => import("../views/register/RegisterRegulation.vue"),
      meta: {
        title: "用户服务协议"
      }
    },
    // 工单
    {
      path: "/RepairOrder",
      name: "RepairOrder",
      component: () =>
        import("../../store-common/RepairInstall/RepairOrder.vue"),
      meta: {
        title: "我的工单"
      }
    },
    // 预约
    {
      path: "/myRepair",
      name: "myRepair",
      component: () =>
        import("../../store-common/RepairInstall/myRepair.vue"),
      meta: {
        title: "我的预约"
      }
    },
    // 首页
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        title: infoObj.title
      }
    },
    {
      path: "/receipt",
      name: "receipt",
      component: () => import("../views/receipt/Receipt.vue"),
      meta: {
        title: "报价"
      }
    },
    {
      path: "/receipt/detail",
      name: "receiptDetail",
      component: () => import("../views/receipt/ReceiptDetail.vue"),
      meta: {
        title: "报价详情"
      }
    },
    //询价
    {
      path: "/downloadTemplate",
      name: "downloadTemplate",
      component: () => import("../views/Inquiry/downloadTemplate.vue"),
      meta: {
        title: "请在浏览器中打开"
      }
    },
    {
      path: "/post_Inquiry",
      name: "post_Inquiry",
      component: () => import("../views/Inquiry/post_Inquiry.vue"),
      meta: {
        title: "发布询价",
        keepAlive: true
      }
    },
    {
      path: "/Inquiry",
      name: "Inquiry",
      component: () => import("../views/Inquiry/Inquiry.vue"),
      meta: {
        title: "我的询价单"
      }
    },
    {
      path: "/InquiryDetail",
      name: "InquiryDetail",
      component: () => import("../views/Inquiry/InquiryDetail.vue"),
      meta: {
        title: "询价单详情"
      }
    },
    {
      path: "/VehicleClass",
      name: "VehicleClass",
      component: () => import("../views/Inquiry/VehicleClass.vue"),
      meta: {
        title: "整车分类"
      }
    },
    // 朋友圈
    {
      path: "/friendCircle",
      name: "friendCircle",
      meta: {
        title: "朋友圈"
      },
      component: () => import("../views/friend/FriendCircle.vue")
    },
    {
      path: "/issueFriendCircle",
      name: "issueFriendCircle",
      component: () =>
        import("../../store-common/friend/IssueFriendCircle.vue"),
      meta: {
        title: "编辑朋友圈"
      }
    },
    {
      path: "/friendDetail",
      name: "friendDetail",
      component: () => import("../../store-common/friend/FriendDetail.vue"),
      meta: {
        title: "朋友圈"
      }
    },
    // 配件
    {
      path: "/skuList",
      name: "skuList",
      component: () => import("../../store-common/sku/SkuList.vue"),
      meta: {
        title: "查询配件"
      }
    },
    // 购物车
    {
      path: "/cart",
      name: "cart",
      component: () => import("../../store-common/cart/Cart.vue"),
      meta: {
        title: "购物车"
      }
    },
    {
      path: "/skuDetail",
      name: "skuDetail",
      component: () => import("../../store-common/sku/SkuDetail.vue")
    },
    {
      path: "/skuGroupList",
      name: "skuGroupList",
      component: () => import("../../store-common/sku/SkuGroupList.vue")
    },
    {
      path: "/skuListByPromotion",
      name: "skuListByPromotion",
      component: () =>
        import("../../store-common/sku/SkuListByPromotion.vue"),
      meta: {
        title: infoObj.title
      }
    },
    {
      path: "/groupSkuDetailByPromotion",
      name: "groupSkuDetailByPromotion",
      component: () =>
        import("../../store-common/sku/GroupSkuDetailByPromotion.vue"),
      meta: {
        title: infoObj.title
      }
    },
    {
      path: "/SkuListByArea",
      name: "SkuListByArea",
      component: () => import("../../store-common/sku/SkuListByArea.vue"),
      meta: {
        title: infoObj.title
      }
    },
    // 订单
    {
      path: "/confirmOrder",
      name: "confirmOrder",
      component: () => import("../views/order/ConfirmOrder.vue"),
      meta: {
        title: "确认订单"
      }
    },
    {
      path: "/ConfirmOrderByWant",
      name: "ConfirmOrderByWant",
      component: () => import("../views/order/ConfirmOrderByWant.vue"),
      meta: {
        title: "确认订单"
      }
    },
    {
      path: "/orderList",
      name: "orderList",
      component: () => import("../views/order/OrderList.vue"),
      meta: {
        title: "我的订单",
        requireAuth: true
      }
    },
    {
      path: "/orderDetail",
      name: "orderDetail",
      component: () => import("../views/order/OrderDetail.vue"),
      meta: {
        title: "订单详情",
        keepAlive: true
      }
    },
    // 个人
    {
      path: "/mine",
      name: "mine",
      component: () => import("../views/mine/Mine.vue"),
      meta: {
        title: "我的"
      }
    },
    {
      path: "/mineSetting",
      name: "mineSetting",
      component: () => import("../views/mine/mineSetting/index.vue"),
      meta: {
        title: "设置",
        requireAuth: true
      }
    },
    {
      path: "/staffManage",
      name: "staffManage",
      component: () =>
        import("../views/mine/mineSetting/staffManage/index.vue"),
      meta: {
        title: "员工管理"
      }
    },
    {
      path: "/infomation",
      name: "infomation",
      component: () => import("../views/mine/infomation/Infomation.vue"),
      meta: {
        title: "我的"
      }
    },
    {
      path: "/address",
      name: "address",
      component: () => import("../views/mine/address/Address.vue"),
      meta: {
        title: "我的"
      }
    },
    {
      path: "/upsertAddress",
      name: "upsertAddress",
      component: () => import("../views/mine/address/UpsertAddress.vue"),
      meta: {
        title: "我的"
      }
    },
    {
      path: "/supplier",
      name: "supplier",
      component: () => import("../views/mine/supplier/Supplier.vue"),
      meta: {
        title: "我的供应商"
      }
    },
    {
      path: "/supplierPayment",
      name: "supplierPayment",
      component: () => import("../views/mine/supplier/SupplierPayment.vue"),
      meta: {
        title: "商家收款码"
      }
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/mine/account/Account.vue"),
      meta: {
        title: "账号与安全"
      }
    },
    {
      path: "/error",
      name: "error",
      component: () => import("../views/common/Error.vue"),
      meta: {
        title: "错误页"
      }
    },
    // 调试相关页面及组件
    {
      path: "/debug",
      name: "debug",
      component: () => import("../views/Debug.vue"),
      meta: {
        title: "Debug"
      }
    },
    {
      path: "/skuCardDemo",
      name: "skuCardDemo",
      component: () => import("../views/demo/SkuCardDemo.vue"),
      meta: {
        title: "SkuCard组件"
      }
    },
    {
      path: "/skuListDemo",
      name: "skuListDemo",
      component: () => import("../views/demo/SkuListDemo.vue"),
      meta: {
        title: "SkuList组件"
      }
    },
    {
      path: "/skuListByPromotionDemo",
      name: "skuListByPromotionDemo",
      component: () => import("../views/demo/SkuListByPromotionDemo.vue"),
      meta: {
        title: "SkuListByPromotion组件"
      }
    },
    {
      path: "/groupSkuListByPromotionDemo",
      name: "groupSkuListByPromotionDemo",
      component: () =>
        import("../views/demo/GroupSkuListByPromotionDemo.vue"),
      meta: {
        title: "GroupSkuListByPromotion组件"
      }
    },
    {
      path: "/cartIconDemo",
      name: "cartIconDemo",
      component: () => import("../views/demo/CartIconDemo.vue"),
      meta: {
        title: "购物车角标组件"
      }
    },
    {
      path: "/deactivate",
      name: "deactivate",
      component: () => import("../views/deactivate.vue"),
      meta: {
        title: infoObj.title
      }
    },
    {
      path: "/passwordLogin",
      name: "passwordLogin",
      component: () => import("../views/register/passwordLogin.vue"),
      meta: {
        title: "用户登录"
      }
    },
    {
      path: "/balanceAccount",
      name: "balanceAccount",
      component: () =>
        import("../../store-common/accounts/BalanceAccount.vue"),
      meta: {
        title: infoObj.title
      }
    },
    {
      path: "/companyDetail",
      name: "companyDetail",
      component: () =>
        import("../../store-common/accounts/companyDetail.vue"),
      meta: {
        title: "商家详情"
      }
    },
    {
      path: "/balanceList",
      name: "balanceList",
      component: () => import("../../store-common/accounts/BalanceList.vue"),
      meta: {
        title: infoObj.title
      }
    },
    {
      path: "/salesOrder",
      name: "salesOrder",
      component: () => import("../../store-common/order/salesOrder.vue"),
      meta: {
        title: "我的销售单"
      }
    },
    {
      path: "/salesOrderDetail",
      name: "salesOrderDetail",
      component: () =>
        import("../../store-common/order/salesOrderDetail.vue"),
      meta: {
        title: "销售单详情"
      }
    },
    {
      path: "/FinancialAudit",
      name: "FinancialAudit",
      component: () => import("../../store-common/order/FinancialAudit.vue"),
      meta: {
        title: "订单财务审核"
      }
    },
    {
      path: "/VerifyBills",
      name: "VerifyBills",
      component: () => import("../views/mine/verifyBills/index.vue"),
      meta: {
        title: "对账",
        keepAlive: true
      }
    },
    {
      path: "/StatementDetail",
      name: "StatementDetail",
      component: () => import("../views/mine/statementDetail/index.vue"),
      meta: {
        title: "对账单详情",
        keepAlive: true
      }
    },
    {
      path: "/SettleList",
      name: "SettleList",
      component: () => import("../views/mine/settleList/index.vue"),
      meta: {
        title: "结算历史"
      }
    },
    {
      path: "/PayBills",
      name: "PayBills",
      component: () => import("../views/payBills/index.vue"),
      meta: {
        title: "支付账单"
      }
    },
    {
      path: "/maintenanceRecord",
      name: "maintenanceRecord",
      component: () => import("../views/maintenance/maintenance_record.vue"),
      meta: {
        title: "维保履历"
      }
    },
    {
      path: "/maintenanceDetail",
      name: "maintenanceDetail",
      component: () => import("../views/maintenance/maintenance_detail.vue"),
      meta: {
        title: "单据详情"
      }
    },
    {
      path: "/quotation",
      name: "quotation",
      component: () => import("../views/maintenance/quotation.vue"),
      meta: {
        title: "报价单"
      }
    },
    {
      path: "/settlement",
      name: "settlement",
      component: () => import("../views/maintenance/settlement.vue"),
      meta: {
        title: "结算单"
      }
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("../views/maintenance/payment.vue"),
      meta: {
        title: "选择支付方式"
      }
    },
    {
      path: "/diagnosticReport",
      name: "diagnosticReport",
      component: () => import("../views/maintenance/diagnostic_report.vue"),
      meta: {
        title: "诊断履历"
      }
    },
    {
      path: "/pastDiagnosis",
      name: "pastDiagnosis",
      component: () => import("../views/maintenance/past_diagnosis.vue"),
      meta: {
        title: "既往诊断履历"
      }
    },
    {
      path: "/maintenanceCentre",
      name: "maintenanceCentre",
      component: () => import("../views/maintenance/maintenanceCentre.vue"),
      meta: {
        title: "我的"
      }
    },
    {
      path: "/onlineBooking",
      name: "onlineBooking",
      component: () => import("../views/maintenance/onlineBooking/index.vue"),
      meta: {
        title: "我的"
      }
    }
  ];
  router.addRoutes([...routes]);
}

async function getInfo() {
  const infoObj = {
    firstPage: "/login",
    title: "我的店铺（演示）"
  };
  Vue.prototype.hasWxPay = false;
  Vue.prototype.needVisitor = false;
  const res = await getDomainParse();
  if (res && res.companyId) {
    const {
      hasOffiAccount,
      dataService,
      hasWxPay,
      needVisitor,
      firstPage,
      title
    } = res;
    axios.prototype.isH5 = !hasOffiAccount;
    axios.prototype.hasOffiAccount = hasOffiAccount;
    axios.prototype.dataService = dataService;
    Vue.prototype.hasWxPay = hasWxPay;
    Vue.prototype.needVisitor = needVisitor;
    infoObj.firstPage = firstPage;
    infoObj.title = title;
    addRoutes(infoObj);
  }
}
export default router;
