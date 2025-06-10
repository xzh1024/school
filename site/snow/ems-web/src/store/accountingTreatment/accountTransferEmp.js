import { getList, attendancelistPage } from '@api/accountingTreatment/accountTransferEmp';
import { makeAutoObservable } from 'mobx';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  total = 0;

  pageIndex = 1;

  pageSize = 10;
  totallat = 0;

  pageIndexlat = 1;

  pageSizelat = 10;

  loading = false;

  search = {};
  modaltitle = '';
  dataSource = [];
  dataSourcelat = [];
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
    if (this.loading) return;
    this.total = 0;
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
  attendancelist = (data = {}) => {
    if (this.loading) return;
    this.loading = true;
    return attendancelistPage({
      ...this.baseParams,
      ...data,
    })
      .then(res => {
        console.log(res, 'res');
        this.dataSourcelat = res.data.records;
        this.totallat = res.data.total;
        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
