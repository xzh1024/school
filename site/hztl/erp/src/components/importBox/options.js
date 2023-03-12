function checkValueHandle(data, option, toValidIncludeOptions) {
  const msgs = [];
  if (Number.isNaN(Number(data))) {
    msgs.push(`${option.label}需为数字`);
  } else if (
    ["minOrderQty", "dosagePerCar"].includes(option.value) &&
    !Number.isInteger(data)
  ) {
    msgs.push(`${option.label}需为整数`);
  }
  if (
    toValidIncludeOptions?.length &&
    !toValidIncludeOptions.map(item => item.name).includes(data)
  ) {
    msgs.push(`${option.label}不存在`);
  }
  return msgs;
}

export const salesOrderOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "英文名称", value: "enName", type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  {
    label: "订货数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "售价",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "配件性质", value: "property", type: "string" },
  { label: "备注", value: "remark", type: "string" },
  { label: "配件分类", value: "categoryName", type: "string" },
  { label: "规格", value: "model", type: "string" },
  { label: "部位码", value: "posCode", type: "string" },
  { label: "发动机型号", value: "engineNo", type: "string" },
  { label: "单位", value: "unit", type: "string" },
  { label: "条形码", value: "barCode", type: "string" },
  { label: "长度", value: "length", type: "string" },
  { label: "宽度", value: "width", type: "string" },
  { label: "高度", value: "height", type: "string" },
  { label: "体积", value: "volume", type: "string" },
  { label: "重量", value: "weight", type: "string" },
  {
    label: "每车用量",
    value: "dosagePerCar",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "是否集采", value: "isCollection", type: "string" },
  {
    label: "正厂价",
    value: "priceFactory",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "正厂价币种", value: "currency", type: "string" },
  {
    label: "人民币价",
    value: "priceRmb",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存上限",
    value: "stockTopLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存下限",
    value: "stockLowerLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "起订量",
    value: "minOrderQty",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "保险认证分类", value: "insurCertType", type: "string" },
  { label: "配件类别", value: "partType", type: "string" },
  // { label: '指导售价', value: null, type: "string" },
  { label: "车型", value: "vehModel", type: "string" },
  {
    label: "销售车型",
    value: "saleVehModel",
    type: "string"
  },
  { label: "适用车型", value: "avaVehModel", type: "string" }
];

export const purchaseOrderOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "英文名称", value: "enName", type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  {
    label: "订购数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "进价",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "配件性质", value: "property", type: "string" },
  { label: "配件分类", value: "categoryName", type: "string" },
  { label: "规格", value: "model", type: "string" },
  { label: "部位码", value: "posCode", type: "string" },
  { label: "发动机型号", value: "engineNo", type: "string" },
  { label: "单位", value: "unit", type: "string" },
  { label: "条形码", value: "barCode", type: "string" },
  { label: "备注", value: "remark", type: "string" },
  { label: "长度", value: "length", type: "string" },
  { label: "宽度", value: "width", type: "string" },
  { label: "高度", value: "height", type: "string" },
  { label: "体积", value: "volume", type: "string" },
  { label: "重量", value: "weight", type: "string" },
  {
    label: "每车用量",
    value: "dosagePerCar",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "是否集采", value: "isCollection", type: "string" },
  {
    label: "正厂价",
    value: "priceFactory",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "正厂价币种", value: "currency", type: "string" },
  {
    label: "人民币价",
    value: "priceRmb",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存上限",
    value: "stockTopLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存下限",
    value: "stockLowerLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "起订量",
    value: "minOrderQty",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "保险认证分类", value: "insurCertType", type: "string" },
  { label: "配件类别", value: "partType", type: "string" },
  // { label: '指导售价', value: 31, type: "string" },
  { label: "车型", value: "vehModel", type: "string" },
  { label: "适用车型", value: "avaVehModel", type: "string" },
  {
    label: "零售价",
    value: "retailPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "平台价",
    value: "platformPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "调拨价",
    value: "transferPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价",
    value: "wholeSalePrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价一",
    value: "wholeSalePrice1",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价二",
    value: "wholeSalePrice2",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价三",
    value: "wholeSalePrice3",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价四",
    value: "wholeSalePrice4",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  }
];

