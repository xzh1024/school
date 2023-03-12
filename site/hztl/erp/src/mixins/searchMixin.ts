/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO 移除any

import { groupBy } from "lodash";
import { Component, Vue } from "vue-property-decorator";
import {
  baseDictionary,
  getPartName,
  searchAllWarehouses,
  searchAllTypeWarehouses,
  searchSaleVehModel
} from "@/api/base";
import {
  searchAllCooperators,
  selectCooperators,
  searchCooperatorsBranches,
  searchDepartments
} from "@/api/communion/communion";
import {
  searchAuditmen,
  searchBusinessmen,
  searchCreatedmen,
  searchTypeStaffs
} from "@/api/company/company";
import { localSearchData, mnemonicSearch } from "@/utils/filterData";
import * as store from "@/utils/store";
import { DictionaryItem } from "@/constants/base";
import { resetBelongsItem } from "@/mixins/permissionsMixin";

const booleanMap = [
  {
    id: true,
    name: "是"
  },
  {
    id: false,
    name: "否"
  }
];

const salesStatuses = [
  {
    // mnemonic: 'ZS',
    id: true,
    name: "在售"
  },
  {
    // mnemonic: 'TS',
    id: false,
    name: "停售"
  }
];

const filterZeroStatus = [
  {
    id: true,
    name: "是"
  },
  {
    id: false,
    name: "否"
  }
];

const hasHistoryStatus = [
  {
    id: true,
    name: "有"
  },
  {
    id: false,
    name: "无"
  }
];
const allStockProperty = [
  {
    id: 1,
    name: "自营库存"
  }
];
const allMovingStutas = [
  {
    id: 1,
    name: "不可移仓"
  },
  {
    id: 2,
    name: "可移仓"
  }
];
const allTakingStutas = [
  {
    id: 1,
    name: "库存锁定"
  },
  {
    id: 2,
    name: "盘点中"
  },
  {
    id: 3,
    name: "可盘点"
  },
  {
    id: 4,
    name: "负库存"
  }
];

/**
 *
 * 为autocomplete 和autoselect的remote方式 提供搜索方法
 * 为autoselect本地搜索提供数据
 *
 */

export function frontendOrder(list: any[], string: string) {
  return list
    .sort((a, b) => {
      return a.name.length - b.name.length;
    })
    .sort((a, b) => {
      const aIndex = a.name.indexOf(string);
      const bIndex = b.name.indexOf(string);
      return aIndex - bIndex;
    });
}

@Component
export default class SearchMixin extends Vue {
  searchedData: {
    cooperators: Cooperator[];
    customers: Cooperator[];
    suppliers: Cooperator[];
  } = {
    cooperators: [],
    customers: [],
    suppliers: []
  };

  get searchBaseData(): SearchBaseDataI {
    return {
      booleanMap,
      filterZeroStatus,
      hasHistoryStatus,
      salesStatuses,
      allStockProperty,
      allMovingStutas,
      allTakingStutas
    };
  }
  get allCompaniesWithPerm() {
    return store.allCompanies().filter(item => {
      if (this.$route.meta.exchangeBelongs) {
        if (this.$route.meta.tags) {
          return this.hasBelongsTagsPerm(
            "read",
            resetBelongsItem(
              item.belongs,
              this.$route.meta.exchangeBelongs.currentBelongs,
              this.$route.meta.exchangeBelongs.newBelongs
            ),
            this.$route.meta.defaultTag
          );
        } else {
          return this.hasBelongsPerm(
            "read",
            resetBelongsItem(
              item.belongs,
              this.$route.meta.exchangeBelongs.currentBelongs,
              this.$route.meta.exchangeBelongs.newBelongs
            )
          );
        }
      } else {
        if (this.$route.meta.tags) {
          return this.hasBelongsTagsPerm(
            "read",
            item.belongs,
            this.$route.meta.defaultTag
          );
        } else {
          return this.hasBelongsPerm("read", item.belongs);
        }
      }
    });
  }

  async getDefaultAccount(companyId: number) {
    const accountsGroup = await this.getAccountGroupByCompanyId();
    let accounts = accountsGroup[companyId];
    if (!accounts || !accounts.length) {
      accounts = store.accountList();
    }
    return accounts.find((item: any) => item.isDefault) || accounts[0];
  }

  async loadEnableAccountList(isReload?: boolean) {
    await this.$store.dispatch("admin/baseData/loadAccountList", isReload);
  }

  async getAccountGroupByCompanyId(isReload?: boolean) {
    await this.loadEnableAccountList(isReload);
    return groupBy(store.accountList(), "companyId");
  }
  async getAccountGroupByPaymentMethod(isGroupByCompanyId: boolean) {
    await this.loadEnableAccountList();
    const group: { [key: string]: any } = groupBy(
      store.accountList(),
      "paymentMethod"
    );
    if (isGroupByCompanyId) {
      Object.keys(group).forEach(paymentMethod => {
        group[paymentMethod] = groupBy(group[paymentMethod], "companyId");
      });
    }
    return group;
  }
  async searchGroupCooperators(query: string, type?: string) {
    const res = await selectCooperators({
      onlyGroup: "true",
      all: true,
      keyword: query,
      type
    });
    return res || [];
  }

