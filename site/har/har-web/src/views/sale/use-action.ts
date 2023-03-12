import { Message } from '@arco-design/web-vue';
import { modalConfirm } from '@/utils';
import {
  cbdApiProjectSaleDeleteGet,
  cbdApiProjectSaleConfirmPost,
  CbdApiProjectSaleConfirmPostRequest,
  CbdApiProjectSaleInfoGetResponse
} from '@/api';

export default function useActions() {
  // 作废操作
  function cancelAction() {}
  cancelAction.show = function (record: CbdApiProjectSaleInfoGetResponse) {
    // 已确认 + 已通过
    return record.businessStatus === 3 && record.verifyStatus === 5;
  };

  // 撤销操作
  function revokeAction() {}
  revokeAction.show = function (record: CbdApiProjectSaleInfoGetResponse) {
    return (
      // 审批中
      record.verifyStatus === 2
    );
  };

  // 审批操作
  function approvalAction() {}
  approvalAction.show = function (record: CbdApiProjectSaleInfoGetResponse) {
    return (
      // 审批中
      record.verifyStatus === 2
    );
  };

  function editAction() {}
  editAction.show = function (record: CbdApiProjectSaleInfoGetResponse) {
    return (
      // 待确认 + 未提交
      (record.businessStatus === 2 && record.verifyStatus === 1) ||
      // 待确定 + 已驳回
      (record.businessStatus === 2 && record.verifyStatus === 3) ||
      // 待确定 + 已撤销
      (record.businessStatus === 2 && record.verifyStatus === 4)
    );
  };

  async function confirmAction(
    params: CbdApiProjectSaleConfirmPostRequest,
    config?: UseActionsConfig
  ) {
    await modalConfirm('数据确认后无法删除，是否提交审批？');
    await cbdApiProjectSaleConfirmPost(params);
    config?.completeCallback?.();
  }
  confirmAction.show = function (record: CbdApiProjectSaleInfoGetResponse) {
    return (
      // 待确认 + 未提交
      (record.businessStatus === 2 && record.verifyStatus === 1) ||
      // 待确定 + 已驳回
      (record.businessStatus === 2 && record.verifyStatus === 3) ||
      // 待确定 + 已撤销
      (record.businessStatus === 2 && record.verifyStatus === 4)
    );
  };

  async function deleteAction(
    params: number | Array<number>,
    config?: UseActionsConfig
  ) {
    await modalConfirm('删除后数据不能恢复，是否删除？');
    const id = params;
    const ids = Array.isArray(id) ? id : [id];
    await cbdApiProjectSaleDeleteGet({
      recordId: ids[0] as unknown as string
    });
    Message.success('删除成功');
    config?.completeCallback?.();
  }
  deleteAction.show = function (record: CbdApiProjectSaleInfoGetResponse) {
    return (
      // 待确认 + 未提交
      (record.businessStatus === 2 && record.verifyStatus === 1) ||
      // 待确定 + 已驳回
      (record.businessStatus === 2 && record.verifyStatus === 3) ||
      // 待确定 + 已撤销
      (record.businessStatus === 2 && record.verifyStatus === 4)
    );
  };

  return {
    cancelAction,
    revokeAction,
    approvalAction,
    editAction,
    deleteAction,
    confirmAction
  };
}
