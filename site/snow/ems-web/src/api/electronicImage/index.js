import axios from '@u/request';

// 审批数据
export const getApproveInfo = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/bpmService/process/toApprovePage`,
    method: 'post',
    data,
    headers
  });
};

// 提交
export const submitApprove = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/reimburse/submitApprove`,
    method: 'post',
    data,
    headers
  });
};

// 获取转办人员选择列表
export const getTransferPersonList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/baseService/user/sharePersonListTransfers`,
    method: 'post',
    data,
    headers
  });
};

// 转办
export const transferFlow = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/bpmService/process/toDoShareTransfers`,
    method: 'post',
    data,
    headers
  });
};

// 提交前
export const submitImage = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/imagesys/submitImage`,
    method: 'post',
    data,
    headers
  });
};
