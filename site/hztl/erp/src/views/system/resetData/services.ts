import request from "@/utils/request";
import { ResetParam } from "./interface";

export type ReqResetData = Partial<
  Pick<ResetParam, "resetType" | "companyIds">
>;
export interface ReqPamras {
  resetParams: ReqResetData[];
  captcha: string;
  msgId: string;
}

export function resetSettingsData(data: ReqPamras) {
  return request({
    url: "settings/reset_data",
    method: "post",
    data
  });
}
