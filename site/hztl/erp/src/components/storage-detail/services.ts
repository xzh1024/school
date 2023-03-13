//订单列表
import { PageData } from "@/constants/interface";
import request from "@/utils/request";

export interface StockFilter {
  partId?: number; // 配件Id
  partName?: string; // 配件名称,模糊匹配
  partCode?: string; // 配件编码
  partCodePattern?: number; // 配件编码匹配模式, number:模糊匹配,1:左匹配,2:右匹配,3:全匹配
  brand?: string; // 品牌
  productionPlace?: string; // 产地,模糊匹配
  vehModel?: string; // 车型/适用车型,模糊匹配
  property?: string; // 性质
  category?: number; // 配件分类
  categoryName?: string; // 配件分类名称
  batchNo?: string; // 批次号
  stockProperty?: number; // 库存性质, 1:自营库存，2：预留库存，3：受托库存
  ownerCompanyId?: number; // 货主公司ID
  supplierId?: number; // 供应商ID
  qtyLimitType?: number; // number:大于,1:小于,2:等于
  qty?: string; // 数量
  ageLimitType?: number; // number:大于,1:小于,2:等于
  age?: number; // 库龄
  warehouseId?: number; // 仓库ID
  positionId?: number; // 货位ID
  flagNegative?: number; // 正负库存标志位,用于明细查询
}

interface StockSummaryFlag {
  flagLock?: boolean; // 查看锁定库存
  flagPart?: boolean; // 汇总方式：配件
  flagProperty?: boolean; // 汇总方式：配件性质
  flagWarehouseId?: boolean; // 汇总方式：仓库
  flagPositionId?: boolean; // 汇总方式：货位
  flagBatchNo?: boolean; // 汇总方式：批次
  flagOwnerCompanyId?: boolean; // 汇总方式：货主
  flagSupplierId?: boolean; // 汇总方式：供应商
}
interface StocksHistoryFilter extends StockFilter, StockSummaryFlag {
  fromDate?: string; // 业务开始日期
  toDate?: string; // 业务结束日期
  billType?: string[]; // 单据类型
  page: number;
  pageSize: number;
}

export interface StocksHistory {
  partId: number; // 配件Id
  billId: number; // 单据Id
  billNo: string; // 单据类型
  billDate: null; // 单据日期
  billType: string; // 单据类型
  lockedQty: string; // 锁定数量
  inQty: string; // 入库数量
  outQty: string; // 出库数量
  businessCompanyId: number; // 业务公司Id
  businessCompanyName: string; // 业务公司名称
  createdBy: number; // 制单人Id
  createdByName: string; // 制单人名称
}

export function fetchStocksHistoryList(
  data: StocksHistoryFilter
): Promise<PageData<StocksHistory>> {
  return request({
    url: "/storage/stocks/history",
    method: "post",
    data
  });
}

export interface StocksLocked {
  partId: number; // 配件Id
  billId: number; // 单据Id
  billNo: string; // 单据类型
  billDate: null; // 单据日期
  billType: string; // 单据类型
  lockedQty: string; // 锁定数量
  inQty: string; // 入库数量
  outQty: string; // 出库数量
  businessCompanyId: number; // 业务公司Id
  businessCompanyName: string; // 业务公司名称
  createdBy: number; // 制单人Id
  createdByName: string; // 制单人名称
}

export function fetchStocksLockedList(
  data: StocksHistoryFilter
): Promise<PageData<StocksLocked>> {
  return request({
    url: "/storage/stocks/locked",
    method: "post",
    data
  });
}
