import { Reducer } from "redux";
import { Effect } from "dva";
import { toGetBase, toPostBranchMode, loadPlatformList, loadUnPlatformList, toGetAuthCode, toGetAuthToken, getDealerParams, createPartner, loadWarehouseList, clearStock } from "@/services/api";
import { loadPartsStoreList, loadPartsPropertyList,loadPriceTypeList, getSettingParam, saveSettingParam } from "@/services/base";
import { message,Modal } from "antd";
import { PlatFormListModel, UnPlatFormListModel,PartsStoreModel,PriceTypeModel,PartnerModel,WarehouseModel } from "@/constant";
import { PlatformConnectState } from ".";

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
  
export interface PlatFormModelState {
  list: PlatFormListModel[];
  unAuthed: UnPlatFormListModel[];
  propertyList:string[];
  storeList:PartsStoreModel[];
  priceList:PriceTypeModel[];
  priceZeroNotUpList:PriceTypeModel[];
  partnerKey:string;
  dialogShow:boolean;
  isTL:boolean;
  dialogData:PartnerModel;
  code:string;
  token:string;
  isOpend:boolean;
  currentStep:number;
  branchMode:boolean;
  warehouseList:WarehouseModel[];
}

export interface PlatFormModel {
  namespace: string;
  state: PlatFormModelState;
  effects: {
    loadData: Effect;
    loadDataUnauthed: Effect;
    getStoreList: Effect;
    getBase: Effect;
    postBranchMode: Effect;
    getPropertyList: Effect;
    getPriceList: Effect;
    openDialog:Effect;
    fetchSaveSetting:Effect;
    getAuthCode:Effect;
    cancelAuthCode:Effect;
    getAuthToken:Effect;
    getDealerParams:Effect;
    createEle:Effect;
    getWarehouseList:Effect;
    clearStock:Effect;
  };
  reducers: {
    saveData: Reducer<PlatFormModelState>;
    saveUnData:Reducer<PlatFormModelState>
    saveStoreList:Reducer<PlatFormModelState>
    saveBase:Reducer<PlatFormModelState>
    savePropertyList:Reducer<PlatFormModelState>;
    savePriceList:Reducer<PlatFormModelState>;
    setOpenDialog:Reducer<PlatFormModelState>;//打开参数设置弹框
    closeDialog:Reducer<PlatFormModelState>;//关闭参数设置弹框
    setAuthCode:Reducer<PlatFormModelState>;//获取授权码 
    closeAuthCode:Reducer<PlatFormModelState>;//取消授权码 
    setAuthToken:Reducer<PlatFormModelState>;//获取token
    changePartnerKey: Reducer<PlatFormModelState>;
    changePriceType: Reducer<PlatFormModelState>;
    openStep: Reducer<PlatFormModelState>;
    cancleStep: Reducer<PlatFormModelState>;
    preStep:Reducer<PlatFormModelState>;
    nextStep:Reducer<PlatFormModelState>;
    setDealerParams:Reducer<PlatFormModelState>;
    saveWarehouseList:Reducer<PlatFormModelState>;
  };
}

const defaultStatus: PlatFormModelState = {
  list: [],
  unAuthed: [],
  storeList: [],
  propertyList: [],
  priceList: [],
  priceZeroNotUpList:[],
  partnerKey:'',
  dialogShow:false,
  isTL:false,
  dialogData:{},
  code:'',//授权码
  token:'',
  isOpend:false,
  currentStep:0,
  branchMode:false,
  warehouseList: []
};

