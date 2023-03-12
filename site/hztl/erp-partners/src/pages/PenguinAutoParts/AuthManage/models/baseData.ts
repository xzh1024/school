import { Effect } from "dva";
import { Reducer } from "redux";
import { loadPartnerList } from "@/services/api";

export interface BaseDataModelState {
  eleList: [];
}

export interface BaseDataModelType {
  namespace: string;
  state: BaseDataModelState;
  effects: {
    fetchEleList: Effect;
  };
  reducers: {
    saveEleList: Reducer<BaseDataModelState>;
  };
}

const defaultStatus: BaseDataModelState = {
  eleList: [],
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
  },

  reducers: {
    saveEleList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        eleList: payload,
      };
    },
  },
};

export default BaseDataModel;
