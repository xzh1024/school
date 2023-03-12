import { ref } from 'vue';

export default function useFuncProxy(func: () => void, auto = true) {
  const loading = ref(false);
  async function getData() {
    loading.value = true;
    try {
      await func();
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
  if (auto) getData();
  return [getData, loading];
}
