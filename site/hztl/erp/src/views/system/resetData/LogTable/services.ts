import request from "@/utils/request";
import { LogItem } from "./constants";

export function getSettingsResetLogList(): Promise<{
  rows: LogItem[];
}> {
  return request({
    url: "settings/reset_logs",
    method: "get"
  });
}
