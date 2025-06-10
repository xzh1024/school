import axios from '@u/request';

// 根据范围查询会计工作日历信息
export const getCalendarInfoByRange = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/accountCalendarInfo/getCalendarInfoByRange`,
    method: 'post',
    data,
    headers,
  });
};

// 设置工作日和非工作日
export const recordCalendar = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/accountCalendarInfo/recordCalendar`,
    method: 'post',
    data,
    headers,
  });
};

// 设置工作时间:
export const recordWorkTime = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/accountCalendarInfo/recordWorkTime`,
    method: 'post',
    data,
    headers,
  });
};
