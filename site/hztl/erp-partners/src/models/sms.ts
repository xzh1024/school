import { Effect } from "dva";
import { Reducer } from "redux";
import { sleep } from "@/utils/utils";
import { sendSms } from "@/services/api";

export interface SmsModelState {
  cutDown: number;
}

const defaultState: SmsModelState = {
  cutDown: 0,
};

let isCutDowning = false;
const defaultCutDown = 60;

export interface SmsModelType {
  namespace: string;
  state: SmsModelState;
  effects: {
    sendSms: Effect;
    interval: Effect;
  };
  reducers: {
    cutDownTime: Reducer<SmsModelState>;
    setDownTime: Reducer<SmsModelState>;
  };
}

const BaseDataModel: SmsModelType = {
  namespace: "sms",

  state: {
    ...defaultState,
  },

  effects: {
    *sendSms({ payload }, { put, call }) {
      if (isCutDowning) {
        return;
      }
      yield call(sendSms, payload);
      isCutDowning = true;
      yield put({
        type: "setDownTime",
        payload: defaultCutDown,
      });
      yield put({
        type: "interval",
      });
    },
    *interval(_, { put }) {
      yield sleep(1000);
      yield put({
        type: "cutDownTime",
      });
      if (isCutDowning) {
        yield put({
          type: "interval",
        });
      }
    },
  },

  reducers: {
    cutDownTime(state) {
      let cutDown = state?.cutDown || 0;
      if (cutDown > 0) {
        cutDown--;
      }
      if (cutDown <= 0) {
        isCutDowning = false;
      }
      return {
        ...defaultState,
        ...state,
        cutDown,
      };
    },
    setDownTime(state, { payload }) {
      return {
        ...defaultState,
        ...state,
        cutDown: payload,
      };
    },
  },
};

export default BaseDataModel;
