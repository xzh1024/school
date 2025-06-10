import { queryAcquirerBaseByPage, queryManager, queryMdOu, queryOrg, saveOrUpdateAcquirerBase } from '@api/Receipt';
import { makeAutoObservable } from 'mobx';

export default class AddressManagement {
  constructor() {
    makeAutoObservable(this);
  }

  pageCurrent = 1;

  pageSize = 10;

  total = 0;

  loading = false;

  dataSource = [];

  ouOptions = [];

  departmentOptions = [];

  managerOptions = [];

  selectedRowKeys = [];

  selectedRows = [];

  formSearch = {};

  currentId = undefined;

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

  initSelectFields(params) {
    if (!this.managerOptions.map(item => item.value).includes(params.managerAccount)) {
      this.managerOptions = [
        ...this.managerOptions,
        {
          label: params.managerName,
          value: params.managerAccount,
        },
      ];
    }

    if (!this.ouOptions.map(item => item.value).includes(params.compCode)) {
      this.ouOptions = [
        ...this.ouOptions,
        {
          label: params.compName,
          value: params.compCode,
        },
      ];
    }

    if (!this.departmentOptions.map(item => item.value).includes(params.deptId)) {
      this.departmentOptions = [
        ...this.departmentOptions,
        {
          label: params.deptName,
          value: params.deptId,
        },
      ];
    }

    console.log(this.ouOptions, 3333);
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

  // 公司选择数据
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

  // 部门选择数据
  getDepartmentOptions(orgCodeOrName) {
    queryOrg(orgCodeOrName).then(res => {
      const { data } = res;
      this.departmentOptions = data.map(department => {
        return {
          label: department.orgName,
          value: department.id,
          origin: department,
        };
      });
    });
  }

  // 分页数据
  getList(params) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    return queryAcquirerBaseByPage(this.getQueryParams(params || {}))
      .then(res => {
        this.dataSource = res.data.data;
        this.total = res.data.total;
        this.pageCurrent = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.loading = false;
        this.selectedRowKeys = [];
        this.selectedRows = [];
        return res;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  // 新增数据
  addList(params) {
    this.loading = true;
    const compName = this.ouOptions.find(ou => ou.value === params.compCode)?.origin?.orgName;
    const managerName = this.managerOptions.find(manager => manager.value === params.managerAccount)?.origin
      ?.managerName;
    const deptName = this.departmentOptions.find(department => department.value === params.deptId)?.origin?.orgName;
    const data = {
      ...params,
      compName,
      managerName,
      deptName,
      orgName: compName,
    };
    return saveOrUpdateAcquirerBase(data)
      .then(res => {
        window.$message.success('添加成功');
        this.loading = false;
        this.getList();
        return res;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  // 修改数据
  updateLine(params) {
    this.loading = true;
    const compName = this.ouOptions.find(ou => ou.value === params.compCode)?.label || params.compName;
    const managerName =
      this.managerOptions.find(manager => manager.value === params.managerAccount)?.label || params.managerName;
    const deptName =
      this.departmentOptions.find(department => department.value === params.deptId)?.label || params.deptName;
    const data = {
      ...params,
      compName,
      managerName,
      deptName,
      acquirerId: this.currentId,
    };
    return saveOrUpdateAcquirerBase(data)
      .then(res => {
        window.$message.success('修改成功');
        this.loading = false;
        this.getList();
        return res;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  // 删除
  deleteLine(params) {
    this.loading = true;
    const data = {
      ...params,
      deleteFlag: 1,
    };
    return saveOrUpdateAcquirerBase(data)
      .then(res => {
        window.$message.success('删除成功');
        this.loading = false;
        this.getList();
        return res;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
