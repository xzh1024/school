import { getPositionList, getUserInfo } from '@api/dashboard';
import storage from '@u/storage';
import { makeAutoObservable } from 'mobx';

const STORAGE_KEY = 'ems-global';

const CURRENT_POSITION_KEY = 'ems-current-position';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
    this.loginUser = JSON.parse(storage.get(STORAGE_KEY) || '{}')?.loginUser || '';
    this.currentPosition = JSON.parse(storage.get(CURRENT_POSITION_KEY) || '{}');
  }

  loginUser = '';

  receiptLayoutHeaderTitle = '';

  role = [];

  urlParams = {};

  userInfo = {};

  positionList = [];

  currentPosition = {};

  reInit = false;

  // 获取用户信息
  getCurrentUserInfo = data => {
    return getUserInfo(data).then(res => {
      this.userInfo = res.data;
      sessionStorage.setItem('ems-current-info', JSON.stringify(res.data));
      return res;
    });
  };

  //获取岗位列表
  getPositionList = data => {
    return getPositionList(data).then(res => {
      this.positionList = res.data || [];
      const current = res.data.find(item => String(item.isMaster) === '1');
      if (!this.currentPosition.positionId) {
        this.currentPosition = current || {};

        storage.set(CURRENT_POSITION_KEY, current, 'sessionStorage');
      }
      return res;
    });
  };
}
