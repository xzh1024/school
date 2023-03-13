/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";

export async function loadPriceTypeList() {
  return await request("/price-types");
}

export async function loadPartsStoreList() {
  return await request("/parts/store");
}

export async function loadPartsPropertyList() {
  return await request("/parts/properties");
}

export async function saveSettingParam( data:any){
  
  return await request(`/partners/${data.partnerKey}`, {
    method: "POST",
    data
  });
}

export async function getSettingParam(data : any) {
  return await request(`/partners/setting?partnerKey=${data.partnerKey}`);
}

