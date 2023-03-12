import type {
  TableColumnData,
  TableFilterable,
  TableSortable,
  Form,
  FieldRule
} from '@arco-design/web-vue';
import type { CSSProperties } from 'vue';

export type ColumnsType = {
  rules?: FieldRule | FieldRule[];
  props?: {
    value?: string;
    label?: string;
    children?: string;
  };
  options?: Record<string, unknown | unknown[]>;
  span?: number;
  on?: Record<string, (...args: unknown[]) => void>;
  /**
   * 列信息的标识
   * */
  prop?: string;
  /**
   * 列标题
   * */
  label: string;
  /**
   * 更名 列标题 （注：文字和搜索栏冲突时使用）
   * */
  tableLabel?: string;
  /**
   * 是否开启搜索
   * */
  search?: boolean;
  /**
   * search类型
   * */
  type?: string;
  /**
   * 是否隐藏
   * */
  hide?: boolean;
  /**
   * 字典数组
   * */
  dic?: any[];
  /**
   * 字典请求
   * */
  dicRequest?: () => void;
  /**
   * 字典返回取值
   * */
  dicResKey?: string;
  /**
   * 列宽度
   * */
  width?: number;
  /**
   * 对齐方向
   * */
  align?: TableColumnData['align']; // 暂时这样处理 明确申明一直报错
  /**
   * 固定位置
   * */
  fixed?: TableColumnData['fixed'];
  /**
   * 是否显示为省略
   * */
  ellipsis?: boolean;
  /**
   * 排序相关选项
   * */
  sortable?: TableSortable;
  /**
   * 过滤相关选项
   * */
  filterable?: TableFilterable;
  /**
   * 自定义单元格样式
   * */
  cellStyle?: any;
  /**
   * 在省略时是否显示文字提示
   * */
  tooltip?: boolean | object;
  /**
   * 格式化表格cell内容
   * */
  formatter?: (record?: any) => any;
  /**
   * table索引title
   * */
  indexTitle?: string;
  /**
   * table索引是否开启
   * */
  index?: boolean;
  /**
   * index对齐方式
   * */
  indexAlign?: string;
  /**
   * 自定义表头单元格样式
   * */
  headerCellStyle?: CSSProperties;
  /**
   * 自定义内容单元格样式
   * */
  bodyCellStyle?: CSSProperties | ((record: any) => CSSProperties);
};
export type Page = { total: number; pageSize: number; current: number };

// 参照table-colum props
export type ColumnProps = {
  dataIndex?: string;
  title?: string;
  width?: number;
  align?: TableColumnData['align'];
  fixed?: TableColumnData['fixed'];
  ellipsis?: boolean;
  sortable?: TableSortable;
  filterable?: TableFilterable;
  cellStyle?: any;
  tooltip?: boolean | object;
};
export type TableOptions = {
  submitText?: string; // 搜索按钮文字
  /** 是否为卡片形式  默认true */
  tableCard?: boolean;
  /**
   *  Table columns 参数
   * */
  columns: ColumnsType[];
  /** 是否为卡片形式  默认true */
  menu?: boolean;
  /**
   *  page分页 是否展示 默认true
   * */
  pageShow?: boolean;
  /**
  /**
   *  page分页 是否展示 默认true
   * */
  notPage?: boolean;
  /**
   * 对齐方式
   * */
  align?: TableColumnData['align']; // 暂时这样处理 明确申明一直报错
  /**
   *  Table menu 操作栏 参数
   * */
  menuOptions?: any;
  /**
   * table 其他props
   * */
  menuOtherOptions?: any;
  autoLabelWidth?: boolean;
  formCard?: boolean;
  menuForm?: boolean;
  span?: number;
  layout?: typeof Form['layout'];
  index?: boolean;
  indexTitle?: string;
  indexWidth?: number;
  indexAlign?: string;
};

export function defineTableOptions(options: TableOptions): TableOptions {
  return options;
}
