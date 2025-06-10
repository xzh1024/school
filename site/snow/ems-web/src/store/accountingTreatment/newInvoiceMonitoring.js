import {
  getAlreadyCount,
  getAlreadyFailedList,
  getCount,
  getErpFailedList,
  getFmsFailedList,
} from '@api/newInvoiceMonitoring';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';

const FUNC_MAP = {
  erpFailed: getErpFailedList,
  fmsFailed: getFmsFailedList,
  alreadyFailed: getAlreadyFailedList,
};

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  activeKey = 'erpFailed';

  loading = false;

  dataSource = [];

  pageIndex = 1;

  pageSize = 10;

  total = 0;

  selectKey = [];

  // 统计数字   erpFailed 待导入ERP   fmsFailed  待ERP生成发票  alreadyFailed 已生产发票
  statisticNumber = {
    erpFailed: 0,
    fmsFailed: 0,
    alreadyFailed: 0,
  };

  searchParams = {};

  get tableParams() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ...this.searchParams,
    };
  }

  init = () => {
    // this.getTableData()
    return Promise.all([this.getStatisticNumber()]);
  };

  getStatisticNumber = () => {
    return Promise.all([this.getAlready(), this.getOtherCount()]).then(res => {
      return res;
    });
  };

  getAlready = () => {
    return getAlreadyCount().then(res => {
      this.statisticNumber.alreadyFailed = res?.data.alreadyFailed || 0;
    });
  };

  getOtherCount = () => {
    return getCount().then(res => {
      this.statisticNumber.erpFailed = res?.data.erpFailed || 0;
      this.statisticNumber.fmsFailed = res?.data.fmsFailed || 0;
    });
  };

  getTableData = (params = {}) => {
    // 防止上一个请求加载过长，保证每个列表数据是正确的
    if (this.loading && this.cancelTableRequest) {
      this.cancelTableRequest();
      this.cancelTableRequest = null;
    };
    this.loading = true;
    this.dataSource = [];
    this.total = 0;
    this.selectKey = [];

    const func = FUNC_MAP[this.activeKey];

    return func(
      { ...this.tableParams, ...params },
      {
        cancelToken: new axios.CancelToken(cancel => {
          this.cancelTableRequest = cancel;
        }),
      },
    )
      .then(res => {
        this.dataSource = res.data.data;
        this.total = res.data.total;
        this.loading = false;
      })
      .catch((e) => {
        if (e.code !== 'ERR_CANCELED') {
          this.loading = false;
        }
      });
  };
}
