import {
  cbdApiProjectFormalContractFileInfoContractIdGet,
  cbdApiProjectFormalContractFileSavePost,
  cbdApiProjectIntentionContractFileInfoContractIdGet,
  cbdApiProjectIntentionContractFileSavePost
} from '@/api';

export function useApi(contractType = 2) {
  const isFormalContract = contractType === 2;
  return {
    saveApi: isFormalContract
      ? cbdApiProjectFormalContractFileSavePost
      : cbdApiProjectIntentionContractFileSavePost,
    detailApi: isFormalContract
      ? cbdApiProjectFormalContractFileInfoContractIdGet
      : cbdApiProjectIntentionContractFileInfoContractIdGet
  };
}
