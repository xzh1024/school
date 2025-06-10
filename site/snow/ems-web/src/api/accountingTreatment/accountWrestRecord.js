import axios from '@u/request';

// 获取列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/wrest/accountPoolWrest/queryAccountWrestRecord`,
    method: 'post',
    data,
    headers,
  });
};
