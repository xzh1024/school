import { Ref, watch, UnwrapNestedRefs } from 'vue';
import {
  cbdApiProjectCommonContractStoreSelectGet,
  cbdApiProjectCommonMerchantBrandListGet,
  cbdApiProjectCommonMerchantListGet,
  cbdApiProjectCommonMisContractSelectGet,
  cbdApiProjectCommonProjectSelectListGet, cbdApiProjectCommonStoreSelectAllGet
} from '@/api';
import { SelectOptions } from '@/components/i-select/interface';
import { resetOptionsData } from '@/utils';

type Reactive<T> = UnwrapNestedRefs<T>;

export default function useFetchContractDict(
  formModel: Ref<Recordable>,
  options: Ref<Recordable>,
  config = {
    allowEmptyQuery: true
  }
) {
  // 获取项目数据
  function fetchProjectData() {
    // 获取项目名称
    cbdApiProjectCommonProjectSelectListGet({}).then((res) => {
      const data = res as SelectOptions;
      options.value.projectId = data;
      resetOptionsData(formModel, data, 'projectId', 'value');
    });
  }

  // 获取商户数据
  function fetchMerchantData() {
    const projectId = formModel.value.projectId as unknown as string;

    if (!config.allowEmptyQuery) {
      // 如果没有选择项目直接重置数据
      if (!projectId) {
        formModel.value.merchantId = '';
        options.value.merchantId = [];
        return;
      }
    }
    cbdApiProjectCommonMerchantListGet({
      projectId
    }).then((res) => {
      const data = res as SelectOptions;
      options.value.merchantId = data;
      resetOptionsData(formModel, data, 'merchantId', 'value');
    });
  }

  // 获取店铺数据
  function fetchStoreData() {
    const projectId = formModel.value.projectId as unknown as string;
    const merchantId = formModel.value.merchantId as unknown as string;

    if (!config.allowEmptyQuery) {
      // 如果没有选择项目直接重置数据
      if (!projectId || !merchantId) {
        formModel.value.storeId = '';
        options.value.storeId = [];
        return;
      }
    }

    cbdApiProjectCommonStoreSelectAllGet({
      projectId,
      merchantId
    }).then((res) => {
      const data = res as SelectOptions;
      options.value.storeId = data;
      resetOptionsData(formModel, data, 'storeId', 'value');
    });
  }

  // 获取合同号数据
  function fetchContractCodeData() {
    const projectId = formModel.value.projectId as unknown as string;
    const merchantId = formModel.value.merchantId as unknown as string;
    const storeId = formModel.value.storeId as unknown as string;

    if (!config.allowEmptyQuery) {
      // 如果没有数据直接重置数据
      if (!projectId || !merchantId || !storeId) {
        formModel.value.contractCode = '';
        options.value.contractCode = [];
        return;
      }
    }

    cbdApiProjectCommonMisContractSelectGet({
      projectId,
      merchantId,
      storeId,
      businessStatus: '6'
    }).then((res) => {
      const data = res.map((itm) => ({
        ...itm,
        label: itm.code,
        value: itm.id
      })) as SelectOptions;
      options.value.contractCode = data;
      resetOptionsData(formModel, data, 'contractCode', 'id');
    });
  }

  // 获取品牌数据
  function fetchBrandData() {
    const projectId = formModel.value.projectId as unknown as string;
    const storeId = formModel.value.storeId as unknown as string;

    if (!config.allowEmptyQuery) {
      if (!projectId) {
        formModel.value.brandId = '';
        options.value.brandId = [];
        return;
      }
    }

    // 查询品牌下拉数据
    cbdApiProjectCommonMerchantBrandListGet({
      projectId,
      storeId
    }).then((res) => {
      const data = res as SelectOptions;
      options.value.brandId = data;
      resetOptionsData(formModel, data, 'brandId', 'value');
    });
  }

  function processTableOptions(
    tableConfig: Reactive<Recordable>,
    keys: string[]
  ) {
    // options数据变化作用到查询项中
    keys.forEach((key) => {
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

  return {
    fetchProjectData,
    fetchMerchantData,
    fetchStoreData,
    fetchContractCodeData,
    fetchBrandData,

    processTableOptions
  };
}
