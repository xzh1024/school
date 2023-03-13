import {
  cbdApiProjectFormalContractAbstractDownloadGet, cbdApiProjectFormalContractAbstractDownloadPost,
  cbdApiProjectFormalContractAbstractInfoContractIdGet, cbdApiProjectFormalContractApprovalConfirmPost,
  cbdApiProjectFormalContractHistoryContractIdGet,
  cbdApiProjectIntentionContractAbstractDownloadGet, cbdApiProjectIntentionContractAbstractDownloadPost,
  cbdApiProjectIntentionContractAbstractInfoContractIdGet, cbdApiProjectIntentionContractApprovalConfirmPost,
  cbdApiProjectIntentionContractHistoryContractIdGet,
} from '@/api';

/**
 * @param contractType { number }  //1意向合同 2正式合同
 */
export function useApi(contractType = 2) {
  const isFormalContract = contractType === 2;
  return {
    abstractInfoApi: isFormalContract
      ? cbdApiProjectFormalContractAbstractInfoContractIdGet
      : cbdApiProjectIntentionContractAbstractInfoContractIdGet,
    contractHistoryApi: isFormalContract
      ? cbdApiProjectFormalContractHistoryContractIdGet
      : cbdApiProjectIntentionContractHistoryContractIdGet,
    abstractExportUrl: isFormalContract
      ? '/cbd-api-project/formal/contract/abstract/download'
      : '/cbd-api-project/intention/contract/abstract/download',
    confirmApi: isFormalContract
      ? cbdApiProjectFormalContractApprovalConfirmPost
      : cbdApiProjectIntentionContractApprovalConfirmPost
  };
}
