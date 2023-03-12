import { isArray } from '@/utils/is';
import { mergeWith } from 'lodash';
import { ref, computed, unref, type Ref } from 'vue';

export function useMergeData<T = Recordable>(defaultValue: Ref<T> | T) {
  const state = ref({});
  function setState(newVal: Partial<T>) {
    mergeWith(state.value, newVal, (old, src) => {
      if (isArray(old)) {
        return src;
      }
    });
  }
  const computedSatate = computed(() => ({
    ...unref(defaultValue),
    ...state.value
  }));
  return [computedSatate, setState] as const;
}
