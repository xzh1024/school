import { Effect } from "dva";
import { Reducer } from "redux";
import { loadPartnerList } from "@/services/api";
import { loadPartsStoreList, loadPartsPropertyList } from "@/services/base";

export interface BaseDataModelState {
  eleList: [];
  storeList: [];
  propertyList: []
}

export interface BaseDataModelType {
  namespace: string;
  state: BaseDataModelState;
  effects: {
    fetchEleList: Effect;
    getStoreList: Effect;
    getPropertyList: Effect;
  };
  reducers: {
    saveEleList: Reducer<BaseDataModelState>;
    savePartsStoreList: Reducer<BaseDataModelState>;
    savePartsPropertyList: Reducer<BaseDataModelState>;
  };
}

const defaultStatus: BaseDataModelState = {
  eleList: [],
  storeList: [],
  propertyList: []
};

const BaseDataModel: BaseDataModelType = {
  namespace: "partBaseData",

  state: {
    ...defaultStatus,
  },

  effects: {
    *fetchEleList({ payload }, { call, put }) {
      const response = yield call(loadPartnerList, payload);
      yield put({
        type: "saveEleList",
        payload: response,
      });
    },
    *getStoreList(_, { put, call }) {
      const response = yield call(loadPartsStoreList);
      yield put({
        type: "savePartsStoreList",
        payload: response,
      });
    },
    *getPropertyList(_, { put, call }) {
      const response = yield call(loadPartsPropertyList);
      yield put({
        type: "savePartsPropertyList",
        payload: response,
      });
    },
  },

  reducers: {
    saveEleList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        eleList: payload,
      };
    },
    savePartsStoreList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        partsStoreList: payload,
      };
    },
    savePartsPropertyList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        partsPropertyList: payload,
      };
    },
  },
};

export default BaseDataModel;
