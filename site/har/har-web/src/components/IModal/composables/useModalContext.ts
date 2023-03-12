import { createContext, useContext } from '@/composables/use-context';
import type { ComputedRef, InjectionKey } from 'vue';
export type ModalContextProps = {
  loading: ComputedRef<boolean>;
  okAction: () => void;
  cancelAction: () => void;
};
const key: InjectionKey<ModalContextProps> = Symbol();

export function createModalContext(context: ModalContextProps) {
  return createContext<ModalContextProps>(context, key, {
    native: true
  });
}

export function useModalContext() {
  return useContext<ModalContextProps>(key, true);
}
