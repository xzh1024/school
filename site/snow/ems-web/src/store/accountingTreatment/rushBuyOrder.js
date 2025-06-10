import { getData } from '@api/accountingTreatment/rushBuyOrder';
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

  searchParams = {};

  getList = (params = {}) => {
    this.loading = true;
    return getData({
      ...this.searchParams,
      pageIndex: this.pageCount,
      pageSize: this.pageSize,
      ...params,
    })
      .then(res => {
        this.dataSource = res.data.data;
        this.total = res.data.total;
        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
