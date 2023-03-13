/* eslint-disable @typescript-eslint/no-var-requires */
const routersOfYX = require("../router/repair");

module.exports = {
  uiConfig: {
    logoClass: "icon-img-denso-logo-menu", // 首页左上角logo类名
    uiTheme: "denso", // ui主题标识，用来判断是否是电装特有
    logoText: "云诊车门店管家", // 登录页面头部logo标题
    appName: "云诊车门店管家", // web标题和其他用到app的名字地方
    copyRight: "", // 版权，电装不需要
    downloadText: "APP下载", // 首页登录框右下角
    copyrightOwner: "@云诊车门店管家", // 登录页面下方文案
    recordNumber: "苏ICP备 18015610号-1", // 登录页面下方文案
    logoUrl: "densoLogo"
  },
  envConfig: {
    routerPrefix: "/erp",
    webchat: "6d357e70-feff-11eb-97cb-690cdd0e3a1f",
    hasYP: false,
    hasYX: true,
    routersOfYX: routersOfYX,
    erp: "https://dmtest.cuiot.cn/erp",
    print: "https://dmtest.cuiot.cn",
    erpH5: "https://dmtest.cuiot.cn/erp-h5",
    manual: "https://dmtest.cuiot.cn/crm/manual",
    feedback: "https://dmtest.cuiot.cn/crm/feedback",
    ErpApiUrl: "https://dmtest.cuiot.cn/erp-api",
    CrmApiUrl: "https://dmtest.cuiot.cn/crm-api",
    hideBoardLogo: true
  }
};
