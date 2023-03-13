import {
  groundPcApiCommonStoreSelectGet,
  GroundPcApiCommonStoreSelectGetResponse
} from '@/api/ground-pc-api';
import { ref } from 'vue';

//导出获取店铺下拉调用&&店铺下拉值
export function useStoreOptions() {
  const storeOptions = ref<GroundPcApiCommonStoreSelectGetResponse>();

  async function getStoreOptions(params: Object) {
    try {
      storeOptions.value = await groundPcApiCommonStoreSelectGet(params);
    } catch (e) {
      console.error(e);
    }
  }
  return { getStoreOptions, storeOptions };
}
