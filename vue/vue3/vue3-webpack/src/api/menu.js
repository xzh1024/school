import request from './request';

export const getMenuList = () => {
  return request({
    url: '/menus'
  });
};
