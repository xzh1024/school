import { ref } from 'vue';
import useFuncProxy from '@/hooks/useFuncProxy';
import {
  cbdApiProjectCommonContractStoreSelectGet,
  CbdApiProjectCommonContractStoreSelectGetResponse,
  cbdApiProjectCommonMerchantBrandListGet,
  CbdApiProjectCommonMerchantBrandListGetResponse,
  cbdApiProjectCommonMerchantListGet,
  CbdApiProjectCommonMerchantListGetResponse,
  cbdApiProjectCommonMisTreeExpenseGet,
  CbdApiProjectCommonMisTreeExpenseGetResponse,
  cbdApiProjectCommonProjectSelectListGet,
  CbdApiProjectCommonProjectSelectListGetResponse,
  cbdApiProjectCommonStoreSelectGet,
  CbdApiProjectCommonStoreSelectGetResponse
} from '@/api';
const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
const brandDropList = ref<CbdApiProjectCommonMerchantBrandListGetResponse>([]);
const merchantDropList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
//合同-店铺下拉
const storeSelectList = ref<CbdApiProjectCommonContractStoreSelectGetResponse>(
  []
);
//商户 店铺下拉
const merchantStoreList = ref<CbdApiProjectCommonStoreSelectGetResponse>([]);
//合同-店铺下拉
const expenseList = ref<CbdApiProjectCommonMisTreeExpenseGetResponse>([]);

const [getProjectListData] = useFuncProxy(async () => {
  projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
});
const [getBrandDropList] = useFuncProxy(async (projectId: string) => {
  brandDropList.value = await cbdApiProjectCommonMerchantBrandListGet({
    projectId: projectId + ''
  });
});
const [getMerchantDropList] = useFuncProxy(async (projectId: string) => {
  merchantDropList.value = await cbdApiProjectCommonMerchantListGet({
    projectId: projectId + ''
  });
});
const [getStoreSelectList] = useFuncProxy(
  async (params: { projectId: string; merchantId?: string }) => {
    storeSelectList.value = await cbdApiProjectCommonContractStoreSelectGet({
      ...params
    });
  }
);
const [getMerchantStoreList] = useFuncProxy(
  async (params: { projectId: string; merchantId?: string }) => {
    merchantStoreList.value = await cbdApiProjectCommonStoreSelectGet({
      ...params
    });
  }
);
const [getExpenseList] = useFuncProxy(
  async (p: {
    parentExpenseCode?: string;
    parentExpenseCodes?: string;
    contractId?: string;
    projectId?: string;
  }) => {
    expenseList.value = await cbdApiProjectCommonMisTreeExpenseGet({
      ...p
    });
  }
);
export {
  projectList,
  brandDropList,
  merchantDropList,
  storeSelectList,
  expenseList,
  merchantStoreList,
  getProjectListData,
  getBrandDropList,
  getMerchantDropList,
  getMerchantStoreList,
  getStoreSelectList,
  getExpenseList
};
