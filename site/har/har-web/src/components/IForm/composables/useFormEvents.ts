import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { get, set } from 'lodash';
import {
  type Ref,
  type UnwrapNestedRefs,
  type ComputedRef,
  unref,
  toRaw,
  nextTick
} from 'vue';
import { FormSchema } from '@/components/IForm/typings/form';

export type UseFormActionContext = {
  formElRef: Ref;
  emit: any;
  formModel: UnwrapNestedRefs<Recordable>;
  defaultValueRef: Ref<Recordable>;
  getSchema: ComputedRef<FormSchema[]>;
  handleFormValues: Fn;
};

export function useFormEvents({
  emit,
  formElRef,
  formModel,
  getSchema,
  defaultValueRef,
  handleFormValues
}: UseFormActionContext) {
  // 设置表单数据
  function setFieldsValue<T>(values: T) {
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean);
    for (const filed of fields) {
      const val = get(values, filed);
      set(formModel, filed, val);
    }
  }
  function getFieldsValue() {
    const el = unref(formElRef);
    if (!el) return {};
    return handleFormValues(toRaw(formModel));
  }
  // 校验表单数据
  function validate(field?: string | string[]): Promise<void> {
    const el = unref(formElRef);
    if (!el) return Promise.reject();
    return new Promise((resolve, reject) => {
      function callback(errors?: Recordable<ValidatedError>) {
        errors ? reject(errors) : resolve(undefined);
      }
      if (field) {
        el.validateField(field, callback);
      } else {
        el.validate(callback);
      }
    });
  }
  // 清除表单校验
  function clearValidate(field?: string | string[]) {
    return unref(formElRef)?.clearValidate(field);
  }
  // rest表单数据
  function resetFields() {
    const el = unref(formElRef);
    if (!el) return;
    setFieldsValue(defaultValueRef.value);
    nextTick(() => {
      clearValidate();
    });
    emit('reset', toRaw(formModel));
  }
  // 表单提交事件
  async function handleSubmit(e?: Event) {
    e && e.preventDefault();
    const el = unref(formElRef);
    if (!el) return;
    await validate();
    const res = handleFormValues(toRaw(formModel));
    emit('submit', res);
    return res;
  }
  return {
    validate,
    clearValidate,
    handleSubmit,
    resetFields,
    setFieldsValue,
    getFieldsValue
  } as const;
}
