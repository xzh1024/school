import {
  type InjectionKey,
  reactive,
  readonly as defineReadonly,
  provide,
  inject,
  type UnwrapRef
} from 'vue';
export type CreateContextOptions = {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
};
export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = true, native = false } = options;
  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  if (createProvider) {
    provide(key, native ? context : provideData);
  }
  return state;
}
type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

export function useContext<T>(
  key: InjectionKey<T>,
  defaultValue?: any
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}
