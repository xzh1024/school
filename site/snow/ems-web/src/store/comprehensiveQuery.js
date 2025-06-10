import { getData } from '@api/comprehensiveQuery';
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

  searchParams = {
  };

  getList = (params = {}, operationType = 1) => {
    this.loading = true;
    return getData({
      ...this.searchParams,
      currentPage: this.pageCount,
      pageSize: this.pageSize,
      ...params,
      operationType
    })
      .then(res => {
        if (operationType === 1) {
          this.dataSource = res.data.records;
          this.total = res.data.total;
          return res;
        }
        window.$message.success(res.message || '文件导出中，请于2-3分钟后点击下载按钮进行下载，谢谢！');
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
