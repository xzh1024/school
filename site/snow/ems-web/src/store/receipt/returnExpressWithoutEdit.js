import { queryAcquirerBaseByPage, queryAcquiringByBackWithUser, queryManager } from '@api/Receipt';
import { makeAutoObservable } from 'mobx';

export default class ReturnExpress {
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

  errorRowKeys = [];

  formSearch = {};

  managerOptions = [];

  updateTarget = undefined;

  acquiringList = [];

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

  getList = (params = {}) => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.selectedRowKeys = [];
    this.errorRowKeys = [];

    return queryAcquiringByBackWithUser(this.getParams(params))
      .then(res => {
        const { data, total } = res.data;
        this.total = total;
        this.dataSource = data;
        this.loading = false;

        return data;
      })
      .catch(() => {
        this.loading = false;
      });
  };

  getAcquirerList(userName) {
    return queryAcquirerBaseByPage({ managerAccount: userName, pageIndex: 1, pageSize: 999999 }).then(res => {
      this.acquiringList = res.data.data.map(item => {
        return {
          label: item.acquirerName,
          value: item.acquirerId,
          origin: item,
        };
      });
      return this.acquiringList;
    });
  }

  // 管理员选择数据
  getManagerOptions(managerAccountOrName) {
    queryManager(managerAccountOrName).then(res => {
      const { data } = res;
      this.managerOptions = data.map(manager => {
        return {
          label: manager.managerName,
          value: manager.managerAccount,
          origin: manager,
        };
      });
    });
  }
}
