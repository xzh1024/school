import { Effect } from "dva";
import { Reducer } from "redux";
import { loadPartsStoreList, loadPartsPropertyList, loadPriceTypeList } from "@/services/base";
import { PartsStoreModel, PriceTypeModel } from "@/constant";

export interface BaseDataModelState {
  partsStoreList: PartsStoreModel[];
  partsPriceList: PriceTypeModel[];
  partsPropertyList: string[];
}

const defaultState: BaseDataModelState = {
  partsStoreList: [],
  partsPriceList: [],
  partsPropertyList: [],
};

export interface BaseDataModelType {
  namespace: string;
  state: BaseDataModelState;
  effects: {
    fetchPartsStoreList: Effect;
    fetchPartsPariceList: Effect;
    fetchPartsPropertyList: Effect;
  };
  reducers: {
    savePartsStoreList: Reducer<BaseDataModelState>;
    savePartsPariceList: Reducer<BaseDataModelState>;
    savePartsPropertyList: Reducer<BaseDataModelState>;
  };
}

const BaseDataModel: BaseDataModelType = {
  namespace: "partnerBaseData",

  state: {
    ...defaultState,
  },

  effects: {
    *fetchPartsStoreList(_, { put, call }) {
      const response = yield call(loadPartsStoreList);
      yield put({
        type: "savePartsStoreList",
        payload: response,
      });
    },
    *fetchPartsPariceList(_, { put, call }) {
      const response = yield call(loadPriceTypeList);
      yield put({
        type: "savePartsPariceList",
        payload: response,
      });
    },
    *fetchPartsPropertyList(_, { put, call }) {
      const response = yield call(loadPartsPropertyList);
      yield put({
        type: "savePartsPropertyList",
        payload: response,
      });
    },
  },

  reducers: {
    savePartsStoreList(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        partsStoreList: payload,
      };
    },
    savePartsPariceList(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        partsPriceList: payload,
      };
    },
    savePartsPropertyList(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        partsPropertyList: payload,
      };
    },
  },
};

export default BaseDataModel;
