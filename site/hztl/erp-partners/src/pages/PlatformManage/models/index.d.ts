import { ConnectState } from "@/models";
import { PartModelState } from "./part";
import { BaseDataModelState } from "./baseData";

export interface PartConnectState extends ConnectState {
  part: PartModelState;
  partBaseData: BaseDataModelState;
}
