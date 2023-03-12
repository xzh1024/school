import { createContext, useContext } from '@/composables/use-context';
import type { ComputedRef, InjectionKey } from 'vue';
export type FormContextProps = {
  loading: ComputedRef<boolean>;
  submitAction: () => Promise<void>;
  resetAction: () => void;
};
const key: InjectionKey<FormContextProps> = Symbol();

export function createFormContext(context: FormContextProps) {
  return createContext<FormContextProps>(context, key, {
    native: true
  });
}

export function useFormContext() {
  return useContext<FormContextProps>(key, true);
}