  async searchLoadCategory(query: string) {
    const res = await baseDictionary({
      type: "category",
      keyword: query
    });
    const options = res.options || [];
    return (
      options.map((item: any) => ({ id: item.name, name: item.name })) || []
    );
  }

  async autocompleteSearchPartName(query: string, cb: Function) {
    const res = await getPartName({ name: query });
    const names = res.names || [];
    const options = names.length
      ? names.map((item: any) => {
          const obj = { value: item };
          return obj;
        })
      : [];
    cb(options);
  }
  async fuzzySearchSaleVehModel(query: string) {
    const res = await searchSaleVehModel(query);
    return res ? res.map((item: any) => ({ value: item })) : [];
  }
  async autocompleteSearchSaleVehModel(query: string, cb: Function) {
    const res = await this.fuzzySearchSaleVehModel(query);
    cb(res);
  }
  async autocompleteSearchVehModel(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "vehModel",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchCategory(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "category",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchPartBrand(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "partBrand",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchProductionPlace(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "productionPlace",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchProperty(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "property",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchTransportType(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "transportType",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchPackWay(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "packingWay",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchDeliveryType(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "deliveryType",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchFreightPayer(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "freightPayer",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchReturnReasons(query: string, cb: Function) {
    const res = await baseDictionary({
      type: "returnReason",
      keyword: query
    });
    const options = res.options || [];
    cb(options.map((item: any) => ({ ...item, value: item.name })));
  }

  autocompleteSearchSalesStatus(query: string, cb: Function) {
    const options = mnemonicSearch(this.searchBaseData.salesStatuses, query);
    cb(
      frontendOrder(options, query).map((item: any) => ({ value: item.name }))
    );
  }

  autocompleteSearchStockProperty(query: string, cb: Function) {
    const options = mnemonicSearch(this.searchBaseData.allStockProperty, query);
    cb(
      frontendOrder(options, query).map((item: any) => ({ value: item.name }))
    );
  }

  autocompleteSearchStaffs(query: string, cb: Function) {
    const options = localSearchData(store.allStaffs(), query);
    cb(
      frontendOrder(options, query).map((item: any) => ({ value: item.name }))
    );
  }

  async searchLoadCooperatorsBranches(query: string) {
    const res =
      (await searchCooperatorsBranches({
        keyword: query
      })) || [];
    return res.map((item: string) => ({ id: item, name: item })) || [];
  }
  async searchLoadCooperators(type: string, query: string) {
    return (
      (await searchAllCooperators({
        type,
        keyword: query
      })) || []
    );
  }
  async searchLoadAllCustromerCooperators(query: string) {
    return (
      (await searchAllCooperators({
        type: "customer",
        keyword: query
      })) || []
    );
  }
  async searchLoadAllSupplierCooperators(query: string) {
    return (
      (await searchAllCooperators({
        type: "supplier",
        keyword: query
      })) || []
    );
  }
  async searchLoadAllLogisticsCooperators(query: string) {
    return (
      (await searchAllCooperators({
        type: "logistics",
        keyword: query
      })) || []
    );
  }
  async searchLoadAllTypesCooperators(query: string) {
    return (await searchAllCooperators({ keyword: query })) || [];
  }

  async searchLoadOnlyLogisticsCooperators(query: string) {
    return (
      (await selectCooperators({ type: "logistics", keyword: query })) || []
    );
  }
  async searchLoadOnlyCustomerCooperators(query: string) {
    return (
      (await selectCooperators({ type: "customer", keyword: query })) || []
    );
  }
  async getAllCustomerCooperators(query: string) {
    const res =
      (await selectCooperators({ type: "customer", keyword: query })) || [];
    return res.map((item: any) => ({
      ...item,
      value: item.name
    }));
  }
  async getAllCustomerCooperatorsByName(query: string) {
    const res =
      (await selectCooperators({ type: "customer", keyword: query })) || [];
    return res.map((item: any) => ({
      ...item,
      id: item.name,
      value: item.name
    }));
  }
  async getAllDepartments(query: string) {
    const res =
      (await searchDepartments({
        companyId: store.userInfoMsg().companyId,
        keyword: query
      })) || [];
    return res.map((item: any) => ({
      id: item.departmentName,
      name: item.departmentName,
      value: item.departmentName
    }));
  }
  async searchLoadOnlySupplierCooperators(query: string) {
    return (
      (await selectCooperators({ type: "supplier", keyword: query })) || []
    );
  }
  async autocompleteSearchCooperatorsBranches(query: string, cb: Function) {
    const res: string[] =
      (await searchCooperatorsBranches({ keyword: query })) || [];
    cb(res.map((item: any) => ({ id: item, name: item, value: item })));
  }
  async autocompleteSearchAllCooperators(query: string, cb: Function) {
    const res: Cooperator[] =
      (await searchAllCooperators({ keyword: query })) || [];
    this.searchedData.cooperators = res;
    cb(res.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchAllCustomers(query: string, cb: Function) {
    const res: Cooperator[] =
      (await searchAllCooperators({
        keyword: query,
        allcoop: false,
        type: "customer",
        addFromPlatform: "sales"
      })) || [];
    this.searchedData.customers = res;
    cb(res.map((item: any) => ({ ...item, value: item.name })));
  }
  async autocompleteSearchAllSuppliers(query: string, cb: Function) {
    const res: Cooperator[] =
      (await searchAllCooperators({
        keyword: query,
        allcoop: false,
        type: "supplier",
        addFromPlatform: "purchases"
      })) || [];
    this.searchedData.suppliers = res;
    cb(res.map((item: any) => ({ ...item, value: item.name })));
  }

  async searchLoadAllPurchaseMen(query: string) {
    const data = await searchBusinessmen({
      role: "purchaseMan",
      companyId: store.userInfoMsg().companyId,
      name: query
    });
    return data.staffs || [];
  }
  async searchLoadAllSalesMen(query: string) {
    const data = await searchBusinessmen({
      role: "salesMan",
      companyId: store.userInfoMsg().companyId,
      name: query
    });
    return data.staffs || [];
  }
  async searchLoadAllBusinessMen(query: string) {
    const data = await searchBusinessmen({
      role: "",
      companyId: store.userInfoMsg().companyId,
      name: query
    });
    return data.staffs || [];
  }
  async searchLoadAllAuditMen(query: string) {
    const data = await searchAuditmen({
      role: "salesMan",
      companyId: store.userInfoMsg().companyId,
      name: query
    });
    return data.staffs || [];
  }
  async searchLoadAllCreatedMen(billTypes: string[], query: string) {
    // billTypes为数组
    // XD: 销售订单, XS: "销售出库单", XT:销售退货单
    // CD: "采购订单", CG: "采购到货单", JJ: "急件到货单", CT: "采购退货单",
    const data = await searchCreatedmen({
      billTypes,
      companyId: store.userInfoMsg().companyId,
      name: query
    });
    return data.staffs || [];
  }

  async searchLoadCompanyStaffs(company: number, query: string) {
    const data = await searchTypeStaffs({
      role: "",
      company,
      name: query
    });
    return data || [];
  }
  async searchLoadCompanySalesMen(company: number, query: string) {
    const data = await searchTypeStaffs({
      role: "salesMan",
      company,
      name: query
    });
    return data || [];
  }
  async searchLoadCompanyPurchaseMen(company: number, query: string) {
    const data = await searchTypeStaffs({
      role: "purchaseMan",
      company,
      name: query
    });
    return data || [];
  }

  async searchLoadAllWarehouses(query: string, companyId?: number) {
    const res = await searchAllWarehouses({
      name: query,
      status: 0,
      companyId
    });
    return res || [];
  }
  async autocompleteLoadAllWarehouses(
    query: string,
    cb: Function,
    companyId?: number
  ) {
    const res = await searchAllWarehouses({
      name: query,
      status: 0,
      companyId
    });
    cb(res && res.length ? res.map((item: any) => ({ value: item.name })) : []);
  }
  async searchLoadAllTypeWarehouses(params: SearchWarehousParams) {
    const res = await searchAllTypeWarehouses(params);
    return res || [];
  }
  async searchLoadAllocWarehouses(params: SearchWarehousAllocParams) {
    const { name, status, ...alloc } = params;
    const res = await searchAllTypeWarehouses({
      name,
      status,
      perms: { alloc }
    });
    return res || [];
  }
  async searchLoadManageWarehouses(params: SearchWarehousManageParams) {
    const { name, status, ...manage } = params;
    const res = await searchAllTypeWarehouses({
      name,
      status,
      perms: { manage }
    });
    return res || [];
  }
  async searchLoadAssignWarehouses(params: SearchWarehousAssignParams) {
    const { name, status, ...assign } = params;
    const res = await searchAllTypeWarehouses({
      name,
      status,
      perms: { assign }
    });
    return res || [];
  }
}

interface DictionaryData {
  [key: string]: DictionaryItem[];
}

interface SearchBaseDataI extends DictionaryData {
  [key: string]: any[];
}

interface WarehousAssignParamsPerm {
  assignCompanyId?: number;
}
interface SearchWarehousAssignParams extends WarehousAssignParamsPerm {
  name?: string;
  status?: number | null;
}
interface WarehousManageParamsPerm {
  managerCompanyId?: number;
  managerStaffId?: number;
}
interface SearchWarehousManageParams extends WarehousManageParamsPerm {
  name?: string;
  status?: number | null;
}
interface WarehousAllocParamsPerm {
  inCompanyId?: number;
  outCompanyId?: number;
}
interface SearchWarehousAllocParams extends WarehousAllocParamsPerm {
  name?: string;
  status?: number | null;
}

interface WarehousParamsPerm {
  assign?: WarehousAssignParamsPerm;
  manage?: WarehousManageParamsPerm;
  alloc?: WarehousAllocParamsPerm;
}
interface SearchWarehousParams {
  name?: string;
  status?: number | null;
  perms?: WarehousParamsPerm;
}

interface Cooperator {
  id?: number;
  name?: string;
  contact?: string;
  contactPhoneNo?: string;
}
