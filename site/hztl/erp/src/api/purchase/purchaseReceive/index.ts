/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";

export function reqCreateReceive(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/direct-create",
    method: "post",
    data
  });
}

export function reqReceiveAddPart(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival-detail/direct-create",
    method: "post",
    data
  });
}

//到货单列表部分
export function reqReceiveTrans(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order/workflow/trans_arrival",
    method: "post",
    data
  });
}

export function reqReceivePendingList(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/list/pending",
    method: "post",
    data
  });
}

export function reqReceiveList(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/list",
    method: "post",
    data
  });
}

//到货单详情部分
export function reqReceiveDetails(id: number, sort: string): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/" + id,
    params: {
      sort
    }
  });
}

export function reqReceiveDetailsUnused(id: number, data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/order/" + id + "/detail/unarrived",
    method: "post",
    data
  });
}

export function reqReceiveHeaderUpdate(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/" + data.id,
    method: "put",
    data
  });
}

export function reqReceiveDetailsUpdate(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival-detail",
    method: "put",
    data
  });
}

export function reqReceiveDetailsBatchUpdateWare(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival-detail/batch/ware",
    method: "put",
    data
  });
}

export function reqReceiveShareFreight(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/share_freight",
    method: "post",
    data
  });
}

export function reqReceiveSubmit(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/workflow/" + data.id + "/submit",
    method: "post",
    data
  });
}

export function reqReceiveDelete(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival",
    method: "delete",
    data
  });
}

export function reqReceiveRecall(id: number): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/workflow/" + id + "/recall",
    method: "post"
  });
}

export function reqReceiveDetailsDelete(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival-detail",
    method: "delete",
    data
  });
}

export function reqReceiveDetailsPositionsUpdate(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival-detail/positions",
    method: "put",
    data
  });
}

export function reqReceiveDetailsGetPrintCount(id: number) {
  return request({
    module: "erp",
    url: `/purchases/arrival/printer/${id}`,
    method: "get"
  });
}

export function reqReceiveDetailsUpdatePrintCount(data: any): Promise<any> {
  return request({
    module: "erp",
    url: `/purchases/arrival/printer`,
    method: "put",
    data
  });
}

/* 运费分摊 */
export function shareFreight(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/arrival/share_freight",
    method: "post",
    data
  });
}

export function getReciveDetail(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/storage/logistics_registrations/query",
    method: "get",
    params
  });
}
