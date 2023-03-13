/* eslint-disable @typescript-eslint/no-var-requires */
const routersOfYX = require("../router/repair");

module.exports = {
  envConfig: {
    routerPrefix: "",
    hasYP: true,
    hasYX: true,
    routersOfYX: routersOfYX,
    webchat: "1b333f50-bdd1-11eb-9f83-bb9436710eb2",
    erp: "https://erp-qa2.threesoft.cn",
    print: "http://erp-qa2.threesoft.cn",
    erpH5: "https://erp-qa2.threesoft.cn/h5",
    manual: "https://manual-qa2.threesoft.cn",
    feedback: "https://feedback-qa2.threesoft.cn",
    ErpApiUrl: "https://erp-qa2.threesoft.cn/api",
    CrmApiUrl: "https://crm-qa2.threesoft.cn/api"
  }
};
