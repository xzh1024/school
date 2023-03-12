import { cbdApiProjectCommonGetDictDataCodeGet } from '@/api';
import { ref } from 'vue';

interface dicItem {
  id: number;
  dataCode: string;
  dataName: string;
  remark: string;
  sort: number;
}

export default function useDataDictionary(code: string): Array<any> {
  const dic = ref<Array<any>>([]);
  cbdApiProjectCommonGetDictDataCodeGet(
    { code },
    { cache: true, cacheKey: code }
  ).then((res: any) => {
    res.forEach((item: dicItem) => {
      dic.value.push({
        value: item.id,
        label: item.dataName,
        code: item.dataCode
      });
    });
  });
  return dic.value;
}
