import { queryAcquiringByBack, queryManager, saveAcquiringBack } from '@api/Receipt';
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

  getList = params => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.selectedRowKeys = [];
    this.errorRowKeys = [];

    return queryAcquiringByBack(this.getParams(params))
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

  editMult = params => {
    return saveAcquiringBack(params).then(res => {
      window.$message.success('修改成功');
      this.getList({ userName: params.userName });
    });
  };

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
