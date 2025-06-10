import { getHistoryData, getWarningCount } from '@api/historyData';
import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }

  pageCount = 1;

  pageSize = 10;

  loading = false;

  dataSource = [];

  downloadCenterShow = false;

  claimUrlParams = {};

  currentRecord = {};

  searchParams = {};

  msgCount = 0;

  getList = (params = {}, operationType = 1) => {
    this.loading = true;
    return getHistoryData({
      ...this.searchParams,
      currentPage: this.pageCount,
      pageSize: this.pageSize,
      ...params,
      operationType,
    })
      .then(res => {
        if (operationType === 1) {
          this.dataSource = res.data.records;
          this.total = res.data.total;
          return res;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  };

  // 警示信息数量
  getMsgCount = claimId => {
    getWarningCount(claimId).then(res => {
      const { data } = res;
      this.msgCount = data || 0;
    });
  };
}
