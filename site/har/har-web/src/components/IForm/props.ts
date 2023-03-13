import type { ColProps, FieldRule, RowProps } from '@arco-design/web-vue';
import { Service } from '@har/use';
import type { PropType, CSSProperties } from 'vue';
import { omit } from 'lodash';
import type {
  FieldMapToTime,
  FormSchema,
  BasicFormProps,
  ActionButtonOptions
} from './typings/form';
import { modalProps } from '../IModal/components/props';

export const basicFormActionProps = {
  showActionButtonGroup: {
    type: Boolean,
    default: true
  },
  actionSpan: {
    type: Number,
    default: 6
  },
  actionColOptions: Object as PropType<ColProps>,
  actionSpaceOptions: Object as PropType<{ style?: CSSProperties }>,
  showResetButton: {
    type: Boolean,
    default: true
  },
  resetButtonOptions: {
    type: Object as PropType<ActionButtonOptions>,
    default: () => ({})
  },
  showSubmitButton: {
    type: Boolean,
    default: true
  },
  submitButtonOptions: {
    type: Object as PropType<ActionButtonOptions>,
    default: () => ({})
  }
};
export const formProps = {
  loading: {
    type: Boolean,
    default: false
  },
  fieldMapToTime: {
    type: Object as PropType<FieldMapToTime>,
    default: () => ({})
  },
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  rowProps: {
    type: Object as PropType<RowProps>,
    default: () => ({})
  },
  colProps: {
    type: Object as PropType<ColProps>,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Object as PropType<Recordable<FieldRule | FieldRule[]>>
  }
};
export const basicFormProps = {
  ...formProps,
  ...basicFormActionProps
};

export const basicFormItemProps = {
  schema: {
    type: Object as PropType<FormSchema>,
    default: () => []
  },
  formProps: {
    type: Object as PropType<BasicFormProps>,
    default: () => ({})
  },
  formModel: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  },
  setFormModel: {
    type: Function as PropType<(key: string, value: any) => void>,
    default: null
  }
};

export const modalFormProps = {
  ...modalProps,
  ...formProps,
  ...omit(basicFormActionProps, [
    'actionColOptions',
    'actionSpaceOptions',
    'showResetButton',
    'resetButtonOptions'
  ]),
  showCancelButton: {
    type: Boolean,
    default: true
  },
  cancelButtonOptions: {
    type: Object as PropType<ActionButtonOptions>,
    default: () => ({})
  }
};
export const ApiProps = {
  // 请求方法
  request: Function as PropType<Service<any, any>>,
  // 请求返回解析数据路径
  path: String,
  // 请求参数
  params: {
    type: Object as PropType<Recordable | Recordable[]>,
    default: () => ({})
  },
  // 是否立即执行
  immediate: {
    type: Boolean,
    default: false
  }
};
