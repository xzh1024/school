/* eslint-disable @typescript-eslint/no-var-requires */
const routersOfYX = require("../router/repair");

module.exports = {
  envConfig: {
    routerPrefix: "",
    hasYP: true,
    hasYX: true,
    routersOfYX: routersOfYX,
    webchat: "1b333f50-bdd1-11eb-9f83-bb9436710eb2",
    erp: "https://erp-preview.threesoft.cn",
    print: "http://erp-preview.threesoft.cn",
    erpH5: "https://erp-preview.threesoft.cn/h5",
    manual: "https://manual-preview.threesoft.cn",
    feedback: "https://feedback-preview.threesoft.cn",
    ErpApiUrl: "https://erp-preview.threesoft.cn/api",
    CrmApiUrl: "https://crm-preview.threesoft.cn/api"
  }
};
