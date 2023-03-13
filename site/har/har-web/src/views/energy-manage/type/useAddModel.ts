import { ref } from 'vue';
type recordType = {
  id: string;
};
export function useAddModel() {
  const modelVisible = ref(false);
  const modelSource = ref('add');
  const rowId = ref('');

  // 查看
  function handleWatch(record: recordType) {
    rowId.value = String(record.id);
    modelSource.value = 'watch';
    modelVisible.value = true;
  }
  // 编辑
  function handleEdit(record: recordType) {
    rowId.value = String(record.id);
    modelSource.value = 'edit';
    modelVisible.value = true;
  }
  // 新增
  function handleAdd() {
    modelSource.value = 'add';
    modelVisible.value = true;
  }

  return {
    modelVisible,
    modelSource,
    rowId,

    handleEdit,
    handleAdd,
    handleWatch
  };
}
