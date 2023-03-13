import { ref } from 'vue';
import { SelectOptions } from '@/components/i-select/interface';

export function useOptions<T>(defaultOptions?: T) {
  const optionsConfig = {
    // 项目名称
    projectId: [] as SelectOptions,
    // 商户
    merchantId: [] as SelectOptions,
    // 店铺
    storeId: [] as SelectOptions,
    // 品牌
    brandId: [] as SelectOptions,
    // 收银机
    cashierId: [] as SelectOptions,
    // 合同号
    contractCode: [] as SelectOptions,
    status: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 }
    ],
    identity: [
      { label: '法人', value: 0 },
      { label: '店长', value: 1 },
      { label: '收银员', value: 2 },
      { label: '导购', value: 3 }
    ],
    ...defaultOptions
  };

  type OptionsConfig = typeof optionsConfig & T;

  const options = ref<OptionsConfig>(optionsConfig as OptionsConfig);

  return {
    options
  };
}

export default useOptions;
