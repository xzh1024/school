// import storage from '@u/storage';
import { getEmsMenu } from '@api/layout';
import { makeAutoObservable } from 'mobx';
// const STORAGE_KEY = 'ems-global';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
    // this.loginUser = JSON.parse(storage.get(STORAGE_KEY) || '{}')?.loginUser || '';
  }

  loading = false;

  loginUser = '';

  receiptLayoutHeaderTitle = '';

  role = [];

  urlParams = {};

  menuList = [];

  menuSourceData = [];

  constRouterList = [];

  hideMenu = false;

  getList = (rote = [], childrenKey = 'children') => {
    let list = [];
    rote.forEach(item => {
      list.push(item);
      if (item[childrenKey]) {
        list = [...list, ...this.getList(item[childrenKey])];
      }
    });
    return list;
  };

  filterShowMenu = menuList => {
    let list = [];
    menuList.forEach(item => {
      if (item.isShow === 1) {
        if (item.children) {
          item.children = this.filterShowMenu(item.children);
        }
        list.push(item);
      }
    });
    return list;
  };

  // 获取菜单
  getMenu = () => {
    return getEmsMenu().then(res => {
      this.menuSourceData = this.filterShowMenu(res.data);
      this.menuList = this.getList(res.data);
      return this.menuList;
    });
  };
}
