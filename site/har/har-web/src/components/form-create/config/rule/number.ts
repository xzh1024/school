import uniqueId from '@form-create/utils/lib/unique';
import {
  useDisabled,
  useLabel,
  usePlaceholder,
  useRequired,
  useSize
} from '../../utils';

const label = '计数器';
const name = 'a-input-number';

export default {
  icon: 'icon-number',
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
      useSize(),
      useLabel(),
      {
        type: 'a-input-number',
        field: 'min',
        title: '设置计数器允许的最小值',
        value: 0,
        props: { mode: 'button' }
      },
      {
        type: 'a-input-number',
        field: 'max',
        title: '设置计数器允许的最大值',
        props: { mode: 'button' }
      },
      {
        type: 'a-input-number',
        field: 'step',
        title: '计数器步长',
        value: 1,
        props: { mode: 'button' }
      },
      useDisabled(),
      {
        type: 'select',
        field: 'mode',
        title: '控制按钮位置',
        value: 'button',
        options: [
          { label: '内嵌', value: 'embed' },
          { label: '按钮', value: 'button' }
        ]
      },
      {
        type: 'switch',
        field: 'hide-button',
        title: '是否隐藏按钮（仅在内嵌模式可用）',
        value: false
      },
      usePlaceholder()
    ];
  }
};
