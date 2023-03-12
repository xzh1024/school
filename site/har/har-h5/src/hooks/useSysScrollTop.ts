import { useGlobalState } from "@har/use";
import { reactive } from "vue";

export const useSysScrollTop = useGlobalState(() => {
  const sysScrollTop = reactive<Record<string, number>>({});
  function onScrollTop(id: string, top: number) {
    sysScrollTop[id] = top;
    uni.$emit("_scrollTop_" + id, top);
  }
  function offScrollTop(id: string) {
    delete sysScrollTop[id];
  }
  return {
    sysScrollTop,
    onScrollTop,
    offScrollTop
  };
});
