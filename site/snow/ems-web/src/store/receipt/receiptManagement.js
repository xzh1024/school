import { queryAcquirerBase, queryAcquiringByManager, savePostByManager } from '@api/Receipt';
import { makeAutoObservable } from 'mobx';

export default class ReceiptManagement {
  constructor() {
    // 可以不使用observable或者action
    makeAutoObservable(this);
  }

  pageCurrent = 1;

  pageSize = 10;

  total = 0;

  loading = false;

  dataSource = [];

  selectedRowKeys = [];

  receiptCabinetOptions = [];

  formSearch = {
    acquiringStatus: 1,
  };

  cacheDataSource = [];

  get params() {
    return {
      ...this.formSearch,
      pageIndex: this.pageCurrent,
      pageSize: this.pageSize,
    };
  }

  getParams = params => {
    return {
      ...this.params,
      ...params,
    };
  };

  postByExpress = params => {
    return savePostByManager({ acquiringIdList: this.selectedRowKeys, ...params, isConfirm: 1 }).then(res => {
      this.loading = false;
      window.$message.success('邮寄成功');
      this.getList({ userName: params.userName });
      return res;
    });
  };

  cancelPost = params => {
    this.loading = true;
    return savePostByManager({ ...params, acquiringIdList: this.selectedRowKeys, isConfirm: 0 })
      .then(res => {
        this.loading = false;
        window.$message.success('撤销成功');
        this.getList({ userName: params.userName });
        return res;
      })
      .catch(() => {
        this.loading = false;
      });
  };

  getAcquirerList = (userName, keyWord) => {
    this.receiptCabinetOptions = [];
    queryAcquirerBase({ acquirerName: keyWord, managerAccount: userName }).then(res => {
      const data = res.data;
      this.receiptCabinetOptions = data.map(item => ({
        label: item.acquirerName,
        value: item.acquirerId,
        origin: item,
      }));
    });
  };

  getList = params => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.selectedRowKeys = [];
    this.total = 0;
    return queryAcquiringByManager(this.getParams(params || {}))
      .then(res => {
        const { data } = res;
        this.total = data.total;
        this.dataSource = data.data;
        const ids = this.cacheDataSource.map(item => item.acquiringId);
        this.dataSource.forEach(item => {
          const index = ids.indexOf(item.acquiringId);
          if (index > -1 && item.acquiringStatus !== 1) {
            ids.splice(index, 1);
            const cache = [...this.cacheDataSource];
            cache.splice(index, 1);
            this.cacheDataSource = cache;
          }
        });

        return data.data;
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
