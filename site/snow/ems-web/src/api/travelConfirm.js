import storage from '@/utils/storage';
import axios from '@u/request';

const getToken = (key = process.env.REACT_APP_TOKEN_FIELD) => {
  return storage.get(key, 'sessionStorage') || '';
};

//
export const getData = (data = {}) => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/reimburseService/travelSubCal/getTravelSubCalList`,
    method: 'post',
    data: {
      page: 1,
      pageSize: 9999,
      ...data,
    },
  });
};

export const confirm = (data) => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/reimburseService/travelSubCal/confirmTravelSubCalList`,
    method: 'post',
    data,
  });
};

export const update = data => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/reimburseService/travelSubCal/updateDistributeSub`,
    method: 'post',
    data,
  });
};
