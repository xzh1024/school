import { getAllGroup, getCertificationPackage, getList } from '@api/accountingTreatment/taskPoolMonitoring';
import { makeAutoObservable } from 'mobx';
export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  activeKey = '';
  // 重新分配弹框状态
  showRedistributionModel = false;
  // 分配到人弹框状态
  showAllocatedToIndividualsModal = false;
  // 一键派单弹框状态
  showOneClickDispatchingModal = false;
  //
  statisticLoading = false;
  //
  selectKey = [];
  selectRows = [];
  //
  allGroupOptions = [];
  // 认证包下拉框数据
  certificationPackageOptions = [];

  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  search = {};
  dataSource = [];
  grabOrdersAlreadyRobbedTableDataSource = [];
  notSpecifiedTableSource = [];
  undistributedTableSource = [];
  untreatedTableSource = [];
  currentRecord = {};

  modaltitle = '';

  showModal = false;

  get baseParams() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ...this.search,
    };
  }

  getTableList = (data = {}) => {
    if (this.loading) return;
    this.total = 0;
    this.notSpecifiedTableSource = [];
    this.undistributedTableSource = [];
    this.untreatedTableSource = [];
    this.grabOrdersAlreadyRobbedTableDataSource = [];
    this.loading = true;
    return getList({
      ...this.baseParams,
      ...data,
      activeKey: this.activeKey,
    })
      .then(res => {
        // let cuDataList = [];
        // if (
        //   [
        //     'grabOrders_wait',
        //     'grabOrders_alreadyRobbed',
        //     'review_notSpecified',
        //     'review_undistributed',
        //     'review_untreated',
        //   ].includes(this.activeKey)
        // ) {
        //   cuDataList = res.data.records;
        //   this.total = res.data.total;
        // } else {
        //   cuDataList = res.data.data;
        //   this.total = res.data.total;
        // }

        if (['review_notSpecified', 'accounting_notSpecified', 'grabOrders_wait'].includes(this.activeKey)) {
          this.notSpecifiedTableSource = res.data.records;
        } else if (['accounting_undistributed', 'review_undistributed'].includes(this.activeKey)) {
          this.undistributedTableSource = res.data.records;
        } else if (['accounting_untreated', 'review_untreated'].includes(this.activeKey)) {
          this.untreatedTableSource = res.data.records;
        } else {
          this.grabOrdersAlreadyRobbedTableDataSource = res.data.records;
        }
        this.total = res.data.total;

        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  };
  getAllGroupFunc = (data = {}) => {
    return getAllGroup(data).then(res => {
      this.allGroupOptions = res.data;
      return res;
    });
  };
  getCertificationPackageFunc = (data = {}) => {
    return getCertificationPackage().then(res => {
      this.certificationPackageOptions = res.data;
      return res;
    });
  };
}
