import { getList } from '@api/accountingTreatment/dispatchManagement';
import { makeAutoObservable } from 'mobx';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  dataSource = [];

  total = 0;

  currentPage = 1;

  pageSize = 10;

  loading = false;

  searchParams = {};

  get pageParams() {
    return {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      ...this.searchParams
    };
  }

  getTableList = (params = {}) => {
    const data = {
      ...this.pageParams,
      ...params,
    };
    this.loading = true;
    getList(data).then(res => {
      this.dataSource = res.data.records || [];
      this.total = res.data.total || 0;
    }).finally(() => {
      this.loading = false;
    });
  };
}
