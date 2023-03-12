import { isArray, isFunction, isNullOrUndef, isObject } from '@/utils/is';
import { type Ref, unref } from 'vue';
import type { ComputedRef } from 'vue';
import { cloneDeep, set } from 'lodash';
import type { BasicFormProps, FormSchema } from '../typings/form';
import dayjs from 'dayjs';
type UseFormValuesContext = {
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  defaultValueRef: Ref<Recordable>;
  getProps: ComputedRef<BasicFormProps>;
};

/**
 * @description deconstruct array-link key. This method will mutate the target.
 */
function tryDeconstructArray(key: string, value: any, target: Recordable) {
  const pattern = /^\[(.+)]$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = Array.isArray(value) ? value : [value];
      keys.forEach((k, index) => {
        set(target, k.trim(), value[index]);
      });
      return true;
    }
  }
}

/**
 * @description deconstruct object-link key. This method will mutate the target.
 */
function tryDeconstructObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)}$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = isObject(value) ? value : {};
      keys.forEach((k) => {
        set(target, k.trim(), value[k.trim()]);
      });
      return true;
    }
  }
}

export function useFormValues({
  getSchema,
  formModel,
  getProps,
  defaultValueRef
}: UseFormValuesContext) {
  function handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = getProps.value.fieldMapToTime;
    if (!fieldMapToTime || !isObject(fieldMapToTime)) {
      return values;
    }
    for (const [field, value] of Object.entries(fieldMapToTime)) {
      const [startTimeKey, endTimeKey, format = 'YYYY-MM-DD'] = value;
      if (!field || !startTimeKey || !endTimeKey || !values[field]) {
        continue;
      }
      const [startTime, endTime] = values[field];
      values[startTimeKey] = dayjs(startTime).format(format);
      values[endTimeKey] = dayjs(endTime).format(format);
      Reflect.deleteProperty(values, field);
    }
    return values;
  }
  function handleFormValues(values: Recordable) {
    if (!isObject) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      const [key, value] = item;
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }
      if (
        !tryDeconstructArray(key, value, res) &&
        !tryDeconstructObject(key, value, res)
      ) {
        set(res, key, value);
      }
    }
    return handleRangeTimeValue(res);
  }
  function initDefault() {
    const obj: Recordable = {};
    const schemas = unref(getSchema);
    schemas.forEach((item) => {
      const { defaultValue, field } = item;
      if (!isNullOrUndef(defaultValue)) {
        set(obj, field, defaultValue);
        if (formModel[field] === undefined) {
          set(formModel, field, defaultValue);
          // formModel[field] = defaultValue;
        }
      }
    });
    defaultValueRef.value = cloneDeep(obj);
  }
  return {
    handleFormValues,
    initDefault
  };
}
