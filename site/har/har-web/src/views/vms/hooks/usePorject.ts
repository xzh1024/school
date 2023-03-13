import {
  groundPcApiCommonProjectSelectListGet,
  GroundPcApiCommonProjectSelectListGetResponse
} from '@/api/ground-pc-api';
import { ref } from 'vue';

//导出获取项目下拉调用&&项目下拉值
export function useProjectOptions() {
  const projectOptions = ref<GroundPcApiCommonProjectSelectListGetResponse>();

  async function getProjectOptions() {
    try {
      projectOptions.value = await groundPcApiCommonProjectSelectListGet({});
    } catch (e) {
      console.error(e);
    }
  }
  return { getProjectOptions, projectOptions };
}
