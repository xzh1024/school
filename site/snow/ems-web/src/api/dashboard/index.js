import axios from '@u/request';

// 获取信息公告
export const getAnnouncement = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/queryPublishNotice`,
    method: 'post',
    data,
  });
};

// 获取首页代办数量
export const getNum = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/shortcuts`,
    method: 'post',
    data,
  });
};

// 获取用户信息
export const getUserInfo = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/userInfo`,
    method: 'post',
    data,
  });
};

// 获取用户岗位列表
export const getPositionList = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/getPositionInfoList`,
    method: 'post',
    data,
  });
};

// 切换岗位换token
export const changeTokenByPosition = data => {
  return axios({
    url: `/ems-ms/authService/auth/getTokenByPosition`,
    method: 'post',
    data,
  });
};

// 获取个人标准
export const getPersonalStandard = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/queryEmpPersonStandard`,
    method: 'post',
    data,
  });
};

// 获取更多动态消息
export const getMoreNotice = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/queryNoticeByPage`,
    method: 'post',
    data,
  });
};

// 获取单独公告信息
export const getNoticeById = id => {
  return axios({
    url: `/ems-ms/reimburseService/index/viewNotice`,
    method: 'post',
    data: {
      noticeId: id,
    },
  });
};

// 获取单独公告信息
export const noticeAttachDownload = data => {
  return axios({
    url: `/ems-ms/manageService/notice/downloadFile`,
    method: 'post',
    data,
    responseType: 'blob',
  });
};

// 快捷菜单自定义接口
export const editCustomMenu = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/addQuickEntryMenu`,
    method: 'post',
    data,
  });
};
// 意见反馈
export const feedbackSubmit = data => {
  return axios({
    url: `/ems-ms/manageService/feedback/submit`,
    method: 'post',
    data,
  });
};

// 获取快捷菜单自定义接口
export const getCustomMenu = data => {
  return axios({
    url: `/ems-ms/reimburseService/index/quickEntryMenu`,
    method: 'post',
    data,
  });
};

// 获取快捷菜单自定义接口
export const delCustomMenu = id => {
  return axios({
    url: `/ems-ms/reimburseService/index/delQuickEntryMenu?id=${id}`,
    method: 'post',
  });
};
