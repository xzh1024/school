import uniqueId from '@form-create/utils/lib/unique';
import {
  defaultOptions as options,
  useLabel,
  useRequired,
  useOptions,
  useSize,
  useDisabled
} from '../../utils';

const label = '单选框';
const name = 'a-radio-group';

export default {
  icon: 'icon-radio',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      effect: {
        fetch: ''
      },
      props: {
        options
      }
    };
  },
  props() {
    return [
      useRequired(),
      useOptions(),
      useSize(),
      useLabel(),
      useDisabled(),
      {
        type: 'switch',
        field: 'type',
        title: '按钮形式',
        props: { activeValue: 'button', inactiveValue: 'default' }
      },
      {
        type: 'input',
        field: 'textColor',
        title: '按钮形式的 Radio 激活时的文本颜色'
      },
      {
        type: 'input',
        field: 'fill',
        title: '按钮形式的 Radio 激活时的填充色和边框色'
      }
    ];
  }
};
