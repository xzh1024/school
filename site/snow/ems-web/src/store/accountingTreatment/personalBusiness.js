import { getList } from '@api/accountingTreatment/personalBusiness';
import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }

  pageIndex = 1;

  pageSize = 10;

  loading = false;

  dataSource = [];
  total = 0;
  searchParams = {};
  currentRecord = {};

  getTableList = (params = {}) => {
    this.total = 0;
    this.loading = true;
    return getList({
      ...this.searchParams,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ...params,
    })
      .then(res => {
        this.dataSource = res.data.records;
        this.total = res.data.total;
        this.loading = false;
        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
