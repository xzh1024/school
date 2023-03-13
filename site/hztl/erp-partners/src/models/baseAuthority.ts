import { Effect } from "dva";
import { Reducer } from "redux";
import { featchHasPlat } from "@/services/api";

export interface BaseAuth {
  platShow: boolean;
}

const defaultState: BaseAuth = {
  platShow: false,
};

export interface BaseAuthModel {
  namespace: string;
  state: BaseAuth;
  effects: {
    getPlatAuth: Effect;
  };
  reducers: {
    savePlatAuth: Reducer<BaseAuth>;
  };
}

const BaseAuthData: BaseAuthModel = {
  namespace: "baseAuth",

  state: {
    ...defaultState,
  },

  effects: {
    *getPlatAuth(_, { call, put }) {
      const response = yield call(featchHasPlat);
      yield put({
        type: "savePlatAuth",
        payload: response
      })
    },
  },

  reducers: {
    savePlatAuth(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        platShow: payload,
      };
    },
  },
};

export default BaseAuthData;
