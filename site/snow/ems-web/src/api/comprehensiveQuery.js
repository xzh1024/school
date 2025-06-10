import storage from '@/utils/storage';
import axios from '@u/request';

const getToken = (key = 'token') => {
  return storage.get(key, 'sessionStorage') || '';
};

//
export const getData = data => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/reportService/report/comprehensiveQueryReport`,
    method: 'post',
    data,
  });
};

export const getExportFiles = data => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/reportService/report/getExportList`,
    method: 'post',
    data: {
      fileExport: {
        fileType: 'claimStatisticNewData',
      },
      ...data,
    },
  });
};

export const delFile = fileId => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/reportService/report/deleteFileExport/${fileId}`,
    method: 'post',
  });
};

export const downloadFile = fileId => {
  const token = getToken();

  return axios({
    headers: {
      token,
    },
    url: `/ems-ms/reportService/report/downloadFile/${fileId}`,
    method: 'post',
    responseType: 'blob',
  });
};
