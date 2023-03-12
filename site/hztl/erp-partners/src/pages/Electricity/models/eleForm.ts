import { Reducer } from "redux";
import { Effect } from "dva";
import { loadPartnerList } from "@/services/api";
import { PartnerModel } from "@/constant";

export interface EleFormModelState {
  edit: boolean;
  data: PartnerModel;
}

export interface EleFormModelType {
  namespace: string;
  state: EleFormModelState;
  effects: {
    saveEditData: Effect;
  };
  reducers: {
    openEdit: Reducer<EleFormModelState>;
    closeEdit: Reducer<EleFormModelState>;
  };
}

const Model: EleFormModelType = {
  namespace: "eleForm",

  state: {
    edit: false,
    data: {},
  },

  effects: {
    *saveEditData({ payload }, { call, put }) {
      yield call(loadPartnerList, payload);
      yield put({
        type: "electricity/changePartner",
        payload,
      });
      yield put({
        type: "closeEdit",
      });
    },
  },
  reducers: {
    openEdit(state, { payload }) {
      return {
        ...state,
        edit: true,
        data: payload,
      };
    },
    closeEdit(state) {
      return {
        ...state,
        edit: false,
        data: {},
      };
    },
  },
};

export default Model;
