import axios from '@u/request';

// 获取报账单大类列表
export const getCategoryMenu = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/baseService/expCategory/draftEntranceLoad`,
    method: 'post',
    params: data,
    headers,
  });
};

// 打开报账单开始报销
export const openApplyClaim = expCategoryCode => {
  return axios({
    url: `/ems-ms/baseService/expCategory/openUrl?expCategoryCode=${expCategoryCode}`,
    method: 'post',
  });
};

// 根据名称搜索
export const searchCategory = keyword => {
  return axios({
    url: `/ems-ms/baseService/expCategory/search?searchKey=${keyword}`,
    method: 'post',
  });
};
