import { ref, Ref, UnwrapNestedRefs, watch } from 'vue';

import { SelectOptions } from '@/components/i-select/interface';
import {
  cbdApiProjectCommonMerchantBrandListGet,
  cbdApiProjectCommonMerchantListGet,
  cbdApiProjectCommonMisPayMethodFrontGet,
  cbdApiProjectCommonProjectSelectListGet,
  cbdApiProjectCommonStoreSelectGet,
  CbdApiProjectSaleAddPostRequest
} from '@/api';

export function useOptions<T, F extends CbdApiProjectSaleAddPostRequest>(
  defaultOptions: T,
  formModel: Ref<F>,
  init = true
) {
  const optionsConfig = {
    // 项目名称
    projectId: [] as SelectOptions,
    // 商户
    merchantId: [] as SelectOptions,
    // 店铺数据
    storeId: [] as SelectOptions,
    // 品牌
    brandId: [] as SelectOptions,
    // 合同号
    contractCode: [] as SelectOptions,
    // 支付方式
    payMethodId: [] as SelectOptions,
    // 数据来源(非必填，1：商场填报，2：商户填报，3：POS，4：线上销售,列表)
    sourceType: [
      { label: '商场填报', value: 1 },
      { label: '商户填报', value: 2 },
      { label: 'POS', value: 3 },
      { label: '线上销售', value: 4 }
    ],
    // 业务状态(1、草稿2、待确认3、已确认4、已作废5、已生成账单)
    businessStatus: [
      { label: '草稿', value: 1 },
      { label: '待确认', value: 2 },
      { label: '已确认', value: 3 },
      { label: '已作废', value: 4 },
      { label: '已生成账单', value: 5 }
    ],
    // 审批状态(1、未提交2、审批中3、已驳回4、已撤销5、已通过)
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

  // 项目
  cbdApiProjectCommonProjectSelectListGet({}).then((res) => {
    options.value.projectId = res as SelectOptions;
  });

  function handleChangeProjectId() {
    const projectId = formModel.value.projectId as unknown as string;
    // 支付方式-下拉数据
    cbdApiProjectCommonMisPayMethodFrontGet({
      projectId
    }).then((res) => {
      options.value.payMethodId = res;
    });

    // 获取商户数据
    fetchMerchantOptions();
    // 获取店铺数据
    fetchStoreOptions();
    // 获取品牌数据
    fetchBrandOptions();
  }

  function handleChangeMerchantId() {
    fetchStoreOptions();
    fetchBrandOptions();
  }

  function handleChangeStoreId() {
    fetchBrandOptions();
  }

  // 商户
  function fetchMerchantOptions() {
    cbdApiProjectCommonMerchantListGet({
      projectId: formModel.value.projectId as unknown as string
    }).then((res) => {
      const data = res as SelectOptions;
      options.value.merchantId = data;
      // 选项里面没有已选择的数据，直接重置数据
      if (!data.find((itm) => itm.value === formModel.value.merchantId)) {
        formModel.value.merchantId = '' as unknown as number;
      }
    });
  }
  // 店铺
  function fetchStoreOptions() {
    cbdApiProjectCommonStoreSelectGet({
      projectId: formModel.value.projectId as unknown as string,
      merchantId: formModel.value.merchantId as unknown as string
    }).then((res) => {
      const data = res as SelectOptions;
      options.value.storeId = data;
      // 选项里面没有已选择的数据，直接重置数据
      if (!data.find((itm) => itm.value === formModel.value.storeId)) {
        formModel.value.storeId = '' as unknown as number;
      }
    });
  }
  // 品牌
  function fetchBrandOptions() {
    if (!formModel.value.projectId && !formModel.value.storeId) {
      options.value.brandId = [];
      formModel.value.brandId = '' as unknown as number;
      return;
    }
    cbdApiProjectCommonMerchantBrandListGet({
      projectId: formModel.value.projectId as unknown as string,
      storeId: formModel.value.storeId as unknown as string
    }).then((res) => {
      console.log(res);
      options.value.brandId = res as SelectOptions;
    });
  }

  function optionsRelevancyTableColumns(
    tableConfig: UnwrapNestedRefs<Recordable>
  ) {
    const watchKeys: Array<keyof typeof options.value> = [
      'projectId',
      'storeId',
      'merchantId',
      'brandId'
    ];
    if (tableConfig) {
      watchKeys.forEach((key) => {
        watch(
          () => options.value[key],
          (val) => {
            const column = tableConfig.columns.find(
              (itm: Recordable) => itm.prop === key
            );
            if (column) {
              column.dic = val;
            }
          }
        );
      });
    }
  }

  if (init) {
    fetchMerchantOptions();
    fetchStoreOptions();
    fetchBrandOptions();
  }

  return {
    options,
    optionsRelevancyTableColumns,
    handleChangeProjectId,
    handleChangeMerchantId,
    handleChangeStoreId
  };
}

export default useOptions;
