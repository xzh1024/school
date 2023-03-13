import { ref } from 'vue';
type recordType = {
  id: string;
};
export function useAddModel() {
  const modelVisible = ref(false);
  const modelSource = ref('add');
  const modelTitle = ref('添加标签');
  const rowId = ref('');
  const row = ref({});

  // 查看
  function handleWatch(record: recordType) {
    rowId.value = String(record.id);
    modelSource.value = 'watch';
    modelVisible.value = true;
    row.value = record;
  }
  // 编辑
  function handleEdit(record: recordType) {
    rowId.value = String(record.id);
    modelSource.value = 'edit';
    modelTitle.value = '修改标签';
    modelVisible.value = true;
    row.value = record;
  }
  // 新增
  function handleAdd() {
    modelSource.value = 'add';
    modelTitle.value = '添加标签';
    modelVisible.value = true;
  }

  return {
    modelVisible,
    modelSource,
    modelTitle,
    rowId,
    row,
    handleEdit,
    handleAdd,
    handleWatch
  };
}

