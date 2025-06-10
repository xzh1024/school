import storage from '@/utils/storage';
import axios from '@u/request';

const getToken = (key = 'token') => {
  return storage.get(key, 'sessionStorage') || '';
};

// 任务池监控页面顶部数据
export const getOuList = groupType => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/accountingService/groupInfo/getAllGroup?groupType=${groupType}`,
    method: 'post',
  });
};
