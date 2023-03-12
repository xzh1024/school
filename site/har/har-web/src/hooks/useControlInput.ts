import { computed, Ref } from 'vue';
import { isFunction } from '@/utils/is';
export default function useControlInput(
  sourceData: Ref<string>,
  regx: RegExp | Function
) {
  return computed<string>({
    get() {
      return sourceData.value || '';
    },
    set(val) {
      if (isFunction(regx)) {
        return regx(val);
      }
      const ma = val.match(regx);
      if (ma) {
        sourceData.value = ma[0];
      } else {
        sourceData.value = '';
      }
      // const ma = regx.test(val);
      // if (ma) {
      //   sourceData.value = val;
      // }else{
      //   sourceData.value = '';
      // }
    }
  });
}
