import axios from '@u/request';

// 获取列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/imagesys/showImageInfo`,
    method: 'post',
    data,
    headers,
  });
};

// 打印数据
export const getPrintData = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/imagesys/printerDispacherBatch`,
    method: 'post',
    data,
    headers,
  });
};

// 更新实物数据
export const updateHasPhysicalBills = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/imagesys/updateHasPhysicalBillsByClaimId`,
    method: 'post',
    data,
    headers,
  });
};
// 影像查看
export const getOcrImageUrlByClaimId = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/ocr/manager/getOcrImageUrlByClaimId`,
    method: 'post',
    data,
    headers,
  });
};

// 导出数据
export const exportData = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/imagesys/exportExcelImageInfo`,
    method: 'post',
    data,
    headers,
    responseType: 'blob',
  });
};
// 扫描
export const imageHandleOcr = (params, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/ocr/manager/imageHandleOcr`,
    method: 'get',
    params,
  });
};

// 跳转新影像
export const getImageToken = (id, headers = {}) => {
  return axios({
    url: `/ems-ms/imageService/imagesys/token?claimNo=${id}`,
    method: 'post',
  });
};