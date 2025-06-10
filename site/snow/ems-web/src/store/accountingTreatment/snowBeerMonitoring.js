import { getC1TableData, getC2TableData, getC3TableData, getCategoryOptions, getCount } from '@api/snowBeerMonitoring';
import { makeAutoObservable } from 'mobx';

const FUNC_MAP = {
  C1: getC1TableData,
  C2: getC2TableData,
  C3: getC3TableData,
};

export default class BaseStore {
  constructor() {
    makeAutoObservable(this);
  }

  loading = false;

  tableLoading = false;

  activeKey = 'C1';

  dataSource = [];

  total = 0;

  pageIndex = 1;

  pageSize = 10;

  searchParams = {};

  selectRowKeys = [];

  get tableParams() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ...this.searchParams,
    };
  }

  // c1: 待导入ERP c2: 待ERP生成发票 c3: 已生成发票
  statisticNumber = {
    C1: 0,
    C2: 0,
    C3: 0,
  };

  categoryOptions = [];

  // 进入页面时调用
  initPage = () => {
    this.pageIndex = 1;
    this.searchParams = {};

    this.getStatisticNumber();

    return Promise.all([this.getOptions()]).then(res => {
      // this.getTableData();
      return res;
    });
  };

  // 获取业务类别
  getOptions = () => {
    return getCategoryOptions().then(res => {
      this.categoryOptions = (res.data.categorys || []).map(item => ({
        label: item.dictName,
        value: item.dictName,
      }));
    });
  };

  // 获取3个统计数据
  getStatisticNumber = () => {
    const countTypeArr = ['C1', 'C2', 'C3'];
    return Promise.all(countTypeArr.map(countType => this.getStatisticNumberByKey(countType)));
  };

  // 根据key获取统计数据
  getStatisticNumberByKey = key => {
    return getCount({ countType: key }).then(res => {
      this.statisticNumber[key] = res.data[key];
      return res;
    });
  };

  // 获取列表数据
  getTableData = (data = {}) => {
    if (this.tableLoading) return;

    const getDataFunc = FUNC_MAP[this.activeKey || 'C1'];
    this.tableLoading = true;
    this.dataSource = [];
    this.selectRowKeys = [];
    this.total = 0;
    return getDataFunc({
      ...this.tableParams,
      ...data,
    })
      .then(res => {
        this.dataSource = res.data.data;
        this.total = res.data.total;
        return res;
      })
      .finally(() => {
        this.tableLoading = false;
      });
  };
}
