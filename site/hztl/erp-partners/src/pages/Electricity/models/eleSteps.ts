import { Reducer } from "redux";
import { Effect } from "dva";
import { getDealerParams, createPartner, loadUnOpenPartnerList } from "@/services/api";
import { EleConnectState } from ".";

export const createEleSteps = [
  {
    title: "电商账号验证",
    description: "仅用于获取您在电商的用户ID",
  },
  {
    title: "电商设置",
    description: "选择您想要的方式跟电商合作",
  },
];

export interface EleStepModelState {
  unOpenPartnerList: [];
  partnerKey: string;
  dealerParams: object;
  currentStep: number;
  isOpend: boolean;
}

export interface EleStepModelType {
  namespace: string;
  state: EleStepModelState;
  effects: {
    fetchUnOpenPartnerList: Effect;
    getDealerParams: Effect;
    createEle: Effect;
  };
  reducers: {
    saveUnOpenList: Reducer<EleStepModelState>;
    changePartnerKey: Reducer<EleStepModelState>;
    setDealerParams: Reducer<EleStepModelState>;
    preStep: Reducer<EleStepModelState>;
    nextStep: Reducer<EleStepModelState>;
    cancleStep: Reducer<EleStepModelState>;
    openStep: Reducer<EleStepModelState>;
  };
}

const defaultState: EleStepModelState = {
  unOpenPartnerList: [],
  partnerKey: "",
  dealerParams: {},
  currentStep: 0,
  isOpend: false,
};

const Model: EleStepModelType = {
  namespace: "eleSteps",
  state: {
    ...defaultState,
  },

  effects: {
    *fetchUnOpenPartnerList(_, { select, put, call }) {
      const response = yield call(loadUnOpenPartnerList);
      yield put({
        type: "saveUnOpenList",
        payload: response,
      });

      const partnerKey = yield select((state: EleConnectState) => {
        return state.eleSteps.partnerKey;
      });
      if (!partnerKey) {
        yield put({
          type: "changePartnerKey",
          payload: response[0].key,
        });
      }
    },
    *getDealerParams({ payload }, { call, put, select }) {
      const response = yield call(getDealerParams, payload);
      yield put({
        type: "setDealerParams",
        payload: response,
      });
      yield put({
        type: "nextStep",
      });
    },
    *createEle({ payload }, { call, put, select }) {
      const params = yield select((state: EleConnectState) => {
        return {
          ...state.eleSteps.dealerParams,
          partnerKey: state.eleSteps.partnerKey,
        };
      });
      yield call(createPartner, {
        ...params,
        ...payload,
      });
      yield put({
        type: "nextStep",
      });
      yield put({
        type: "electricity/loadData",
      });
    },
  },

  reducers: {
    saveUnOpenList(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        unOpenPartnerList: payload,
      };
    },
    changePartnerKey(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        partnerKey: payload,
      };
    },
    setDealerParams(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        dealerParams: payload,
      };
    },
    openStep(state) {
      return {
        ...defaultState,
        ...state,
        currentStep: 0,
        isOpend: true,
      };
    },
    preStep(state) {
      let currentStep = state ? state.currentStep : 0;
      if (currentStep > 0) {
        currentStep--;
      }
      return {
        ...defaultState,
        ...state,
        currentStep,
      };
    },
    nextStep(state) {
      let currentStep = state ? state.currentStep : 0;
      if (currentStep < createEleSteps.length - 1) {
        currentStep++;
        return {
          ...defaultState,
          ...state,
          currentStep,
        };
      }
      return {
        ...defaultState,
        ...state,
        currentStep: 0,
        isOpend: false,
      };
    },
    cancleStep(state) {
      return {
        ...defaultState,
        ...state,
        currentStep: 0,
        isOpend: false,
      };
    },
  },
};

export default Model;
