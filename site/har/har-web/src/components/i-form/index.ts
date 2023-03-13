import type {
  ArcoForm,
  ArcoFormItem,
  ArcoCheckboxGroup,
  ArcoRadioGroup,
  ArcoRow
} from '@/types/arco';
import type { CascaderOption, SelectOptionData } from '@arco-design/web-vue';
export type FormItemDicOption =
  | SelectOptionData
  | CascaderOption
  | Required<ArcoCheckboxGroup>['options']
  | Required<ArcoRadioGroup>['options'];

type GroupTitle = {
  type: 'groupTitle';
  prop?: string;
};
type OtherFormItem = {
  prop: string; // 表单元素在数据对象中的path（数据项必填）
  type?:
    | 'groupTitle'
    | 'inputNumber'
    | 'select'
    | 'treeSelect'
    | 'cascader'
    | 'textarea'
    | 'date'
    | 'month'
    | 'year'
    | 'quarter'
    | 'week'
    | 'dateRange'
    | 'timeRange'
    | 'upload'
    | 'radio'
    | 'checkbox'
    | 'customUpload'
    | 'singleMonth'
    | 'switch'
    | 'autocomplete'
    | 'span';
  dic?: FormItemDicOption[]; // 数据字典
  dicRequest?: () => Promise<unknown>; // 异步请求数据字典
  dicResKey?: string; // 异步字典解析path
  props?: unknown;
  allowSearch?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  valueFormat?: unknown | Function;
  formatter?: Function;
  disabledDate?: boolean;
  hideTitle?: boolean;
  options?: any; // 组件其他参数扩展
  innerWidth?: string; // 调整宽度
  on?: any; // 组件事件扩展
  limit?: number;
};
export type FormItemOption = ArcoFormItem & {
  span?: number; // 栅格占位格数
  hideTitle?: boolean;
  display?: boolean; // 是否打开
  searchSort?: number;
} & (GroupTitle | OtherFormItem);
export type FormOptions = Omit<ArcoForm, 'model'> & {
  /**
   * 表单间距
   * */
  gutter?: ArcoRow['gutter'];
  span?: number;
  /**
   * 菜单按钮对齐方式
   * */
  menuAlignRight?: boolean;
  menuColClass?: string;
  columns?: FormItemOption[]; // item
  /**
   * 表单是否为卡片
   * */
  formCard?: boolean;
  /**
   * 表单按钮组是否显示
   * */
  menu?: boolean;
  /**
   * 表单重置按钮组显示文字
   * */
  resetText?: string;
  /**
   * 表单重置按钮是否展示
   * */
  resetBtn?: boolean;
  /**
   * 表单提交按钮是否显示
   * */
  submitBtn?: boolean;
  /**
   * 表单提交按钮显示文字
   * */
  submitText?: string;
  /**
   * 表单提交按钮图标是否显示
   * */
  submitBtnIcon?: boolean;
  /**
   * 表单重置按钮是否显示
   * */
  resetBtnIcon?: boolean;
  /**
   * 表单按钮组span宽度
   * */
  menuSpan?: number;
  /**
   * 表单菜单组是否展示
   * */
  menuForm?: boolean;
};
// export interface Options {
//   /**
//    * 表单间距
//    * */
//   gutter?:
//     | number
//     | ResponsiveValue
//     | [number | ResponsiveValue, number | ResponsiveValue];
//   /**
//    * 表单是否为卡片
//    * */
//   formCard?: boolean;
//   columns: FormItemOption[];
//   /**
//    * 表单按钮组是否显示
//    * */
//   menu?: boolean;
//   /**
//    * 表单重置按钮组显示文字
//    * */
//   resetText?: string;
//   /**
//    * 表单重置按钮是否展示
//    * */
//   resetBtn?: boolean;
//   /**
//    * 表单提交按钮是否显示
//    * */
//   submitBtn?: boolean;
//   /**
//    * 表单提交按钮显示文字
//    * */
//   submitText?: string;
//   /**
//    * 表单提交按钮图标是否显示
//    * */
//   submitBtnIcon?: boolean;
//   /**
//    * 表单重置按钮是否显示
//    * */
//   resetBtnIcon?: boolean;
//   /**
//    * 表单按钮组span宽度
//    * */
//   menuSpan?: number;
//   /**
//    * 表单菜单组是否展示
//    * */
//   menuForm?: boolean;
//   span?: number;
//   /**
//    * 菜单按钮对齐方式
//    * */
//   menuAlignRight?: boolean;
// }
