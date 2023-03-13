import { reactive, ref } from 'vue';
import useFuncProxy from '@/hooks/useFuncProxy';
import {
  cbdApiProjectCommonMerchantBrandListGet,
  CbdApiProjectCommonMerchantBrandListGetResponse,
  cbdApiProjectCommonMerchantListGet,
  CbdApiProjectCommonMerchantListGetResponse,
  cbdApiProjectCommonProjectSelectListGet,
  CbdApiProjectCommonProjectSelectListGetResponse,
  cbdApiProjectInvestPlanSelectGet,
  CbdApiProjectInvestPlanSelectGetResponse,
  cbdApiProjectNegotiateEstateGet,
  CbdApiProjectNegotiateEstateGetResponse
} from '@/api';
const addMerchantForm: any = reactive({
  projectId: '',
  code: '',
  type: '',
  name: '',
  shortName: '',
  companyName: '',
  legalPerson: '',
  idNumber: '',
  businessLicenseNumber: '',
  bank: '',
  bankAccountName: '',
  bankAccount: '',
  linkman: '',
  linkTel: '',
  address: '',
  attachment: [],
  remark: ''
});
const planList = ref<CbdApiProjectInvestPlanSelectGetResponse>([]);
const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
const brandDropList = ref<CbdApiProjectCommonMerchantBrandListGetResponse>([]);
const merchantDropList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
const estateDropList = ref<CbdApiProjectNegotiateEstateGetResponse>([]);
const [getPlanListData] = useFuncProxy(async (v: string) => {
  planList.value = await cbdApiProjectInvestPlanSelectGet({
    projectId: v
  });
});
const [getProjectListData] = useFuncProxy(async () => {
  projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
});
const [getBrandDropList] = useFuncProxy(async (v: string) => {
  brandDropList.value = await cbdApiProjectCommonMerchantBrandListGet({
    projectId: v + ''
  });
});
const [getMerchantDropList] = useFuncProxy(async (v: string) => {
  merchantDropList.value = await cbdApiProjectCommonMerchantListGet({
    projectId: v + ''
  });
});
const [getEstateDropList] = useFuncProxy(
  async ({
    projectIds,
    leaseType,
    type
  }: {
    projectIds: string;
    leaseType: string;
    type: string;
  }) => {
    estateDropList.value = await cbdApiProjectNegotiateEstateGet({
      projectIds,
      leaseType,
      type
    });
  }
);
export {
  addMerchantForm,
  estateDropList,
  planList,
  projectList,
  brandDropList,
  merchantDropList,
  getPlanListData,
  getProjectListData,
  getBrandDropList,
  getMerchantDropList,
  getEstateDropList
};
