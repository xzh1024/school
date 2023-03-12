import { ref } from 'vue';
import type { Ref } from 'vue';
export default function useState<T>(defaultValue?: T) {
  const state = ref(defaultValue) as Ref<T>;
  function setState(newValue: T) {
    state.value = newValue;
  }
  return [state, setState] as const;
}
