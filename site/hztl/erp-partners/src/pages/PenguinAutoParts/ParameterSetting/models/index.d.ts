import { ConnectState } from "@/models";
import { PlatFormModelState } from "./parameterSetting";

export interface ParameterSettingConnectState extends ConnectState {
    parameterSetting: PlatFormModelState;
}
