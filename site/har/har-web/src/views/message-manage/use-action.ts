import { modalConfirm } from '@/utils';
import {
  cbdApiProjectMessageManageDeleteDelete,
  CbdApiProjectMessageManageInfoIdGetResponse,
  cbdApiProjectMessageManageSwitchStatusPut
} from '@/api';
import { Message } from '@arco-design/web-vue';

export default function useActions() {
  function editAction() {}
  editAction.show = function (
    record: CbdApiProjectMessageManageInfoIdGetResponse
  ) {
    // 不能进行任何操作的状态
    if (
      // 已下架
      record.status === 4 ||
      // 已发布
      record.status === 2
    ) {
      return false;
    }
    return (
      // 草稿
      record.status === 0 ||
      // 待发布
      record.status === 1 ||
      // 已发布
      record.status === 2 ||
      // 已撤回
      record.status === 3
    );
  };

  function deleteAction(
    params: number | Array<number>,
    config?: UseActionsConfig
  ) {
    modalConfirm('删除后数据不能恢复，是否删除？', async () => {
      const id = params;
      try {
        await cbdApiProjectMessageManageDeleteDelete({
          ids: Array.isArray(id) ? id : [id]
        });
        Message.success('删除成功');
        config?.completeCallback?.();
      } finally {
        config?.finallyCallback?.();
      }
    });
  }
  deleteAction.show = function (
    record: CbdApiProjectMessageManageInfoIdGetResponse
  ) {
    // 不能进行任何操作的状态
    if (
      // 已下架
      record.status === 4 ||
      // 已撤回
      record.status === 3 ||
      // 已发布
      record.status === 2
    ) {
      return false;
    }
    return (
      // 草稿
      record.status === 0 ||
      // 待发布
      record.status === 1
    );
  };

  function switchStatusAction(
    params: { id: number | Array<number>; operateStatus: 1 | 2 | 3 },
    config?: UseActionsConfig & {
      textMap?: Recordable;
    }
  ) {
    const textMap = {
      1: config?.textMap?.[1]
        ? config?.textMap?.[1]
        : '发布后，商户可在移动端进行查看，是否发布？',
      2: config?.textMap?.[2]
        ? config?.textMap?.[2]
        : '撤回后，消息无法再查看，是否发布？',
      3: config?.textMap?.[3]
        ? config?.textMap?.[3]
        : '下架后，消息无法再查看，是否发布？'
    };
    modalConfirm(textMap[params.operateStatus], async () => {
      const id = params.id;
      try {
        await cbdApiProjectMessageManageSwitchStatusPut({
          ids: Array.isArray(id) ? id : [id],
          operateStatus: params.operateStatus
        });
        Message.success('操作成功');
        config?.completeCallback?.();
      } finally {
        config?.finallyCallback?.();
      }
    });
  }
  switchStatusAction.show = function (
    record: CbdApiProjectMessageManageInfoIdGetResponse,
    operateStatus: 1 | 2 | 3
  ) {
    // 不能进行任何操作的状态
    if (
      // 已下架
      record.status === 4
    ) {
      return false;
    }
    switch (operateStatus) {
      // 发布操作
      case 1:
        // 不能进行任何操作的状态
        if (
          // 草稿
          record.status === 0
        ) {
          return false;
        }
        return (
          // 待发布
          record.status === 1 ||
          // 已撤回
          record.status === 3
        );
      // 撤回操作
      case 2:
        // 不能进行任何操作的状态
        if (
          // 待发布
          record.status === 1
        ) {
          return false;
        }
        return (
          // 已发布
          record.status === 2
        );
      // 下架操作
      case 3:
        // 不能进行任何操作的状态
        if (
          // 待发布
          record.status === 1
        ) {
          return false;
        }
        return (
          // 已发布
          record.status === 2
        );
      default:
        return false;
    }
  };

  return {
    editAction,
    deleteAction,
    switchStatusAction
  };
}
