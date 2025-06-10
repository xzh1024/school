import { getApproveList, getFeedbackList, getHaveReadList } from '@api/myBill/processed';
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

  searchParams = {};

  processState = 0;

  resetStore = () => {
    return new Promise(resolve => {
      this.pageCount = 1;
      this.pageSize = 10;
      this.loading = false;
      this.dataSource = [];
      this.total = 0;
      this.downloadCenterShow = false;
      this.searchParams = {};
      resolve();
    });
  };

  /**
   * 获取参数
   * @returns {object} 返回包含页码、页大小和搜索参数的对象
   */
  get getParams() {
    return {
      currentPage: this.pageCount, // 设置页码为总页数
      pageSize: this.pageSize, // 设置页大小为设置的页大小
      ...this.searchParams, // 将搜索参数对象中的属性合并到返回的对象中
    };
  }

  // 获取已审批
  getApproveLists = (params = {}) => {
    this.loading = true;
    getApproveList({
      // 1069106 bug
      // dateRange: 30,
      ...this.getParams,
      ...params,
    })
      .then(res => {
        const data = res.data;
        this.dataSource = data.records;
        this.total = data.total;
      })
      .finally(() => {
        this.loading = false;
      });
  };

  // 获取已阅列表
  getHaveReadLists = (params = {}) => {
    this.loading = true;
    getHaveReadList({
      ...this.getParams,
      ...params,
    })
      .then(res => {
        const data = res.data;
        this.dataSource = data.records;
        this.total = data.total;
      })
      .finally(() => {
        this.loading = false;
      });
  };

  // 获取已反馈列表
  getFeedbackLists = (params = {}) => {
    this.loading = true;
    getFeedbackList({
      ...this.getParams,
      ...params,
    })
      .then(res => {
        const data = res.data;
        this.dataSource = data.records;
        this.total = data.total;
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
