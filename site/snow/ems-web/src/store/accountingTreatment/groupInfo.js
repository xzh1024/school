import { getList } from '@api/accountingTreatment/groupInfo';
import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }

  pageIndex = 1;

  pageSize = 10;

  loading = false;

  dataSource = [];
  selectKey = [];
  total = 0;
  downloadCenterShow = false;
  searchParams = {};
  showModal = false;
  currentRecord = {};
  modaltitle = '';

  getTableList = (params = {}, operationType = 1) => {
    this.total = 0;
    this.loading = true;
    return getList({
      ...this.searchParams,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ...params,
      operationType,
    })
      .then(res => {
        this.dataSource = res.data.records;
        this.total = res.data.total;
        this.loading = false;
        return res;

        // window.$message.success(res.message || '文件导出中，请于2-3分钟后点击下载按钮进行下载，谢谢！');
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
