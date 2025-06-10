import { queryAcquiring, queryAcquiringByCache, savePostByPersonal, savePostCacheByPersonal } from '@api/Receipt';
import { makeAutoObservable } from 'mobx';

export default class PresentationManagement {
  constructor() {
    // 可以不使用observable或者action
    makeAutoObservable(this);
  }

  pageCurrent = 1;

  pageSize = 10;

  total = 0;

  loading = false;

  dataSource = [];

  cacheDataSource = [];

  selectedRowKeys = [];

  cacheSelected = [];

  formSearch = {
    acquiringStatus: 9,
  };

  activeKey = 'personal';

  errorRow = [];

  expressByDrawer = false;

  showExpressModal = false;

  get params() {
    return {
      pageIndex: this.pageCurrent,
      pageSize: this.pageSize,
      acquiringStatus: 9,
      ...this.formSearch,
    };
  }

  getParams = params => {
    return {
      ...this.params,
      ...params,
      sendByProxy: Number(this.activeKey === 'otherPerson'),
    };
  };

  getList = params => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.selectedRowKeys = [];
    this.dataSource = [];

    return queryAcquiring(this.getParams(params || {}))
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

  sendPost = params => {
    let claimIdList = this.selectedRowKeys.map(item => `${item}`.split('&&')[0]);
    if (this.expressByDrawer) {
      claimIdList = this.cacheDataSource.map(item => item.claimId);
    }
    const data = {
      ...params,
      claimIdList,
      isConfirm: 1,
      sendByProxy: this.activeKey === 'personal' ? 0 : 1,
      isCache: this.expressByDrawer ? 1 : 0,
    };
    return savePostByPersonal(data).then(res => {
      window.$message.success('邮寄成功');
      this.getList({ userName: params.userName });
      this.getCacheList({ userName: params.userName });
      if (this.expressByDrawer) {
        this.expressByDrawer = false;
      }
    });
  };

  cancelPost = params => {
    const data = {
      ...params,
      acquiringIdList: this.selectedRowKeys.map(item => `${item}`.split('&&')[1]),
      isConfirm: 0,
      sendByProxy: 0,
    };
    return savePostByPersonal(data).then(res => {
      window.$message.success('撤销成功');
      this.getList({ userName: params.userName });
    });
  };

  cacheSave = params => {
    this.loading = true;
    const data = {
      claimIdList: [params.claimId],
      sendByProxy: 1,
      userName: params.userName,
      isConfirm: 1,
    };
    savePostCacheByPersonal(data)
      .then(res => {
        window.$message.success(data.isConfirm === 1 ? '暂存成功' : `${params.claimId}已取消暂存`);
        this.getCacheList({ userName: params.userName });
      })
      .finally(() => {
        this.loading = false;
      });
  };

  cancelCache = (cacheId, userName) => {
    this.loading = true;
    const data = {
      cacheIdList: [cacheId],
      sendByProxy: 0,
      userName: userName,
      isConfirm: 0,
    };
    savePostCacheByPersonal(data)
      .then(res => {
        const cacheItem = this.cacheDataSource.find(item => item.cacheId === cacheId);
        window.$message.success(`${cacheItem?.claimNo} 已取消暂存`);
        this.getCacheList({ userName });
      })
      .finally(() => {
        this.loading = false;
      });
  };

  getCacheList = (params = {}) => {
    this.cacheSelected = [];
    const data = {
      ...params,
      pageIndex: 1,
      pageSize: 99999,
      sendByProxy: 0,
      acquiringStatus: 9,
    };

    return queryAcquiringByCache(data).then(res => {
      const { data } = res.data;
      this.cacheDataSource = data;
      this.expressByDrawer = false;
      return data;
    });
  };
}
