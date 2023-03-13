import request from "@/common/utils/request";
import { MODULE_KEY_ENUM } from "@/common/utils/config";

export class CommonService {
  public getBase() {
    return request({
      url: "/whsc/base"
    });
  }

  public getUploadToken() {
    return request({
      module: MODULE_KEY_ENUM.accounts,
      url: "/img/upToken"
    });
  }
}
