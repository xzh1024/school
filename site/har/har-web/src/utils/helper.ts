import { isFunction } from '@/utils/is';
import type { Slots } from 'vue';

export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  const slotFn = slots[slot];
  if (!isFunction(slotFn) || !slotFn) {
    return null;
  }
  return slotFn(data);
}
