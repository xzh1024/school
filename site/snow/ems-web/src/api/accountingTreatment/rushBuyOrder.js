import axios from '@u/request';

// 获取列表数据
export const getData = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/wrest/accountPoolWrest/queryAccountCoverWrestRecord`,
    method: 'post',
    data,
    headers,
  });
};
