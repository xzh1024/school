import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { userMsg } from "@/utils/store";

export interface MergeLogListFilters {
  startDate?: string; // 开始日期
  endDate?: string; // 结束日期
  name?: string; // 往来单位名称
  createdBy?: number[]; // 合并人IDs
}

export interface FormData
  extends Partial<Pick<MergeLogListFilters, "name" | "createdBy">> {
  timeRange: string[];
}

export interface Person {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
}

export interface Area {
  ids: [number, number, number?];
  names: [string, string, string?];
}

export interface Flags {
  isCustomer: boolean; // 是否为客户
  isSupplier: boolean; // 是否为供应商
  isLogistics: boolean; // 是否为物流公司
  isStorage: boolean; // 是否为仓储公司
}

export const COOPORATE_TYPE_NUM = {
  isCustomer: "客户",
  isSupplier: "供应商",
  isLogistics: "物流公司",
  isStorage: "仓储公司",
  isInsuranceCompany: userMsg().hasYx ? "保险公司" : ""
};
export interface Old {
  id: number; // 合并前往来单位Id
  name: string; // 合并前往来单位名称
  number: string; // 合并前往来单位编码
  shortName: string; // 合并前往来单位简称
  area: Area; // 合并前往来单位区域
  invoiceTitle: string; // 合并前往来单位发票抬头
  creditCode: string; // 合并前往来单位税号
  bank: string; // 合并前往来单位开户银行
  phone: string; // 合并前往来单位电话号码
  address: string; // 合并前往来单位地址
  createdByCompany: Company; // 合并前往来单位创建分公司
  createdBy: Person; // 合并前往来单位创建人，
  flags: Flags; // 合并前往来单位类型
}

export interface New {
  id: number; // 合并后往来单位Id
  name: string; // 合并后往来单位名称
  number: string; // 合并后往来单位编码
  shortName: string; // 合并后往来单位简称
  flags: Flags; // 合并后往来单位类型
}

export interface MergeLogItem {
  id: number;
  old: Old;
  new: New;
  oldContacts: Contact[]; // 联系人
  createdBy: number; // 合并人ID
  createdByName: string; // 合并人
  createdAt: string; // 合并日期
}

export const COMMUNION_MERGE_LOG_TABLE: TableSettingConfig<MergeLogItem> = {
  name: "communionMergeLogTable",
  columns: [
    {
      label: "序号",
      prop: "index",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      label: "单位编码",
      prop: ["old", "number"],
      width: CELL_WIDTH.companyNo
    },
    {
      label: "单位名称",
      prop: ["old", "name"],
      width: CELL_WIDTH.companyName
    },
    {
      label: "单位类型",
      prop: ["old", "flags"],
      width: CELL_WIDTH.fundAccountName,
      formatter: (val: Flags) => {
        let types = "";
        if (val) {
          for (const item in val) {
            types +=
              val[item] && COOPORATE_TYPE_NUM[item]
                ? `${COOPORATE_TYPE_NUM[item]}，`
                : "";
          }
        }
        types = types.substring(0, types.lastIndexOf("，"));
        return types;
      }
    },
    {
      label: "单位创建分公司",
      prop: ["old", "createdByCompany", "name"],
      width: CELL_WIDTH.companyName
    },
    {
      label: "合并人",
      prop: "createdByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "合并日期",
      prop: "createdAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "合并后单位编码",
      prop: ["new", "number"],
      width: 120
    },
    {
      label: "合并后单位名称",
      prop: ["new", "name"],
      width: CELL_WIDTH.companyName
    },
    {
      label: "联系人信息",
      prop: "oldContacts",
      width: 300,
      formatter: (val: Contact[]) => {
        let contacts = "";
        if (val && val.length) {
          contacts = val
            .map((item: Contact) => `${item.name}：${item.phone}`)
            .join("，");
        }
        return contacts;
      }
    },
    {
      label: "单位简称",
      prop: ["old", "shortName"],
      width: CELL_WIDTH.companySortName
    },
    {
      label: "所属区域",
      prop: ["old", "area", "names"],
      type: "area",
      width: CELL_WIDTH.address
    },
    {
      label: "发票抬头",
      prop: ["old", "invoiceTitle"],
      width: CELL_WIDTH.companyName
    },
    {
      label: "税号",
      prop: ["old", "creditCode"],
      width: CELL_WIDTH.creditCode
    },
    {
      label: "公司电话",
      prop: ["old", "phone"],
      width: CELL_WIDTH.phone
    },
    {
      label: "开户银行",
      prop: ["old", "bank"],
      width: CELL_WIDTH.bankName
    },
    {
      label: "备注",
      prop: ["old", "remark"],
      width: CELL_WIDTH.remark
    }
  ]
};
