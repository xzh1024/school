import uniqueId from '@form-create/utils/lib/unique';
import {
  useSize,
  useRequired,
  useDisabled,
  useClear,
  useReadonly,
  usePlaceholder
} from '../../utils';

const label = '时间选择器';
const name = 'a-time-picker';

export default {
  icon: 'icon-time',
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
        type: 'radio',
        field: 'type',
        title: '选择器类型',
        options: [
          { label: '默认', value: 'time' },
          { label: '时间域', value: 'time-range' }
        ],
        value: 'time',
        props: {
          type: 'button'
        }
      },
      useSize(),
      useReadonly(),
      useDisabled(),
      {
        type: 'switch',
        field: 'use12-hours',
        title: '是否12 小时制',
        value: false
      },
      useClear(),
      usePlaceholder()
    ];
  }
};
