import { ref } from 'vue';

export function useAdd() {
  // 新增 / 编辑 弹窗 control
  const visible = ref(false);
  const source = ref('add');
  const currentItem = ref<any>({});
  // 添加
  function handleAdd() {
    currentItem.value = {};
    source.value = 'add';
    visible.value = true;
  }
  // 查看
  function handleView(record: any) {
    source.value = 'view';
    visible.value = true;
  }
  // 编辑
  function handleEdit(record: any) {
    source.value = 'edit';
    currentItem.value = { ...record };
    visible.value = true;
  }

  return {
    visible,
    source,
    currentItem,

    handleAdd,
    handleView,
    handleEdit
  };
}
