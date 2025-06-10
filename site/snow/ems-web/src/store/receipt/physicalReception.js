import { queryAcquiringByReceiver, receivePost } from '@api/Receipt';
import { makeAutoObservable } from 'mobx';

export default class PhysicalReception {
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

  formSearch = {};

  get params() {
    return {
      ...this.formSearch,
      pageIndex: this.pageCurrent,
      pageSize: this.pageSize,
    };
  }

  getParams = params => {
    return {
      ...params,
      ...this.params,
    };
  };

  // 接收
  receiveList = (userName, isConfirm, id) => {
    this.loading = true;
    receivePost({ acquiringIdList: id ? [id] : this.selectedRowKeys, userName, isConfirm }).then(res => {
      this.loading = false;
      window.$message.success(isConfirm === 0 ? '撤销成功' : '接收成功');
      this.getList({ userName });
      return res;
    });
  };

  getList = params => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.selectedRowKeys = [];

    return queryAcquiringByReceiver(this.getParams(params || {}))
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
}
