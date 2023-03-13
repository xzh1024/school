import { Reducer } from "redux";
import { Effect } from "dva";
import { loadPartnerList, changePartner } from "@/services/api";
import { PartnerModel } from "@/constant";

export interface EleListModelState {
  list: PartnerModel[];
}

export interface EleListModelType {
  namespace: string;
  state: EleListModelState;
  effects: {
    loadData: Effect;
    addData: Effect;
    changePartner: Effect;
  };
  reducers: {
    saveData: Reducer<EleListModelState>;
    changeData: Reducer<EleListModelState>;
  };
}

const defaultStatus: EleListModelState = {
  list: [],
};

const Model: EleListModelType = {
  namespace: "electricity",
  state: {
    ...defaultStatus,
  },

  effects: {
    *loadData({ payload }, { call, put }) {
      const response = yield call(loadPartnerList, payload);
      yield put({
        type: "saveData",
        payload: response,
      });
    },
    *addData(_, { call, put }) {
      const response = yield call(loadPartnerList);
      yield put({
        type: "saveData",
        payload: response,
      });
    },
    *changePartner({ payload }, { call, put }) {
      yield call(changePartner, payload);
      yield put({
        type: "changeData",
        payload,
      });
    },
  },

  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    changeData(state, { payload }) {
      let list: PartnerModel[] = [];
      if (state && state.list) {
        list = [...state.list];
      }
      const oldData = list.find((item: PartnerModel) => item.partnerKey === payload.partnerKey);
      if (oldData) {
        Object.keys(payload).forEach(key => {
          oldData[key] = payload[key];
        });
      }

      return {
        ...defaultStatus,
        ...state,
        list: list,
      };
    },
  },
};

export default Model;
