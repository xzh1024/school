import { ref, UnwrapNestedRefs, watch } from 'vue';

import { SelectOptions } from '@/components/i-select/interface';
import {
  cbdApiProjectCommonProjectSelectListGet,
  cbdApiProjectCommonStoreSelectGet,
  cbdApiProjectCommonStoreSelectPageGet
} from '@/api';

export function useOptions<T>(defaultOptions?: T) {
  const optionsConfig = {
    // 项目名称
    projectId: [] as SelectOptions,
    // 店铺数据
    storeId: [] as SelectOptions,
    // 状态
    status: [
      { label: '草稿', value: 0 },
      { label: '待发布', value: 1 },
      { label: '已发布', value: 2 },
      { label: '已撤回', value: 3 },
      { label: '已下架;', value: 4 }
    ],
    // 接收对象
    targetType: [
      { label: '指定', value: 0 },
      { label: '全部', value: 1 }
    ],
    // 是否顶置
    onTop: [
      { label: '否', value: 0 },
      { label: '是', value: 1 }
    ],
    // 重要程度
    messageLevel: [
      { label: '普通', value: 0 },
      { label: '重要', value: 1 },
      { label: '紧急', value: 2 }
    ],
    // 消息类型
    category: [
      { label: '公告', value: 1 },
      { label: '通知', value: 2 },
      { label: '内部通知', value: 3 }
    ],
    ...defaultOptions
  };

  type OptionsConfig = typeof optionsConfig & T;

  const options = ref<OptionsConfig>(optionsConfig as OptionsConfig);

  // 获取项目名称
  cbdApiProjectCommonProjectSelectListGet({}).then((res) => {
    options.value.projectId = res as SelectOptions;
  });

  // 获取店铺数据
  cbdApiProjectCommonStoreSelectGet({}).then((res) => {
    options.value.storeId = res as SelectOptions;
  });
  return {
    options
  };
}

export default useOptions;
