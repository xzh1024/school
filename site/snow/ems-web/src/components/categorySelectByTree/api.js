import storage from '@/utils/storage';
import axios from '@u/request';

const getToken = (key = 'token') => {
  return storage.get(key, 'sessionStorage') || '';
};

//
export const getTreeData = (id = '') => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/accountingService/account/ajaxRetrieveExpCategoryTree`,
    method: 'post',
    data: {},
  });
};
