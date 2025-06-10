import axios from '@u/request';

//
export const getToken = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/authService/auth/createToken`,
    method: 'post',
    data,
    headers
  });
};

// 打开报账单
export const openClaim = data => {
  return axios({
    url: `/ems-ms/reportService/report/openClaimBase`,
    method: 'post',
    data,
  });
};
