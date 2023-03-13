import { modalConfirm } from '@/utils';
import {
  cbdApiProjectContractClearBillDeleteDelete,
  cbdApiProjectContractClearBillBatchConfirmPost,
  CbdApiProjectContractClearBillInfoIdGetResponse
} from '@/api';

export default function useActions() {
  // 作废
  function repealAction() {}
  repealAction.show = function (
    record: CbdApiProjectContractClearBillInfoIdGetResponse
  ) {
    return (
      // 已确认+已通过
      record.businessStatus === 3 && record.verifyStatus === 5
    );
  };

  // 撤销
  function revokeAction() {}
  revokeAction.show = function (
    record: CbdApiProjectContractClearBillInfoIdGetResponse
  ) {
    return (
      // 待确定+审批中
      record.businessStatus === 2 && record.verifyStatus === 2
    );
  };

  // 删除
  async function deleteAction(
    params: number | Array<number>,
    config?: UseActionsConfig
  ) {
    await modalConfirm('删除后数据不能恢复，是否删除？');
    try {
      const ids = Array.isArray(params) ? params : [params];
      await cbdApiProjectContractClearBillDeleteDelete({ ids });
      config?.completeCallback?.();
    } finally {
      config?.finallyCallback?.();
    }
  }
  deleteAction.show = (
    record: CbdApiProjectContractClearBillInfoIdGetResponse
  ) => {
    return (
      // 已确认+未提交
      (record.businessStatus === 1 && record.verifyStatus === 1) ||
      // 待确定+未提交
      (record.businessStatus === 2 && record.verifyStatus === 1) ||
      // 待确定+已驳回
      (record.businessStatus === 2 && record.verifyStatus === 3) ||
      // 待确定+已撤销
      (record.businessStatus === 2 && record.verifyStatus === 3)
    );
  };

  // 修改
  function editAction() {}
  editAction.show = function (
    record: CbdApiProjectContractClearBillInfoIdGetResponse
  ) {
    return (
      // 已确认+未提交
      (record.businessStatus === 1 && record.verifyStatus === 1) ||
      // 待确定+未提交
      (record.businessStatus === 2 && record.verifyStatus === 1) ||
      // 待确定+已驳回
      (record.businessStatus === 2 && record.verifyStatus === 3) ||
      // 待确定+已撤销
      (record.businessStatus === 2 && record.verifyStatus === 3)
    );
  };

  // 确认
  async function confirmAction(params: number | Array<number>) {
    await modalConfirm('数据确认后无法删除，是否提交审批？', async () => {});
    await cbdApiProjectContractClearBillBatchConfirmPost({
      ids: Array.isArray(params) ? params : [params]
    });
  }
  confirmAction.show = (
    record: CbdApiProjectContractClearBillInfoIdGetResponse
  ) => {
    if (!record) {
      return false;
    }

    // // 应收费用
    // if (Array.isArray(record.receivableFeeList)) {
    //   for (const itm of record.receivableFeeList) {
    //     if ((itm as Recordable).arrearsAmount > 0) {
    //       return false;
    //     }
    //   }
    // }

    // // 销售返款
    // if (Array.isArray(record.backFeeList)) {
    //   for (const itm of record.backFeeList) {
    //     if ((itm as Recordable).arrearsAmount > 0) {
    //       return false;
    //     }
    //   }
    // }

    // // 销售返款
    // if (Array.isArray(record.depositFeeList)) {
    //   for (const itm of record.depositFeeList) {
    //     if ((itm as Recordable).arrearsAmount > 0) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }
    // }

    return (
      // 待确定+未提交
      (record.businessStatus === 2 && record.verifyStatus === 1) ||
      // 待确定+已驳回
      (record.businessStatus === 2 && record.verifyStatus === 3) ||
      // 待确定+已撤销
      (record.businessStatus === 2 && record.verifyStatus === 3) ||
      record.isConfirm
    );
  };

  return {
    repealAction,
    revokeAction,
    editAction,
    deleteAction,
    confirmAction
  };
}
