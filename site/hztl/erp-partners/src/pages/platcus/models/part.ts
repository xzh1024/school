import { Effect } from "dva";
import { Reducer } from "redux";
import { loadPlatList, loadCustomerList, relevanceCustomer } from "@/services/api";
import { PaginationData, defaultPageSize } from "@/constant";
import { PlatConnectState } from ".";
import { message } from "antd"

export interface PartSearchModel {
  id?: string;
  name?: string;
  code?: string;
}

export interface RelevanceDataModel {
  partnerKey?: string;
  erpId?: string;
  erpCode?: string;
  erpName?: string;
  id?: string;
  name?: string;
  province?: string;
  city?: string;
  district?: string;
  address?: string;
  contacts?: string;
  phone?: string;
}

export interface PlatModelState {
  list: RelevanceDataModel[];
  selectedRowKeys: string[] | number[];
  search: PartSearchModel;
  totalSize: 0;
  paginationData: PaginationData;
  visible: boolean;
  relevanceData: RelevanceDataModel;
  customerList: PartSearchModel[];
  selectedCustomer: PartSearchModel;
  allList: RelevanceDataModel[]
}

export interface PartModelType {
  namespace: string;
  state: PlatModelState;
  effects: {
    fetchData: Effect;
    searchChange: Effect;
    upStateChange: Effect;
    updateDialogVisible: Effect;
    fetchCustomerData: Effect;
    saveSelectedCustomerPatch: Effect;
    relevelCustomer: Effect;
    filterData: Effect;
    searchDialogData: Effect;
    paginationDataChange: Effect;
  };
  reducers: {
    clearData: Reducer<PlatModelState>;
    saveData: Reducer<PlatModelState>;
    saveSelectedRowKeys: Reducer<PlatModelState>;
    saveSearch: Reducer<PlatModelState>;
    savePaginationData: Reducer<PlatModelState>;
    saveRelevantData: Reducer<PlatModelState>;
    changeVisible: Reducer<PlatModelState>;
    saveCustomerData: Reducer<PlatModelState>;
    saveSelectedCustomer: Reducer<PlatModelState>;
    saveAllData: Reducer<PlatModelState>;
  };
}

const defaultStatus: PlatModelState = {
  list: [],
  selectedRowKeys: [],
  search: {},
  paginationData: {
    current: 1,
    pageSize: defaultPageSize,
  },
  totalSize: 0,
  visible: false,
  relevanceData: {},
  customerList: [],
  selectedCustomer: {},
  allList: []
};

const UserModel: PartModelType = {
  namespace: "platList",

  state: {
    ...defaultStatus,
  },

  effects: {
    *fetchData(_, { call, put, select }) {
      // const loadParams = yield select((state: PlatConnectState) => {
      //   return {
      //     ...state.platList.search
      //   };
      // });
      // if (loadParams) {
      try {
        const response = yield call(loadPlatList);
        yield put({
          type: "saveAllData",
          payload: response
        })
        yield put({
          type: "saveData",
          payload: response,
        });
      } catch (error) {
        yield put({
          type: "clearData",
        });
      }
      // }
    },
    *searchChange({ payload }, { put }) {
      yield put({
        type: "filterData",
        payload: payload
      })
    },
    *filterData({ payload }, { put, select }) {
      const responseList = yield select((state: PlatConnectState) => {
        let returnList = state.platList.allList.filter((item) => {
          let isFilter = true;
          if (payload.name && item.name && item.name.indexOf(payload.name) == -1) {
            isFilter = false
          }
          if (payload.contacts && item.contacts && item.contacts.indexOf(payload.contacts) == -1) {
            isFilter = false
          }
          if (payload.address && item.address && item.address.indexOf(payload.address) == -1) {
            isFilter = false
          }
          return isFilter;
        })
        return returnList
      });
      yield put({
        type: "saveData",
        payload: responseList
      })
    },
    * upStateChange({ payload }, { put }) {
      yield put({
        type: "clearData",
      });
      yield put({
        type: "fetchData",
        payload,
      });
    },
    * updateDialogVisible({ payload }, { put, select }) {
      const loadParams = yield select((state: PlatConnectState) => {
        return state.platList.visible
      });
      yield put({
        type: "clearData",
        payload: true
      });
      if (!loadParams) {
        yield put({
          type: "fetchCustomerData",
          payload: {}
        })
        yield put({
          type: "saveSelectedCustomer",
          payload: {}
        })
      }
      yield put({
        type: "saveRelevantData",
        payload: payload ? payload : {}
      })
      yield put({
        type: "changeVisible"
      })
    },
    *searchDialogData({ payload }, { put }) {
      yield put({
        type: "fetchCustomerData",
        payload: payload
      })
    },
    * fetchCustomerData({ payload }, { call, put }) {
      const postData = JSON.parse(JSON.stringify(payload));
      try {
        const response = yield call(loadCustomerList, postData);
        yield put({
          type: "saveCustomerData",
          payload: response,
        });
      } catch (error) {
        yield put({
          type: "clearData",
          payload: true
        });
      }
    },
    * saveSelectedCustomerPatch({ payload }, { put }) {
      yield put({
        type: "saveSelectedCustomer",
        payload: payload,
      });
    },
    * relevelCustomer(_, { call, put, select }) {
      const loadParams = yield select((state: PlatConnectState) => {
        return {
          ...state.platList.relevanceData,
          erpCode: state.platList.selectedCustomer.code,
          erpId: state.platList.selectedCustomer.id,
          erpName: state.platList.selectedCustomer.name,
          partnerKey: "HNW"
        }
      });
      try {
        yield call(relevanceCustomer, loadParams);
        yield put({
          type: "fetchData",
          payload: {}
        });
        yield put({
          type: "updateDialogVisible"
        })
        message.success('关联成功');
      } catch (error) {
        yield put({
          type: "clearData",
          payload: true
        });
      }
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
  },

  reducers: {
    clearData(state, { payload }) {
      if (payload) {
        return {
          ...defaultStatus,
          ...state,
          customerList: [],
        };
      } else {
        return {
          ...defaultStatus,
          ...state,
          list: [],
        };
      }

    },
    saveCustomerData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        customerList: payload ? payload.rows : []
      };
    },
    saveAllData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        allList: payload ? payload.rows || [] : [],
      };
    },
    saveData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        list: payload ? payload.rows || [] : [],
      };
    },
    saveSelectedRowKeys(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        selectedRowKeys: payload,
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
    saveRelevantData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        relevanceData: payload,
      };
    },
    changeVisible(state) {
      return {
        ...defaultStatus,
        ...state,
        visible: state ? !state.visible : false,
      };
    },
    saveSelectedCustomer(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        selectedCustomer: payload,
      };
    }
  },
};

export default UserModel;