const Model: PlatFormModel = {
  namespace: "platformList",
  state: {
    ...defaultStatus,
  },

  effects: {
    
    *loadData({ payload }, { call, put }) {
      const response = yield call(loadPlatformList, payload);
      yield put({
        type: "saveData",
        payload: response,
      });
    },
    *loadDataUnauthed({ payload }, { call, put }) {
      const response = yield call(loadUnPlatformList, payload);
      yield put({
        type: "saveUnData",
        payload: response,
      });
    },
    *getStoreList(_, { put, call }) {
      const response = yield call(loadPartsStoreList);
      yield put({
        type: "saveStoreList",
        payload: response,
      });
    },
    *getBase(_, { put, call }) {
      const response = yield call(toGetBase);
      yield put({
        type: "saveBase",
        payload: response,
      });
    },
    *postBranchMode(_, { call }) {
      yield call(toPostBranchMode);
      Modal.success({
        content: '请重新登录',
        onOk() {
        },
      });
    },
    *getPropertyList(_, { put, call }) {
      const response = yield call(loadPartsPropertyList);
      yield put({
        type: "savePropertyList",
        payload: response,
      });
    },
    *getPriceList(_, { put, call }) {
      const response = yield call(loadPriceTypeList);
      yield put({
        type: "savePriceList",
        payload: response,
      });
    },
    *openDialog({ payload }, { call, put, select }) {//打开参数设置弹框
      const response = yield call(getSettingParam, payload);
      let param = Object.assign({},response,payload);
      yield put({
        type: "setOpenDialog",
        payload: param,
      });
      const priceTypes = yield select((state: PlatformConnectState) => {
        return state.platformList.dialogData.priceTypes;
      });
      const priceList = yield select((state: PlatformConnectState) => {
        return state.platformList.priceList;
      });
      let priceParms =new Array();
      for(let k of priceTypes){
        for(let j of priceList){
          if(k == j.code){
            priceParms.push(j);
          }
        }
      }
      yield put({
        type: "changePriceType",
        payload: priceParms,
      });
    },
    *fetchSaveSetting({ payload }, { call, put }) {//保存上架参数设置
      yield call(saveSettingParam, payload);
      message.success("设置成功");
      yield put({
        type: "closeDialog",
      });
    },
    *getAuthCode({ payload }, { call, put }) {//获取授权码
      const response = yield call(toGetAuthCode, payload);
      sessionStorage.setItem("code",response);
      yield put({
        type: "setAuthCode",
        payload: response,
      });
    },
    *cancelAuthCode({ payload }, { put }) {//获取授权码
      sessionStorage.removeItem('code');
      yield put({
        type: "closeAuthCode",
      });
    },
    *getAuthToken({ payload }, { call, put }) {//获取token
      const response = yield call(toGetAuthToken, payload);
      yield put({
        type: "setAuthToken",
        payload: response,
      });
    },
    *getDealerParams({ payload }, { call, put }) {
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
      
      yield call(createPartner, {
        ...payload,
      });
      const currentStep = yield select((state: PlatformConnectState) => {
        return state.platformList.currentStep;
      });
      if(currentStep){
        message.success("授权成功");
      }
      yield put({
        type: "nextStep",
      });
      yield put({
        type: "loadData",
      });
      
    },
    *getWarehouseList({ payload }, { call, put }) {
      const response = yield call(loadWarehouseList, {
        ...payload,
      });
      yield put({
        type: "saveWarehouseList",
        payload: response || []
      });
    },
    *clearStock({}, { call, put }) {
      yield call(clearStock);
      message.success("同步全部库存成功");
    },
  },

  reducers: {
    saveData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        list: payload,
      };
    },
    saveUnData(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        unAuthed: payload,
      };
    },
    saveStoreList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        storeList: payload,
      };
    },
    saveBase(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        branchMode:payload.branchMode,
      };
    },
    savePropertyList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        propertyList: payload,
      };
    },
    savePriceList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        priceList: payload,
      };
    },
    setOpenDialog(state, { payload }) {//打开参数设置弹框
      return {
        ...defaultStatus,
        ...state,
        dialogShow: true,
        dialogData:payload
      };
    },
    closeDialog(state){
      return {
        ...defaultStatus,
        ...state,
        dialogShow: false,
        dialogData:{},
        partnerKey:''
      };
    },
    setAuthCode(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        code: payload,
      };
    },
    closeAuthCode(state) {
      return {
        ...defaultStatus,
        ...state,
        code: ''
      };
    },
    setAuthToken(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        token: payload,
      };
    },
    changePartnerKey(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        partnerKey:payload,
      };
    },
    changePriceType(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        priceZeroNotUpList:payload,
      };
    },
    setDealerParams(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        dealerParams: payload,
      };
    },
    saveWarehouseList(state, { payload }) {
      return {
        ...defaultStatus,
        ...state,
        warehouseList: payload,
      };
    },
    openStep(state) {
      return {
        ...defaultStatus,
        ...state,
        currentStep: 0,
        isOpend: true,
      };
    },
    cancleStep(state) {
      return {
        ...defaultStatus,
        ...state,
        currentStep: 0,
        isOpend: false,
        partnerKey:''
      };
    },
    preStep(state) {
      let currentStep = state ? state.currentStep : 0;
      if (currentStep > 0) {
        currentStep--;
      }
      return {
        ...defaultStatus,
        ...state,
        currentStep,
      };
    },
    nextStep(state) {
      let currentStep = state ? state.currentStep : 0;
      if (currentStep < createEleSteps.length - 1) {
        currentStep++;
        return {
          ...defaultStatus,
          ...state,
          currentStep,
        };
      }
      return {
        ...defaultStatus,
        ...state,
        currentStep: 0,
        isOpend: false,
      };
    },
    
  },
};

export default Model;
