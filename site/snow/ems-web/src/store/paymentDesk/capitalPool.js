import { getList } from '@api/paymentDesk/capitalPool';
import { makeAutoObservable } from 'mobx';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  total = 0;

  pageIndex = 1;

  pageSize = 10;

  loading = false;

  search = {};
  modaltitle = '';
  dataSource = [];
  showModal = false;
  currentRecord = {};

  get baseParams() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ...this.search,
    };
  }

  getTableList = (data = {}) => {
    this.dataSource = [];
    this.total = 0;
    if (this.loading) return;
    this.loading = true;
    return getList({
      ...this.baseParams,
      ...data,
    })
      .then(res => {
        console.log(res, 'res');
        this.dataSource = res.data.records;
        this.total = res.data.total;
        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
