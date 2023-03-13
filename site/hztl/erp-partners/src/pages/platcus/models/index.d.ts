import { ConnectState } from "@/models";
import { PlatModelState } from "./part";

export interface PlatConnectState extends ConnectState {
  platList: PlatModelState;
}
