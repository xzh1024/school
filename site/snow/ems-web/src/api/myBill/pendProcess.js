import axios from '@u/request';

/**********************************************待审批会计**/
// 获取待审批相关权限
export const getAuthority = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/isShowToDoAccount`,
    method: 'post',
    data,
    headers,
  });
};

// 获取待审批会计列表
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/toDoAccountList`,
    method: 'post',
    data,
    headers,
  });
};

// 获取待审批会计-初审抢单
export const initialOrderGrab = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/wrestFromPool1`,
    method: 'post',
    data,
    headers,
  });
};

// 获取待审批会计-顶岗(复核)抢单
export const reviewOrderGrab = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/wrestFromPool2ByCover4Account2`,
    method: 'post',
    data,
    headers,
  });
};

// 获取待审批会计-总账业务抢单
export const allOrderGrab = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/glWrestFromPool1`,
    method: 'post',
    data,
    headers,
  });
};

// 获取待审批会计-暂挂或取消暂挂
export const noteClaimPendingRecord = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/noteClaimPendingRecord`,
    method: 'post',
    data,
    headers,
  });
};

// 获取待审批会计-标记修改
export const noteClaimApproveFlag = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/noteClaimApproveFlag`,
    method: 'post',
    data,
    headers,
  });
};

// 获取待审批会计-批量修改会计期间
export const updateAccountGldate = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/updateAccountGldate?glDate=${data.glDate}&claimIds=${data.claimIds}`,
    method: 'post',
    headers,
  });
};

// 获取待审批会计-批量修改审批
export const updateAccountComm = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/updateAccountComm`,
    method: 'post',
    data,
    headers,
  });
};
/**********************************************待审批**/
// 获取待审批列表
export const getApprovalList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/findLoadToDoList`,
    method: 'post',
    data,
    headers,
  });
};

// 获取取件码
export const getWdCode = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/getWdCode`,
    method: 'post',
    data,
    headers,
  });
};

// 生成取件码
export const createWdCode = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/createWdCode`,
    method: 'post',
    data,
    headers,
  });
};

/**********************************************待阅**/
// 获取待阅列表
export const getReadList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/findLoadToReadList`,
    method: 'post',
    data,
    headers,
  });
};

// 待阅-已阅
export const closeUnifiniedNotify = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/closeUnifiniedNotify`,
    method: 'post',
    data,
    headers,
  });
};

/**********************************************待反馈**/
// 获取待反馈列表
export const getCommunitaionList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myDisposeGroup/findLoadToCommunicationList`,
    method: 'post',
    data,
    headers,
  });
};
