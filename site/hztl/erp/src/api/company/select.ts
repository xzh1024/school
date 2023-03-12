/*
 * @Author: Yong
 * @Date: 2021-08-23 16:44:35
 * @LastEditors: Yong
 * @LastEditTime: 2021-08-23 16:48:25
 * @Description: 下拉列表
 */
import request from "@/utils/request";
type companysOptions = {
  belongs: string[];
  id: number;
  ident: string;
  name: string;
}[];
export const selectCompanys = (params: {
  type: "sale" | "allocOut" | "allocIn";
}): Promise<companysOptions> => {
  return request({
    // 账套下公司列表
    module: "erp",
    url: "/account-sets/companies",
    method: "get",
    params
  });
};
