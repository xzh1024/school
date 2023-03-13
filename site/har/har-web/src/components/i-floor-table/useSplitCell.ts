import { ref } from 'vue';
import { ISplitFormData } from '@/components/i-floor-table/types';

export class SplitFormData implements ISplitFormData {
  name = '';
  acreage = 0;
  splitNumber = 2;
  doorPlate = '';
  splitList = [];
  date = '';
  assetsStatus = undefined;
  changeApplyStatus = undefined;
  editStatus = false;
}
export function useSplitCell() {
  const visible = ref(false);

  const handleOk = () => {
    visible.value = false;
  };

  const splitData = ref<ISplitFormData>(new SplitFormData());

  const handleCancel = () => {
    splitData.value = new SplitFormData();
    visible.value = false;
  };

  function initSplitData(name: string, area: number) {
    const arr = [];
    for (let index = 0; index < splitData.value.splitNumber; index++) {
      arr.push({
        acreage: area / splitData.value.splitNumber,
        name: `${name}-${index + 1}`
      });
    }
    splitData.value.name = name;
    splitData.value.acreage = area;
    splitData.value.splitList = arr;
  }

  return {
    visible,
    splitData,
    initSplitData,

    handleOk,
    handleCancel
  };
}
