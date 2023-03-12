import { ref } from 'vue';
import { cbdApiProjectCommonProjectSelectListGet } from '@/api';
import { SelectOptions } from '@/components/i-select/interface';
import { BillInfoResp } from '@/views/contract-clear-bill/interface';

export function useOptions<T, F extends BillInfoResp>(defaultOptions?: T) {
  const optionsConfig = {
    // 项目名称
    projectId: [] as SelectOptions,
    // 商户
    merchantId: [] as SelectOptions,
    // 品牌
    brandId: [] as SelectOptions,
    // 店铺
    storeId: [] as SelectOptions,
    // 合同号
    contractCode: [] as SelectOptions,
    // 是否显示已作废数据
    cancel: [
      { label: '是', value: 1 },
      { label: '否', value: 0 }
    ],
    // 业务状态
    businessStatus: [
      { label: '草稿', value: 1 },
      { label: '待确认', value: 2 },
      { label: '已确认', value: 3 },
      { label: '已作废', value: 4 }
    ],
    // 审批状态
    verifyStatus: [
      { label: '未提交', value: 1 },
      { label: '审批中', value: 2 },
      { label: '已驳回', value: 3 },
      { label: '已撤销', value: 4 },
      { label: '已通过', value: 5 }
    ],
    ...defaultOptions
  };

  type OptionsConfig = typeof optionsConfig & T;

  const options = ref<OptionsConfig>(optionsConfig as OptionsConfig);

  // 获取项目名称
  cbdApiProjectCommonProjectSelectListGet({}).then((res) => {
    options.value.projectId = res as SelectOptions;
  });

  return {
    options
  };
}

export default useOptions;
