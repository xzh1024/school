import request from "@/utils/request";

export function sendSettingsResetDatasms() {
  return request({
    url: "settings/reset_data/sms",
    method: "post"
  });
}
