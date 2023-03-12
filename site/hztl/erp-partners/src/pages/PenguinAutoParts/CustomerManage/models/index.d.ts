import { ConnectState } from "@/models";
import { CustomerModelState } from "./customer";
import { BaseDataModelState } from "./baseData";

export interface CustomerConnectState extends ConnectState {
  customer: CustomerModelState;
  partBaseData: BaseDataModelState;
}
