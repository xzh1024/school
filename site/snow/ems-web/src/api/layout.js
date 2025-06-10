import axios from '@u/request';

// 获取菜单列表
export const getEmsMenu = () => {
  return axios({
    url: `/ems-ms/baseService/menu/menuTree`,
    method: 'post',
    data: {
      menuType: '新业务菜单',
    },
  });
};

// 获取菜单列表
export const jumpOutLink = data => {
  return axios({
    url: `/ems-ms/baseService/menu/thirdLocation`,
    method: 'post',
    data,
  });
};
