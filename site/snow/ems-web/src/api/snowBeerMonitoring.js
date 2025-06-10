import axios from '@u/request';

export const getCount = data => {
  return axios({
    url: `/ems-ms/accountingService/xh/erp/import/count`,
    method: 'post',
    data,
  });
};

// 获取业务大类
export const getCategoryOptions = data => {
  return axios({
    url: `/ems-ms/accountingService/xh/erp/import/childPage`,
    method: 'get',
  });
};

// 获取待导入ERP数据
export const getC1TableData = data => {
  return axios({
    url: `/ems-ms/accountingService/xh/erp/import/preparation`,
    method: 'post',
    data,
  });
};

// 获取待生成ERP发票数据
export const getC2TableData = data => {
  return axios({
    url: `/ems-ms/accountingService/xh/erp/import/underway`,
    method: 'post',
    data,
  });
};

// 获取已生成发票数据
export const getC3TableData = data => {
  return axios({
    url: `/ems-ms/accountingService/xh/erp/import/finish`,
    method: 'post',
    data,
  });
};

// 导入ERP
export const importErp = data => {
  return axios({
    url: `/ems-ms/accountingService/xh/erp/import/import`,
    method: 'post',
    data,
  });
};

// 更新状态
export const updateStatus = data => {
  return axios({
    url: `/ems-ms/accountingService/xh/erp/import/fmsStatusUpdate`,
    method: 'post',
    data,
  });
};
