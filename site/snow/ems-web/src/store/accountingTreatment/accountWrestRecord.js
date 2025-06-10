import { getList } from '@api/accountingTreatment/accountWrestRecord';
import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }

  pageCount = 1;

  pageSize = 10;

  loading = false;

  dataSource = [];
  total = 0;

  downloadCenterShow = false;

  searchParams = {};

  getTableList = (params = {}, operationType = 1) => {
    this.total = 0;
    this.loading = true;
    return getList({
      ...this.searchParams,
      pageIndex: this.pageCount,
      pageSize: this.pageSize,
      ...params,
      operationType,
    })
      .then(res => {
        this.dataSource = res.data.data;
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
