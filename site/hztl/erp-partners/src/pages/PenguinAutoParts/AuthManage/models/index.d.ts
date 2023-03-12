import { ConnectState } from "@/models";
import { StaffModelState } from "./staff";
import { BaseDataModelState } from "./baseData";

export interface StaffConnectState extends ConnectState {
  staff: StaffModelState;
  partBaseData: BaseDataModelState;
}