export const purchaseBillOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "英文名称", value: "enName", type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  {
    label: "数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "进价",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "仓库", value: "warehouseName", required: true, type: "string" },
  { label: "货位", value: "positionName", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  { label: "配件分类", value: "categoryName", type: "string" },
  { label: "规格", value: "model", type: "string" },
  { label: "生产码", value: "productionCode", type: "string" },
  { label: "部位码", value: "posCode", type: "string" },
  { label: "发动机型号", value: "engineNo", type: "string" },
  { label: "单位", value: "unit", type: "string" },
  { label: "条形码", value: "barCode", type: "string" },
  { label: "长度", value: "length", type: "string" },
  { label: "宽度", value: "width", type: "string" },
  { label: "高度", value: "height", type: "string" },
  { label: "体积", value: "volume", type: "string" },
  { label: "重量", value: "weight", type: "string" },
  {
    label: "起订量",
    value: "minOrderQty",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "每车用量",
    value: "dosagePerCar",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "是否集采", value: "isCollection", type: "string" },
  {
    label: "正厂价",
    value: "priceFactory",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "正厂价币种", value: "currency", type: "string" },
  {
    label: "人民币价",
    value: "priceRmb",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "保险认证分类", value: "insurCertType", type: "string" },
  { label: "配件类别", value: "partType", type: "string" },
  {
    label: "库存上限",
    value: "stockTopLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存下限",
    value: "stockLowerLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "车型", value: "vehModel", type: "string" },
  { label: "适用车型", value: "avaVehModel", type: "string" },
  { label: "备注", value: "remark", type: "string" },
  {
    label: "零售价",
    value: "retailPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "平台价",
    value: "platformPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "调拨价",
    value: "transferPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价",
    value: "wholeSalePrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价一",
    value: "wholeSalePrice1",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价二",
    value: "wholeSalePrice2",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价三",
    value: "wholeSalePrice3",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价四",
    value: "wholeSalePrice4",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  }
];

export const stockOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "英文名称", value: "enName", type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件分类", value: "categoryName", type: "string" },
  { label: "规格", value: "model", type: "string" },
  { label: "部位码", value: "posCode", type: "string" },
  { label: "发动机型号", value: "engineNo", type: "string" },
  { label: "单位", value: "unit", type: "string" },
  { label: "条形码", value: "barCode", type: "string" },
  { label: "备注", value: "remark", type: "string" },
  { label: "长度", value: "length", type: "string" },
  { label: "宽度", value: "width", type: "string" },
  { label: "高度", value: "height", type: "string" },
  { label: "体积", value: "volume", type: "string" },
  { label: "重量", value: "weight", type: "string" },
  {
    label: "每车用量",
    value: "dosagePerCar",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "是否集采", value: "isCollection", type: "string" },
  {
    label: "正厂价",
    value: "priceFactory",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "正厂价币种", value: "currency", type: "string" },
  {
    label: "人民币价",
    value: "priceRmb",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存上限",
    value: "stockTopLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存下限",
    value: "stockLowerLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "起订量",
    value: "minOrderQty",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "保险认证分类", value: "insurCertType", type: "string" },
  { label: "配件类别", value: "partType", type: "string" },
  // { label: '指导售价', value: null, type: "string" },
  { label: "车型", value: "vehModel", type: "string" },
  { label: "适用车型", value: "avaVehModel", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  { label: "供应商", value: "supplierName", type: "string" },
  { label: "仓库", value: "warehouseName", required: true, type: "string" },
  { label: "货位", value: "positionName", type: "string" },
  {
    label: "库存数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "零售价", value: "retailPrice", type: "number" },
  { label: "平台价", value: "platformPrice", type: "number" },
  { label: "调拨价", value: "transferPrice", type: "number" },
  { label: "批发价", value: "wholeSalePrice", type: "number" },
  { label: "批发价一", value: "wholeSalePrice1", type: "number" },
  { label: "批发价二", value: "wholeSalePrice2", type: "number" },
  { label: "批发价三", value: "wholeSalePrice3", type: "number" },
  { label: "批发价四", value: "wholeSalePrice4", type: "number" },
  {
    label: "进价",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "未税进价",
    value: "untaxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "批次号", value: "batchNo", type: "string" },
  { label: "库存备注", value: "stockRemark", type: "string" },
  { label: "货主公司", value: "ownerCompanyName", type: "string" }
];

export const partOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "车型", value: "vehModel", type: "string" },
  { label: "适用车型", value: "avaVehModel", type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "是否辅料", value: "isAccessories", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "计量单位", value: "unit", type: "string" },
  { label: "规格", value: "model", type: "string" },
  { label: "条形码", value: "barCode", type: "string" },
  { label: "部位码", value: "posCode", type: "string" },
  { label: "生产码", value: "productionCode", type: "string" },
  { label: "发动机型号", value: "engineNo", type: "string" },
  { label: "配件分类", value: "categoryName", type: "string" },
  {
    label: "库存上限",
    value: "stockTopLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "库存下限",
    value: "stockLowerLimit",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "起订量",
    value: "minOrderQty",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "正厂价币种", value: "currency", type: "string" },
  {
    label: "正厂价",
    value: "priceFactory",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "人民币价",
    value: "priceRmb",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "包装数",
    value: "packingNum",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "每车用量",
    value: "dosagePerCar",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "保险认证分类", value: "insurCertType", type: "string" },
  { label: "配件类别", value: "partType", type: "string" },
  { label: "图号", value: "customCodesStr", type: "string" },
  { label: "特征码", value: "featureCode", type: "string" },
  { label: "英文名称", value: "enName", type: "string" },
  { label: "长度", value: "length", type: "string" },
  { label: "宽度", value: "width", type: "string" },
  { label: "高度", value: "height", type: "string" },
  { label: "体积", value: "volume", type: "string" },
  { label: "重量", value: "weight", type: "string" },
  { label: "备注", value: "remark", type: "string" },
  { label: "是否集采", value: "isCollection", type: "string" },
  { label: "是否可采购", value: "isPurchase", type: "string" },
  { label: "是否可销售", value: "isSale", type: "string" }
];

export const cooperatorOptions = [
  { label: "单位编号", value: "basic.number", type: "string" },
  { label: "单位名称", value: "basic.name", required: true, type: "string" },
  { label: "单位简称", value: "basic.shortName", type: "string" },
  { label: "是否集团", value: "basic.isGroup", type: "string" },
  { label: "归属集团", value: "basic.group", type: "string" },
  { label: "企业网址", value: "basic.website", type: "string" },
  { label: "企业邮箱", value: "basic.email", type: "string" },
  { label: "微信公众号", value: "basic.wechatPa", type: "string" },
  { label: "备注", value: "basic.remark", type: "string" },
  { label: "发票抬头", value: "basic.invoiceTitle", type: "string" },
  { label: "统一社会信用代码", value: "basic.creditCode", type: "string" },
  { label: "开户银行", value: "basic.bank", type: "string" },
  { label: "银行账户", value: "basic.bankAccount", type: "string" },
  { label: "公司电话", value: "basic.phone", type: "string" },
  { label: "公司地址详情", value: "basic.address", type: "string" },
  { label: "登记人", value: "basic.createdByName", type: "string" },
  { label: "登记日期", value: "basic.createdDate", type: "date" },
  { label: "登记公司", value: "basic.createdByCompanyName", type: "string" },
  { label: "主联系人", value: "mainContacts.name", type: "string" },
  { label: "主联系人电话", value: "mainContacts.phone", type: "string" },
  { label: "主联系人性别", value: "mainContacts.sex", type: "string" },
  { label: "主联系人证件类型", value: "mainContacts.certType", type: "string" },
  {
    label: "主联系人证件号码",
    value: "mainContacts.certNumber",
    type: "string"
  },
  { label: "主联系人职务", value: "mainContacts.position", type: "string" },
  { label: "主联系人生日", value: "mainContacts.birthday", type: "string" },
  { label: "主联系人QQ", value: "mainContacts.qq", type: "string" },
  { label: "主联系人微信", value: "mainContacts.wechat", type: "string" },
  { label: "主联系人邮箱", value: "mainContacts.email", type: "string" },
  { label: "主联系人备注", value: "mainContacts.remark", type: "string" },
  { label: "客户性质", value: "settings.property", type: "string" },
  { label: "发票类型", value: "settings.defaultInvoiceType", type: "string" },
  { label: "享受价格", value: "settings.priceType", type: "string" },
  {
    label: "结算方式",
    value: "settings.defaultSettlementType",
    type: "string"
  },
  {
    label: "对账日",
    value: "settings.reconciliationDayString",
    type: "string"
  },
  { label: "账期", value: "settings.accountPeriodString", type: "string" },
  // { label: '欠款类型', value: null, type: "string" },
  { label: "信用额度", value: "settings.creditAmountString", type: "string" },
  {
    label: "默认提货方式",
    value: "settings.defaultDeliveryType",
    type: "string"
  },
  {
    label: "默认运输方式",
    value: "settings.defaultTransportType",
    type: "string"
  },
  { label: "默认包装方式", value: "settings.defaultPakingWay", type: "string" },
  {
    label: "默认物流公司",
    value: "settings.defaultLogisticsCompany",
    type: "string"
  }
  // { label: '允许代收货款', value: null, type: "string" },
  // { label: '代收款回款天数', value: null, type: "string" }
];

export const receptionOptions = [
  { label: "单据号", value: "billNo", type: "string" },
  {
    label: "单位名称",
    value: "cooperatorName",
    required: true,
    type: "string"
  },
  {
    label: "应收金额",
    value: "amount",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "单据日期", value: "billDate", type: "date" },
  { label: "业务备注", value: "remark", type: "string" },
  { label: "来源分公司", value: "companyName", required: true, type: "string" }
];

export const paymentOptions = [
  { label: "单据号", value: "billNo", type: "string" },
  {
    label: "单位名称",
    value: "cooperatorName",
    required: true,
    type: "string"
  },
  {
    label: "应付金额",
    value: "amount",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "单据日期", value: "billDate", type: "date" },
  { label: "业务备注", value: "remark", type: "string" },
  { label: "来源分公司", value: "companyName", required: true, type: "string" }
];

export const purchaseBillHistOptions = [
  { label: "分公司名称", value: "companyName", required: true, type: "string" },
  { label: "采购单号", value: "billNo", required: true, type: "string" },
  { label: "供应商", value: "cooperatorName", required: true, type: "string" },
  { label: "支付方式", value: "paymentType", required: true, type: "string" },
  { label: "发票类型", value: "invoiceType", required: true, type: "string" },
  { label: "业务日期", value: "billDate", required: true, type: "date" },
  { label: "业务员", value: "businessManName", type: "string" },
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  {
    label: "进货数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "进货价（含税）",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "到货仓库", value: "warehouseName", required: true, type: "string" },
  { label: "到货货区", value: "wareareaName", type: "string" },
  { label: "到货货架", value: "shelfName", type: "string" },
  { label: "到货货层", value: "layerName", type: "string" },
  { label: "到货货位", value: "positionName", type: "string" },
  { label: "单位", value: "unit", type: "string" },
  { label: "制单时间", value: "createdAt", type: "time" },
  { label: "配件备注", value: "remark", type: "string" },
  { label: "单据备注", value: "billRemark", type: "string" }
];

export const purchaseRetHistOptions = [
  { label: "分公司名称", value: "companyName", required: true, type: "string" },
  { label: "采购退货单号", value: "billNo", required: true, type: "string" },
  { label: "供应商", value: "cooperatorName", required: true, type: "string" },
  { label: "支付方式", value: "paymentType", required: true, type: "string" },
  { label: "发票类型", value: "invoiceType", required: true, type: "string" },
  { label: "业务日期", value: "billDate", required: true, type: "date" },
  { label: "业务员", value: "businessManName", type: "string" },
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  {
    label: "退货数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "退货价（含税）",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "仓库", value: "warehouseName", required: true, type: "string" },
  { label: "货区", value: "wareareaName", type: "string" },
  { label: "货架", value: "shelfName", type: "string" },
  { label: "货层", value: "layerName", type: "string" },
  { label: "货位", value: "positionName", type: "string" },
  { label: "退货原因", value: "returnReason", type: "string" },
  { label: "制单时间", value: "createdAt", type: "time" },
  { label: "配件备注", value: "remark", type: "string" },
  { label: "原采购单号", value: "sourceBillNo", type: "string" },
  { label: "单据备注", value: "billRemark", type: "string" }
];

export const salesBillHistOptions = [
  { label: "分公司名称", value: "companyName", required: true, type: "string" },
  { label: "销售单号", value: "billNo", required: true, type: "string" },
  { label: "客户", value: "cooperatorName", required: true, type: "string" },
  { label: "支付方式", value: "paymentType", required: true, type: "string" },
  { label: "发票类型", value: "invoiceType", required: true, type: "string" },
  { label: "业务日期", value: "billDate", required: true, type: "date" },
  { label: "业务员", value: "businessManName", type: "string" },
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  {
    label: "销售数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "销售价（含税）",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "成本价（含税）",
    value: "taxedPurchasePrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "成本价（未税）",
    value: "untaxedPurchasePrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "仓库", value: "warehouseName", required: true, type: "string" },
  { label: "货区", value: "wareareaName", type: "string" },
  { label: "货架", value: "shelfName", type: "string" },
  { label: "货层", value: "layerName", type: "string" },
  { label: "货位", value: "positionName", type: "string" },
  { label: "单位", value: "unit", type: "string" },
  { label: "车型", value: "vehModel", type: "string" },
  { label: "销售车型", value: "saleVehModel", type: "string" },
  { label: "制单时间", value: "createdAt", type: "time" },
  { label: "配件备注", value: "remark", type: "string" },
  { label: "单据备注", value: "billRemark", type: "string" }
];

export const salesRetHistOptions = [
  { label: "分公司名称", value: "companyName", required: true, type: "string" },
  { label: "销售退货单号", value: "billNo", required: true, type: "string" },
  { label: "客户", value: "cooperatorName", required: true, type: "string" },
  { label: "支付方式", value: "paymentType", required: true, type: "string" },
  { label: "发票类型", value: "invoiceType", required: true, type: "string" },
  { label: "业务日期", value: "billDate", required: true, type: "date" },
  { label: "业务员", value: "businessManName", type: "string" },
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  {
    label: "退货数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "退货价（含税）",
    value: "taxedPrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "成本价（含税）",
    value: "taxedPurchasePrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "成本价（未税）",
    value: "untaxedPurchasePrice",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "仓库", value: "warehouseName", required: true, type: "string" },
  { label: "货区", value: "wareareaName", type: "string" },
  { label: "货架", value: "shelfName", type: "string" },
  { label: "货层", value: "layerName", type: "string" },
  { label: "货位", value: "positionName", type: "string" },
  { label: "退货原因", value: "returnReason", type: "string" },
  { label: "制单时间", value: "createdAt", type: "time" },
  { label: "配件备注", value: "remark", type: "string" },
  { label: "原销售单号", value: "sourceBillNo", type: "string" },
  { label: "单据备注", value: "billRemark", type: "string" }
];

export const transferApplyOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  {
    label: "申请数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "到货仓库", value: "warehouseName", required: true, type: "string" },
  { label: "备注", value: "remark", type: "string" }
];
/* 简易模式 */
export const transferOutOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  { label: "仓库", value: "warehouseName", required: true, type: "string" },
  { label: "货位", value: "positionName", required: true, type: "string" },
  { label: "批次", value: "batchNo", required: true, type: "string" },
  {
    label: "调出数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "单价",
    value: "price",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "备注", value: "remark", type: "string" }
];

/* 标准模式 */
export const transferOutStandardOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  { label: "仓库", value: "warehouseName", required: true, type: "string" },
  { label: "货位", value: "positionName", required: true, type: "string" },
  { label: "批次", value: "batchNo", required: true, type: "string" },
  { label: "货区", value: "wareareaName", required: true, type: "string" },
  { label: "货层", value: "layerName", required: true, type: "string" },
  { label: "货架", value: "shelfName", required: true, type: "string" },
  {
    label: "调出数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "单价",
    value: "price",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "备注", value: "remark", type: "string" }
];

export const stockMovingOptions = [
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  { label: "配件性质", value: "property", type: "string" },
  { label: "批次号", value: "batchNo", type: "string" },
  {
    label: "移动数量",
    value: "qty",
    required: true,
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "原仓库", value: "warehouseName", required: true, type: "string" },
  { label: "原货位", value: "positionName", required: true, type: "string" },
  {
    label: "目标仓库",
    value: "toWarehouseName",
    required: true,
    type: "string"
  },
  {
    label: "目标货位",
    value: "toPositionName",
    required: true,
    type: "string"
  },
  { label: "备注", value: "remark", type: "string" }
];

export const customerVehicleFileOptions = [
  {
    label: "客户名称",
    value: "cooperatorName",
    required: true,
    type: "string"
  },
  { label: "车牌号", value: "plateNumber", required: true, type: "string" },
  { label: "车架号", value: "vin", type: "string" },
  { label: "品牌", value: "vehBrand", type: "string" },
  { label: "厂牌", value: "facBrand", type: "string" },
  { label: "车型组", value: "vehicleGroup", type: "string" },
  { label: "年款", value: "year", type: "string" },
  { label: "排量", value: "displacement", type: "string" },
  { label: "发动机", value: "engine", type: "string" },
  { label: "发动机号", value: "engineNo", type: "string" },
  { label: "变速箱", value: "transmission", type: "string" },
  { label: "变速箱号", value: "transmissionNo", type: "string" },
  { label: "变速箱型号", value: "gearboxModel", type: "string" },
  { label: "车身颜色", value: "bodyColor", type: "string" },
  { label: "内饰颜色", value: "interiorColor", type: "string" },
  { label: "驱动类型", value: "drivingType", type: "string" },
  { label: "购车日期", value: "purchaseDate", type: "date" },
  { label: "上牌日期", value: "plateDate", type: "date" },
  { label: "出厂日期", value: "manufactureDate", type: "date" },
  { label: "音响密码", value: "soundPassword", type: "string" },
  { label: "钥匙号", value: "keyNumber", type: "string" },
  { label: "档案号", value: "docNumber", type: "string" },
  { label: "车辆级别", value: "vehicleLevelName", type: "string" },
  { label: "车辆类型", value: "vehicleTypeName", type: "string" },
  { label: "燃油型号", value: "fuelType", type: "string" },
  { label: "轮胎规格", value: "tireSpec", type: "string" },
  { label: "备注", value: "remark", type: "string" },
  { label: "车主姓名", value: "ownerName", type: "string" },
  { label: "车主电话", value: "ownerPhone", type: "string" },
  { label: "车主性别", value: "sex", type: "string" },
  { label: "证件类型", value: "certType", type: "string" },
  { label: "证件号码", value: "certNumber", type: "string" },
  { label: "出生日期", value: "birthday", type: "date" },
  { label: "地址", value: "address", type: "string" },

  { label: "性别", value: "sex", type: "string" },
  { label: "民族", value: "nation", type: "string" },
  { label: "学历", value: "education", type: "string" },
  { label: "家庭收入", value: "householdIncome", type: "string" },
  { label: "婚姻状况", value: "marriage", type: "string" },
  { label: "QQ/微信", value: "qqWechat", type: "string" },
  { label: "电子邮箱", value: "email", type: "string" },
  {
    label: "年审月份",
    value: "auditMonth",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  { label: "车型技术参数", value: "params", type: "string" },
  { label: "从事行业", value: "industry", type: "string" },
  {
    label: "工时折扣",
    value: "manHourDiscount",
    type: "string"
  },
  { label: "配件折扣", value: "partDiscount", type: "string" },
  {
    label: "配件价格",
    value: "partPriceType",
    type: "string"
  },
  { label: "保单号（交强险）", value: "mandatoryInsurance", type: "string" },
  { label: "保单号（商业险）", value: "commercialInsurance", type: "string" },
  { label: "保险公司", value: "insuranceCompanyId", type: "string" },
  { label: "保单起保日期", value: "insuranceStart", type: "date" },
  { label: "保单到期日期", value: "insuranceExpiry", type: "date" },
  { label: "要求回访", value: "flags.forReview", type: "string" },
  { label: "绝对免赔率", value: "deductionRate", type: "string" }
];

export const maintenanceProjectsOptions = [
  { label: "项目名称", value: "name", required: true, type: "string" },
  { label: "项目类型", value: "categoryName", required: true, type: "string" },
  { label: "是否停用", value: "disabled", type: "string" },
  { label: "常用项目", value: "commonUse", type: "string" },
  { label: "允许打折", value: "discount", type: "string" },
  { label: "备注", value: "remark", type: "string" },
  { label: "收费工时", value: "chargeManHour", type: "string" },
  { label: "考核工时", value: "checkManHour", type: "string" },
  { label: "工时单价", value: "manHourPrice", type: "string" },
  { label: "工时成本价", value: "manHourCostPrice", type: "string" }
];

export const partsFixedOptions = [
  { label: "分公司名称", value: "companyName", type: "string" },
  { label: "配件编码", value: "code", required: true, type: "string" },
  { label: "配件名称", value: "name", required: true, type: "string" },
  { label: "配件品牌", value: "brand", type: "string" },
  { label: "产地", value: "productionPlace", type: "string" },
  {
    label: "零售价",
    value: "retailPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "平台价",
    value: "platformPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "调拨价",
    value: "transferPrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价",
    value: "wholeSalePrice",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价一",
    value: "wholeSalePrice1",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价二",
    value: "wholeSalePrice2",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价三",
    value: "wholeSalePrice3",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  },
  {
    label: "批发价四",
    value: "wholeSalePrice4",
    type: "number",
    checkValue(data, option) {
      return checkValueHandle(data, option);
    }
  }
];
