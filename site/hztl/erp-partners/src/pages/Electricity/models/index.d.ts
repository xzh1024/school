import { ConnectState } from "@/models";
import { EleListModelState } from "./electricity";
import { EleFormModelState } from "./eleForm";
import { EleStepModelState } from "./eleSteps";
import { BaseDataModelState } from "./baseData";

export interface EleConnectState extends ConnectState {
  electricity: EleListModelState;
  eleForm: EleFormModelState;
  eleSteps: EleStepModelState;
  partnerBaseData: BaseDataModelState;
}
