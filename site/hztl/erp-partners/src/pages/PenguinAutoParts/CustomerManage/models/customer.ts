import { Effect } from "dva";
import { Reducer } from "redux";
import {
  loadCustomerList,
  loadErpCustomerList,
  batchBindCustomer,
  batchUnbindCustomer
} from "@/services/qeqp";
import {
  CustomerModel,
  StaffAuthCodeModel,
  PaginationData,
  defaultPageSize,
  CustomerBindParamModel,
  CustomerParamModel,
  ErpCustomerBaseModel,
  ErpCustomerParamModel,
  ErpCustomerModel,
} from "@/constant";
import { CustomerConnectState } from ".";
import { message } from "antd";

export interface CustomerModelState {
  list: CustomerModel[];
  selectedRows: CustomerModel[];
  search: CustomerParamModel;
  totalSize: 0;
  paginationData: PaginationData;
  checkAll: boolean;
  bindVisible: boolean;
  unbindVisible: boolean;
  authCodeList: StaffAuthCodeModel[];
  bindParams: CustomerBindParamModel;
  unbindParams: CustomerBindParamModel;
  erpCustomerList: ErpCustomerModel[];
  checkedErpCustomer: ErpCustomerBaseModel;
  isBind: boolean;
}

export interface CustomerModelType {
  namespace: string;
  state: CustomerModelState;
  effects: {
    fetchData: Effect;
    searchChange: Effect;
    paginationDataChange: Effect;
    loadErpCustomerList: Effect;
    startBindDialog: Effect;
    submitBind: Effect;
    startUnbindDialog: Effect;
    submitUnbind: Effect;
  };
  reducers: {
    clearData: Reducer<CustomerModelState>;
    saveData: Reducer<CustomerModelState>;
    saveSelectedRows: Reducer<CustomerModelState>;
    saveSearch: Reducer<CustomerModelState>;
    savePaginationData: Reducer<CustomerModelState>;
    saveCheckAll: Reducer<CustomerModelState>;
    saveBindParams: Reducer<CustomerModelState>;
    saveUnbindParams: Reducer<CustomerModelState>;
    showBindDialog: Reducer<CustomerModelState>;
    hideBindDialog: Reducer<CustomerModelState>;
    saveUnbindVisible: Reducer<CustomerModelState>;
    saveAuthCodeList: Reducer<CustomerModelState>;
    saveErpCustomerList: Reducer<CustomerModelState>;
    saveCheckedErpCustomer: Reducer<CustomerModelState>;
  };
}

const defaultStatus: CustomerModelState = {
  list: [],
  selectedRows: [],
  search: {
    erpName: "", // 往来单位
    name: "", // 企鹅汽配用户名
    bindStatus: 0, // 绑定状态（0: 全部, 1: 已绑定, 2: 未绑定）
    bindDateStart: "",
    bindDateEnd: "",
  },
  paginationData: {
    current: 1,
    pageSize: defaultPageSize,
  },
  totalSize: 0,
  checkAll: false,
  bindVisible: false,
  unbindVisible: false,
  authCodeList: [],
  bindParams: {},
  unbindParams: {},
  erpCustomerList: [],
  checkedErpCustomer: {
    erpId: "",
    erpCode: "",
    erpName: "",
  },
  isBind: false
};

