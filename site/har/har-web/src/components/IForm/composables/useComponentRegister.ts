import { tryOnMounted } from '@har/use';
import type { Component } from 'vue';
import { add, del } from '../componentMap';
export function useComponentRegister(compName: string, comp: Component) {
  add(compName, comp);
  tryOnMounted(() => {
    del(compName);
  });
}
