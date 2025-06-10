import storage from '@/utils/storage';
import axios from '@u/request';

const getToken = (key = 'token') => {
  return storage.get(key, 'sessionStorage') || '';
};

//
export const getTreeData = data => {
  const token = getToken();
  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/manageService/org/orgListByParentId?parentId=${data}`,
    method: 'post',
  });
};
//
export const searchlist = data => {
  const token = getToken();
  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/manageService/org/search?searchKey=${data}`,
    method: 'post',
  });
};
