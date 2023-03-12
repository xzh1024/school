import uniqueId from '@form-create/utils/lib/unique';
import {
  useSize,
  useDisabled,
  useRequired,
  useReadonly,
  useClear,
  usePlaceholder
} from '../../utils';

const label = '日期选择器';
const name = 'Date';

export default {
  icon: 'icon-date',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      props: {}
    };
  },
  props() {
    return [
      useRequired(),
      {
        type: 'select',
        field: 'mode',
        title: '显示类型',
        value: 'default',
        options: [
          { label: '月份选择', value: 'month' },
          { label: '年份选择', value: 'year' },
          { label: '季度选择', value: 'quarter' },
          { label: '默认', value: 'default' },
          { label: '周选择', value: 'week' },
          { label: 'datetimerange', value: 'datetimerange' },
          {
            label: 'daterange',
            value: 'daterange'
          },
          { label: 'monthrange', value: 'monthrange' }
        ]
      },
      useSize(),
      useReadonly(),
      useDisabled(),

      {
        type: 'switch',
        field: 'show-time',
        title: '是否可选择时间',
        value: false
      },
      useClear(),
      usePlaceholder(),
      {
        type: 'switch',
        field: 'range',
        title: '是否时间段',
        value: false
      },
      {
        type: 'input',
        field: 'value-format',
        title: '显示在输入框中的格式',
        value: 'YYYY-MM-DD hh:mm:ss'
      }
    ];
  }
};
