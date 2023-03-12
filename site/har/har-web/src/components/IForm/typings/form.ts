import { ModalProps } from '@/components/IModal';
import { SpaceProps } from '@/types/arco';
import type {
  ButtonProps,
  ColProps,
  FieldRule,
  RowProps
} from '@arco-design/web-vue';
import type { CSSProperties, defineComponent, Slots, VNode } from 'vue';
import { ComponentType } from '@/components/IForm/typings';
export type Component = ReturnType<typeof defineComponent>;
export type ActionButtonOptions = ButtonProps & {
  iconRender?: Component | (() => Component);
  iconType?: string;
  text?: string;
};

export type RenderCallbackParams = {
  schema: FormSchema;
  formModel: Recordable;
  field: string;
};
export type FormSchema = {
  field: string;
  label: string;
  labelTip?: string;
  component?: ComponentType;
  // 内部变化触发事件，默认 change
  // changeEvent?: string;
  // 默认值
  defaultValue?: any;
  // 绑定value的key
  valueField?: string;
  // 动态禁用
  dynamicDisabled?:
    | boolean
    | ((renderCallbackParams: RenderCallbackParams) => boolean);
  rules?: FieldRule<any> | FieldRule<any>[];
  componentProps?: object;
  colProps?: ColProps;
  // 自定义插槽名
  slot?: string;
  render?: (
    renderCallbackParams: RenderCallbackParams
  ) => VNode | VNode[] | string;
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  vSlots?: Slots;
};

export type FieldMapToTime = Recordable<[string, string, string?]>;

export type FormActionSubmitProps = {
  // 显示确认按钮
  showSubmitButton?: boolean;
  // 确认按钮配置
  submitButtonOptions?: ActionButtonOptions;
};
export type FormActionResetProps = {
  // 显示重置按钮
  showResetButton?: boolean;
  // 重置按钮配置
  resetButtonOptions?: ActionButtonOptions;
};
export type FormActionCancelProps = {
  // 显示取消按钮
  showCancelButton?: boolean;
  // 取消按钮配置
  cancelButtonOptions?: ActionButtonOptions;
};
export type FormActionLayoutProps = {
  // 操作列Col配置
  actionColOptions?: ColProps;
  // 操作列space配置
  actionSpaceOptions?: SpaceProps & { style?: CSSProperties };
};
export type FormActionProps = FormActionLayoutProps &
  FormActionSubmitProps &
  FormActionResetProps & {
    // 是否显示操作按钮
    showActionButtonGroup?: boolean;
  };
export type FormProps = {
  // 表单loading状态
  loading?: boolean;
  // 日期区间字段转换数组 {[field]: [startTimeKey, endTimeKey, format?];
  fieldMapToTime?: FieldMapToTime;
  schemas?: FormSchema[];
  rowProps?: RowProps;
  colProps?: ColProps;
  disabled?: boolean;
  rules?: Recordable<FieldRule | FieldRule[]>;
};
export type BasicFormProps = FormProps & FormActionProps;
export type ModalFormProps = ModalProps &
  FormProps &
  FormActionSubmitProps &
  FormActionCancelProps;
export type FormActionType<T = BasicFormProps> = {
  getFieldsValue: () => Recordable;
  setFieldsValue: <T>(values: T) => void;
  resetFields: () => void;
  setProps: (formProps: Partial<T>) => void;
  clearValidate: (field?: string | string[]) => void;
  validate: (field: string | string[]) => Promise<void>;
  submit: () => Promise<void>;
  initDefault: () => void;
};

export type ModalFormActionType<T = ModalFormProps> = FormActionType<T> & {
  show: () => void;
  hide: () => void;
};
export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType<T = BasicFormProps> = [
  RegisterFn,
  FormActionType<T>
];
