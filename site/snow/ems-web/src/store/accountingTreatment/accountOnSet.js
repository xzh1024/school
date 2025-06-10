import { getList, getEditList } from '@api/accountingTreatment/accountOffSet';
import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }
  //修改记录列表
  showEditMoadl = false;
  pageEditIndex = 1;
  pageEditSize = 10;
  editTotal = 0;
  editLoading = false;
  dataEditSource = [];

  pageIndex = 1;
  pageSize = 10;

  loading = false;
  exportLoading = false;

  dataSource = [];
  selectKey = [];
  total = 0;
  downloadCenterShow = false;
  searchParams = {};
  showModal = false;
  currentRecord = {};
  currentList = []; //批量修改的列表
  modaltitle = '';

  getTableList = (params = {}) => {
    this.total = 0;
    this.loading = true;
    return getList({
      ...this.searchParams,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      settingDiff: '1',
      ...params,
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

  getEditTableList = (params = {}) => {
    this.editTotal = 0;
    this.editLoading = true;
    return getEditList({
      pageIndex: this.pageEditIndex,
      pageSize: this.pageEditSize,
      settingDiff: '1',
      ...params,
    })
      .then(res => {
        this.dataEditSource = res.data.records;
        this.editTotal = res.data.total;
        this.editLoading = false;
        return res;
      })
      .finally(() => {
        this.editLoading = false;
      });
  };
}
