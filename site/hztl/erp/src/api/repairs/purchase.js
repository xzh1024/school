import request from "@/utils/request";
/* 销售售价控制固定售价导出 */
export async function priceSettingFixedPriceExport(params) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices/export",
    method: "post",
    data: params,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
