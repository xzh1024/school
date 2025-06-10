import axios from '@u/request';

export const getAlreadyCount = (data = {}) => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/getImportControlCountSuccessList`,
    method: 'post',
    data,
  });
};

export const getCount = (data = {}) => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/getImportControlCountTemp`,
    method: 'post',
    data,
  });
};

// 核算小组数据
export const getAccountingGroupList = () => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/toImportFmsFailedListTemp`,
    method: 'get',
  });
};

// 待带入列表
export const getErpFailedList = (data = {}, config = {}) => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/findImportFailedListTemp`,
    method: 'post',
    data,
    ...config,
  });
};

// 待ERP生产发票
export const getFmsFailedList = (data = {}, config = {}) => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/findImportFmsFailedListTemp`,
    method: 'post',
    data,
    ...config,
  });
};

// 已生成发票
export const getAlreadyFailedList = (data = {}, config = {}) => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/findImportFmsSuccessList`,
    method: 'post',
    data,
    ...config,
  });
};

// 编辑内容
export const editContent = (data = {}) => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/submitEditNew`,
    method: 'post',
    data,
  });
};

// 编辑内容
export const importErp = (data = {}) => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/submitImportNew`,
    method: 'post',
    data,
  });
};

// 待导入ERP  导出
export const erpExport = data => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/exportImportFailedListTemp`,
    method: 'post',
    responseType: 'blob',
    data,
  });
};

// 待ERP生成发票  导出
export const fmsExport = data => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/exportImportFmsFailedListTemp`,
    method: 'post',
    responseType: 'blob',
    data,
  });
};

// 已生成发票  导出
export const alreadyExport = data => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/exportImportFmsSuccessList`,
    method: 'post',
    responseType: 'blob',
    data,
  });
};

export const updateStatus = data => {
  return axios({
    url: `/ems-ms/accountingService/CommonWeb/importList/submitImportFms`,
    method: 'post',
    data,
  });
};
