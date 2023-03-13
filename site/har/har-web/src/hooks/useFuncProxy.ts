import { Ref, ref } from 'vue';

type resType = [
  getData: (record?: any) => void,
  loading: Ref<boolean>,
  status: Ref<string>
];

export default function useFuncProxy(
  func: (val?: any) => any,
  errFunc?: () => void
): resType {
  const loading = ref(false);
  const status = ref('');
  async function getData<T>(p?: T) {
    loading.value = true;
    status.value = 'loading';
    try {
      await func(p);
      loading.value = false;
      status.value = 'success';
    } catch (e) {
      loading.value = false;
      status.value = 'error';
      errFunc?.();
      console.error(e);
    }
  }
  // if(auto) getData()
  return [getData, loading, status];
}
