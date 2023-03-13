/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { NO_PRICE_PERM_TIPS, NO_PRICE_PERM_VALUE } from "@/constants";
import { TableColumn } from "@/constants/interface";
import { SalePrice, salePriceText } from "@/constants/part";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Decimal } from "decimal.js";

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const strWindowFeatures = `
  top=${-window.screen.availHeight},
  left=$0,
  width=${window.screen.availWidth},
  height=${window.screen.availHeight - 150}`;

export function openNewWindow(url: string, name = "newWindow") {
  window.open(url, name, strWindowFeatures);
}

export function getKeys<T extends {}>(o: T): Array<keyof T> {
  return Object.keys(o) as never;
}

export function getSalePriceOptions(parice: SalePrice) {
  return getKeys(parice).map((item, index) => {
    return {
      id: index,
      name: `${salePriceText[item]}：${
        parice[item] === NO_PRICE_PERM_VALUE ? NO_PRICE_PERM_TIPS : parice[item]
      }`,
      value: parice[item]
    };
  });
}

interface Node {
  label: string;
  value: number;
}

export interface Tree extends Node {
  children?: Tree[];
}

export function findTreeMatchPath(tree: Tree[], id?: number) {
  let nodeList: Node[] = [];
  if (id) {
    tree.find(item => {
      if (item.value === id) {
        nodeList = [
          {
            label: item.label,
            value: item.value
          }
        ];
      } else if (item.children) {
        const childList = findTreeMatchPath(item.children, id);
        if (childList.length) {
          nodeList = [item, ...childList];
        }
      }
      return nodeList.length;
    });
  }
  return nodeList;
}

export function formatAmout(amout: number | string | null | undefined) {
  if (!amout || [0, "0"].includes(amout)) {
    return "0";
  }
  if (isNaN(Number(amout))) {
    return amout;
  }

  const amoutNum = Math.abs(Number(amout || 0));
  const amoutStr = amoutNum.toString();
  const pointIndex = amoutStr.indexOf(".");
  let decimalStr = "";
  let integerStr = "";

  if (pointIndex > 0) {
    decimalStr = amoutStr.substring(amoutStr.indexOf(".") + 1);
    integerStr = amoutStr.substring(0, amoutStr.indexOf("."));
  } else if (pointIndex < 0) {
    integerStr = amoutStr;
  }

  let integerArr = integerStr.split("");
  let newHeadArr: Array<number | string> = [];
  const jionStr = ",";

  if (integerArr.length >= 3) {
    integerArr = integerArr.reverse();
    integerArr.forEach((item: string, index: number) => {
      if ((index + 1) % 3 === 0) {
        newHeadArr = [...newHeadArr, item, jionStr];
      } else {
        newHeadArr = [...newHeadArr, item];
      }
    });
    newHeadArr = newHeadArr.reverse();
    if (newHeadArr[0] === jionStr) {
      newHeadArr = newHeadArr.slice(1);
    }
  } else {
    newHeadArr = integerArr;
  }

  let newStr = "";
  if (pointIndex > 0) {
    newStr = `${newHeadArr.join("")}.${decimalStr}`;
  } else if (pointIndex < 0) {
    newStr = newHeadArr.join("");
  } else {
    newStr = amoutStr;
  }

  return Number(amout || 0) > 0 ? newStr : `-${newStr}`;
}

export function getNumberByAcc(number: Decimal | string | number, acc: number) {
  let mulNumber = new Decimal(number);

  for (let i = acc; i--; i > 0) {
    mulNumber = Decimal.mul(mulNumber, 10);
  }

  let divNumber = new Decimal(Math.round(Number(mulNumber)));

  for (let i = acc; i--; i > 0) {
    divNumber = Decimal.div(divNumber, 10);
  }

  return Number(divNumber);
}

export function getPropValue(item: any, value: string[] | string) {
  let displayValue = "";
  if (Array.isArray(value)) {
    if (value.length) {
      let newValue = item;
      value.forEach(key => {
        newValue = newValue && newValue[key];
      });
      displayValue = newValue;
    }
  } else {
    displayValue = item[value];
  }
  return displayValue;
}

type Sort = "asc" | "desc" | "";
export interface SortObj {
  sortField: string;
  sort: Sort;
  prop?: string;
  order?: string;
}

