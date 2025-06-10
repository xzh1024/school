import axios from '@u/request';

// 顶部信息
export const getAccountControlCount = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/account/getAccountControlCount`,
    method: 'post',
    data,
    headers,
  });
};

// 表格列表
export const getList = (data, headers = {}) => {
  const { activeKey } = data;
  let url = '/ems-ms/accountingService/account/noGroupSteppoolList';
  let params = {};
  if (activeKey === 'accounting_notSpecified') {
    // 会计任务池-未指定小组任务列表
    url = '/ems-ms/accountingService/account/noGroupSteppoolList';
    params.accountType = 'steppool';
  }
  if (activeKey === 'accounting_undistributed') {
    // 会计任务池-小组未分配任务
    url = '/ems-ms/accountingService/account/toAssignedSteppoolList';
    params.accountType = 'steppool';
  }
  if (activeKey === 'accounting_untreated') {
    // 会计任务池-小组未处理任务
    url = '/ems-ms/accountingService/account/noHandleSteppoolList';
    params.accountType = 'steppool';
  }
  if (activeKey === 'grabOrders_wait') {
    // 抢单任务池-待抢单据池
    url = '/ems-ms/accountingService/account/wrestPool1CountList';
    params.accountType = 'wreststeppool';
  }
  if (activeKey === 'grabOrders_alreadyRobbed') {
    // 抢单任务池-已抢未处理
    url = '/ems-ms/accountingService/account/wrestedToDoCountList';
    params.accountType = 'wreststeppool';
  }
  if (activeKey === 'review_notSpecified') {
    // 复核任务池-未指定小组任务
    url = '/ems-ms/accountingService/account/noGroupSteppool2List';
    params.accountType = 'steppool2';
  }
  if (activeKey === 'review_undistributed') {
    // 复核任务池-小组未分配任务
    url = '/ems-ms/accountingService/account/toAssignedSteppool2List';
    params.accountType = 'steppool2';
  }
  if (activeKey === 'review_untreated') {
    // 复核任务池-小组未处理任务
    url = '/ems-ms/accountingService/account/noHandleSteppool2List';
    params.accountType = 'steppool2';
  }
  return axios({
    url,
    method: 'post',
    data,
    headers,
    params,
  });
};

// 未指定小组任务-- 手动分配保存
export const handPostPool = data => {
  return axios({
    url: `/ems-ms/accountingService/account/handPool`,
    method: 'post',
    data,
    params: { accountType: data.accountType },
  });
};

// 查询小组
export const getAllGroup = data => {
  return axios({
    url: `/ems-ms/accountingService/account/getAllGroup`,
    method: 'post',
    data,
  });
};
// 通过小组查询组员
export const getCrewsByGroup = data => {
  return axios({
    url: `/ems-ms/accountingService/account/getCrews`,
    method: 'post',
    data,
  });
};

// 通过item2Code查询组员(抢单任务池-获取重新分配抢单业务人员)
export const getSelectCrewByItem2Code = data => {
  return axios({
    url: `/ems-ms/accountingService/account/queryWrestAccount`,
    method: 'post',
    data,
    params: data,
  });
};

// 分配到人保存
export const allocateTaskSave = (data = {}, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/account/allocateTask`,
    method: 'post',
    headers,
    data,
  });
};

// 待抢单据池 --- 分配到人保存  和  已抢未处理 -- 重新分配
export const allocateClaimByWrestSave = (data = {}, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/account/allocateClaimByWrest`,
    method: 'post',
    headers,
    data,
  });
};

// 会计池和复合任务池-小组未处理任务（导出）
export const erpExport = data => {
  const { exportType } = data;
  let url = '/ems-ms/accountingService/account/noHandleSteppoolListExport';
  let params = {};
  if (exportType === 'accounting_untreated') {
    // 会计任务池-小组未处理任务
    url = '/ems-ms/accountingService/account/noHandleSteppoolListExport';
    params.accountType = 'steppool';
  }
  if (exportType === 'grabOrders_alreadyRobbed') {
    // 抢单任务池-已抢未处理
    url = '/ems-ms/accountingService/account/wrestedToDoCountListExport';
    params.accountType = 'wreststeppool';
  }
  if (exportType === 'review_untreated') {
    // 复核任务池-小组未处理任务
    url = '/ems-ms/accountingService/account/noHandleSteppool2ListExport';
    params.accountType = 'steppool2';
  }
  return axios({
    url,
    method: 'post',
    responseType: 'blob',
    data,
    params,
  });
};

// 待抢单据池 --- 一键派单查询认证
export const getCertificationPackage = () => {
  return axios({
    url: `/ems-ms/accountingService/account/certificationPackage`,
    method: 'GET',
  });
};

// 认证包 选择  查询数据
export const certificationPackageChange = (data = {}) => {
  return axios({
    url: `/ems-ms/accountingService/account/selectAuthenticationList`,
    method: 'post',
    params: data,
  });
};

// 一键分配保存
export const oneClickDispatchingSave = (data = {}, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/account/allocateClaimByWrest2`,
    method: 'post',
    headers,
    data,
  });
};
