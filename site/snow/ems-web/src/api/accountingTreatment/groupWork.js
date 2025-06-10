import axios from '@u/request';

// 获取列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/accountGroupWork/listByPage`,
    method: 'post',
    data,
    headers,
  });
};
export const dataDictPUT = (data, headers = {}) => {
  // 修改
  return axios({
    url: `/ems-ms/accountingService/accountGroupWork/saveAccountGroupWork`,
    method: 'post',
    data,
    headers,
  });
};
export const dataDictDELETE = data => {
  return axios({
    url: `/ems-ms/accountingService/accountGroupWork/delAccountGroupWork`,
    method: 'POST',
    data,
  });
};
export const dataDict = data => {
  //新增
  return axios({
    url: `/manageService/dataDict`,
    method: 'POST',
    data,
  });
};
export const getEmployeeByOrgId = data => {
  //数据列表
  return axios({
    url: `/ems-ms/accountingService/groupInfo/getEmployeeByOrgId`,
    method: 'POST',
    data,
  });
};
export const groupEdit = data => {
  return axios({
    url: `/ems-ms/accountingService/accountGroupWork/accountGroupWorkDetail?workspaceId=${data}`,
    method: 'POST',
  });
};
