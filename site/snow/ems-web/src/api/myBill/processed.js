import axios from '@u/request';

// 已审批列表
export const getApproveList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myProcessedGroup/findLoadDidList`,
    method: 'post',
    data,
    headers,
  });
};

// 已阅列表
export const getHaveReadList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myProcessedGroup/findLoadReadedList`,
    method: 'post',
    data,
    headers,
  });
};

// 已反馈列表
export const getFeedbackList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myProcessedGroup/findLoadCommunicationList`,
    method: 'post',
    data,
    headers,
  });
};