const Model: CustomerModelType = {
  namespace: "customer",

  state: {
    ...defaultStatus,
  },

  effects: {
    *fetchData(_, { call, put, select }) {
      yield put({
        type: "saveCheckAll",
        payload: false,
      });
      const loadParams = yield select((state: CustomerConnectState) => {
        return {
          ...state.customer.search,
          page: state.customer.paginationData.current,
          pageSize: state.customer.paginationData.pageSize,
        };
      });
      try {
        const responseData = yield call(loadCustomerList, loadParams);
        yield put({
          type: "saveData",
          payload: responseData,
        });
      } catch (error) {
        yield put({
          type: "clearData",
        });
      }
    },
    *searchChange({ payload }, { put }) {
      yield put({
        type: "saveSearch",
        payload,
      });
      yield put({
        type: "fetchData",
        payload,
      });
    },
    *paginationDataChange({ payload }, { put }) {
      yield put({
        type: "savePaginationData",
        payload,
      });
      yield put({
        type: "fetchData",
        payload,
      });
    },
    *loadErpCustomerList({ payload }, { call, put }) {
      const params: ErpCustomerParamModel = {
        page: 1,
        pageSize: 50,
        name: payload
      };
      const responseData = yield call(loadErpCustomerList, params);
      yield put({
        type: "saveErpCustomerList",
        payload: responseData.rows || []
      })
    },
    // 绑定/换绑
    *startBindDialog({ payload, isBind }, { put }) {
      let params = {};
      // 区分批量操作
      if(payload.id) {
        params = {
          customers: [payload]
        }
        if(isBind) {
          yield put({
            type: "saveCheckedErpCustomer",
            payload: {
              erpId: payload.erpId,
              erpCode: payload.erpCode,
              erpName: payload.erpName,
            },
          });
        }
      } else {
        params = {...payload}
      }
      yield put({
        type: "loadErpCustomerList",
        payload: "",
      });
      yield put({
        type: "saveBindParams",
        payload: params,
      });
      yield put({
        type: "showBindDialog",
        payload: isBind
      });
    },
    *submitBind({ payload }, { select, call, put }) {
      const params = yield select((state: CustomerConnectState) => {
        return {
          ...state.customer.bindParams,
          erpCustomer: {
            ...state.customer.checkedErpCustomer
          }
        }
      });
      yield call(batchBindCustomer, params);
      message.success("绑定操作成功！");
      yield put({
        type: "hideBindDialog",
      });
      yield put({
        type: "fetchData",
        payload,
      });
    },
    // 解绑
    *startUnbindDialog({ payload }, { put }) {
      yield put({
        type: "saveUnbindParams",
        payload: payload,
      });
      yield put({
        type: "saveUnbindVisible",
        payload: true,
      });
    },
    *submitUnbind({}, { select, call, put }) {
      const params = yield select((state: CustomerConnectState) => {
        return {
          ...state.customer.unbindParams,
        }
      });
      yield call(batchUnbindCustomer, params);
      message.success("解绑操作成功！");
      yield put({
        type: "fetchData",
      });
      yield put({
        type: "saveUnbindVisible",
        payload: false,
      });
    },
  },

  reducers: {
    clearData(state) {
      return {
        ...defaultStatus,
        ...state,
        list: [],
        selectedRows: [],
        paginationData: {
          current: 1,
          pageSize: state?.paginationData?.pageSize || defaultPageSize,
        },
        totalSize: 0,
      };
    },
    saveData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        list: payload ? payload.rows || [] : [],
        selectedRows: [],
        totalSize: payload ? payload.totalSize : 0,
      };
    },
    saveSelectedRows(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        selectedRows: payload,
      };
    },
    saveSearch(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        search: payload,
      };
    },
    savePaginationData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        paginationData: payload,
      };
    },
    saveCheckAll(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        checkAll: payload,
      };
    },
    saveBindParams(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        bindParams: {
          partnerKey: "QEQP",
          ...payload
        },
      };
    },
    saveAuthCodeList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        authCodeList: payload,
      };
    },
    saveUnbindParams(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        unbindParams: {
          partnerKey: "QEQP",
          ...payload
        },
      };
    },
    showBindDialog(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        isBind: payload,
        bindVisible: true,
      };
    },
    hideBindDialog(state) {
      return {
        ...defaultStatus,
        ...state,
        bindVisible: false,
        checkedErpCustomer: {
          erpId: "",
          erpCode: "",
          erpName: "",
        },
      };
    },
    saveUnbindVisible(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        unbindVisible: payload,
      };
    },
    saveErpCustomerList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        erpCustomerList: payload,
      };
    },
    saveCheckedErpCustomer(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        checkedErpCustomer: {...payload},
      };
    },
  },
};

export default Model;
