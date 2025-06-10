import axios from '@u/request';

// 获取用户信息
export const getUserRolesByToken = () => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/getUserRolesByToken`,
    method: 'get',
  });
};

// 收单柜管理单条数据查询
export const queryAcquirerBaseById = acquirerId => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/queryAcquirerBaseById/${acquirerId}`,
    method: 'get',
  });
};

// 收单柜管理分页接口
export const queryAcquirerBaseByPage = params => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/queryAcquirerBaseByPage`,
    method: 'post',
    data: params,
  });
};

// 收单柜管理-新增修改逻辑删除
export const saveOrUpdateAcquirerBase = params => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/saveOrUpdateAcquirerBase`,
    method: 'post',
    data: params,
  });
};

// 收单柜管理-查询管理员
export const queryManager = managerAccountOrName => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/queryManager`,
    method: 'get',
    params: {
      managerAccountOrName,
    },
  });
};

// 收单柜管理-查询公司
export const queryMdOu = compCodeOrName => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/queryMdOu`,
    method: 'get',
    params: {
      compCodeOrName,
    },
  });
};

// 收单柜管理-查询部门
export const queryOrg = orgCodeOrName => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/queryOrg`,
    method: 'get',
    params: {
      orgCodeOrName,
    },
  });
};

// 收单管理-分页接口
export const queryAcquiringByManager = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringByManager`,
    method: 'post',
    data,
  });
};

// 收单管理-检查名字是否重复
export const checkAcquirerNameIsExist = (acquirerName, acquirerId) => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/checkAcquirerNameIsExist`,
    method: 'post',
    data: {
      acquirerName,
      acquirerId,
    },
  });
};

// 收单管理-检查名字是否重复
export const checkMdOuAndOrgHasAcquirerStorage = (compCode, deptId) => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/checkMdOuAndOrgHasAcquirerStorage`,
    method: 'post',
    data: {
      compCode,
      deptId,
    },
  });
};

// 收单管理-收单柜查询
export const queryAcquirerBase = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerBase/queryAcquirerBase`,
    method: 'post',
    data,
  });
};

// 收单管理-邮寄
export const savePostByManager = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/savePostByManager`,
    method: 'post',
    data: {
      ...data,
    },
  });
};

// 实物接收管理-分页接口
export const queryAcquiringByReceiver = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringByReceiver`,
    method: 'post',
    data,
  });
};

// 实物接收管理-接收
export const receivePost = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/receivePost`,
    method: 'post',
    data,
  });
};

// 实物接收管理-退回详情
export const queryBack = acquiringId => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryBack/${acquiringId}`,
    method: 'get',
  });
};

// 个人邮寄-列表
export const queryAcquiring = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringByQrCode`,
    method: 'post',
    data,
  });
};

// 个人邮寄-获取表单URL
export const queryAcquiringClaimBaseUri = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringClaimBaseUri`,
    method: 'post',
    data,
  });
};

// 个人邮寄-邮寄
export const savePostByPersonal = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/savePostByPersonal`,
    method: 'post',
    data,
  });
};

// 代人邮寄-暂存
export const savePostCacheByPersonal = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/savePostCacheByPersonal`,
    method: 'post',
    data,
  });
};

// 代人邮寄-暂存
export const queryAcquiringByCache = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringByCache`,
    method: 'post',
    data,
  });
};

// 快递退回-列表
export const queryAcquiringByBack = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringByBack`,
    method: 'post',
    data,
  });
};

// 快递退回-列表 （收单柜管理员）
export const queryAcquiringByBackWithUser = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringByBackWithUser`,
    method: 'post',
    data,
  });
};

// 快递退回-批量修改
export const saveAcquiringBack = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/saveAcquiringBack`,
    method: 'post',
    data,
  });
};

// 默认地址修改-获取用户默认地址
export const queryAcquiringDefaultAddressByUserAccount = account => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/queryAcquiringDefaultAddressByUserAccount/${account}`,
    method: 'get',
  });
};

// 默认地址修改-修改默认地址
export const saveAcquiringDefaultAddress = data => {
  return axios({
    url: `/ems-ms/archiveService/acquirerClaimBase/saveAcquiringDefaultAddress`,
    method: 'post',
    data,
  });
};
