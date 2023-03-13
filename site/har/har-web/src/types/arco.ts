import { SpaceInstance } from '@arco-design/web-vue/es/space';
import type {
  CheckboxGroup,
  ColProps,
  FieldRule,
  RadioGroup,
  Row,
  RowProps,
  ValidateStatus,
  ValidateTrigger
} from '@arco-design/web-vue';
import type Form from '@arco-design/web-vue/es/form/form';
import type { AllowedComponentProps, StyleValue, VNodeProps } from 'vue';
type PickChildProps<T> = {
  -readonly [K in keyof Omit<
    T,
    keyof VNodeProps | keyof AllowedComponentProps
  >]: T[K];
};
export type ArcoForm = PickChildProps<InstanceType<typeof Form>['$props']>;
export type ArcoFormItem = {
  field?: string;
  label?: string;
  showColon?: boolean;
  noStyle?: boolean;
  disabled?: boolean;
  help?: string;
  extra?: string;
  required?: boolean;
  rules?: FieldRule | FieldRule[];
  validateStatus?: ValidateStatus;
  validateTrigger?: ValidateTrigger;
  labelColProps?: ColProps;
  wrapperColProps?: ColProps;
  hideLabel?: boolean;
  hideAsterisk?: boolean;
  labelColStyle?: StyleValue;
  wrapperColStyle?: StyleValue;
  rowProps?: RowProps;
  rowClass?: string | Array<unknown> | object;
  contentClass?: string | Array<unknown> | object;
  contentFlex?: boolean;
  labelColFlex?: string | number;
  feedback?: boolean;
  labelComponent?: string;
  labelAttrs?: object;
};
export type ArcoCheckboxGroup = PickChildProps<
  InstanceType<typeof CheckboxGroup>['$props']
>;
export type ArcoRadioGroup = PickChildProps<
  InstanceType<typeof RadioGroup>['$props']
>;

export type ArcoRow = PickChildProps<InstanceType<typeof Row>['$props']>;

export type SpaceProps = PickChildProps<SpaceInstance['$props']>;
