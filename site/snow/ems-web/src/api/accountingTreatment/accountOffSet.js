import axios from '@u/request';

// 获取列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/accountRecordInfo/accountOffPositionInfo`,
    method: 'post',
    data,
    headers,
  });
};

// 新增/修改
export const dataDictPUT = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/accountRecordInfo/saveRecord`,
    method: 'post',
    data,
    headers,
  });
};

//获取详情
export const groupEdit = data => {
  return axios({
    url: `/ems-ms/accountingService/accountRecordInfo/getById`,
    method: 'POST',
    data,
  });
};

//删除
export const dataDictDELETE = data => {
  return axios({
    url: `/ems-ms/accountingService/accountRecordInfo/delete`,
    method: 'POST',
    data,
  });
};

//导出
export const exportDic = data => {
  return axios({
    url: `/ems-ms/accountingService/accountRecordInfo/download`,
    method: 'POST',
    data,
    responseType: 'blob',
  });
};

//修改记录列表
export const getEditList = data => {
  return axios({
    url: `/ems-ms/accountingService/accountRecordInfo/editRecordList`,
    method: 'POST',
    data,
  });
};
