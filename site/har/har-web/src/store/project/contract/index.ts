import { defineStore } from 'pinia';
import {
  cbdApiProjectCommonMisTreeExpenseGet,
  cbdApiProjectFormalContractDeletePut,
  cbdApiProjectFormalContractApprovalConfirmPost,
  cbdApiProjectFormalContractApprovalTerminationGet,
  cbdApiProjectFormalContractApprovalCancelGet,
  cbdApiProjectFormalContractApprovalClearGet,
  cbdApiProjectIntentionContractDeletePut,
  cbdApiProjectIntentionContractApprovalConfirmPost,
  cbdApiProjectIntentionContractApprovalTransGet,
  cbdApiProjectIntentionContractApprovalCancelGet,
  cbdApiProjectIntentionContractApprovalRevokeGet,
  cbdApiProjectFormalContractApprovalRevokeGet
} from '@/api';

interface ContractInfo {
  contractType: number; //1意向合同 2正式合同
  handleType: number; // 1添加 2编辑 3查看
  contractId: number | string;
  businessStatus: number;
  verifyStatus: number;
  isModify?: boolean;
  // 只显示详情的功能
  onlyShowDetail?: boolean;
}

interface stateType {
  contractInfo: ContractInfo;
  drawerVisible: boolean;
  tableRefresh: boolean;
}

export const useContractStore = defineStore('projectContract', {
  state(): stateType {
    return {
      contractInfo: {} as ContractInfo,
      drawerVisible: false,
      tableRefresh: false
    };
  },
  actions: {
    //撤销审批 意向
    async revokeIntentionContract(contractId: string) {
      try {
        await cbdApiProjectIntentionContractApprovalRevokeGet({
          contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //作废审批 意向
    async cancelIntentionContract(contractId: string) {
      try {
        await cbdApiProjectIntentionContractApprovalCancelGet({
          contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //转正式合同审批
    async changeFormal(contractId: string) {
      try {
        await cbdApiProjectIntentionContractApprovalTransGet({
          contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //确认合同 意向合同
    async confirmIntentionContract(
      contractIds: string[],
      sourceCodeList: string[],
      remarks: string
    ) {
      try {
        await cbdApiProjectIntentionContractApprovalConfirmPost({
          contractIds,
          sourceCodeList,
          remarks
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //删除合同 意向合同
    async delIntentionContract(contractId: number[]) {
      try {
        await cbdApiProjectIntentionContractDeletePut({
          contractIds: contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    tableRefreshChange() {
      this.tableRefresh = !this.tableRefresh;
    },
    drawerVisibleChange() {
      this.drawerVisible = !this.drawerVisible;
    },
    //清算合同 正式合同
    async clearContract(contractId: string) {
      try {
        await cbdApiProjectFormalContractApprovalClearGet({
          contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //撤销审批 正式合同
    async revokeContract(contractId: string) {
      try {
        await cbdApiProjectFormalContractApprovalRevokeGet({
          contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //作废合同 正式合同
    async cancelContract(contractId: string) {
      try {
        await cbdApiProjectFormalContractApprovalCancelGet({
          contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //终止合同 正式合同
    async terminationContract(contractId: string) {
      try {
        await cbdApiProjectFormalContractApprovalTerminationGet({
          contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //确认合同 正式合同
    async confirmContract(
      contractIds: string[],
      sourceCodeList: string[],
      remarks: string
    ) {
      try {
        await cbdApiProjectFormalContractApprovalConfirmPost({
          contractIds,
          sourceCodeList,
          remarks
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //删除合同 正式合同
    async delContract(contractId: number[]) {
      try {
        await cbdApiProjectFormalContractDeletePut({
          contractIds: contractId
        });
        return true;
      } catch (e: any) {
        console.error(e.value.msg);
        return false;
      }
    },
    //获取费用项目树
    async getExpenseTree(
      parentExpenseCode: string,
      parentExpenseCodes: string,
      contractId = '',
      chargingMethod = '',
      rootCodes = '',
      contractProjectFilter = '1',
      contractExpenseFilter = '0'
    ) {
      try {
        return await cbdApiProjectCommonMisTreeExpenseGet({
          parentExpenseCode,
          parentExpenseCodes,
          contractId,
          chargingMethod,
          rootCodes,
          contractProjectFilter,
          contractExpenseFilter
        });
      } catch (e) {
        console.error(e);
      }
    },
    setContractId(value: string | number) {
      this.contractInfo.contractId = value;
    },
    getContractId() {
      return this.contractInfo.contractId;
    },
    setContractInfo(value: ContractInfo) {
      if (value.onlyShowDetail == null) {
        value.onlyShowDetail = false;
      }
      this.contractInfo = value;
    },
    clearContractInfo() {
      this.contractInfo = {
        contractType: 0,
        handleType: 0,
        contractId: '',
        businessStatus: 0,
        verifyStatus: 0
      };
    }
  }
});
