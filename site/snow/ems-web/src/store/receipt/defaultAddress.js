import {
  queryAcquirerBaseByPage,
  queryAcquiringDefaultAddressByUserAccount,
  queryMdOu,
  saveAcquiringDefaultAddress,
} from '@api/Receipt';
import { makeAutoObservable } from 'mobx';

export default class defaultAddress {
  constructor() {
    makeAutoObservable(this);
  }

  pageCurrent = 1;

  pageSize = 20;

  total = 0;

  loading = false;

  defaultAddress = '';

  dataSource = [];

  selectedRowKeys = [];

  selectedRow = undefined;

  formSearch = {};

  ouOptions = [];

  get pageParams() {
    return {
      ...this.formSearch,
      pageIndex: this.pageCurrent,
      pageSize: this.pageSize,
    };
  }

  getQueryParams(params) {
    return {
      ...this.pageParams,
      ...params,
    };
  }

  // 分页数据
  getList(params) {
    this.selectedRowKeys = [];
    this.selectedRow = undefined;
    this.loading = true;
    return queryAcquirerBaseByPage(this.getQueryParams(params || {}))
      .then(res => {
        this.dataSource = res.data.data;
        this.total = res.data.total;
        this.loading = false;
        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  getDefaultAddress(account) {
    this.loading = true;
    this.defaultAddress = '';
    return queryAcquiringDefaultAddressByUserAccount(account)
      .then(res => {
        this.defaultAddress = res.data?.acquirerAddress || '';
        return res.data?.acquirerAddress || '';
      })
      .finally(() => {
        this.loading = false;
      });
  }

  getOuOptions(compCodeOrName) {
    queryMdOu(compCodeOrName).then(res => {
      const { data } = res;
      this.ouOptions = data.map(ou => {
        return {
          label: ou.orgName,
          value: ou.compCode,
          origin: ou,
        };
      });
    });
  }

  updateDefaultAddress(userName) {
    if (!this.selectedRow) {
      return window.$message.warning('请选择数据');
    }
    this.loading = true;

    return saveAcquiringDefaultAddress({
      userName,
      acquirerAddress: this.selectedRow.acquirerAddress,
      defaultAcquirerId: this.selectedRow.acquirerId,
    })
      .then(res => {
        window.$message.success('修改默认地址成功');
        this.loading = false;
        this.getList();
        this.getDefaultAddress(userName);
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
