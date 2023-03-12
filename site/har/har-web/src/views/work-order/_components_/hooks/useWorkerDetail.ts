import { ref } from 'vue';
import { cbdApiProjectEstateWorkOrderTemplateInfoIdGet } from '@/api';
import type { CbdApiProjectEstateWorkOrderTemplateInfoIdGetResponse } from '@/api';

export function useWorkerDetails() {
  const workerInfo = ref<CbdApiProjectEstateWorkOrderTemplateInfoIdGetResponse>(
    {
      id: 0,
      projectId: 0,
      type: 1,
      name: '',
      remark: '',
      merchantCreateState: 1,
      sponsorUserId: 1,
      applyScope: 1,
      closeRule: 1,
      bpmnXml: ''
    }
  );
  async function getWorkerDetails(id: string) {
    const d = await cbdApiProjectEstateWorkOrderTemplateInfoIdGet({ id });
    workerInfo.value = d;
  }

  function formReset() {
    workerInfo.value = {
      id: 0,
      projectId: 0,
      type: 1,
      name: '',
      remark: '',
      merchantCreateState: 1,
      sponsorUserId: 1,
      applyScope: 1,
      closeRule: 1,
      bpmnXml: ''
    };
  }

  return {
    workerInfo,
    getWorkerDetails,
    formReset
  };
}