export function getSortFieldObj(sortStr: string): SortObj {
  const sortObj: SortObj = { sortField: "", sort: "" };
  const regexp = /(\w+)(-)(\w+)/;
  const matched = sortStr.match(regexp);
  if (matched?.length) {
    sortObj.sortField = matched[1];
    sortObj.sort = matched[3] as Sort;
  }
  return sortObj;
}
export function setColumnsSort(sortStr: string, columns: TableColumn<any>[]) {
  const sortObj = getSortFieldObj(sortStr);
  let newColumns: TableColumn<any>[] = JSON.parse(JSON.stringify(columns));
  newColumns = newColumns.map(item => {
    if (item.attrs && item.prop === sortObj.sortField) {
      item.attrs.sortable = sortObj.sort;
    }
    return item;
  });
  return newColumns;
}
export function parseSortKey(key: string): string {
  if (!key) return "";
  const needToParsekeys = {
    businessMan: "businessManId",
    companyName: "companyId",
    paymentTypeName: "paymentType",
    settleCooperatorName: "settleCooperatorId",
    businessManName: "businessManId",
    cooperatorName: "cooperatorId",
    confirmedAt: "financialConfirmAt",
    inCompanyName: "inCompanyId"
  };
  return needToParsekeys[key] || key.replace(/.*\./, "");
}
export function setTableSort(sortObj: SortObj): string {
  if (!sortObj) return "";
  const { sortField, sort } = sortObj;
  const { prop, order } = sortObj;
  let newSort = "";
  if (sortField && sortField) {
    newSort = `${sortField}-${sort}`;
    return newSort;
  }
  if (prop && order) {
    newSort = `${prop}-${order}`;
    return newSort;
  }
  return newSort;
}
export function setLocalTableSort(sortStr: string, type: string) {
  localStorage.tableSort = JSON.stringify({
    ...(localStorage.tableSort ? JSON.parse(localStorage.tableSort) : {}),
    [type]: sortStr
  });
}
export function getLocalTableSort(type: string) {
  let sortStr = "";
  try {
    if (localStorage.tableSort) {
      sortStr = JSON.parse(localStorage.tableSort)[type] || "";
    }
  } catch (e) {
    console.log(e);
  }
  return sortStr;
}

export function sendFilters(data: any) {
  const params = {
    contactName: data.contactsName || "",
    businessManId: data.businessMan.id,
    businessManName: data.businessMan.name || "",
    groupName: data.groupName || "",
    contactPhone: data.contactsPhone || "",
    remark: data.remark || "",
    settlementType: data.settlementType,
    enhancedSettlementType: data.enhancedSettlementType || "", // 表支付方式
    invoiceType: data.invoiceType || "",
    pickMethod: data.deliveryType || "",
    packMethod: data.packingWay || "",
    transportMethod: data.transportType || "",
    logisticsCompanyId: data.logisticsCompanyId,
    logisticsCompanyName: data.logisticsCompanyName || "",
    freightPayer: data.freightPayer,
    taxRate: data.taxRate,
    receiverAddress: data.receiverAddress || "",
    receiverAreaId: data.receiverAreaId,
    receiverAreaIds: data.receiverAreaIds || [],
    receiverAreaNames: data.receiverAreaNames || [],
    receiverName: data.receiverName || "",
    receiverPhone: data.receiverPhone || ""
  };
  return params;
}

export function receiveFilters(data: any) {
  const params = {
    contactName: data.contactsName || "",
    businessManId: data.businessMan.id,
    businessManName: data.businessMan.name || "",
    groupName: data.groupName || "",
    contactPhone: data.contactsPhone || "",
    remark: data.remark || "",
    settlementType: data.settlementType,
    enhancedSettlementType: data.enhancedSettlementType || "", // 表支付方式
    invoiceType: data.invoiceType || "",
    pickMethod: data.deliveryType || "",
    packMethod: data.packingWay || "",
    transportMethod: data.transportType || "",
    logisticsCompanyId: data.logisticsCompanyId,
    logisticsCompanyName: data.logisticsCompanyName || "",
    freightPayer: data.freightPayer,
    taxRate: data.taxRate
  };
  return params;
}

export function receiverInfoFilters(data: any) {
  const params = {
    receiverName: data.receiver || "",
    receiverPhone: data.phone || "",
    receiverAddress: data.address || "",
    receiverAreaId: data.areaId,
    receiverAddressId: data.id,
    receiverAreaNames: [
      data.provinceName || "",
      data.cityName || "",
      data.areaName || ""
    ]
  };
  return params;
}

export function base64toFile(dataurl: any, filename = "file") {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  });
}
