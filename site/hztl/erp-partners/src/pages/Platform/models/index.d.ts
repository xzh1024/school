import { ConnectState } from "@/models";
import { PlatFormModelState } from "./platformList";

export interface PlatformConnectState extends ConnectState {
    platformList: PlatFormModelState;
}
