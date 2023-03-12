import request from "@/common/utils/request";
import { MODULE_KEY_ENUM } from "@/common/utils/config";

interface TokenLoginParam {
  token: string;
  allianceDomain: string;
}
export class LoginService {
  public tokenLogin(token: string) {
    const params = {
      token: token
    } as TokenLoginParam;
    if (process.env.NODE_ENV !== "development") {
      params.allianceDomain = window.location.hostname;
    }
    return request({
      method: "post",
      data: params,
      url: "/token-login",
      module: MODULE_KEY_ENUM.accounts
    });
  }
}
