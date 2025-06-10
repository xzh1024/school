import axios from '@u/request';

export const getList = data => {
  //列表接口
  return axios({
    url: `/manageService/position/map/list-page `,
    method: 'post',
    data,
  });
};
export const dataDictPUT = data => {
  // 修改
  return axios({
    url: `/manageService/position/map`,
    method: 'PUT',
    data,
  });
};
export const dataDictDELETE = id => {
  return axios({
    url: `/manageService/position/map?id=${id}`,
    method: 'DELETE',
  });
};
export const dataDict = data => {
  //新增
  return axios({
    url: `/manageService/position/map`,
    method: 'POST',
    data,
  });
};
export const attendancelistPage = data => {
  //经纬度
  return axios({
    url: `/manageService/work/attendance/list-page`,
    method: 'POST',
    data,
  });
};

export const maplistpag = data => {
  //因公晚间用车地点分页查询
  return axios({
    url: `/manageService/location/map/list-page`,
    method: 'POST',
    data,
  });
};

export const findByType = data => {
  //字典都是通过这个接口查
  return axios({
    url: `/manageService/dataDict/findByType?dictType=${data}`,
    method: 'GET',
    data,
  });
};
