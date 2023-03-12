import { Effect } from "dva";
import { Reducer } from "redux";
import { loadPartList, publishParts, unpublishParts } from "@/services/api";
import { PartModel, PaginationData, defaultPageSize } from "@/constant";
import { PartConnectState } from ".";

export interface PartSearchModel {
  partnerKey?: string;
  code?: string;
  name?: string;
  brand?: string;
}

export interface PartModelState {
  list: PartModel[];
  selectedRowKeys: string[] | number[];
  search: PartSearchModel;
  isUp: boolean;
  totalSize: 0;
  paginationData: PaginationData;
}

export interface PartModelType {
  namespace: string;
  state: PartModelState;
  effects: {
    fetchData: Effect;
    searchChange: Effect;
    paginationDataChange: Effect;
    upStateChange: Effect;
    publish: Effect;
    unpublish: Effect;
  };
  reducers: {
    clearData: Reducer<PartModelState>;
    saveData: Reducer<PartModelState>;
    saveSelectedRowKeys: Reducer<PartModelState>;
    saveSearch: Reducer<PartModelState>;
    saveUpState: Reducer<PartModelState>;
    savePaginationData: Reducer<PartModelState>;
  };
}

const defaultStatus: PartModelState = {
  list: [],
  selectedRowKeys: [],
  search: {},
  paginationData: {
    current: 1,
    pageSize: defaultPageSize,
  },
  isUp: false,
  totalSize: 0,
};

const UserModel: PartModelType = {
  namespace: "part",

  state: {
    ...defaultStatus,
  },

  effects: {
    *fetchData(_, { call, put, select }) {
      const loadParams = yield select((state: PartConnectState) => {
        return {
          ...state.part.search,
          page: state.part.paginationData.current,
          pageSize: state.part.paginationData.pageSize,
          isUp: state.part.isUp,
        };
      });

      if (loadParams.partnerKey) {
        try {
          const response = yield call(loadPartList, loadParams);
          yield put({
            type: "saveData",
            payload: response,
          });
        } catch (error) {
          yield put({
            type: "clearData",
          });
        }
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
    *upStateChange({ payload }, { put }) {
      yield put({
        type: "clearData",
      });
      yield put({
        type: "saveUpState",
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
    *publish({ payload }, { select, call, put }) {
      const params = yield select((state: PartConnectState) => ({
        partnerKey: state.part.search.partnerKey,
        isAll: payload,
        partIds: payload ? undefined : state.part.selectedRowKeys,
      }));
      yield call(publishParts, params);
      yield put({
        type: "fetchData",
        payload,
      });
    },
    *unpublish({ payload }, { select, call, put }) {
      const params = yield select((state: PartConnectState) => ({
        partnerKey: state.part.search.partnerKey,
        isAll: payload,
        partIds: payload ? undefined : state.part.selectedRowKeys,
      }));
      yield call(unpublishParts, params);
      yield put({
        type: "fetchData",
        payload,
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
    saveUpState(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        isUp: payload,
      };
    },
    savePaginationData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        paginationData: payload,
      };
    },
  },
};

export default UserModel;
