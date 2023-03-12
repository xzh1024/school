import type { Component } from './typings/form';
import {
  Input,
  RangePicker,
  InputPassword,
  InputNumber,
  Textarea,
  RadioGroup
} from '@arco-design/web-vue';
import ApiSelect from './components/ApiSelect.vue';
import ApiTreeSelect from './components/ApiTreeSelect.vue';
import ApiTree from './components/ApiTree.vue';
import type { ComponentType } from './typings';
import { FormSchema } from './typings/form';
type DefaultProps = Recordable | ((arg: FormSchema) => Recordable);
export const componentMap = new Map<
  ComponentType,
  {
    Comp: Component;
    defaultProps: DefaultProps;
  }
>();

export function add(
  compName: ComponentType,
  Comp: Component,
  defaultProps: DefaultProps = {}
) {
  componentMap.set(compName, { Comp, defaultProps });
}
export function del(compName: ComponentType) {
  componentMap.delete(compName);
}
add('input', Input);
add('textarea', Textarea, {
  showWordLimit: true
});
add('password', InputPassword);
add('number', InputNumber, {
  hideButton: true
});
add('select', ApiSelect, (schema) => {
  return {
    placeholder: `请选择${schema.label}`
  };
});
add('treeSelect', ApiTreeSelect, (schema) => {
  return {
    placeholder: `请选择${schema.label}`
  };
});
add('radioGroup', RadioGroup);
add('rangePicker', RangePicker);
add('tree', ApiTree, {
  immediate: true
});
