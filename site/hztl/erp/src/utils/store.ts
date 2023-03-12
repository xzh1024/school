import { SelectOptions } from "@/constants/interface";
import { DictionaryItem } from "@/constants/base";
import store from "@/store/store";
declare global {
  interface Window {
    store: object;
  }
}
window.store = store;

export function isYx() {
  return store.state.admin.user.hasYx;
}

export function userMsg() {
  return store.state.admin.user;
}
export function userInfoMsg() {
  return store.state.admin.user.userInfoMsg;
}

export function unitDictionary(): DictionaryItem[] {
  return dictionary("unit");
}
export function partBrandDictionary(): DictionaryItem[] {
  return dictionary("partBrand");
}
export function propertyDictionary(): DictionaryItem[] {
  return dictionary("property");
}
export function productionPlaceDictionary(): DictionaryItem[] {
  return dictionary("productionPlace");
}
export function partTypeDictionary(): DictionaryItem[] {
  return dictionary("partType");
}
export function deliveryTypeDictionary(): DictionaryItem[] {
  return dictionary("deliveryType");
}
export function invoiceTypeDictionary(): DictionaryItem[] {
  return dictionary("invoiceType");
}
export function formatInvoiceTypeDictionary(): DictionaryItem[] {
  return dictionary("formatInvoiceType");
}
export function returnReasonDictionary(): DictionaryItem[] {
  return dictionary("returnReason");
}
export function currencyDictionary(): DictionaryItem[] {
  return dictionary("currency");
}
export function settlementTypeDictionary(): DictionaryItem[] {
  return dictionary("settlementType");
}
export function paymentTypeDictionary(): DictionaryItem[] {
  return dictionary("paymentType");
}
export function transportTypeDictionary(): DictionaryItem[] {
  return dictionary("transportType");
}
export function packingWayDictionary(): DictionaryItem[] {
  return dictionary("packingWay");
}
export function freightPayerDictionary(): DictionaryItem[] {
  return dictionary("freightPayer");
}
export function customerTypeDictionary(): DictionaryItem[] {
  return dictionary("customerType");
}
export function debtTypeDictionary(): DictionaryItem[] {
  return dictionary("debtType");
}
export function companyTypeDictionary(): DictionaryItem[] {
  return dictionary("companyType");
}
export function enhancedSettlementTypeDictionary(): DictionaryItem[] {
  return dictionary("enhancedSettlementType");
}
export function priceTypeDictionary(): DictionaryItem[] {
  return dictionary("priceType");
}
export function credentialsDictionary(): DictionaryItem[] {
  return dictionary("credentials");
}
export function insureCertTypeDictionary(): DictionaryItem[] {
  return dictionary("insureCertType");
}
export function educationDictionary(): DictionaryItem[] {
  return dictionary("education");
}
export function professionDictionary(): DictionaryItem[] {
  return dictionary("profession");
}
export function nationDictionary(): DictionaryItem[] {
  return dictionary("nation");
}
export function technicianLevelDictionary(): DictionaryItem[] {
  return dictionary("technicianLevel", true);
}
export function technicianCategoryDictionary(): DictionaryItem[] {
  return dictionary("technicianCategory", true);
}
export function repairProjectCategoryDictionary(): DictionaryItem[] {
  return dictionary("repairProjectCategory", true);
}
export function vehicleLevelDictionary(): DictionaryItem[] {
  return dictionary("vehicleLevel", true, true);
}
export function vehicleTypeDictionary(): DictionaryItem[] {
  return dictionary("vehicleType", true);
}
export function partsCategories(): any[] {
  return store.state.admin.partsBc.partsCategories;
}
export function logisticsTypes(): any[] {
  return store.state.admin.communionCompany.logisticsTypes;
}
export function accountList(): any[] {
  return store.state.admin.baseData.accountList;
}
export function administerWareHouse(): any[] {
  return store.state.admin.warehouse.administerWareHouse;
}
export function allStaffs(): any[] {
  return store.state.admin.staffs.allStaffs;
}
export function myStaffs(): any[] {
  return store.state.admin.staffs.myStaffs;
}
export function purchaseMen(): any[] {
  return store.state.admin.purchaseMan.purchaseMen;
}
export function salesMen(): any[] {
  return store.state.admin.salesMan.salesMen;
}
export function warehouseManagers(): any[] {
  return store.state.admin.warehouseManager.warehouseManagers;
}
export function allCompanies(): any[] {
  return store.state.admin.baseData.companies;
}
export function otherBranchCompanies(): any[] {
  const companyId = userInfoMsg().companyId;
  return store.state.admin.baseData.companies.filter(
    (item: SelectOptions) => item.id !== companyId
  );
}

function dictionary(
  type: string,
  useID = false,
  isReload = false
): DictionaryItem[] {
  const dict = store.state.baseData.dictionary[type];
  if (dict && !dict.loaded) {
    // 异步加载
    store.dispatch("baseData/dictionary/loadDictionary", {
      type: type,
      useID: useID,
      isReload: isReload
    });
  }
  return dict || [];
}
