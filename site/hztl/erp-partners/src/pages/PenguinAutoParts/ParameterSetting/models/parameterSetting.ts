import { Reducer } from "redux";
import { Effect } from "dva";
import { message } from "antd";
import { getSettingParam, saveSettingParam, getPriceTypes, getPartsStores } from "@/services/qeqp";
import { PartsStoreModel, PriceTypeModel } from "@/constant";

interface FormDataModel {
  warehouses?: string[];
  priceType?: string;
  auto?: boolean;
  autoPriceZero?: boolean;
  autoQtyZero?: boolean;
  autoNewCustomer?: boolean;
}

export interface PlatFormModelState {
  storeList: PartsStoreModel[];
  priceTypeList: PriceTypeModel[];
  formData: FormDataModel;
}

export interface ParameterSettingModel {
  namespace: string;
  state: PlatFormModelState;
  effects: {
    loadSetting: Effect;
    fetchSaveSetting: Effect;
    fetchPriceTypes: Effect;
    getPartsStores: Effect;
  };
  reducers: {
    setSettingParam: Reducer<PlatFormModelState>; // 修改设置
    setPriceTypes: Reducer<PlatFormModelState>;
    setWarehouseOptions: Reducer<PlatFormModelState>;
  };
}

const defaultStatus: PlatFormModelState = {
  storeList: [],
  priceTypeList: [],
  formData: {
    warehouses: [],
    priceType: "",
    auto: false,
    autoPriceZero: false,
    autoQtyZero: false,
    autoNewCustomer: false,
  },
};

const Model: ParameterSettingModel = {
  namespace: "parameterSetting",
  state: {
    ...defaultStatus,
  },
  effects: {
    // 获取参数设置
    *loadSetting({ payload }, { call, put }) {
      const response = yield call(getSettingParam);
      yield put({
        type: "setSettingParam",
        payload: {
          warehouses: response.warehouses || [],
          priceType: response.priceType || "",
          auto: !!response.auto,
          autoPriceZero: !!response.autoPriceZero,
          autoQtyZero: !!response.autoQtyZero,
          autoNewCustomer: !!response.autoNewCustomer,
        },
      });
    },
    // 保存参数设置
    *fetchSaveSetting({ payload }, { call, put }) {
      yield call(saveSettingParam, payload);
      message.success("参数设置保存成功！");
      yield put({
        type: "loadSetting",
        payload
      });
    },
    *fetchPriceTypes({ payload }, { call, put }) {
      const response = yield call(getPriceTypes) || [];
      yield put({
        type: "setPriceTypes",
        payload: response,
      });
    },
    // 获取配件仓库列表
    *getPartsStores({ payload }, { call, put }) {
      const response: PartsStoreModel[] = yield call(getPartsStores) || [];
      yield put({
        type: "setWarehouseOptions",
        payload: response,
      });
    },
  },
  // 以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
  // 能改变界面的action应该放这里,这里按官方意思不应该做数据处理，只是用来return state 从而改变界面
  reducers: {
    setSettingParam(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        formData: {...payload}
      };
    },
    setPriceTypes(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        priceTypeList: payload,
      };
    },
    setWarehouseOptions(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        storeList: payload,
      };
    },
  },
};

export default Model;
