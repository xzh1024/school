import { ref } from 'vue';
import useFuncProxy from '@/hooks/useFuncProxy';
import { flowableEngineCommonListCategoryGet } from '@/api/flowable-engine';

export function useProcessGroup() {
  const processGroupList = ref<{ label: string; value: string }[]>([]);
  const processGroupObj = ref<{ [key: string]: string }>({});
  const [getProcessGroupList] = useFuncProxy(async () => {
    processGroupList.value = [];
    processGroupObj.value = {};
    const d = await flowableEngineCommonListCategoryGet();
    d.forEach((item) => {
      processGroupList.value.push({
        label: item.name,
        value: item.code
      });

      processGroupObj.value[item.code] = item.name;
    });
    // processGroupList.value = d.map((item) => {
    //   return {
    //     label: item.name,
    //     value: item.code
    //   };
    // });
  });

  return {
    processGroupList,
    processGroupObj,
    getProcessGroupList
  };
}
