import {
  cbdApiProjectFormalContractBerthInfoContractIdGet,
  cbdApiProjectFormalContractBerthSavePost,
  cbdApiProjectFormalContractSubjectInfoContractIdGet,
  cbdApiProjectIntentionContractBerthInfoContractIdGet,
  cbdApiProjectIntentionContractBerthSavePost,
  cbdApiProjectIntentionContractSubjectInfoContractIdGet
} from '@/api';
// contractType: number; //1意向合同 2正式合同
export default function useApi(type: number) {
  const isIntention = type === 1;
  // 回显请求详情的方法
  const requestBerthInfoApi = isIntention
    ? cbdApiProjectIntentionContractBerthInfoContractIdGet
    : cbdApiProjectFormalContractBerthInfoContractIdGet;
  // 提交信息的方法
  const requestSubmitApi = isIntention
    ? cbdApiProjectIntentionContractBerthSavePost
    : cbdApiProjectFormalContractBerthSavePost;
  // 请求合同主体的方法
  const requestSubjectInfoApi = isIntention
    ? cbdApiProjectIntentionContractSubjectInfoContractIdGet
    : cbdApiProjectFormalContractSubjectInfoContractIdGet;
  return {
    requestBerthInfoApi,
    requestSubmitApi,
    requestSubjectInfoApi
  };
}
