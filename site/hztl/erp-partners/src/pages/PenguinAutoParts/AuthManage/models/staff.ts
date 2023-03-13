import { Effect } from "dva";
import { Reducer } from "redux";
import { loadStaffList, generateStaffAuthCodeList, unauthStaffList } from "@/services/qeqp";
import { StaffModel, StaffAuthCodeModel, PaginationData, defaultPageSize, StaffBaseModel, StaffAuthParamsModel } from "@/constant";
import { StaffConnectState } from ".";
import { message } from "antd";

export interface StaffModelState {
  list: StaffModel[];
  selectedRowKeys: number[];
  search: StaffBaseModel;
  totalSize: 0;
  paginationData: PaginationData;
  checkAll: boolean;
  authCodeVisible: boolean;
  authRelieveVisible: boolean;
  authCodeList: StaffAuthCodeModel[];
  staffAuthParams: StaffAuthParamsModel;
}

export interface StaffModelType {
  namespace: string;
  state: StaffModelState;
  effects: {
    fetchData: Effect;
    searchChange: Effect;
    paginationDataChange: Effect;
    fetchAuthCodeList: Effect;
    authRelieveChange: Effect;
    confirmAuthRelieve: Effect;
  };
  reducers: {
    clearData: Reducer<StaffModelState>;
    saveData: Reducer<StaffModelState>;
    saveSelectedRowKeys: Reducer<StaffModelState>;
    saveSearch: Reducer<StaffModelState>;
    savePaginationData: Reducer<StaffModelState>;
    saveCheckAll: Reducer<StaffModelState>;
    saveStaffAuthParams: Reducer<StaffModelState>;
    saveAuthCodeVisible: Reducer<StaffModelState>;
    saveAuthRelieveVisible: Reducer<StaffModelState>;
    saveAuthCodeList: Reducer<StaffModelState>;
  };
}

const defaultStatus: StaffModelState = {
  list: [],
  selectedRowKeys: [],
  search: {
    name: "",
    code: "",
    department: "",
    bindStatus: 0,
  },
  paginationData: {
    current: 1,
    pageSize: defaultPageSize,
  },
  totalSize: 0,
  checkAll: false,
  authCodeVisible: false,
  authRelieveVisible: false,
  authCodeList: [],
  staffAuthParams: {},
};

const UserModel: StaffModelType = {
  namespace: "staff",

  state: {
    ...defaultStatus,
  },

  effects: {
    *fetchData(_, { call, put, select }) {
      yield put({
        type: "saveCheckAll",
        payload: false,
      });
      const loadParams = yield select((state: StaffConnectState) => {
        return {
          ...state.staff.search,
          page: state.staff.paginationData.current,
          pageSize: state.staff.paginationData.pageSize,
        };
      });
      try {
        const responseData = yield call(loadStaffList, loadParams);
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
    *fetchAuthCodeList({ payload }, { call, put }) {
      const responseData = yield call(generateStaffAuthCodeList, payload) || [];
      yield put({
        type: "saveAuthCodeList",
        payload: responseData,
      });
      if (responseData.length) {
        yield put({
          type: "saveAuthCodeVisible",
          payload: true,
        });
      } else {
        message.warning("选中的员工已全部授权，请重新选择！");
      }
    },
    *authRelieveChange({ payload }, { put }) {
      yield put({
        type: "saveStaffAuthParams",
        payload: payload,
      });
      yield put({
        type: "saveAuthRelieveVisible",
        payload: true,
      });
    },
    *confirmAuthRelieve({ payload }, { select, call, put }) {
      const params = yield select((state: StaffConnectState) => {
        return {
          ...state.staff.staffAuthParams
        }
      });
      yield call(unauthStaffList, params);
      message.success("解除授权操作成功！");
      yield put({
        type: "fetchData",
      });
      yield put({
        type: "saveAuthRelieveVisible",
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
        selectedRowKeys: [],
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
        list: payload ? payload.rows : [],
        selectedRowKeys: [],
        totalSize: payload ? payload.totalSize : 0,
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
    saveCheckAll(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        checkAll: payload,
      };
    },
    saveStaffAuthParams(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        staffAuthParams: {...payload},
      };
    },
    saveAuthCodeList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        authCodeList: payload,
      };
    },
    saveAuthCodeVisible(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        authCodeVisible: payload,
      };
    },
    saveAuthRelieveVisible(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        authRelieveVisible: payload,
      };
    },
  },
};

export default UserModel;
