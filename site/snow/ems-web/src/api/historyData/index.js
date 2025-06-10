import axios from '@u/request';

//
export const getClaimDetail = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/toWorkJson`,
    method: 'post',
    data,
    headers,
  });
};

// 审批历史
export const processHistory = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/loadOption?claimId=${id}`,
    method: 'post',
  });
};

// 历史单据数据
export const getHistoryData = data => {
  return axios({
    url: `/ems-ms/reportService/report/historyList`,
    method: 'post',
    data,
  });
};

// 沟通历史
export const communicationHistory = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/loadCommunication?claimId=${id}`,
    method: 'post',
  });
};

// 传阅历史
export const circularizeHistory = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/loadUnifiedWorkitem?claimId=${id}`,
    method: 'post',
  });
};

// 报账明细列表
export const getClaimBaseLine = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimBaseLineByClaimId`,
    method: 'post',
    data,
  });
};

// 税金明细列表
export const getTaxLine = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimTaxLineByClaimId/${id}`,
    method: 'get',
  });
};

// 发票明细列表
export const getInvoiceLine = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryConsumerInvoiceByClaimId/${id}`,
    method: 'get',
  });
};

// 不合规票据明细列表
export const getIrregularityInvoice = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimLousByClaimId/${id}`,
    method: 'get',
  });
};

// 扣款明细列表
export const getCutList = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimDeductListByClaimId/${id}`,
    method: 'get',
  });
};

// 附件列表
export const getAttach = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimAttachByClaimId?claimId=${id}`,
    method: 'post',
  });
};

// 报账及付款金额
export const getAmount = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/ajaxRefreshClaimBaseAmount`,
    method: 'post',
    data,
  });
};

// 报账及付款金额-相关单据列表
export const getRelevantList = id => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/ajaxViewRelateBill?claimId=${id}`,
    method: 'post',
  });
};

// 报账及付款金额-余额单据列表
export const getBalanceList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/claimWriteOff`,
    method: 'post',
    data,
  });
};

// 获取警示信息数量
export const getWarningCount = claimId => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/warnMessageCount?claimId=${claimId}`,
    method: 'post',
  });
};

// 获取警示信息列表
export const getWarningList = claimId => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/getWarnMessage?claimId=${claimId}`,
    method: 'post',
  });
};

// 付款清单列表
export const getPayList = claimId => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimPayListByClaimId?claimId=${claimId}`,
    method: 'post',
  });
};

// 付款清单列表
export const getPaymentList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryPayRequestLineListByClaimId`,
    method: 'post',
    data,
  });
};

// 付款详细信息
export const getPaymentDetail = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/payment/loadPayInfoInBaseLine`,
    method: 'post',
    data,
    
  });
};

// 差旅报账明细接口
export const getTravelList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimTravelInfosByClaimId`,
    method: 'post',
    params: data,
  });
};

// 历史单据列表（合同备案单）
export const getHistoryList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/reimburseJson/queryHistoryRefContract`,
    method: 'post',
    data,
  });
};

// 历史单据列表（合同备案单）
export const getAssetsDetail = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/reimburseJson/ajaxSelectClaimAssetCard`,
    method: 'post',
    params: data,
  });
};

// 差旅订单信息
export const getTravelOrderInfo = claimId => {
  let url = `/ems-ms/reimburseService/claimBaseDetail/ctripOrder/${claimId}`;
  if (process.env.REACT_APP_ENV === 'dev') {
    url += '?test=aaa';
  }
  return axios({
    url,
    method: 'get',
  });
};


// 领用酒明细列表接口
export const getDrinkList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/applyDrinkDetail/find`,
    method: 'post',
    params: data,
  });
};


// 探亲明细
export const getVisitInfosList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/visitInfo/queryClaimVisitInfosByClaimId`,
    method: 'post',
    params: data,
  });
};

// 探亲明细
export const getConstructionProcessList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/claimFormJson/ajaxSelectClaimConstructLine`,
    method: 'post',
    params: data,
  });
};

// 附件下载
export const downLoadAttach = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/reimburse/downloadFile`,
    method: 'post',
    data,
    responseType: 'blob',
  });
};

// 附件下载 打包
export const downLoadAllAttach = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/downloadZipFile`,
    method: 'post',
    data,
    responseType: 'blob',
  });
};

// 付款计划明细行
export const getClaimPayPlanByClaimId = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/queryClaimPayPlanByClaimId`,
    method: 'post',
    data: data,
  });
};


// 带摊明细
export const getAjaxSelectCAL = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/claimFormJson/ajaxSelectCAL`,
    method: 'post',
    params: data,
  });
};

// 分摊明细
export const getAjaxSelectCSL = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/claimFormJson/ajaxSelectCSL`,
    method: 'post',
    params: data,
  });
};

// 固定资产改良转出明细
export const getAjaxImprovedLinesByClaimId = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/assetReimburse/ajaxImprovedLinesByClaimId`,
    method: 'post',
    params: data,
  });
};

// 资产调拨
export const getAjaxSelectClaimAllocationLine = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/reimburseJson/ajaxSelectClaimAllocationLine`,
    method: 'post',
    params: data,
  });
};

// 资产处置
export const getAjaxListClaimDisposaLineByClaimId = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/assetReimburse/ajaxListClaimDisposaLineByClaimId`,
    method: 'post',
    params: data,
  });
};

// 交易对象
export const getTradeObjectList = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/assetReimburse/ajaxListClaimDisposaTransactionLineByClaimId`,
    method: 'post',
    params: data,
  });

};

// 资产调整卡片
export const getAssetCards = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/reimburseJson/ajaxSelectClaimAssetAdjust`,
    method: 'post',
    params: data,
  });
};

// 在建工程卡片
export const getConstructAdjust = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/reimburseJson/ajaxSelectClaimConstructAdjust`,
    method: 'post',
    params: data,
  });
};

// ppm结算明细
export const getSettlementDetail = data => {
  return axios({
    url: `/ems-ms/reimburseService/claimBaseDetail/reimburseJson/queryClaimStatementByClaimId`,
    method: 'post',
    params: data,
  });
};

// 电子影像系统URL
export const imageUrl = data => {
  return axios({
    url: `/ems-ms/imageService/ocr/manager/btnUrl`,
    method: 'post',
    params: data,
  });
};

// 历史单据导出
export const exportHistoryData = data => {
  return axios({
    url: `/ems-ms/reportService/report/historyListDownload`,
    method: 'post',
    data,
    responseType: 'blob',
  });
};