import axios, { ecsbPostAi } from '@u/request';

// 获取AI聊天
export const chatuploadFile = (data, headers = {}, type = 'ai') => {
  return axios({
    url: `https://ctp-dev.crb.cn/rbac-service-user/ai/service/v1/uploadFile`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
    type,
  });
};
// 获取AI聊天
export const chat = (data, headers = {}, type = 'ai') => {
  return axios({
    url: `https://ctp-uat.crb.cn/rbac-service-user/ai/service/v1/chat`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
    type,
  });
};

// 获取AI会话ID
export const getAiSession = (data, headers = {}, type = 'ai') => {
  return ecsbPostAi({
    url: 'aiSession',
    data: data,
  });
};

// 获取AI腾讯云秘钥
export const getAiCosKey = (data, headers = {}, type = 'ai') => {
  return ecsbPostAi({
    url: 'cos_credential',
    data: data,
    headers: {
      'It-Home-Proxy-Id': 'cos-temp-credential',
    },
  });
};

// 获取AI会话历史
export const getAiSessionHistory = (data, headers = {}, type = 'ai') => {
  return ecsbPostAi({
    url: 'aiHistory',
    data: data,
  });
};

// 获取AI会话历史list
export const getAiSessionHistoryPage = (data, headers = {}, type = 'ai') => {
  return ecsbPostAi({
    url: 'get_ai_history_detail_list',
    data: data,
  });
};

// 获取AI会话历史详情
export const getAiSessionHistoryDetail = (data, headers = {}, type = 'ai') => {
  return ecsbPostAi({
    url: 'aiHistoryDetail',
    data: data,
  });
};

// 保存记录
export const saveRequestAndAnswer = (data, headers = {}, type = 'ai') => {
  return ecsbPostAi({
    url: 'saveAiHistoryTail',
    data: data,
  });
};

// AI对话
export const aiChat = (data, params) => {
  return ecsbPostAi({
    url: 'aiChat',
    data,
    params,
  });
};

// 获取AI token
export const getAItoken = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/ai/createAiToken`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 获取初始化信息
export const getInitInfo = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/ai/getBaseInfo`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 校验发票重复报销
export const validateInvoice = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/ai/aiValidation`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 发票影像上传
export const uploadImageFile = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/service/ocr/invoiceOcr`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 生成消费记账
export const createAccounting = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/invoice/saveOrUpdate`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 发票验真
export const ocrTpQueryVerifyResult = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/service/ocr/ocrTpQueryVerifyResult`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 消费记账详情
export const accountDetail = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/invoice/detail`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 报账单初始化
export const reimburseInit = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/init`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 税号校验
export const checkInvoiceTaxNo = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/checkInvoiceTaxNo`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 保存消费记账
export const saveClaim = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/next`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 敏感词校验
export const validateInvoiceNumberSensitive = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/validateInvoiceNumberSensitive`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 连号校验
export const validateInvoiceNumberConsecutive = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/validateInvoiceNumberConsecutive`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 重复报销校验
export const checkInvoice = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/invoice/checkInvoice`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 提交报销单
export const submitClaim = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/submitApprove`,
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 研发项目
export const getProjectOptions = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/developproject/querySelectableProject',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 事前申请-公出用车-保存
export const nextToApproveForTravel = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/apply/travel/nextToApproveForTravel',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};
// 事前申请-公出用车-提交
export const submitLocalTravelApply = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/apply/travel/submitLocalTravelApply',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 事前申请-出差商旅-保存
export const travelNextToApprove = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/apply/travel/nextToApprove',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 事前申请-出差商旅-提交
export const reimburseSubmit = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/reimburse/submit',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 城市
export const queryCities = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/reimburse/ctrip/cities',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 其他公出事前申请初始化获取数据-探亲次数
export const getVisitInit = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/apply/visit/init',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 获取OA会议信息(移动端)
export const getOaMeetingInfo = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/oa-meeting/getOaMeetingInfo',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 获取引导视频
export const aiVideoUrl = (data = {}, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/ai/aiVideoUrl',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 获取业务小类
export const queryListByParentId = (data = {}, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/reimburse/queryListByParentId',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 获取招待对象
export const getEntertainment = (data = {}, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/reimburse/getEntertainment',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

/** 驾驶员交通费智审 **/

// 获取提取数据
export const getFinanceAudit = data => {
  return ecsbPostAi({
    url: 'get_finance_audit',
    params: data,
  });
};
// 标记字段（备注）
export const markResult = data => {
  return ecsbPostAi({
    url: 'mark_result',
    data,
  });
};
// 获取报账单警示消息
export const getWarnMessage = (params, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/claimBaseDetail/getWarnMessage',
    method: 'post',
    params,
    headers,
    hideMsg: true,
  });
};
// 重审
export const aiRpaClaimRetrial = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/ai/rpaClaimRetrial',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};

// 获取报账单信息
export const getClaimInfo = (data, headers = {}) => {
  return axios({
    url: '/ems-ms/reimburseService/ai/getClaimInfo',
    method: 'post',
    data,
    headers,
    hideMsg: true,
  });
};
