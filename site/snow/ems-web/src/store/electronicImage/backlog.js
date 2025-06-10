import { makeAutoObservable } from 'mobx';
import { getList } from '@/api/electronicImage/backlog';

export default class GlobalStore {
  constructor() {
    makeAutoObservable(this);
  }

  pageCount = 1;

  pageSize = 10;

  loading = false;

  dataSource = [];

  total = 0;

  downloadCenterShow = false;
  searchParams = {
    scanNumLen: 20,
  };

  /**
   * 获取参数
   * @returns {object} 返回包含页码、页大小和搜索参数的对象
   */
  get getParams() {
    return {
      pageIndex: this.pageCount, // 设置页码为总页数
      pageSize: this.pageSize, // 设置页大小为设置的页大小
      ...this.searchParams, // 将搜索参数对象中的属性合并到返回的对象中
    };
  }

  // 获取列表
  getLists = (params = {}) => {
    this.loading = true; // 设置loading状态为true
    this.total = 0; // 设置total值为0
    this.dataSource = [];
    // 调用getList函数获取列表数据
    return getList({
      ...this.getParams, // 传入getParams参数
      ...params, // 传入其他params参数
    })
      .then(res => {
        this.dataSource = res.data.pageResult.data;
        this.total = res.data.pageResult.total;
        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
