import { ref } from 'vue';

export function useStorageProjectId() {
  const storageProjectId = ref(
    window.localStorage.getItem('use-storage-project-id') ?? ''
  );

  function setStorageProjectId(value: string | number = '') {
    if (!value) {
      return;
    }
    value = value == null ? '' : value;
    window.localStorage.setItem('use-storage-project-id', value as string);
    storageProjectId.value = (value ? Number(value) : '') as string;
  }

  return {
    storageProjectId,
    setStorageProjectId
  };
}
