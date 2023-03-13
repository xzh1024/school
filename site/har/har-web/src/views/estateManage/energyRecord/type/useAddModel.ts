import { ref } from 'vue';
type recordType = {
  id: string;
};
export type EditForm = {
  id?: number;
  projectId?: string;
  buildingId?: string;
  floorId?: string;
  deviceType?: string | number;
  deviceCode?: string;
  lastDate?: string;
  lastReadNum?: number | string;
  lastUnitPrice?: number;
  currentDate?: string | Date;
  currentReadNum?: number | undefined;
  unitPrice?: number;
};
export function useAddModel() {
  const modelVisible = ref(false);
  const modelSource = ref('add');
  const modelTitle = ref('添加能耗录入');
  const rowId = ref('');
  // 编辑
  function handleEdit(record: recordType) {
    rowId.value = String(record.id);
    modelSource.value = 'edit';
    modelTitle.value = '修改能耗录入'
    modelVisible.value = true;
  }
  // 新增
  function handleAdd() {
    modelSource.value = 'add';
    modelTitle.value = '添加能耗录入'
    modelVisible.value = true;
    rowId.value = '';
  }

  return {
    modelVisible,
    modelSource,
    modelTitle,
    rowId,

    handleEdit,
    handleAdd
  };
}
