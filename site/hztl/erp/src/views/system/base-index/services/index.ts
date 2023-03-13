import request from "@/utils/request";
import { BannerModel } from "../constant/interfaces";

// 工作台-广告
export function getAdvertisements(): Promise<BannerModel[]> {
  return request({
    url: "/system/advertisements"
  });
}
