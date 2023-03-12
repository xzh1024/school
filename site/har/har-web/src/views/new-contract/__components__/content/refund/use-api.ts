import {
  cbdApiProjectFormalContractBackInfoContractIdGet,
  cbdApiProjectFormalContractBackSavePost,
  cbdApiProjectIntentionContractBackInfoContractIdGet,
  cbdApiProjectIntentionContractBackSavePost,
  cbdApiProjectFormalContractSubjectInfoContractIdGet,
  cbdApiProjectIntentionContractSubjectInfoContractIdGet
} from '@/api';

/**
 * @param contractType { number }  //1意向合同 2正式合同
 */
export function useApi(contractType = 2) {
  const isFormalContract = contractType === 2;
  return {
    saveApi: isFormalContract
      ? cbdApiProjectFormalContractBackSavePost
      : cbdApiProjectIntentionContractBackSavePost,
    detailApi: isFormalContract
      ? cbdApiProjectFormalContractBackInfoContractIdGet
      : cbdApiProjectIntentionContractBackInfoContractIdGet,
    contractDetailApi: isFormalContract
      ? cbdApiProjectFormalContractSubjectInfoContractIdGet
      : cbdApiProjectIntentionContractSubjectInfoContractIdGet
  };
}
