import { ref } from 'vue';
import { IMergeFormData } from '@/components/i-floor-table/types';

export class MergeFormData implements IMergeFormData {
  estateId = undefined;
  name = '';
  acreage = 0;
  useAcreage = 0;
  date = '';
  code = undefined;
  estateIds = [];
  assetsStatus = undefined;
  changeApplyStatus = undefined;
  editStatus = false;
}

export function useMergeCell() {
  const mergeVisible = ref(false);
  const mergeName = ref('');
  const mergeFormData = ref<IMergeFormData>(new MergeFormData());

  const handleMergeOk = () => {
    mergeVisible.value = false;
  };

  const handleMergeCancel = () => {
    mergeFormData.value = new MergeFormData();
    mergeVisible.value = false;
  };

  return {
    mergeVisible,
    mergeName,
    mergeFormData,

    handleMergeOk,
    handleMergeCancel
  };
}
