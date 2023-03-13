import { cbdApiProjectDictGetDictDataIdGet } from '@/api';
import { ref, Ref } from 'vue';

interface DictData {
  dataName: string;
  dataCode: string;
  id: string;
}
interface dataType {
  label: string;
  code: string;
  value: string | number;
}

type targetType = Array<dataType>;
type resType = [resultArr: Ref<targetType>, enumObj: any];

export default function useDictData(params: string, type?: string): resType {
  const dictArr = ref<targetType>([]);
  const enumObj: any = ref({});
  cbdApiProjectDictGetDictDataIdGet(
    {
      id: params
    },
    { cache: true, cacheKey: params }
  ).then((response: any) => {
    response.forEach((item: DictData) => {
      dictArr.value.push({
        label: item.dataName,
        value: type === 'number' ? Number(item.id) : item.id,
        code: item.dataCode
      });
      enumObj.value[item.id] = item.dataName;
    });
  });

  return [dictArr, enumObj];
}
