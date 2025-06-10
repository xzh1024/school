import axios from '@u/request';

// 获取列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/accountCoverGroupEmp/listByPage`,
    method: 'post',
    data,
    headers,
  });
};
export const changeStatus = (data, headers = {}) => {
  // 打开、关闭
  return axios({
    url: `/ems-ms/accountingService/accountCoverGroupEmp/changeUserAccountCoverStatus`,
    method: 'post',
    data,
    headers,
  });
};
